import DashboardWrapper from '@/layout/DashboardWrapper/DashboardWrapper';
import 'ckeditor5/ckeditor5.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
