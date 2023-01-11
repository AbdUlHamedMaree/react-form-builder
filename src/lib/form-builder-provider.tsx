import React, { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { FormPropsContext } from '$context';
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
  n,
  children,
  ...methods
}: React.PropsWithChildren<
  FormBuilderProviderProps<TFieldType, TContext>
>): ReturnType<React.FC> => {
  const formPropsContextValue = useMemo(
    () => ({ onSubmit, onError, n }),
    [onSubmit, onError, n]
  );

  return (
    <FormProvider {...methods}>
      <FormPropsContext.Provider value={formPropsContextValue}>
        {children}
      </FormPropsContext.Provider>
    </FormProvider>
  );
};
