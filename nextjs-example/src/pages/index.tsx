import { FormBuilder, TextInput } from '@mrii/react-form-builder';

const Home = () => {
  return (
    <FormBuilder>
      <TextInput name='title' label='Title' />
    </FormBuilder>
  );
};

export default Home;
