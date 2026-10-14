import { redirect } from 'next/navigation';

import { PAGE_ROUTE } from '@/routes/index.route';

export default function page() {
  redirect(PAGE_ROUTE.auth.login);
}
