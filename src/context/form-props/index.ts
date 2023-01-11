import type { UseFormBuilderExtraReturn } from '$lib';
import type { AnyObject } from '$types';
import { createContext } from 'react';

export type FormPropsContextModel<TFieldType extends AnyObject = AnyObject> = Partial<
  UseFormBuilderExtraReturn<TFieldType>
>;

export const FormPropsContext = createContext<FormPropsContextModel<any>>({});
