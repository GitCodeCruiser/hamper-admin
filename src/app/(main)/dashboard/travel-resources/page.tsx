import CMSTravelResourcesPageMain from '@/module/dashboard/pages/cms/travel-resources';
import TravelResourcesListMain from '@/module/dashboard/pages/travel-resources/list';

export default async function page() {
  return (
    <>
      <CMSTravelResourcesPageMain />
      <TravelResourcesListMain />
    </>
  );
}
