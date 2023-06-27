import { useState } from "react";
import styles from './SearchBar.module.css';
import { searchRecipes, setCurrentPage } from "../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState('');

  const handleChange = (event) => {
    setId(event.target.value);
  }

  const handleSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(searchRecipes(id));
  }

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="search"
        onChange={handleChange}
        value={id}
        placeholder="Search recipes"
      />
      <button className={styles.button} onClick={handleSearch}>
        SEARCH RECIPES
      </button>
    </div>
  );
}

export default SearchBar;