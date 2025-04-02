import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './modeSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    auth: authReducer,
  },
});
