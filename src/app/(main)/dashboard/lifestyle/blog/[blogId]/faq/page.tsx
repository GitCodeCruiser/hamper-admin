import { redirect } from 'next/navigation';

import BlogFaq from '@/module/dashboard/pages/blog/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;

  if (!blogId) {
    redirect(PAGE_ROUTE.dashboard.lifestyle.blog.list);
  }

  return <BlogFaq blogId={blogId} />;
}
