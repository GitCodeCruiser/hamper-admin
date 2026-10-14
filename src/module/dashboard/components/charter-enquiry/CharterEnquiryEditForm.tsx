'use client';

import WestIcon from '@mui/icons-material/West';
import { Box, Chip, Divider, Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

/*
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  charterEnquiryEditSchema,
  TCharterEnquiryEditSchemaType,
} from '../../validation/charter-enquiry/index.zod';
*/

import PageLoader from '@/@core/components/others/PageLoader';
import { useCharterEnquiryGet } from '@/api/hooks/charter-enquiry/hooks';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TCharterEnquiryEditFormProps = {
  charterEnquiryId: string;
};

const CharterEnquiryEditForm = ({ charterEnquiryId }: TCharterEnquiryEditFormProps) => {
  const router = useRouter();

  const { data: charterEnquiryDetails, isLoading: charterEnquiryDetailsLoading } =
    useCharterEnquiryGet({
      id: charterEnquiryId,
    });

  if (charterEnquiryDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  // Formatting helper for boolean values
  const renderBooleanValue = (value: boolean) => (value ? 'Yes' : 'No');

  // Status badge background color
  const statusStr = charterEnquiryDetails?.status || 'Pending';
  let statusBgColor = '#FFEFBD'; // Pending (Yellow)
  let statusTextColor = '#6B0F1A';
  if (statusStr === 'Reviewed') {
    statusBgColor = '#E0F2FE'; // Reviewed (Light Blue)
    statusTextColor = '#0369A1';
  } else if (statusStr === 'Resolved') {
    statusBgColor = '#D2F798'; // Resolved (Green)
    statusTextColor = '#365314';
  }

  return (
    <Grid container spacing={3} sx={{ color: '#FFFFFF' }}>
      {/* Header */}
      <Grid size={12} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="600" sx={{ letterSpacing: '0.5px' }}>
          Charter Enquiry Details
        </Typography>
        <Chip
          label={statusStr}
          sx={{
            backgroundColor: statusBgColor,
            color: statusTextColor,
            fontWeight: 'bold',
            fontSize: '0.85rem',
            px: 1,
          }}
        />
      </Grid>

      <Grid size={12}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)' }} />
      </Grid>

      {/* ── Sales Person Information ─────────────────────────────────── */}
      {charterEnquiryDetails?.userInfo && (
        <Grid size={12}>
          <Box
            sx={{
              border: '1px solid rgba(212,175,55,0.45)',
              borderRadius: 2,
              p: 2.5,
              backgroundColor: 'rgba(212,175,55,0.06)',
              boxShadow: '0 0 18px rgba(212,175,55,0.25), 0 4px 16px rgba(0,0,0,0.3)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 0 28px rgba(212,175,55,0.4), 0 6px 24px rgba(0,0,0,0.35)',
              },
            }}
          >
            {/* Section label */}
            <InputLabel
              sx={{
                color: '#D4AF37',
                fontWeight: 700,
                mb: 2,
                fontSize: '1rem',
                letterSpacing: '0.5px',
                borderLeft: '3px solid #D4AF37',
                pl: 1.5,
                py: 0.25,
                display: 'block',
              }}
            >
              Sales Person Information
            </InputLabel>

            {/* Fields row */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel sx={{ color: '#FFFFFF' }}>Sales Person Name</InputLabel>
                <InputFieldCommon
                  value={charterEnquiryDetails?.userInfo?.fullName || '—'}
                  readOnly
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <InputLabel sx={{ color: '#FFFFFF' }}>Sales Person Email</InputLabel>
                <InputFieldCommon value={charterEnquiryDetails?.userInfo?.email || '—'} readOnly />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      )}

      {/* ── Customer Information ─────────────────────────────────── */}
      <Grid size={12}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Customer Information
        </InputLabel>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>First Name</InputLabel>
        <InputFieldCommon value={charterEnquiryDetails?.firstName || '—'} readOnly />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Last Name</InputLabel>
        <InputFieldCommon value={charterEnquiryDetails?.lastName || '—'} readOnly />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Email Address</InputLabel>
        <InputFieldCommon value={charterEnquiryDetails?.email || '—'} readOnly />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Phone Number</InputLabel>
        <InputFieldCommon value={charterEnquiryDetails?.phone || '—'} readOnly />
      </Grid>

      {/* ── Trip Information ─────────────────────────────────────── */}
      <Grid size={12}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Trip Information
        </InputLabel>
      </Grid>

      <Grid size={12}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Trip Type</InputLabel>
        <InputFieldCommon value={charterEnquiryDetails?.tripType || '—'} readOnly />
      </Grid>

      {/* Flight Legs Details */}
      {charterEnquiryDetails?.legs && charterEnquiryDetails.legs.length > 0 ? (
        charterEnquiryDetails.legs.map((leg, index) => {
          const formattedDate = leg.departureDate
            ? new Date(leg.departureDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
            : '—';

          return (
            <React.Fragment key={index}>
              <Grid size={12} sx={{ mt: 2 }}>
                <InputLabel sx={{ color: '#D4AF37', fontWeight: 500, fontSize: '0.85rem' }}>
                  Flight Leg #{index + 1}
                </InputLabel>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <InputLabel sx={{ color: '#FFFFFF' }}>Departure Airport</InputLabel>
                <InputFieldCommon value={leg.departureAirport?.title || '—'} readOnly />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <InputLabel sx={{ color: '#FFFFFF' }}>Arrival Airport</InputLabel>
                <InputFieldCommon value={leg.arrivalAirport?.title || '—'} readOnly />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <InputLabel sx={{ color: '#FFFFFF' }}>Date</InputLabel>
                <InputFieldCommon value={formattedDate} readOnly />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <InputLabel sx={{ color: '#FFFFFF' }}>Time</InputLabel>
                <InputFieldCommon value={leg.departureTime || '—'} readOnly />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <InputLabel sx={{ color: '#FFFFFF' }}>Passengers</InputLabel>
                <InputFieldCommon value={String(leg.passengers ?? '—')} readOnly />
              </Grid>
            </React.Fragment>
          );
        })
      ) : (
        <Grid size={12}>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
            No legs information specified.
          </Typography>
        </Grid>
      )}

      {/* ── Preferences & Options ─────────────────────────────────── */}
      <Grid size={12}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Preferences & Options
        </InputLabel>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Travelling with Pets</InputLabel>
        <InputFieldCommon
          value={renderBooleanValue(!!charterEnquiryDetails?.travellingWithPets)}
          readOnly
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Oversized Luggage</InputLabel>
        <InputFieldCommon
          value={renderBooleanValue(!!charterEnquiryDetails?.oversizedLuggage)}
          readOnly
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Large Luggage Qty</InputLabel>
        <InputFieldCommon
          value={renderBooleanValue(!!charterEnquiryDetails?.largeQuantityOfLuggage)}
          readOnly
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Minors Travelling</InputLabel>
        <InputFieldCommon
          value={renderBooleanValue(!!charterEnquiryDetails?.minorsTravelling)}
          readOnly
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Firearms</InputLabel>
        <InputFieldCommon value={renderBooleanValue(!!charterEnquiryDetails?.firearms)} readOnly />
      </Grid>

      <Grid size={12}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Concierge Services Required</InputLabel>
        <InputFieldCommon
          value={
            charterEnquiryDetails?.conciergeServices &&
            charterEnquiryDetails.conciergeServices.length > 0
              ? charterEnquiryDetails.conciergeServices.join(', ')
              : 'None selected'
          }
          readOnly
        />
      </Grid>

      {/* ── Additional Notes / Comments ──────────────────────────── */}
      <Grid size={12}>
        <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
          Additional Notes / Comments
        </InputLabel>
      </Grid>

      <Grid size={12}>
        <InputFieldCommon
          multiline
          rows={3}
          value={charterEnquiryDetails?.additionalNotes || 'No additional comments provided.'}
          readOnly
        />
      </Grid>

      {/* Actions */}
      <Grid size={12} mt={2}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mb: 3 }} />
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.charterEnquiry.list);
          }}
        >
          Back
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default CharterEnquiryEditForm;
