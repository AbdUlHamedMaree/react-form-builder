import React from 'react';
import type { SvgIconComponent } from '@mui/icons-material';
import type { BoxProps, SvgIconProps } from '@mui/material';
import { Box } from '@mui/material';

export type ToggleIconProps = {
  offIcon: SvgIconComponent;
  offIconProps?: SvgIconProps;
  onIcon: SvgIconComponent;
  onIconProps?: SvgIconProps;

  allIconsProps?: SvgIconProps;

  rootProps?: BoxProps;

  on?: boolean;
};

export const ToggleIcon: React.FC<ToggleIconProps> = ({
  offIcon: OffIcon,
  offIconProps,
  onIcon: OnIcon,
  onIconProps,

  allIconsProps,

  rootProps,

  on = false,
}) => {
  return (
    <Box
      {...rootProps}
      sx={{
        width: 24,
        height: 24,
        position: 'relative',
        display: 'inline-block',
        ...rootProps?.sx,
      }}
    >
      <OffIcon
        {...allIconsProps}
        {...offIconProps}
        style={{
          transition:
            'clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1), -webkit-clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          //
          clipPath: on
            ? 'polygon(0% 0%, 0% 0%, 0% 0%)'
            : 'polygon(0% 200%, 0% 0%, 200% 0%)',
          ...allIconsProps?.style,
          ...offIconProps?.style,
        }}
      />
      <OnIcon
        {...allIconsProps}
        {...onIconProps}
        style={{
          transition:
            'clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1), -webkit-clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          //
          clipPath: on
            ? 'polygon(100% -100%, 100% 100%, -100% 100%)'
            : 'polygon(100% 100%, 100% 100%, 100% 100%)',
          ...allIconsProps?.style,
          ...onIconProps?.style,
        }}
      />
    </Box>
  );
};
