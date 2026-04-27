import {configureStore} from '@reduxjs/toolkit';
import commonReducer from '@redux/reducer/commonReducer';
import {plieApi} from '@services/api/plieApi';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    [plieApi.reducerPath]: plieApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(plieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
