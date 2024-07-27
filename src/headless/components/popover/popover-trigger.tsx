import React from "react";
import { useOverlayTriggerState } from "../../hooks/use-overlay-trigger-state.hook";
import { useOverlayTrigger } from "react-aria";
import { Button } from "../button/button";



export function PopoverTrigger() {
  const state = useOverlayTriggerState({ defaultOpen: false });
  const ref = React.useRef<HTMLButtonElement>(null);

  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    ref
  );

  return (
    <Button {...triggerProps} buttonRef={ref}>
      click
    </Button>
  );
}
