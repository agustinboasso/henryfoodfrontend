import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/actions';
import styles from './Pagination.module.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const recipesPerPage = 10; 
  const totalRecipes = useSelector((state) => state.recipes.length);
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? styles.active : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      let startPage = 1;
      let endPage = 5;

      if (currentPage > 3) {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      if (endPage > totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? styles.active : ''}
          >
            {i}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  const goToFirstPage = () => {
    handlePageChange(1);
  };

  const goToLastPage = () => {
    handlePageChange(totalPages);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className={styles.button}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <div className={styles.navigationButtons}>
        <button className={styles.button} onClick={goToFirstPage}>
          Go to first page
        </button>
        <button className={styles.button} onClick={goToLastPage}>
          Go to last page
        </button>
      </div>
    </div>
  );
};

export default Pagination;