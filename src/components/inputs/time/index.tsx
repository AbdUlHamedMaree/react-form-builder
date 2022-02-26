import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedTimeInput, ResolvedTimeInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type TimeInputProps = FinalInputProps<ResolvedTimeInputProps, 'timePickerProps'>;

export const TimeInput = React.memo(
  React.forwardRef<HTMLInputElement, TimeInputProps>(
    (
      { name, label, useControllerProps, loadingTextFieldProps, ...timePickerProps },
      ref
    ) => {
      const { control } = useFormContext();

      return (
        <ResolvedTimeInput
          ref={ref}
          useControllerProps={{ ...useControllerProps, name, control }}
          label={label ?? stringToLabel(name)}
          componentsProps={{ loadingTextFieldProps, timePickerProps }}
        />
      );
    }
  )
);
