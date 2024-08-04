import { DismissButton, Overlay } from "react-aria";
import { usePopoverContext } from "./popover";
import React from "react";
import { Dialog } from "../dialog/dialog";

interface PopoverContentProps {
  children: React.ReactNode;
}

export function PopoverContent({ children }: PopoverContentProps) {
  const { isOpen, popoverContentProps, onClose } = usePopoverContext();

  return (
    <>
      {isOpen && (
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
            <DismissButton onDismiss={onClose} />
            <Dialog {...popoverContentProps.overlayProps}>{children}</Dialog>
            <DismissButton onDismiss={onClose} />
          </div>
        </Overlay>
      )}
    </>
  );
}
