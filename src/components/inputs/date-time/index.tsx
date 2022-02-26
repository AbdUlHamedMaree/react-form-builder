import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedDateTimeInput, ResolvedDateTimeInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type DateTimeInputProps = FinalInputProps<
  ResolvedDateTimeInputProps,
  'dateTimePickerProps'
>;

export const DateTimeInput = React.memo(
  React.forwardRef<HTMLInputElement, DateTimeInputProps>(function DateTimeInput(
    { name, label, useControllerProps, loadingTextFieldProps, ...dateTimePickerProps },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedDateTimeInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        componentsProps={{
          loadingTextFieldProps,
          dateTimePickerProps,
        }}
      />
    );
  })
);
