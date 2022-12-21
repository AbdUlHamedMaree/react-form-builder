/* eslint-disable @typescript-eslint/unbound-method */
import type { FormHelperTextProps, PaperProps, TypographyProps } from '@mui/material';
import { FormHelperText, Paper, Typography } from '@mui/material';
import { useController } from 'react-hook-form';
import { useMemo, memo, forwardRef } from 'react';

import type QuillClass from 'react-quill';
import type { ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';
import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { QuillEditorProps } from '$components/quill-editor';
import { QuillEditor } from '$components/quill-editor';

export type ResolvedQuillEditorInputProps = ResolvedInputProps<{
  quillEditorProps?: QuillEditorProps;
  paperProps?: PaperProps;
  typographyProps?: TypographyProps;
  formHelperTextProps?: FormHelperTextProps;
}>;

export const ResolvedQuillEditorInput = memo(
  forwardRef<QuillClass, ResolvedQuillEditorInputProps>(function ResolvedQuillEditorInput(
    {
      useControllerProps,
      componentsProps: {
        quillEditorProps,
        formHelperTextProps,
        paperProps,
        typographyProps,
      },
      label,
    },
    forwardedRef
  ) {
    if (!QuillEditor)
      throw new Error(
        `You need to install 'quill' and 'react-quill' packages for this component to work`
      );
    const {
      field: { name, onBlur, onChange, ref, value },
      fieldState: { error, isTouched },
    } = useController(useControllerProps);

    const showError = useMemo(() => !!(error && isTouched), [error, isTouched]);
    const errorMessage = useMemo(
      () => exposeMessage(error, name, label),
      [error, label, name]
    );

    const inputRef = useMemo(() => mergeRefs(ref, forwardedRef), [ref, forwardedRef]);
    const handleChange = useMemo(
      () => mergeFunctions(content => onChange(content), quillEditorProps?.onChange),
      [onChange, quillEditorProps?.onChange]
    );
    const handleBlur = useMemo(
      () => mergeFunctions(onBlur, quillEditorProps?.onBlur),
      [onBlur, quillEditorProps?.onBlur]
    );

    return (
      <Paper
        variant='outlined'
        {...paperProps}
        sx={{
          padding: t => t.spacing(2),
          ...paperProps?.sx,
          borderColor: t => (showError ? t.palette.error.main : t.palette.divider),
        }}
      >
        <Typography
          variant='subtitle2'
          {...typographyProps}
          sx={{
            mb: 2,
            ...typographyProps?.sx,
            color: showError ? 'error.main' : 'text.secondary',
          }}
        >
          {label}
        </Typography>

        <QuillEditor
          {...quillEditorProps}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          sx={{
            minHeight: 400,
            borderRadius: t => t.shape.borderRadius,
            ...quillEditorProps?.sx,
            borderColor: t => (showError ? t.palette.error.main : t.palette.divider),
          }}
        />
        {showError && (
          <FormHelperText
            error
            {...formHelperTextProps}
            sx={{ mt: 2, ...formHelperTextProps?.sx }}
          >
            {errorMessage}
          </FormHelperText>
        )}
      </Paper>
    );
  })
);
