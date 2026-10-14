import CMSEmptyLegFlightPageMain from '@/module/dashboard/pages/cms/empty-leg-flight';

export default async function page({ params }: { params: Promise<{}> }) {
  return <CMSEmptyLegFlightPageMain />;
}
