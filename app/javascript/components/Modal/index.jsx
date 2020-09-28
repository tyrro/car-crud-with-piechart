import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const Modal = ({ linkText, header, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" onClick={handleOpenModal}>
        {linkText}
      </button>
      {isOpen && (
        <ReactModal ariaHideApp={false} isOpen={isOpen} onRequestClose={handleCloseModal}>
          <div className="modal__header">{header}</div>
          {children}
        </ReactModal>
      )}
    </>
  );
};

Modal.propTypes = {
  linkText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
