// actions
export const SET_LOADING = 'APP/SET_LOADING_VISIBILITY';
export const SET_LOADING_MESSAGE = 'APP/SET_MENSET_LOADING_MESSAGE';
export const SET_API_BASE_URL = 'APP/SET_API_BASE_URL';
export const SET_APP_INITIALIZED = 'APP/SET_APP_INITIALIZED';
export const OPEN_LAUNCHER = 'APP/OPEN_LAUNCHER';

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: { isLoading },
});

export const setLoadingMessage = (message) => ({
  type: SET_LOADING_MESSAGE,
  payload: { message },
});

export const setApiBaseUrl = (apiBaseUrl) => ({
  type: SET_API_BASE_URL,
  payload: { apiBaseUrl },
});

export const setAppInitial = payload => ({
  type: SET_APP_INITIALIZED, payload
});

export const openLauncher = payload => ({
  type: OPEN_LAUNCHER, payload
});

// reducers
const initialState = {
  isLoading: false,
  loading_message: '',
  apiBaseUrl: '',
  initialized: false,
  isLauncherOpen: true,
};

const reducer = (state = {...initialState}, { type, payload }) => {
  switch (type) {

    case "RESET_ALL": return {...initialState};

    case SET_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    case SET_LOADING_MESSAGE:
      return {
        ...state,
        loading_message: payload.message,
      };
    case SET_API_BASE_URL: {
      return {
        ...state,
        apiBaseUrl: payload.apiBaseUrl,
      };
    }
    case SET_APP_INITIALIZED:
      return {
        ...state,
        initialized: payload,
      };

    case OPEN_LAUNCHER:
      return {
        ...state,
        isLauncherOpen: payload,
      }
    default:
      return state;
  }
};

export default reducer;
