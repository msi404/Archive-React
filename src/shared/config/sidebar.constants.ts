
type SidebarItem = {
  title: string;
  url: string;
  icon: string;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'الرئيسية',
    url: '/dashboard',
    icon: 'solar:home-2-line-duotone'
	},
  {
    title: 'السلة',
    url: '/cart',
    icon: 'solar:cart-large-minimalistic-line-duotone'
  },
  {
    title: 'الكتب',
    url: '/books',
    icon: 'solar:book-bookmark-minimalistic-line-duotone'
  },
  {
    title: 'المشاركة معي',
    url: '/share',
    icon: 'solar:share-circle-line-duotone',
  },
  {
    title: 'المرسلة',
    url: '/sent',
    icon: 'solar:map-arrow-square-line-duotone'
  },
  {
    title: 'المستخدمين',
    url: '/users',
    icon: 'solar:users-group-two-rounded-line-duotone'
  },
];