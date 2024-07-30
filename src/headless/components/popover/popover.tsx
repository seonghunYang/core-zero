import type { AriaPopoverProps, PopoverAria } from "react-aria";
import { OverlayTriggerAria } from "react-aria";
import { OverlayState } from "../../hooks/use-overlay-state.hook";
import { createContext, useContext } from "react";
import { usePopover } from "../../hooks/use-popover.hook";

type PopoverAriaType = PopoverAria & OverlayTriggerAria & OverlayState;

interface PopoverContextValue extends PopoverAriaType {
  popoverRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export interface PopoverProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
}

type PopoverRootProps = PopoverProps &
  Omit<AriaPopoverProps, "popoverRef" | "triggerRef"> & {
    children: React.ReactNode;
  };

export function PopoverRoot({ children, ...props }: PopoverRootProps) {
  const {
    isOpen,
    setOpen,
    open,
    close,
    toggle,
    popoverRef,
    triggerRef,
    popoverProps,
    overlayTriggerProps,
  } = usePopover({
    isOpen: props.isOpen,
    defaultOpen: props.defaultOpen,
    onChange: props.onChange,
  });

  return (
    <PopoverContext.Provider
      value={{
        ...popoverProps,
        ...overlayTriggerProps,
        popoverRef,
        triggerRef,
        isOpen,
        setOpen,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export const usePopoverContext = () => {
  let context = useContext(PopoverContext);
  if (context === null) {
    throw new Error("usePopoverContext must be used within a Popover");
  }
  return context;
};
