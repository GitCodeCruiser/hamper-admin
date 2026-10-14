import { redirect } from 'next/navigation';

import PartnershipPageEdit from '@/module/dashboard/pages/partnerships/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ partnershipId: string }> }) {
  const { partnershipId } = await params;

  if (!partnershipId) {
    redirect(PAGE_ROUTE.dashboard.lifestyle.partnerships.list);
  }

  return <PartnershipPageEdit partnershipId={partnershipId} />;
}
