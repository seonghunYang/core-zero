import { RefObject } from "react";
import { Button } from "../button/button";
import { usePopoverContext } from "./popover";

interface PopoverTriggerProps {
  children: React.ReactNode;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { triggerRef, triggerProps } = usePopoverContext();

  // trigger를 poly로 만들면서 변경하기
  return (
    <Button
      {...triggerProps}
      buttonRef={triggerRef as RefObject<HTMLButtonElement>}
    >
      {children}
    </Button>
  );
}
