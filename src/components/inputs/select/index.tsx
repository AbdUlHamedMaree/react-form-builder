import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedSelectInputProps } from '$components/resolved-inputs';
import { ResolvedSelectInput } from '$components/resolved-inputs/select';

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
