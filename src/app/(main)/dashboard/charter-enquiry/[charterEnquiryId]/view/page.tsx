import { redirect } from 'next/navigation';

import CharterEnquiryPageView from '@/module/dashboard/pages/charter-enquiry/view';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ charterEnquiryId: string }> }) {
  const { charterEnquiryId } = await params;

  if (!charterEnquiryId) {
    redirect(PAGE_ROUTE.dashboard.charterEnquiry.list);
  }

  return <CharterEnquiryPageView charterEnquiryId={charterEnquiryId} />;
}
