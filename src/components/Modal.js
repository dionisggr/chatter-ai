const Modal = ({ children, title = '', setMainModal }) => {
  return (
    <div>
      <input
        value={title}
        type='checkbox'
        checked={!!title}
        onChange={() => setMainModal(null)}
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='relative modal-box'>
          <label
            onClick={() => setMainModal(null)}
            className='absolute btn btn-sm btn-circle right-2 top-2'>
            ✕
          </label>
          <h3 className='text-lg font-bold'>{title}</h3>
          <div className='py-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
