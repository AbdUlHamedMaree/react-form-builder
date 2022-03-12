import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AnyObject } from '../types';
import { FormBuilderProvider } from './form-builder-provider';
import { useFormBuilder, UseFormBuilderOptions } from './use-form-builder';

export type FormBuilderProps<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = {
  children?:
    | React.ReactNode
    | ((methods: UseFormReturn<TFieldType, TContext>) => React.ReactNode);
} & UseFormBuilderOptions<TFieldType, TContext>;

export const FormBuilder = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>(
  props: React.PropsWithChildren<FormBuilderProps<TFieldType, TContext>>
): ReturnType<React.FC> => {
  const methods = useFormBuilder(props);
  return (
    <FormBuilderProvider {...methods}>
      {props.children instanceof Function ? props.children(methods) : props.children}
    </FormBuilderProvider>
  );
};
