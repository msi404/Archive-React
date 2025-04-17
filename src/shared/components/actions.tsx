import type { FC } from 'react'
import { Button } from '@/shared/components/ui/button'
import { DeleteDialog } from '@/shared/components/delete-dialog'
export const Actions: FC<{
	action: () => void
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	doc: any
	isLoading: boolean
}> = ({ action, doc, isLoading }) => {
	return (
		<div className="flex justify-between gap-3">
			<Button variant='outline' onClick={() => console.log('تعديل', doc)}>
				تعديل
			</Button>
			<DeleteDialog isLoading={isLoading} action={action} />
		</div>
	)
}
