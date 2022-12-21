import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedDateTimeInputProps } from '$components/resolved-inputs';
import { ResolvedDateTimeInput } from '$components/resolved-inputs/date-time';

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
