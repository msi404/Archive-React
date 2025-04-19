import type { Column } from '@tanstack/react-table'
import { Icon } from '@iconify/react'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from '@/shared/components/ui/dialog'
import { Separator } from '@/shared/components/ui/separator'
import { Button } from '@/shared/components/ui/button'
import {ColumnFilterInput} from '@/shared/components/table/column-filter-input'
import { For } from '@/shared/components/utils/for'

interface FilterDialogProps<TData> {
	columns: Column<TData, unknown>[]
}

export const FilterDialog = <TData,>({ columns }: FilterDialogProps<TData>) => {
	const filteredColumns = columns.filter((col) => col.getCanFilter())
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Icon icon="solar:filter-bold-duotone" />
					<span>تصفية</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[425px] md:max-w-[600px] max-h-[100%] overflow-y-auto">
				<DialogHeader className="mx-auto">
					<DialogTitle>تصفية</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="grid gap-4 py-6">
					<div className="grid md:grid-cols-2 gap-4">
						<For each={filteredColumns}>
							{(col) => <ColumnFilterInput key={col.id} column={col} />}
						</For>
					</div>
				</div>
				<Separator />
				<DialogFooter>
					<DialogClose className="w-full">
						<Button className="w-full">تأكيد</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}