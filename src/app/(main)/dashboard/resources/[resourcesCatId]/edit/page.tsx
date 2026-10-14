import { redirect } from 'next/navigation';

import ResourcesCategoryEditPage from '@/module/dashboard/pages/resources/category/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ resourcesCatId: string }> }) {
  const { resourcesCatId } = await params;

  if (!resourcesCatId) {
    redirect(PAGE_ROUTE.dashboard.resources.list);
  }

  return <ResourcesCategoryEditPage resourcesCatId={resourcesCatId} />;
}
