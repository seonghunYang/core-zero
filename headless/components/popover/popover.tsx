import type { AriaPopoverProps, PopoverAria, useButton } from "react-aria";
import { OverlayTriggerAria } from "react-aria";
import { createContext, RefObject, useContext } from "react";
import { usePopover } from "../../hooks/use-popover.hook";
import { OverlayCallback } from "headless/hooks/use-overlay-state.hook";

export interface PopoverState extends OverlayCallback {
  isOpen: boolean;
  setOpen(isOpen: boolean): void;
}

export type PopoverAriaWithoutCenter = Omit<PopoverAria, "placement"> & {
  placement: "top" | "right" | "bottom" | "left";
};

export type PopoverContentProps = PopoverAriaWithoutCenter & Pick<OverlayTriggerAria, "overlayProps">;

export interface PopoverRoot<T extends Element> extends PopoverState {
  popoverRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<T>;
  triggerProps: ReturnType<typeof useButton>["buttonProps"] & {
    ref: RefObject<T>;
  };
  popoverContentProps: PopoverContentProps;
}

type PopoverContextValue<T extends Element> = PopoverRoot<T>;

const PopoverContext = createContext<PopoverContextValue<Element> | null>(null);

export type PopoverProps<T extends Element> = {
  defaultOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
} & Omit<AriaPopoverProps, "popoverRef" | "triggerRef" | "placement"> &
  Partial<PopoverRoot<T>>;

interface PopoverRootProps<T extends Element> extends PopoverProps<T> {
  children: React.ReactNode;
}

export function PopoverRoot<T extends Element = HTMLButtonElement>({
  children,
  ...props
}: PopoverRootProps<T>) {
  const { rootProps } = usePopover({
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
  // 제거해야함
  if (context === null) {
    throw new Error("usePopoverContext must be used within a Popover");
  }
  return context;
};
