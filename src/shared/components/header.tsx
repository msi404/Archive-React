import type { FC, ReactElement } from 'react'
import { For } from '@/shared/components'
import { Dynamic } from '@/shared/components'

export const Header: FC<{ elements: ReactElement[] }> = ({ elements }) => {
	return (
		<header dir="ltr" className="absolute left-0 top-0 p-6 px-8 z-10 bg-white shadow w-full">
			<ul className="flex-row-reverse items-center justify-between">
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
