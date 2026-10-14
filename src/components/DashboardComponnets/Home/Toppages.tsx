'use client';

import { Box, TableCell, TableRow } from '@mui/material';

import { totalPageData } from '../../../../json/mocks/demo.mock';
import DashboardCommonTable from '../DashboardCommonTable';
import SectionHeading from '../SectionHeading';

import { ToppagesSection } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardHomeStyled';

const Toppages = () => {
  const tableHeadColumn = [{ label: 'Page' }, { label: 'Page View' }];

  return (
    <ToppagesSection>
      <SectionHeading heading="Top pages" mb={2.5} />
      <Box className="outer-table">
        <DashboardCommonTable columns={tableHeadColumn} className="top-pagetable">
          {totalPageData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.page}</TableCell>
              <TableCell>{item.pageView.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </DashboardCommonTable>
      </Box>
    </ToppagesSection>
  );
};

export default Toppages;
