import CMSHomePageMain from '@/module/dashboard/pages/cms/homepage';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CMSHomePageMain />;
}
