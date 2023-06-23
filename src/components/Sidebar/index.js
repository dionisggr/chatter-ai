import React, { useState, useContext, useRef, useEffect } from 'react';
import { MdClose, MdMenu, MdAdd, MdOutlineVpnKey } from 'react-icons/md';
import { AiOutlineGithub } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { ResizableBox } from 'react-resizable';
import { ChatContext } from '../../context/chatContext';
import SidebarModal from './SidebarModal';
import Settings from './SidebarModal/Settings';
import Account from './SidebarModal/Account';
import Accordion from './Accordion';
import Dropdown from './Dropdown';
import NewChat from './SidebarModal/NewChat';
import 'react-resizable/css/styles.css';

const Sidebar = ({ setMainModal }) => {
  const [, , clearMessages] = useContext(ChatContext);
  const [open, setOpen] = useState(true);
  const [sidebarOpenModal, setSidebarOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedChatSpace, setSelectedChatSpace] = useState('Chat Space 1');
  const [newChatDropdown, setNewChatDropdown] = useState(false);
  const settingsButtonRef = useRef();
  const accountButtonRef = useRef();
  const newChatButtonRef = useRef();
  const categories = ['Public', 'Private', 'DMs'];
  const chatSpaces = ['Chat Space 1', 'Chat Space 2', 'Chat Space 3'];

  const toggleSidebarModal = (modal) => {
    if (sidebarOpenModal === modal) {
      setSidebarOpenModal(null);
    } else {
      setSidebarOpenModal(modal);
    }
  };

  const clearChat = () => clearMessages();

  const handleNewChatDropdown = (event) => {
    event.stopPropagation();
    setNewChatDropdown(!newChatDropdown);
  };

  const handleChatTypeSelection = (type) => {
    console.log(`Selected ${type}`);
    setNewChatDropdown(false);
  };

  const handleResize = () => {
    setOpen(!window.innerWidth <= 720);
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <ResizableBox
      width={265}
      axis="x"
      minConstraints={[240, Infinity]}
      maxConstraints={[window.innerWidth - 500, Infinity]}
    >
      <section className={`sidebar ${open ? 'w-full' : 'w-16'}`}>
        <div className="sidebar__app-bar">
          {open && selectedChatSpace && (
            <Dropdown
              options={chatSpaces}
              selectedOption={selectedChatSpace}
              setSelectedOption={setSelectedChatSpace}
            />
          )}
          <div
            className={`sidebar__btn-close`}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <MdClose className="sidebar__btn-icon" />
            ) : (
              <MdMenu className="sidebar__btn-icon" />
            )}
          </div>
        </div>
        <div className="nav" ref={newChatButtonRef}>
          <div
            className="new-chat relative border nav__item border-neutral-600 mx-2 my-3"
            onClick={clearChat}>
            <div className="nav__icons">
              <MdAdd />
            </div>
            <h1 className={`${!open && 'hidden'}`}>New chat</h1>
            <div
              className="nav__icons flex items-center ml-auto mr-1 absolute right-0 h-full px-3"
              onClick={() => toggleSidebarModal('New Chat')}>
              <div className="border-1 border-white border-opacity-50 p-px border hover:bg-slate-300 hover:text-dark-grey">
                <FaChevronDown size={17} />
              </div>
            </div>
          </div>
        </div>
        <div className='categories flex flex-col flex-grow'>
          {open && categories.map((category) => (
            <Accordion
              key={category}
              title={category}
              isOpen={selectedCategory === category}
              setSelectedCategory={setSelectedCategory}
            >
              {/* Chats go here */}
            </Accordion>
          ))}
        </div>
        <div className="nav__bottom">
          <div
            onClick={() => toggleSidebarModal('Settings')}
            className="nav"
            ref={settingsButtonRef}
          >
            <span htmlFor="setting-modal" className="nav__item">
              <div className="nav__icons">
                <MdOutlineVpnKey />
              </div>
              <h1 className={`${!open && 'hidden'}`}>Settings</h1>
            </span>
          </div>
          <div className="nav" ref={accountButtonRef}>
            <button
              onClick={() => toggleSidebarModal('Account')}
              className="nav__item"
            >
              <div className="nav__icons">
                <MdOutlineVpnKey />
              </div>
              <h1 className={`${!open && 'hidden'}`}>Account</h1>
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
              <h1 className={`${!open && 'hidden'}`}>See on Github</h1>
            </a>
          </div>
        </div>
        {sidebarOpenModal === 'Settings' && (
          <SidebarModal
            className="bottom-40"
            buttonRef={settingsButtonRef}
            sidebarOpenModal={sidebarOpenModal}
            setSidebarOpenModal={setSidebarOpenModal}
          >
            <Settings
              className=""
              open={open}
              setMainModal={setMainModal}
              setSidebarOpenModal={setSidebarOpenModal}
            />
          </SidebarModal>
        )}
        {sidebarOpenModal === 'Account' && (
          <SidebarModal
            className="bottom-28"
            buttonRef={accountButtonRef}
            sidebarOpenModal={sidebarOpenModal}
            setSidebarOpenModal={setSidebarOpenModal}
          >
            <Account
              setMainModal={setMainModal}
              setSidebarOpenModal={setSidebarOpenModal}
            />
          </SidebarModal>
        )}
        {sidebarOpenModal === 'New Chat' && (
          <SidebarModal
            className='top-32'
            buttonRef={newChatButtonRef}
            sidebarOpenModal={sidebarOpenModal}
            setSidebarOpenModal={setSidebarOpenModal}
          >
            <NewChat setSidebarOpenModal={setSidebarOpenModal}/>
          </SidebarModal>
        )}
      </section>
    </ResizableBox>
  );
};

export default Sidebar;
