import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Create the authSlice
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

// Extract the actions and reducer from authSlice
const { actions, reducer } = authSlice;

// Destructuring actions
const { setLoggedOut, setLoggedIn, setAuthToken, setEmail } = actions;


// Redux store
const store = configureStore({
  reducer: {
    auth: reducer,
  },
});

export { setLoggedOut, setLoggedIn, setAuthToken, setEmail };
export default store;
