import React, { forwardRef, ReactText } from "react";
import { usePopoverContext } from "./popover";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "src/types/polymorphic";
import type { PopoverTriggerProps } from "./popover";
import { mergeProps, mergeRef } from "src/utils/merge";
import { InteractionState } from "src/types/interactions";
import { convertDataPropsToState } from "src/utils/interactions";

type PopoverChildrenProps = {
  isOpen: boolean;
} & InteractionState;

type _PopoverTriggerProps = {
  children:
    | React.ReactNode
    | ((props: PopoverChildrenProps) => React.ReactNode);
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

    const renderProps = convertDataPropsToTriggerRenderProps();

    return (
      <Element {...mergedProps} ref={mergeRef(ref, popoverContext?.triggerRef)}>
        {typeof children === "function"
          ? children({
              ...renderProps,
            })
          : children}
      </Element>
    );

    function convertDataPropsToTriggerRenderProps() {
      const interactionState = convertDataPropsToState(mergedProps);

      return {
        ...interactionState,
        isOpen: mergedProps["data-open"] === undefined ? false : true,
      };
    }
  }
);
