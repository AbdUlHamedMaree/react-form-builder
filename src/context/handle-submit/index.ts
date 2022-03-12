import { createContext } from 'react';

export const handleSubmitContext = createContext<
  (e?: React.BaseSyntheticEvent) => Promise<unknown> | unknown
>(() => null);
