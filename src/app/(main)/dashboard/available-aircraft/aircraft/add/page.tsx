import AircraftPageAdd from '@/module/dashboard/pages/aircraft/main/add';

export default async function page({ params }: { params: Promise<{}> }) {
  return <AircraftPageAdd />;
}
