import { act, renderHook } from "@testing-library/react";
import { useControlledState } from "../../../src/hooks/use-controlled-state.hook";
import { useState } from "react";

function controlledHook(props?: { onChange?: (v: boolean) => void }) {
  const [_value, _setValue] = useState(false);
  const [value, setValue] = useControlledState({
    value: _value,
    defaultValue: _value,
    onChange: (v) => {
      props?.onChange && props.onChange(v);
      _setValue(v);
    },
  });
  return {
    value,
    setValue,
    _setValue,
  };
}

describe("useControlledState", () => {
  describe("unControlled", () => {
    it("unControl", () => {
      const { result } = renderHook(() => {
        const [value, setValue] = useControlledState({ defaultValue: false });
        return {
          value,
          setValue,
        };
      });

      act(() => {
        result.current.setValue(true);
      });

      expect(result.current.value).toBe(true);
    });

    it("control-function callback-onChangeCallback", () => {
      const { result } = renderHook(() => {
        const [callbackCall, setCallbackCall] = useState(false);

        return {
          callbackCall,
          ...controlledHook({
            onChange: (v) => {
              setCallbackCall(v);
            },
          }),
        };
      });

      act(() => {
        result.current.setValue((v) => !v);
      });

      expect(result.current.value).toBe(true);
      expect(result.current.callbackCall).toBe(true);
    });
  });

  describe("controlled", () => {
    it("control", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      expect(result.current.value).toBe(false);
    });

    it("control-internal hook", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      act(() => {
        result.current.setValue(true);
      });

      expect(result.current.value).toBe(true);
    });

    it("control-external hook", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      act(() => {
        result.current._setValue(true);
      });

      expect(result.current.value).toBe(true);
    });

    it("control-function callback", () => {
      const { result } = renderHook(() => ({
        ...controlledHook(),
      }));

      act(() => {
        result.current.setValue((v) => !v);
      });

      expect(result.current.value).toBe(true);
    });

    it("unControl-function callback-onChangeCallback", () => {
      const { result } = renderHook(() => {
        const [callbackCall, setCallbackCall] = useState(false);
        const [value, setValue] = useControlledState({
          defaultValue: false,
          onChange: (v) => setCallbackCall(v),
        });
        return {
          callbackCall,
          value,
          setValue,
        };
      });

      act(() => {
        result.current.setValue((v) => !v);
      });

      expect(result.current.value).toBe(true);
      expect(result.current.callbackCall).toBe(true);
    });
  });
});
