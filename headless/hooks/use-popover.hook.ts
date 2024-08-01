import { useRef } from "react";
import { OverlayState, useOverlayState } from "./use-overlay-state.hook";
import {
  AriaPopoverProps,
  OverlayTriggerAria,
  useOverlayTrigger as useOverlayTriggerAria,
  usePopover as usePopoverAria,
} from "react-aria";
import {
  PopoverAriaWithoutCenter,
  PopoverProps,
  PopoverRoot,
} from "../components/popover/popover";

type RootProps = PopoverRoot;

interface UsePopoverReturn extends OverlayState {
  popoverProps: PopoverAriaWithoutCenter;
  overlayTriggerProps: OverlayTriggerAria;
  rootProps: RootProps;
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
  const popoverRef = props.popoverRef ?? useRef<HTMLDivElement>(null);
  const triggerRef = props.triggerRef ?? useRef<HTMLButtonElement>(null);

  const popoverProps = usePopoverAriaOverride(
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

  const rootProps = {
    ...state,
    popoverRef,
    triggerRef,
    ...popoverProps,
    ...overlayTriggerProps,
    ...callbacks,
  };

  return {
    ...state,
    popoverProps,
    overlayTriggerProps,
    rootProps,
  };
}

function usePopoverAriaOverride(
  props: AriaPopoverProps,
  state: OverlayState
): PopoverAriaWithoutCenter {
  const popoverProps = usePopoverAria(props, state);

  return {
    ...popoverProps,
    placement:
      popoverProps.placement === "center" ? "bottom" : popoverProps.placement,
  };
}
