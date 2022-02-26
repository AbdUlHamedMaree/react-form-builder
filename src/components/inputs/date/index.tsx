import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedDateInput, ResolvedDateInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type DateInputProps = FinalInputProps<ResolvedDateInputProps, 'datePickerProps'>;

export const DateInput = React.memo(
  React.forwardRef<HTMLDivElement, DateInputProps>(function DateInput(
    { name, label, useControllerProps, loadingTextFieldProps, ...datePickerProps },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedDateInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        componentsProps={{
          loadingTextFieldProps,
          datePickerProps,
        }}
      />
    );
  })
);
