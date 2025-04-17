import type { Column } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
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
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { For } from '@/shared/components/utils/for'

interface FilterDialogProps<TData> {
	columns: Column<TData, unknown>[]
}

export const FilterDialog = <TData,>({ columns }: FilterDialogProps<TData>) => {
	const filteredColumns = columns.filter((col) => col.getCanFilter())
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>
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

interface ColumnFilterInputProps<TData> {
	column: Column<TData, unknown>
}

function ColumnFilterInput<TData>({ column }: ColumnFilterInputProps<TData>) {
	const label =
		(column.columnDef.meta as { label?: string })?.label ?? column.id
	const [inputValue, setInputValue] = useState(
		(column.getFilterValue() as string) ?? ''
	)
	const [debounced] = useDebouncedValue(inputValue, 400)

	useEffect(() => {
		column.setFilterValue(debounced)
	}, [column, debounced])

	return (
		<div>
			<Label className="text-sm font-bold">{label}</Label>
			<Input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder={label}
				className="mt-1 shadow"
			/>
		</div>
	)
}
