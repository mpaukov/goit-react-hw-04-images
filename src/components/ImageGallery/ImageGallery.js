import { ServiceAPI } from 'components/API';
import { Button } from 'components/Button';
import { Modal } from '../Modal';
import { Component } from 'react';
import { Watch } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ImageGalleryItem } from '.';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    page: 1,
    status: 'idle',
    response: [],
    error: null,
    showModal: false,
    imgId: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.setState(
        { status: 'pending', response: [], page: 1 },
        this.getPicture,
      );
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.setState({ status: 'pending' }, this.getPicture);
    }
  }

  getPicture = () => {
    ServiceAPI(this.props.query, this.state.page)
      .then(this.dataProcessing)
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  dataProcessing = response => {
    const data = response.data.hits.map(data => {
      const {
        id,
        largeImageURL: imageURL,
        webformatURL: src,
        tags: alt,
      } = data;
      return { id, imageURL, src, alt };
    });
    return this.setState(prevState => {
      return {
        response: [...prevState.response, ...data],
        status: 'resolved',
      };
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  imageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    this.setState({ imgId: Number(e.target.dataset.id) }, this.toggleModal());
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleData = () => {
    return this.state.response.find(data => data.id === this.state.imgId);
  };

  render() {
    const { status } = this.state;

    if (status === 'rejected') {
      return (
        <ul className={s.ImageGallery}>
          <li>Все плохо</li>
        </ul>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery} onClick={this.imageClick}>
            <ImageGalleryItem images={this.state.response} />
          </ul>
          <Button onClick={this.handleLoadMore} />
          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <img
                src={this.handleData().imageURL}
                alt={this.handleData().alt}
              />
            </Modal>
          )}
        </>
      );
    }
    if (status === 'pending') {
      return (
        <div className={s.Watch}>
          <Watch color="#00BFFF" height={200} width={200} ariaLabel="loading" />
        </div>
      );
    }

    return <></>;
  }
}

export default ImageGallery;
