import { useController } from 'react-hook-form';
import type { MenuItemProps } from '@mui/material';
import { MenuItem } from '@mui/material';
import React, { useMemo, memo, forwardRef } from 'react';

import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';
import type { LoadingTextFieldProps } from '$components/loading-text-field';
import { LoadingTextField } from '$components/loading-text-field';

export type ResolvedSelectInputProps = ResolvedInputProps<
  {
    loadingTextFieldProps?: LoadingTextFieldProps & { emptyItemLabel?: React.ReactNode };
    menuItemProps?: MenuItemProps;
  },
  {
    items: Record<string | number, React.ReactNode>;
  }
>;

export const ResolvedSelectInput = memo(
  forwardRef<HTMLDivElement, ResolvedSelectInputProps>(function ResolvedSelectInput(
    {
      useControllerProps,
      items,
      label,
      componentsProps: { loadingTextFieldProps, menuItemProps },
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

    const menuItems = useMemo(
      () =>
        Object.entries(items).map(([k, v]) => (
          <MenuItem {...menuItemProps} key={k} value={k}>
            {v}
          </MenuItem>
        )),
      [items, menuItemProps]
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
        name={name}
        value={value}
        label={label}
        inputRef={inputRef}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError}
        helperText={showError ? errorMessage : undefined}
        select
      >
        <MenuItem value=''>
          <em>
            <b>{loadingTextFieldProps?.emptyItemLabel ?? '-----'}</b>
          </em>
        </MenuItem>
        {menuItems}
      </LoadingTextField>
    );
  })
);
