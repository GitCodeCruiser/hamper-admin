'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

import {
  adminForgotPasswordSchema,
  TAdminForgotPasswordSchemaType,
} from '../validation/adminForgotPassword.zod';

import { useAuthAdminForgotPassword } from '@/api/hooks/auth/admin/hooks';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import ArrowBackIcon from '@/ui/Icons/ArrowBackIcon';

const AdminForgotPasswordForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAdminForgotPasswordSchemaType>({
    resolver: zodResolver(adminForgotPasswordSchema()),
    defaultValues: {
      email: '',
    },
  });

  const { mutateAsync: forgotPassword, isPending: forgotPasswordLoading } =
    useAuthAdminForgotPassword({
      optionalCallback: () => {
        reset({ email: '' });
      },
      errorCallback: () => {},
    });

  const onSubmit = (data: TAdminForgotPasswordSchemaType) => {
    forgotPassword({
      email: data?.email,
      baseUrl: `${process.env.NEXT_APP_FRONTEND_BASE_URL}`,
    });
  };

  return (
    <Grid container spacing={`${CustomSize(16)}`}>
      <Grid size={12}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Email Address"
              placeholder="Email"
              value={value}
              onChange={onChange}
              error={!!errors?.email}
              helperText={errors?.email?.message}
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
          loading={forgotPasswordLoading}
          disabled={forgotPasswordLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Send
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

export default AdminForgotPasswordForm;
