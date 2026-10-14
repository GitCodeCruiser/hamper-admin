import CMSWhyHoganiPageMain from '@/module/dashboard/pages/cms/why-hogani';
import WhyHoganiListMain from '@/module/dashboard/pages/why-hogani/list';

export default async function page() {
  return (
    <>
      <CMSWhyHoganiPageMain />
      <WhyHoganiListMain />
    </>
  );
}
