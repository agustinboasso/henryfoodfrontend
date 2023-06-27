import {
  GET_RECIPES,
  ADD_RECIPE,
  GET_DIETS,
  SRC_RECIPE,
  GET_RECIPEID,
  CLEAN_DETAIL,
  SET_CURRENT_PAGE,
  SORT_RECIPES,
  FILTER_BY_DIET,
  FILTER_BY_SOURCE
} from "./actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  dietOptions: [],
  currentPage: 1,
  selectedDietType: null,
  sourceFilter: 'all',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case GET_DIETS:
      return {
        ...state,
        dietOptions: action.payload,
      };
    case SRC_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_RECIPEID:
      return {
        ...state,
        recipe: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        recipes: [],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SORT_RECIPES:
      const { option, direction } = action.payload;

      let sortedRecipes = [...state.recipes];
      if (option === "alphabetical") {
        sortedRecipes.sort((a, b) => {
          if (direction === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      } else if (option === "healthScore") {
        sortedRecipes.sort((a, b) => {
          if (direction === "asc") {
            return a.healthScore - b.healthScore;
          } else {
            return b.healthScore - a.healthScore;
          }
        });
      }

      return {
        ...state,
        recipes: sortedRecipes,
      };
    case FILTER_BY_DIET: {
      const filteredRecipes =
      action.payload === 'all'
        ? state.allRecipes 
        : state.allRecipes.filter((recipe) => {
          if(recipe.diets.length){
            let i = 0;
            while(i < recipe.diets.length){
              if(recipe.diets[i] === action.payload) return true;
              i++;
              }
              return false;
            } else {
              if(recipe.diets === action.payload) return true;
              return false;
            } 
          })
          return {
            ...state,
            recipes: filteredRecipes,
          }
    }
    case FILTER_BY_SOURCE: {
      const filteredRecipes =
        action.payload === 'all'
          ? state.allRecipes 
          : state.allRecipes.filter((recipe) => {
            if(action.payload === 'api') {
              if(isNaN(recipe.id)){
                return false;
              } else {
                return true;
              }
            } else {
              if(isNaN(recipe.id)){
                return true
              } else {
                return false
              }
            }
          });
         
      return {
        ...state,
        recipes: filteredRecipes,
        sourceFilter: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;