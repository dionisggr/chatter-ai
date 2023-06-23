import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const SidebarModal = (props) => {
  const {
    className = '',
    children,
    buttonRef,
    sidebarOpenModal,
    setSidebarOpenModal,
  } = props;
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !buttonRef.current.contains(event.target) &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setSidebarOpenModal(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef, sidebarOpenModal, setSidebarOpenModal]);

  return (
    <CSSTransition
      in={!!sidebarOpenModal}
      nodeRef={modalRef}
      timeout={225}
      classNames="slide"
      unmountOnExit
    >
      <div
        className={`absolute left-2 right-0 z-50 flex items-end justify-center bg-darker-grey rounded-md w-11/12 ${className}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

export default SidebarModal;
