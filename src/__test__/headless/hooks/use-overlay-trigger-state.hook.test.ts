import { describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

import { useOverlayTriggerState } from "../../../headless/hooks/use-overlay-trigger-state.hook";
import { useState } from "react";

function controlledHook(props?: { onChange?: (v: boolean) => void }) {
  const [_isOpen, _setOpen] = useState(false);
  return {
    _isOpen,
    ...useOverlayTriggerState({
      isOpen: _isOpen,
      onOpenChange: (isOpen) => {
        props?.onChange && props.onChange(isOpen);
        _setOpen(isOpen);
      },
    }),
  };
}

describe("useOverlayTriggerState", () => {
  describe("unControlled", () => {
    it("unControl", () => {
      const { result } = renderHook(() => {
        const { isOpen, setOpen } = useOverlayTriggerState({
          defaultOpen: false,
        });
        return {
          isOpen,
          setOpen,
        };
      });

      expect(result.current.isOpen).toBe(false);
    });

    it("setOpen(true)", () => {
      const { result } = renderHook(() => ({
        ...useOverlayTriggerState({
          defaultOpen: false,
        }),
      }));

      act(() => {
        result.current.setOpen(true);
      });

      expect(result.current.isOpen).toBe(true);
    });

    it("open", () => {
      const { result } = renderHook(() => ({
        ...useOverlayTriggerState({
          defaultOpen: false,
        }),
      }));

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it("close", () => {
      const { result } = renderHook(() => ({
        ...useOverlayTriggerState({
          defaultOpen: false,
        }),
      }));

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it("open and close", () => {
      const { result } = renderHook(() => ({
        ...useOverlayTriggerState({
          defaultOpen: false,
        }),
      }));

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it("toggle", () => {
      const { result } = renderHook(() => ({
        ...useOverlayTriggerState({
          defaultOpen: false,
        }),
      }));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("Controlled", () => {
    it("control", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      expect(result.current.isOpen).toBe(false);
      expect(result.current._isOpen).toBe(false);
    });

    it("setOpen(true)", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      act(() => {
        result.current.setOpen(true);
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current._isOpen).toBe(true);
    });

    it("open", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current._isOpen).toBe(true);
    });

    it("open and close", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current._isOpen).toBe(true);

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current._isOpen).toBe(false);
    });

    it("toggle", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current._isOpen).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current._isOpen).toBe(false);
    });
  });
});
