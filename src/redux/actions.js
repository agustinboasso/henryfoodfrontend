import axios from "axios"
//import {modificatedResults} from './los100'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const GET_DIETS = "GET_DIETS";
export const ADD_RECIPE = "ADD_RECIPE"
export const GET_RECIPES = "GET_RECIPES";
export const SRC_RECIPE = "SRC_RECIPE";
export const GET_RECIPEID = "GET_RECIPEID";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SET_SELECTED_DIET_TYPE ='SET_SELECTED_DIET_TYPE';
export const SORT_RECIPES ='SORT_RECIPES';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';



//trae todas las recetas
export const getRecipes = () => {
    return async function (dispatch){
          const apiData = await axios.get(`https://henryfoodbackend-production.up.railway.app/recipes`)
          const recipes = apiData.data;
        //const recipes = modificatedResults

        dispatch({type: GET_RECIPES, payload: recipes})
    }
}


export const addRecipe = (recipe) => {
  console.log(recipe)
  return async function (dispatch) {
    try {
      const response = await axios.post('https://henryfoodbackend-production.up.railway.app/recipes', recipe);
      dispatch({ type: ADD_RECIPE, payload: response.data });
      
    } catch (error) {
      console.error(error);
    }
  };
};


export const getDiets = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('https://henryfoodbackend-production.up.railway.app/diets');
      dispatch({ type: GET_DIETS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};


export const searchRecipes = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://henryfoodbackend-production.up.railway.app/recipes?name=${name}`);
      
      if (data.length > 0) {
        dispatch({
          type: SRC_RECIPE,
          payload: data
        });
      } else {
        alert('No hay recetas con este nombre.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al buscar recetas.');
    }
  };
};


export const getRecipeId = (id) => {
  
  return async function (dispatch) {
    try {
      const response = await axios.get(`https://henryfoodbackend-production.up.railway.app/recipes/${id}`);
      const recipe = response.data;
      
      dispatch({ type: GET_RECIPEID, payload: recipe });
    } catch (error) {
      console.error(error);
      alert('Error al buscar recetas.');
    }
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: []
  };
};

export const setCurrentPage = (pageNumber) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNumber,
  };
};



export const sortRecipes = (option, direction) => {
  return {
    type: SORT_RECIPES,
    payload: { option, direction }
  };
};


export function filterByDiet(diet) {
        return{
         type: FILTER_BY_DIET, payload: diet 
      }
    
  };
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';

export function filterBySource(source) {
  return {
    type: FILTER_BY_SOURCE,
    payload: source,
  };
}
