'use client'
import { type FC } from 'react'
import { useField } from 'formik'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

interface TextFieldProps {
	label: string
	name: string
	type?: string
	placeholder?: string
	disabled?: boolean
}

export const TextField: FC<TextFieldProps> = ({
	label,
	name,
	type = 'text',
	placeholder,
	disabled
}) => {
	const [field, meta] = useField(name)
	return (
		<div className="flex flex-col gap-3">
			<Label>{label}</Label>
			<Input
				{...field}
				type={type}
				disabled={disabled}
				className={
					meta.touched && meta.error
						? 'border-red-500 outline-red-500 text-red-500'
						: ''
				}
				placeholder={meta.error || placeholder}
			/>
		</div>
	)
}
