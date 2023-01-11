import React from 'react';
import { useFormContext } from 'react-hook-form';
import { stringToLabel } from '$utils/string-to-label';
import type { FinalInputProps } from '$types';
import type { ResolvedMultiFileInputProps } from '$components/resolved-inputs/multi-files';
import { ResolvedMultiFileInput } from '$components/resolved-inputs/multi-files';

export type FileImageInputProps = FinalInputProps<
  ResolvedMultiFileInputProps,
  'filesDropzoneProps',
  Pick<ResolvedMultiFileInputProps, 'onUpload'>
>;

export const FileImageInput = React.memo(
  React.forwardRef<HTMLInputElement, FileImageInputProps>(function FileImageInput(
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
