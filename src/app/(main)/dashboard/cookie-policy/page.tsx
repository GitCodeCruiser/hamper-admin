import CMSCookiePolicyPageMain from '@/module/dashboard/pages/cms/cookie-policy';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CMSCookiePolicyPageMain />;
}
