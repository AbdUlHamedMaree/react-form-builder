import type {
  BrowserNativeObject,
  DefaultValues as HookFormDefaultValues,
  Primitive,
} from 'react-hook-form';

type DeepDefaultValue<T> = T extends BrowserNativeObject | Primitive
  ? T | null | '' | 0 | false
  : {
      [K in keyof T]?: DeepDefaultValue<T[K]> | null | '' | 0 | false;
    };

export type DefaultValues<T> = HookFormDefaultValues<DeepDefaultValue<T>>;
