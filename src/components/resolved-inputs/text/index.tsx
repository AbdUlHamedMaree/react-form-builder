import React, { useMemo, memo, forwardRef } from 'react';
import { useController } from 'react-hook-form';

import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';
import type { LoadingTextFieldProps } from '$components/loading-text-field';
import { LoadingTextField } from '$components/loading-text-field';

export type ResolvedTextInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
}>;

export const ResolvedTextInput = memo(
  forwardRef<HTMLDivElement, ResolvedTextInputProps>(function ResolvedTextInput(
    { useControllerProps, label, componentsProps: { loadingTextFieldProps } },
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
      () => mergeRefs(loadingTextFieldProps?.inputRef, ref),
      [loadingTextFieldProps?.inputRef, ref]
    );
    const handleChange = useMemo(
      () => mergeFunctions(onChange, loadingTextFieldProps?.onChange),
      [onChange, loadingTextFieldProps?.onChange]
    );
    const handleBlur = useMemo(
      () => mergeFunctions(onBlur, loadingTextFieldProps?.onBlur),
      [onBlur, loadingTextFieldProps?.onBlur]
    );

    return (
      <LoadingTextField
        {...loadingTextFieldProps}
        ref={forwardedRef}
        inputRef={inputRef}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        label={label}
        error={showError}
        helperText={showError ? errorMessage : undefined}
      />
    );
  })
);
