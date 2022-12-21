export const requireOptionalDependency = (module: string, errMessage?: string) => {
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(module);
  } catch (err) {
    console.error(err);
    errMessage && console.error(errMessage);
    throw err;
  }
};
