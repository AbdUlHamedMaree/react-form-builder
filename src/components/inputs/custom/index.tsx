import React from 'react';
import { UseControllerProps, useFormContext } from 'react-hook-form';
import { ResolvedCustomInput, ResolvedCustomInputProps } from '../../resolved-inputs';

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
