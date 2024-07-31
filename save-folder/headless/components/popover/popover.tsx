import type { AriaPopoverProps, PopoverAria } from "react-aria";
import { OverlayTriggerAria } from "react-aria";
import { createContext, useContext } from "react";
import { PopoverState, usePopover } from "../../hooks/use-popover.hook";

type PopoverAriaType = PopoverAria & OverlayTriggerAria & PopoverState;

interface PopoverContextValue extends PopoverAriaType {
  popoverRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export type PopoverProps = {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  onClose?: () => void;
  onOpen?: () => void;
  onToggle?: () => void;
} & Omit<AriaPopoverProps, "popoverRef" | "triggerRef">;

interface PopoverRootProps extends PopoverProps {
  children: React.ReactNode;
}

export function PopoverRoot({ children, ...props }: PopoverRootProps) {
  const {
    isOpen,
    setOpen,
    onOpen,
    onClose,
    onToggle,
    popoverRef,
    triggerRef,
    popoverProps,
    overlayTriggerProps,
  } = usePopover({
    isOpen: props.isOpen,
    defaultOpen: props.defaultOpen,
    ...props,
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
        onOpen,
        onClose,
        onToggle,
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
