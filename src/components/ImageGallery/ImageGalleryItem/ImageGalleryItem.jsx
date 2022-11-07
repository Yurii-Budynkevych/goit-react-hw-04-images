import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ url, large, alt, onClick }) => {
  return (
    <li onClick={() => onClick(large, alt)} className="gallery-item">
      <img className="image" src={url} alt={alt} />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
