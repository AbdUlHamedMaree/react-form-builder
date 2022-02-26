import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  ResolvedMultiSelectInput,
  ResolvedMultiSelectInputProps,
} from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type MultiSelectInputProps = FinalInputProps<
  ResolvedMultiSelectInputProps,
  'selectProps',
  Pick<ResolvedMultiSelectInputProps, 'items'>
>;

export const MultiSelectInput = React.memo(
  React.forwardRef<HTMLInputElement, MultiSelectInputProps>(function MultiSelectInput(
    {
      name,
      label,
      useControllerProps,
      items,
      formControlProps,
      chipProps,
      chipsContainerProps,
      menuItemProps,
      inputLabelProps,
      ...selectProps
    },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedMultiSelectInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        items={items}
        componentsProps={{
          formControlProps,
          chipProps,
          chipsContainerProps,
          menuItemProps,
          inputLabelProps,
          selectProps,
        }}
      />
    );
  })
);
