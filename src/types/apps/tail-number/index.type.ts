export type TTailNumberStatus = 'Draft' | 'Published';

export type TTailNumberGetAllParamType = {
  page: number;
  limit: number;
  search: string;
  aircraftId?: string;
  status?: TTailNumberStatus | '';
  isDeleted?: boolean;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
};

export type TTailNumberChangeStatusParamType = {
  id: string;
  status: TTailNumberStatus;
};

export type TTailNumberAircraftRef = {
  _id: string;
  title: string;
  name?: string;
  slug: string;
  status?: string;
};

export type TTailNumberGalleryImage = {
  image: string;
  tag?: string;
  size?: number;
};

export type TEachTailNumber = {
  _id: string;
  aircraftId: string;
  aircraft?: TTailNumberAircraftRef | null;
  tailNumber: string;
  slug: string;
  serialNumber?: string;
  yearOfManufacture?: number | null;
  seats?: number | null;
  homeBase?: string;
  seatsConfigured?: string;
  exterior?: string;
  baseCabinSource?: string;
  avionics?: string;
  airframeTotalTime?: string;
  exteriorRefurbYear?: number | null;
  interiorRefurbYear?: number | null;
  wifi?: boolean | null;
  notes?: string;
  engines?: string;
  registrationValidThrough?: string;
  heroImage?: string;
  heroImageTag?: string;
  heroImageSize?: number;
  galleryImages?: TTailNumberGalleryImage[];
  pageHeading?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  metaRobotsIndex?: string;
  metaRobotsFollow?: string;
  status: TTailNumberStatus;
  order?: number;
  isShowUpdatedAt?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
};
