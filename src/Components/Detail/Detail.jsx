import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getRecipeId, cleanDetail } from '../../redux/actions';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getRecipeId(id));
    return () => {
      dispatch(cleanDetail()); // Limpia los datos al desmontar el componente
    };
  }, [dispatch, id]);

  if (!recipe) {
    return <div className={styles['error-message']}>Receta no encontrada</div>;
  }
  

  return (
    <div className={styles['background-container']}>
      <div className={`${styles.container} ${styles['transparent-container']}`}>
        <h1>{recipe.name}</h1>
        <ul>
          <li><span className={styles.highlight}>ID:</span> {recipe.id}</li>
          <li><span className={styles.highlight}>Name:</span> {recipe.name}</li>
          <li className={styles.summary}>
            <span className={styles.highlight}>Summary:</span> {recipe.summary}
          </li>
          <li className={styles['health-score']}>
            <span className={styles.highlight}>Health Score:</span> {recipe.healthScore}
          </li>
          {recipe.stepByStep ? (
            <li className={styles.steps}><span className={styles.highlight}>Steps:</span> {recipe.stepByStep}</li>
          ) : (
            <li className={styles.steps}><span className={styles.highlight}>Steps:</span> {recipe.steps}</li>
          )}
          <li>
            <img src={recipe.image} alt={recipe.name} />
          </li>
          <ul className={styles['diet-list']}>
            <span className={styles.highlight}>Diet:</span>
            {recipe.diets.map((diets, index) => (
              <li key={index}>{diets}</li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Detail;

