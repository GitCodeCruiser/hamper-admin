import BlogListMain from '@/module/dashboard/pages/blog/list';
import CMSBlogPageMain from '@/module/dashboard/pages/cms/blog';

export default function page() {
  return (
    <>
      <CMSBlogPageMain />
      <BlogListMain />
    </>
  );
}
