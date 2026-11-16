import RegionListMain from '@/module/dashboard/pages/master/region-list/list';

export default async function page({ params }: { params: Promise<{}> }) {
  return <RegionListMain />;
}
