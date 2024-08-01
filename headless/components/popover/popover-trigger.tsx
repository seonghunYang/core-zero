import { Button } from "../button/button";
import { usePopoverContext } from "./popover";

interface PopoverTriggerProps {
  children: React.ReactNode;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { triggerButtonRef, triggerProps } = usePopoverContext();

  console.log(triggerButtonRef);
  return (
    <Button {...triggerProps} buttonRef={triggerButtonRef}>
      {children}
    </Button>
  );
}
