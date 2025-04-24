import type { FC } from 'react'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Icon } from '@iconify/react'

import { Dropzone } from '@/shared/components/dropzone'
import { Button } from '@/shared/components/ui/button'
import { DatePicker } from '@/shared/components/date-picker'
import { TextField } from '@/shared/components/text-field'
import { Combobox } from '@/shared/components/combobox'

const CartForm: FC = () => {
	const [file, setFile] = useState<File | null>(null)

	const initialValues = {
		subject: '',
		concernedPerson: '',
		type: '',
		identifier: '',
		margin: '',
		notes: '',
		sharedWith: '',
		internalNumber: '',
		internalDate: null as Date | null
	}

	const validationSchema = Yup.object({
		subject: Yup.string().required('هذا الحقل مطلوب'),
		concernedPerson: Yup.string().required('هذا الحقل مطلوب')
	})

	const handleSubmit = (values: typeof initialValues) => {
		console.log({ ...values, file })
		// Do your submit logic here
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
					<div className="flex flex-col gap-4">
						<Dropzone
							label="اضغط لرفع المرفقات"
							setFile={setFile}
							defaultImage="/placeholder.png" // Optional
						/>
					</div>

					{/* Right: Form Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 col-span-2 gap-4">
						{/* نوع الوثيقة */}
						<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
							<label className="text-sm font-medium text-gray-700">
								نوع الكتاب
							</label>
							<Combobox
								label="اختر نوع الكتاب"
								value={values.type}
								onChange={(value) => setFieldValue('type', value)}
								options={[
									{ value: 'invoice', label: 'صادر' },
									{ value: 'certificate', label: 'وارد' },
								]}
							/>
						</div>
						<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
							<label className="text-sm font-medium text-gray-700">
								تصنيف الكتاب
							</label>
							<Combobox
								label="اختر تصنيف الكتاب"
								value={values.type}
								onChange={(value) => setFieldValue('type', value)}
								options={[
									{ value: 'invoice', label: 'طلب شخصي' },
									{ value: 'certificate', label: 'كتاب رسمي' },
									{ value: 'certificate', label: 'قصاصة' },
									{ value: 'certificate', label: 'هامش' },
									{ value: 'certificate', label: 'معلومات او بيانات' },
									{ value: 'certificate', label: 'اخرى' },
								]}
							/>
						</div>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الى"
							name="subject"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الجهة"
							name="concernedPerson"
							placeholder="الجهة المعنية"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الموضوع"
							name="identifier"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الشخص المعني"
							name="margin"
							placeholder='اكتب هنا'
						/>
						<div className="flex flex-col gap-1">
							<label className="text-sm font-medium text-gray-700">
								التاريخ  
							</label>
							<DatePicker
								value={values.internalDate}
								onChange={(date) => setFieldValue('internalDate', date)}
							/>
						</div>
						<TextField
							className="col-span-2 md:col-span-1"
							label="المعرف"
							name="notes"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="العدد"
							type='number'
							name="sharedWith"
							placeholder="اكتب هنا"
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الهامش"
							name="internalNumber"
							placeholder='اكتب هنا'
						/>

						{/* Internal Date Picker */}
						<div className="flex flex-col gap-1">
							<label className="text-sm font-medium text-gray-700">
								تاريخ الوارد الداخلي
							</label>
							<DatePicker
								value={values.internalDate}
								onChange={(date) => setFieldValue('internalDate', date)}
							/>
						</div>
						<TextField
							className="col-span-2 md:col-span-1"
							label="الملاحظة"
							name="internalNumber"
							placeholder='اكتب هنا'
						/>
						<TextField
							className="col-span-2 md:col-span-1"
							label="رقم الوارد الداخلي"
							type='number'
							name="internalNumber"
							placeholder='اكتب هنا'
						/>
						<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
							<label className="text-sm font-medium text-gray-700">
								تصنيف الكتاب
							</label>
							<Combobox
								label="مشاركة مع"
								value={values.type}
								onChange={(value) => setFieldValue('type', value)}
								options={[
									{ value: 'invoice', label: 'طلب شخصي' },
									{ value: 'certificate', label: 'كتاب رسمي' },
									{ value: 'certificate', label: 'قصاصة' },
									{ value: 'certificate', label: 'هامش' },
									{ value: 'certificate', label: 'معلومات او بيانات' },
									{ value: 'certificate', label: 'اخرى' },
								]}
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
