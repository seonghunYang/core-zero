import { DismissButton, Overlay } from "react-aria";
import { usePopoverContext } from "./popover";

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
            {children}
            <DismissButton onDismiss={onClose} />
          </div>
        </Overlay>
      )}
    </>
  );
}
