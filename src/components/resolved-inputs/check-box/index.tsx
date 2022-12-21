import type {
  CheckboxProps,
  FormControlLabelProps,
  FormControlProps,
  FormHelperTextProps,
  TypographyProps,
} from '@mui/material';
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { useController } from 'react-hook-form';
import { forwardRef, useMemo, memo } from 'react';

import { exposeMessage } from '$utils/expose-message';
import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';

export type ResolvedCheckBoxInputProps = ResolvedInputProps<{
  formControlProps?: FormControlProps;
  formControlLabelProps?: FormControlLabelProps;
  checkboxProps?: CheckboxProps;
  typographyProps?: TypographyProps;
  formHelperTextProps?: FormHelperTextProps;
}>;

export const ResolvedCheckBoxInput = memo(
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
        fieldState: { error, isTouched },
      } = useController(useControllerProps);

      const showError = useMemo(() => !!(error && isTouched), [error, isTouched]);
      const errorMessage = useMemo(
        () => exposeMessage(error, name, formControlLabelProps?.label),
        [error, formControlLabelProps?.label, name]
      );

      const inputRef = useMemo(
        () => mergeRefs(ref, checkboxProps?.inputRef),
        [checkboxProps?.inputRef, ref]
      );
      const handleChange = useMemo(
        () => mergeFunctions(onChange, checkboxProps?.onChange),
        [checkboxProps?.onChange, onChange]
      );
      const handleBlur = useMemo(
        () => mergeFunctions(onBlur, checkboxProps?.onBlur),
        [checkboxProps?.onBlur, onBlur]
      );

      return (
        <FormControl {...formControlProps} error={showError}>
          <FormControlLabel
            {...formControlLabelProps}
            control={
              <Checkbox
                {...checkboxProps}
                name={name}
                ref={forwardedRef}
                checked={value}
                value={value}
                inputRef={inputRef}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            }
            // eslint-disable-next-line react/jsx-no-useless-fragment
            label={<>{label}</>}
          />
          {showError && (
            <FormHelperText {...formHelperTextProps}>{errorMessage}</FormHelperText>
          )}
        </FormControl>
      );
    }
  )
);
