import type { FC, ReactElement } from 'react'
import { For } from '@/shared/components'
import { Dynamic } from '@/shared/components'

export const Header: FC<{ elements: ReactElement[] }> = ({ elements }) => {
	return (
		<header dir='ltr' className='fixed left-0 p-2 px-8'>
			<ul className='flex-row-reverse items-center justify-between'>
				<For each={elements}>
					{(element) => (
						<li>
							<Dynamic component={element} />
						</li>
					)}
				</For>
			</ul>
		</header>
	)
}
