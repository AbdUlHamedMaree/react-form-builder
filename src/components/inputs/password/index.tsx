import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedPasswordInputProps } from '$components/resolved-inputs';
import { ResolvedPasswordInput } from '$components/resolved-inputs/password';

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
