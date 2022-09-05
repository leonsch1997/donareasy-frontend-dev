import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Reducers
export const recoverPassword = createSlice({
  name: 'recoverPassword',
  reducers: {
    setCurrentStep: (state, { payload }) => {
      state.currentStep = payload;
    },
  },
  initialState: {
    currentStep: 1,
  }
})

// Action creators
export const { setCurrentStep } = recoverPassword.actions;

// Selectors
export const recoverPasswordSelector = (state: RootState) => state.recoverPassword.currentStep;