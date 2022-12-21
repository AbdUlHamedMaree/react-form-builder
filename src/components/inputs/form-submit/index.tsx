import React, { useContext } from 'react';
import type { LoadingButtonProps } from '@mui/lab';
import { LoadingButton } from '@mui/lab';
import { useFormContext } from 'react-hook-form';
import { handleSubmitContext } from '$context/handle-submit';
import { mergeFunctions } from '$utils/merge-functions';

export type FormSubmitInputProps = Omit<LoadingButtonProps, 'loading' | 'type'>;

export const FormSubmitInput = React.memo(
  React.forwardRef<HTMLButtonElement, FormSubmitInputProps>(
    ({ children, ...props }, ref) => {
      const {
        formState: { isSubmitting },
      } = useFormContext();
      const handleSubmit = useContext(handleSubmitContext);

      return (
        <LoadingButton
          ref={ref}
          {...props}
          loading={isSubmitting}
          onClick={mergeFunctions(handleSubmit, props.onClick)}
        >
          {children}
        </LoadingButton>
      );
    }
  )
);
