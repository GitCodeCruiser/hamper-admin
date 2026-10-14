'use client';

import AdminForgotPasswordForm from '../components/AdminForgotPasswordForm';

import AuthWrapper from '@/layout/AuthWrapper';

const ForgotPasswordAdminMain = () => {
  return (
    <AuthWrapper
      title="Forgot Password?"
      description="Enter your email address and we'll send you instructions to reset your password."
    >
      <AdminForgotPasswordForm />
    </AuthWrapper>
  );
};

export default ForgotPasswordAdminMain;
