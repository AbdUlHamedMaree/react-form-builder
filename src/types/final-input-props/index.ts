/* eslint-disable @typescript-eslint/ban-types */
import type React from 'react';
import type { UseControllerProps } from 'react-hook-form';
import type { ResolvedInputProps } from '../resolved-input-props';

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
