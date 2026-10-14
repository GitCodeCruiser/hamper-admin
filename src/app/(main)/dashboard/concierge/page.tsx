import CMSConciergePageMain from '@/module/dashboard/pages/cms/concierge';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CMSConciergePageMain />;
}
