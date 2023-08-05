import { SET_LOADING_STATUS, GET_ARTICLES } from "../actions/actionType";

export const initialState = {
  loading: false,
  articles: [],
  likes: 0,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status, // action.status is the loading status that we get from the action
      };

    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };

    default:
      return state;
  }
};

export default articleReducer;
