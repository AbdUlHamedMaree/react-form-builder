import { useController } from 'react-hook-form';
import { MenuItem, MenuItemProps } from '@mui/material';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { LoadingTextField, LoadingTextFieldProps } from '../../loading-text-field';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

export type ResolvedSelectInputProps = ResolvedInputProps<
  {
    loadingTextFieldProps?: LoadingTextFieldProps;
    menuItemProps?: MenuItemProps;
  },
  {
    items: Record<string | number, React.ReactNode>;
  }
>;

export const ResolvedSelectInput = React.memo(
  React.forwardRef<HTMLDivElement, ResolvedSelectInputProps>(function ResolvedSelectInput(
    {
      useControllerProps,
      items,
      label,
      componentsProps: { loadingTextFieldProps, menuItemProps },
    },
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
        value={value}
        label={label}
        inputRef={mergeRefs(ref, loadingTextFieldProps?.inputRef)}
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
        select
      >
        <MenuItem value={undefined}>
          <em>
            <b>None</b>
          </em>
        </MenuItem>
        {Object.entries(items).map(([k, v]) => (
          <MenuItem {...menuItemProps} key={k} value={k}>
            {v}
          </MenuItem>
        ))}
      </LoadingTextField>
    );
  })
);
