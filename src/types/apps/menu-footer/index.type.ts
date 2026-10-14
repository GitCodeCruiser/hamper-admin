export type TMenuFooterItemChild = {
  title: string;
  url: string;
  isSource?: boolean;
};

export type TMenuItem = {
  title: string;
  url: string;
  isSource?: boolean;
  children: TMenuFooterItemChild[];
};

export type TFooterItem = {
  label: string;
  children: TMenuFooterItemChild[];
};

export type TMenuFooterSetting = {
  _id?: string;
  menu: TMenuItem[];
  footer: TFooterItem[];
  createdAt?: string;
  updatedAt?: string;
};

export type TMenuFooterUpdateParamType = {
  menu: TMenuItem[];
  footer: TFooterItem[];
};
