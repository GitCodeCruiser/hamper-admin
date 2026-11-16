import { redirect } from 'next/navigation';

import TailNumberFormPage from '@/module/dashboard/pages/tail-number/form-page';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ tailNumberId: string }>;
  searchParams: Promise<{ aircraftId?: string }>;
}) {
  const { tailNumberId } = await params;
  const { aircraftId } = await searchParams;

  if (!tailNumberId) redirect(PAGE_ROUTE.dashboard.tailNumbers.list);

  return <TailNumberFormPage tailNumberId={tailNumberId} aircraftId={aircraftId} />;
}
