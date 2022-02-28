import {
  FormBuilder,
  FormSubmitInput,
  QuillEditorInput,
  TextInput,
} from '@mrii/react-form-builder';
import { createTheme, ThemeProvider } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

const theme = createTheme({ palette: { primary: { main: '#ff0000' } } });

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <FormBuilder useFormProps={{ defaultValues: { asd: '',title:'' } }}>
        <TextInput name='title' label='Title' />
        <QuillEditorInput name='asd' />
        <FormSubmitInput>asd</FormSubmitInput>
      </FormBuilder>
    </ThemeProvider>
  );
};

export default Home;
