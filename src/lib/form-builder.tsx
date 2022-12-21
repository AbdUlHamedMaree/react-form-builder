import React from 'react';
import type { AnyObject } from '../types';
import { FormBuilderProvider } from './form-builder-provider';
import type { UseFormBuilderOptions, UseFormBuilderReturn } from './use-form-builder';
import { useFormBuilder } from './use-form-builder';

export type FormBuilderProps<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = {
  children?:
    | React.ReactNode
    | ((methods: UseFormBuilderReturn<TFieldType, TContext>) => React.ReactNode);
} & UseFormBuilderOptions<TFieldType, TContext>;

export const FormBuilder = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>({
  children,
  ...props
}: FormBuilderProps<TFieldType, TContext>): ReturnType<React.FC> => {
  const methods = useFormBuilder(props);
  return (
    <FormBuilderProvider {...methods}>
      {children instanceof Function ? children(methods) : children}
    </FormBuilderProvider>
  );
};
