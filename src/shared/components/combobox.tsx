/* eslint-disable @typescript-eslint/no-unused-expressions */
import { type FC, useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '@/shared/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui/popover'
import {
	Command,
	CommandInput,
	CommandGroup,
	CommandEmpty,
	CommandList,
	CommandItem
} from '@/shared/components/ui/command'
import { Show } from '@/shared/components/utils/show'
import { cn } from '@/shared/lib/utils'

type ComboboxType = {
	options: { value: string; label: string }[]
	value: string
	onChange: (value: string) => void
	label: string
	className?: string
	disabled?: boolean
	onScrollEnd?: () => void // New prop for handling scroll
}

export const Combobox: FC<ComboboxType> = ({
	options,
	value,
	onChange,
	label,
	className,
	disabled,
	onScrollEnd
}) => {
	const [open, setOpen] = useState(false)
	const listRef = useRef<HTMLDivElement>(null)

	const handleScroll = () => {
		if (listRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = listRef.current
			if (scrollTop + clientHeight >= scrollHeight - 10) {
				onScrollEnd?.()
			}
		}
	}

	return (
		<Popover open={open} modal={true} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn('w-full justify-between', className)}
				>
					{options.find((option) => option.value === value)?.label || (
						<span className="text-gray-400">{label}</span>
					)}
					<Icon icon="solar:align-vertical-spacing-bold-duotone" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-64 p-2"
				side="bottom"
				align="start"
				avoidCollisions={false}
			>
				<Command>
					<CommandInput placeholder="ابحث..." className="h-9" />
					<CommandList
						ref={listRef}
						onScroll={handleScroll}
						className="max-h-44 overflow-y-auto"
					>
						<CommandEmpty>لم يتم العثور على العنصر</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									onSelect={() => {
										onChange(option.value), setOpen(false)
									}}
								>
									<Show
										fallback={<Icon icon="solar:check-circle-line-duotone" />}
										when={value === option.value}
									>
										<Icon icon="solar:check-circle-bold-duotone" />
									</Show>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
