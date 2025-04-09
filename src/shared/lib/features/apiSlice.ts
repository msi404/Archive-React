import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {type RootState} from '@/shared/lib/store'

export const baseURL = import.meta.env.VITE_API_URL

export const tatweerApi = createApi( {
	reducerPath: 'tatweerApi',
	baseQuery: fetchBaseQuery( {
		baseUrl: baseURL,
		prepareHeaders: ( headers, { getState } ) =>
		{
			const token = ( getState() as RootState ).auth.token
			if ( token )
			{
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	} ),
	endpoints: () => ({})
	})