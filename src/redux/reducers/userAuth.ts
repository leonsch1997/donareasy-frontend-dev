import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from "../store";

// Reducers
export const userAuth = createSlice({
  name: "authUser",
  initialState: {
    authToken: null,
    group: "",
    id: 1,
    nombre: "",
    username: "jafonso",
  },
  reducers: {
    setUserToken: (state, { payload }) => {
      state.authToken = payload.authToken;
      state.nombre = payload.nombre;
      state.username = payload.username;
      state.group = payload.group;
    },
    removeUserToken: (state) => {
      state.authToken = null;
      state.username = "";
    },
  },
});

// Action creators
export const { setUserToken, removeUserToken } = userAuth.actions;

// Selectors
export const authSelector = (state: RootState) => state.userAuth;
