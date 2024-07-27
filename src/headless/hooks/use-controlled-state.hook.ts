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

  const setValue: React.Dispatch<SetStateAction<T>> = useCallback(
    (newValue, ...args) => {
      if (!isControlled) {
        setState(newValue);
      } else {
        if (onChange) {
          if (!Object.is(currentValue, value)) {
            onChange(value, ...args);
          }
        }
      }
    },
    []
  );

  return [currentValue, setValue];
}
