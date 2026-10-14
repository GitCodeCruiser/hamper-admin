import { redirect } from 'next/navigation';

import { getResourcesCategoryData } from '@/lib/actions/app';
import ResourcesContent from '@/module/dashboard/pages/resources/content';
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

  return <ResourcesContent resourcesCatId={resourcesCatId} resourcesId={resourcesId} />;
}
