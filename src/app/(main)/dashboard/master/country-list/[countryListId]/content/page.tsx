import { redirect } from 'next/navigation';

import CountryListContent from '@/module/dashboard/pages/master/country-list/content';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ countryListId: string }> }) {
  const { countryListId } = await params;

  if (!countryListId) {
    redirect(PAGE_ROUTE.dashboard.master.countryList.list);
  }

  return <CountryListContent countryListId={countryListId} />;
}
