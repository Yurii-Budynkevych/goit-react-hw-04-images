import { Component } from 'react';
import Notiflix from 'notiflix';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const KEY = '30371799-820dc93a3ae10a20aac07ac2b';
const BASE_URL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    search: '',
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    modal: false,
    currentImg: null,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      fetch(
        `${BASE_URL}?q=${this.state.search}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`Error, please try again later`);
        })
        .then(res =>
          this.setState(prevState => ({
            images: [...prevState.images, ...res.hits],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  };

  onModal = (large, alt) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      currentImg: { large, alt },
    }));
  };
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  onSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.search.value;
    if (searchValue.trim() === '') {
      return Notiflix.Notify.failure('Please enter something');
    }
    this.setState({
      search: searchValue.toLowerCase(),
      images: [],
      page: 1,
    });
    e.currentTarget.reset();
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          state={this.state}
          onLoadMore={this.onLoadMore}
          onModal={this.onModal}
        />
      </>
    );
  }
}
