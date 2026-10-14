import { redirect } from 'next/navigation';

import { getCharterCategoryData } from '@/lib/actions/app';
import TypesOfCharterPageAdd from '@/module/dashboard/pages/types-of-charter/add';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ charterCatId: string }> }) {
  const { charterCatId } = await params;

  if (!charterCatId) {
    redirect(PAGE_ROUTE.dashboard.typesOfCharter.list);
  }

  const charterCatData = await getCharterCategoryData(charterCatId);

  if (charterCatData === null) {
    redirect(PAGE_ROUTE.dashboard.typesOfCharter.list);
  }

  return <TypesOfCharterPageAdd charterCatId={charterCatId} charterCatData={charterCatData} />;
}
