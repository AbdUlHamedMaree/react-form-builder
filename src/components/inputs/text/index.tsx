import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedTextInputProps } from '$components/resolved-inputs';
import { ResolvedTextInput } from '$components/resolved-inputs/text';

export type TextInputProps = FinalInputProps<
  ResolvedTextInputProps,
  'loadingTextFieldProps'
>;

export const TextInput = React.memo(
  React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
    { name, label, useControllerProps, ...loadingTextFieldProps },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedTextInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        componentsProps={{ loadingTextFieldProps }}
      />
    );
  })
);
