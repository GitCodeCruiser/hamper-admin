'use client';

import AdminLoginForm from '../components/AdminLoginForm';

import AuthWrapper from '@/layout/AuthWrapper';

const LoginAdminMain = () => {
  return (
    <AuthWrapper
      title="Admin Portal "
      description="Welcome back! Access your account and continue your seamless experience."
    >
      <AdminLoginForm />
    </AuthWrapper>
  );
};

export default LoginAdminMain;
