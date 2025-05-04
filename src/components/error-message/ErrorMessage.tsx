import { FC } from 'react';
import s from './ErrorMessage.module.css';

const ErrorMessage: FC = () => {
  return (
    <div className={s.wrapper}>
      <span className={s.title}>We're sorry, but there was a problem.</span>
      <span className={s.text}>
        Please try refreshing the page and making a new request.
      </span>
    </div>
  );
};

export default ErrorMessage;
