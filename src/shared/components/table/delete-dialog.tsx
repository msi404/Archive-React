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

export const DeleteDialog: FC<{action: () => void, isLoading: boolean}> = ({action, isLoading}) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant='destructive'>حذف</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>هل اتريد فعلاً حذف العنصر؟</DialogTitle>
				</DialogHeader>
				<DialogFooter className="flex justify-between">
					<Button disabled={isLoading} variant="destructive" onClick={action}>حذف</Button>
					<DialogClose>الغاء</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
