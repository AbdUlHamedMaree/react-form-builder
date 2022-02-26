import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  Switch,
  SwitchProps,
} from '@mui/material';
import { useController } from 'react-hook-form';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

export type ResolvedSwitchInputProps = ResolvedInputProps<{
  formControlProps?: FormControlProps;
  formControlLabelProps?: FormControlLabelProps;
  switchProps?: SwitchProps;
}>;

export const ResolvedSwitchInput = React.memo(
  React.forwardRef<HTMLButtonElement, ResolvedSwitchInputProps>(
    (
      {
        useControllerProps,
        label,
        componentsProps: { formControlLabelProps, formControlProps, switchProps },
      },
      forwardRef
    ) => {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);

      return (
        <FormControl {...formControlProps} error={invalid}>
          <FormControlLabel
            {...formControlLabelProps}
            control={
              <Switch
                {...switchProps}
                ref={forwardRef}
                onChange={mergeFunctions(onChange, switchProps?.onChange)}
                onBlur={mergeFunctions(onBlur, switchProps?.onBlur)}
                inputRef={mergeRefs(ref, switchProps?.inputRef)}
                checked={value}
                value={value}
              />
            }
            // eslint-disable-next-line react/jsx-no-useless-fragment
            label={<>{label}</>}
          />
          {error && (
            <FormHelperText>
              {exposeMessage(error, name, typeof label === 'string' ? label : name)}
            </FormHelperText>
          )}
        </FormControl>
      );
    }
  )
);
