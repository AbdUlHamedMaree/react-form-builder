import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedTimeInputProps } from '$components/resolved-inputs/time';
import { ResolvedTimeInput } from '$components/resolved-inputs/time';

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
