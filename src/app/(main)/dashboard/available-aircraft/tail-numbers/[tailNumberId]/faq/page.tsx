import { redirect } from 'next/navigation';

import TailNumberFaq from '@/module/dashboard/pages/tail-number/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ tailNumberId: string }> }) {
  const { tailNumberId } = await params;

  if (!tailNumberId) redirect(PAGE_ROUTE.dashboard.tailNumbers.list);

  return <TailNumberFaq tailNumberId={tailNumberId} />;
}
