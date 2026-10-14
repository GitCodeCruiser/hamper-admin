import { redirect } from 'next/navigation';

import { getCharterCategoryData } from '@/lib/actions/app';
import TypesOfCharterContent from '@/module/dashboard/pages/types-of-charter/content';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({
  params,
}: {
  params: Promise<{ charterCatId: string; charterId: string }>;
}) {
  const { charterCatId, charterId } = await params;

  if (!charterCatId || !charterId) {
    redirect(PAGE_ROUTE.dashboard.typesOfCharter.list);
  }

  const charterCatData = await getCharterCategoryData(charterCatId);

  if (charterCatData === null) {
    redirect(PAGE_ROUTE.dashboard.typesOfCharter.list);
  }
  return <TypesOfCharterContent charterCatId={charterCatId} charterId={charterId} />;
}
