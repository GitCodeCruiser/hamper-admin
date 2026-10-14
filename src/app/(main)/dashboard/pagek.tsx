import DashboardMain from '@/module/dashboard/pages';

export default async function page({ params }: { params: Promise<{}> }) {
  return <DashboardMain />;
}
