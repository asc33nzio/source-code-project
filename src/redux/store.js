import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedOut: true,
    authToken: '',
    email: ''
  },
  reducers: {
    setLoggedOut: state => {
      state.isLoggedOut = true;
      state.authToken = '';
    },
    setLoggedIn: state => {
      state.isLoggedOut = false;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    }
  },
});

const { actions: authActions, reducer: authReducer } = authSlice;

// Destructuring actions
const { setLoggedOut, setLoggedIn, setAuthToken, setEmail } = authActions;

// Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export {
  setLoggedOut,
  setLoggedIn,
  setAuthToken,
  setEmail,
};

export default store;