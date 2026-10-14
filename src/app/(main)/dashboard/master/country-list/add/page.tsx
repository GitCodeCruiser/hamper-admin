import CountryListPageAdd from '@/module/dashboard/pages/master/country-list/add';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CountryListPageAdd />;
}
