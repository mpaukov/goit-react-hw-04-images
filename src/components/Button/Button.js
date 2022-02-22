import s from './Button.module.css';

export const Button = props => {
  return (
    <button className={s.Button} type="button" onClick={props.onClick}>
      Load More
    </button>
  );
};
