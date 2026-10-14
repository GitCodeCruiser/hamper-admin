import { redirect } from 'next/navigation';

import BlogContent from '@/module/dashboard/pages/blog/content';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;

  if (!blogId) {
    redirect(PAGE_ROUTE.dashboard.route.list);
  }

  return <BlogContent blogId={blogId} />;
}
