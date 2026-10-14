import { redirect } from 'next/navigation';

import { getCharterCategoryData } from '@/lib/actions/app';
import TypesOfCharterCatContent from '@/module/dashboard/pages/types-of-charter/category/content';
import TypesOfCharterListMain from '@/module/dashboard/pages/types-of-charter/list';
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

  return (
    <>
      <TypesOfCharterCatContent charterCatId={charterCatId} />
      <TypesOfCharterListMain charterCatId={charterCatId} charterCatData={charterCatData} />
    </>
  );
}
