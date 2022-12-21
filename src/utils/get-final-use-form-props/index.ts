import { yupResolver } from '@hookform/resolvers/yup';
import type { UseFormProps } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';

import type { NewUseFormProps, AnyObject } from '$types';

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
