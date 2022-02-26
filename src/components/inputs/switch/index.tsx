import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedSwitchInput, ResolvedSwitchInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type SwitchInputProps = FinalInputProps<ResolvedSwitchInputProps, 'switchProps'>;

export const SwitchInput = React.memo(
  React.forwardRef<HTMLButtonElement, SwitchInputProps>(function SwitchInput(
    {
      name,
      label,
      useControllerProps,

      formControlProps,
      formControlLabelProps,
      ...switchProps
    },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedSwitchInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        componentsProps={{
          formControlProps,
          formControlLabelProps,
          switchProps,
        }}
      />
    );
  })
);
