import { redirect } from 'next/navigation';

import RouteFaq from '@/module/dashboard/pages/route/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ routeId: string }> }) {
  const { routeId } = await params;

  if (!routeId) {
    redirect(PAGE_ROUTE.dashboard.route.list);
  }

  return <RouteFaq routeId={routeId} />;
}
