import CMSResourcesPageMain from '@/module/dashboard/pages/cms/resources';
import ResourcesCategoryListMain from '@/module/dashboard/pages/resources/category/list';

export default async function page() {
  return (
    <>
      <CMSResourcesPageMain />
      <ResourcesCategoryListMain />
    </>
  );
}
