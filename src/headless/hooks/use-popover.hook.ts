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
  defaultOpen?: boolean;
}

export function usePopover(props: UsePopoverArgs) {
  const state = useOverlayState({
    isOpen: props.state?.isOpen,
    defaultOpen: props.defaultOpen ?? false,
    onOpenChange: props.state?.setOpen,
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

  return {
    state,
    popoverRef,
    triggerRef,
    popoverProps,
    overlayTriggerProps,
  };
}
