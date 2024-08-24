import { DismissButton, Overlay } from "react-aria";
import { Placement, PopoverContentProps, usePopoverContext } from "./popover";
import React, { forwardRef } from "react";
import { Dialog } from "../dialog/dialog";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "src/types/polymorphic";
import { mergeRef } from "src/utils/merge";
import { InteractionState } from "src/types/interactions";
import { convertDataPropsToState } from "src/utils/interactions";
import { useExitAnimation } from "src/hooks/use-exit-animation.hook";

type PopoverContentChildrenProps = {
  isOpen: boolean;
  placement: Placement;
} & Omit<InteractionState, "isFocus">;

type _PopoverContentProps = {
  children:
    | React.ReactNode
    | ((props: PopoverContentChildrenProps) => React.ReactNode);
};

type polymorphicPopoverContentProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, _PopoverContentProps> &
    Partial<PopoverContentProps>;

type PopoverContentComponent = <C extends React.ElementType = "div">(
  props: polymorphicPopoverContentProps<C>
) => React.ReactNode;

export const PopoverContent: PopoverContentComponent = forwardRef(
  function PopoverContent<C extends React.ElementType = "div">(
    { as, children, ...props }: polymorphicPopoverContentProps<C>,
    ref: PolymorphicRef<C>
  ) {
    const popoverContext = usePopoverContext();

    const isCompound = popoverContext !== null;
    const mergedProps = isCompound
      ? { ...popoverContext?.popoverContentProps, ...props }
      : props;

    const {
      isOpen,
      underlayProps,
      popoverProps,
      arrowProps,
      overlayProps,
      onClose,
      placement,
      onOpen,
      onToggle,
      ...restProps
    } = mergedProps;

    const Element = as || "div";

    const isExiting = useExitAnimation(
      mergeRef(ref, popoverContext?.popoverRef),
      isOpen ?? false
    );

    console.log("isExiting", isExiting);
    const renderProps = convertDataPropsToContentRenderProps();

    return (
      <>
        {(isOpen || isExiting) && (
          <Overlay>
            <div
              {...underlayProps}
              style={{
                ...underlayProps?.style,
                position: "fixed",
                inset: 0,
              }}
            />
            <Element
              {...popoverProps}
              {...restProps}
              style={{
                ...popoverProps?.style,
              }}
              ref={mergeRef(ref, popoverContext?.popoverRef)}
            >
              <DismissButton onDismiss={onClose} />
              <Dialog {...overlayProps}>
                {typeof children === "function"
                  ? children({
                      ...renderProps,
                    })
                  : children}
              </Dialog>
              <DismissButton onDismiss={onClose} />
            </Element>
          </Overlay>
        )}
      </>
    );

    function convertDataPropsToContentRenderProps(): PopoverContentChildrenProps {
      const interactionState = convertDataPropsToState(mergedProps);

      return {
        ...interactionState,
        placement: placement ?? "bottom",
        isOpen: isOpen ?? false,
      };
    }
  }
);
