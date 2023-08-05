import { SET_LIKED_NUMBER_ARRAY } from "../actions/actionType";

const initialState = {
  likedNumberArray: new Array(100).fill(0),
};

const likedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIKED_NUMBER_ARRAY:
      return {
        ...state,
        likedNumberArray: action.payload,
      };
    default:
      return state;
  }
};

export default likedReducer;
