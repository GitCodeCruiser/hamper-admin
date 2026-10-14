import AircraftCategoryPageAdd from '@/module/dashboard/pages/aircraft/category/add';

export default async function page({ params }: { params: Promise<{}> }) {
  return <AircraftCategoryPageAdd />;
}
