import React from 'react';

import './Modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <div className='modal-main-dim'>
          {children}
          <button className='modal-button' type='button' onClick={handleClose}>
            Bắt đầu chơi
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
