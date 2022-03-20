import { useController } from 'react-hook-form';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { LoadingTextField, LoadingTextFieldProps } from '../../loading-text-field';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';
import { PasswordField } from '../../password-field';

export type ResolvedPasswordInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
}>;

export const ResolvedPasswordInput = React.memo(
  React.forwardRef<HTMLDivElement, ResolvedPasswordInputProps>(
    function ResolvedPasswordInput(
      { useControllerProps, label, componentsProps: { loadingTextFieldProps } },
      forwardRef
    ) {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);

      return (
        <PasswordField
          {...loadingTextFieldProps}
          name={name}
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
        />
      );
    }
  )
);
