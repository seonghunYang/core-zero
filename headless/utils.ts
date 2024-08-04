import React from "react";

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
