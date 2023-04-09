import { useController } from 'react-hook-form';
import type { DatePickerProps } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { useMemo, memo, forwardRef } from 'react';

import { exposeMessage } from '$utils/expose-message';
import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import type { LoadingTextFieldProps } from '$components/loading-text-field';
import { LoadingTextField } from '$components/loading-text-field';

export type ResolvedDateInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
  datePickerProps?: Partial<DatePickerProps<Date>>;
}>;

export const ResolvedDateInput = memo(
  forwardRef<HTMLDivElement, ResolvedDateInputProps>(function ResolvedDateInput(
    {
      useControllerProps,
      label,
      componentsProps: { datePickerProps, loadingTextFieldProps },
    },
    forwardedRef
  ) {
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
      () => mergeRefs(ref, datePickerProps?.inputRef),
      [datePickerProps?.inputRef, ref]
    );
    const handleChange = useMemo(
      () => mergeFunctions(onChange, datePickerProps?.onChange),
      [datePickerProps?.onChange, onChange]
    );
    const handleBlur = useMemo(
      () => mergeFunctions(onBlur, loadingTextFieldProps?.onBlur),
      [loadingTextFieldProps?.onBlur, onBlur]
    );

    return (
      <DatePicker
        {...datePickerProps}
        ref={forwardedRef}
        value={value}
        inputRef={inputRef}
        onChange={handleChange}
        label={label}
        slots={{
          ...datePickerProps?.slots,
          textField: LoadingTextField,
        }}
        slotProps={{
          ...datePickerProps?.slotProps,
          textField: {
            ...datePickerProps?.slots?.textField,
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
  })
);
