'use client';

import {
  BoxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ReactNode } from 'react';

import { TableCommonBox } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardComponentStyled/CommonTableStyled';

type TProps = any &
  BoxProps & {
    children: ReactNode;
  };

export default function DashboardCommonTable({ columns, children, ...rest }: TProps) {
  return (
    <TableCommonBox {...rest}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col: any, index: any) => (
                <TableCell key={index}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </TableCommonBox>
  );
}
