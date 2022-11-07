import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onModalClose);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.onModalClose);
  };

  onModalClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onModalMouseClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div onClick={this.onModalMouseClose} className="overlay">
        <div className="modal">
          <img src={this.props.img.large} alt={this.props.img.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  img: PropTypes.object.isRequired,
};
