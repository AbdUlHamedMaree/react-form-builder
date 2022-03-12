import {
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Box,
  BoxProps,
  ChipProps,
  FormControlProps,
  MenuItemProps,
  SelectProps,
  InputAdornment,
  InputLabelProps,
} from '@mui/material';
import { useController } from 'react-hook-form';
import React from 'react';

import { exposeMessage } from '../../../utils/expose-message';
import { mergeFunctions, mergeRefs } from '../../../utils';
import { ResolvedInputProps } from '../../../types';

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

export const ResolvedMultiSelectInput = React.memo(
  React.forwardRef<HTMLDivElement, ResolvedMultiSelectInputProps>(
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
      forwardRef
    ) {
      const {
        field: { name, onBlur, onChange, ref, value },
        fieldState: { invalid, error },
      } = useController(useControllerProps);
      return (
        <FormControl {...formControlProps} error={invalid}>
          <InputLabel {...inputLabelProps}>{label}</InputLabel>
          <Select
            {...selectProps}
            ref={forwardRef}
            name={name}
            inputRef={mergeRefs(ref, selectProps?.inputRef)}
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
            value={value as (string | number)[]}
            label={label}
            onChange={mergeFunctions(onChange, selectProps?.onChange)}
            onBlur={mergeFunctions(onBlur, selectProps?.onBlur)}
            error={invalid}
            multiple
          >
            {Object.entries(items).map(([k, v]) => (
              <MenuItem {...menuItemProps} key={k} value={k}>
                {v}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText>
              {exposeMessage(error, name, typeof label === 'string' ? label : name)}
            </FormHelperText>
          )}
        </FormControl>
      );
    }
  )
);
