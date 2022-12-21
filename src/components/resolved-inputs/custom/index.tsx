import React, { memo } from 'react';
import type { UseControllerProps, UseControllerReturn } from 'react-hook-form';
import { useController } from 'react-hook-form';

export type ResolvedCustomInputProps = {
  useControllerProps: UseControllerProps;
  children: (options: UseControllerReturn) => React.ReactNode;
};
export const ResolvedCustomInput = memo<ResolvedCustomInputProps>(
  function ResolvedCustomInput({ useControllerProps, children }) {
    const controller = useController(useControllerProps);
    return <>{children(controller)}</>;
  }
);
