import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedRadioGroupInputProps } from '$components/resolved-inputs';
import { ResolvedRadioGroupInput } from '$components/resolved-inputs/radio-group';

export type RadioGroupInputProps = FinalInputProps<
  ResolvedRadioGroupInputProps,
  'radioGroupProps',
  Pick<ResolvedRadioGroupInputProps, 'items'>
>;

export const RadioGroupInput = React.memo(
  React.forwardRef<HTMLInputElement, RadioGroupInputProps>(function RadioGroupInput(
    {
      name,
      label,
      useControllerProps,
      items,

      formControlProps,
      formControlLabelProps,
      formLabelProps,
      radioProps,
      ...radioGroupProps
    },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedRadioGroupInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        items={items}
        componentsProps={{
          formControlProps,
          formControlLabelProps,
          formLabelProps,
          radioProps,
          radioGroupProps,
        }}
      />
    );
  })
);
