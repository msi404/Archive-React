import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { DatePicker } from '@/shared/components/date-picker'
import { For } from '@/shared/components/utils/for'
import { Switch, Match } from '@/shared/components/utils/switch'
import { Show } from '@/shared/components/utils/show'
import { useField, useFormikContext } from 'formik'

type Option = string | { label: string; value: string }

type FieldType = 'text' | 'select' | 'date' | 'number' | 'password' // Added password type

// Define meta specifically for creation fields
interface ColumnCreateMeta {
	label?: string
	type?: FieldType // Use FieldType
	filterable?: boolean // Keep filterable/pinnable if needed for other logic
	pinnable?: boolean
	creatable?: boolean // Use creatable instead of editable
	options?: Option[]
	defaultValue?: unknown // Add defaultValue for creation forms
  validation?: unknown // Keep validation
}

interface ColumnCreateFieldProps {
	name: string
	meta?: ColumnCreateMeta
}

export const ColumnCreateField = ({ name, meta }: ColumnCreateFieldProps) => {
	const [field, fieldMeta] = useField(name)
	const { setFieldValue } = useFormikContext()
	const label = meta?.label ?? name
	const fieldType = meta?.type ?? 'text' // Renamed for clarity
	const options = meta?.options ?? []

  // Check for the creatable prop
	if (meta?.creatable === false) return null

	return (
		<div>
			<Label className="text-sm font-bold">{label}</Label>
			<Switch>
				<Match when={fieldType === 'text'}>
					<Input {...field} placeholder={label} className="mt-1 shadow" />
				</Match>
        <Match when={fieldType === 'password'}>
					<Input {...field} type="password" placeholder={label} className="mt-1 shadow" />
				</Match>
				<Match when={fieldType === 'select'}>
					<Select
						value={field.value}
						onValueChange={(value) => setFieldValue(name, value)}
					>
						<SelectTrigger className="w-full mt-1 shadow">
							<SelectValue placeholder={`اختر ${label}`}>
								{options.find(opt => (typeof opt === 'string' ? opt : opt.value) === field.value)
									? (typeof options.find(opt => (typeof opt === 'string' ? opt : opt.value) === field.value) === 'string'
										? field.value
										: (options.find(opt => (typeof opt === 'string' ? opt : opt.value) === field.value) as { label: string }).label)
									: `اختر ${label}`}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>خيارات</SelectLabel>
								<For each={options}>
									{(item, index) => {
										const value = typeof item === 'string' ? item : item.value
										const label = typeof item === 'string' ? item : item.label

										return (
											<SelectItem key={index} value={value}>
												{label}
											</SelectItem>
										)
									}}
								</For>
							</SelectGroup>
						</SelectContent>
					</Select>
				</Match>
				<Match when={fieldType === 'date'}>
					<DatePicker
            className='mt-1 shadow'
						value={field.value ? new Date(field.value) : null}
						onChange={(date) => {
							const iso = date?.toISOString().split('T')[0]
							setFieldValue(name, iso)
						}}
					/>
				</Match>
				<Match when={fieldType === 'number'}>
					<Input
						type="number"
						value={field.value}
						onChange={(e) => setFieldValue(name, e.target.value)} // Directly set value, consider parsing if needed
						placeholder={label}
						className="mt-1 shadow"
					/>
				</Match>
			</Switch>
      {/* Common error display */}
      <Show when={fieldMeta.touched && fieldMeta.error}>
				<p className="text-destructive text-sm mt-1">{fieldMeta.error}</p>
			</Show>
		</div>
	)
}
