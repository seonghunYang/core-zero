import type { Meta, StoryObj } from "@storybook/react";

import { Popover } from ".";
import { useOverlayState } from "../../hooks/use-overlay-state.hook";
import { usePopover } from "../../hooks/use-popover.hook";

const meta = {
  title: "Headless/Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = () => {
  return (
    <>
      <Popover>
        <Popover.Trigger>click click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
};

export const Default: Story = {
  render,
};

export const DefaultValue: Story = {
  render: () => {
    return (
      <>
        <Popover defaultOpen={true}>
          <Popover.Trigger>click click</Popover.Trigger>
          <Popover.Content>
            <div>Popover content</div>
          </Popover.Content>
        </Popover>
      </>
    );
  },
};

export const StateControl: Story = {
  render: () => {
    const { isOpen, setOpen } = usePopover({ defaultOpen: false });

    const handleChange = (isOpen: boolean) => {
      console.log("hi");
      setOpen(isOpen);
    };

    console.log(isOpen);

    return (
      <>
        <Popover isOpen={isOpen} onChange={handleChange}>
          <Popover.Trigger>click click</Popover.Trigger>
          <Popover.Content>
            <div>Popover content</div>
          </Popover.Content>
        </Popover>
      </>
    );
  },
};

// export const TriggerRefControl: Story = {}
