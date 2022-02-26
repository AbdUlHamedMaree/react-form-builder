import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  ResolvedMultiFileInput,
  ResolvedMultiFileInputProps,
} from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type MultiImageInputProps = FinalInputProps<
  ResolvedMultiFileInputProps,
  'filesDropzoneProps',
  Pick<ResolvedMultiFileInputProps, 'onUpload'>
>;

export const MultiImageInput = React.memo(
  React.forwardRef<HTMLInputElement, MultiImageInputProps>(function MultiImageInput(
    {
      name,
      label,
      useControllerProps,
      onUpload,

      paperProps,
      typographyProps,
      formHelperTextProps,
      ...filesDropzoneProps
    },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedMultiFileInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        onUpload={onUpload}
        componentsProps={{
          paperProps,
          typographyProps,
          formHelperTextProps,
          filesDropzoneProps,
        }}
      />
    );
  })
);
