import type {
  FormControlLabelProps,
  FormControlProps,
  FormLabelProps,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useController } from 'react-hook-form';
import React, { useMemo, memo, forwardRef } from 'react';

import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';

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

export const ResolvedRadioGroupInput = memo(
  forwardRef<HTMLInputElement, ResolvedRadioGroupInputProps>(
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
      forwardedRef
    ) => {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { error, isTouched },
      } = useController(useControllerProps);

      const showError = useMemo(() => !!(error && isTouched), [error, isTouched]);
      const errorMessage = useMemo(
        () => exposeMessage(error, name, label),
        [error, label, name]
      );

      const inputRef = useMemo(() => mergeRefs(ref, forwardedRef), [ref, forwardedRef]);
      const handleChange = useMemo(
        () => mergeFunctions(onChange, radioGroupProps?.onChange),
        [onChange, radioGroupProps?.onChange]
      );
      const handleBlur = useMemo(
        () => mergeFunctions(onBlur, radioGroupProps?.onBlur),
        [onBlur, radioGroupProps?.onBlur]
      );

      return (
        <FormControl {...formControlProps} error={showError}>
          <FormLabel component='legend' {...formLabelProps}>
            {label}
          </FormLabel>
          <RadioGroup
            {...radioGroupProps}
            ref={inputRef}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
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
          {showError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      );
    }
  )
);
