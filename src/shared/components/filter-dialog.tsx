import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
  DialogFooter,
  DialogClose
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

// review
export const FilterDialog = ({ columns, columnFilters, setColumnFilters }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">تصفية</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[425px] md:max-w-[600px] max-h-[100%] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>تصفية العواميد</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-6">
					<div className="grid md:grid-cols-2 gap-4">
						{columns
							.filter((col) => col.getCanFilter())
							.map((col) => {
								const columnId = col.id
								const filterValue = col.getFilterValue() as string

								return (
									<div key={columnId}>
										<label className="text-sm font-medium">
											{col.columnDef.meta?.label}
										</label>
										<Input
											value={filterValue ?? ''}
											onChange={(e) => col.setFilterValue(e.target.value)}
											placeholder={col.columnDef.meta?.label}
											className="mt-1"
										/>
									</div>
								)
							})}
					</div>
        </div>
        <DialogFooter>
          <DialogClose className='w-full'>
            <Button className='w-full'>تأكيد</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
		</Dialog>
	)
}
