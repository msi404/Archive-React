import { useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import { useGetApiDocumentImageCartQuery } from '@/shared/api/archiveApiEnhance'
import { Card, CardContent } from '@/shared/components/ui/card'
import { SkeletonTable } from '@/shared/components/table/skeleton-table'
import { BookItem } from '@/pages/(dashboard)/cart/components/book-item'
import { Switch, Match } from '@/shared/components/utils/switch'
import { For } from '@/shared/components/utils/for'
import { Input } from '@/shared/components/ui/input'
import dayjs from 'dayjs'
import { DatePicker } from '@/shared/components/date-picker';

export default function CartPage() {
	const [search, setSearch] = useState('')
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	const [debouncedSearch] = useDebouncedValue(search, 700)
	const [debouncedDate] = useDebouncedValue(selectedDate, 300)

	const { data, isLoading, isSuccess, isFetching } =
		useGetApiDocumentImageCartQuery({})

	const filteredData = data?.result?.filter((item) => {
		const matchesName = item.name
			?.toLowerCase()
			.includes(debouncedSearch.toLowerCase())

		const matchesDate = debouncedDate
			? dayjs(item.created).isSame(dayjs(debouncedDate), 'day')
			: true

		return matchesName && matchesDate
	})
	return (
		<Card className="p-4">
			<div className='md:w-1/4 space-y-3'>
			<Input
				placeholder="اسم الملف"
				value={search}
				onChange={(e) => setSearch(e.currentTarget.value)}
			/>
			<DatePicker
				value={selectedDate}
					onChange={ ( date ) => setSelectedDate( date ?? null ) }
			/>
			</div>
			<CardContent className="flex flex-wrap gap-4">
				<Switch>
					<Match when={isSuccess}>
						<Switch>
							<Match when={isFetching}>
								<SkeletonTable />
							</Match>
							<Match when={!isFetching}>
								<For each={filteredData ?? []}>
									{(item, index) => (
										<BookItem
											name={item.name!}
											id={item.id!}
											key={index}
											image={item.path!}
										/>
									)}
								</For>
							</Match>
						</Switch>
					</Match>
					<Match when={isLoading}>
						<SkeletonTable />
					</Match>
				</Switch>
			</CardContent>
		</Card>
	)
}
