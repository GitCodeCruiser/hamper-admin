'use client';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useState } from 'react';

import ChangeRedirectionStatusModal from './modal/ChangeRedirectionStatusModal';
import DeleteRedirectionModal from './modal/DeleteRedirectionModal';

import { useRedirectionChangeStatus, useRedirectionDelete } from '@/api/hooks/redirection/hooks';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TEachRedirect } from '@/types/apps/redirection/index.type';

export const RedirectionActionComp = ({
  row,
  index,
  refetchRedirectionList,
}: {
  row: TEachRedirect;
  index: number;
  refetchRedirectionList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setActiveRowIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRowIndex(null);
  };

  const openDeleteModal = useCallback(() => {
    setDeleteModal(true);
    handleMenuClose();
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const openStatusModal = useCallback(() => {
    setStatusModal(true);
    handleMenuClose();
  }, []);

  const closeStatusModal = useCallback(() => {
    setStatusModal(false);
  }, []);

  const { mutateAsync: deleteRedirection, isPending: deleteRedirectionLoading } =
    useRedirectionDelete({
      optionalCallback: () => {
        closeDeleteModal();
        refetchRedirectionList();
      },
      errorCallback: () => {
        closeDeleteModal();
      },
    });

  const { mutateAsync: statusRedirection, isPending: statusRedirectionLoading } =
    useRedirectionChangeStatus({
      optionalCallback: () => {
        closeStatusModal();
        refetchRedirectionList();
      },
      errorCallback: () => {
        closeStatusModal();
      },
    });

  const isCurrentActive = row?.status?.toLowerCase() === 'active';

  return (
    <>
      <IconButton size="small" onClick={(e) => handleMenuOpen(e, index)}>
        <MoreVertIcon sx={{ fontSize: CustomSize(18), color: theme.palette.text.secondary }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={activeRowIndex === index}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 150,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
              mt: 0.5,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            router.push(`${PAGE_ROUTE.dashboard.redirection.list}/${row?._id}/edit`);
            handleMenuClose();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <EditOutlinedIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => {
            openStatusModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <ChangeCircleIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Status</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            openDeleteModal();
          }}
          sx={{ gap: 1, py: 1, px: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <DeleteOutlineIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>

      {/* Status Modal */}
      <ChangeRedirectionStatusModal
        open={statusModal}
        onClose={closeStatusModal}
        onConfirm={() => {
          statusRedirection({
            id: row?._id,
            status: isCurrentActive ? 'Inactive' : 'Active',
          });
        }}
        loading={statusRedirectionLoading}
      />

      {/* Delete Modal */}
      <DeleteRedirectionModal
        open={deleteModal}
        onClose={closeDeleteModal}
        onConfirm={() => {
          deleteRedirection(row?._id);
        }}
        loading={deleteRedirectionLoading}
      />
    </>
  );
};

export default RedirectionActionComp;
