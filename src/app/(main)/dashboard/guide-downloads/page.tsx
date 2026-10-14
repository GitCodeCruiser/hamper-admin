import CMSGuideDownloadsPageMain from '@/module/dashboard/pages/cms/guide-downloads';
import GuideDownloadsMain from '@/module/dashboard/pages/guide-downloads/list';

export default async function page({ params }: { params: Promise<{}> }) {
  return (
    <>
      <CMSGuideDownloadsPageMain />
      <GuideDownloadsMain />
    </>
  );
}
