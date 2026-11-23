import { redirect } from 'next/navigation';

import UserPageEdit from '@/module/dashboard/pages/user/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  if (!userId) {
    redirect(PAGE_ROUTE.dashboard.users.list);
  }

  return <UserPageEdit userId={userId} />;
}
