'use client'

import * as React from 'react'
import { Icon } from '@iconify/react'

import { Badge } from '@/shared/components/ui/badge'
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList
} from '@/shared/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'

type OptionType = Record<'value' | 'label', string>

interface MultiSelectProps {
	options: OptionType[]
	value: OptionType[] // controlled from outside
	onChange: (selected: OptionType[]) => void // controlled handler
	placeholder?: string
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	value,
	onChange,
	placeholder = 'اختر العناصر...'
}) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [open, setOpen] = React.useState(false)
	const [inputValue, setInputValue] = React.useState('')

	const handleUnselect = React.useCallback((option: OptionType) => {
		onChange(value.filter((s) => s.value !== option.value))
	}, [onChange, value])

	const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		const input = inputRef.current
		if (input) {
			if ((e.key === 'Delete' || e.key === 'Backspace') && input.value === '') {
				onChange(value.slice(0, -1)) // remove last selected
			}
			if (e.key === 'Escape') {
				input.blur()
			}
		}
	}, [onChange, value])

	const selectables = options.filter(
		(option) => !value.some((s) => s.value === option.value)
	)

	return (
		<Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
			<div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
				<div className="flex flex-wrap gap-1">
					{value.map((option) => (
						<Badge key={option.value} variant="secondary">
							{option.label}
							<button
								className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleUnselect(option)
									}
								}}
								onMouseDown={(e) => {
									e.preventDefault()
									e.stopPropagation()
								}}
								onClick={() => handleUnselect(option)}
							>
								<Icon icon="solar:close-circle-bold-duotone" />
							</button>
						</Badge>
					))}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onBlur={() => setOpen(false)}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
						className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
					/>
				</div>
			</div>
			<div className="relative mt-2">
				<CommandList>
					{open && selectables.length > 0 && (
						<div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
							<CommandGroup className="h-full overflow-auto">
								{selectables.map((option) => (
									<CommandItem
										key={option.value}
										onMouseDown={(e) => {
											e.preventDefault()
											e.stopPropagation()
										}}
										onSelect={() => {
											setInputValue('')
											onChange([...value, option])
										}}
										className="cursor-pointer"
									>
										{option.label}
									</CommandItem>
								))}
							</CommandGroup>
						</div>
					)}
				</CommandList>
			</div>
		</Command>
	)
}
