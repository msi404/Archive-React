import type { ReactNode, FC } from 'react'
import { DirectionProvider } from '@radix-ui/react-direction'
import { Provider } from 'react-redux'
import { store } from '@/shared/lib/store'
import { Protected } from '@/shared/components'
import { useTheme } from '@/shared/hooks/use-theme'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	useTheme()

	return (
		<Provider store={store}>
			<DirectionProvider dir="rtl">
				<Protected>{children}</Protected>
			</DirectionProvider>
		</Provider>
	)
}
