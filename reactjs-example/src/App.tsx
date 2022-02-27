import React from 'react';
import { FormBuilder, TextInput } from '@mrii/react-form-builder';

export const App: React.VFC = () => {
  return (
    <FormBuilder>
      <TextInput name='title' label='Title' />
    </FormBuilder>
  );
};
