// TYPES
const SET_LOGIN_ERROR = 'AUTH/SET_LOGIN_ERROR';
const SET_LOGIN_USER = 'AUTH/SET_LOGIN_USER';

// ACTIONS
export const setLoginUser = (user) => ({
  type: SET_LOGIN_USER,
  payload: { user },
});

const initialState = {
  user: null,
  error: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {



    case SET_LOGIN_USER: {
      return {
        ...state,
        user: payload.user,
      };
    }
    case SET_LOGIN_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
