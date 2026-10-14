'use client';

import { Pagination, Stack, Table, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';

import {
  CustomTableContainer,
  StyledTableBody,
  StyledTableContainer,
  StyledTableHead,
} from '@/styles/StyledComponents/CustomTableStyled';

interface ICommonTableProps {
  headArray: string[];
  children: React.ReactNode;
}

const CommonTable: React.FC<ICommonTableProps> = ({ headArray, children }) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <CustomTableContainer>
      <StyledTableContainer>
        <Table aria-label="common table">
          <StyledTableHead>
            <TableRow>
              {headArray.map((head, index) => (
                <TableCell key={index}>{head}</TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>{children}</StyledTableBody>
        </Table>
      </StyledTableContainer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="pagination-stack"
        flexWrap="wrap"
      >
        <Typography variant="body2">Showing 10 of 10 of 564</Typography>
        <Pagination
          count={36}
          page={page}
          onChange={handleChange}
          hidePrevButton
          hideNextButton
          variant="text"
          shape="rounded"
          color="secondary"
        />
      </Stack>
    </CustomTableContainer>
  );
};

export default CommonTable;
