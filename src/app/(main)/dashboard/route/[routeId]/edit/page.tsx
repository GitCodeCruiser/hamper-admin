import { redirect } from 'next/navigation';

import RoutePageEdit from '@/module/dashboard/pages/route/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ routeId: string }> }) {
  const { routeId } = await params;

  if (!routeId) {
    redirect(PAGE_ROUTE.dashboard.route.list);
  }

  return <RoutePageEdit />;
}
