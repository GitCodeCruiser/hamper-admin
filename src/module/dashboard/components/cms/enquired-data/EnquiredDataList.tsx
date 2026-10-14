'use client';

import CloseIcon from '@mui/icons-material/Close';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TableCell,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

import { useDynamicFormDetails } from '@/api/hooks/dynamic-form/hooks';
import { useMasterDataGet, useMasterDataGetAll } from '@/api/hooks/master-data/hooks';
import CustomReusableDataTable from '@/components/CustomComponents/CustomReusableDataTable';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import {
  formatMasterDataValue,
  TMasterDataField,
  TMasterDataListItem,
} from '@/types/apps/master-data/index.type';

const MAX_TABLE_FIELDS = 4;

const findField = (row: TMasterDataListItem, slug: string) =>
  row.dynamicFields?.find((field) => field.slug === slug)?.value;

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    : '—';

export default function EnquiredDataList({ slug }: { slug: string }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState('');
  const { data: workflow, isLoading: isWorkflowLoading } = useDynamicFormDetails({ slug });

  const { data, isLoading } = useMasterDataGetAll({
    page,
    perPage,
    workflowId: workflow?._id ?? '',
  });

  const tableFields = useMemo(() => {
    const configuredFields =
      workflow?.steps.flatMap((step) =>
        step.sections.flatMap((section) =>
          section.fields.map((field) => ({
            slug: field.slug || field.key,
            label: field.questionContent || field.label || field.slug || field.key,
          })),
        ),
      ) ?? [];

    const responseFields =
      data?.docs.flatMap((row) =>
        (row.dynamicFields ?? []).map((field) => ({
          slug: field.slug,
          label: field.label || field.slug,
        })),
      ) ?? [];

    const uniqueFields = new Map<string, { slug: string; label: string }>();
    [...configuredFields, ...responseFields].forEach((field) => {
      if (field.slug && !uniqueFields.has(field.slug)) uniqueFields.set(field.slug, field);
    });

    return [...uniqueFields.values()].slice(0, MAX_TABLE_FIELDS);
  }, [data?.docs, workflow?.steps]);

  return (
    <DashboardHome>
      <CommonCardBox>
        <Box
          sx={{
            '& .MuiTableContainer-root': { border: 0 },
            '& .MuiTableHead-root': { background: '#F8F4DC' },
            '& .MuiTableCell-head': {
              color: '#790A13',
              fontWeight: 500,
              fontSize: 16,
              borderBottom: 0,
            },
            '& .MuiTableCell-body': {
              color: '#101B28',
              fontSize: 15,
              borderBottomColor: '#F2EDCF',
            },
            '& .MuiTableRow-root:hover .MuiTableCell-body': {
              background: 'rgba(212, 175, 55, 0.08)',
            },
            '& .pagination-stack': { color: '#101B28' },
            '& .pagination-stack .MuiTypography-root': { color: 'inherit' },
            '& .pagination-stack .MuiOutlinedInput-root': {
              color: '#101B28',
              background: 'transparent',
            },
            '& .pagination-stack .MuiSelect-icon': { color: '#790A13' },
          }}
        >
          <Typography
            sx={{
              mb: 3,
              color: '#790A13',
              fontFamily: 'var(--font-playfair-display), serif',
              fontSize: { xs: 20, md: 24 },
            }}
          >
            Enquired Data
          </Typography>
          <CustomReusableDataTable<TMasterDataListItem>
            headArray={['Action', ...tableFields.map((field) => field.label), 'Submitted On']}
            columnWidths={[80, ...tableFields.map(() => 220), 200]}
            data={data?.docs ?? []}
            pageCount={data?.meta?.totalPages ?? 0}
            page={page}
            limit={perPage}
            onPageChange={(_, value) => setPage(value)}
            onLimitChange={(value) => {
              setPerPage(value);
              setPage(1);
            }}
            paginationLabel={
              `${data?.meta?.totalDocs ?? 0} Results | ` +
              `Page ${data?.meta?.page ?? 1} of ${data?.meta?.totalPages ?? 1}`
            }
            dataLoading={isWorkflowLoading || isLoading}
            noDataPlaceholder="No Enquired Data Found!"
            renderActions={(row) => (
              <IconButton
                aria-label="View enquiry"
                onClick={() => setSelectedId(row._id)}
                size="small"
                sx={{
                  color: '#790A13',
                  '&:hover': { color: '#D4AF37', background: 'rgba(121, 10, 19, 0.08)' },
                }}
              >
                <VisibilityOutlinedIcon fontSize="small" />
              </IconButton>
            )}
            renderRow={(row) => (
              <>
                {tableFields.map((field) => (
                  <TableCell key={field.slug}>
                    {formatMasterDataValue(findField(row, field.slug))}
                  </TableCell>
                ))}
                <TableCell>{formatDate(row.createdAt)}</TableCell>
              </>
            )}
          />

          <EnquiryDetailsDialog id={selectedId} onClose={() => setSelectedId('')} />
        </Box>
      </CommonCardBox>
    </DashboardHome>
  );
}

function EnquiryDetailsDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const { data, isLoading } = useMasterDataGet({ id });

  return (
    <Drawer
      anchor="right"
      open={Boolean(id)}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 600, md: 680 },
            color: '#fff',
            background: 'linear-gradient(180deg, #5B111B 0%, #39070D 100%)',
            borderLeft: '1px solid rgba(212, 175, 55, 0.45)',
          },
        },
      }}
    >
      <Box sx={{ px: { xs: 2.5, sm: 4 }, py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography sx={{ color: '#F5DC80', fontSize: 22, fontWeight: 700 }}>
              Enquiry Details
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.62)', mt: 0.5 }}>
              {data?.workflow?.name ?? ''}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            aria-label="Close"
            sx={{ color: '#F5DC80', border: '1px solid rgba(212, 175, 55, 0.3)' }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>
      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.25)' }} />
      <Box sx={{ px: { xs: 2.5, sm: 4 }, py: 3, overflowY: 'auto', flex: 1 }}>
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 240 }}>
            <CircularProgress size={34} sx={{ color: '#D4AF37' }} />
          </Stack>
        ) : (
          <Stack spacing={3}>
            <Box
              sx={{
                p: 2,
                border: '1px solid rgba(212, 175, 55, 0.22)',
                background: 'rgba(255, 255, 255, 0.04)',
              }}
            >
              <DetailValue label="Submitted On" value={formatDate(data?.createdAt)} />
            </Box>

            {data?.stepData?.map((step) => (
              <Box key={step.stepId}>
                <Typography sx={{ mb: 1.5, color: '#F5DC80', fontSize: 18, fontWeight: 700 }}>
                  {step.stepName}
                </Typography>
                <Stack spacing={2}>
                  {step.sections?.map((section) => (
                    <Box
                      key={section.sectionId}
                      sx={{
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        p: { xs: 2, sm: 2.5 },
                      }}
                    >
                      <Typography fontWeight={700} sx={{ mb: 2, color: '#E5C65B' }}>
                        {section.sectionName}
                      </Typography>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, minmax(0, 1fr))',
                          },
                          gap: 2,
                        }}
                      >
                        {section.fields?.map((field: TMasterDataField) => (
                          <DetailValue
                            key={field.fieldId ?? field.slug}
                            label={field.label.trim()}
                            value={formatMasterDataValue(field.value)}
                          />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}

function DetailValue({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" sx={{ color: 'rgba(245, 220, 128, 0.72)' }}>
        {label}
      </Typography>
      <Typography sx={{ overflowWrap: 'anywhere', color: 'rgba(255, 255, 255, 0.9)' }}>
        {value}
      </Typography>
    </Box>
  );
}
