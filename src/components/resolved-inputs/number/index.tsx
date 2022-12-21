import { useController } from 'react-hook-form';
import { useMemo, memo, forwardRef } from 'react';

import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';
import type { LoadingTextFieldProps } from '$components/loading-text-field';
import { LoadingTextField } from '$components/loading-text-field';

export type ResolvedNumberInputProps = ResolvedInputProps<{
  loadingTextFieldProps?: LoadingTextFieldProps;
}>;

export const ResolvedNumberInput = memo(
  forwardRef<HTMLDivElement, ResolvedNumberInputProps>(function ResolvedNumberInput(
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
      () => mergeRefs(ref, loadingTextFieldProps?.inputRef),
      [ref, loadingTextFieldProps?.inputRef]
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
        name={name}
        value={value}
        label={label}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError}
        helperText={showError ? errorMessage : undefined}
        type='number'
      />
    );
  })
);
