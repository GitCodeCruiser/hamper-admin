import { redirect } from 'next/navigation';

import RedirectionPageEdit from '@/module/dashboard/pages/redirection/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ redirectionId: string }> }) {
  const { redirectionId } = await params;

  if (!redirectionId) {
    redirect(PAGE_ROUTE.dashboard.redirection.list);
  }

  return <RedirectionPageEdit redirectionId={redirectionId} />;
}
