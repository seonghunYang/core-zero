import React, { forwardRef, ReactText } from "react";
import { usePopoverContext } from "./popover";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "headless/types/polymorphic";
import type { PopoverTriggerProps } from "./popover";
import { mergeProps, mergeRef } from "headless/utils/merge";
import { InteractionState } from "headless/types/interactions";

type _PopoverTriggerProps = {
  children: React.ReactNode | ((props: InteractionState) => React.ReactNode);
};

type PolymorphicPopoverTriggerProps<T extends React.ElementType> =
  PolymorphicComponentPropsWithRef<T, _PopoverTriggerProps> &
    PopoverTriggerProps;

type PopoverTriggerComponent = <T extends React.ElementType = "button">(
  props: PolymorphicPopoverTriggerProps<T>
) => React.ReactNode;

export const PopoverTrigger: PopoverTriggerComponent = forwardRef(
  function PopoverTrigger<T extends React.ElementType = "button">(
    { as, children, ...props }: PolymorphicPopoverTriggerProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const popoverContext = usePopoverContext();

    const isCompound = popoverContext !== null;

    const mergedProps = isCompound
      ? { ...popoverContext?.triggerProps, ...props }
      : props;

    const Element = as || "button";

    // mergedProps.data-fo
    return (
      <Element {...mergedProps} ref={mergeRef(ref, popoverContext?.triggerRef)}>
        {typeof children === "function" ? children() : children}
      </Element>
    );
  }
);
