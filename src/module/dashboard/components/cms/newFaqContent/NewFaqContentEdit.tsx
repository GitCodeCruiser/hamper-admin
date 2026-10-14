import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, InputLabel, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useCmsFaqUpdate } from '@/api/hooks/cms/faq/hooks';
import {
  cmsNewFaqEdit,
  TCmsNewFaqEditType,
} from '@/module/dashboard/validation/cms/newFaqContent/cmsFaqSchema.zod';
import { TEachCmsFaq } from '@/types/apps/cms/faq/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type NewFaqContentEditProps = {
  eachContent: TEachCmsFaq;
  optionalCallback: () => void;
};

const NewFaqContentEdit = ({ eachContent, optionalCallback }: NewFaqContentEditProps) => {
  const theme = useTheme();

  const form = useForm<TCmsNewFaqEditType>({
    resolver: zodResolver(cmsNewFaqEdit()),
    defaultValues: {
      question: '',
      answer: '',
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: faqContentUpdate, isPending: faqContentUpdateLoading } = useCmsFaqUpdate({
    optionalCallback: () => {
      optionalCallback();
    },
    errorCallback: () => {},
  });

  const onSubmit = (data: TCmsNewFaqEditType) => {
    faqContentUpdate({
      id: eachContent?._id,
      question: data?.question ?? '',
      answer: data?.answer ?? '',
    });
  };

  useEffect(() => {
    form.reset({
      id: eachContent?._id,
      question: eachContent?.question || '',
      answer: eachContent?.answer || '',
    });
  }, [eachContent?._id, eachContent?.question, eachContent?.answer, form]);

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={3}
      sx={{
        backgroundColor: theme.palette.customColors.textColor,
        p: 4,
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
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
          disabled={faqContentUpdateLoading}
          loading={faqContentUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
          sx={{
            px: 6,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 14px 0 rgba(212, 175, 55, 0.39)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(212, 175, 55, 0.23)',
            },
          }}
        >
          Update FAQ
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default NewFaqContentEdit;
