import { Column } from '@tanstack/react-table'
import { Icon } from '@iconify/react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu'
import { Switch, Match } from '@/shared/components/utils/switch'

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
}

export function TableColumnHeader<TData, TValue>({
	column,
	title,
	className
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>
	}

	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						<Switch>
							<Match when={column.getIsSorted() === 'desc'}>
								<Icon icon="solar:sort-from-bottom-to-top-line-duotone" />
							</Match>
							<Match when={column.getIsSorted() === 'asc'}>
								<Icon icon="solar:sort-from-top-to-bottom-bold-duotone" />
							</Match>
							<Match when={!column.getIsSorted()}>
								<Icon icon="solar:sort-vertical-line-duotone" />
							</Match>
						</Switch>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<Icon icon="solar:sort-from-bottom-to-top-line-duotone" />
						تصاعدي
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<Icon icon="solar:sort-from-top-to-bottom-bold-duotone" />
						تنازلي
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<Icon icon="solar:eye-bold-duotone" />
						اخفاء
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
