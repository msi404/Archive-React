
type SidebarItem = {
  title: string;
  url: string;
  icon: string;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'الرئيسية',
    url: '/dashboard',
    icon: 'solar:home-2-bold-duotone'
	},
  {
    title: 'السلة',
    url: '/cart',
    icon: 'solar:cart-large-minimalistic-bold-duotone'
  },
  {
    title: 'الكتب',
    url: '/books',
    icon: 'solar:book-bookmark-minimalistic-bold-duotone'
  },
  {
    title: 'المشاركة معي',
    url: '/share',
    icon: 'solar:share-circle-bold-duotone',
  },
  {
    title: 'المرسلة',
    url: '/sent',
    icon: 'solar:map-arrow-square-bold-duotone'
  },
  {
    title: 'المستخدمين',
    url: '/users',
    icon: 'solar:users-group-two-rounded-bold-duotone'
  },
];