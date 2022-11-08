import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, img }) => {
  const onModalMouseClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const onModalClose = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', onModalClose);
    return () => window.removeEventListener('keydown', onModalClose);
  }, [onModalClose]);

  return createPortal(
    <div onClick={onModalMouseClose} className="overlay">
      <div className="modal">
        <img src={img.large} alt={img.alt} />
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  img: PropTypes.object.isRequired,
};
