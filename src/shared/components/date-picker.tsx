import { type FC } from 'react'
import { format } from 'date-fns'
import {Icon} from '@iconify/react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui/popover'

export const DatePicker: FC<{
	value: Date | null
	onChange: (date: Date | undefined) => void
	disabled?: boolean
	className?: string
}> = ({ value, onChange, disabled, className }) => {
	return (
		<Popover>
			<PopoverTrigger className={cn(className)} asChild>
				<Button
					variant="outline"
					className={cn(
						'w-full justify-start text-left font-normal',
						!value && 'text-muted-foreground'
					)}
				>
					<Icon icon='solar:calendar-bold-duotone'/>
					{value ? format(value, 'PPP') : <span>تاريخ</span>}{' '}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto'>
			<Calendar
					disabled={disabled}
					mode="single"
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-expect-error
					selected={value}
					captionLayout="dropdown"
					onSelect={onChange}
					initialFocus
					fromYear={1960}
					toYear={2030}
				/>
			</PopoverContent>
		</Popover>
	)
}
