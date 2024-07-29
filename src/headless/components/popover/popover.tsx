import type { AriaPopoverProps, PopoverAria } from "react-aria";
import {
  OverlayTriggerAria,
  useOverlayTrigger as useOverlayTriggerAria,
  usePopover as usePopoverAria,
} from "react-aria";
import {
  OverlayState,
  useOverlayState,
} from "../../hooks/use-overlay-state.hook";
import { createContext, useContext, useRef } from "react";
import { usePopover } from "../../hooks/use-popover.hook";

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
  const { state, popoverRef, triggerRef, popoverProps, overlayTriggerProps } =
    usePopover({
      state: props.state,
    });

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
