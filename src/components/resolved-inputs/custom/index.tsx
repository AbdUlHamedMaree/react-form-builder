import React from 'react';
import { useController, UseControllerProps, UseControllerReturn } from 'react-hook-form';

export type ResolvedCustomInputProps = {
  useControllerProps: UseControllerProps;
  children: (options: UseControllerReturn) => React.ReactNode;
};
export const ResolvedCustomInput = React.memo<ResolvedCustomInputProps>(
  function ResolvedCustomInput({ useControllerProps, children }) {
    const controller = useController(useControllerProps);
    return <>{children(controller)}</>;
  }
);
