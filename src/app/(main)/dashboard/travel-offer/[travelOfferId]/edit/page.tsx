import { redirect } from 'next/navigation';

import TravelOfferPageEdit from '@/module/dashboard/pages/travel-offer/edit';
import { PAGE_ROUTE } from '@/routes/index.route';

export default async function page({ params }: { params: Promise<{ travelOfferId: string }> }) {
  const { travelOfferId } = await params;

  if (!travelOfferId) {
    redirect(PAGE_ROUTE.dashboard.travelOffer.list);
  }

  return <TravelOfferPageEdit travelOfferId={travelOfferId} />;
}
