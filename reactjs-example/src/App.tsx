import React, { useCallback } from 'react';
import {
  FormBuilder,
  FormSubmitInput,
  SwitchInput,
  TextInput,
  QuillEditorInput,
  FileInput,
} from '@mrii/react-form-builder';
import * as yup from 'yup';
import { Box } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

const schema = yup.object({
  title: yup.string().required(),
  approved: yup.boolean(),
});

export const App: React.VFC = () => {
  const onSubmit = useCallback(
    (values: any) =>
      new Promise(resolve => {
        setTimeout(() => {
          console.log({ values });
          return resolve('');
        }, 3 * 1000);
      }),
    []
  );

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <FormBuilder
        onSubmit={onSubmit}
        validation={schema}
        defaultValues={{ approved: false, asd: '', title: '' }}
      >
        <TextInput size='small' margin='dense' name='title' label='Title' fullWidth />
        <SwitchInput name='approved' label='Approve' />
        <QuillEditorInput name='asd' />
        <FileInput
          name='asdz'
          label='files'
          onUpload={files => Promise.resolve({ value: '1', preview: '' })}
        />
        <FormSubmitInput size='large' variant='contained' fullWidth>
          asd
        </FormSubmitInput>
      </FormBuilder>
    </Box>
  );
};
