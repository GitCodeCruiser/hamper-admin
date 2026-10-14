export type TLocationCountryListParamType = {
  search?: string;
};

export type TEachLocationCountry = {
  _id: string;
  name: string;
  slug: string;
  isoCode?: string;
  latitude?: string;
  longitude?: string;
};

export type TLocationStateListParamType = {
  search?: string;
  country: string;
};

export type TEachLocationState = {
  _id: string;
  name: string;
  slug: string;
  isoCode?: string;
  latitude?: string;
  longitude?: string;
};

export type TLocationCityListParamType = {
  search?: string;
  country: string;
  state?: string;
};

export type TEachLocationCity = {
  _id: string;
  name: string;
  slug: string;
  city?: string;
  stateCode?: string;
  latitude?: string;
  longitude?: string;
};
