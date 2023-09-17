import React from 'react';
import css from './ImmageGalleryItem.module.css';

const ImaggeGalleryItem = ({ values, showModal }) => {
  return values.map(value => (
    <li
      key={value.id}
      className={css.galleryItem}
      onClick={() => showModal(value.largeImageURL)}
    >
      <img src={value.webformatURL} alt={value.id} />
    </li>
  ));
};
export default ImaggeGalleryItem;
