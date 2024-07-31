import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Popover } from "headless/components/popover";

function unControlledPopover() {
  return (
    <Popover>
      <Popover.Trigger>click click</Popover.Trigger>
      <Popover.Content>
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  );
}

describe("Uncontrolled Popover", () => {
  it("should render", async () => {
    render(
      <Popover>
        <Popover.Trigger>click click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    );

    expect(screen.getByRole("button")).toHaveTextContent("click click");
  });
});
