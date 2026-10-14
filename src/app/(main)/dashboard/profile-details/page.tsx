import DashboardProfileDetails from '@/module/dashboard/pages/profile-details';

export default async function page({ params }: { params: Promise<{}> }) {
  return <DashboardProfileDetails />;
}
