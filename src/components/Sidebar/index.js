import React, { useState, useContext, useRef, useEffect } from 'react';
import { MdClose, MdMenu, MdAdd, MdOutlineVpnKey } from 'react-icons/md';
import { AiOutlineGithub } from 'react-icons/ai';
import { ChatContext } from '../../context/chatContext';
import bot from '../../assets/bot.ico';
import SidebarModal from './SidebarModal';
import Settings from './SidebarModal/Settings';
import Account from './SidebarModal/Account';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const Sidebar = ({ setMainModal }) => {
  const [, , clearMessages] = useContext(ChatContext);
  const [open, setOpen] = useState(true);
  const [sidebarOpenModal, setSidebarOpenModal] = useState(false);
  const settingsButtonRef = useRef();
  const accountButtonRef = useRef();
  const [height, setHeight] = useState(window.innerHeight);

  const toggleSidebarModal = (modal) => {
    if (sidebarOpenModal === modal) {
      setSidebarOpenModal(null);
    } else {
      setSidebarOpenModal(modal);
    }
  };

  const clearChat = () => clearMessages();

  const handleResize = () => {
    setOpen(!window.innerWidth <= 720);
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResizableBox
      width={260}
      axis="x"
      minConstraints={[240, Infinity]}
      maxConstraints={[600, Infinity]}
    >
      <div style={{ width: '100%', height: '100%', border: '1px solid' }}>
        <section className={` ${open ? 'w-full' : 'w-16'} sidebar`}>
          <div className="sidebar__app-bar">
            <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'}`}>
              <span className="w-8 h-8">
                <img src={bot} alt="" />
              </span>
            </div>
            <h1 className={`sidebar__app-title ${!open && 'scale-0 hidden'}`}>
              Chatter.AI
            </h1>
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
          <div className="nav">
            <span
              className="border nav__item border-neutral-600"
              onClick={clearChat}
            >
              <div className="nav__icons">
                <MdAdd />
              </div>
              <h1 className={`${!open && 'hidden'}`}>New chat</h1>
            </span>
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
        </section>
      </div>
    </ResizableBox>
  );
};

export default Sidebar;
