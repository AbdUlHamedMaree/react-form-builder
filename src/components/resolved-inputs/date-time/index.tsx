import { useController } from 'react-hook-form';
import type { DateTimePickerProps } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useMemo, memo, forwardRef } from 'react';

import { exposeMessage } from '$utils/expose-message';
import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import type { LoadingTextFieldProps } from '$components/loading-text-field';
import { LoadingTextField } from '$components/loading-text-field';

export type ResolvedDateTimeInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
  dateTimePickerProps?: Partial<DateTimePickerProps<string, Date>>;
}>;

export const ResolvedDateTimeInput = memo(
  forwardRef<HTMLDivElement, ResolvedDateTimeInputProps>(function ResolvedDateTimeInput(
    {
      useControllerProps,
      label,
      componentsProps: { dateTimePickerProps, loadingTextFieldProps },
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
      () => mergeRefs(ref, dateTimePickerProps?.inputRef),
      [dateTimePickerProps?.inputRef, ref]
    );
    const handleChange = useMemo(
      () => mergeFunctions(onChange, dateTimePickerProps?.onChange),
      [dateTimePickerProps?.onChange, onChange]
    );
    const handleBlur = useMemo(
      () => mergeFunctions(onBlur, loadingTextFieldProps?.onBlur),
      [loadingTextFieldProps?.onBlur, onBlur]
    );

    return (
      <DateTimePicker
        {...dateTimePickerProps}
        ref={forwardedRef}
        value={value}
        label={label}
        inputRef={inputRef}
        onChange={handleChange}
        renderInput={params => (
          <LoadingTextField
            {...loadingTextFieldProps}
            {...params}
            InputProps={{
              ...loadingTextFieldProps?.InputProps,
              ...params?.InputProps,
              endAdornment: (
                <>
                  {loadingTextFieldProps?.InputProps?.endAdornment}
                  {params?.InputProps?.endAdornment}
                </>
              ),
              startAdornment: (
                <>
                  {loadingTextFieldProps?.InputProps?.startAdornment}
                  {params?.InputProps?.startAdornment}
                </>
              ),
            }}
            name={name}
            onBlur={handleBlur}
            error={showError}
            label={label}
            helperText={showError ? errorMessage : undefined}
          />
        )}
      />
    );
  })
);
