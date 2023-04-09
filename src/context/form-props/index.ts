import type { UseFormBuilderExtraReturn } from '$lib';
import type { AnyObject } from '$types';
import { createContext } from 'react';

export type FormPropsContextModel<TFieldType extends AnyObject = AnyObject> = Partial<
  UseFormBuilderExtraReturn<TFieldType>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormPropsContext = createContext<FormPropsContextModel<any>>({});
