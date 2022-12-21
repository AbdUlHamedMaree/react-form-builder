import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedFileInputProps } from '$components/resolved-inputs';
import { ResolvedFileInput } from '$components/resolved-inputs/file';

export type FileInputProps = FinalInputProps<
  ResolvedFileInputProps,
  'fileDropzoneProps',
  Pick<ResolvedFileInputProps, 'onUpload'>
>;

export const FileInput = React.memo(
  React.forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
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
