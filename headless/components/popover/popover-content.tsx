import { DismissButton, Overlay } from "react-aria";
import { PopoverContentProps, usePopoverContext } from "./popover";
import React, { forwardRef } from "react";
import { Dialog } from "../dialog/dialog";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "headless/types/polymorphic";
import { mergeRef } from "headless/utils";

type _PopoverContentProps = {
  children: React.ReactNode;
};

type polymorphicPopoverContentProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, _PopoverContentProps> &
    Partial<PopoverContentProps>;

type PopoverContentComponent = <C extends React.ElementType = "div">(
  props: polymorphicPopoverContentProps<C>
) => React.ReactNode;

export const PopoverContent: PopoverContentComponent = forwardRef(
  function PopoverContent<C extends React.ElementType = "div">(
    { as, children, ...props }: polymorphicPopoverContentProps<C>,
    ref: PolymorphicRef<C>
  ) {
    const popoverContext = usePopoverContext();

    const isCompound = popoverContext !== null;
    const mergedProps = isCompound
      ? { ...popoverContext?.popoverContentProps, ...props }
      : props;

    const {
      isOpen,
      underlayProps,
      popoverProps,
      arrowProps,
      overlayProps,
      onClose,
      placement,
      onOpen,
      onToggle,
      ...restProps
    } = mergedProps;

    const Element = as || "div";

    return (
      <>
        {isOpen && (
          <Overlay>
            <div {...underlayProps} className="underlay" />
            <Element
              {...popoverProps}
              {...restProps}
              ref={mergeRef(ref, popoverContext?.popoverRef)}
              className="popover"
            >
              <svg
                {...arrowProps}
                className="arrow"
                data-placement={placement}
                viewBox="0 0 12 12"
              >
                <path d="M0 0 L6 6 L12 0" />
              </svg>
              <DismissButton onDismiss={onClose} />
              <Dialog {...overlayProps}>{children}</Dialog>
              <DismissButton onDismiss={onClose} />
            </Element>
          </Overlay>
        )}
      </>
    );
  }
);
