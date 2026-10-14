'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Stack, useTheme } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { adminLoginSchema, TAdminLoginSchemaType } from '../validation/adminLogin.zod';

import { useAuthAdminLogin } from '@/api/hooks/auth/admin/hooks';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

const AdminLoginForm = () => {
  const theme = useTheme();
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  const { mutateAsync: adminLogin, isPending: adminLoginLoading } = useAuthAdminLogin({
    optionalCallback: () => {
      setIsLoginLoading(false);
    },
    errorCallback: () => {
      setIsLoginLoading(false);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TAdminLoginSchemaType>({
    resolver: zodResolver(adminLoginSchema()),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: TAdminLoginSchemaType) => {
    if (isLoginLoading) return;
    setIsLoginLoading(true);
    adminLogin({ email: data?.email, password: data?.password });
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
              // startAdornment={<InputMailIcon />}
              value={value}
              onChange={onChange}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          )}
        />
      </Grid>
      <Grid size={12}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Password"
              // startAdornment={<InputLockIcon />}
              placeholder="Password"
              isPassword
              value={value}
              onChange={onChange}
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
          )}
        />
      </Grid>
      <Grid size={12}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          className="remember-stack"
        >
          {/* <FormControlLabel
            control={
              <Checkbox icon={<UnCheckBoxIcon />} checkedIcon={<CheckboxIcon />} disableRipple />
            }
            label="Remember Me"
          /> */}
          <Link href={PAGE_ROUTE.auth.forgotPassword}>Forgot Password?</Link>
        </Stack>
      </Grid>
      <Grid size={12}>
        <CustomButtonPrimary
          fullWidth
          variant="contained"
          color="primary"
          disableRipple
          loading={adminLoginLoading || isLoginLoading}
          disabled={adminLoginLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Log In
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default AdminLoginForm;
