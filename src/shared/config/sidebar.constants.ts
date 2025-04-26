import type { Subjects } from '@/shared/config/ability'

type SidebarItem = {
  title: string;
  url: string;
  icon: string;
  subject: Subjects;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'الرئيسية',
    url: '/dashboard',
    icon: 'solar:home-2-line-duotone',
		subject: 'HomePage'
	},
  {
    title: 'السلة',
    url: '/cart',
    icon: 'solar:folder-with-files-line-duotone',
		subject: 'CartPage'
  },
  {
    title: 'الكتب',
    url: '/books',
    icon: 'solar:book-bookmark-minimalistic-line-duotone',
		subject: 'BooksPage'
  },
  {
    title: 'المشاركة معي',
    url: '/share',
    icon: 'solar:share-circle-line-duotone',
		subject: 'SharedPage'
  },
  {
    title: 'المرسلة',
    url: '/sent',
    icon: 'solar:map-arrow-square-line-duotone',
		subject: 'SentPage'
  },
  {
    title: 'المستخدمين',
    url: '/users',
    icon: 'solar:users-group-two-rounded-line-duotone',
		subject: 'UsersPage'
  },
];