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


type FilterType = 'text' | 'select' | 'date' | 'number'

interface ColumnMeta {
	label?: string
	filterType?: FilterType
	filterable: boolean
	options?: string[]
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
		column.setFilterValue(debounced)
	}, [ column, debounced ] )
	
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
							<SelectValue placeholder="Select an item" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Items</SelectLabel>
								<For each={options}>
									{(item, index) => (
										<SelectItem key={index} value={item}>
											{item}
										</SelectItem>
									)}
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
