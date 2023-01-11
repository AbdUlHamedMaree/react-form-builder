import React, { useContext, useMemo } from 'react';
import type { LoadingButtonProps } from '@mui/lab';
import { LoadingButton } from '@mui/lab';
import { useFormContext } from 'react-hook-form';
import { mergeFunctions } from '$utils/merge-functions';
import { FormPropsContext } from '$context/form-props';
import { uselessFunction } from '$utils/useless-function';

export type FormSubmitInputProps = Omit<LoadingButtonProps, 'loading' | 'type'>;

export const FormSubmitInput = React.memo(
  React.forwardRef<HTMLButtonElement, FormSubmitInputProps>(
    ({ children, ...props }, ref) => {
      const {
        handleSubmit,
        formState: { isSubmitting },
      } = useFormContext();
      const { onSubmit = uselessFunction, onError = uselessFunction } =
        useContext(FormPropsContext);

      const clickHandler = useMemo(
        () => mergeFunctions(handleSubmit(onSubmit, onError), props.onClick),
        [handleSubmit, onError, onSubmit, props.onClick]
      );

      return (
        <LoadingButton ref={ref} {...props} loading={isSubmitting} onClick={clickHandler}>
          {children}
        </LoadingButton>
      );
    }
  )
);
