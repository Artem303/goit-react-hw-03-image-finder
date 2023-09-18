import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'Servises/getImages';
import { LoadMore } from './LoadMore/LoadMore';
import { Hourglass } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

class App extends React.Component {
  state = {
    images: [],
    loader: false,
    searchQuery: '',
    page: 1,
    total: 0,
    error: null,
    modalImage: null,
  };

  handleFormSubmit = query => {
    this.setState({ images: [], page: 1 });
    this.setState({ searchQuery: query });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ loader: true });
      getImages(this.state.searchQuery, this.state.page)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          return Promise.reject(
            new Error(
              `Щось пішло не так. Немає картинок з тегом ${this.state.searchQuery}`
            )
          );
        })
        .then(images =>
          this.setState({
            images: [...images.hits],
            total: images.total,
          })
        )
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loader: false }));
    }

    if (
      (prevState.page !== this.state.page) &
      (prevState.searchQuery === this.state.searchQuery)
    ) {
      this.setState({ loader: true });
      getImages(this.state.searchQuery, this.state.page)
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          return Promise.reject(new Error(`Щось пішло не так.`));
        })
        .then(images =>
          this.setState(prev => ({
            images: [...prev.images, ...images.hits],
          }))
        )

        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loader: false }));
    }
  }

  showModal = largeImg => {
    this.setState({ modalImage: largeImg });
    console.log(largeImg);
  };

  pageIncrement = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };
  closeModal = () => {
    this.setState({ modalImage: null });
  };

  render() {
    const { searchQuery, modalImage, error, images, total, loader } =
      this.state;
    return (
      <div className="App">
        {modalImage && (
          <Modal
            largeImg={modalImage}
            searchQuery={searchQuery}
            closeModal={this.closeModal}
          />
        )}
        {error && <h1>{error.message}</h1>}
        <Searchbar onSubmitQuery={this.handleFormSubmit} />
        {images.length !== 0 && (
          <ImageGallery showModal={this.showModal} value={images} />
        )}
        {images.length !== total && <LoadMore onClick={this.pageIncrement} />}
        {loader && (
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        )}
      </div>
    );
  }
}
export default App;
