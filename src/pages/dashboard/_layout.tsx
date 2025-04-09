import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {selectUser} from '@/shared/lib/features/authSlice'
import { SidebarTrigger, SidebarProvider } from '@/shared/components/ui/sidebar'
import { AppSidebar } from '@/shared/components'
import { Header } from '@/shared/components'
import { UserSetting } from '@/shared/components'
export default function Layout ()
{
	const user = useSelector(selectUser)
	return (
		<Fragment>
			<Header
				elements={[
					<UserSetting
						user={{
							name: user.name!,
							email: user.email!,
							avatar: user.role!
						}}
					/>
				]}
			/>
			<SidebarProvider>
				<AppSidebar />
				<SidebarTrigger />
				<main className="w-full p-4 pt-28">
					<Outlet />
				</main>
			</SidebarProvider>
		</Fragment>
	)
}
