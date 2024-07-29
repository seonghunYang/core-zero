import { useRef } from "react";
import { useOverlayState } from "./use-overlay-state.hook";
import type { OverlayState } from "./use-overlay-state.hook";
import {
  useOverlayTrigger as useOverlayTriggerAria,
  usePopover as usePopoverAria,
} from "react-aria";

// 타입이 컴포넌트와 결국 같아야함(혹은 가져와야함)
interface UsePopoverArgs {
  state?: OverlayState;
}

export function usePopover(props: UsePopoverArgs) {
  const state = useOverlayState({
    isOpen: props.state?.isOpen,
    defaultOpen: false,
    onOpenChange: props.state?.setOpen,
  });

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const popoverProps = usePopoverAria(
    {
      ...props,
      triggerRef,
      popoverRef,
    },
    state
  );

  const overlayTriggerProps = useOverlayTriggerAria(
    { type: "dialog" },
    state,
    triggerRef
  );

  return {
    state,
    popoverRef,
    triggerRef,
    popoverProps,
    overlayTriggerProps,
  };
}
