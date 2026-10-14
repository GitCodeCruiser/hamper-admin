import assest from '../../json/assest';

import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import {
  TAboutUsPurposeValueType,
  TAircraftOptionsPurposeValueType,
  TAllPagesPurposeValueType,
  TBlogPurposeValueType,
  TCompareAircraftPurposeValueType,
  TConciergePurposeValueType,
  TContactUsPurposeValueType,
  TCookiePolicyPurposeValueType,
  TDisclaimerPurposeValueType,
  TEmptyLegFlightPurposeValueType,
  TEnquiryPurposeValueType,
  THomePagePurposeValueType,
  TInsiderGuidePurposeValueType,
  TJetCardEnquiryPurposeValueType,
  TJetCardPurposeValueType,
  TLoyaltyProgramEnquiryPurposeValueType,
  TLoyaltyProgramPurposeValueType,
  TMattHoganPurposeValueType,
  TMembershipPurposeValueType,
  TOnDemandCharterPurposeValueType,
  TPartnershipsPurposeValueType,
  TPricingCalculatorPurposeValueType,
  TPrivacyPolicyPurposeValueType,
  TPrivateOfficeEnquiryPurposeValueType,
  TPrivateOfficePurposeValueType,
  TReferralProgramPurposeValueType,
  TResourcesPurposeValueType,
  TSafetyOperatorVettingPurposeValueType,
  TSafetyPurposeValueType,
  TTermsAndConditionPurposeValueType,
  TTravelResourcesPurposeValueType,
  TTypesOfCharterPurposeValueType,
  TWhyHoganiPurposeValueType,
} from '@/types/common/common.type';

export const MAX_SIZE_FILE = 2000000;
export const WEB_APP_TOKEN = '__hogan_admin_token';
export const WEB_APP_ROLE = '__hogan_admin_token_role';
export const COOKIE_EXPIRY = new Date(Date.now() + 60 * 60 * 24 * 5 * 1000);

export const IMAGE_ACCEPT_BASE =
  'image/png,image/jpeg,image/jpg,image/heic,image/heif,image/avif,image/webp';

export type IMAGE_ACCEPT_TYPE =
  'image/png,image/jpeg,image/jpg,image/heic,image/heif,image/avif,image/webp';

export const IMAGE_ACCEPT: IMAGE_ACCEPT_TYPE =
  'image/png,image/jpeg,image/jpg,image/heic,image/heif,image/avif,image/webp';

export type VIDEO_ACCEPT_TYPE =
  'video/mp4,video/MP4,video/mpeg,video/quicktime,video/x-msvideo,video/x-matroska,video/webm,video/3gpp,video/3gpp2';

export const VIDEO_ACCEPT: VIDEO_ACCEPT_TYPE =
  'video/mp4,video/MP4,video/mpeg,video/quicktime,video/x-msvideo,video/x-matroska,video/webm,video/3gpp,video/3gpp2';

export const PDF_ACCEPT = 'application/pdf';

export type DOCUMENT_ACCEPT_TYPE =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';

export const DOCUMENT_ACCEPT: DOCUMENT_ACCEPT_TYPE =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';

export type PDF_IMAGE_ACCEPT_TYPE =
  'application/pdf,image/png,image/jpeg,image/jpg,image/heic,image/heif,image/avif,image/webp';

export const PDF_IMAGE_ACCEPT: PDF_IMAGE_ACCEPT_TYPE =
  'application/pdf,image/png,image/jpeg,image/jpg,image/heic,image/heif,image/avif,image/webp';

export const IMAGE_ACCEPT_SIZE = 500 * 1024; // 500 KB -----> 2 * 1024 * 1024; // 2 MB

export const HIGH_QUALITY_IMAGE_DEFINE = { width: 350000, height: 350000 };

/**
 * define for cropping image
 *
 * heroImage: hero image  //! This is background image
 *
 * thumbnailImage: thumbnail image //! This is the poster image
 *
 * featureImage: feature image //! This is the feature image for Aircraft
 */
export const IMAGE_ASPECT_RATIO_DEFINE = {
  heroImage: 2067 / 743,
  thumbnailImage: 570 / 741,
  featureImage: 1000 / 450,
  salesFeatureImage: 250 / 153,
  insiderGuideBannerImage: 423 / 383,
  insiderGuideHeroImage: 1720 / 446,
  partnerShipBannerImage: 755 / 453,
  hubPageLandscapeSize: 770 / 446,
  slidingImage: 810 / 339,
  homeMembershipImage: 197 / 128,
};

export const RESEND_PASSWORD_TIME = 30;
export const PAGE_LIMIT_FOR_PAGINATION = 25;

export const DEFAULT_BANNERS = [
  { id: 'banner1', name: 'Banner Option 1', url: assest.defaultBannerImages.bannerOne },
  { id: 'banner2', name: 'Banner Option 2', url: assest.defaultBannerImages.bannerFour },
];

export const DEFAULT_THUMBNAILS = [
  { id: 'thumbnail1', name: 'Thumbnail Option 1', url: assest.defaultThumbnailImages.thumbnailOne },
];

export const DEFAULT_OG_IMAGES = [
  { id: 'og1', name: 'OG Option 1', url: assest.defaultThumbnailImages.thumbnailOne },
];

// ----------- Storage
export const REDUX_STORAGE = 'hogan-jets-house';
export const INBUILT_API_ACCESS_KEY = process.env.NEXT_APP_ACCESS_KEY!;
export const COOKIE_SECRET_KEY = process.env.NEXT_APP_COOKIE_SECRET_KEY!;

// ----------- Format
export const VALID_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
export const HUMAN_READABLE_DATE_TIME_FORMAT = 'dddd, MMMM DD YYYY, hh:mm a';
export const humanReadableDateTimeFormatForListing = 'DD MMM YYYY, hh:mm A';

// TSeoStaticSlug

type TSeoStaticPage = {
  pageName: string;
  pageSlug: TSeoStaticSlug;
};

export const PageTypeValue: {
  cms: {
    homepage: TSeoStaticPage;
    city: TSeoStaticPage;
    airport: TSeoStaticPage;
    contactUs: TSeoStaticPage;
    aboutUs: TSeoStaticPage;
    aircraft: TSeoStaticPage;
    compareAircraft: TSeoStaticPage;
    charter: TSeoStaticPage;
    charterIntelligence: TSeoStaticPage;
    route: TSeoStaticPage;
    blog: TSeoStaticPage;
    insiderGuide: TSeoStaticPage;
    partnerships: TSeoStaticPage;
    privacyPolicy: TSeoStaticPage;
    emptyLegFlight: TSeoStaticPage;
    cookiePolicy: TSeoStaticPage;
    termsAndCondition: TSeoStaticPage;
    pricingCalculator: TSeoStaticPage;
    enquiry: TSeoStaticPage;
    safety: TSeoStaticPage;
    disclaimer: TSeoStaticPage;
    referralProgram: TSeoStaticPage;
    allPages: TSeoStaticPage;
    concierge: TSeoStaticPage;
    mattHogan: TSeoStaticPage;
    safetyOperatorVetting: TSeoStaticPage;
    onDemandCharter: TSeoStaticPage;
    jetCard: TSeoStaticPage;
    loyaltyProgram: TSeoStaticPage;
    privateOffice: TSeoStaticPage;
    typesOfCharter: TSeoStaticPage;
    resources: TSeoStaticPage;
    membership: TSeoStaticPage;
    whyHogani: TSeoStaticPage;
    aircraftOptions: TSeoStaticPage;
    travelResources: TSeoStaticPage;
    jetCardEnquiry: TSeoStaticPage;
    loyaltyProgramEnquiry: TSeoStaticPage;
    privateOfficeEnquiry: TSeoStaticPage;
  };
} = {
  cms: {
    homepage: {
      pageName: 'Homepage',
      pageSlug: 'home',
    },
    city: {
      pageName: 'City Page',
      pageSlug: 'city',
    },
    airport: {
      pageName: 'Airport Page',
      pageSlug: 'airport',
    },
    contactUs: {
      pageName: 'Contact Us',
      pageSlug: 'contact-us',
    },
    aboutUs: {
      pageName: 'About Us',
      pageSlug: 'about-us',
    },
    aircraft: {
      pageName: 'Aircraft Page',
      pageSlug: 'aircraft',
    },
    compareAircraft: {
      pageName: 'Compare Aircraft Page',
      pageSlug: 'compare-aircraft',
    },
    charter: {
      pageName: 'Charter Page',
      pageSlug: 'charter',
    },
    charterIntelligence: {
      pageName: 'Charter Intelligence',
      pageSlug: 'charter-intelligence',
    },
    route: {
      pageName: 'Route Page',
      pageSlug: 'routes',
    },
    blog: {
      pageName: 'Blog Page',
      pageSlug: 'blog',
    },
    insiderGuide: {
      pageName: 'Insider Guide Page',
      pageSlug: 'insider-guide-to-private-aviation',
    },
    partnerships: {
      pageName: 'Partnerships Page',
      pageSlug: 'partnerships',
    },
    privacyPolicy: {
      pageName: 'Privacy Policy',
      pageSlug: 'privacy-policy',
    },
    emptyLegFlight: {
      pageName: 'Empty Leg Flight',
      pageSlug: 'empty-leg-flights',
    },
    cookiePolicy: {
      pageName: 'Cookie Policy',
      pageSlug: 'cookie-policy',
    },
    termsAndCondition: {
      pageName: 'Terms & Condition',
      pageSlug: 'terms-condition',
    },
    pricingCalculator: {
      pageName: 'Pricing Calculator',
      pageSlug: 'pricing-calculator',
    },
    enquiry: {
      pageName: 'Enquiry',
      pageSlug: 'enquiry',
    },
    safety: {
      pageName: 'Safety',
      pageSlug: 'safety',
    },
    referralProgram: {
      pageName: 'Referral Program',
      pageSlug: 'referral-program',
    },
    disclaimer: {
      pageName: 'Disclaimer',
      pageSlug: 'disclaimer',
    },
    allPages: {
      pageName: 'All Pages',
      pageSlug: 'all-pages',
    },
    concierge: {
      pageName: 'Concierge',
      pageSlug: 'concierge',
    },
    mattHogan: {
      pageName: 'Matt Hogan',
      pageSlug: 'matt-hogan',
    },
    safetyOperatorVetting: {
      pageName: 'Safety Operator Vetting',
      pageSlug: 'safety-operator-vetting',
    },
    onDemandCharter: {
      pageName: 'On Demand Charter',
      pageSlug: 'on-demand-charter',
    },
    jetCard: {
      pageName: 'Jet Card',
      pageSlug: 'jet-card',
    },
    loyaltyProgram: {
      pageName: 'Loyalty Program',
      pageSlug: 'loyalty-program',
    },
    privateOffice: {
      pageName: 'Private Office',
      pageSlug: 'private-office',
    },
    typesOfCharter: {
      pageName: 'Types Of Charter',
      pageSlug: 'types-of-charter',
    },
    resources: {
      pageName: 'Resources',
      pageSlug: 'resources',
    },
    membership: {
      pageName: 'Membership',
      pageSlug: 'membership',
    },
    whyHogani: {
      pageName: 'Why Hogan',
      pageSlug: 'why-hogani',
    },
    aircraftOptions: {
      pageName: 'Aircraft Options',
      pageSlug: 'aircraft-options',
    },
    travelResources: {
      pageName: 'Travel Resources',
      pageSlug: 'travel-resources',
    },
    jetCardEnquiry: {
      pageName: 'Jet Card Enquiry',
      pageSlug: 'jet-card-enquiry',
    },
    loyaltyProgramEnquiry: {
      pageName: 'Loyalty Program Enquiry',
      pageSlug: 'loyalty-program-enquiry',
    },
    privateOfficeEnquiry: {
      pageName: 'Private Office Enquiry',
      pageSlug: 'private-office-enquiry',
    },
  },
};

type TPurposeTypeMap<T extends string> = Record<T, T>;

export const PurposeTypeValue: {
  cms: {
    homepage: TPurposeTypeMap<THomePagePurposeValueType>;
    contactUs: TPurposeTypeMap<TContactUsPurposeValueType>;
    aboutUs: TPurposeTypeMap<TAboutUsPurposeValueType>;
    compareAircraft: TPurposeTypeMap<TCompareAircraftPurposeValueType>;
    privacyPolicy: TPurposeTypeMap<TPrivacyPolicyPurposeValueType>;
    emptyLegFlight: TPurposeTypeMap<TEmptyLegFlightPurposeValueType>;
    cookiePolicy: TPurposeTypeMap<TCookiePolicyPurposeValueType>;
    termsAndCondition: TPurposeTypeMap<TTermsAndConditionPurposeValueType>;
    pricingCalculator: TPurposeTypeMap<TPricingCalculatorPurposeValueType>;
    enquiry: TPurposeTypeMap<TEnquiryPurposeValueType>;
    safety: TPurposeTypeMap<TSafetyPurposeValueType>;
    referralProgram: TPurposeTypeMap<TReferralProgramPurposeValueType>;
    blog: TPurposeTypeMap<TBlogPurposeValueType>;
    insiderGuide: TPurposeTypeMap<TInsiderGuidePurposeValueType>;
    partnerships: TPurposeTypeMap<TPartnershipsPurposeValueType>;
    disclaimer: TPurposeTypeMap<TDisclaimerPurposeValueType>;
    allPages: TPurposeTypeMap<TAllPagesPurposeValueType>;
    concierge: TPurposeTypeMap<TConciergePurposeValueType>;
    mattHogan: TPurposeTypeMap<TMattHoganPurposeValueType>;
    safetyOperatorVetting: TPurposeTypeMap<TSafetyOperatorVettingPurposeValueType>;
    onDemandCharter: TPurposeTypeMap<TOnDemandCharterPurposeValueType>;
    jetCard: TPurposeTypeMap<TJetCardPurposeValueType>;
    loyaltyProgram: TPurposeTypeMap<TLoyaltyProgramPurposeValueType>;
    privateOffice: TPurposeTypeMap<TPrivateOfficePurposeValueType>;
    typesOfCharter: TPurposeTypeMap<TTypesOfCharterPurposeValueType>;
    resources: TPurposeTypeMap<TResourcesPurposeValueType>;
    membership: TPurposeTypeMap<TMembershipPurposeValueType>;
    whyHogani: TPurposeTypeMap<TWhyHoganiPurposeValueType>;
    aircraftOptions: TPurposeTypeMap<TAircraftOptionsPurposeValueType>;
    travelResources: TPurposeTypeMap<TTravelResourcesPurposeValueType>;
    jetCardEnquiry: TPurposeTypeMap<TJetCardEnquiryPurposeValueType>;
    loyaltyProgramEnquiry: TPurposeTypeMap<TLoyaltyProgramEnquiryPurposeValueType>;
    privateOfficeEnquiry: TPurposeTypeMap<TPrivateOfficeEnquiryPurposeValueType>;
  };
} = {
  cms: {
    homepage: {
      homepageBanner: 'homepageBanner',
      homepageCompare: 'homepageCompare',
      homepageTopContent: 'homepageTopContent',
      homepageMembership: 'homepageMembership',
      homepageMembershipData: 'homepageMembershipData',
      homepageHowItWorks: 'homepageHowItWorks',
      homepageFeaturedDestination: 'homepageFeaturedDestination',
      homepageFeaturedAircraft: 'homepageFeaturedAircraft',
      homepageFeaturedAircraftData: 'homepageFeaturedAircraftData',
      homepageCharterContent: 'homepageCharterContent',
      homepageCharterContentData: 'homepageCharterContentData',
      homepageLegOffer: 'homepageLegOffer',
      homepageLegOfferData: 'homepageLegOfferData',
      homepageTestimonial: 'homepageTestimonial',
      homepageTestimonialData: 'homepageTestimonialData',
    },
    contactUs: {
      contactUsTopDetails: 'contactUsTopDetails',
      contactUsRightDetails: 'contactUsRightDetails',
    },
    compareAircraft: {
      compareAircraftTopDetails: 'compareAircraftTopDetails',
    },
    aboutUs: {
      aboutUsTopContent: 'aboutUsTopContent',
      accreditationsDetails: 'accreditationsDetails',
      aboutUsBottomContent: 'aboutUsBottomContent',
    },
    privacyPolicy: {
      privacyPolicyContent: 'privacyPolicyContent',
    },
    emptyLegFlight: {
      emptyLegFlightsContent: 'emptyLegFlightsContent',
    },
    cookiePolicy: {
      cookiePolicyContent: 'cookiePolicyContent',
    },
    termsAndCondition: {
      termsConditionContent: 'termsConditionContent',
    },
    pricingCalculator: {
      pricingCalculatorTopContent: 'pricingCalculatorTopContent',
    },
    enquiry: {
      enquiryTopContent: 'enquiryTopContent',
    },
    safety: {
      safetyContent: 'safetyContent',
    },
    referralProgram: {
      referralProgramContent: 'referralProgramContent',
    },
    blog: {
      blogTopContent: 'blogTopContent',
    },
    insiderGuide: {
      insiderGuideTopContent: 'insiderGuideTopContent',
    },
    partnerships: {
      partnershipsTopContent: 'partnershipsTopContent',
    },
    disclaimer: {
      disclaimerContent: 'disclaimerContent',
    },
    allPages: {
      guideModalContent: 'guideModalContent',
      robotsTextContent: 'robotsTextContent',
      llmsTextContent: 'llmsTextContent',
      cookieBannerScriptContent: 'cookieBannerScriptContent',
      otherScriptContent: 'otherScriptContent',
      documentUploadScriptContent: 'documentUploadScriptContent',
    },
    concierge: {
      conciergeContent: 'conciergeContent',
      conciergeTop: 'conciergeTop',
      conciergeBottom: 'conciergeBottom',
    },
    mattHogan: {
      mattHoganTop: 'mattHoganTop',
      mattHoganContent: 'mattHoganContent',
      mattHoganBottom: 'mattHoganBottom',
      mattHoganFacts: 'mattHoganFacts',
    },
    safetyOperatorVetting: {
      safetyOperatorVettingContent: 'safetyOperatorVettingContent',
      safetyOperatorVettingTopContent: 'safetyOperatorVettingTopContent',
      safetyOperatorVettingBottomContent: 'safetyOperatorVettingBottomContent',
    },
    onDemandCharter: {
      onDemandCharterContent: 'onDemandCharterContent',
      onDemandCharterTop: 'onDemandCharterTop',
      onDemandCharterBottom: 'onDemandCharterBottom',
    },
    jetCard: {
      jetCardContent: 'jetCardContent',
      jetCardTop: 'jetCardTop',
      jetCardBottom: 'jetCardBottom',
    },
    loyaltyProgram: {
      loyaltyProgramContent: 'loyaltyProgramContent',
      loyaltyProgramTop: 'loyaltyProgramTop',
      loyaltyProgramBottom: 'loyaltyProgramBottom',
    },
    privateOffice: {
      privateOfficeContent: 'privateOfficeContent',
      privateOfficeTop: 'privateOfficeTop',
      privateOfficeBottom: 'privateOfficeBottom',
    },
    typesOfCharter: {
      typesOfCharterContent: 'typesOfCharterContent',
      typesOfCharterTop: 'typesOfCharterTop',
      typesOfCharterBottom: 'typesOfCharterBottom',
    },
    resources: {
      resourcesContent: 'resourcesContent',
      resourcesTop: 'resourcesTop',
      resourcesBottom: 'resourcesBottom',
    },
    membership: {
      membershipContent: 'membershipContent',
      membershipTop: 'membershipTop',
      membershipBottom: 'membershipBottom',
      membershipHourlyBreakdown: 'membershipHourlyBreakdown',
      membershipCategoryVsPremium: 'membershipCategoryVsPremium',
    },
    whyHogani: {
      whyHoganiContent: 'whyHoganiContent',
      whyHoganiTop: 'whyHoganiTop',
      whyHoganiBottom: 'whyHoganiBottom',
      whyHoganiHourlyBreakdown: 'whyHoganiHourlyBreakdown',
    },
    aircraftOptions: {
      aircraftOptionsContent: 'aircraftOptionsContent',
      aircraftOptionsTop: 'aircraftOptionsTop',
      aircraftOptionsBottom: 'aircraftOptionsBottom',
      aircraftOptionsHourlyBreakdown: 'aircraftOptionsHourlyBreakdown',
    },
    travelResources: {
      travelResourcesContent: 'travelResourcesContent',
      travelResourcesTop: 'travelResourcesTop',
      travelResourcesBottom: 'travelResourcesBottom',
      travelResourcesHourlyBreakdown: 'travelResourcesHourlyBreakdown',
    },
    jetCardEnquiry: {
      jetCardEnquiryContent: 'jetCardEnquiryContent',
    },
    loyaltyProgramEnquiry: {
      loyaltyProgramEnquiryContent: 'loyaltyProgramEnquiryContent',
    },
    privateOfficeEnquiry: {
      privateOfficeEnquiryContent: 'privateOfficeEnquiryContent',
    },
  },
};
