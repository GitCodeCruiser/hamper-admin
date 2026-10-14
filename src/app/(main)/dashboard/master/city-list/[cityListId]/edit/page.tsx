import CityListPageEdit from '@/module/dashboard/pages/master/city-list/edit';

export default async function page({ params }: { params: Promise<{ cityListId: string }> }) {
  const { cityListId } = await params;
  return <CityListPageEdit cityListId={cityListId} />;
}
