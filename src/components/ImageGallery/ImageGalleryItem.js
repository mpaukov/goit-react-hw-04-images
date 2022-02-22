import s from './ImageGallery.module.css';

export const ImageGalleryItem = props => {
  return props.images.map(({ id, src, alt }) => {
    return (
      <li className={s.ImageGalleryItem} key={id}>
        <img
          className={s.ImageGalleryItemImage}
          src={src}
          alt={alt}
          data-id={id}
        />
      </li>
    );
  });
};
