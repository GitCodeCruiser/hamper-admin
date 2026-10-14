'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import {
  adminResetPasswordSchema,
  TAdminResetPasswordSchemaType,
} from '../validation/adminResetPassword.zod';

import { useAuthAdminResetPassword } from '@/api/hooks/auth/admin/hooks';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import ArrowBackIcon from '@/ui/Icons/ArrowBackIcon';

type TAdminResetPasswordFormProps = {
  token: string;
};

const AdminResetPasswordForm = ({ token }: TAdminResetPasswordFormProps) => {
  const router = useRouter();

  const { mutateAsync: resetPassword, isPending: resetPasswordLoading } = useAuthAdminResetPassword(
    {
      optionalCallback: () => {
        router.replace(PAGE_ROUTE.auth.login);
      },
      errorCallback: () => {},
    },
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TAdminResetPasswordSchemaType>({
    resolver: zodResolver(adminResetPasswordSchema()),
    defaultValues: {
      confirm_password: '',
      new_password: '',
    },
  });

  const onSubmit = (data: TAdminResetPasswordSchemaType) => {
    resetPassword({ newPassword: data?.new_password, authToken: token });
  };

  return (
    <Grid container spacing={`${CustomSize(16)}`}>
      <Grid size={12}>
        <Controller
          control={control}
          name="new_password"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              placeholder="New Password"
              isPassword
              value={value}
              onChange={onChange}
              error={!!errors?.new_password}
              helperText={errors?.new_password?.message}
            />
          )}
        />
      </Grid>
      <Grid size={12}>
        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              placeholder="Confirm Password"
              isPassword
              value={value}
              onChange={onChange}
              error={!!errors?.confirm_password}
              helperText={errors?.confirm_password?.message}
            />
          )}
        />
      </Grid>
      <Grid size={12}>
        <CustomButtonPrimary
          fullWidth
          variant="contained"
          color="primary"
          disableRipple
          loading={resetPasswordLoading}
          disabled={resetPasswordLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </CustomButtonPrimary>
      </Grid>
      <Grid size={12} sx={{ textAlign: 'center' }}>
        <Link href={PAGE_ROUTE.auth.login} className="backto-pagelink">
          <span>
            <ArrowBackIcon IconColor="currentColor" />
          </span>
          Back to Login
        </Link>
      </Grid>
    </Grid>
  );
};

export default AdminResetPasswordForm;
