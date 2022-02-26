import { useController } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '@mui/lab';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { LoadingTextField, LoadingTextFieldProps } from '../../loading-text-field';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

export type ResolvedDateTimeInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
  dateTimePickerProps?: Partial<DateTimePickerProps<Date>>;
}>;

export const ResolvedDateTimeInput = React.memo(
  React.forwardRef<HTMLDivElement, ResolvedDateTimeInputProps>(
    function ResolvedDateTimeInput(
      {
        useControllerProps,
        label,
        componentsProps: { dateTimePickerProps, loadingTextFieldProps },
      },
      forwardRef
    ) {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);

      return (
        <DateTimePicker
          {...dateTimePickerProps}
          ref={forwardRef}
          value={value}
          label={label}
          inputRef={mergeRefs(ref, dateTimePickerProps?.inputRef)}
          onChange={mergeFunctions(onChange, dateTimePickerProps?.onChange)}
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
              onBlur={mergeFunctions(onBlur, loadingTextFieldProps?.onBlur)}
              error={invalid}
              label={label}
              helperText={
                error
                  ? exposeMessage(error, name, typeof label === 'string' ? label : name)
                  : undefined
              }
            />
          )}
        />
      );
    }
  )
);
