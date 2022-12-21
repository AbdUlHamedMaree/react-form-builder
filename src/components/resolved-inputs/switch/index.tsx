import type { FormControlLabelProps, FormControlProps, SwitchProps } from '@mui/material';
import { FormControl, FormControlLabel, FormHelperText, Switch } from '@mui/material';
import { useController } from 'react-hook-form';
import { useMemo, memo, forwardRef } from 'react';

import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';

export type ResolvedSwitchInputProps = ResolvedInputProps<{
  formControlProps?: FormControlProps;
  formControlLabelProps?: FormControlLabelProps;
  switchProps?: SwitchProps;
}>;

export const ResolvedSwitchInput = memo(
  forwardRef<HTMLButtonElement, ResolvedSwitchInputProps>(
    (
      {
        useControllerProps,
        label,
        componentsProps: { formControlLabelProps, formControlProps, switchProps },
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

      const inputRef = useMemo(
        () => mergeRefs(ref, switchProps?.inputRef),
        [ref, switchProps?.inputRef]
      );
      const handleChange = useMemo(
        () => mergeFunctions(onChange, switchProps?.onChange),
        [onChange, switchProps?.onChange]
      );
      const handleBlur = useMemo(
        () => mergeFunctions(onBlur, switchProps?.onBlur),
        [onBlur, switchProps?.onBlur]
      );

      return (
        <FormControl {...formControlProps} error={showError}>
          <FormControlLabel
            {...formControlLabelProps}
            control={
              <Switch
                {...switchProps}
                ref={forwardedRef}
                inputRef={inputRef}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                checked={value}
                value={value}
              />
            }
            // eslint-disable-next-line react/jsx-no-useless-fragment
            label={<>{label}</>}
          />
          {showError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      );
    }
  )
);
