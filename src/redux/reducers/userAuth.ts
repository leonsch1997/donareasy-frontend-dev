import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Reducers
export const userAuth = createSlice({
  name: "authUser",
  initialState: {
    authToken: document.cookie || '', // solo probando
    group: "",
    id: 1,
    nombre: "",
    username: "",
  },
  reducers: {
    setUserData: (state, { payload }) => {},
    setUserToken: (state, { payload }) => {
      console.log(payload);

      state.authToken = payload.username;
      // state.id = payload.id;
      // state.nombre = payload.nombre;
      // state.username = payload.username;
      // state.group = payload.group;
    },
    removeUserToken: (state) => {
      state.authToken = '';
      // state.username = "";
    },
  },
});

// Action creators
export const { setUserToken, removeUserToken } = userAuth.actions;

// Selectors
export const authSelector = (state: RootState) => state.userAuth;
