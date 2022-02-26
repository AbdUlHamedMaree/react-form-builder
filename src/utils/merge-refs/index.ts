import React, { MutableRefObject } from 'react';

export const mergeRefs = <T>(
  ...refs: (
    | MutableRefObject<T>
    | React.RefObject<T>
    | React.ForwardedRef<T>
    | undefined
    | null
  )[]
): React.Ref<Exclude<T, null>> => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  return inst =>
    filteredRefs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(inst);
      } else if (ref) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = inst;
      }
    });
};
