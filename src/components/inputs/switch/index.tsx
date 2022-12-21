import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedSwitchInputProps } from '$components/resolved-inputs';
import { ResolvedSwitchInput } from '$components/resolved-inputs/switch';

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
