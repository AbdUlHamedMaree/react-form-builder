/* eslint-disable @typescript-eslint/ban-types */
import { UseControllerProps } from 'react-hook-form';
import { ResolvedInputProps } from '..';

export type FinalInputProps<
  T extends ResolvedInputProps,
  C extends keyof T['componentsProps'],
  P = {},
  H extends T['componentsProps'] = T['componentsProps']
> = {
  name: string;
  label?: React.ReactNode;
  useControllerProps?: Omit<UseControllerProps, 'name' | 'control'>;
  children?: null | never;
} & Omit<H, C> &
  H[C] &
  P;
