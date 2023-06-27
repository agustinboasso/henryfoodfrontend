import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, sortRecipes, filterByDiet, getDiets, filterBySource, setCurrentPage } from '../../redux/actions';
import Cards from '../Cards/Cards';
import styles from './HomePage.module.css';
import Pagination from '../Pagination/Pagination';

const HomePage = () => {
  const dispatch = useDispatch();

  const [sortAlphabetical, setSortAlphabetical] = useState('asc');
  const [sortHealthScore, setSortHealthScore] = useState('desc');
  const dietOptions = useSelector((state) => state.dietOptions); //todas las opciones de dieta disponibles
  const selectedDietType = useSelector((state) => state.selectedDietType); // la opcion de dieta seleccionada actualmente
  const recipes = useSelector((state) => state.recipes);
  const [sourceFilter, setSourceFilter] = useState('all');

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sortRecipes('alphabetical', sortAlphabetical));
    dispatch(sortRecipes('healthScore', sortHealthScore));
  }, [dispatch, sortAlphabetical, sortHealthScore]);

  const handleSortAlphabetical = (direction) => {
    setSortAlphabetical(direction);
    dispatch(setCurrentPage(1));
  };

  const handleSortHealthScore = (direction) => {
    setSortHealthScore(direction);
    dispatch(setCurrentPage(1))
  };

  const handleFilterDiets = (e) => {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
    dispatch(setCurrentPage(1))
  };

  const handleFilterSource = (e) => {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
    dispatch(setCurrentPage(1))
  };

  // Filtrar las recetas según la dieta seleccionada y el origen (source) del archivo
  const filteredRecipes = selectedDietType
    ? recipes.filter((recipe) => recipe.diets.find((diet) => diet.name === selectedDietType))
    : recipes;

  const filteredRecipesBySource = sourceFilter !== 'all'
    ? filteredRecipes.filter((recipe) => recipe.source === sourceFilter)
    : filteredRecipes;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.filterContainer}>
        <div className={styles.filterDropdown}>
          <select value={sortAlphabetical} onChange={(e) => handleSortAlphabetical(e.target.value)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        <div className={styles.filterDropdown}>
          <select value={sortHealthScore} onChange={(e) => handleSortHealthScore(e.target.value)}>
            <option value="desc">Very Healthy</option>
            <option value="asc">Poorly Healthy</option>
          </select>
        </div>

        <div className={styles.filterDropdown}>
          <select onChange={handleFilterDiets} defaultValue={selectedDietType || 'all'}>
            <option value="all">Diet Filter</option>
            {dietOptions.map((el) => (
              <option value={el.name} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterDropdown}>
          <select onChange={handleFilterSource} defaultValue="all">
            <option value="all">All Sources</option>
            <option value="db">Database</option>
            <option value="api">API Data</option>
          </select>
        </div>
      </div>

      <Pagination />

      <Cards recipes={filteredRecipesBySource} />

      <Pagination />
    </div>
  );
};

export default HomePage;