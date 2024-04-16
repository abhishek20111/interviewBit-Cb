import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSilce';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
