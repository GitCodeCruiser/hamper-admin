import StateListPageEdit from '@/module/dashboard/pages/master/state-list/edit';

export default async function page({ params }: { params: Promise<{ stateListId: string }> }) {
  const { stateListId } = await params;
  return <StateListPageEdit stateListId={stateListId} />;
}
