/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback, useEffect, useMemo, useState, memo, forwardRef } from 'react';
import { useController } from 'react-hook-form';
import type { FormHelperTextProps, PaperProps, TypographyProps } from '@mui/material';
import { Paper, Typography, FormHelperText } from '@mui/material';
import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { FileWithPreview, ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';
import type { FilesDropzoneProps } from '$components/images-dropzone';
import { FilesDropzone } from '$components/images-dropzone';

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

export const ResolvedMultiFileInput = memo(
  forwardRef<HTMLInputElement, ResolvedMultiFileInputProps>(
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
      forwardedRef
    ) {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { error, isTouched },
      } = useController(useControllerProps);

      const [loading, setLoading] = useState(false);
      const [result, setResult] = useState((value ?? []) as FileWithPreview[]);

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

      const inputRef = useMemo(() => mergeRefs(ref, forwardedRef), [ref, forwardedRef]);
      const memoOnDrop = useMemo(
        () => mergeFunctions(handleDrop, filesDropzoneProps?.onDrop),
        [handleDrop, filesDropzoneProps?.onDrop]
      );
      const memoOnRemove = useMemo(
        () => mergeFunctions(handleRemove, filesDropzoneProps?.onRemove),
        [handleRemove, filesDropzoneProps?.onRemove]
      );
      const memoOnRemoveAll = useMemo(
        () => mergeFunctions(handleRemoveAll, filesDropzoneProps?.onRemoveAll),
        [handleRemoveAll, filesDropzoneProps?.onRemoveAll]
      );
      const memoOnDragLeave = useMemo(
        () => mergeFunctions(onBlur, filesDropzoneProps?.onDragLeave),
        [onBlur, filesDropzoneProps?.onDragLeave]
      );
      const memoOnDropAccepted = useMemo(
        () => mergeFunctions(onBlur, filesDropzoneProps?.onDropAccepted),
        [onBlur, filesDropzoneProps?.onDropAccepted]
      );
      const memoOnDropRejected = useMemo(
        () => mergeFunctions(onBlur, filesDropzoneProps?.onDropRejected),
        [onBlur, filesDropzoneProps?.onDropRejected]
      );
      const memoOnFileDialogCancel = useMemo(
        () => mergeFunctions(onBlur, filesDropzoneProps?.onFileDialogCancel),
        [onBlur, filesDropzoneProps?.onFileDialogCancel]
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

          <FilesDropzone
            {...filesDropzoneProps}
            ref={inputRef}
            loading={loading}
            inputProps={{
              name,
              onBlur,
            }}
            files={result.map(el => el.preview)}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
    }
  )
);
