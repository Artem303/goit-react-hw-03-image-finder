import React from 'react';
import ImaggeGalleryItem from 'components/ImmageGalleryItem/ImmageGalleryItem';
import css from './ImmageGallery.module.css';

export const ImageGallery = ({ value, showModal }) => {
  return (
    <ul className={css.gallery}>
      <ImaggeGalleryItem showModal={showModal} values={value} />
    </ul>
  );
};
