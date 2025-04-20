import type {FC} from 'react'
import
	{
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	DialogFooter
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator';

export const DeleteDialog: FC<{action: () => void, isLoading: boolean}> = ({action, isLoading}) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant='destructive'>حذف</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex justify-center mx-auto'>
					<DialogTitle>هل تريد فعلاً حذف العنصر؟</DialogTitle>
				</DialogHeader>
				<Separator />
				<DialogFooter className="flex justify-between">
					<Button disabled={isLoading} variant="destructive" onClick={action}>حذف</Button>
					<DialogClose>
						<Button variant='outline'>
						الغاء
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
