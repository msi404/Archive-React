import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarTrigger, SidebarProvider } from '@/shared/components/ui/sidebar'
import { AppSidebar } from '@/shared/components/app-sidebar'
import { Header } from '@/shared/components/header'
import {UserSetting} from '@/shared/components/user-setting'
export default function Layout() {
	return (
		<Fragment>
			<Header elements={[<UserSetting />]} />
			<SidebarProvider>
				<AppSidebar />
				<SidebarTrigger />
				<main className="w-full p-4">
					<Outlet />
				</main>
			</SidebarProvider>
		</Fragment>
	)
}
