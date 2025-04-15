import { useLocation } from 'react-router-dom'
import { Link } from 'react-router'
import { Icon } from '@iconify/react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/components/ui/sidebar'
import { For } from '@/shared/components'
import { SIDEBAR_ITEMS } from '@/shared/config'
import { TatweerLogo } from '@/shared/components'

export function AppSidebar() {
	const location = useLocation()
	const pathname = location.pathname
	return (
		<Sidebar  collapsible="icon" side="right">
			<SidebarHeader />
			<SidebarContent>
				<TatweerLogo />
				<SidebarGroup>
					<SidebarGroupLabel>العناصر</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<For each={SIDEBAR_ITEMS}>
								{(item) => (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton size="lg" asChild>
											<Link
												className={`${
													pathname === item.url ? 'bg-blue-400/20' : ''
												} hover:bg-blue-200/20`}
												to={item.url}
											>
												<Icon
													className="!w-6 !h-6 text-primary"
													icon={item.icon}
													width={24}
													height={24}
													color={pathname === item.url ? 'lightblue' : ''}
												/>
												<span className="text-accent-foreground/60 font-bold">
													{item.title}
												</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)}
							</For>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}
