import { Button } from "../button/button";
import { usePopoverContext } from "./popover";

interface PopoverTriggerProps {
  children: React.ReactNode;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { triggerRef, triggerProps, overlayProps } = usePopoverContext();

  return (
    <Button {...triggerProps} buttonRef={triggerRef}>
      {children}
    </Button>
  );
}
