import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";

type ExitState = "idle" | "exiting" | "exited";

export function useExitAnimation(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean
) {
  const [isExiting, setIsExiting] = useState(false);
  const [exitState, setExitState] = useState<ExitState>("idle");

  if (!isOpen && ref.current && exitState === "idle") {
    setExitState("exiting");
    setIsExiting(true);
  }

  // 컴포넌트가 제거되면 동작이 완료되었기에 idle로 변경
  if (!ref.current && exitState === "exited") {
    setExitState("idle");
  }

  const handleExitEnd = useCallback(() => {
    setExitState("exited");
    setIsExiting(false);
  }, []);

  useLayoutEffect(() => {
    if (isExiting && ref.current) {
      const computedStyle = window.getComputedStyle(ref.current);
      if (
        computedStyle.animationName &&
        computedStyle.animationName !== "none"
      ) {
        const handleAnimationEnd = (e: AnimationEvent) => {
          if (e.target === ref.current) {
            element.removeEventListener("animationend", handleAnimationEnd);
            flushSync(() => handleExitEnd());
          }
        };
        const element = ref.current;
        element.addEventListener("animationend", handleAnimationEnd);
        return () => {
          element.removeEventListener("animationend", handleAnimationEnd);
        };
      } else {
        handleExitEnd();
      }
    }
  }, [isExiting, ref, handleExitEnd]);

  return isExiting;
}
