import { redirect } from 'next/navigation';

import TypesOfCharterFaq from '@/module/dashboard/pages/types-of-charter/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({
  params,
}: {
  params: Promise<{ charterCatId: string; charterId: string }>;
}) {
  const { charterCatId, charterId } = await params;

  if (!charterId) {
    redirect(PAGE_ROUTE.dashboard.typesOfCharter.list);
  }

  return <TypesOfCharterFaq charterCatId={charterCatId} charterId={charterId} />;
}
