import { render, screen } from "@testing-library/react";
import { Popover } from "headless/components/popover";
import userEvent from "@testing-library/user-event";
import { usePopover } from "headless/hooks/use-popover.hook";
import { useRef } from "react";

function ControlledTriggerPopover() {
  const ref = useRef<HTMLDivElement>(null);
  const { rootProps, triggerProps } = usePopover({
    defaultOpen: false,
    triggerRef: ref,
  });

  return (
    <>
      <Popover {...rootProps}>
        <div {...triggerProps}>click</div>
        {/* <Popover.Trigger as="div" ref={ref}>
            click
          </Popover.Trigger> */}
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}

describe("controlled Trigger Popover", () => {
  it("should render", async () => {
    render(<ControlledTriggerPopover />);

    expect(screen.getByRole("button")).toHaveTextContent("click");
  });

  it("open and close with trigger button", async () => {
    const user = userEvent.setup();

    render(<ControlledTriggerPopover />);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("open and close with outside click", async () => {
    const user = userEvent.setup();

    render(<ControlledTriggerPopover />);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("open and close with escape key", async () => {
    const user = userEvent.setup();

    render(<ControlledTriggerPopover />);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });
});
