import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { useCmsFaqCreate } from '@/api/hooks/cms/faq/hooks';
import {
  cmsNewFaqAdd,
  TCmsNewFaqAddType,
} from '@/module/dashboard/validation/cms/newFaqContent/cmsFaqSchema.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TNewFaqContentAddProps = {
  purpose: string;
  onSuccess?: () => void;
};

const NewFaqContentAdd = ({ purpose, onSuccess }: TNewFaqContentAddProps) => {
  const form = useForm<TCmsNewFaqAddType>({
    resolver: zodResolver(cmsNewFaqAdd()),
    defaultValues: {
      question: '',
      answer: '',
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: faqContentSave, isPending: faqContentSaveLoading } = useCmsFaqCreate({
    optionalCallback: () => {
      form.reset({
        question: '',
        answer: '',
      });
      if (onSuccess) onSuccess();
    },
    errorCallback: () => {},
  });

  const onSubmit = (data: TCmsNewFaqAddType) => {
    faqContentSave({
      purpose,
      question: data?.question ?? '',
      answer: data?.answer ?? '',
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '16px',
        p: 4,
        mb: 6,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Grid container rowSpacing={4} columnSpacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              pb: 1,
              mb: 2,
            }}
          >
            <GroupHeading>Add FAQ</GroupHeading>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Question*
          </InputLabel>
          <Controller
            control={form.control}
            name="question"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                labelName="Question"
                placeholder="Enter question"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.question}
                helperText={errors?.question?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Answer*
          </InputLabel>
          <Controller
            control={form.control}
            name="answer"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                labelName="Answer"
                placeholder="Enter answer..."
                multiline
                minRows={2}
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.answer}
                helperText={errors?.answer?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            disabled={faqContentSaveLoading}
            loading={faqContentSaveLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Add FAQ
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewFaqContentAdd;
