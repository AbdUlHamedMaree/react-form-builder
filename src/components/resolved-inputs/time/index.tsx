import { useController } from 'react-hook-form';
import { TimePicker, TimePickerProps } from '@mui/lab';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { LoadingTextField, LoadingTextFieldProps } from '../../loading-text-field';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

export type ResolvedTimeInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
  timePickerProps?: TimePickerProps;
}>;

export const ResolvedTimeInput = React.memo(
  React.forwardRef<HTMLInputElement, ResolvedTimeInputProps>(
    (
      {
        useControllerProps,
        label,
        componentsProps: { loadingTextFieldProps, timePickerProps },
      },
      forwardRef
    ) => {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);

      return (
        <TimePicker
          {...timePickerProps}
          ref={forwardRef}
          inputRef={mergeRefs(ref, timePickerProps?.inputRef)}
          value={value}
          label={label}
          onChange={mergeFunctions(onChange, timePickerProps?.onChange)}
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
              helperText={
                error
                  ? exposeMessage(
                      error,
                      name,
                      typeof loadingTextFieldProps?.label === 'string'
                        ? loadingTextFieldProps.label
                        : name
                    )
                  : undefined
              }
            />
          )}
        />
      );
    }
  )
);
