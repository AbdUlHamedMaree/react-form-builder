import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  TypographyProps,
} from '@mui/material';
import { useController } from 'react-hook-form';
import React, { forwardRef } from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

export type ResolvedCheckBoxInputProps = ResolvedInputProps<{
  formControlProps?: FormControlProps;
  formControlLabelProps?: FormControlLabelProps;
  checkboxProps?: CheckboxProps;
  typographyProps?: TypographyProps;
  formHelperTextProps?: FormHelperTextProps;
}>;

export const ResolvedCheckBoxInput = React.memo(
  forwardRef<HTMLButtonElement, ResolvedCheckBoxInputProps>(
    function ResolvedCheckBoxInput(
      {
        useControllerProps,
        label,
        componentsProps: {
          checkboxProps,
          formControlLabelProps,
          formControlProps,
          formHelperTextProps,
        },
      },
      forwardedRef
    ) {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);

      return (
        <FormControl {...formControlProps} error={invalid}>
          <FormControlLabel
            {...formControlLabelProps}
            control={
              <Checkbox
                {...checkboxProps}
                ref={forwardedRef}
                checked={value}
                value={value}
                inputRef={mergeRefs(ref, checkboxProps?.inputRef)}
                onChange={mergeFunctions(onChange, checkboxProps?.onChange)}
                onBlur={mergeFunctions(onBlur, checkboxProps?.onBlur)}
              />
            }
            // eslint-disable-next-line react/jsx-no-useless-fragment
            label={<>{label}</>}
          />
          {error && (
            <FormHelperText {...formHelperTextProps}>
              {exposeMessage(
                error,
                name,
                typeof formControlLabelProps?.label === 'string'
                  ? formControlLabelProps.label
                  : name
              )}
            </FormHelperText>
          )}
        </FormControl>
      );
    }
  )
);
