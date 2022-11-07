import { Circles } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => {
  return (
    <Circles
      height="150"
      width="150"
      color="#3f51b5"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass="loader"
      visible={true}
    />
  );
};
export default Loader;
