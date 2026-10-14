import { redirect } from 'next/navigation';

import { getResourcesCategoryData } from '@/lib/actions/app';
import ResourcesPageEdit from '@/module/dashboard/pages/resources/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({
  params,
}: {
  params: Promise<{ resourcesCatId: string; resourcesId: string }>;
}) {
  const { resourcesCatId, resourcesId } = await params;

  if (!resourcesCatId || !resourcesId) {
    redirect(PAGE_ROUTE.dashboard.resources.list);
  }

  const resourcesCatData = await getResourcesCategoryData(resourcesCatId);

  if (resourcesCatData === null) {
    redirect(PAGE_ROUTE.dashboard.resources.list);
  }

  return (
    <ResourcesPageEdit
      resourcesId={resourcesId}
      resourcesCatId={resourcesCatId}
      resourcesCatData={resourcesCatData}
    />
  );
}
