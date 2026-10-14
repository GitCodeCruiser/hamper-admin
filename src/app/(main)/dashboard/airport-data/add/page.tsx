import AirportDataPageAdd from '@/module/dashboard/pages/airport-data/add';

export default async function page({ params }: { params: Promise<{}> }) {
  return <AirportDataPageAdd />;
}
