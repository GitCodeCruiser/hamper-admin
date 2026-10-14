import { redirect } from 'next/navigation';

import ContactUsReplyPage from '@/module/dashboard/pages/contact-us/reply';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ contactUsId: string }> }) {
  const { contactUsId } = await params;

  if (!contactUsId) {
    redirect(PAGE_ROUTE.dashboard.contactUs.list);
  }

  return <ContactUsReplyPage contactUsId={contactUsId} />;
}
