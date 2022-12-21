import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedDateInputProps } from '$components/resolved-inputs';
import { ResolvedDateInput } from '$components/resolved-inputs/date';

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
