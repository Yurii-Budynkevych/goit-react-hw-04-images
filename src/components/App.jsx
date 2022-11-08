import { useReducer, useEffect } from 'react';
import Notiflix from 'notiflix';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const KEY = '30371799-820dc93a3ae10a20aac07ac2b';
const BASE_URL = 'https://pixabay.com/api/';
const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  ERROR: 'rejected',
  RESOLVED: 'resolved',
};
const INIT = {
  search: '',
  images: [],
  error: null,
  status: STATUS.IDLE,
  page: 1,
  modal: false,
  currentImg: null,
};

function countReducer(prevState, actions) {
  switch (actions.type) {
    case 'load':
      return { ...prevState, status: STATUS.PENDING };
    case 'error':
      return {
        ...prevState,
        error: actions.payload.massage,
        status: actions.payload.status,
      };
    case 'resolved':
      return {
        ...prevState,
        status: actions.payload.status,
        images: [...prevState.images, ...actions.payload.images],
      };
    case 'modal':
      return {
        ...prevState,
        modal: !prevState.modal,
        currentImg: actions.payload,
      };
    case 'onLoadMore':
      return { ...prevState, page: prevState.page + 1 };
    case 'submit':
      return {
        ...prevState,
        search: actions.payload,
        images: [],
        page: 1,
      };

    default:
      throw new Error(`Unsupported action type${actions.type}`);
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(countReducer, INIT);

  const onModal = (large, alt) => {
    dispatch({
      type: 'modal',
      payload: { large, alt },
    });
  };
  const onLoadMore = () => {
    dispatch({ type: 'onLoadMore' });
  };
  const onSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.search.value;
    if (searchValue.trim() === '') {
      return Notiflix.Notify.failure('Please enter something');
    }
    dispatch({
      type: 'submit',
      payload: searchValue.toLowerCase(),
    });
    e.currentTarget.reset();
  };

  useEffect(() => {
    if (!state.search) {
      return;
    }
    dispatch({ type: 'load' });
    fetch(
      `${BASE_URL}?q=${state.search}&page=${state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Error, please try again later`);
      })
      .then(res =>
        dispatch({
          type: 'resolved',
          payload: {
            images: res.hits,
            status: STATUS.RESOLVED,
          },
        })
      )
      .catch(error =>
        dispatch({
          type: 'error',
          payload: { massage: error, status: STATUS.ERROR },
        })
      );
  }, [state.search, state.page]);

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery state={state} onLoadMore={onLoadMore} onModal={onModal} />
    </>
  );
};
