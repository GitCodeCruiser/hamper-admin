import { redirect } from 'next/navigation';

import { getResourcesCategoryData } from '@/lib/actions/app';
import ResourcesCatContent from '@/module/dashboard/pages/resources/category/content';
import ResourcesListMain from '@/module/dashboard/pages/resources/list';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ resourcesCatId: string }> }) {
  const { resourcesCatId } = await params;

  if (!resourcesCatId) {
    redirect(PAGE_ROUTE.dashboard.resources.list);
  }

  const resourcesCatData = await getResourcesCategoryData(resourcesCatId);

  if (resourcesCatData === null) {
    redirect(PAGE_ROUTE.dashboard.resources.list);
  }

  return (
    <>
      <ResourcesCatContent resourcesCatId={resourcesCatId} />
      <ResourcesListMain resourcesCatId={resourcesCatId} resourcesCatData={resourcesCatData} />
    </>
  );
}
