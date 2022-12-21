/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useMemo, useState, memo, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import type { PaperProps, TypographyProps, FormHelperTextProps } from '@mui/material';
import { Paper, Typography, FormHelperText } from '@mui/material';

import type { FileWithPreview, ResolvedInputProps } from '$types';
import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import { exposeMessage } from '$utils/expose-message';
import type { FileDropzoneProps } from '$components/image-dropzone';
import { FileDropzone } from '$components/image-dropzone';

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

export const ResolvedFileInput = memo(
  forwardRef<HTMLInputElement, ResolvedFileInputProps>(function ResolvedFileInput(
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
    forwardedRef
  ) {
    const {
      field: { name, onBlur, onChange, ref, value },
      fieldState: { error, isTouched },
    } = useController(useControllerProps);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<FileWithPreview | undefined>(
      value as FileWithPreview
    );

    const showError = useMemo(
      () => !!(!loading && error && isTouched),
      [loading, error, isTouched]
    );
    const errorMessage = useMemo(
      () => exposeMessage(error, name, label),
      [error, label, name]
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

    const inputRef = useMemo(() => mergeRefs(ref, forwardedRef), [ref, forwardedRef]);
    const memoOnDrop = useMemo(
      () => mergeFunctions(handleDrop, fileDropzoneProps?.onDrop),
      [handleDrop, fileDropzoneProps?.onDrop]
    );
    const memoOnRemove = useMemo(
      () => mergeFunctions(handleRemove, fileDropzoneProps?.onRemove),
      [handleRemove, fileDropzoneProps?.onRemove]
    );
    const memoOnRemoveAll = useMemo(
      () => mergeFunctions(handleRemoveAll, fileDropzoneProps?.onRemoveAll),
      [handleRemoveAll, fileDropzoneProps?.onRemoveAll]
    );
    const memoOnDragLeave = useMemo(
      () => mergeFunctions(onBlur, fileDropzoneProps?.onDragLeave),
      [onBlur, fileDropzoneProps?.onDragLeave]
    );
    const memoOnDropAccepted = useMemo(
      () => mergeFunctions(onBlur, fileDropzoneProps?.onDropAccepted),
      [onBlur, fileDropzoneProps?.onDropAccepted]
    );
    const memoOnDropRejected = useMemo(
      () => mergeFunctions(onBlur, fileDropzoneProps?.onDropRejected),
      [onBlur, fileDropzoneProps?.onDropRejected]
    );
    const memoOnFileDialogCancel = useMemo(
      () => mergeFunctions(onBlur, fileDropzoneProps?.onFileDialogCancel),
      [onBlur, fileDropzoneProps?.onFileDialogCancel]
    );

    return (
      <Paper
        variant='outlined'
        {...paperProps}
        sx={{
          padding: t => t.spacing(2),
          backgroundColor: '#ffffff00',
          ...paperProps?.sx,
          borderColor: t => (showError ? t.palette.error.main : t.palette.divider),
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
          inputProps={{
            name,
            onBlur,
          }}
          file={result?.preview}
          ref={inputRef}
          onDrop={memoOnDrop}
          onRemove={memoOnRemove}
          onRemoveAll={memoOnRemoveAll}
          onDragLeave={memoOnDragLeave}
          onDropAccepted={memoOnDropAccepted}
          onDropRejected={memoOnDropRejected}
          onFileDialogCancel={memoOnFileDialogCancel}
        />
        {showError && (
          <FormHelperText
            {...formHelperTextProps}
            error
            sx={{ mt: 2, ...formHelperTextProps?.sx }}
          >
            {errorMessage}
          </FormHelperText>
        )}
      </Paper>
    );
  })
);
