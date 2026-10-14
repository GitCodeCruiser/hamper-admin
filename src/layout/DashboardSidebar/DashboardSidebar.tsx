'use client';

// import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
// import FlightClassIcon from '@mui/icons-material/FlightClass';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import CampaignIcon from '@mui/icons-material/Campaign';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CircleIcon from '@mui/icons-material/Circle';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CookieIcon from '@mui/icons-material/Cookie';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FlightIcon from '@mui/icons-material/Flight';
import FlightClassIcon from '@mui/icons-material/FlightClass';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import GavelIcon from '@mui/icons-material/Gavel';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StopIcon from '@mui/icons-material/Stop';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import assest from '../../../json/assest';

import { useAuthAdminLogout } from '@/api/hooks/auth/admin/hooks';
import { PAGE_ROUTE } from '@/routes/index.route';
import { Sidebar } from '@/styles/StyledComponents/DashboardStyled/DashboardSidebarStyled';
import { TSidebarItem } from '@/types/common/dashboardlayout.type';
import LogoutIcon from '@/ui/Icons/LogoutIcon';
import CustomLoader from '@/ui/Loader/Loder';

// ! All the commented navbar will open one by one as per the client feedback
export const sidebarNavList: TSidebarItem[] = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    route: PAGE_ROUTE.dashboard.homepage,
  },
  {
    name: 'Why Hogani Jets?',
    icon: <HelpIcon />,
    route: PAGE_ROUTE.dashboard.whyHogani.list,
  },
  {
    name: 'About Us',
    icon: <InfoIcon />,
    route: '#',
    children: [
      {
        name: 'Matt Hogan',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.mattHogan,
      },
      {
        name: 'About Us',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.aboutUs,
      },
      {
        name: 'Concierge',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.concierge,
      },
      {
        name: 'Safety Vetting',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.safetyOperatorVetting,
      },
      {
        name: 'Partnerships',
        icon: <HandshakeIcon />,
        route: PAGE_ROUTE.dashboard.lifestyle.partnerships.list,
      },
    ],
  },
  {
    name: 'Ways to Fly',
    icon: <CardMembershipIcon />,
    route: PAGE_ROUTE.dashboard.membership.list,
  },
  {
    name: 'Types Of Charter',
    icon: <ConnectingAirportsIcon />,
    route: PAGE_ROUTE.dashboard.typesOfCharter.list,
  },
  {
    name: 'Instant Charter Estimate',
    icon: <StopIcon />,
    route: '#',
    children: [
      {
        name: 'Pricing Calculator',
        icon: <PriceCheckIcon />,
        route: PAGE_ROUTE.dashboard.pricingCalculator,
      },
      {
        name: 'Enquiry',
        icon: <RequestQuoteIcon />,
        route: PAGE_ROUTE.dashboard.enquiry,
      },
    ],
  },
  {
    name: 'Enquiry Forms CMS',
    icon: <EditDocumentIcon />,
    route: '#',
    children: [
      {
        name: 'Jet Card Enquiry',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.jetCardEnquiry,
      },
      {
        name: 'Loyalty Program Enquiry',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.loyaltyProgramEnquiry,
      },
      {
        name: 'Private Office Enquiry',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.privateOfficeEnquiry,
      },
    ],
  },
  {
    name: 'Aircraft Options',
    icon: <FlightIcon />,
    route: PAGE_ROUTE.dashboard.aircraftOptions.list,
  },
  {
    name: 'Aircraft',
    icon: <FlightIcon />,
    route: '#',
    children: [
      {
        name: 'Categories',
        icon: <FlightTakeoffIcon />,
        route: PAGE_ROUTE.dashboard.availableAircraft.categoryList,
      },
      {
        name: 'Available Aircraft',
        icon: <FlightIcon />,
        route: PAGE_ROUTE.dashboard.availableAircraft.list,
      },
      {
        name: 'Compare Aircraft',
        icon: <CompareArrowsIcon />,
        route: PAGE_ROUTE.dashboard.compareAircraft,
      },
    ],
  },
  // {
  //   name: 'Travel Resources',
  //   icon: <MenuBookIcon />,
  //   route: PAGE_ROUTE.dashboard.travelResources.list,
  // },
  {
    name: 'Routes & Destinations',
    icon: <DynamicFeedIcon />,
    route: '#',
    children: [
      {
        name: 'Destinations',
        icon: <LocationCityIcon />,
        route: PAGE_ROUTE.dashboard.destinations.list,
      },
      {
        name: 'Routes',
        icon: <ForkRightIcon />,
        route: PAGE_ROUTE.dashboard.route.list,
      },
      {
        name: 'Airports',
        icon: <AirplaneTicketIcon />,
        route: PAGE_ROUTE.dashboard.airport.list,
      },
    ],
  },
  //  {
  //   name: 'Insider Guide',
  //   icon: <MenuBookIcon />,
  //   route: '#',
  //   children: [
  //     {
  //       name: 'Guides',
  //       icon: <EditDocumentIcon />,
  //       route: PAGE_ROUTE.dashboard.lifestyle.insiderGuide.list,
  //     },
  //     {
  //       name: 'Guides Downloads',
  //       icon: <MenuBookIcon />,
  //       route: PAGE_ROUTE.dashboard.guideDownloads,
  //     },
  //   ],
  // },
  {
    name: 'Charter Uncensored',
    icon: <EditDocumentIcon />,
    route: PAGE_ROUTE.dashboard.resources.list,
  },
  {
    name: 'Guides Downloads',
    icon: <MenuBookIcon />,
    route: PAGE_ROUTE.dashboard.guideDownloads,
  },
  {
    name: 'CTA',
    icon: <CampaignIcon />,
    route: PAGE_ROUTE.dashboard.cta,
  },
  {
    name: 'Empty Leg Flights',
    icon: <FlightClassIcon />,
    route: PAGE_ROUTE.dashboard.emptyLegFlight,
  },
  {
    name: 'Leg Enquiry',
    icon: <EditDocumentIcon />,
    route: PAGE_ROUTE.dashboard.legEnquiry.list,
  },
  {
    name: 'News & Blog',
    icon: <EditDocumentIcon />,
    route: PAGE_ROUTE.dashboard.lifestyle.blog.list,
  },

  {
    name: 'Contact Us',
    icon: <ContactPageIcon />,
    route: PAGE_ROUTE.dashboard.contactUs.list,
  },

  //
  //
  //
  //
  //

  // {
  //   name: 'Membership',
  //   icon: <CardMembershipIcon />,
  //   route: '#',
  //   children: [
  //     {
  //       name: 'On Demand Charter',
  //       icon: <CircleIcon />,
  //       route: PAGE_ROUTE.dashboard.onDemandCharter,
  //     },
  //     {
  //       name: 'Jet Card',
  //       icon: <CircleIcon />,
  //       route: PAGE_ROUTE.dashboard.jetCard,
  //     },
  //     {
  //       name: 'Private Office',
  //       icon: <CircleIcon />,
  //       route: PAGE_ROUTE.dashboard.privateOffice,
  //     },
  //     {
  //       name: 'Loyalty Program',
  //       icon: <CircleIcon />,
  //       route: PAGE_ROUTE.dashboard.loyaltyProgram,
  //     },
  //   ],
  // },
  // {
  //   name: 'Lifestyle',
  //   icon: <NightlifeIcon />,
  //   route: '#',
  //   children: [
  //     {
  //       name: 'Blog',
  //       icon: <EditDocumentIcon />,
  //       route: PAGE_ROUTE.dashboard.lifestyle.blog.list,
  //     },
  //   ],
  // },
  {
    name: 'Testimonials',
    icon: <FeedbackIcon />,
    route: PAGE_ROUTE.dashboard.lifestyle.testimonial.list,
  },
  // {
  //   name: 'Airport Data',
  //   icon: <ConnectingAirportsIcon />,
  //   route: PAGE_ROUTE.dashboard.airportData.list,
  // },
  {
    name: 'Location Management',
    icon: <MapIcon />,
    route: '#',
    children: [
      {
        name: 'Country List',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.master.countryList.list,
      },
      {
        name: 'State List',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.master.stateList.list,
      },
      {
        name: 'City List',
        icon: <CircleIcon />,
        route: PAGE_ROUTE.dashboard.master.cityList.list,
      },
    ],
  },
  // {
  //   name: 'Sales Person Management',
  //   icon: <PersonIcon />,
  //   route: '#',
  //   children: [
  //     {
  //       name: 'Sales Person',
  //       icon: <PersonIcon />,
  //       route: PAGE_ROUTE.dashboard.salesPerson.list,
  //     },
  //     {
  //       name: 'Leads',
  //       icon: <GroupIcon />,
  //       route: PAGE_ROUTE.dashboard.charterEnquiry.list,
  //     },
  //     {
  //       name: 'Sales Support',
  //       icon: <SupportAgentIcon />,
  //       route: PAGE_ROUTE.dashboard.salesSupport.list,
  //     },
  //   ],
  // },
  {
    name: 'Footer',
    icon: <SettingsIcon />,
    route: '#',
    children: [
      {
        name: 'Disclaimer',
        icon: <HelpIcon />,
        route: PAGE_ROUTE.dashboard.disclaimer,
      },
      {
        name: 'Referral Program',
        icon: <CardMembershipIcon />,
        route: PAGE_ROUTE.dashboard.referralProgram,
      },
      {
        name: 'Empty Leg Offer',
        icon: <LocalOfferIcon />,
        route: PAGE_ROUTE.dashboard.travelOffer.list,
      },
      {
        name: 'Privacy Policy',
        icon: <PrivacyTipIcon />,
        route: PAGE_ROUTE.dashboard.privacyPolicy,
      },
      {
        name: 'Cookie Policy',
        icon: <CookieIcon />,
        route: PAGE_ROUTE.dashboard.cookiePolicy,
      },
      {
        name: 'Terms & Condition',
        icon: <GavelIcon />,
        route: PAGE_ROUTE.dashboard.termsAndCondition,
      },
      {
        name: 'Website Settings',
        icon: <SettingsIcon />,
        route: PAGE_ROUTE.dashboard.settings,
      },
    ],
  },

  // {
  //   name: 'Safety',
  //   icon: <SecurityIcon />,
  //   route: PAGE_ROUTE.dashboard.safety,
  // },

  {
    name: 'Redirection',
    icon: <AltRouteIcon />,
    route: PAGE_ROUTE.dashboard.redirection.list,
  },
  {
    name: 'Metadata',
    icon: <SettingsIcon />,
    route: '#',
    children: [
      {
        name: 'Cookie Script',
        icon: <SmartToyIcon />,
        route: PAGE_ROUTE.dashboard.cookieBannerScript,
      },
      {
        name: 'Other Script',
        icon: <SmartToyIcon />,
        route: PAGE_ROUTE.dashboard.otherScript,
      },
      {
        name: 'Document Upload Script',
        icon: <SmartToyIcon />,
        route: PAGE_ROUTE.dashboard.documentUploadScript,
      },
      {
        name: 'robots.txt',
        icon: <SmartToyIcon />,
        route: PAGE_ROUTE.dashboard.robotsText,
      },
      {
        name: 'llms.txt',
        icon: <SmartToyIcon />,
        route: PAGE_ROUTE.dashboard.llmsText,
      },
    ],
  },

  {
    name: 'Profile Details',
    icon: <PersonIcon />,
    route: PAGE_ROUTE.dashboard.profileDetails,
  },
];

const DashboardSidebar: React.FC<BoxProps> = () => {
  const pathname = usePathname();

  const isActiveLink = (path: string) => {
    if (path === '#') return false;
    if (pathname === path) return true;
    if (path !== '/' && pathname.startsWith(`${path}/`)) return true;
    return false;
  };

  // -----------------------------------------------

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const normalizePath = (path: string) => {
    if (!path) return '/';
    return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  };

  const isActive = (route: string) => {
    const currentPath = normalizePath(pathname);
    const targetRoute = normalizePath(route);

    if (targetRoute === PAGE_ROUTE.dashboard.homepage) {
      return currentPath === targetRoute;
    }

    return currentPath === targetRoute || currentPath.startsWith(`${targetRoute}/`);
  };

  const isChildActive = (item: TSidebarItem) =>
    item.children?.some((child) => isActive(child.route)) ?? false;

  const handleAccordionToggle = (index: number) => {
    setExpandedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const { mutateAsync: adminLogout, isPending: adminLogoutLoading } = useAuthAdminLogout({
    optionalCallback: () => {
      window.location.href = PAGE_ROUTE.auth.login;
    },
  });

  return (
    <Sidebar>
      <Box className="logo-box">
        {/* <Link href={PAGE_ROUTE.dashboard.homepage}>
          <LogoIcon
          />
        </Link> */}

        <Link href={`${PAGE_ROUTE.dashboard.homepage}`} className="headerLogo">
          <Image src={assest.hoganiJetslogo} width={300} height={300} alt="hogani-logo" priority />
        </Link>
      </Box>
      <Stack justifyContent="space-between" className="scroll-box">
        <List disablePadding>
          {sidebarNavList.map((data, index) => {
            const hasChildren = data.children && data.children.length > 0;
            const isExpanded = expandedItems[index] ?? false;
            const parentActive = isActive(data.route) || isChildActive(data);

            if (hasChildren) {
              return (
                <ListItem disablePadding key={index} className="accordion-list-item">
                  <Accordion
                    disableGutters
                    elevation={0}
                    square
                    expanded={isExpanded}
                    onChange={() => handleAccordionToggle(index)}
                    className="sidebar-accordion"
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          color="primary"
                          className={`accordion-chevron ${isExpanded ? 'rotated' : ''}`}
                        />
                      }
                      className={parentActive ? 'active' : ''}
                    >
                      <span className="i-span">{data.icon}</span>
                      <Typography variant="body1">{data.name}</Typography>
                    </AccordionSummary>

                    <AccordionDetails className="accordion-details">
                      <List disablePadding>
                        {data.children!.map((child, childIndex) => (
                          <ListItem disablePadding key={childIndex}>
                            <Link
                              href={child.route}
                              className={isActive(child.route) ? 'active' : ''}
                            >
                              <span className="i-span">{child.icon}</span>
                              <Typography variant="body1">{child.name}</Typography>
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
              );
            }

            return (
              <ListItem disablePadding key={index}>
                <Link href={data.route} className={isActive(data.route) ? 'active' : ''}>
                  <span className="i-span">{data.icon}</span>
                  <Typography variant="body1">{data.name}</Typography>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Button
          className="logout-btn"
          startIcon={
            adminLogoutLoading ? (
              <CustomLoader size={15} />
            ) : (
              <LogoutIcon IconColor="currentColor" />
            )
          }
          fullWidth
          onClick={() => adminLogout()}
          disabled={adminLogoutLoading}
        >
          Logout
        </Button>
      </Stack>
    </Sidebar>
  );
};

export default DashboardSidebar;
