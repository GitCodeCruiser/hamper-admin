import { HttpStatusCode } from 'axios';

export type StatusCodes = `${Extract<HttpStatusCode, number>}` extends `${infer N extends number}`
  ? N
  : never;

export interface BaseApiResponse {
  message: string;
  status: StatusCodes;
  type: string;
  token: string;
  statusCode: number;
}

export interface BaseApiMetaResponse {
  status: StatusCodes;
  statusCode: number;
  message: string;
  totalDocs: number;
  skip: number;
  page: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: any;
  nextPage: any;
  totalPages: number;
}
