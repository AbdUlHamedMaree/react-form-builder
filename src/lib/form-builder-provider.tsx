import React from 'react';
import { FormProvider } from 'react-hook-form';
import { handleSubmitContext } from '$context';
import type { AnyObject } from '$types';
import type { UseFormBuilderReturn } from './use-form-builder';

export type FormBuilderProviderProps<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = UseFormBuilderReturn<TFieldType, TContext>;

export const FormBuilderProvider = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>({
  onError,
  onSubmit,
  children,
  ...methods
}: React.PropsWithChildren<
  FormBuilderProviderProps<TFieldType, TContext>
>): ReturnType<React.FC> => (
  <FormProvider {...methods}>
    <handleSubmitContext.Provider value={methods.handleSubmit(onSubmit, onError)}>
      {children}
    </handleSubmitContext.Provider>
  </FormProvider>
);
