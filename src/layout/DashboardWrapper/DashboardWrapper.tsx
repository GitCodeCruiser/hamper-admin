'use client';

import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

import DashboardHeader from '../DashboardHeader/DashboardHeader';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';

import { PAGE_ROUTE } from '@/routes/index.route';
import { Wrapper } from '@/styles/StyledComponents/DashboardStyled/DashboardWrapperStyled';

export type TDashboardLayoutData = {
  children?: React.ReactNode;
};

const DashboardWrapper: React.FC<TDashboardLayoutData> = ({ children }) => {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    [`${PAGE_ROUTE.dashboard.homepage}`]: 'Home',
    [`${PAGE_ROUTE.dashboard.aboutUs}`]: 'About Us',
    [`${PAGE_ROUTE.dashboard.ourStory}`]: 'Our Story',
    [`${PAGE_ROUTE.dashboard.concierge}`]: 'Concierge',
    [`${PAGE_ROUTE.dashboard.safetyOperatorVetting}`]: 'Safety & Operator Vetting',
    [`${PAGE_ROUTE.dashboard.onDemandCharter}`]: 'On Demand Charter',
    [`${PAGE_ROUTE.dashboard.jetCard}`]: 'Jet Card',
    [`${PAGE_ROUTE.dashboard.loyaltyProgram}`]: 'Loyalty Program',
    [`${PAGE_ROUTE.dashboard.privateOffice}`]: 'Private Office',
    [`${PAGE_ROUTE.dashboard.jetCardEnquiry}`]: 'Jet Card Enquiry',
    [`${PAGE_ROUTE.dashboard.loyaltyProgramEnquiry}`]: 'Loyalty Program Enquiry',
    [`${PAGE_ROUTE.dashboard.privateOfficeEnquiry}`]: 'Private Office Enquiry',

    [`${PAGE_ROUTE.dashboard.membership.list}`]: 'Membership',
    [`${PAGE_ROUTE.dashboard.aircraftOptions.list}`]: 'Aircraft Options',

    [`${PAGE_ROUTE.dashboard.compareAircraft}`]: 'Compare Aircraft',

    [`${PAGE_ROUTE.dashboard.availableAircraft.categoryList}`]: 'Aircraft Category',
    [`${PAGE_ROUTE.dashboard.availableAircraft.list}`]: 'Aircraft',

    [`${PAGE_ROUTE.dashboard.destinations.list}`]: 'Destinations',
    [`${PAGE_ROUTE.dashboard.airport.list}`]: 'Airports',
    [`${PAGE_ROUTE.dashboard.route.list}`]: 'Routes',

    [`${PAGE_ROUTE.dashboard.travelOffer.list}`]: 'Empty Lef Offer',
    [`${PAGE_ROUTE.dashboard.lifestyle.testimonial.list}`]: 'Testimonial',
    [`${PAGE_ROUTE.dashboard.lifestyle.blog.list}`]: 'Blog',
    [`${PAGE_ROUTE.dashboard.lifestyle.insiderGuide.list}`]: 'Insider Guide to Private Aviation',
    [`${PAGE_ROUTE.dashboard.lifestyle.partnerships.list}`]: 'Partnerships',

    [`${PAGE_ROUTE.dashboard.contactUs.list}`]: 'Contact Us',
    [`${PAGE_ROUTE.dashboard.salesSupport.list}`]: 'Sales Support',
    [`${PAGE_ROUTE.dashboard.settings}`]: 'Website Settings',
    [`${PAGE_ROUTE.dashboard.profileDetails}`]: 'Profile Details',
    [`${PAGE_ROUTE.dashboard.mainpage}`]: 'Dashboard',
    [`${PAGE_ROUTE.dashboard.enquiry}`]: 'Enquiry',
    [`${PAGE_ROUTE.dashboard.privacyPolicy}`]: 'Privacy Policy',
    [`${PAGE_ROUTE.dashboard.cookiePolicy}`]: 'Cookie Policy',
    [`${PAGE_ROUTE.dashboard.termsAndCondition}`]: 'Terms & Condition',
    [`${PAGE_ROUTE.dashboard.safety}`]: 'Safety',
    [`${PAGE_ROUTE.dashboard.pricingCalculator}`]: 'Pricing Calculator',
    [`${PAGE_ROUTE.dashboard.referralProgram}`]: 'Referral Program',
    [`${PAGE_ROUTE.dashboard.disclaimer}`]: 'Disclaimer',
    [`${PAGE_ROUTE.dashboard.guideDownloads}`]: 'Guide Downloads',
    [`${PAGE_ROUTE.dashboard.cta}`]: 'CTA (Call To Action)',
    [`${PAGE_ROUTE.dashboard.airportData.list}`]: 'Airport Data',
    [`${PAGE_ROUTE.dashboard.legEnquiry.list}`]: 'Leg Enquiry',

    [`${PAGE_ROUTE.dashboard.master.cityList.list}`]: 'City List',
    [`${PAGE_ROUTE.dashboard.master.stateList.list}`]: 'State List',
    [`${PAGE_ROUTE.dashboard.master.countryList.list}`]: 'Country List',
  };

  const headerTitle = titles[pathname] ?? '';

  return (
    <Wrapper>
      <Box className="sidebar-outer">
        <DashboardSidebar />
      </Box>
      <Box className="wrapper-right">
        <Box className="dashboard-body">
          <DashboardHeader headerTitle={headerTitle} />
          <Box className="child-outer">
            <Typography variant="h1" className="page-title">
              {headerTitle}
            </Typography>
            {children}
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default DashboardWrapper;
