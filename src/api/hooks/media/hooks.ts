'use client';

import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { MediaFileEnum } from './key';

import {
  mediaFileDeleteFn,
  mediaUploadMultipleFileFn,
  mediaUploadSingleFileFn,
} from '@/api/functions/media/index.api';
import { TEachMediaFile } from '@/types/apps/media/index.type';

const useMediaUploadSingleFile = ({
  valueGetter,
  errorGetter,
  optionalCallback,
  errorCallback,
}: {
  valueGetter?: (value: TEachMediaFile | null) => void;
  errorGetter?: (errorMessage: string) => void;
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MediaFileEnum.UploadSingleFile],
    mutationFn: mediaUploadSingleFileFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        const urls = res?.data?.data ?? null;
        if (valueGetter) {
          valueGetter(urls);
        }
      }
    },
    onError: (error) => {
      errorCallback();
      if (errorGetter) {
        errorGetter('Something went wrong while uploading!');
      }
    },
  });
};

const useMediaUploadMultipleFile = ({
  valueGetter,
  errorGetter,
  optionalCallback,
  errorCallback,
}: {
  valueGetter?: (value: TEachMediaFile[]) => void;
  errorGetter?: (errorMessage: string) => void;
  optionalCallback: () => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MediaFileEnum.UploadMultipleFile],
    mutationFn: mediaUploadMultipleFileFn,
    onSuccess: async (res) => {
      if (res?.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback();

        const urls = res?.data?.data ?? [];
        if (valueGetter) {
          valueGetter(urls);
        }
      }
    },
    onError: (error) => {
      errorCallback();
      if (errorGetter) {
        errorGetter('Something went wrong while uploading!');
      }
    },
  });
};

const useMediaFileDelete = ({
  optionalCallback,
  errorCallback,
}: {
  optionalCallback: (value: boolean) => void;
  errorCallback: () => void;
}) => {
  return useMutation({
    mutationKey: [MediaFileEnum.DeleteFile],
    mutationFn: mediaFileDeleteFn,
    onSuccess: async (res) => {
      if (res.data.statusCode === HttpStatusCode.Ok) {
        optionalCallback(true);
      }
    },
    onError: (error) => {
      optionalCallback(false);
      errorCallback();
    },
  });
};

export { useMediaFileDelete, useMediaUploadMultipleFile, useMediaUploadSingleFile };
