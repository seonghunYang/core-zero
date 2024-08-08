import { ElementType, RefObject, useEffect, useState } from "react";
import { OverlayState } from "./use-overlay-state.hook";
import type { OverlayTriggerProps } from "react-aria";
import {
  useButton,
  useOverlayTrigger as useOverlayTriggerAria,
} from "react-aria";

export function useOverlayTrigger(
  props: OverlayTriggerProps,
  state: OverlayState,
  ref: RefObject<Element | null>
) {
  const [elementType, setElemepntType] = useState<ElementType | null>(null);

  useEffect(() => {
    if (ref.current) {
      setElemepntType(ref.current.localName as ElementType);
    }
  }, [ref.current]);

  const overlayTriggerAriaProps = useOverlayTriggerAria(props, state, ref);

  const { buttonProps: overlayTiggerProps } = useButton(
    {
      elementType: elementType ?? "button",
      ...overlayTriggerAriaProps.triggerProps,
    },
    ref
  );

  return { overlayTriggerAriaProps, overlayTiggerProps };
}
