import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Image } from '@unpic/react'
import { useParams, useNavigate } from 'react-router-dom'
import {
	useGetApiDocumentImageCartQuery,
	useGetApiUserQuery,
	useGetApiTitleQuery,
	useGetApiDestinationQuery,
	usePostApiDocumentMutation,
	usePostApiUploadFileMutation,
	type ReturnDocumentImageCartApiBody,
	PostApiDocumentApiArg
} from '@/shared/api/archiveApi'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'
import { Dropzone } from '@/shared/components/dropzone'
import { DatePicker } from '@/shared/components/date-picker'
import { TextField } from '@/shared/components/text-field'
import { Combobox } from '@/shared/components/combobox'
import { MultiSelect } from '@/shared/components/multi-select'

const CartForm: FC = () => {
	const navigate = useNavigate()
	const [file, setFile] = useState<File | null>(null)
	const { id } = useParams<{ id: string }>()
	const { data: documentImage, isLoading } = useGetApiDocumentImageCartQuery({
		id
	})
	const { data: titlesData } = useGetApiTitleQuery({})
	const { data: usersData } = useGetApiUserQuery({})
	const { data: destinationsData } = useGetApiDestinationQuery({})
	const [documentImageData, setDocumentImageData] =
		useState<ReturnDocumentImageCartApiBody>()
	const [uploadFile] = usePostApiUploadFileMutation()
	const [createDocument] = usePostApiDocumentMutation()

	useEffect(() => {
		if (!isLoading) {
			setDocumentImageData(documentImage)
		}
	}, [isLoading, documentImage])

	if (isLoading) return <div>Loading...</div>
	if (!documentImage) return <div>Document not found</div>

	// Transform titles data for combobox
	const titleOptions =
		titlesData?.result?.map((title) => ({
			value: title.id || '',
			label: title.name || ''
		})) || []

	// Transform users data for combobox
	const userOptions =
		usersData?.result?.map((user) => ({
			value: user.id || '',
			label: user.name || ''
		})) || []

	// Transform destinations data for combobox
	const destinationOptions =
		destinationsData?.result?.map((destination) => ({
			value: destination.id || '',
			label: destination.name || ''
		})) || []

	const initialValues = {
		number: '',
		date: null as Date | null,
		nameDestination: '',
		nameTitle: '',
		type: '',
		internalIncoming: '',
		comments: '',
		footNote: '',
		concernedPerson: '',
		point: '',
		copyesTo: [] as string[],
		referencePerson: '',
		bookKind: '',
		internalIncomingDate: null as Date | null
	}

	const validationSchema = Yup.object({
		nameDestination: Yup.string().required('هذا الحقل مطلوب'),
		nameTitle: Yup.string().required('هذا الحقل مطلوب')
	})

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			let fileId: string | undefined

			// Upload file only if it exists
			if (file) {
				try {
					const uploadResponse = await uploadFile({
						body: {
							files: [file]
						}
					}).unwrap()

					// Type assertion since we know the response structure
					const response = uploadResponse as { result?: Array<{ id: string }> }
					if (response?.result?.[0]?.id) {
						fileId = response.result[0].id
					} else {
						toast.error('فشل في رفع الملف')
						return
					}
				} catch (uploadError) {
					console.error('Error uploading file:', uploadError)
					toast.error('حدث خطأ أثناء رفع الملف')
					return
				}
			}

			// Prepare document data
			const documentData: PostApiDocumentApiArg = {
				createDocument: {
					number: values.number,
					date: values.date?.toISOString().split('T')[0],
					nameDestination: values.nameDestination,
					nameTitle: values.nameTitle,
					type: values.type ? parseInt(values.type) : undefined,
					internalIncoming: values.internalIncoming,
					comments: values.comments,
					footNote: values.footNote,
					documentImageId: fileId,
					concernedPerson: values.concernedPerson,
					point: values.point,
					copyesTo: values.copyesTo,
					referencePerson: values.referencePerson,
					bookKind: values.bookKind,
					internalIncomingDate: values.internalIncomingDate
						?.toISOString()
						.split('T')[0]
				}
			}

			// Create the document
			const response = await createDocument(documentData).unwrap()

			if (response) {
				toast.success('تم إنشاء الوثيقة بنجاح')
				// Navigate to cart page
				navigate('/cart')
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			toast.error('حدث خطأ أثناء إنشاء الوثيقة')
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ setFieldValue, values }) => (
				<Form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
					{/* Left: Dropzone and Preview */}
					<div className="flex flex-col gap-4 mx-auto">
						<Image
							src={documentImageData?.result?.[0]?.path || ''}
							layout="fixed"
							width={400}
							height={200}
							alt="Document Preview"
							className="rounded-lg shadow-md"
						/>
					</div>

					{/* Right: Form Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
						<TextField
							className="col-span-2 md:col-span-1"
							label="الرقم"
							name="number"
							placeholder="اكتب هنا"
						/>
						<div className="flex flex-col gap-1">
							<label className="text-sm font-medium text-gray-700">
								التاريخ
							</label>
							<DatePicker
								value={values.date}
								onChange={(date) => setFieldValue('date', date)}
							/>
						</div>
						<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
							<label className="text-sm font-medium text-gray-700">الجهة</label>
							<Combobox
								label="اختر الجهة"
								value={values.nameDestination}
								onChange={(value) => setFieldValue('nameDestination', value)}
								options={destinationOptions}
							/>
						</div>
						<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
							<label className="text-sm font-medium text-gray-700">
								العنوان
							</label>
							<Combobox
								label="اختر العنوان"
								value={values.nameTitle}
								onChange={(value) => setFieldValue('nameTitle', value)}
								options={titleOptions}
							/>
						</div>
						<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
							<label className="text-sm font-medium text-gray-700">
								نوع الكتاب
							</label>
							<Combobox
								label="اختر نوع الكتاب"
								value={values.type}
								onChange={(value) => setFieldValue('type', value)}
								options={[
									{ value: '0', label: 'صادر' },
									{ value: '1', label: 'وارد' }
								]}
							/>
						</div>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الوارد الداخلي"
							name="internalIncoming"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الملاحظات"
							name="comments"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الهامش"
							name="footNote"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الشخص المعني"
							name="concernedPerson"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="النقطة"
							name="point"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="المرجع"
							name="referencePerson"
							placeholder="اكتب هنا"
						/>
						<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
							<label className="text-sm font-medium text-gray-700">
								تصنيف الكتاب
							</label>
							<Combobox
								label="اختر تصنيف الكتاب"
								value={values.bookKind}
								onChange={(value) => setFieldValue('bookKind', value)}
								options={[
									{ value: 'طلب شخصي', label: 'طلب شخصي' },
									{ value: 'كتاب رسمي', label: 'كتاب رسمي' },
									{ value: 'قصاصة', label: 'قصاصة' },
									{ value: 'هامش', label: 'هامش' },
									{ value: 'معلومات او بيانات', label: 'معلومات او بيانات' },
									{ value: 'اخرى', label: 'اخرى' }
								]}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sm font-medium text-gray-700">
								تاريخ الوارد الداخلي
							</label>
							<DatePicker
								value={values.internalIncomingDate}
								onChange={(date) => setFieldValue('internalIncomingDate', date)}
							/>
						</div>
						<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
							<label className="text-sm font-medium text-gray-700">
								نسخ إلى
							</label>
							<MultiSelect
								options={userOptions}
								value={userOptions.filter((option) =>
									values.copyesTo.includes(option.value)
								)}
								onChange={(selected) =>
									setFieldValue(
										'copyesTo',
										selected.map((item) => item.value)
									)
								}
								placeholder="اختر الأشخاص"
							/>
						</div>
						<div className="w-full col-span-2">
							<Dropzone
								label="اضغط لرفع المرفقات"
								setFile={(files) => setFile(files ? files[0] : null)}
								multiple
							/>
						</div>
						<Button type="submit" className="mt-4 col-span-2">
							<Icon icon="solar:archive-bold-duotone" className="mr-2" />
							أرشفة
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default CartForm
