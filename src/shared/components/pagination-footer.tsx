/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type { Table } from '@tanstack/react-table'

interface PaginationFooterProps<T> {
	table: Table<T>
	totalItems: number
}

export function PaginationFooter<T>({
	table,
	totalItems
}: PaginationFooterProps<T>) {
	const { pageIndex, pageSize } = table.getState().pagination
	const pageCount = table.getPageCount()

	const startItem = pageIndex * pageSize + 1
	const endItem = Math.min((pageIndex + 1) * pageSize, totalItems)

	const maxVisiblePages = 5
	const generatePageRange = () => {
		if (pageCount <= maxVisiblePages) {
			return [...Array(pageCount).keys()]
		}

		const range = []
		const left = Math.max(0, pageIndex - 1)
		const right = Math.min(pageCount - 1, pageIndex + 1)

		if (left > 1)
			range.push(0, -1) // -1 as ellipsis
		else range.push(...[...Array(left + 1).keys()])

		range.push(...Array.from({ length: right - left + 1 }, (_, i) => left + i))

		if (right < pageCount - 2) range.push(-1, pageCount - 1)
		else {
			const remaining = [...Array(pageCount - right - 1).keys()].map(
				(i) => right + 1 + i
			)
			range.push(...remaining)
		}

		return range
	}

	const pages = generatePageRange()

	return (
		<div className="flex flex-col md:flex-row justify-between items-center px-4 py-6 gap-4 text-sm">
			<div>
				عرض من <span className="font-medium">{startItem}</span> إلى{' '}
				<span className="font-medium">{endItem}</span> من أصل{' '}
				<span className="font-medium">{totalItems}</span> مدخل
			</div>

			<Pagination>
				<PaginationContent className="flex-wrap justify-center gap-1">
					<PaginationItem>
						<PaginationPrevious
							onClick={() => table.previousPage()}
							className={
								table.getCanPreviousPage()
									? ''
									: 'pointer-events-none opacity-50'
							}
						/>
					</PaginationItem>

					{pages.map((page, index) =>
						page === -1 ? (
							<PaginationItem key={`ellipsis-${index}`} className="px-2">
								...
							</PaginationItem>
						) : (
							<PaginationItem key={page}>
								<PaginationLink
									isActive={pageIndex === page}
									onClick={() => table.setPageIndex(page)}
								>
									{page + 1}
								</PaginationLink>
							</PaginationItem>
						)
					)}

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
