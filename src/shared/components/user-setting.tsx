import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/shared/components/ui/sheet'

import { logout } from '@/shared/lib/features/authSlice'
import { useTheme } from '@/shared/hooks/use-theme'

export function UserSetting({
	user
}: {
	user: {
		name: string
		email: string
		avatar: string
	}
}) {
	const dispatch = useDispatch()
	const { themeName, setTheme, availableThemes } = useTheme()

	const onLogout = () => {
		dispatch(logout())
		toast.success('تم تسجيل خروج بنجاح.')
	}
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					size="lg"
					className="md:h-8 md:p-0 cursor-pointer hover:scale-110 z-10"
					variant="link"
				>
					<Avatar className="h-14 w-14 rounded-full border border-blue-900">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg">user</AvatarFallback>
					</Avatar>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>اعدادات المستخدم</SheetTitle>
					<SheetDescription>
						يمكنك اجراء تعديلات في اعدادات المستخدم
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-8 justify-center items-center py-8">
					<Avatar className="h-28 w-28 rounded-full border border-blue-900">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg">user</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-center justify-center gap-2">
						<h1 className="font-bold text-xl">{user.name}</h1>
						<span className="text-gray-500">{user.email}</span>
					</div>
				</div>
				<Separator />
				<div className="py-6 space-y-4">
					<h3 className="text-center font-semibold">اختيار السمة</h3>
					<div className="flex flex-wrap justify-center gap-4">
						{availableThemes.map((theme) => (
							<Button
								key={theme.name}
								variant="ghost"
								size="icon"
								className={`h-8 w-8 rounded-full border ${
									themeName === theme.name
										? 'ring-2 ring-offset-2 ring-ring'
										: ''
								}`}
								onClick={() => setTheme(theme.name)}
								style={{
									backgroundColor: theme.primary
								}}
							>
								<span className="sr-only">{theme.name}</span>
							</Button>
						))}
					</div>
				</div>
				<Separator />
				<div className="flex flex-col items-center justify-center gap-2 pt-6 px-4">
					<Button
						onClick={onLogout}
						className="flex items-center justify-center gap-2 cursor-pointer w-full"
						variant="destructive"
					>
						<span>تسجيل الخروج</span>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
