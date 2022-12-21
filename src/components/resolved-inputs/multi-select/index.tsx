import type {
  BoxProps,
  ChipProps,
  FormControlProps,
  MenuItemProps,
  SelectProps,
  InputLabelProps,
} from '@mui/material';
import {
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Box,
  InputAdornment,
} from '@mui/material';
import { useController } from 'react-hook-form';
import React, { useMemo, memo, forwardRef } from 'react';

import { mergeRefs } from '$utils/merge-refs';
import { mergeFunctions } from '$utils/merge-functions';
import type { ResolvedInputProps } from '$types';
import { exposeMessage } from '$utils/expose-message';

export type ResolvedMultiSelectInputProps = ResolvedInputProps<
  {
    formControlProps?: FormControlProps;
    selectProps?: SelectProps<(string | number)[] | undefined> & { loading?: boolean };
    chipProps?: ChipProps;
    chipsContainerProps?: BoxProps;
    menuItemProps?: MenuItemProps;
    inputLabelProps?: InputLabelProps;
  },
  {
    items: Record<string | number, React.ReactNode>;
  }
>;

export const ResolvedMultiSelectInput = memo(
  forwardRef<HTMLDivElement, ResolvedMultiSelectInputProps>(
    function ResolvedMultiSelectInput(
      {
        useControllerProps,
        label,
        items,
        componentsProps: {
          chipProps,
          chipsContainerProps,
          formControlProps,
          menuItemProps,
          selectProps,
          inputLabelProps,
        },
      },
      forwardedRef
    ) {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { error, isTouched },
      } = useController(useControllerProps);

      const showError = useMemo(() => !!(error && isTouched), [error, isTouched]);
      const errorMessage = useMemo(
        () => exposeMessage(error, name, label),
        [error, label, name]
      );

      const inputRef = useMemo(
        () => mergeRefs(ref, selectProps?.inputRef),
        [ref, selectProps?.inputRef]
      );
      const handleChange = useMemo(
        () => mergeFunctions(onChange, selectProps?.onChange),
        [onChange, selectProps?.onChange]
      );
      const handleBlur = useMemo(
        () => mergeFunctions(onBlur, selectProps?.onBlur),
        [onBlur, selectProps?.onBlur]
      );

      return (
        <FormControl {...formControlProps} error={showError}>
          <InputLabel {...inputLabelProps}>{label}</InputLabel>
          <Select
            {...selectProps}
            ref={forwardedRef}
            name={name}
            inputRef={inputRef}
            value={value as (string | number)[]}
            label={label}
            onChange={handleChange}
            onBlur={handleBlur}
            renderValue={selected => (
              <Box
                {...chipsContainerProps}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  ...chipsContainerProps?.sx,
                }}
              >
                {selected.map(el => (
                  <Chip
                    size='small'
                    {...chipProps}
                    key={el}
                    label={items[el] ?? ''}
                    sx={{
                      mr: 0.5,
                      ...chipProps?.sx,
                    }}
                  />
                ))}
              </Box>
            )}
            disabled={
              selectProps?.disabled ||
              (typeof selectProps?.loading === 'boolean' && selectProps.loading)
            }
            inputProps={{
              ...selectProps?.inputProps,
              endAdornment: selectProps?.loading ? (
                <InputAdornment position='end'>
                  <CircularProgress color='inherit' size={20} />
                </InputAdornment>
              ) : (
                selectProps?.inputProps?.endAdornment
              ),
            }}
            error={showError}
            multiple
          >
            {Object.entries(items).map(([k, v]) => (
              <MenuItem {...menuItemProps} key={k} value={k}>
                {v}
              </MenuItem>
            ))}
          </Select>
          {showError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      );
    }
  )
);
