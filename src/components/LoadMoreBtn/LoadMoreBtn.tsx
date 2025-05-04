import { FC } from 'react';
import css from './LoadMoreBtn.module.css';

interface ButtonProps {
  onLoadMore: () => void;
}

export const Button: FC<ButtonProps> = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.button} onClick={onLoadMore}>
      Load more
    </button>
  );
};
