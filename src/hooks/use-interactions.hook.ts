import { InteractionDataProps, InteractionState } from "src/types/interactions";
import { mergeProps } from "src/utils/merge";
import { useState } from "react";
import { useFocus, useHover, usePress } from "react-aria";

interface UseInteractionsArgs {
  ref: React.RefObject<Element>;
}

interface UseInteractionsReturn {
  interactionProps: React.DOMAttributes<Element>;
  interactionState: InteractionState;
  interactionDataProps: InteractionDataProps;
}

export function useInteractions({
  ref,
}: UseInteractionsArgs): UseInteractionsReturn {
  const [isFocus, setFocus] = useState(false);

  const { isPressed, pressProps } = usePress({
    ref,
  });
  const { focusProps } = useFocus({
    onFocusChange: setFocus,
  });

  const { hoverProps, isHovered } = useHover({});

  const interactionProps = mergeProps(pressProps, focusProps, hoverProps);

  const interactionState = {
    isFocus,
    isActive: isPressed,
    isHovered,
  };

  const interactionDataProps = createDataProps(interactionState);

  return {
    interactionProps,
    interactionState,
    interactionDataProps,
  };

  function createDataProps(interactionState: InteractionState) {
    const result: InteractionDataProps = {};

    if (interactionState.isActive) {
      result["data-active"] = "";
    }

    if (interactionState.isFocus) {
      result["data-focus"] = "";
    }

    if (interactionState.isHovered) {
      result["data-hover"] = "";
    }

    return result;
  }
}
