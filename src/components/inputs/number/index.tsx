import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedNumberInputProps } from '$components/resolved-inputs';
import { ResolvedNumberInput } from '$components/resolved-inputs/number';

export type NumberInputProps = FinalInputProps<
  ResolvedNumberInputProps,
  'loadingTextFieldProps'
>;

export const NumberInput = React.memo(
  React.forwardRef<HTMLInputElement, NumberInputProps>(
    ({ name, label, useControllerProps, ...loadingTextFieldProps }, ref) => {
      const { control } = useFormContext();

      return (
        <ResolvedNumberInput
          ref={ref}
          useControllerProps={{ ...useControllerProps, name, control }}
          label={label ?? stringToLabel(name)}
          componentsProps={{ loadingTextFieldProps }}
        />
      );
    }
  )
);
