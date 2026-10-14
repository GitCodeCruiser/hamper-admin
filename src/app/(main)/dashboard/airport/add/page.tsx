import AirportPageAdd from '@/module/dashboard/pages/airport/add';

export default async function page({ params }: { params: Promise<{}> }) {
  return <AirportPageAdd />;
}
