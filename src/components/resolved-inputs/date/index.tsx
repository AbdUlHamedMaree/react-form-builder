import { useController } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/lab';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { LoadingTextField, LoadingTextFieldProps } from '../../loading-text-field';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

export type ResolvedDateInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
  datePickerProps?: Partial<DatePickerProps<Date>>;
}>;

export const ResolvedDateInput = React.memo(
  React.forwardRef<HTMLDivElement, ResolvedDateInputProps>(function ResolvedDateInput(
    {
      useControllerProps,
      label,
      componentsProps: { datePickerProps, loadingTextFieldProps },
    },
    forwardRef
  ) {
    const {
      field: { name, onBlur, onChange, ref, value },
      fieldState: { invalid, error },
    } = useController(useControllerProps);

    return (
      <DatePicker
        {...datePickerProps}
        ref={forwardRef}
        value={value}
        inputRef={mergeRefs(ref, datePickerProps?.inputRef)}
        onChange={mergeFunctions(onChange, datePickerProps?.onChange)}
        label={label}
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
            label={label}
            onBlur={mergeFunctions(onBlur, loadingTextFieldProps?.onBlur)}
            error={invalid}
            helperText={
              error
                ? exposeMessage(error, name, typeof label === 'string' ? label : name)
                : undefined
            }
          />
        )}
      />
    );
  })
);
