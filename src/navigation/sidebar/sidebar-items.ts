export type IconifyIconString = string;

export interface INavSubItem {
  title: string;
  url?: string;
  icon?: IconifyIconString;
  comingSoon?: boolean;
  subItems?: INavSubItem[];
}

export interface INavMainItem {
  title: string;
  url?: string;
  icon?: IconifyIconString;
  subItems?: INavSubItem[];
  comingSoon?: boolean;
}

export interface INavGroup {
  id: number;
  label?: string;
  items: INavMainItem[];
}

export const sidebarItems: INavGroup[] = [
  {
    id: 1,
    label: 'MANAGEMENT',
    items: [
      {
        title: 'User Management',
        icon: 'mdi:account-group',
        url: '/dashboard/users/customer/list',
      },
      {
        title: 'Project Management',
        icon: 'octicon:project-symlink-16',
        url: '/dashboard/project/list',
      },
      {
        title: 'Membership Plans',
        icon: 'mdi:card-account-details-star-outline',
        url: '/dashboard/membership',
      },
      {
        title: 'Why Hogan',
        icon: 'mdi:help-circle-outline',
        url: '/dashboard/why-hogani',
      },
      {
        title: 'Aircraft Options',
        icon: 'mdi:airplane',
        url: '/dashboard/aircraft-options',
      },
      {
        title: 'Travel Resources',
        icon: 'mdi:book-open-page-variant-outline',
        url: '/dashboard/travel-resources',
      },
      {
        title: 'My Profile',
        icon: 'octicon:person-16',
        url: '/dashboard/profile-settings',
      },
    ],
  },
];
