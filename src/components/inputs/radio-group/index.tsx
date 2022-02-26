import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  ResolvedRadioGroupInput,
  ResolvedRadioGroupInputProps,
} from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

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
