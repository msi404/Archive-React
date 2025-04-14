import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Table } from '@tanstack/react-table'
import { Icon } from '@iconify/react'
import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator
} from '@/shared/components/ui/dropdown-menu'
import { For } from '@/shared/components/utils/for'

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>
}

export function TableViewOptions<TData>({
	table
}: DataTableViewOptionsProps<TData>) {
	const columns = table
		.getAllColumns()
		.filter(
			(column) =>
				typeof column.accessorFn !== 'undefined' && column.getCanHide()
		)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="ml-auto hidden h-8 lg:flex"
				>
					<Icon icon="solar:settings-bold-duotone" width={40} />
					اظهار
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px]">
				<DropdownMenuLabel>تفعيل العواميد</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<For each={columns}>
					{(column) => (
						<DropdownMenuCheckboxItem
							key={column.id}
							className="capitalize"
							checked={column.getIsVisible()}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
						>
							{column.columnDef.meta?.label}
						</DropdownMenuCheckboxItem>
					)}
				</For>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
