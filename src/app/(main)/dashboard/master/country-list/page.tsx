import CountryListMain from '@/module/dashboard/pages/master/country-list/list';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CountryListMain />;
}
