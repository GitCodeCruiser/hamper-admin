import CityListMain from '@/module/dashboard/pages/master/city-list/list';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CityListMain />;
}
