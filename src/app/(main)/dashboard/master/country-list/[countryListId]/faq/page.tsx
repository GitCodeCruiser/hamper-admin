import { redirect } from 'next/navigation';

import CountryListFaq from '@/module/dashboard/pages/master/country-list/faq';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ countryListId: string }> }) {
  const { countryListId } = await params;

  if (!countryListId) {
    redirect(PAGE_ROUTE.dashboard.master.countryList.list);
  }

  return <CountryListFaq countryListId={countryListId} />;
}
