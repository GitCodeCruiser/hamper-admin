export type TCommonSchema = {
  BaseApiResponse: {
    statusCode: number;
    success: boolean;
    message: string;
  };
  BaseApiErrorResponse: {
    statusCode: number;
    message: string;
    error: string;
  };
  BaseApiPaginationPayload: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    // sortField: string;
    sortOrder: string;
    role?: string;
    projectId?: string;
    folderId?: string;
    parentId?: string;
  };
  BaseMetaResponse: {
    totalDocs: number;
    skip: number;
    page: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
    totalPages: number;
  };
};

export interface CustomIconProps {
  IconColor?: string;
  IconWidth?: string;
  IconHeight?: string;
}
