import type { UseFormProps } from 'react-hook-form';
import type { AnyObject } from '../popular';

export type NewUseFormProps<
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
> = Omit<UseFormProps<TFieldType, TContext>, 'resolver' | 'defaultValues'>;
