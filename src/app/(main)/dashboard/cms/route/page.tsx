import CMSRoutePageMain from '@/module/dashboard/pages/cms/route';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CMSRoutePageMain />;
}
