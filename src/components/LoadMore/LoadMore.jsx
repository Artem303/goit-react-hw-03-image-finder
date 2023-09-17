import React from 'react';
import css from './LoadMore.module.css';

export const LoadMore = ({ onClick }) => {
  return (
    <button className={css.loadMoreBtn} onClick={onClick} type="button">
      Load more...
    </button>
  );
};
