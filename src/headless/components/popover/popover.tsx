import type { AriaPopoverProps, PopoverAria } from "react-aria";
import {
  OverlayTriggerAria,
  useOverlayTrigger as useOverlayTriggerAria,
  usePopover as usePopoverAria,
} from "react-aria";
import {
  OverlayState,
  useOverlayState,
} from "../../hooks/use-overlay-trigger-state.hook";
import { createContext, useContext, useRef } from "react";

type PopoverAriaType = PopoverAria & OverlayTriggerAria;

interface PopoverContextValue extends PopoverAriaType {
  popoverRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
  state: OverlayState;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

interface PopoverRootProps
  extends Omit<AriaPopoverProps, "popoverRef" | "triggerRef"> {
  children: React.ReactNode;
  state?: OverlayState;
}

export function PopoverRoot({ children, ...props }: PopoverRootProps) {
  const state = useOverlayState({
    isOpen: props.state?.isOpen,
    defaultOpen: false,
    onOpenChange: props.state?.setOpen,
  });

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  let popoverProps = usePopoverAria(
    {
      ...props,
      triggerRef,
      popoverRef,
    },
    state
  );

  let overlayTriggerProps = useOverlayTriggerAria(
    { type: "dialog" },
    state,
    triggerRef
  );

  return (
    <PopoverContext.Provider
      value={{
        ...popoverProps,
        ...overlayTriggerProps,
        popoverRef,
        triggerRef,
        state,
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
