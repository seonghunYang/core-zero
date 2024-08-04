import { RefObject, useEffect, useRef } from "react";
import { OverlayState, useOverlayState } from "./use-overlay-state.hook";
import {
  AriaPopoverProps,
  useButton,
  usePopover as usePopoverAria,
} from "react-aria";
import {
  PopoverAriaWithoutCenter,
  PopoverContentProps,
  PopoverProps,
  PopoverRoot,
} from "../components/popover/popover";
import { useOverlayTrigger } from "./use-overlay-trigger.hook";

interface UsePopoverReturn<T extends Element, C extends Element>
  extends OverlayState {
  rootProps: PopoverRoot<T, C>;
  triggerProps: ReturnType<typeof useButton>["buttonProps"] & {
    ref: RefObject<T>;
  };
  popoverContentProps: PopoverContentProps<C>;
}

export function usePopover<
  T extends Element = HTMLButtonElement,
  C extends Element = HTMLDivElement,
>(props: PopoverProps<T, C>): UsePopoverReturn<T, C> {
  const state = useOverlayState({
    isOpen: props.isOpen,
    defaultOpen: props.defaultOpen ?? false,
    onOpenChange: props.onChange,
    ...props,
  });

  // 하나씩 control 가능하게 변경, 고민인건 compound 아닐 때도 사용가능하도록 할 필요가 있음
  // 즉 usePopoverContext 에서 일단 에러문 제거 해야함
  // 그리고 이래도 동작하는지를 스토리 북 혹은 테스트로 확인해야함
  const popoverRef = props.popoverRef ?? useRef<C>(null);
  const triggerRef = props.triggerRef ?? useRef<T>(null);

  const popoverAriaProps = usePopoverAriaOverride(
    {
      ...props,
      triggerRef,
      popoverRef,
    },
    state
  );

  const { overlayTriggerAriaProps, overlayTiggerProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  const callbacks = {
    onClose: state.close,
    onOpen: state.open,
    onToggle: state.toggle,
  };

  const triggerProps = {
    ...overlayTiggerProps,
    ref: triggerRef,
  };

  const popoverContentProps = {
    ...popoverAriaProps,
    ref: popoverRef,
    overlayProps: overlayTriggerAriaProps.overlayProps,
  };

  const rootProps = {
    ...state,
    popoverRef,
    triggerRef,
    ...popoverAriaProps,
    ...callbacks,
    triggerProps,
    overlayProps: overlayTriggerAriaProps.overlayProps,
    popoverContentProps,
  };

  return {
    ...state,
    rootProps,
    triggerProps,
    popoverContentProps,
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
