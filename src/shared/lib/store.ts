import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tatweerApi } from '@/shared/lib/features/apiSlice'
import authReducer from '@/shared/lib/features/authSlice'

export const store = configureStore({
	reducer: {
		[tatweerApi.reducerPath]: tatweerApi.reducer,
		auth: authReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			tatweerApi.middleware
		)
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
