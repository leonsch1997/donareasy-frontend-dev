import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Reducers
export const userAuth = createSlice({
  name: 'authUser',
  reducers: {
    setUserToken: (state, { payload }) => {
      state.authToken = payload;
      state.username = 'admin';
    },
    removeUserToken: (state) => {
      state.authToken = null;
      state.username = '';
    }
  },
  initialState: {
    authToken: null,
    username: '',
  }
})

// Action creators
export const { setUserToken, removeUserToken } = userAuth.actions;

// Selectors
export const authSelector = (state: RootState) => state.userAuth;