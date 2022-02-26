/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import {
  Paper,
  Typography,
  FormHelperText,
  PaperProps,
  TypographyProps,
  FormHelperTextProps,
} from '@mui/material';

import { exposeMessage } from '../../../utils/expose-message';
import { FileWithPreview, ResolvedInputProps } from '../../../types';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { FileDropzone, FileDropzoneProps } from '../../image-dropzone';

export type ResolvedFileInputProps = ResolvedInputProps<
  {
    paperProps?: PaperProps;
    typographyProps?: TypographyProps;
    fileDropzoneProps?: FileDropzoneProps;
    formHelperTextProps?: FormHelperTextProps;
  },
  {
    onUpload: (file: File) => Promise<FileWithPreview> | FileWithPreview;
  }
>;

export const ResolvedFileInput = React.memo(
  React.forwardRef<HTMLInputElement, ResolvedFileInputProps>(function ResolvedFileInput(
    {
      useControllerProps,
      onUpload,
      label,
      componentsProps: {
        formHelperTextProps,
        fileDropzoneProps,
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

    const [result, setResult] = useState<FileWithPreview | undefined>(
      value as FileWithPreview
    );

    useEffect(() => {
      onChange(result);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    const handleDrop = useCallback(
      async (newFiles: File[]) => {
        setLoading(true);
        const res = await onUpload(newFiles[0]);
        setLoading(false);
        setResult(res);
        onBlur();
      },
      [onBlur, onUpload]
    );

    const handleRemove = useCallback(() => {
      setResult(undefined);
      onBlur();
    }, [onBlur]);

    const handleRemoveAll = useCallback(() => {
      setResult(undefined);
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

        <FileDropzone
          {...fileDropzoneProps}
          loading={loading}
          maxFiles={1}
          file={result?.preview}
          ref={mergeRefs(ref, forwardRef)}
          onDrop={mergeFunctions(handleDrop, fileDropzoneProps?.onDrop)}
          onRemove={mergeFunctions(handleRemove, fileDropzoneProps?.onRemove)}
          onRemoveAll={mergeFunctions(handleRemoveAll, fileDropzoneProps?.onRemoveAll)}
          onDragLeave={mergeFunctions(onBlur, fileDropzoneProps?.onDragLeave)}
          onDropAccepted={mergeFunctions(onBlur, fileDropzoneProps?.onDropAccepted)}
          onDropRejected={mergeFunctions(onBlur, fileDropzoneProps?.onDropRejected)}
          onFileDialogCancel={mergeFunctions(
            onBlur,
            fileDropzoneProps?.onFileDialogCancel
          )}
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
  })
);
