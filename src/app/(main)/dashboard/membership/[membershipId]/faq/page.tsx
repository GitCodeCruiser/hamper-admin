import { redirect } from 'next/navigation';

import MembershipFaq from '@/module/dashboard/pages/membership/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ membershipId: string }> }) {
  const { membershipId } = await params;

  if (!membershipId) {
    redirect(PAGE_ROUTE.dashboard.membership.list);
  }

  return <MembershipFaq membershipId={membershipId} />;
}
