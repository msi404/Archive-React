import type { FC } from 'react'
import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogFooter
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { usePostApiDocumentImageCartMutation } from '@/shared/api/archiveApi'
import { usePostApiUploadFileMutation } from '@/shared/api/archiveApiEnhance'
import { SingleDropzone } from '@/shared/components/single-dropzone'
import type { CreateDocumentImageCart } from '@/shared/api/archiveApi'

export const AddedDialog: FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const [open, setOpen] = useState(false)

	const [uploadFile, { isLoading: isUploading }] =
		usePostApiUploadFileMutation()
	const [postToCart, { isLoading: isPosting }] =
		usePostApiDocumentImageCartMutation()

	const handleUpload = async () => {
		if (!file) return

		try {
			const res = await uploadFile({ body: { files: [file] } }).unwrap()
			console.log(res)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			const uploadedFile = res?.[0]
			if (!uploadedFile) throw new Error('File not returned from API')

			const cartPayload: CreateDocumentImageCart = {
				name: uploadedFile.name,
				path: uploadedFile.path,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-expect-error
				size: res.size,
				date: new Date().toISOString()
			}

			await postToCart({ createDocumentImageCart: cartPayload }).unwrap()

			setOpen(false)
			setFile(null)
		} catch (err) {
			console.error('❌ Failed:', err)
			setOpen(false)
		}
	}

	return (
		<>
			<Button onClick={() => setOpen(true)} className="w-full md:w-1/2">
				اضافة عنصر
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogTitle>رفع صورة</DialogTitle>
					<SingleDropzone
						label="ارفع الصورة هنا"
						setFile={(selectedFile) => setFile(selectedFile)}
					/>
					<DialogFooter className="pt-4">
						<Button
							className="w-full"
							onClick={handleUpload}
							disabled={!file || isUploading || isPosting}
						>
							{isUploading || isPosting ? 'تحميل...' : 'اضافة'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
