import { TPaginationCommonType, TStatusChangeType } from '@/types/common/common.type';

export type THourlyRunningSpeed = {
  zeroToThree?: number;
  threeToSix?: number;
  sixToNine?: number;
  ninePlus?: number;
};

export type TSpeedBreakDownAsDistance = {
  oneBreak?: number;
  twoBreak?: number;
  threeBreak?: number;
  fourBreak?: number;
  fiveBreak?: number;
  sixBreak?: number;
  sevenBreak?: number;
  otherBreak?: number;
};

export type TAircraftCategoryGetAllParamType = {} & TPaginationCommonType;

export type TAircraftCategoryChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TCustomPriceShowConfig = {
  show?: boolean;
  value?: string;
};

export type TEachAircraftCategory = {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  tierOne?: number;
  tierTwo?: number;
  tierThree?: number;
  typicalSpeed?: number;
  runningSpeed?: number;
  seat?: string;
  maximumSeatingCapacity?: number;
  minimumFlightHour?: number;
  hourlyRunningSpeed?: THourlyRunningSpeed;
  speedBreakDownAsDistance?: TSpeedBreakDownAsDistance;
  range?: string;
  baggageCapacity?: string;
  maxRange?: number;
  routeRatio?: number;
  pricingGrafShow?: boolean;
  oneWayCustomPriceShow?: TCustomPriceShowConfig;
  roundTripCustomPriceShow?: TCustomPriceShowConfig;
  multiLegCustomPriceShow?: TCustomPriceShowConfig;
  featureImage?: string;
  featureImageSize?: number;
};

//  Below Aircraft

export type TAircraftGetAllParamType = {
  categoryId?: string;
  isFeatured?: Boolean;
  isDeleted?: boolean;
} & TPaginationCommonType;

export type TAircraftChangeStatusParamType = {
  id: string;
  status: TStatusChangeType;
};

export type TYomRange = {
  start: string;
  end: string;
};

export type TCabinDimensions = {
  length: number;
  width: number;
  height: number;
};

export type TCabinPressure = {
  min: number;
  max: number;
};

export type TCharterRatePerHr = {
  min: number;
  max: number;
};

export type TEachAircraft = {
  _id: string;
  name: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  featureImage: string;
  featureImageSize: number;
  salesFeatureImage?: string;
  salesFeatureImageSize?: number;
  manufacturer: string;
  range: number;
  cruiseSpeed: number;
  baggageCapacity: number;
  climbRate: number;
  isFeatured: boolean;
  status: string;
  createdAt: string;
  category: TEachAircraftCategory;

  description: string;
  bannerImage: string;
  bannerImageTag?: string;
  thumbnailImageTag?: string;
  categoryId: string;
  yomRange: TYomRange;
  maxPassengers: string;
  cabinDimensions: TCabinDimensions;
  cabinPressure?: TCabinPressure;
  cabinPressureAltitude: string;
  cabinNoise: number;
  takeoffDistance: number;
  landingDistance: number;
  serviceCeiling: number;
  charterRatePerHr: TCharterRatePerHr;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalTag: string;
  structuredData: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  metaRobotsIndex?: string;
  metaRobotsFollow?: string;
  isDeleted: boolean;
  updatedAt: string;
  slidingImages?: string[];
  slidingImagesSize?: number[];
  slidingImagesData?: TSlidingImageData[];
  isBookable: boolean;
  redirectUrl?: string;
  bannerImageSize?: number;
  thumbnailImageSize?: number;
  openGraphImageSize?: number | string;
  isShowUpdatedAt?: boolean;
};

export type TSlidingImageData = {
  _id?: string;
  image: string;
  size?: number;
  tag?: string;
};

export type TSlidingImageFormItem = {
  id?: string;
  image: File | string;
  size: number;
  tag: string;
  _id?: string;
  previewUrl?: string;
};
