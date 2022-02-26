/* eslint-disable @typescript-eslint/ban-types */
import { UseControllerProps } from 'react-hook-form';

export type ResolvedInputProps<
  T extends Record<string, unknown> = {},
  P extends Record<string, unknown> = {}
> = {
  useControllerProps: UseControllerProps;
  componentsProps: T;
  label?: React.ReactNode;
  children?: null | never;
} & P;
