import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedTextInput, ResolvedTextInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

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
