'use client';

import { Avatar, Box, Drawer, IconButton, Stack, styled, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import assest from '../../../json/assest';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';

import { mediaUrl } from '@/api/endpoints';
import { useAuthAdminProfileDetails } from '@/api/hooks/auth/admin/hooks';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { PAGE_ROUTE } from '@/routes/index.route';
import { HeaderWrap } from '@/styles/StyledComponents/DashboardStyled/DashboardHeaderStyled';
import CrossIcon from '@/ui/Icons/CrossIcon';
import MenuIcon from '@/ui/Icons/MenuIcon';
import { useAppSelector } from '@/zustand/index.hooks';

export type TDashboardHeaderProp = {
  headerTitle: React.ReactNode;
};

const DashboardHeader: React.FC<TDashboardHeaderProp> = ({ headerTitle }) => {
  const { auth } = useAppSelector();
  const { data: adminProfileDetails } = useAuthAdminProfileDetails();
  const [OpenMenuDrawer, setOpenMenuDrawer] = useState(false);
  const [profileTimestamp, setProfileTimestamp] = useState('');

  const menuDrawerHandler = () => {
    setOpenMenuDrawer((prev) => !prev);
  };

  const currentProfileImg = adminProfileDetails?.profileImage || auth?.userData?.profileImage;
  const currentRole =
    adminProfileDetails?.role?.roleDisplayName || auth?.userData?.role?.roleDisplayName || 'Admin';
  const currentEmail = adminProfileDetails?.email || auth?.userData?.email || '-';

  useEffect(() => {
    setProfileTimestamp(`?t=${Date.now()}`);
  }, [currentProfileImg]);

  return (
    <HeaderWrap component="nav" position="sticky" elevation={0}>
      <Toolbar disableGutters>
        <Typography variant="h1" className="h2">
          {headerTitle}
        </Typography>
        {/* <Link href={PAGE_ROUTE.dashboard.homepage} className="logo-link">
          <LogoIcon IconColor="#D4AF37" />
        </Link> */}
        <Link href={`${PAGE_ROUTE.dashboard.homepage}`} className="logo-link">
          <Image
            src={assest.hoganiJetslogoGolden}
            width={200}
            height={200}
            alt="hogani-logo"
            priority
          />
        </Link>
        <Stack direction="row" alignItems="center" flexWrap="wrap" className="header-right">
          {/* <IconButton disableRipple className="notification-btn">
            <span className="badge">5</span>
            <BellIcon IconColor="currentColor" />
          </IconButton> */}
          <Stack direction="row" alignItems="center" flexWrap="wrap" className="header-profile">
            <Avatar
              src={
                currentProfileImg
                  ? `${mediaUrl(currentProfileImg)}${profileTimestamp}`
                  : assest.profileImg
              }
              sx={{ width: `${CustomSize(36)}`, height: `${CustomSize(36)}` }}
            />
            <Box className="profile-right">
              <Typography variant="body1">{currentRole}</Typography>
              <Typography variant="caption">{currentEmail}</Typography>
            </Box>
          </Stack>
          <IconButton
            sx={{ display: { lg: 'none', xs: 'inline-flex' } }}
            disableRipple
            className="menu-btn"
            onClick={menuDrawerHandler}
          >
            <MenuIcon IconColor="currentColor" />
          </IconButton>
        </Stack>
      </Toolbar>
      <MenuDrawer
        open={OpenMenuDrawer}
        onClose={menuDrawerHandler}
        anchor="right"
        slotProps={{ paper: { className: 'menu-paper' } }}
      >
        <IconButton disableRipple className="closemenu-btn" onClick={menuDrawerHandler}>
          <CrossIcon IconColor="currentColor" />
        </IconButton>
        <DashboardSidebar />
      </MenuDrawer>
    </HeaderWrap>
  );
};

export default DashboardHeader;

export const MenuDrawer = styled(Drawer)`
  .menu-paper {
    width: 275px;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    padding-left: 34px;

    .closemenu-btn {
      position: absolute;
      left: 11px;
      top: 10px;
      background-color: ${({ theme }) => theme.palette.secondary.main};
      color: ${({ theme }) => theme.palette.text.secondary};
    }
  }
`;
