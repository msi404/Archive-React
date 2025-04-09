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
import { For } from '@/shared/components/utils/for'
import { SIDEBAR_ITEMS } from '@/shared/config/sidebar.constants'
import { TatweerLogo } from '@/shared/components/tatweer-logo'

export function AppSidebar() {
	return (
		<Sidebar className="dark" collapsible="icon" side="right">
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
											<a href={item.url}>
												<Icon
													className="!w-6 !h-6 text-primary"
													icon={item.icon}
													width={24}
													height={24}
												/>
												<span className="text-accent-foreground/60 font-bold">
													{item.title}
												</span>
											</a>
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
