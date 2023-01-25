import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialState } from './constants';

// Reducers
export const userAuth = createSlice({
  name: "authUser",
  initialState: initialState,
  reducers: {
    setUserData: (state, { payload }) => {},
    setUserToken: (state, { payload }) => {
      state.authToken = payload.authToken;

    },
    removeUserToken: (state) => {
      state.authToken = initialState.authToken;
    },
  },
});

// Action creators
export const { setUserToken, removeUserToken } = userAuth.actions;

// Selectors
export const authSelector = (state: RootState) => state.userAuth;
