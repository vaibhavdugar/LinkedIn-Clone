import { SET_USER } from "../actions/actionType";

const INITIAL_STATE = {
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        // instead of changing the state directly, we copy the state and change the copy
        ...state,
        user: action.user, // action.user is the user object that we get from firebase authentication
      };

    default:
      return state;
  }
};

export default userReducer;
