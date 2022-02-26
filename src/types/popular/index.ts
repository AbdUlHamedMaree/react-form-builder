export type EmptyObject = Record<string, never>;
export type AnyObject = Record<string, unknown>;
export type AnyStringObject = Record<string, string>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyFunction = Function;
export type EmptyFunction = () => void;
