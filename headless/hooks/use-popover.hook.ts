import { RefObject, useRef } from "react";
import { OverlayState, useOverlayState } from "./use-overlay-state.hook";
import {
  AriaPopoverProps,
  OverlayTriggerAria,
  useButton,
  useOverlayTrigger as useOverlayTriggerAria,
  usePopover as usePopoverAria,
} from "react-aria";
import {
  PopoverAriaWithoutCenter,
  PopoverProps,
  PopoverRoot,
} from "../components/popover/popover";

type RootProps<T extends Element> = PopoverRoot<T>;

interface UsePopoverReturn<T extends Element> extends OverlayState {
  popoverProps: PopoverAriaWithoutCenter;
  overlayTriggerProps: OverlayTriggerAria;
  rootProps: RootProps<T>;
  triggerProps: ReturnType<typeof useButton>["buttonProps"] & {
    ref: RefObject<T>;
  };
}

export function usePopover(
  props: PopoverProps<HTMLButtonElement>
): UsePopoverReturn<HTMLButtonElement>;
export function usePopover(
  props: PopoverProps<HTMLDivElement>
): UsePopoverReturn<HTMLDivElement>;
export function usePopover(
  props: PopoverProps<Element>
): UsePopoverReturn<Element>;
export function usePopover<T extends Element>(
  props: PopoverProps<T>
): UsePopoverReturn<T> {
  const state = useOverlayState({
    isOpen: props.isOpen,
    defaultOpen: props.defaultOpen ?? false,
    onOpenChange: props.onChange,
    ...props,
  });

  // 하나씩 control 가능하게 변경, 고민인건 compound 아닐 때도 사용가능하도록 할 필요가 있음
  // 즉 usePopoverContext 에서 일단 에러문 제거 해야함
  // 그리고 이래도 동작하는지를 스토리 북 혹은 테스트로 확인해야함
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = props.popoverRef ?? useRef<HTMLDivElement>(null);
  const triggerRef = props.triggerRef ?? triggerButtonRef;

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

  const { buttonProps } = useButton(
    overlayTriggerProps.triggerProps,
    triggerRef
  );

  const callbacks = {
    onClose: state.close,
    onOpen: state.open,
    onToggle: state.toggle,
  };

  // control 시에만 Props를 사용하기 때문에 ref는 무조건 제너릭 타입으로 단언 가능
  const triggerProps = {
    ...buttonProps,
    ref: triggerRef as RefObject<T>,
  };

  const rootProps = {
    ...state,
    popoverRef,
    triggerRef: triggerRef as RefObject<T>,
    triggerButtonRef,
    ...popoverProps,
    ...overlayTriggerProps,
    ...callbacks,
  };

  return {
    ...state,
    popoverProps,
    overlayTriggerProps,
    rootProps,
    triggerProps,
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
