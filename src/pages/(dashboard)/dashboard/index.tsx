import { Separator } from '@/shared/components/ui/separator'
import {
	DestinationWidget,
	TitlesWidget,
	BooksStats
} from '@/pages/(dashboard)/dashboard/widgets'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/lib/features/authSlice'
import { defineAbilitiesFor } from '@/shared/config/ability'
import { Show } from '@/shared/components/utils/show'

export default function HomePage() {
	const user = useSelector(selectUser)
	const ability = defineAbilitiesFor(user)

	return (
		<>
			<Show when={ability.can('read', 'HomePage')}>
				<BooksStats />
			</Show>

			<Separator className="my-4" />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				<Show when={ability.can('read', 'TitlesWidget')}>
					<TitlesWidget />
				</Show>
				<Show when={ability.can('read', 'DestinationWidget')}>
					<DestinationWidget />
				</Show>
			</div>
		</>
	)
}
