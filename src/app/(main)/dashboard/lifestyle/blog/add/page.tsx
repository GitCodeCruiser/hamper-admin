import BlogPageAdd from '@/module/dashboard/pages/blog/add';

export default async function page({ params }: { params: Promise<{}> }) {
  return <BlogPageAdd />;
}
