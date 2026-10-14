import CMSPartnershipsPageMain from '@/module/dashboard/pages/cms/partnerships';
import PartnershipListMain from '@/module/dashboard/pages/partnerships/list';

export const metadata = {
  title: 'Hogani Jets | Partnerships List',
};

export default function page() {
  return (
    <>
      <CMSPartnershipsPageMain />
      <PartnershipListMain />
    </>
  );
}
