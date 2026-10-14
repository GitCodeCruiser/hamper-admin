'use client';

import { useSortable } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

import PageLoader from '@/@core/components/others/PageLoader';
import {
  CustomTableContainer,
  StyledTableBody,
  StyledTableContainer,
  StyledTableHead,
} from '@/styles/StyledComponents/CustomTableStyled';
import SortableListWrapper from '@/ui/Sortable/SortableListWrapper';

// ─── Types ──────────────────────────────────────────────────────────────────

interface IReusableDataTableProps<T> {
  /** Column header labels */
  headArray: string[];

  /** Array of data objects to display */
  data: T[];

  /**
   * Render each row's cells. Receives the row item and its index.
   * You should return one or more <TableCell> elements.
   * The action cell (if any) is handled separately via `renderActions`.
   */
  renderRow: (row: T, index: number) => React.ReactNode;

  /**
   * Optional: render the action cell content for each row.
   * Receives the row item and its index.
   * Return any ReactNode — buttons, icon menus, etc.
   * If provided, an extra <TableCell> wrapping it is added automatically.
   */
  renderActions?: (row: T, index: number) => React.ReactNode;

  /**
   * Optional: fixed widths for each column (in px or any CSS width string).
   * Maps 1-to-1 with headArray. Drives a <colgroup> so header and body
   * cells are always in sync.
   */
  columnWidths?: (number | string | undefined)[];

  // ── Pagination props ──────────────────────────────────────────────────────

  /** Total number of pages */
  pageCount?: number;

  /** Current page (controlled) */
  page?: number;

  /** Called when the user changes the page */
  onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;

  /** Label shown on the left of the pagination row, e.g. "Showing 10 of 564" */
  paginationLabel?: string;

  /** Current limit/page size (controlled) */
  limit?: number;

  /** Called when the user changes the limit size */
  onLimitChange?: (limit: number) => void;

  dataLoading?: boolean;
  noDataPlaceholder?: string;

  // ── Sortable props ────────────────────────────────────────────────────────

  /** Enable drag-and-drop reordering of rows */
  isSortable?: boolean;

  /** Called when the user reorders rows via drag-and-drop */
  onReorder?: (newItems: T[]) => void;

  /** Whether to show pagination controls at the bottom (defaults to true) */
  showPagination?: boolean;
}

// ─── Sortable Table Row ──────────────────────────────────────────────────────

function SortableTableRow<T extends { _id?: string; id?: string }>({
  row,
  index,
  renderActions,
  renderRow,
  idAccessor,
}: {
  row: T;
  index: number;
  renderActions?: (row: T, index: number) => React.ReactNode;
  renderRow: (row: T, index: number) => React.ReactNode;
  idAccessor: (item: T) => string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: idAccessor(row),
  });

  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 999 : ('auto' as const),
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      {/* Drag handle cell */}
      <TableCell sx={{ width: 40, p: 0, textAlign: 'center' }}>
        <Box
          {...attributes}
          {...listeners}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            // color: 'rgba(255, 255, 255, 0.3)',
            transition: 'all 0.2s ease',
            py: 1,
            '&:hover': {
              color: '#D4AF37',
            },
            '&:active': {
              cursor: 'grabbing',
              color: '#D4AF37',
            },
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </Box>
      </TableCell>

      {/* Action cell */}
      {renderActions && <TableCell>{renderActions(row, index)}</TableCell>}

      {/* Data cells */}
      {renderRow(row, index)}
    </TableRow>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

function ReusableDataTable<T extends { _id?: string; id?: string }>({
  headArray,
  data,
  renderRow,
  renderActions,
  columnWidths,
  pageCount = 1,
  page = 1,
  onPageChange,
  paginationLabel,
  limit,
  onLimitChange,
  dataLoading = false,
  noDataPlaceholder,
  isSortable = false,
  onReorder,
  showPagination = true,
}: IReusableDataTableProps<T>) {
  // Internal page state used when the parent does not control pagination
  const [internalPage, setInternalPage] = React.useState(1);

  const activePage = onPageChange ? page : internalPage;

  // Internal limit state used when the parent does not control limit
  const [internalLimit, setInternalLimit] = React.useState(25);

  const activeLimit = limit !== undefined ? limit : internalLimit;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (onPageChange) {
      onPageChange(event, value);
    } else {
      setInternalPage(value);
    }
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    if (onLimitChange) {
      onLimitChange(value);
    } else {
      setInternalLimit(value);
    }
  };

  const idAccessor = (item: T) => item._id || item.id || '';

  // Build effective head array and column widths when sortable
  const effectiveHeadArray = React.useMemo(() => {
    return isSortable ? ['', ...headArray] : headArray;
  }, [isSortable, headArray]);

  const effectiveColumnWidths = React.useMemo(() => {
    return isSortable ? [40, ...(columnWidths || [])] : columnWidths;
  }, [isSortable, columnWidths]);

  const calculatedMinWidth = React.useMemo(() => {
    if (!effectiveColumnWidths) return undefined;
    let sum = 0;
    effectiveColumnWidths.forEach((w) => {
      if (w !== undefined) {
        const num = typeof w === 'number' ? w : parseInt(String(w), 10);
        if (!isNaN(num)) {
          sum += num;
        }
      } else {
        sum += 150; // Default minimum width for undefined columns
      }
    });
    return sum;
  }, [effectiveColumnWidths]);

  const renderTableContent = () => (
    <Table
      aria-label="reusable data table"
      sx={
        effectiveColumnWidths
          ? {
            tableLayout: 'fixed',
            width: '100%',
            minWidth: calculatedMinWidth,
          }
          : {}
      }
      style={
        effectiveColumnWidths
          ? {
            minWidth: calculatedMinWidth ? `${calculatedMinWidth}px` : undefined,
          }
          : {}
      }
    >
      {/* ── Column widths (keeps header + body in sync) ── */}
      {effectiveColumnWidths && (
        <colgroup>
          {effectiveColumnWidths.map((w, i) => (
            <col
              key={i}
              style={{
                width: w !== undefined ? (typeof w === 'number' ? `${w}px` : w) : undefined,
              }}
            />
          ))}
        </colgroup>
      )}

      {/* ── Header ── */}
      <StyledTableHead>
        <TableRow>
          {effectiveHeadArray?.map((head, index) => (
            <TableCell key={`each_tab_${head}_${index + 1}`}>{head}</TableCell>
          ))}
        </TableRow>
      </StyledTableHead>

      {/* ── Body ── */}
      <StyledTableBody>
        {isSortable
          ? data?.map((row, index) => (
            <SortableTableRow
              key={idAccessor(row) || `row_${index}`}
              row={row}
              index={index}
              renderActions={renderActions}
              renderRow={renderRow}
              idAccessor={idAccessor}
            />
          ))
          : data?.map((row, index) => (
            <TableRow key={`each_tab_${row}_${index + 1}`}>
              {/* Action cell — only rendered when renderActions is provided */}
              {renderActions && <TableCell>{renderActions(row, index)}</TableCell>}

              {/* Caller renders all data cells */}
              {renderRow(row, index)}
            </TableRow>
          ))}
      </StyledTableBody>
    </Table>
  );

  return (
    <CustomTableContainer>
      <StyledTableContainer>
        {dataLoading && (!data || data.length === 0) ? (
          <PageLoader wrapperCls="page-loader" />
        ) : isSortable && data?.length > 0 ? (
          <SortableListWrapper
            items={data}
            onReorder={(newItems) => {
              if (onReorder) onReorder(newItems);
            }}
            enabled={isSortable}
            idAccessor={idAccessor}
          >
            {renderTableContent()}
          </SortableListWrapper>
        ) : (
          renderTableContent()
        )}
      </StyledTableContainer>

      {data?.length > 0 && showPagination ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="pagination-stack"
          flexWrap="wrap"
          gap={2}
        >
          {paginationLabel && <Typography variant="body2">{paginationLabel}</Typography>}

          <Stack direction="row" alignItems="center" gap={3} flexWrap="wrap">
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="body2">Show:</Typography>
              <Select
                value={activeLimit}
                onChange={handleLimitChange}
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 70,
                  fontSize: '0.875rem',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main',
                  },
                  height: 32,
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </Stack>

            <Pagination
              count={pageCount}
              page={activePage}
              onChange={handlePageChange}
              hidePrevButton
              hideNextButton
              variant="text"
              shape="rounded"
              color="secondary"
            />
          </Stack>
        </Stack>
      ) : dataLoading ? null : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5px',
          }}
        >
          {noDataPlaceholder}
        </Box>
      )}

      {/* ── Pagination ── */}
    </CustomTableContainer>
  );
}

export default ReusableDataTable;
