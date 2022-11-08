import PropTypes from 'prop-types';
import './ImageGallery.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

const ImageGallery = ({ state, onLoadMore, onModal }) => {
  const { images, status, error, modal, currentImg } = state;

  if (status === 'idle') {
    return;
  }
  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      <ul className="gallery">
        {images.map(img => (
          <ImageGalleryItem
            key={img.id}
            url={img.webformatURL}
            large={img.largeImageURL}
            alt={img.tags}
            onClick={onModal}
          />
        ))}
      </ul>
      {status === 'pending' ? <Loader /> : <Button onLoadMore={onLoadMore} />}
      {modal && <Modal onClose={onModal} img={currentImg} />}
    </>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  state: PropTypes.object.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onModal: PropTypes.func.isRequired,
};
