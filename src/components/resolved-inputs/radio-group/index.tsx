import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';
import { useController } from 'react-hook-form';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

export type ResolvedRadioGroupInputProps = ResolvedInputProps<
  {
    formControlProps?: FormControlProps;
    formControlLabelProps?: FormControlLabelProps;
    formLabelProps?: FormLabelProps<'legend'>;
    radioGroupProps?: RadioGroupProps;
    radioProps?: RadioProps;
  },
  {
    items: Record<string | number, React.ReactNode>;
  }
>;

export const ResolvedRadioGroupInput = React.memo(
  React.forwardRef<HTMLInputElement, ResolvedRadioGroupInputProps>(
    (
      {
        useControllerProps,
        label,
        items,
        componentsProps: {
          formControlLabelProps,
          formControlProps,
          formLabelProps,
          radioGroupProps,
          radioProps,
        },
      },
      forwardRef
    ) => {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);

      return (
        <FormControl {...formControlProps} error={invalid}>
          <FormLabel component='legend' {...formLabelProps}>
            {label}
          </FormLabel>
          <RadioGroup
            {...radioGroupProps}
            ref={mergeRefs(ref, forwardRef)}
            name={name}
            value={value}
            onChange={mergeFunctions(onChange, radioGroupProps?.onChange)}
            onBlur={mergeFunctions(onBlur, radioGroupProps?.onBlur)}
          >
            {Object.entries(items).map(([k, v]) => (
              <FormControlLabel
                {...formControlLabelProps}
                key={k}
                value={k}
                control={<Radio {...radioProps} />}
                // eslint-disable-next-line react/jsx-no-useless-fragment
                label={<>{v}</>}
              />
            ))}
          </RadioGroup>
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
