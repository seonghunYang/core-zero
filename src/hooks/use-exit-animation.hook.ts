import { RefObject, useCallback, useLayoutEffect, useState } from "react";

type ExitState = "idle" | "exiting" | "exited";

export function useExitAnimation(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean
) {
  const [isExiting, setIsExiting] = useState(false);
  const [exitState, setExitState] = useState<ExitState>("idle");

  if (!isOpen && ref.current && exitState === "idle") {
    // 바로 값을 넘겨줘야함
    // isExiting = true;
    setExitState("exiting");
    setIsExiting(true);
  }

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
      console.log("computedStyle", computedStyle.animation);
      console.log("computedStyle", computedStyle.animationName);
      if (
        computedStyle.animationName &&
        computedStyle.animationName !== "none"
      ) {
        const handleAnimationEnd = (e: AnimationEvent) => {
          if (e.target === ref.current) {
            element.removeEventListener("animationend", handleAnimationEnd);
            handleExitEnd();
          }
        };

        const element = ref.current;
        element.addEventListener("animationend", handleAnimationEnd);
        return () => {
          element.removeEventListener("animationend", handleAnimationEnd);
        };
      }
    } else {
      handleExitEnd();
    }
  }, [isExiting, ref, handleExitEnd]);

  return isExiting;
}
