import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import {
  IMediaDeleteFileResponse,
  IMediaUploadMultipleFileResponse,
  IMediaUploadSingleFileResponse,
} from '@/types/interface/media/index.interface';

export const mediaUploadSingleFileFn = async (body: FormData) => {
  const res = await axiosInstance.post<IMediaUploadSingleFileResponse>(
    endpoints.media.uploadSingleFile('v1'),
    body,
  );

  return res;
};

export const mediaUploadMultipleFileFn = async (body: FormData) => {
  const res = await axiosInstance.post<IMediaUploadMultipleFileResponse>(
    endpoints.media.uploadMultipleFile('v1'),
    body,
  );

  return res;
};

export const mediaFileDeleteFn = async (body: { key: string }) => {
  const res = await axiosInstance.post<IMediaDeleteFileResponse>(
    endpoints.media.deleteFile('v1'),
    body,
  );

  return res;
};

// export const mediaFileDeleteFn = async (id: string) => {
//   const res = await axiosInstance.get<IMediaDeleteFileResponse>(
//     `${endpoints.media.deleteFile('v1')}/${id}`,
//   );

//   return res;
// };
