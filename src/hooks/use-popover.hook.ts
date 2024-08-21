import { useRef } from "react";
import { OverlayState, useOverlayState } from "./use-overlay-state.hook";
import { AriaPopoverProps, usePopover as usePopoverAria } from "react-aria";
import {
  PopoverAriaWithoutCenter,
  PopoverContentPropsWithRef,
  PopoverProps,
  PopoverRoot,
  PopoverTriggerDataProps,
  PopoverTriggerPropsWithRef,
} from "../components/popover/popover";
import { useOverlayTrigger } from "./use-overlay-trigger.hook";
import { useInteractions } from "./use-interactions.hook";
import { mergeProps } from "src/utils/merge";
import { InteractionDataProps } from "src/types/interactions";

interface UsePopoverReturn<T extends Element, C extends Element>
  extends OverlayState {
  rootProps: PopoverRoot<T, C>;
  triggerProps: PopoverTriggerPropsWithRef<T>;
  popoverContentProps: PopoverContentPropsWithRef<C>;
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

  const {
    interactionProps: triggerInteractionProps,
    interactionDataProps: triggerInteractionDataProps,
  } = useInteractions({
    ref: triggerRef,
  });

  const triggerProps = {
    ...mergeProps(overlayTiggerProps, triggerInteractionProps),
    ...createTriggerDataProps(triggerInteractionDataProps),
    ref: triggerRef,
  };

  const callbacks = {
    onClose: state.close,
    onOpen: state.open,
    onToggle: state.toggle,
  };

  const popoverContentProps = {
    isOpen: state.isOpen,
    ...callbacks,
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

  function createTriggerDataProps(
    interactionDataProps: InteractionDataProps
  ): PopoverTriggerDataProps {
    const result: PopoverTriggerDataProps = { ...interactionDataProps };

    if (state.isOpen) {
      result["data-open"] = "";
    }

    return result;
  }
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
