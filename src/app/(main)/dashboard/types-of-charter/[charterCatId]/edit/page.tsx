import { redirect } from 'next/navigation';

import TypesOfCharterCategoryEditPage from '@/module/dashboard/pages/types-of-charter/category/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ charterCatId: string }> }) {
  const { charterCatId } = await params;

  if (!charterCatId) {
    redirect(PAGE_ROUTE.dashboard.typesOfCharter.list);
  }

  return <TypesOfCharterCategoryEditPage charterCatId={charterCatId} />;
}
