import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Popover } from "headless/components/popover";

function unControlledPopover() {
  return (
    <Popover>
      <Popover.Trigger>click</Popover.Trigger>
      <Popover.Content>
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  );
}

describe("Uncontrolled Popover", () => {
  it("should render", async () => {
    render(unControlledPopover());

    expect(screen.getByRole("button")).toHaveTextContent("click");
  });

  it("open and close with trigger button", async () => {
    render(unControlledPopover());

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    act(() => {
      screen.getByText("click").click();
    });

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    act(() => {
      screen.getByText("click").click();
    });

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });
});
