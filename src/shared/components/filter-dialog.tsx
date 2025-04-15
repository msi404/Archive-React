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
import {Separator} from '@/shared/components/ui/separator'
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { For } from '@/shared/components/utils/for'

interface FilterDialogProps<TData> {
	columns: Column<TData, unknown>[]
}

export const FilterDialog = <TData,>({
	columns,
}: FilterDialogProps<TData>) => {
	const filteredColumns = columns.filter((col) => col.getCanFilter())
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
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
							{(col) => (
								<div key={col.id}>
									<Label className="text-sm font-medium">
									{(col.columnDef.meta as { label?: string })?.label}
									</Label>
									<Input
										value={(col.getFilterValue() as string) ?? ''}
										onChange={(e) => col.setFilterValue(e.target.value)}
										placeholder={(col.columnDef.meta as { label?: string })?.label}
										className="mt-1"
									/>
								</div>
							)}
						</For>
					</div>
				</div>
          <Separator/>
				<DialogFooter>
					<DialogClose className="w-full">
						<Button className="w-full">تأكيد</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
