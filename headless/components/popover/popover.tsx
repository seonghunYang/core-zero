import type { AriaPopoverProps, PopoverAria } from "react-aria";
import { OverlayTriggerAria } from "react-aria";
import { createContext, useContext } from "react";
import { PopoverState, usePopover } from "../../hooks/use-popover.hook";

export type PopoverAriaWithoutCenter = Omit<PopoverAria, "placement"> & {
  placement: "top" | "right" | "bottom" | "left";
};

type PopoverAriaType = PopoverAriaWithoutCenter &
  OverlayTriggerAria &
  PopoverState;

export interface PopoverRootAriaProps extends PopoverAriaType {
  popoverRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

type PopoverContextValue = PopoverRootAriaProps;

const PopoverContext = createContext<PopoverContextValue | null>(null);

export type PopoverProps = {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  onClose?: () => void;
  onOpen?: () => void;
  onToggle?: () => void;
} & Omit<AriaPopoverProps, "popoverRef" | "triggerRef" | "placement"> &
  Partial<PopoverRootAriaProps>;

interface PopoverRootProps extends PopoverProps {
  children: React.ReactNode;
}

export function PopoverRoot({ children, ...props }: PopoverRootProps) {
  const { rootProps } = usePopover({
    isOpen: props.isOpen,
    defaultOpen: props.defaultOpen,
    ...props,
  });

  return (
    <PopoverContext.Provider
      value={{
        ...rootProps,
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
