import {
  FormHelperText,
  FormHelperTextProps,
  Paper,
  PaperProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { useController } from 'react-hook-form';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { QuillEditor, QuillEditorClassType, QuillEditorProps } from '../../quill-editor';
import { mergeRefs } from '../../../utils/merge-refs';
import { mergeFunctions } from '../../../utils/merge-functions';
import { ResolvedInputProps } from '../../../types';

export type ResolvedQuillEditorInputProps = ResolvedInputProps<{
  quillEditorProps?: QuillEditorProps;
  paperProps?: PaperProps;
  typographyProps?: TypographyProps;
  formHelperTextProps?: FormHelperTextProps;
}>;

export const ResolvedQuillEditorInput = React.memo(
  React.forwardRef<QuillEditorClassType, ResolvedQuillEditorInputProps>(
    function ResolvedQuillEditorInput(
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
      forwardRef
    ) {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);

      console.log({ value });

      return (
        <Paper
          variant='outlined'
          {...paperProps}
          sx={{
            padding: t => t.spacing(2),
            ...paperProps?.sx,
            borderColor: t => (invalid ? t.palette.error.main : t.palette.divider),
          }}
        >
          <Typography
            variant='subtitle2'
            {...typographyProps}
            sx={{
              mb: 2,
              ...typographyProps?.sx,
              color: invalid ? 'error.main' : 'text.secondary',
            }}
          >
            {label}
          </Typography>

          <QuillEditor
            {...quillEditorProps}
            sx={{
              minHeight: 400,
              borderRadius: t => t.shape.borderRadius,
              ...quillEditorProps?.sx,
              borderColor: t => (invalid ? t.palette.error.main : t.palette.divider),
            }}
            value={value ?? ''}
            onChange={mergeFunctions(
              content => onChange(content),
              quillEditorProps?.onChange
            )}
            onBlur={mergeFunctions(onBlur, quillEditorProps?.onBlur)}
            ref={mergeRefs(ref, forwardRef)}
          />
          {error && (
            <FormHelperText
              error
              {...formHelperTextProps}
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
