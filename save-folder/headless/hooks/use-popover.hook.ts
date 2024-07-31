import { useRef } from "react";
import { OverlayCallback, useOverlayState } from "./use-overlay-state.hook";
import {
  OverlayTriggerAria,
  PopoverAria,
  useOverlayTrigger as useOverlayTriggerAria,
  usePopover as usePopoverAria,
} from "react-aria";
import { PopoverProps } from "../components/popover/popover";

export interface PopoverState extends OverlayCallback {
  isOpen: boolean;
  setOpen(isOpen: boolean): void;
}

interface UsePopoverReturn extends PopoverState {
  callbacks: OverlayCallback;
  popoverProps: PopoverAria;
  overlayTriggerProps: OverlayTriggerAria;
  popoverRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export function usePopover(props: PopoverProps): UsePopoverReturn {
  const state = useOverlayState({
    isOpen: props.isOpen,
    defaultOpen: props.defaultOpen ?? false,
    onOpenChange: props.onChange,
    ...props,
  });

  // 하나씩 control 가능하게 변경, 고민인건 compound 아닐 때도 사용가능하도록 할 필요가 있음
  // 즉 usePopoverContext 에서 일단 에러문 제거 해야함
  // 그리고 이래도 동작하는지를 스토리 북 혹은 테스트로 확인해야함
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

  const callbacks = {
    onClose: state.close,
    onOpen: state.open,
    onToggle: state.toggle,
  };

  return {
    ...state,
    ...callbacks,
    callbacks,
    popoverRef,
    triggerRef,
    popoverProps,
    overlayTriggerProps,
  };
}
