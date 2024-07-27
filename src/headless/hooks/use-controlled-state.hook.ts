import { SetStateAction, useCallback, useState } from "react";

interface UseControlledStateArgs<T = any> {
  value?: Exclude<T, undefined>;
  defaultValue: Exclude<T, undefined>;
}

type UseControlledStateReturn<T = any> = [T, React.Dispatch<SetStateAction<T>>];

export function useControlledState<T = any>({
  value,
  defaultValue,
}: UseControlledStateArgs<T>): UseControlledStateReturn<T> {
  const [state, setState] = useState<T>(value || defaultValue);

  const isControlled = value !== undefined;

  const currentValue = isControlled ? value : state;

  const setValue: React.Dispatch<SetStateAction<T>> = useCallback(
    (newValue) => {
      !isControlled && setState(newValue);
    },
    []
  );

  return [currentValue, setValue];
}
