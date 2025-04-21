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

type FilterType = 'text' | 'select' | 'date' | 'number'

interface ColumnMeta {
	label?: string
	filterType?: FilterType
	filterable?: boolean
	editable?: boolean
	options?: Option[]
}

interface ColumnEditFieldProps {
	name: string
	meta?: ColumnMeta
}

export const ColumnEditField = ({ name, meta }: ColumnEditFieldProps) => {
	const [field, fieldMeta] = useField(name)
	const { setFieldValue } = useFormikContext()
	const label = meta?.label ?? name
	const filterType = meta?.filterType ?? 'text'
	const options = meta?.options ?? []

	if (meta?.editable === false) return null

	return (
		<div>
			<Label className="text-sm font-bold">{label}</Label>
			<Switch>
				<Match when={filterType === 'text'}>
					<Input {...field} placeholder={label} className="mt-1 shadow" />
					<Show when={fieldMeta.touched && fieldMeta.error}>
						<p className="text-destructive text-sm mt-1">{fieldMeta.error}</p>
					</Show>
				</Match>
				<Match when={filterType === 'select'}>
					<Select
						value={field.value}
						onValueChange={(value) => setFieldValue(name, value)}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="اختر" />
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
				<Match when={filterType === 'date'}>
					<DatePicker
						value={field.value ? new Date(field.value) : null}
						onChange={(date) => {
							const iso = date?.toISOString().split('T')[0]
							setFieldValue(name, iso)
						}}
					/>
				</Match>
				<Match when={filterType === 'number'}>
					<Input
						type="number"
						value={field.value}
						onChange={(e) => setFieldValue(name, e.target.value)}
						placeholder={label}
						className="mt-1 shadow"
					/>
				</Match>
			</Switch>
		</div>
	)
}
