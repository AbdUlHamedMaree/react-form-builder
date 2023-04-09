import { useController } from 'react-hook-form';
import type { TimePickerProps } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers';
import React, { useMemo, memo, forwardRef } from 'react';

import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';
import type { LoadingTextFieldProps } from '$components/loading-text-field';
import { LoadingTextField } from '$components/loading-text-field';

export type ResolvedTimeInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
  timePickerProps?: TimePickerProps<Date>;
}>;

export const ResolvedTimeInput = memo(
  forwardRef<HTMLInputElement, ResolvedTimeInputProps>(
    (
      {
        useControllerProps,
        label,
        componentsProps: { loadingTextFieldProps, timePickerProps },
      },
      forwardedRef
    ) => {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { error, isTouched },
      } = useController(useControllerProps);

      const showError = useMemo(() => !!(error && isTouched), [error, isTouched]);
      const errorMessage = useMemo(
        () => exposeMessage(error, name, label),
        [error, label, name]
      );

      const inputRef = useMemo(
        () => mergeRefs(ref, timePickerProps?.inputRef),
        [ref, timePickerProps?.inputRef]
      );
      const handleChange = useMemo(
        () => mergeFunctions(onChange, timePickerProps?.onChange),
        [onChange, timePickerProps?.onChange]
      );
      const handleBlur = useMemo(
        () => mergeFunctions(onBlur, loadingTextFieldProps?.onBlur),
        [onBlur, loadingTextFieldProps?.onBlur]
      );

      return (
        <TimePicker
          {...timePickerProps}
          ref={forwardedRef}
          inputRef={inputRef}
          value={value}
          label={label}
          onChange={handleChange}
          slots={{
            ...timePickerProps?.slots,
            textField: LoadingTextField,
          }}
          slotProps={{
            ...timePickerProps?.slotProps,
            textField: {
              ...timePickerProps?.slots?.textField,
              ...loadingTextFieldProps,
              name,
              onBlur: handleBlur,
              error: showError,
              label,
              helperText: showError ? errorMessage : undefined,
            },
          }}
        />
      );
    }
  )
);
