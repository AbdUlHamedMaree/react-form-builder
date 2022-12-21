import React from 'react';
import { useFormContext } from 'react-hook-form';
import type QuillClass from 'react-quill';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedQuillEditorInputProps } from '$components/resolved-inputs';
import { ResolvedQuillEditorInput } from '$components/resolved-inputs/quill-editor';

export type HtmlInputProps = FinalInputProps<
  ResolvedQuillEditorInputProps,
  'quillEditorProps'
>;

export const QuillEditorInput = React.memo(
  React.forwardRef<QuillClass, HtmlInputProps>(function QuillEditorInput(
    {
      name,
      label,
      useControllerProps,

      paperProps,
      typographyProps,
      formHelperTextProps,
      ...quillEditorProps
    },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedQuillEditorInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        componentsProps={{
          paperProps,
          typographyProps,
          formHelperTextProps,
          quillEditorProps,
        }}
      />
    );
  })
);
