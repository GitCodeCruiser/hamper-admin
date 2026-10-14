import { redirect } from 'next/navigation';

import InsiderGuideFaq from '@/module/dashboard/pages/insider-guide/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ insiderGuideId: string }> }) {
  const { insiderGuideId } = await params;

  if (!insiderGuideId) {
    redirect(PAGE_ROUTE.dashboard.lifestyle.insiderGuide.list);
  }

  return <InsiderGuideFaq insiderGuideId={insiderGuideId} />;
}
