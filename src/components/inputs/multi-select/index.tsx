import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedMultiSelectInputProps } from '$components/resolved-inputs';
import { ResolvedMultiSelectInput } from '$components/resolved-inputs/multi-select';

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
