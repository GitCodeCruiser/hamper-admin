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
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useState } from 'react';

import ChangeUserStatusModal from './modal/ChangeUserStatusModal';
import DeleteUserModal from './modal/DeleteUserModal';

import { useUsersChangeStatus, useUsersDelete } from '@/api/hooks/user/hooks';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TEachAdminUser } from '@/types/apps/user/index.type';
import { useAppSelector } from '@/zustand/index.hooks';

export const UserActionComp = ({
  row,
  index,
  refetchUserList,
}: {
  row: TEachAdminUser;
  index: number;
  refetchUserList: () => void;
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { auth } = useAppSelector();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  const isMatt = row?.email?.toLowerCase() === 'matt@hoganijets.com';
  const isCurrentUser =
    !!auth.userData?._id &&
    (row?._id === auth.userData._id ||
      (!!auth.userData.email && row?.email?.toLowerCase() === auth.userData.email.toLowerCase()));

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setActiveRowIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRowIndex(null);
  };

  const openDeleteModal = useCallback(() => {
    if (isMatt || isCurrentUser) return;
    setDeleteModal(true);
    handleMenuClose();
  }, [isMatt, isCurrentUser]);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const openStatusModal = useCallback(() => {
    if (isMatt || isCurrentUser) return;
    setStatusModal(true);
    handleMenuClose();
  }, [isMatt, isCurrentUser]);

  const closeStatusModal = useCallback(() => {
    setStatusModal(false);
  }, []);

  const { mutateAsync: deleteUser, isPending: deleteUserLoading } = useUsersDelete({
    optionalCallback: () => {
      closeDeleteModal();
      refetchUserList();
    },
    errorCallback: () => {
      closeDeleteModal();
    },
  });

  const { mutateAsync: statusUser, isPending: statusUserLoading } = useUsersChangeStatus({
    optionalCallback: () => {
      closeStatusModal();
      refetchUserList();
    },
    errorCallback: () => {
      closeStatusModal();
    },
  });

  const getDeleteDisabledTooltip = () => {
    if (isMatt) return 'Matthew Hogan cannot be removed';
    if (isCurrentUser) return 'You cannot delete your own account';
    return '';
  };

  const getStatusDisabledTooltip = () => {
    if (isMatt) return "Matthew Hogan's status cannot be changed";
    if (isCurrentUser) return 'You cannot change your own status';
    return '';
  };

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
              minWidth: 160,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.12)',
              mt: 0.5,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            router.push(PAGE_ROUTE.dashboard.users.edit(row?._id));
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

        {isMatt || isCurrentUser ? (
          <Tooltip title={getStatusDisabledTooltip()} placement="left">
            <span>
              <MenuItem disabled sx={{ gap: 1, py: 1, px: 2, opacity: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <ChangeCircleIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2">Status</Typography>
              </MenuItem>
            </span>
          </Tooltip>
        ) : (
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
        )}

        {isMatt || isCurrentUser ? (
          <Tooltip title={getDeleteDisabledTooltip()} placement="left">
            <span>
              <MenuItem disabled sx={{ gap: 1, py: 1, px: 2, opacity: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  <DeleteOutlineIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2">Delete</Typography>
              </MenuItem>
            </span>
          </Tooltip>
        ) : (
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
        )}
      </Menu>

      {/* Status Modal */}
      <ChangeUserStatusModal
        open={statusModal}
        onClose={closeStatusModal}
        onConfirm={() => {
          statusUser({
            id: row?._id,
            status: row?.status === 'active' ? 'inactive' : 'active',
          });
        }}
        loading={statusUserLoading}
      />

      {/* Delete Modal */}
      <DeleteUserModal
        open={deleteModal}
        onClose={closeDeleteModal}
        onConfirm={() => {
          deleteUser(row?._id);
        }}
        loading={deleteUserLoading}
      />
    </>
  );
};
