import React, { forwardRef, RefObject } from "react";
import { usePopoverContext } from "./popover";
import {
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
    { as, ...props }: PopoverTriggerProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { triggerProps } = usePopoverContext();

    // const { overlayTriggerAriaProps, overlayTiggerProps }  = useOverlayTrigger
    // trigger를 poly로 만들면서 변경하기
    return (
      <button
        {...triggerProps}
        {...props}
        ref={triggerProps.ref as RefObject<HTMLButtonElement>}
      />
    );
  }
);
