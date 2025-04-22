import { useGetApiDocumentImageCartQuery } from '@/shared/api/archiveApi'
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter
} from '@/shared/components/ui/card'
import { BookItem } from '@/pages/(dashboard)/cart/components/book-item'
import { Switch, Match } from '@/shared/components/utils/switch'
import { For } from '@/shared/components/utils/for'

export default function CartPage() {
	const { data, isLoading, isSuccess } = useGetApiDocumentImageCartQuery({})
	return (
		<Card>
			<CardHeader>
				
			</CardHeader>
			<CardContent className="flex flex-wrap gap-4">
				<Switch>
					<Match when={isSuccess}>
						<For each={data?.result}>
							{(item, index) => <BookItem key={index} title={item.name!} />}
						</For>
					</Match>
					<Match when={isLoading}>
						<h1>جاري التحميل...</h1>
					</Match>
				</Switch>
			</CardContent>
		</Card>
	)
}
