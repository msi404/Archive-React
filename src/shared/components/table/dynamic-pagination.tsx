import type { Table } from '@tanstack/react-table'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext
} from '@/shared/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { For } from '@/shared/components/utils/for'
import { Show } from '@/shared/components/utils/show'

interface DynamicPaginationProps<T> {
	table: Table<T>
	total: number
}

export const DynamicPagination = <T,>({
	table,
	total
}: DynamicPaginationProps<T>) => {
	const { pageIndex, pageSize } = table.getState().pagination
	const pageCount = table.getPageCount()

	const startItem = pageIndex * pageSize + 1
	const endItem = Math.min((pageIndex + 1) * pageSize, total)

	const generatePageRange = () => {
		const totalPages = pageCount
		const current = pageIndex
		const delta = 2
		const range: (number | -1)[] = []

		const left = Math.max(0, current - delta)
		const right = Math.min(totalPages - 1, current + delta)

		if (left > 0) {
			range.push(0)
			if (left > 1) range.push(-1)
		}

		for (let i = left; i <= right; i++) {
			range.push(i)
		}

		if (right < totalPages - 1) {
			if (right < totalPages - 2) range.push(-1)
			range.push(totalPages - 1)
		}

		return range
	}

	const pages = generatePageRange()

	return (
		<div className="flex flex-col md:flex-row justify-between items-center px-4 py-6 gap-4 text-sm">
			<div>
				عرض من <span className="font-medium">{startItem}</span> إلى{' '}
				<span className="font-medium">{endItem}</span> من أصل{' '}
				<span className="font-medium">{total}</span> مدخل
			</div>
			<Pagination>
				<PaginationContent className="flex-wrap justify-center gap-1">
					<PaginationItem>
						<PaginationPrevious
							onClick={table.previousPage}
							className={
								table.getCanPreviousPage()
									? ''
									: 'pointer-events-none opacity-50'
							}
						/>
					</PaginationItem>

					<For each={pages}>
						{(page, index) => (
							<Show
								when={page !== -1}
								fallback={
									<PaginationItem key={index} className="px-2">
										...
									</PaginationItem>
								}
							>
								<PaginationItem>
									<PaginationLink
										onClick={() => table.setPageIndex(page)}
										isActive={pageIndex === page}
									>
										{page + 1}
									</PaginationLink>
								</PaginationItem>
							</Show>
						)}
					</For>
					<PaginationItem>
						<PaginationNext
							onClick={() => table.nextPage()}
							className={
								table.getCanNextPage() ? '' : 'pointer-events-none opacity-50'
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<div className="flex items-center gap-2">
				<span>الذهاب إلى الصفحة:</span>
				<Select
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onValueChange={(value: any) => table.setPageIndex(Number(value))}
				>
					<SelectTrigger className="w-20 h-8">
						<SelectValue placeholder={pageIndex + 1} />
					</SelectTrigger>
					<SelectContent>
						{Array.from({ length: pageCount }, (_, i) => (
							<SelectItem key={i} value={String(i)}>
								{i + 1}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
