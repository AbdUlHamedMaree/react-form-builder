import React from 'react';
import { useController } from 'react-hook-form';

import { mergeRefs, mergeFunctions } from '../../../utils';
import { exposeMessage } from '../../../utils/expose-message';
import { LoadingTextField, LoadingTextFieldProps } from '../../loading-text-field';
import { ResolvedInputProps } from '../../../types';

export type ResolvedTextInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
}>;

export const ResolvedTextInput = React.memo(
  React.forwardRef<HTMLDivElement, ResolvedTextInputProps>(function ResolvedTextInput(
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
        inputRef={mergeRefs(loadingTextFieldProps?.inputRef, ref)}
        value={value}
        name={name}
        onChange={mergeFunctions(onChange, loadingTextFieldProps?.onChange)}
        onBlur={mergeFunctions(onBlur, loadingTextFieldProps?.onBlur)}
        label={label}
        error={invalid}
        helperText={
          error
            ? exposeMessage(error, name, typeof label === 'string' ? label : name)
            : undefined
        }
      />
    );
  })
);
