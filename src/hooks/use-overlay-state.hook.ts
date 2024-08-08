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

export interface OverlayCallback {
  onOpen(): void;
  onClose(): void;
  onToggle(): void;
}

type UseOverlayStateArgs = Partial<OverlayCallback> & OverlayProps;

export function useOverlayState(props: UseOverlayStateArgs): OverlayState {
  const [isOpen, setOpen] = useControlledState({
    value: props.isOpen,
    defaultValue: props.defaultOpen ?? false,
    onChange: props.onOpenChange,
  });

  const open = useCallback(() => {
    setOpen(true);
    props.onOpen?.();
  }, [setOpen, props.onOpen]);

  const close = useCallback(() => {
    setOpen(false);
    props.onClose?.();
  }, [setOpen, props.onClose]);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
    props.onToggle?.();
  }, [setOpen, isOpen, props.onToggle]);

  return {
    isOpen,
    setOpen,
    open,
    close,
    toggle,
  };
}
