import zod from 'zod';

export const notificationSettingSchema = () => {
  return zod.object({
    isEmailNotification: zod.boolean(),
  });
};

export type TNotificationSettingsSchemaType = zod.output<
  ReturnType<typeof notificationSettingSchema>
>;
