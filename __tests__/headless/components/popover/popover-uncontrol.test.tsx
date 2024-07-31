import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Popover } from "headless/components/popover";
import userEvent from "@testing-library/user-event";

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
    const user = userEvent.setup();

    render(unControlledPopover());

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("open and close with outside click", async () => {
    const user = userEvent.setup();

    render(unControlledPopover());

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("open and close with escape key", async () => {
    const user = userEvent.setup();

    render(unControlledPopover());

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });
});
