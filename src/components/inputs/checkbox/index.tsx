import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedCheckBoxInputProps } from '$components/resolved-inputs';
import { ResolvedCheckBoxInput } from '$components/resolved-inputs/check-box';

export type CheckBoxInputProps = FinalInputProps<
  ResolvedCheckBoxInputProps,
  'checkboxProps'
>;

export const CheckBoxInput = React.memo(
  React.forwardRef<HTMLButtonElement, CheckBoxInputProps>(function CheckBoxInput(
    {
      name,
      label,
      useControllerProps,
      formControlProps,
      formControlLabelProps,
      typographyProps,
      formHelperTextProps,
      ...checkboxProps
    },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedCheckBoxInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        componentsProps={{
          formControlProps,
          formControlLabelProps,
          typographyProps,
          formHelperTextProps,
          checkboxProps,
        }}
      />
    );
  })
);
