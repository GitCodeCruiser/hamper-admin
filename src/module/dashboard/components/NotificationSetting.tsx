'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  notificationSettingSchema,
  TNotificationSettingsSchemaType,
} from '../validation/notification.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import {
  useAuthAdminNotificationSettingsUpdate,
  useAuthAdminProfileDetails,
} from '@/api/hooks/auth/admin/hooks';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { NotificationSettingStyled } from '@/styles/StyledComponents/AuthWrapperStyled';
import CustomSwitch from '@/ui/CustomSwitch/CustomSwitch';

const NotificationSetting = () => {
  const router = useRouter();
  const { data: adminSettingsDetails, isLoading: adminSettingsDetailsLoading } =
    useAuthAdminProfileDetails();

  const { reset, setValue, watch } = useForm<TNotificationSettingsSchemaType>({
    resolver: zodResolver(notificationSettingSchema()),
    defaultValues: {
      isEmailNotification: false,
      // isPushNotification: false,
    },
  });

  const isEmailNotification = watch('isEmailNotification') ?? false;
  // const isPushNotification = watch('isPushNotification') ?? false;

  useEffect(() => {
    if (adminSettingsDetails?.isEmailNotification) {
      reset({
        isEmailNotification: !!adminSettingsDetails.isEmailNotification,
        // isPushNotification: !!userData.isPushNotification,
      });
    }
  }, [adminSettingsDetails?.isEmailNotification, reset]);

  const { mutateAsync: adminSettingsUpdate, isPending: adminSettingsUpdateLoading } =
    useAuthAdminNotificationSettingsUpdate({
      optionalCallback: () => {
        router.refresh();
      },
      errorCallback: () => {},
    });

  const handleToggle = (
    key: 'isEmailNotification',
    // | 'isPushNotification'
    value: boolean,
  ) => {
    setValue(key, value);
    adminSettingsUpdate({
      isEmailNotification: key === 'isEmailNotification' ? value : isEmailNotification,
      // isPushNotification: key === 'isPushNotification' ? value : isPushNotification,
    });
  };

  if (adminSettingsDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <NotificationSettingStyled component="section">
      <CommonCardBox>
        <Typography variant="h3">Notification Settings</Typography>
        <List disablePadding>
          <ListItem disablePadding>
            <Box className="notifi-rowleft">
              <Typography variant="body1">Email Notifications</Typography>
              <Typography variant="body2">
                Receive important updates and alerts directly to your email.
              </Typography>
            </Box>
            <Box className="notifi-rowright">
              <CustomSwitch
                checked={isEmailNotification}
                onChange={(e) => handleToggle('isEmailNotification', e.target.checked)}
                disabled={adminSettingsUpdateLoading}
              />
            </Box>
          </ListItem>
          {/* <ListItem disablePadding>
            <Box className="notifi-rowleft">
              <Typography variant="body1">Push Notification</Typography>
              <Typography variant="body2">
                Get real-time updates instantly on your device.
              </Typography>
            </Box>
            <Box className="notifi-rowright">
              <CustomSwitch
                checked={isPushNotification}
                onChange={(e) => handleToggle('isPushNotification', e.target.checked)}
                disabled={isPending}
              />
            </Box>
          </ListItem> */}
        </List>
      </CommonCardBox>
    </NotificationSettingStyled>
  );
};

export default NotificationSetting;
