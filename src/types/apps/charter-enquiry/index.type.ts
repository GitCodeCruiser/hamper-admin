import { TPaginationCommonType } from '@/types/common/common.type';

export type TCharterEnquiryTripType = 'One Way' | 'Round Trip' | 'Multi Legs';

export const CHARTER_ENQUIRY_TRIP_TYPES: TCharterEnquiryTripType[] = [
  'One Way',
  'Round Trip',
  'Multi Legs',
];

export type TCharterEnquiryStatusType = 'Pending' | 'Reviewed' | 'Resolved';

export const CHARTER_ENQUIRY_STATUSES: TCharterEnquiryStatusType[] = [
  'Pending',
  'Reviewed',
  'Resolved',
];

export type TCharterEnquiryGetAllParamType = {
  tripType?: TCharterEnquiryTripType | '';
} & TPaginationCommonType;

// ---------------------------------------------------------------------------
// Sub-types
// ---------------------------------------------------------------------------

export type DepartureAirport = {
  _id: string;
  title: string;
  city: string;
  country: string;
  state: string;
  iata: string;
  icao: string;
};

export type ArrivalAirport = {
  _id: string;
  title: string;
  icao: string;
  iata: string;
  city: string;
  state: string;
  country: string;
};

export type TCharterEnquiryLeg = {
  departureAirport: DepartureAirport;
  arrivalAirport: ArrivalAirport;
  departureDate: string;
  departureTime: string;
  returnDate: string | null;
  passengers: number;
};

export type TCharterEnquiryAircraftCategory = {
  _id: string;
  title: string;
  featureImage: string;
};

export type UserInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
};

// ---------------------------------------------------------------------------
// Main document type (matches the API response shape)
// ---------------------------------------------------------------------------

export type TEachCharterEnquiry = {
  _id: string;
  userId?: string | null;
  leadId?: string;
  aircraftIds: string[];
  aircraftCategoriesIds: string[];
  tripType: 'One Way' | 'Round Trip' | 'Multi Legs' | string;
  clientType?: string;
  legs: TCharterEnquiryLeg[];
  firstName: string;
  lastName: string;
  email: string;
  countryCode?: string;
  phone: string;
  additionalNotes?: string;
  travellingWithPets: boolean;
  oversizedLuggage: boolean;
  largeQuantityOfLuggage: boolean;
  minorsTravelling: boolean;
  firearms: boolean;
  conciergeServices?: string[];
  howDidYouHearAboutUs?: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  aircraftCategories: TCharterEnquiryAircraftCategory[];
  userInfo: UserInfo;
};
