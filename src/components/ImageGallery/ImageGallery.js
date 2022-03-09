import PropTypes from 'prop-types';
import { ImageGalleryItem } from '.';
import s from './ImageGallery.module.css';

export const ImageGallery = ({ data, onClick }) => {
  const imageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    onClick(Number(e.target.dataset.id));
  };

  return (
    <>
      <ul className={s.ImageGallery} onClick={imageClick}>
        <ImageGalleryItem images={data} />
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  onClick: PropTypes.func.isRequired,
};
