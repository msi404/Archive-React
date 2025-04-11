import type { ReactNode, FC } from 'react'
import { DirectionProvider } from '@radix-ui/react-direction'
import { Provider } from 'react-redux'
import { store } from '@/shared/lib/store'
import { Protected } from '@/shared/components'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Provider store={store}>
			<DirectionProvider dir="rtl">
				<Protected>{children}</Protected>
			</DirectionProvider>
		</Provider>
	)
}
