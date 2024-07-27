import { Button } from "../button/button";
import { usePopoverContext } from "./popover";

export function PopoverTrigger() {
  const { triggerRef, triggerProps, overlayProps } = usePopoverContext();

  return (
    <Button {...triggerProps} buttonRef={triggerRef}>
      click
    </Button>
  );
}
