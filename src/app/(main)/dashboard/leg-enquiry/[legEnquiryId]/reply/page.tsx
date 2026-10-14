import { redirect } from 'next/navigation';

import LegEnquiryReplyPage from '@/module/dashboard/pages/leg-enquiry/reply';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ legEnquiryId: string }> }) {
  const { legEnquiryId } = await params;

  if (!legEnquiryId) {
    redirect(PAGE_ROUTE.dashboard.legEnquiry.list);
  }

  return <LegEnquiryReplyPage legEnquiryId={legEnquiryId} />;
}
