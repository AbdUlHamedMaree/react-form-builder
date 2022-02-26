import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { LoadingTextField, LoadingTextFieldProps } from '../loading-text-field';
import { ToggleIcon } from '../toggle-icon';

export type PasswordFieldProps = LoadingTextFieldProps;

export const PasswordField = React.memo(
  React.forwardRef<HTMLDivElement, PasswordFieldProps>((props, forwardRef) => {
    const [show, setShow] = useState(false);

    const handleMouseDownPassword = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      },
      []
    );

    const handleClickShowPassword = React.useCallback(() => {
      setShow(v => !v);
    }, []);

    return (
      <LoadingTextField
        {...props}
        ref={forwardRef}
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
