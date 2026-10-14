import { redirect } from 'next/navigation';

import ForgotPasswordAdminMain from '@/module/auth/admin/pages/resetPassword';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  if (!token) {
    redirect(PAGE_ROUTE.auth.login);
  }

  return <ForgotPasswordAdminMain token={token} />;
}
