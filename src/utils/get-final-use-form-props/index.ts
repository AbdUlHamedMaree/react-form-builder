import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

import { NewUseFormProps, AnyObject } from '../../types';

export const getFinalUseFormProps = <
  TFieldType extends AnyObject = AnyObject,
  TContext extends AnyObject = AnyObject
>(
  props?: NewUseFormProps<TFieldType, TContext>,
  schema?: AnyObjectSchema
): UseFormProps<TFieldType, TContext> => ({
  ...props,
  resolver: schema ? yupResolver(schema) : undefined,
});
