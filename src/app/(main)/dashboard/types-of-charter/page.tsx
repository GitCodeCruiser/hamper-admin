import CMSTypesOfCharterPageMain from '@/module/dashboard/pages/cms/types-of-charter';
import TypesOfCharterCategoryListMain from '@/module/dashboard/pages/types-of-charter/category/list';

export default async function page() {
  return (
    <>
      <CMSTypesOfCharterPageMain />
      <TypesOfCharterCategoryListMain />
    </>
  );
}
