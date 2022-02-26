import { useController } from 'react-hook-form';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { LoadingTextField, LoadingTextFieldProps } from '../../loading-text-field';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

export type ResolvedNumberInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
}>;

export const ResolvedNumberInput = React.memo(
  React.forwardRef<HTMLDivElement, ResolvedNumberInputProps>(function ResolvedNumberInput(
    { useControllerProps, label, componentsProps: { loadingTextFieldProps } },
    forwardRef
  ) {
    const {
      field: { name, onBlur, onChange, ref, value },
      fieldState: { invalid, error },
    } = useController(useControllerProps);

    return (
      <LoadingTextField
        {...loadingTextFieldProps}
        ref={forwardRef}
        inputRef={mergeRefs(ref, loadingTextFieldProps?.inputRef)}
        value={value}
        label={label}
        onChange={mergeFunctions(onChange, loadingTextFieldProps?.onChange)}
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
        type='number'
      />
    );
  })
);
