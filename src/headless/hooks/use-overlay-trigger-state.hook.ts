import { useCallback } from "react";
import { useControlledState } from "./use-controlled-state.hook";

export interface OverlayProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface OverlayState {
  readonly isOpen: boolean;
  setOpen(isOpen: boolean): void;
  open(): void;
  close(): void;
  toggle(): void;
}

export function useOverlayState(props: OverlayProps): OverlayState {
  const [isOpen, setOpen] = useControlledState({
    value: props.isOpen,
    defaultValue: props.defaultOpen ?? false,
    onChange: props.onOpenChange,
  });

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);

  return {
    isOpen,
    setOpen,
    open,
    close,
    toggle,
  };
}
