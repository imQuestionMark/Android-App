import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

export const MimeTypes = {
  PDF: ['application/pdf'],
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/pdf',
    'text/plain',
  ],
  SPREADSHEETS: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  ],
  ALL: ['*/*'],
} as const;

type MimeTypeKey = keyof typeof MimeTypes;

type CustomPickerOptions = {
  allowedTypes?: MimeTypeKey | string[];
  copyToCacheDirectory?: boolean;
  maxSizeInMB?: number;
  multiple?: boolean;
};

type DocumentPickerError = {
  message: string;
  type: 'pick-error' | 'size-error';
};

export const useDocumentPicker = () => {
  const [error, setError] = useState<DocumentPickerError | null>(null);
  const [selectedFiles, setSelectedFiles] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);

  const pickDocument = async ({
    maxSizeInMB = 5,
    allowedTypes = 'PDF',
    copyToCacheDirectory = false,
    multiple = false,
  }: CustomPickerOptions) => {
    try {
      const resolvedTypes = (
        Array.isArray(allowedTypes)
          ? allowedTypes
          : MimeTypes[allowedTypes as MimeTypeKey] || ['application/pdf']
      ) as string[];

      const result = await DocumentPicker.getDocumentAsync({
        type: resolvedTypes,
        multiple,
        copyToCacheDirectory,
      });

      if (result.canceled) {
        return null;
      }

      if (result.assets) {
        const invalidFiles = result.assets.filter(
          (file) => file.size && file.size > maxSizeInMB * 1024 * 1024
        );

        if (invalidFiles.length > 0) {
          setError({
            message: `${invalidFiles.length} file(s) exceed the ${maxSizeInMB}MB size limit`,
            type: 'size-error',
          });
          return null;
        }

        setSelectedFiles(result);
        return result;
      }

      return null;
    } catch (err) {
      setError({ message: 'Error picking document', type: 'pick-error' });
      console.error(err);
      return null;
    }
  };

  const resetSelection = () => {
    setSelectedFiles(null);
    setError(null);
  };

  return {
    pickDocument,
    selectedFiles,
    error,
    resetSelection,
  };
};
