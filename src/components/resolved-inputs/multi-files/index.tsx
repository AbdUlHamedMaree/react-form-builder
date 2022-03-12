/* eslint-disable react-hooks/rules-of-hooks */

import React, { useCallback, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import {
  Paper,
  Typography,
  FormHelperText,
  FormHelperTextProps,
  PaperProps,
  TypographyProps,
} from '@mui/material';
import { exposeMessage } from '../../../utils/expose-message';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { FilesDropzoneProps, FilesDropzone } from '../../images-dropzone';
import { FileWithPreview, ResolvedInputProps } from '../../../types';

export type ResolvedMultiFileInputProps = ResolvedInputProps<
  {
    paperProps?: PaperProps;
    typographyProps?: TypographyProps;
    filesDropzoneProps?: FilesDropzoneProps;
    formHelperTextProps?: FormHelperTextProps;
  },
  {
    onUpload: (files: File[]) => Promise<FileWithPreview[]> | FileWithPreview[];
  }
>;

export const ResolvedMultiFileInput = React.memo(
  React.forwardRef<HTMLInputElement, ResolvedMultiFileInputProps>(
    function ResolvedMultiFileInput(
      {
        useControllerProps,
        onUpload,
        label,
        componentsProps: {
          formHelperTextProps,
          filesDropzoneProps,
          paperProps,
          typographyProps,
        },
      },
      forwardRef
    ) {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);

      const [loading, setLoading] = useState(false);

      const [result, setResult] = useState((value ?? []) as FileWithPreview[]);

      useEffect(() => {
        onChange(result);
      }, [onChange, result]);

      const handleDrop = useCallback(
        async (newFiles: File[]) => {
          setLoading(true);
          const filesWithPrev = await onUpload(newFiles);
          setLoading(false);
          setResult(old => [...old, ...filesWithPrev]);
          onBlur();
        },
        [onBlur, onUpload]
      );

      const handleRemove = useCallback(
        (file: string) => {
          setResult(old => old.filter(el => el.preview !== file));
          onBlur();
        },
        [onBlur]
      );

      const handleRemoveAll = useCallback(() => {
        setResult([]);
        onBlur();
      }, [onBlur]);

      return (
        <Paper
          variant='outlined'
          {...paperProps}
          sx={{
            padding: t => t.spacing(2),
            backgroundColor: '#ffffff00',
            ...paperProps?.sx,
            borderColor: t =>
              !loading && invalid ? t.palette.error.main : t.palette.divider,
          }}
        >
          <Typography
            color='textSecondary'
            variant='subtitle2'
            {...typographyProps}
            sx={{
              mb: 2,
              ...typographyProps?.sx,
            }}
          >
            {label}
          </Typography>

          <FilesDropzone
            {...filesDropzoneProps}
            loading={loading}
            inputProps={{
              name,
              onBlur,
            }}
            files={result.map(el => el.preview)}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
            onDragLeave={mergeFunctions(onBlur, filesDropzoneProps?.onDragLeave)}
            onDropAccepted={mergeFunctions(onBlur, filesDropzoneProps?.onDropAccepted)}
            onDropRejected={mergeFunctions(onBlur, filesDropzoneProps?.onDropRejected)}
            onFileDialogCancel={mergeFunctions(
              onBlur,
              filesDropzoneProps?.onFileDialogCancel
            )}
            ref={mergeRefs(ref, forwardRef)}
          />
          {!loading && error && (
            <FormHelperText
              {...formHelperTextProps}
              error
              sx={{ mt: 2, ...formHelperTextProps?.sx }}
            >
              {exposeMessage(error, name, typeof label === 'string' ? label : name)}
            </FormHelperText>
          )}
        </Paper>
      );
    }
  )
);
