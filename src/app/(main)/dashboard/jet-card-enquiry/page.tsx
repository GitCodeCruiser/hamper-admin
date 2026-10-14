import { PageTypeValue } from '@/constant';
import EnquiredDataList from '@/module/dashboard/components/cms/enquired-data/EnquiredDataList';
import CMSJetCardEnquiryPageMain from '@/module/dashboard/pages/cms/jet-card-enquiry';

export default async function page({ params }: { params: Promise<{}> }) {
  return (
    <>
      <CMSJetCardEnquiryPageMain />
      <EnquiredDataList slug={PageTypeValue.cms.jetCardEnquiry.pageSlug} />
    </>
  );
}
