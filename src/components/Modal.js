const Modal = ({ children, title = '', setMainModal }) => {
  return (
    <div className="relative">
      <input
        value={title}
        type="checkbox"
        checked={!!title}
        onChange={() => setMainModal(null)}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="relative modal-box mb-24 py-10 pb-14">
          <label
            onClick={() => setMainModal(null)}
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            &times;
          </label>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
