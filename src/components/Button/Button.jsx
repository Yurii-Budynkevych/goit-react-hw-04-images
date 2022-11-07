import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className="button__load" type="button">
      Load more
    </button>
  );
};
export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
