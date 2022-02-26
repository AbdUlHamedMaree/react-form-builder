import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '../../../utils';
import { ResolvedCheckBoxInput, ResolvedCheckBoxInputProps } from '../../resolved-inputs';
import { FinalInputProps } from '../../../types';

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
