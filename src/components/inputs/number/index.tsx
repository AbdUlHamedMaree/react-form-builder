import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedNumberInput, ResolvedNumberInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

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
