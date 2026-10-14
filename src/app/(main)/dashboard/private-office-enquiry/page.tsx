import { PageTypeValue } from '@/constant';
import EnquiredDataList from '@/module/dashboard/components/cms/enquired-data/EnquiredDataList';
import CMSPrivateOfficeEnquiryPageMain from '@/module/dashboard/pages/cms/private-office-enquiry';

export default async function page({ params }: { params: Promise<{}> }) {
  return (
    <>
      <CMSPrivateOfficeEnquiryPageMain />
      <EnquiredDataList slug={PageTypeValue.cms.privateOfficeEnquiry.pageSlug} />
    </>
  );
}
