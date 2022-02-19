import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './reducers';
import React from 'react';

const store = configureStore({
    reducer: {
      userAuth: userAuth.reducer,
    },
});

export const ReduxProvider = ({ children }: any) => <Provider store={store}>{children}</Provider>