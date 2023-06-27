import styles from './LandingPage.module.css';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        WELCOME TO HENRY FOOD!
      </h1>
      <p className={styles.subheading}>
        A proyect for HENRY bootcamp.
      </p>
      
      <NavLink to='/home'>
        <div className={styles.buttoncontainer}>
          <button className={`${styles.button} ${styles.startButton}`}>
            Start Now!
          </button>
        </div>
      </NavLink>
    </div>
  );
};

export default LandingPage;