import React from 'react';
import type { UseControllerProps } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import type { ResolvedCustomInputProps } from '$components/resolved-inputs';
import { ResolvedCustomInput } from '$components/resolved-inputs/custom';

export type CustomInputProps = {
  name: string;
  useControllerProps?: Omit<UseControllerProps, 'name' | 'control'>;
  children: ResolvedCustomInputProps['children'];
};

export const CustomInput = React.memo<CustomInputProps>(function CustomInput({
  name,
  useControllerProps,
  children,
}) {
  const { control } = useFormContext();

  return (
    <ResolvedCustomInput useControllerProps={{ ...useControllerProps, name, control }}>
      {children}
    </ResolvedCustomInput>
  );
});
