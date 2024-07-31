import { render, screen } from "@testing-library/react";
import { Popover } from "headless/components/popover";
import userEvent from "@testing-library/user-event";
import { usePopover } from "headless/hooks/use-popover.hook";

function ControlledPopoverWithChangeCallback() {
  const { isOpen, setOpen } = usePopover({ defaultOpen: false });

  const handleChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <>
      <Popover isOpen={isOpen} onChange={handleChange}>
        <Popover.Trigger>click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}

describe("controlled Popover", () => {
  it("should render", async () => {
    render(<ControlledPopoverWithChangeCallback />);

    expect(screen.getByRole("button")).toHaveTextContent("click");
  });

  it("open and close with trigger button", async () => {
    const user = userEvent.setup();

    render(<ControlledPopoverWithChangeCallback />);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.click(screen.getByText("click"));

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });
});
