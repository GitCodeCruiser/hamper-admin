import { redirect } from 'next/navigation';

import SalesPersonPageEdit from '@/module/dashboard/pages/sales-person/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ salesPersonId: string }> }) {
  const { salesPersonId } = await params;

  if (!salesPersonId) {
    redirect(PAGE_ROUTE.dashboard.salesPerson.list);
  }

  return <SalesPersonPageEdit salesPersonId={salesPersonId} />;
}
