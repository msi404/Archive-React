import type { FC } from 'react'
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

export const Retry: FC<{ refetch: () => void }> = ({refetch}) => {
	return (
		<Button onClick={refetch}>
			<Icon icon="solar:repeat-bold-duotone" />
			<span>اعادة التحميل</span>
		</Button>
	)
}
