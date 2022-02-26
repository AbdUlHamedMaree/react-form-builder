import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ResolvedFileInput, ResolvedFileInputProps } from '../../resolved-inputs';
import { stringToLabel } from '../../../utils';
import { FinalInputProps } from '../../../types';

export type ImageInputProps = FinalInputProps<
  ResolvedFileInputProps,
  'fileDropzoneProps',
  Pick<ResolvedFileInputProps, 'onUpload'>
>;

export const ImageInput = React.memo(
  React.forwardRef<HTMLInputElement, ImageInputProps>(function ImageInput(
    {
      name,
      label,
      useControllerProps,
      onUpload,
      paperProps,
      typographyProps,
      formHelperTextProps,
      ...fileDropzoneProps
    },
    ref
  ) {
    const { control } = useFormContext();

    return (
      <ResolvedFileInput
        ref={ref}
        useControllerProps={{ ...useControllerProps, name, control }}
        label={label ?? stringToLabel(name)}
        onUpload={onUpload}
        componentsProps={{
          paperProps,
          typographyProps,
          formHelperTextProps,
          fileDropzoneProps,
        }}
      />
    );
  })
);
