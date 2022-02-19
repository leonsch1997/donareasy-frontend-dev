import { createSlice } from '@reduxjs/toolkit';

// Reducers
export const userAuth = createSlice({
  name: 'authUser',
  reducers: {
    setUserToken: (state, { payload }) => {
      state.authToken = payload;
    },
    removeUserToken: (state) => {
      state.authToken = null;
    }
  },
  initialState: {
    authToken: null,
  }
})

// Action creators
export const { setUserToken, removeUserToken } = userAuth.actions;