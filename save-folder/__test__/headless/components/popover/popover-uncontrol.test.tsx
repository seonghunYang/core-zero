import { act, render, screen } from "@testing-library/react";
import { Popover } from "@/save-folder/headless/components/popover";
import "@testing-library/jest-dom";

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
