import AircraftOptionsListMain from '@/module/dashboard/pages/aircraft-options/list';
import CMSAircraftOptionsPageMain from '@/module/dashboard/pages/cms/aircraft-options';

export default async function page() {
  return (
    <>
      <CMSAircraftOptionsPageMain />
      <AircraftOptionsListMain />
    </>
  );
}
