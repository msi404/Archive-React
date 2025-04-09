
type SidebarItem = {
  title: string;
  url: string;
  icon: string;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'الرئيسية',
    url: '/',
    icon: 'solar:home-2-bold-duotone'
	},
  {
    title: 'السلة',
    url: '/electoral-entities',
    icon: 'solar:cart-large-minimalistic-bold-duotone'
  },
  {
    title: 'الكتب',
    url: '/parties-representers',
    icon: 'solar:book-bookmark-minimalistic-bold-duotone'
  },
  {
    title: 'المشاركة معي',
    url: '/polling-management',
    icon: 'solar:share-circle-bold-duotone',
  },
  {
    title: 'المرسلة',
    url: '/data-entries',
    icon: 'solar:map-arrow-square-bold-duotone'
  },
  {
    title: 'المستخدمين',
    url: '/observers',
    icon: 'solar:users-group-two-rounded-bold-duotone'
  },
];