import { BaseApiResponse } from '../../common.interface';

import { TEachCmsSectionContent } from '@/types/apps/cms/sectionContent/index.type';

export interface ICmsSectionContentListingResponse extends BaseApiResponse {
  data: TEachCmsSectionContent[];
}

export interface ICmsSectionContentGetResponse extends BaseApiResponse {
  data: TEachCmsSectionContent;
}

export interface ICmsSectionContentCreateResponse extends BaseApiResponse {
  data: TEachCmsSectionContent;
}

export interface ICmsSectionContentUpdateResponse extends BaseApiResponse {
  data: TEachCmsSectionContent;
}

export interface ICmsSectionContentDeleteResponse extends BaseApiResponse {
  data: TEachCmsSectionContent;
}
