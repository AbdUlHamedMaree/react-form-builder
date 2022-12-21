import React, { useState, memo, forwardRef, useCallback } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import type { LoadingTextFieldProps } from '../loading-text-field';
import { LoadingTextField } from '../loading-text-field';
import { ToggleIcon } from '../toggle-icon';

export type PasswordFieldProps = LoadingTextFieldProps;

export const PasswordField = memo(
  forwardRef<HTMLDivElement, PasswordFieldProps>((props, forwardedRef) => {
    const [show, setShow] = useState(false);

    const handleMouseDownPassword = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      },
      []
    );

    const handleClickShowPassword = useCallback(() => {
      setShow(v => !v);
    }, []);

    return (
      <LoadingTextField
        {...props}
        ref={forwardedRef}
        type={show ? 'text' : 'password'}
        InputProps={{
          ...props.InputProps,
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                <ToggleIcon on={show} onIcon={Visibility} offIcon={VisibilityOff} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  })
);
