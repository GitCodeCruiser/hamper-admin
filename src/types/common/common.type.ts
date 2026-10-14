export type TApiVersions = 'v1';

export type TMediaUrlUserType = 'admin' | 'user';

export type TRoleType = {
  _id: string;
  role: string;
  roleDisplayName: string;
};

export type TUsersData = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: TRoleType;
  status: string;
  phone: string;
  countryCode: string;
  profileImage: string;
  rememberMe: boolean;
  isEmailNotification: boolean;
  // isPushNotification: boolean;
};

export type TStatusChangeType = 'Active' | 'Inactive' | 'active' | 'inactive';
export type TPaginationSortOrderType = 'asc' | 'desc';
export type TPaginationCommonType = {
  page: number;
  limit: number;
  search: string;
  status?: string;
  sortField?: string;
  sortOrder?: TPaginationSortOrderType;
};

export type TAboutUsPurposeValueType =
  'aboutUsTopContent' | 'accreditationsDetails' | 'aboutUsBottomContent';

export type THomePagePurposeValueType =
  | 'homepageBanner'
  | 'homepageCompare'
  | 'homepageTopContent'
  | 'homepageMembership'
  | 'homepageMembershipData'
  | 'homepageHowItWorks'
  | 'homepageFeaturedDestination'
  | 'homepageFeaturedAircraft'
  | 'homepageFeaturedAircraftData'
  | 'homepageCharterContent'
  | 'homepageCharterContentData'
  | 'homepageLegOffer'
  | 'homepageLegOfferData'
  | 'homepageTestimonialData'
  | 'homepageTestimonial';

export type TContactUsPurposeValueType = 'contactUsTopDetails' | 'contactUsRightDetails';
export type TCompareAircraftPurposeValueType = 'compareAircraftTopDetails';
export type TPrivacyPolicyPurposeValueType = 'privacyPolicyContent';
export type TEmptyLegFlightPurposeValueType = 'emptyLegFlightsContent';
export type TCookiePolicyPurposeValueType = 'cookiePolicyContent';
export type TTermsAndConditionPurposeValueType = 'termsConditionContent';
export type TPricingCalculatorPurposeValueType = 'pricingCalculatorTopContent';
export type TEnquiryPurposeValueType = 'enquiryTopContent';
export type TSafetyPurposeValueType = 'safetyContent';
export type TReferralProgramPurposeValueType = 'referralProgramContent';
export type TBlogPurposeValueType = 'blogTopContent';
export type TInsiderGuidePurposeValueType = 'insiderGuideTopContent';
export type TPartnershipsPurposeValueType = 'partnershipsTopContent';
export type TDisclaimerPurposeValueType = 'disclaimerContent';
export type TAllPagesPurposeValueType =
  | 'guideModalContent'
  | 'robotsTextContent'
  | 'llmsTextContent'
  | 'cookieBannerScriptContent'
  | 'otherScriptContent'
  | 'documentUploadScriptContent';
export type TConciergePurposeValueType = 'conciergeContent' | 'conciergeTop' | 'conciergeBottom';
export type TMattHoganPurposeValueType =
  'mattHoganTop' | 'mattHoganContent' | 'mattHoganBottom' | 'mattHoganFacts';
export type TSafetyOperatorVettingPurposeValueType =
  | 'safetyOperatorVettingContent'
  | 'safetyOperatorVettingTopContent'
  | 'safetyOperatorVettingBottomContent';

export type TOnDemandCharterPurposeValueType =
  'onDemandCharterContent' | 'onDemandCharterTop' | 'onDemandCharterBottom';

export type TJetCardPurposeValueType = 'jetCardContent' | 'jetCardTop' | 'jetCardBottom';

export type TLoyaltyProgramPurposeValueType =
  'loyaltyProgramContent' | 'loyaltyProgramTop' | 'loyaltyProgramBottom';

export type TPrivateOfficePurposeValueType =
  'privateOfficeContent' | 'privateOfficeTop' | 'privateOfficeBottom';

export type TTypesOfCharterPurposeValueType =
  'typesOfCharterContent' | 'typesOfCharterTop' | 'typesOfCharterBottom';

export type TResourcesPurposeValueType = 'resourcesContent' | 'resourcesTop' | 'resourcesBottom';

export type TMembershipPurposeValueType =
  | 'membershipContent'
  | 'membershipTop'
  | 'membershipBottom'
  | 'membershipHourlyBreakdown'
  | 'membershipCategoryVsPremium';

export type TWhyHoganiPurposeValueType =
  'whyHoganiContent' | 'whyHoganiTop' | 'whyHoganiBottom' | 'whyHoganiHourlyBreakdown';

export type TAircraftOptionsPurposeValueType =
  | 'aircraftOptionsContent'
  | 'aircraftOptionsTop'
  | 'aircraftOptionsBottom'
  | 'aircraftOptionsHourlyBreakdown';

export type TTravelResourcesPurposeValueType =
  | 'travelResourcesContent'
  | 'travelResourcesTop'
  | 'travelResourcesBottom'
  | 'travelResourcesHourlyBreakdown';

export type TJetCardEnquiryPurposeValueType = 'jetCardEnquiryContent';
export type TLoyaltyProgramEnquiryPurposeValueType = 'loyaltyProgramEnquiryContent';
export type TPrivateOfficeEnquiryPurposeValueType = 'privateOfficeEnquiryContent';

export type TCMSPageCommonPurposeValueType =
  | TAboutUsPurposeValueType
  | TContactUsPurposeValueType
  | TCompareAircraftPurposeValueType
  | TPrivacyPolicyPurposeValueType
  | TEmptyLegFlightPurposeValueType
  | TCookiePolicyPurposeValueType
  | TTermsAndConditionPurposeValueType
  | TPricingCalculatorPurposeValueType
  | TEnquiryPurposeValueType
  | TSafetyPurposeValueType
  | TReferralProgramPurposeValueType
  | TBlogPurposeValueType
  | TInsiderGuidePurposeValueType
  | TPartnershipsPurposeValueType
  | TDisclaimerPurposeValueType
  | TAllPagesPurposeValueType
  | TConciergePurposeValueType
  | TSafetyOperatorVettingPurposeValueType
  | TOnDemandCharterPurposeValueType
  | TJetCardPurposeValueType
  | TLoyaltyProgramPurposeValueType
  | TPrivateOfficePurposeValueType
  | TTypesOfCharterPurposeValueType
  | TResourcesPurposeValueType
  | TMembershipPurposeValueType
  | TWhyHoganiPurposeValueType
  | TAircraftOptionsPurposeValueType
  | TTravelResourcesPurposeValueType
  | TJetCardEnquiryPurposeValueType
  | TLoyaltyProgramEnquiryPurposeValueType
  | TPrivateOfficeEnquiryPurposeValueType;
