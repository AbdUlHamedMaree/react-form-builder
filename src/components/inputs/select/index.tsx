import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedSelectInput, ResolvedSelectInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type SelectInputProps = FinalInputProps<
  ResolvedSelectInputProps,
  'loadingTextFieldProps',
  Pick<ResolvedSelectInputProps, 'items'>
>;

export const SelectInput = React.memo(
  React.forwardRef<HTMLInputElement, SelectInputProps>(function SelectInput(
    { name, label, useControllerProps, items, menuItemProps, ...loadingTextFieldProps },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedSelectInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        items={items}
        componentsProps={{ menuItemProps, loadingTextFieldProps }}
      />
    );
  })
);
