import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogFooter
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import type { ReturnDocument } from '@/shared/api/archiveApi'

type EditShareDialogProps = {
	open: boolean
	onClose: () => void
	initialData: ReturnDocument
	onSubmit: (updated: ReturnDocument) => Promise<void>
	isLoading: boolean
}

export const EditShareDialog = ({
	open,
	onClose,
	initialData,
	onSubmit,
	isLoading
}: EditShareDialogProps) => {
	const [selectedUsers, setSelectedUsers] = useState<string[]>([])
	const [selectAll, setSelectAll] = useState(false)

	// Initialize selected users from initialData - start with none selected
	useEffect(() => {
		// Reset selections when dialog opens with new data
		setSelectedUsers([])
		setSelectAll(false)
	}, [initialData])

	// Check if all users are selected
	useEffect(() => {
		if (initialData?.shareDocuments?.length) {
			setSelectAll(selectedUsers.length === initialData.shareDocuments.length)
		}
	}, [selectedUsers, initialData?.shareDocuments?.length])

	const handleSelectAll = () => {
		if (selectAll) {
			setSelectedUsers([])
		} else if (initialData?.shareDocuments?.length) {
			const userIds = initialData.shareDocuments
				.map((doc) => doc.toUser?.id)
				.filter(Boolean) as string[]
			setSelectedUsers(userIds)
		}
		setSelectAll(!selectAll)
	}

	const toggleUser = (userId: string) => {
		setSelectedUsers((prev) => {
			if (prev.includes(userId)) {
				return prev.filter((id) => id !== userId)
			} else {
				return [...prev, userId]
			}
		})
	}

	const handleSubmit = async () => {
		if (!selectedUsers.length) return

		// Create an updated document that EXCLUDES the selected shareDocuments (to delete them)
		const updatedDoc = {
			...initialData,
			shareDocuments:
				initialData.shareDocuments?.filter(
					(doc) => !doc.toUser?.id || !selectedUsers.includes(doc.toUser.id)
				) || []
		}

		await onSubmit(updatedDoc)
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<div className="flex items-center gap-2 p-4 border-b">
					<Checkbox
						id="select-all"
						checked={selectAll}
						onCheckedChange={handleSelectAll}
					/>
					<label
						htmlFor="select-all"
						className="cursor-pointer text-base font-medium"
					>
						اختيار الكل
					</label>
				</div>

				<div className="space-y-4 max-h-96 overflow-y-auto py-2">
					{initialData?.shareDocuments?.map((doc, index) => (
						<div
							key={index}
							className="flex items-center gap-2 px-4 py-2 border-b"
						>
							<Checkbox
								id={`user-${doc.toUser?.id}`}
								checked={selectedUsers.includes(doc.toUser?.id as string)}
								onCheckedChange={() => toggleUser(doc.toUser?.id as string)}
							/>
							<label
								htmlFor={`user-${doc.toUser?.id}`}
								className="w-full cursor-pointer"
							>
								{doc.toUser?.name}
							</label>
						</div>
					))}
				</div>

				<DialogFooter className="flex justify-between w-full mt-4">
					<Button
						type="button"
						variant="outline"
						onClick={onClose}
						className="flex-1"
					>
						إلغاء
					</Button>
					<Button
						type="button"
						onClick={handleSubmit}
						disabled={selectedUsers.length === 0 || isLoading}
						className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						حذف
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
