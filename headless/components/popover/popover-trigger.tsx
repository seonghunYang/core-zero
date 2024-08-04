import React, { forwardRef, RefObject } from "react";
import { usePopoverContext } from "./popover";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "headless/types/polymorphic";
import type { PopoverTriggerProps } from "./popover";

type _PopoverTriggerProps = {
  children: React.ReactNode;
};

type PolymorphicPopoverTriggerProps<T extends React.ElementType> =
  PolymorphicComponentPropsWithRef<T, _PopoverTriggerProps> &
    PopoverTriggerProps;

type PopoverTriggerComponent = <T extends React.ElementType = "button">(
  props: PolymorphicPopoverTriggerProps<T>
) => React.ReactNode;

export const PopoverTrigger: PopoverTriggerComponent = forwardRef(
  function PopoverTrigger<T extends React.ElementType = "button">(
    { as, ...props }: PolymorphicPopoverTriggerProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const popoverContext = usePopoverContext();

    const isCompound = popoverContext !== null;

    const mergedProps = isCompound
      ? { ...popoverContext?.triggerProps, ...props }
      : props;

    const Element = as || "button";

    return (
      <Element
        {...mergedProps}
        ref={mergeRef(ref, popoverContext?.triggerRef)}
      />
    );
  }
);

function mergeRef(
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
