import { type FC } from 'react'
import { useField } from 'formik'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {cn} from '@/shared/lib/utils'
interface TextFieldProps {
	label: string
	name: string
	type?: string
	placeholder?: string
	disabled?: boolean
	className?: string
}

export const TextField: FC<TextFieldProps> = ({
	label,
	name,
	type = 'text',
	placeholder,
	disabled,
	className
}) => {
	const [field, meta] = useField(name)
	return (
		<div className={cn('flex flex-col gap-2', className)}>
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
