import React, { useContext } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { useFormContext } from 'react-hook-form';
import { handleSubmitContext } from '../../../context';
import { mergeFunctions } from '../../../utils';

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
