import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/lib/features/authSlice'
import { defineAbilitiesFor } from '@/shared/config/ability'
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
	const user = useSelector(selectUser)
	const ability = defineAbilitiesFor(user)

	const visibleItems = SIDEBAR_ITEMS.filter(item =>
		ability.can('read', item.subject)
	)

	return (
		<Sidebar collapsible="icon" side="right">
			<SidebarHeader />
			<SidebarContent>
				<TatweerLogo />
				<SidebarGroup>
					<SidebarGroupLabel>العناصر</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<For each={visibleItems}>
								{(item) => (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton size="lg" asChild>
											<Link
												className={`${
													pathname === item.url ? 'bg-primary/20' : ''
												} hover:bg-blue-200/20`}
												to={item.url}
											>
												<Icon
													className="!w-6 !h-6 text-primary"
													icon={
														pathname === item.url
															? item.icon.replace('line', 'bold')
															: item.icon
													}
													width={24}
													height={24}
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
