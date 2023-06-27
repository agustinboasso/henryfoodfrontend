import styles from './LandingPage.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logofood.png'

const LandingPage = () => {
  return (
    <div className={styles.container}>
      
      <img src={logo} alt="logofood" className={styles.logo} />
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