import React, { useState, useContext, useRef, useEffect } from 'react';
import { MdClose, MdMenu, MdAdd, MdOutlineVpnKey } from 'react-icons/md';
import { AiOutlineGithub } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { ResizableBox } from 'react-resizable';
import { ChatContext } from '../../context/ChatContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import SidebarModal from './SidebarModal';
import Settings from './SidebarModal/Settings';
import Account from './SidebarModal/Account';
import Accordion from './Accordion';
import ChatSpaces from './SidebarModal/ChatSpaces';
import NewChat from './SidebarModal/NewChat';
import Chat from './Chat';
import service from '../../service';
import 'react-resizable/css/styles.css';

import data from '../../data';

const Sidebar = ({ setOpenChat, setMainModal, logout }) => {
  const { spaces, setSpaces } = useContext(ChatContext);
  const { chats, setChats } = useContext(ChatContext);

  const [token] = useLocalStorage('token');
  const [refreshToken] = useLocalStorage('refreshToken');

  const [isOpen, setIsOpen] = useState(true);
  const [activeSpace, setActiveSpace] = useState(null);
  const [chatTypes, setChatTypes] = useState([]);
  const [openChatType, setOpenChatType] = useState(null);
  const [openSidebarModal, setOpenSidebarModal] = useState(null);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedChatIds, setSelectedChatIds] = useState([]);

  const settingsButtonRef = useRef();
  const accountButtonRef = useRef();
  const newChatButtonRef = useRef();
  const chatSpacesButtonRef = useRef();

  const toggleSidebarModal = (modal) => {
    if (openSidebarModal === modal) {
      setOpenSidebarModal(null);
    } else {
      setOpenSidebarModal(modal);
    }
  };

  const toggleSelectedChat = (chat) => {
    if (selectedChatIds.includes(chat.id)) {
      setSelectedChatIds((prev) => prev.filter((id) => id !== chat.id));
    } else {
      setSelectedChatIds((prev) => [...prev, chat.id]);
    }
  };

  const toggleSelectAllChats = () => {
    if (selectedChatIds.length === chats.length) {
      setSelectedChatIds([]);
    } else {
      setSelectedChatIds(chats.map((chat) => chat.id));
    }
  };

  const removeChat = (chat) => {
    setChats((prev) => prev.filter((c) => c.id !== chat.id));
  };

  const handleCancelSelectMode = () => {
    setIsSelectMode(false);
    setSelectedChatIds([]);
  };

  // useEffect(() => {
  //   const init = async () => {
  //     let response = await service.get('/conversations', token);

  //     if (!response.ok) {
  //       const error = await response.json();

  //       if (error.message.includes('jwt')) {
  //         const reauthorization = await service.post(
  //           '/reauthorize', refreshToken
  //         );

  //         if (reauthorization.ok) {
  //           response = await service.get('/init', token);
  //         } else {
  //           return logout();
  //         }
  //       }
  //     }

  //     const {
  //       organizations: newSpaces,
  //       conversations: newChats
  //     } = await response.json();
  //     const newChatTypes = newChats
  //       ?.reduce((arr, chat) => {
  //         if (!arr.includes(chat.type)) {
  //           arr.push(chat.type);
  //         }

  //         return arr || [];
  //       }, [])
  //       ?.sort()?.reverse() || [];

  //       setSpaces(newSpaces);
  //       setActiveSpace(newSpaces[0] || null);
  //       setChats(newChats);
  //       setOpenChat(newChats[0] || null);
  //       setChatTypes(newChatTypes);
  //       setOpenChatType(newChatTypes[0] || null);
  //   };

  //   init();
  // }, [spaces, logout, refreshToken, setChats, setSpaces, token, isOpen, setOpenChat]);

  useEffect(() => {
    const initDev = () => {
      const newChatTypes = data.conversations
        ?.reduce((arr, chat) => {
          if (!arr.includes(chat.type)) {
            arr.push(chat.type);
          }

          return arr || [];
        }, [])
        ?.sort()
        ?.reverse() || [];
      const newOpenChatType = newChatTypes.includes('private')
        ? 'private'
        : newChatTypes[0] || null;

      setSpaces(data.organizations);
      setActiveSpace(data.organizations[0]);
      setChats(data.conversations);
      setOpenChat(data.conversations[0]);
      setChatTypes(newChatTypes);
      setOpenChatType(newOpenChatType);
    };

    initDev();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 720);
    };

    handleResize();
  }, []);

  return (
    <ResizableBox
      width={265}
      axis="x"
      minConstraints={[240, Infinity]}
      maxConstraints={[window.innerWidth - 500, Infinity]}
    >
      <section className={`sidebar ${isOpen ? 'w-full' : 'w-16'}`}>
        <div className="sidebar__app-bar">
          {isOpen && activeSpace && (
            <button
              onClick={() => toggleSidebarModal('Chat Spaces')}
              className="flex justify-between items-center bg-darker-grey bg-opacity-50 py-2 px-4 w-full text-left rounded-md text-white text-lg border border-gray-600"
              ref={chatSpacesButtonRef}
            >
              <span>{activeSpace.name || null}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
          <div
            className={`sidebar__btn-close`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <MdClose className="sidebar__btn-icon" />
            ) : (
              <MdMenu className="sidebar__btn-icon" />
            )}
          </div>
        </div>
        <div className="nav" ref={newChatButtonRef}>
          <div
            className="new-chat relative border nav__item border-neutral-600 mx-2 my-3 z-0"
            onClick={() => setChats([])}
          >
            <div className="nav__icons">
              <MdAdd />
            </div>
            <h1 className={`${!isOpen && 'hidden'}`}>New chat</h1>
            <div
              className="nav__icons flex items-center ml-auto mr-1 absolute right-0 h-full px-3 group"
              onClick={() => toggleSidebarModal('New Chat')}
            >
              <div className="border-1 border-white border-opacity-50 p-0.5 border group-hover:bg-slate-300 group-hover:text-dark-grey">
                <FaChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
        <div className="chat-types flex flex-col flex-grow">
          {isOpen &&
            chatTypes.map((chatType) => (
              <Accordion
                key={chatType}
                title={chatType}
                isOpen={chatType === openChatType}
                setOpenAccordion={setOpenChatType}
              >
                {isSelectMode && (
                  <div className="mb-3 mt-0 px-2">
                    <button
                      href="#select-multiple"
                      className="text-xs text-slate-200 cursor-pointer hover:text-yellow-300"
                      onClick={(toggleSelectAllChats)}
                    >
                      {chats.length === selectedChatIds.length ? 'Deselect' : 'Select'} All
                    </button>
                  </div>
                )}
                {chats
                  .filter((chat) => chat.type === openChatType)
                  .map((chat) => (
                    <Chat
                      key={chat.id}
                      chat={chat}
                      chats={chats}
                      setChats={setChats}
                      isSelectMode={isSelectMode}
                      isSelected={selectedChatIds.includes(chat.id)}
                      toggleSelectedChat={toggleSelectedChat}
                    />
                ))}
              </Accordion>
            ))}
        </div>
        <div className="nav__bottom">
          {!isSelectMode &&
            <div
              onClick={() => toggleSidebarModal('Settings')}
              className="nav"
              ref={settingsButtonRef}
            >
              <span htmlFor="setting-modal" className="nav__item">
                <div className="nav__icons">
                  <MdOutlineVpnKey />
                </div>
                <h1 className={`${!isOpen && 'hidden'}`}>Settings</h1>
              </span>
            </div>
          }
          {isSelectMode &&
            <div
              onClick={handleCancelSelectMode}
              className="nav"
            >
              <span htmlFor="setting-modal" className="nav__item">
                <div className="nav__icons">
                  <MdOutlineVpnKey />
                </div>
                <h1 className={`${!isOpen && 'hidden'}`}>Cancel Select</h1>
              </span>
            </div>
          }
          <div className="nav" ref={accountButtonRef}>
            <button
              onClick={() => toggleSidebarModal('Account')}
              className="nav__item"
            >
              <div className="nav__icons">
                <MdOutlineVpnKey />
              </div>
              <h1 className={`${!isOpen && 'hidden'}`}>Account</h1>
            </button>
          </div>
          <div className="nav">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/dionisgr/chatterai"
              className="nav__item"
            >
              <div className="nav__icons">
                <AiOutlineGithub />
              </div>
              <h1 className={`${!isOpen && 'hidden'}`}>See on Github</h1>
            </a>
          </div>
        </div>
        <div className="blur" />
        {openSidebarModal === 'Settings' && (
          <SidebarModal
            className="bottom-36 mb-1"
            buttonRef={settingsButtonRef}
            openSidebarModal={openSidebarModal}
            setOpenSidebarModal={setOpenSidebarModal}
          >
            <Settings
              isOpen={isOpen}
              setOpenSidebarModal={setOpenSidebarModal}
              isSelectMode={isSelectMode}
              setIsSelectMode={setIsSelectMode}
            />
          </SidebarModal>
        )}
        {openSidebarModal === 'Account' && (
          <SidebarModal
            className="bottom-24 mb-1"
            buttonRef={accountButtonRef}
            openSidebarModal={openSidebarModal}
            setOpenSidebarModal={setOpenSidebarModal}
          >
            <Account
              setMainModal={setMainModal}
              setOpenSidebarModal={setOpenSidebarModal}
              logout={logout}
            />
          </SidebarModal>
        )}
        {openSidebarModal === 'New Chat' && (
          <SidebarModal
            className="top-32"
            buttonRef={newChatButtonRef}
            openSidebarModal={openSidebarModal}
            setOpenSidebarModal={setOpenSidebarModal}
          >
            <NewChat setOpenSidebarModal={setOpenSidebarModal} />
          </SidebarModal>
        )}
        {openSidebarModal === 'Chat Spaces' && (
          <SidebarModal
            className="top-16"
            buttonRef={chatSpacesButtonRef}
            openSidebarModal={openSidebarModal}
            setOpenSidebarModal={setOpenSidebarModal}
          >
            <ChatSpaces
              spaces={spaces}
              setActiveSpace={setActiveSpace}
              setOpenSidebarModal={setOpenSidebarModal}
            />
          </SidebarModal>
        )}
      </section>
    </ResizableBox>
  );
};

export default Sidebar;
