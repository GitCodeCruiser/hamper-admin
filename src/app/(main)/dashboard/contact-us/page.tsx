import CMSContactUsPageMain from '@/module/dashboard/pages/cms/contact-us';
import ContactUsMain from '@/module/dashboard/pages/contact-us/list';

export default async function page({ params }: { params: Promise<{}> }) {
  return (
    <>
      <CMSContactUsPageMain />
      <ContactUsMain />
    </>
  );
}
