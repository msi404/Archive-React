import type { FC } from 'react'
import { useState, useEffect } from 'react'
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
import { ClipLoader } from 'react-spinners'
// Import Lightbox and styles
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// Import Zoom plugin (assuming CSS is included in main styles or not needed based on previous fix)
import Zoom from "yet-another-react-lightbox/plugins/zoom";

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
	const [isPreviewError, setIsPreviewError] = useState(false);
	const [showLoader, setShowLoader] = useState(isLoading);
	const [openLightbox, setOpenLightbox] = useState(false);
	const MIN_LOADER_TIME = 500;

	useEffect(() => {
		if (!isLoading) {
			const timer = setTimeout(() => {
				setShowLoader(false);
			}, MIN_LOADER_TIME);

			setDocumentImageData(documentImage)
			setIsPreviewError(false);

			return () => clearTimeout(timer);
		} else {
			setShowLoader(true);
		}
	}, [isLoading, documentImage])

	const previewSrc = documentImageData?.result?.[0]?.path || ''
	useEffect(() => {
		setIsPreviewError(false)
	}, [previewSrc])

	console.log('CartForm isLoading:', isLoading);

	if (showLoader) {
		return (
			<div className="flex justify-center items-center h-[calc(100vh-200px)]">
				<ClipLoader
					color={"hsl(var(--primary))"}
					loading={showLoader}
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		);
	}

	if (!documentImage && !isLoading && !showLoader) return <div>لا توجد بيانات</div>

	const titleOptions =
		titlesData?.result?.map((title) => ({
			value: title.id || '',
			label: title.name || ''
		})) || []

	const userOptions =
		usersData?.result?.map((user) => ({
			value: user.id || '',
			label: user.name || ''
		})) || []

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

			if (file) {
				try {
					const uploadResponse = await uploadFile({
						body: {
							files: [file]
						}
					}).unwrap()

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

			const response = await createDocument(documentData).unwrap()

			if (response) {
				toast.success('تم إنشاء الوثيقة بنجاح')
				navigate('/cart')
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			toast.error('حدث خطأ أثناء إنشاء الوثيقة')
		}
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue, values }) => (
					<Form className="p-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
							<div className="md:col-span-1 flex flex-col space-y-4">
								<div 
									className="w-full h-64 lg:h-80 border border-border rounded-lg shadow-md bg-muted flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
									onClick={() => !isPreviewError && previewSrc && setOpenLightbox(true)}
								>
									{isPreviewError || !previewSrc ? (
										<Icon icon="solar:bug-minimalistic-bold-duotone" className="w-16 h-16 text-destructive" />
									) : (
										<img
											src={previewSrc}
											alt="Document Preview"
											className="max-h-full max-w-full object-contain rounded-lg"
											onError={() => setIsPreviewError(true)}
										/>
									)}
								</div>
								
								<div className="w-full">
									<label className="text-sm font-medium text-gray-700 mb-1 block">إضافة مرفقات</label>
									<Dropzone
										label="اضغط لرفع المرفقات أو اسحبها هنا"
										setFile={ ( files ) => setFile( files ? files[ 0 ] : null ) }
										multiple
									/>
								</div>

								<Button type="submit" className="w-full mt-auto pt-4">
									<Icon icon="solar:archive-bold-duotone" className="mr-2" />
									أرشفة
								</Button>
							</div>
							
							<div className="md:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
								<TextField
									className="sm:col-span-1"
									label="العدد"
									name="number"
									placeholder="اكتب هنا"
								/>
								<div className="flex flex-col gap-1">
									<label className="text-sm font-medium text-gray-700">التاريخ</label>
									<DatePicker
										value={values.date}
										onChange={(date) => setFieldValue('date', date)}
									/>
								</div>
								<div className="flex flex-col gap-1 sm:col-span-1">
									<label className="text-sm font-medium text-gray-700">الجهة</label>
									<Combobox
										label="اختر الجهة"
										value={values.nameDestination}
										onChange={(value) => setFieldValue('nameDestination', value)}
										options={destinationOptions}
									/>
								</div>
								<div className="flex flex-col gap-1 sm:col-span-1">
									<label className="text-sm font-medium text-gray-700">العنوان</label>
									<Combobox
										label="اختر العنوان"
										value={values.nameTitle}
										onChange={(value) => setFieldValue('nameTitle', value)}
										options={titleOptions}
									/>
								</div>
								<div className="flex flex-col gap-1 sm:col-span-1">
									<label className="text-sm font-medium text-gray-700">نوع الكتاب</label>
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
									<div className="flex flex-col gap-1">
									<label className="text-sm font-medium text-gray-700">مشاركة مع</label>
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
																<div className="flex flex-col gap-1 sm:col-span-1">
									<label className="text-sm font-medium text-gray-700">تصنيف الكتاب</label>
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
								<TextField
									className="sm:col-span-1"
									label="الوارد الداخلي"
									name="internalIncoming"
									placeholder="اكتب هنا"
								/>
								<TextField
									className="sm:col-span-1"
									label="الملاحظات"
									name="comments"
									placeholder="اكتب هنا"
								/>
								<TextField
									className="sm:col-span-1"
									label="الهامش"
									name="footNote"
									placeholder="اكتب هنا"
								/>
								<TextField
									className="sm:col-span-1"
									label="الشخص المعني"
									name="concernedPerson"
									placeholder="اكتب هنا"
								/>
								<TextField
									className="sm:col-span-1"
									label="المعرف"
									name="username"
									placeholder="اكتب هنا"
								/>
								<TextField
									className="sm:col-span-1"
									label="الى"
									name="referencePerson"
									placeholder="اكتب هنا"
								/>
								<div className="flex flex-col gap-1">
									<label className="text-sm font-medium text-gray-700">تاريخ الوارد الداخلي</label>
									<DatePicker
										value={values.internalIncomingDate}
										onChange={(date) => setFieldValue('internalIncomingDate', date)}
									/>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>

			<Lightbox
				open={openLightbox}
				close={() => setOpenLightbox(false)}
				plugins={[Zoom]}
				slides={previewSrc ? [
					{ src: previewSrc, alt: "Document Preview", width: 1200, height: 1600 },
				] : []}
				controller={{ closeOnBackdropClick: true }}
				styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
			/>
		</>
	)
}

export default CartForm
