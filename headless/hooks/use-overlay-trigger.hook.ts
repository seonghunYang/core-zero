import { RefObject } from "react";
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
  const overlayTriggerAriaProps = useOverlayTriggerAria(props, state, ref);

  const { buttonProps: overlayTiggerProps } = useButton(
    overlayTriggerAriaProps.triggerProps,
    ref
  );

  return { overlayTriggerAriaProps, overlayTiggerProps };
}
