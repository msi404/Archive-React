import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tatweerApi } from '@/shared/lib/features/apiSlice';

export const store = configureStore({
  reducer: {
    [tatweerApi.reducerPath]: tatweerApi.reducer,},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      tatweerApi.middleware
    )
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;