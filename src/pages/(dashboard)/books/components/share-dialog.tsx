import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/lib/features/authSlice'
import { useGetApiUserQuery } from '@/shared/api/archiveApi'
import type { ReturnDocument } from '@/shared/api/archiveApi'
import { usePostApiShareDocumentMutation } from '@/shared/api/archiveApiEnhance'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { MultiSelect } from '@/shared/components/multi-select'
import { Formik, Form, useField } from 'formik'
import { Button } from '@/shared/components/ui/button'

export const ShareDialog: FC<{
	open: boolean
	onClose: () => void
	doc: ReturnDocument
}> = ({ open, onClose, doc }) => {
	const currentUser = useSelector(selectUser)
	const [users, setUsers] = useState<{ label: string; value: string }[]>([])
	const { data, isLoading: isLoadingUsers } = useGetApiUserQuery({})
	const [shareDocument, { isLoading: isLoadingShareDocument }] =
		usePostApiShareDocumentMutation({})

	useEffect(() => {
		if (!isLoadingUsers) {
			const options =
				data?.result?.map((user) => ({
					label: user.name,
					value: user.id
				})) ?? []
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			setUsers(options)
		}
	}, [isLoadingUsers, data])

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="h-96">
				<DialogHeader className="mx-auto">
					<DialogTitle>مشاركة العنصر</DialogTitle>
				</DialogHeader>
				<Formik
					initialValues={{ user: [] }}
					onSubmit={async (values) => {
						try {
							await Promise.all(
								values.user.map((userId: { label: string; value: string }) =>
									shareDocument({
										createShareDocument: {
											documentId: doc.id,
											toUserId: userId.value,
											// eslint-disable-next-line @typescript-eslint/ban-ts-comment
											//@ts-expect-error
											fromUserId: currentUser.id
										}
									})
								)
							)
							onClose()
						} catch (error) {
							console.error('Error sharing document:', error)
						}
					}}
				>
					{() => (
						<Form>
							<div className="space-y-4">
								<Button
									disabled={isLoadingShareDocument}
									className="w-full"
									type="submit"
								>
									مشاركة
								</Button>
								<UserMultiSelect options={users} />
							</div>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	)
}

const UserMultiSelect: FC<{ options: { label: string; value: string }[] }> = ({
	options
}) => {
	const [field, , helpers] = useField('user')

	return (
		<MultiSelect
			value={field.value}
			onChange={(val) => helpers.setValue(val)}
			options={options}
			placeholder="اختر المستخدمين"
		/>
	)
}
