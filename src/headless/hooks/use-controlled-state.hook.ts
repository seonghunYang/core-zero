import { SetStateAction, useCallback, useState } from "react";

interface UseControlledStateArgs<T = any> {
  value?: Exclude<T, undefined>;
  defaultValue: Exclude<T, undefined>;
  onChange?: (v: T, ...args: any[]) => void;
}

type UseControlledStateReturn<T = any> = [T, React.Dispatch<SetStateAction<T>>];

export function useControlledState<T = any>({
  value,
  defaultValue,
  onChange,
}: UseControlledStateArgs<T>): UseControlledStateReturn<T> {
  const [state, setState] = useState<T>(value || defaultValue);

  const isControlled = value !== undefined;

  const currentValue = isControlled ? value : state;

  const setValue: (value: SetStateAction<T>) => void = useCallback(
    (value, ...args) => {
      const onChangeCaller = (value: T, ...args: any[]) => {
        if (onChange) {
          if (!Object.is(currentValue, value)) {
            onChange(value, ...args);
          }
        }
      };

      if (typeof value === "function") {
        const updateFunction = (oldValue: T) => {
          const interceptedValue = (value as (prevState: T) => T)(
            isControlled ? currentValue : oldValue
          );
          onChangeCaller(interceptedValue, ...args);
          if (!isControlled) {
            return interceptedValue;
          }
          return oldValue;
        };

        setState(updateFunction);
      } else {
        if (!isControlled) {
          setState(value);
        }
        onChangeCaller(value, ...args);
      }
    },
    []
  );

  return [currentValue, setValue];
}
