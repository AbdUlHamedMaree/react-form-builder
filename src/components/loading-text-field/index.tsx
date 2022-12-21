import type { TextFieldProps } from '@mui/material';
import { TextField, CircularProgress, InputAdornment } from '@mui/material';
import { memo, forwardRef } from 'react';

export type LoadingTextFieldProps = { loading?: boolean } & TextFieldProps;

export const LoadingTextField = memo(
  forwardRef<HTMLDivElement, LoadingTextFieldProps>(({ loading, ...props }, ref) => (
    <TextField
      {...props}
      ref={ref}
      disabled={props?.disabled || (typeof loading === 'boolean' && loading)}
      InputProps={{
        ...props?.InputProps,
        endAdornment: loading ? (
          <InputAdornment position='end'>
            <CircularProgress color='inherit' size={20} />
          </InputAdornment>
        ) : (
          props?.InputProps?.endAdornment
        ),
      }}
    />
  ))
);
