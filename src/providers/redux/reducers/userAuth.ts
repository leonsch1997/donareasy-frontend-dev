import { createSlice } from '@reduxjs/toolkit';

// Reducers
export const userAuth = createSlice({
  name: 'authUser',
  reducers: {
    setUserToken: (state, { payload }) => {
      console.log('Called set', payload);
      state.authToken = payload;
    },
    removeUserToken: (state) => {
      console.log('Called Unset');
      state.authToken = null;
    }
  },
  initialState: {
    authToken: null,
  }
})

// Action creators
export const { setUserToken, removeUserToken } = userAuth.actions;