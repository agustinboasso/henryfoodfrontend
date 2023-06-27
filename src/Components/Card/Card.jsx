import { NavLink } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={styles.card}>
      
        <h1>{props.name}</h1>
        <img className={styles.card__image} src={props.image} alt={props.name} />
      
      <h2>DIET:</h2>
      <div className={styles.card__scroll}>
        <ul>
          {props.diet.map((diet, index) => (
            <li key={index}>{diet}</li>
          ))}
        </ul>
      </div>
      <NavLink to={`/detail/${props.id}`} className={styles.card__link}>
        More Info
      </NavLink>
    </div>
  );
};

export default Card;