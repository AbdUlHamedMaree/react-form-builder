import { FormProvider } from 'react-hook-form';
import { handleSubmitContext } from '../context';
import { AnyObject } from '../types';
import { UseFormBuilderReturn } from './use-form-builder';

export type FormBuilderProviderProps<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = UseFormBuilderReturn<TFieldType, TContext>;

export const FormBuilderProvider = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>({
  onError = (...args) => console.error(args),
  onSubmit = () => null,
  children,
  ...methods
}: React.PropsWithChildren<
  FormBuilderProviderProps<TFieldType, TContext>
>): ReturnType<React.FC> => {
  return (
    <FormProvider {...methods}>
      <handleSubmitContext.Provider value={methods.handleSubmit(onSubmit, onError)}>
        {children}
      </handleSubmitContext.Provider>
    </FormProvider>
  );
};
