import type { Column } from '@tanstack/react-table'
import { useDebouncedValue } from '@mantine/hooks'
import { useState, useEffect } from 'react'
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

type Option = string | { label: string; value: string }

type FilterType = 'text' | 'select' | 'date' | 'number'

interface ColumnMeta {
	label?: string
	filterType?: FilterType
	filterable: boolean
	options?: Option[]
}

interface ColumnFilterInputProps<TData> {
	column: Column<TData, unknown>
}

export function ColumnFilterInput<TData>({ column }: ColumnFilterInputProps<TData>) {
	const meta = column.columnDef.meta as ColumnMeta | undefined
	const filterType = meta?.filterType ?? 'text'
	const options = meta?.options ?? []
	const label =
		(column.columnDef.meta as { label?: string })?.label ?? column.id
	const [inputValue, setInputValue] = useState(
		(column.getFilterValue() as string) ?? ''
	)
	const [debounced] = useDebouncedValue(inputValue, 1000)

	useEffect(() => {
		// Get options and column from props within the effect's scope
		const { options: currentOptions } = (column.columnDef.meta || {}) as ColumnMeta
		const currentFilter = column.getFilterValue()

		const foundOption = (currentOptions ?? []).find((opt) => {
			if (typeof opt === 'string') {
				return opt === debounced
			}
			return opt.value === debounced
		})

		const valueToSet = foundOption && typeof foundOption !== 'string' ? foundOption.value : debounced

		// Only set the filter value if it has actually changed
		if (valueToSet !== currentFilter) {
			column.setFilterValue(valueToSet)
		}
	}, [ debounced ] )
	
	if (meta?.filterable === false) return null

	return (
		<div>
			<Label className="text-sm font-bold">{label}</Label>
			<Switch>
				<Match when={filterType === 'text'}>
					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder={label}
						className="mt-1 shadow"
					/>
				</Match>
				<Match when={filterType === 'select'}>
					<Select
						value={inputValue}
						onValueChange={(value) => setInputValue(value)}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select an item">
								{options.find(opt => (typeof opt === 'string' ? opt : opt.value) === inputValue)
									? (typeof options.find(opt => (typeof opt === 'string' ? opt : opt.value) === inputValue) === 'string'
										? inputValue
										: (options.find(opt => (typeof opt === 'string' ? opt : opt.value) === inputValue) as { label: string }).label)
									: 'Select an item'}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Items</SelectLabel>
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
						value={inputValue ? new Date(inputValue) : null}
						onChange={(date) => {
							const iso = date?.toISOString().split('T')[0]
							if (iso) setInputValue(iso)
							else setInputValue('')
						}}
					/>
				</Match>
				<Match when={filterType === 'number'}>
					<Input
						type="number"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder={label}
						className="mt-1 shadow"
					/>
				</Match>
			</Switch>
		</div>
	)
}
