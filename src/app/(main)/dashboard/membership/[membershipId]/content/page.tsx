import { redirect } from 'next/navigation';

import MembershipContent from '@/module/dashboard/pages/membership/content';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ membershipId: string }> }) {
  const { membershipId } = await params;

  if (!membershipId) {
    redirect(PAGE_ROUTE.dashboard.membership.list);
  }

  return <MembershipContent membershipId={membershipId} />;
}
