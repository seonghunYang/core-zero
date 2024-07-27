import { SetStateAction, useCallback, useState } from "react";

interface UseControlledStateArgs<T = any> {
  valueProps?: T;
  defaultValue: T;
}

type UseControlledStateReturn<T = any> = [T, React.Dispatch<SetStateAction<T>>];

export function useControlledState<T = any>({
  valueProps,
  defaultValue,
}: UseControlledStateArgs<T>): UseControlledStateReturn<T> {
  const [state, setState] = useState<T>(defaultValue);

  const isControlled = valueProps !== undefined

  const value = isControlled ? valueProps : state;

  const setValue: React.Dispatch<SetStateAction<T>> = useCallback(
    (newValue) => {
      !isControlled && setState(newValue);
    },
    []
  );

  return [value, setValue];
}