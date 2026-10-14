import DashboardWebsiteSettings from '@/module/dashboard/pages/settings';

export default async function page({ params }: { params: Promise<{}> }) {
  return <DashboardWebsiteSettings />;
}
