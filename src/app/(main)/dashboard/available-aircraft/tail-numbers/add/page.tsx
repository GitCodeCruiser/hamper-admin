import TailNumberFormPage from '@/module/dashboard/pages/tail-number/form-page';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ aircraftId?: string }>;
}) {
  const { aircraftId } = await searchParams;
  return <TailNumberFormPage aircraftId={aircraftId} />;
}
