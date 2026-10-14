'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, TableCell, TableRow, useTheme } from '@mui/material';

import DashboardWidgetSlider from '@/components/DashboardWidgetSlider';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import CommonTable from '@/components/SIngleComponent/CommonTable';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import SearchSelectStack from '@/components/SIngleComponent/SearchSelectStack';
import SectionHeading from '@/components/SIngleComponent/SectionHeading';
import { DashboardHome } from '@/styles/StyledComponents/DashboardStyled/DashboardHomeStyled';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

const tableHeadData = [
  'ID',
  'Client Name',
  'Email Address',
  'Phone Number',
  'Departure',
  'Destination',
  'Status',
  'Action',
];

export const tableBodyData = [
  {
    id: 'IQ1546126',
    clientName: 'Alfredo Lipshutz',
    email: 'deanna.curtis@example.com',
    phone: '(307) 555-0133',
    departure: 'Miami Executive Airport',
    destination: 'Harry Reid Airport (LAS)',
    status: 'Pending',
  },
  {
    id: 'IQ1546126',
    clientName: 'Jakob Carder',
    email: 'sara.cruz@example.com',
    phone: '(704) 555-0127',
    departure: 'Astor Piazzolla International Airport',
    destination: 'North Las Vegas Airport',
    status: 'Sent',
  },
  {
    id: 'IQ1546126',
    clientName: 'Maria Vaccaro',
    email: 'willie.jennings@example.com',
    phone: '(316) 555-0116',
    departure: 'Ufa International Airport (UFA),',
    destination: 'City Airport Mannheim',
    status: 'Pending',
  },
  {
    id: 'IQ1546126',
    clientName: 'Tatiana Botosh',
    email: 'michelle.rivera@example.com',
    phone: '(505) 555-0125',
    departure: 'Dortmund Airport (DTM)',
    destination: 'Duesseldorf Airport (DUS)',
    status: 'Pending',
  },
  {
    id: 'IQ1546126',
    clientName: 'James Carder',
    email: 'nevaeh.simmons@example.com',
    phone: '(684) 555-0102',
    departure: 'Omsk Tsentralny Airport',
    destination: 'Volgograd Airport (VOG)',
    status: 'Sent',
  },
  {
    id: 'IQ1546126',
    clientName: 'Erin Dorwart',
    email: 'deanna.curtis@example.com',
    phone: '(629) 555-0129',
    departure: 'Rubtsovsk Airport (UNBR)',
    destination: 'Ontario International Airport',
    status: 'Pending',
  },
  {
    id: 'IQ1546126',
    clientName: 'Ryan Aminoff',
    email: 'michael.mitc@example.com',
    phone: '(219) 555-0114',
    departure: 'Düsseldorf Airport (DUS)',
    destination: 'Ministro Pistarini Airport (EZE)',
    status: 'Sent',
  },
  {
    id: 'IQ1546126',
    clientName: 'Maren Vetrovs',
    email: 'georgia.young@example.com',
    phone: '(201) 555-0124',
    departure: 'Fort Lauderdale– (FLL)',
    destination: 'Omsk Tsentralny Airport',
    status: 'Pending',
  },
  {
    id: 'IQ1546126',
    clientName: 'Jaxson Botosh',
    email: 'debbie.baker@example.com',
    phone: '(308) 555-0121',
    departure: 'Fernando Luis Ribas Dominicci Airport (SIG)',
    destination: 'Kagamuga Airport',
    status: 'Pending',
  },
];

export default function DashboardPage() {
  const theme = useTheme();

  return (
    // <DashboardWrapper>
    <DashboardHome>
      <DashboardWidgetSlider mb={`${CustomSize(15)}`} />
      <CommonCardBox>
        <SectionHeading title="Title goes here">
          <CustomButtonPrimary variant="contained" color="secondary">
            Create New Lead
          </CustomButtonPrimary>

          {/* <Button variant="contained" color="secondary">
              Create New Lead
            </Button> */}
        </SectionHeading>
        <SearchSelectStack className="home-srch-select" />
        <CommonTable headArray={tableHeadData}>
          {tableBodyData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.clientName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.departure}</TableCell>
              <TableCell>{row.destination}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor:
                      row.status === 'Sent'
                        ? `${theme.palette.customColors?.colorD2F798}`
                        : `${theme.palette.customColors?.colorFFEFBD}`,
                  }}
                  className="status-chip"
                >
                  {row.status}
                </Box>
              </TableCell>
              <TableCell>
                <IconButton size="small">
                  <MoreVertIcon
                    sx={{ fontSize: CustomSize(18), color: `${theme.palette.text.secondary}` }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </CommonTable>
      </CommonCardBox>
    </DashboardHome>
    // </DashboardWrapper>
  );
}
