import { redirect } from 'next/navigation';

import RegionListPageEdit from '@/module/dashboard/pages/master/region-list/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ regionListId: string }> }) {
  const { regionListId } = await params;

  if (!regionListId) {
    redirect(PAGE_ROUTE.dashboard.master.regionList.list);
  }

  return <RegionListPageEdit regionListId={regionListId} />;
}
