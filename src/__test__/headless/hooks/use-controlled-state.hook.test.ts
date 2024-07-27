import { describe, expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useControlledState } from "../../../headless/hooks/use-controlled-state.hook";
import { act } from "react";

describe("useControlledState", () => {
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
});
