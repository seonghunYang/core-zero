import { mergeProps } from "headless/utils";
import { useState } from "react";
import { useFocus, useHover, usePress } from "react-aria";

interface UseInteractionsArgs {
  ref: React.RefObject<Element>;
}

interface UseInteractionsReturn {
  interactionProps: React.DOMAttributes<Element>;
  interactionState: {
    isFocus: boolean;
    isPressed: boolean;
    isHovered: boolean;
  };
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

  return {
    interactionProps,
    interactionState: {
      isFocus,
      isPressed,
      isHovered,
    },
  };
}
