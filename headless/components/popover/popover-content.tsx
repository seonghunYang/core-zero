import { DismissButton, Overlay } from "react-aria";
import { usePopoverContext } from "./popover";
import React, { forwardRef } from "react";
import { Dialog } from "../dialog/dialog";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "headless/types/polymorphic";

type _PopoverContentProps = {
  children: React.ReactNode;
};

type PopoverContentProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, _PopoverContentProps>;

type PopoverContentComponent = <C extends React.ElementType = "div">(
  props: PopoverContentProps<C>
) => React.ReactNode;

export const PopoverContent: PopoverContentComponent = forwardRef(
  function PopoverContent<C extends React.ElementType = "div">(
    { as, children, ...props }: PopoverContentProps<C>,
    ref: PolymorphicRef<C>
  ) {
    const { popoverContentProps } = usePopoverContext();

    return (
      <>
        {popoverContentProps.isOpen && (
          <Overlay>
            <div {...popoverContentProps.underlayProps} className="underlay" />
            <div
              {...popoverContentProps.popoverProps}
              ref={popoverContentProps.ref}
              className="popover"
            >
              <svg
                {...popoverContentProps.arrowProps}
                className="arrow"
                data-placement={popoverContentProps.placement}
                viewBox="0 0 12 12"
              >
                <path d="M0 0 L6 6 L12 0" />
              </svg>
              <DismissButton onDismiss={popoverContentProps.onClose} />
              <Dialog {...popoverContentProps.overlayProps}>{children}</Dialog>
              <DismissButton onDismiss={popoverContentProps.onClose} />
            </div>
          </Overlay>
        )}
      </>
    );
  }
);
