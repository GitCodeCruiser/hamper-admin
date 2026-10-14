import { PageTypeValue } from '@/constant';
import EnquiredDataList from '@/module/dashboard/components/cms/enquired-data/EnquiredDataList';
import CMSLoyaltyProgramEnquiryPageMain from '@/module/dashboard/pages/cms/loyalty-program-enquiry';

export default async function page({ params }: { params: Promise<{}> }) {
  return (
    <>
      <CMSLoyaltyProgramEnquiryPageMain />
      <EnquiredDataList slug={PageTypeValue.cms.loyaltyProgramEnquiry.pageSlug} />
    </>
  );
}
