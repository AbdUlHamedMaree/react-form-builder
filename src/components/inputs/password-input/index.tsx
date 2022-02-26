import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedPasswordInput, ResolvedPasswordInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type PasswordInputProps = FinalInputProps<
  ResolvedPasswordInputProps,
  'loadingTextFieldProps'
>;
export const PasswordInput = React.memo(
  React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ name, label, useControllerProps, ...loadingTextFieldProps }, ref) => {
      const { control } = useFormContext();

      return (
        <ResolvedPasswordInput
          ref={ref}
          useControllerProps={{ ...useControllerProps, name, control }}
          label={label ?? stringToLabel(name)}
          componentsProps={{ loadingTextFieldProps }}
        />
      );
    }
  )
);
