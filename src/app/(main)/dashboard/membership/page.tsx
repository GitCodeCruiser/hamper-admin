import CMSMembershipPageMain from '@/module/dashboard/pages/cms/membership';
import MembershipListMain from '@/module/dashboard/pages/membership/list';

export default async function page() {
  return (
    <>
      <CMSMembershipPageMain />
      <MembershipListMain />
    </>
  );
}
