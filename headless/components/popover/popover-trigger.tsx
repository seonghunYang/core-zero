import React, { forwardRef, RefObject } from "react";
import { Button } from "../button/button";
import { usePopoverContext } from "./popover";
import {
  PolymorphicComponentPropsWithoutRef,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "headless/types/polymorphic";

type _PopoverTriggerProps = {
  children: React.ReactNode;
};

type PopoverTriggerProps<T extends React.ElementType> =
  PolymorphicComponentPropsWithRef<T, _PopoverTriggerProps>;

type PopoverTriggerComponent = <T extends React.ElementType = "button">(
  props: PopoverTriggerProps<T>
) => React.ReactNode;

export const PopoverTrigger: PopoverTriggerComponent = forwardRef(
  function PopoverTrigger<T extends React.ElementType = "button">(
    { as, children, ...props }: PopoverTriggerProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { triggerRef, triggerProps } = usePopoverContext();

    // const { overlayTriggerAriaProps, overlayTiggerProps }  = useOverlayTrigger
    // trigger를 poly로 만들면서 변경하기
    return (
      <button
        {...triggerProps}
        ref={triggerProps.ref as RefObject<HTMLButtonElement>}
      >
        {children}
      </button>
      // <Button
      //   {...triggerProps}
      //   buttonRef={triggerRef as RefObject<HTMLButtonElement>}
      // >
      //   {children}
      // </Button>
    );
  }
);
