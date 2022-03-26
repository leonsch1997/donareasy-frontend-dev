import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userAuth } from './reducers';

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
      userAuth: userAuth.reducer,
    },
});

export const ReduxProvider = ({ children }: any) => <Provider store={store}>{children}</Provider>