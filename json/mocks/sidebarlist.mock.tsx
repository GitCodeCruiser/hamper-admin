import HomeIcon from '@mui/icons-material/Home';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

import { PAGE_ROUTE } from '@/routes/index.route';
import { TSidebarItem } from '@/types/common/dashboardlayout.type';
import DashboardIcon from '@/ui/Icons/SidebarIcons/DashboardIcon';
import ProfileDetailsIcon from '@/ui/Icons/SidebarIcons/ProfileDetailsIcon';

export const sidebarNavList: TSidebarItem[] = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon IconColor="currentColor" />,
    route: PAGE_ROUTE.dashboard.homepage,
  },
  {
    name: 'Profile Details',
    icon: <ProfileDetailsIcon IconColor="currentColor" />,
    route: PAGE_ROUTE.dashboard.profileDetails,
  },
  {
    name: 'CMS',
    icon: <WysiwygIcon />,
    route: '#',
    children: [
      {
        name: 'Home Page',
        icon: <HomeIcon />,
        route: PAGE_ROUTE.dashboard.homepage,
      },
    ],
  },
  // {
  //   name: 'User Metrics',
  //   icon: <UserMetricsIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.userMetrics,
  // },
  // {
  //   name: 'User Activity',
  //   icon: <UserActivityIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.userActivity,
  // },
  // {
  //   name: 'User Segmentation',
  //   icon: <UserSegmentIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.userSegmentation,
  // },
  // {
  //   name: 'Engagement Metrics',
  //   icon: <EngagementMetricsIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.engagementMetrics,
  // },
  // {
  //   name: 'Session Analytics',
  //   icon: <SessionAnalyticsIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.sessionAnalytics,
  // },
  // {
  //   name: 'Page Performance',
  //   icon: <PagePerformanceIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.pagePerformance,
  // },
  // {
  //   name: 'Content KPIs',
  //   icon: <ContentKpisIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.contentKPIs,
  // },
  // {
  //   name: 'Marketplace KPIs',
  //   icon: <MarketplaceKpisIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.marketplaceKPIs,
  // },
  // {
  //   name: 'Job Board KPIs',
  //   icon: <JobBoardIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.jobBoardKPIs,
  // },
  // {
  //   name: 'Authentication KPIs',
  //   icon: <AuthenticationIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.authenticationKPIs,
  // },
  // {
  //   name: 'Audio Rooms & Calls KPIs',
  //   icon: <AudioroomIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.audioRoomsCallsKPIs,
  // },
  // {
  //   name: 'Advanced Analytics',
  //   icon: <AdvanceIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.advancedAnalytics,
  // },
  // {
  //   name: 'Export Report',
  //   icon: <ExportIocn IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.exportReport,
  // },
  // {
  //   name: 'User Management',
  //   icon: <UserManagementIcon IconColor="currentColor" />,
  //   route: PAGE_ROUTE.dashboard.userManagement,
  // },
];
