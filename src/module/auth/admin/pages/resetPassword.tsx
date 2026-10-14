'use client';

import AdminResetPasswordForm from '../components/AdminResetPasswordForm';

import AuthWrapper from '@/layout/AuthWrapper';

type TForgotPasswordAdminMainProps = {
  token: string;
};

export default function ForgotPasswordAdminMain({ token }: TForgotPasswordAdminMainProps) {
  // console.log(token, '@TEST');
  return (
    <AuthWrapper
      title="Reset Password"
      description="Create a new password to securely access your account."
    >
      <AdminResetPasswordForm token={token} />
    </AuthWrapper>
  );
}
