import { DismissButton, Overlay } from "react-aria";
import { usePopoverContext } from "./popover";
import React from "react";
import { Dialog } from "../dialog/dialog";

interface PopoverContentProps {
  children: React.ReactNode;
}

export function PopoverContent({ children }: PopoverContentProps) {
  const {
    popoverRef,
    popoverProps,
    underlayProps,
    arrowProps,
    placement,
    isOpen,
    overlayProps,
    onClose,
  } = usePopoverContext();

  return (
    <>
      {isOpen && (
        <Overlay>
          <div {...underlayProps} className="underlay" />
          <div {...popoverProps} ref={popoverRef} className="popover">
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
          </div>
        </Overlay>
      )}
    </>
  );
}
