import { useState, useEffect } from 'react';
import { Watch } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';
import { ServiceAPI } from 'components/API';
import { Button } from 'components/Button';
import { Modal } from '../Modal';
import { ImageGalleryItem } from '.';
import s from './ImageGallery.module.css';

function ImageGallery({ query }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgId, setImgId] = useState(null);

  const dataProcessing = response => {
    const { hits: dataArray } = response.data;
    if (!dataArray.length) {
      setStatus('rejected');
      setError(new Error('Try to change the request'));

      return;
    }
    const data = dataArray.map(data => {
      const {
        id,
        largeImageURL: imageURL,
        webformatURL: src,
        tags: alt,
      } = data;
      return { id, imageURL, src, alt };
    });
    setResponse(state => [...state, ...data]);
    setStatus('resolved');
  };

  useEffect(() => {
    setSearchQuery(query);
    setPage(1);
    setResponse([]);
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const getPicture = () => {
      setStatus('pending');
      ServiceAPI(searchQuery, page)
        .then(dataProcessing)
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    };
    getPicture();
  }, [page, searchQuery]);

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const imageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    setImgId(Number(e.target.dataset.id));
    toggleModal();
  };

  const handleData = () => {
    return response.find(data => data.id === imgId);
  };

  if (status === 'rejected') {
    return (
      <ul className={s.ImageGallery}>
        <li>{`Все плохо ${error}`}</li>
      </ul>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className={s.ImageGallery} onClick={imageClick}>
          <ImageGalleryItem images={response} />
        </ul>
        <Button onClick={handleLoadMore} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={handleData().imageURL} alt={handleData().alt} />
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

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
