import CMSOnDemandCharterPageMain from '@/module/dashboard/pages/cms/on-demand-charter';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CMSOnDemandCharterPageMain />;
}
