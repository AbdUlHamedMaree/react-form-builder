import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  ResolvedQuillEditorInput,
  ResolvedQuillEditorInputProps,
} from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { QuillEditorClassType } from '../../quill-editor';
import { FinalInputProps } from '../../../types';

export type HtmlInputProps = FinalInputProps<
  ResolvedQuillEditorInputProps,
  'quillEditorProps'
>;

export const QuillEditorInput = React.memo(
  React.forwardRef<QuillEditorClassType, HtmlInputProps>(function QuillEditorInput(
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
