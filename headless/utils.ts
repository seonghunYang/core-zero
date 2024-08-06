import clsx from "clsx";
import React from "react";

interface Props {
  [key: string]: any;
}

type PropsArg = Props | null | undefined;

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V }
  ? NullToObject<V>
  : never;
type NullToObject<T> = T extends null | undefined ? {} : T;
// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export function mergeProps<T extends PropsArg[]>(
  ...args: T
): UnionToIntersection<TupleTypes<T>> {
  const result: Props = { ...args[0] };

  for (let i = 1; i < args.length; i++) {
    const props = args[i];

    for (const key in props) {
      const a = result[key];
      const b = props[key];

      if (
        typeof a === "function" &&
        typeof b === "function" &&
        key[0] === "o" &&
        key[1] === "n" &&
        key.charCodeAt(2) >= 65 &&
        key.charCodeAt(2) <= 90
      ) {
        result[key] = chain(a, b);
      } else if (
        (key === "className" || key === "UNSAFE_className") &&
        typeof a === "string" &&
        typeof b === "string"
      ) {
        result[key] = clsx(a, b);
      } else {
        result[key] = b !== undefined ? b : a;
      }
    }
  }
  return result as UnionToIntersection<TupleTypes<T>>;
}

function chain(...callbacks: any[]): (...args: any[]) => void {
  return (...args: any[]) => {
    for (let callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}

export function mergeRef(
  ref: React.RefObject<any>,
  contextRef?: React.RefObject<any>
) {
  if (contextRef) {
    if (ref) {
      console.warn(
        "컴파운드 컴포넌트를 사용할 때 커스텀 ref를 사용하면 예상치 못한 동작이 발생할 수 있습니다."
      );
      return ref;
    }
    return contextRef;
  }
  return ref;
}
