import type { Meta, StoryObj } from "@storybook/react";

import { Popover, PopoverContent, PopoverTrigger } from ".";
import { usePopover } from "../../hooks/use-popover.hook";
import { useRef, useState } from "react";

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

export const Simeple: Story = {
  render: () => {
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
  },
};

export const DefaultValue: Story = {
  render: () => {
    return (
      <>
        <Popover defaultOpen={true}>
          <Popover.Trigger>click click</Popover.Trigger>
          <Popover.Content>This is the content of the popover.</Popover.Content>
        </Popover>
      </>
    );
  },
};

export const SimpleControl: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(false);

    const handleChange = (isOpen: boolean) => {
      setOpen(isOpen);
    };
    return (
      <>
        <Popover isOpen={isOpen} onChange={handleChange}>
          <Popover.Trigger>click click</Popover.Trigger>
          <Popover.Content>This is the content of the popover.</Popover.Content>
        </Popover>
      </>
    );
  },
};

export const ControlWithHook: Story = {
  render: () => {
    const { rootProps } = usePopover({ defaultOpen: false });

    return (
      <>
        <Popover {...rootProps}>
          <Popover.Trigger>click click</Popover.Trigger>
          <Popover.Content>
            <div>Popover content</div>
          </Popover.Content>
        </Popover>
      </>
    );
  },
};

export const CustomLogic: Story = {
  render: () => {
    const { rootProps, close } = usePopover({
      defaultOpen: false,
      onClose: () => console.log("close"),
    });

    const handleClose = () => {
      // console.log("close");
      close();
    };

    return (
      <>
        <Popover {...rootProps} onClose={handleClose}>
          <Popover.Trigger>click click</Popover.Trigger>
          <Popover.Content>
            <button onClick={handleClose}>hi</button>
            <div>Popover content</div>
          </Popover.Content>
        </Popover>
      </>
    );
  },
};

export const CustomComponent: Story = {
  render: () => {
    const { rootProps, triggerProps } = usePopover<HTMLDivElement>({
      defaultOpen: false,
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
  },
};

export const CustomComponentWithRef: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const { rootProps, triggerProps } = usePopover({
      defaultOpen: false,
      triggerRef: ref,
    });

    return (
      <>
        <Popover {...rootProps}>
          <div {...triggerProps}>click</div>
          <Popover.Content>
            <div>Popover content</div>
          </Popover.Content>
        </Popover>
      </>
    );
  },
};

export const PolymorphicComponent: Story = {
  render: () => {
    const { rootProps } = usePopover<HTMLDivElement>({
      defaultOpen: false,
    });

    return (
      <>
        <Popover {...rootProps}>
          <Popover.Trigger as="div">click</Popover.Trigger>
          <Popover.Content>
            <div>Popover content</div>
          </Popover.Content>
        </Popover>
      </>
    );
  },
};

// 궁극적인 완성, 이게 동작해야지 완전히 커스텀 가능한 것
export const WithoutCompoundComponent: Story = {
  render: () => {
    const { triggerProps, popoverProps } = usePopover<HTMLDivElement>({
      defaultOpen: false,
    });

    return (
      <>
        <div>
          <PopoverTrigger as='div' {...triggerProps}>click</PopoverTrigger>
          <PopoverContent {...popoverProps}>
            <div>Popover content</div>
          </PopoverContent>
        </div>
      </>
    );
  },
};
