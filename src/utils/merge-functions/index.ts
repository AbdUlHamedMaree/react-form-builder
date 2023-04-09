export const mergeFunctions =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <F extends ((...args: any[]) => any) | undefined>(...funcs: F[]) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (...args: F extends Function ? Parameters<F> : never) => {
    funcs.forEach(func => {
      func?.(...args);
    });
  };
