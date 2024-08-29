import type { Meta, StoryObj } from "@storybook/react";

import { Popover, PopoverContent, PopoverTrigger } from ".";
import { usePopover } from "../../hooks/use-popover.hook";
import { forwardRef, RefObject, useRef, useState } from "react";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

const meta = {
  title: "src/Components/Popover",
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example() {
  const { triggerProps, popoverContentProps } = usePopover({
    defaultOpen: false,
  });

  return (
    <>
      <PopoverTrigger {...triggerProps} as={MyCustomButton}>
        click
      </PopoverTrigger>
      <PopoverContent {...popoverContentProps}>
        <div>Popover content</div>
      </PopoverContent>
    </>
  );
}

export const Examples: Story = {
  render: Example,
};

export const Simple: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger>click</Popover.Trigger>
      <Popover.Content>
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  ),
};

export const Styling: Story = {
  render: () => (
    <Popover offset={5}>
      <Popover.Trigger className="block text-sm/6 border rounded-lg px-3 border-black/50 font-semibold text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
        popover
      </Popover.Trigger>
      <Popover.Content className="w-52 rounded-xl bg-black/5 text-sm/6 data-[closed]:animate-opacity-show-reverse data-[open]:animate-opacity-show">
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  ),
};

export const Transtition: Story = {
  render: () => (
    <Popover offset={5}>
      <Popover.Trigger className="block text-sm/6 border rounded-lg px-3 border-black/50 font-semibold text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
        popover
      </Popover.Trigger>
      <Popover.Content className="w-52 rounded-xl bg-black/5 text-sm/6 opacity-0 transition duration-200 ease-in-out data-[open]:-translate-y-1 data-[open]:opacity-100">
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  ),
};

export const Placement: Story = {
  render: () => (
    <Popover placement={"left"}>
      <Popover.Trigger>click</Popover.Trigger>
      <Popover.Content>
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  ),
};

export const Offset: Story = {
  render: () => (
    <Popover offset={50}>
      <Popover.Trigger>click</Popover.Trigger>
      <Popover.Content>
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  ),
};

export const RenderProps: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        {({ isOpen, isHovered, isActive, isFocus }) => (
          <>
            <div>isOpen: {isOpen ? "true" : "false"}</div>
            <div>isHoverd: {isHovered ? "true" : "false"}</div>
            <div>isActive: {isActive ? "true" : "false"}</div>
            <div>isFocus: {isFocus ? "true" : "false"}</div>
          </>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {({ isOpen, isHovered, isActive, placement }) => (
          <>
            <div>isOpen: {isOpen ? "true" : "false"}</div>
            <div>isHoverd: {isHovered ? "true" : "false"}</div>
            <div>isActive: {isActive ? "true" : "false"}</div>
            <div>{placement}</div>
          </>
        )}
      </Popover.Content>
    </Popover>
  ),
};

export const RenderPropsStyling: Story = {
  render: () => (
    <Popover placement="top">
      <Popover.Trigger>click</Popover.Trigger>
      <Popover.Content>
        {({ placement }) => (
          <>
            <ChevronUpIcon
              className={clsx(
                "w-6 h-6 text-black/50",
                placement === "top" && "rotate-180",
                placement === "left" && "rotate-90",
                placement === "top" && "rotate-270"
              )}
            />
            <div>{placement}</div>
          </>
        )}
      </Popover.Content>
    </Popover>
  ),
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
          <Popover.Trigger>click</Popover.Trigger>
          <Popover.Content>Popover content</Popover.Content>
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
          <Popover.Trigger>click</Popover.Trigger>
          <Popover.Content>
            <div>Popover content</div>
          </Popover.Content>
        </Popover>
      </>
    );
  },
};

export const PlacementAndOffsetWithHook: Story = {
  render: () => {
    const { rootProps } = usePopover({
      defaultOpen: false,
      placement: "left",
      offset: 50,
    });

    return (
      <Popover {...rootProps}>
        <Popover.Trigger>click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    );
  },
};

export const CustomLogic: Story = {
  render: () => {
    const { rootProps, close } = usePopover({
      defaultOpen: false,
    });

    const handleClose = () => {
      // logger.click("...")
      console.log("hi");
      close();
    };

    return (
      <Popover {...rootProps} onClose={handleClose}>
        <Popover.Trigger>click</Popover.Trigger>
        <Popover.Content>
          <button onClick={handleClose}>hi</button>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
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
      <Popover {...rootProps}>
        <div {...triggerProps}>click</div>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    );
  },
};

export const PolymorphicComponent: Story = {
  render: () => {
    const { rootProps } = usePopover({
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

export const PolymorphicComponentWithRef: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const { rootProps } = usePopover({
      defaultOpen: false,
      triggerRef: ref,
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
    const { triggerProps, popoverContentProps } = usePopover<HTMLDivElement>({
      defaultOpen: false,
    });

    return (
      <div>
        <PopoverTrigger as="div" {...triggerProps}>
          click
        </PopoverTrigger>
        <PopoverContent {...popoverContentProps} placement="left">
          <div>Popover content</div>
        </PopoverContent>
      </div>
    );
  },
};

export const WithoutCompoundComponentAndCustomComponent: Story = {
  render: () => {
    const { triggerProps, popoverContentProps } = usePopover<HTMLButtonElement>(
      {
        defaultOpen: false,
      }
    );

    return (
      <>
        <div>
          <button {...triggerProps}>click</button>
          <PopoverContent {...popoverContentProps}>
            <div>Popover content</div>
          </PopoverContent>
        </div>
      </>
    );
  },
};

export const WithoutCompoundComponentWithCustomRef: Story = {
  render: () => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLSpanElement>(null);
    const { triggerProps, popoverContentProps } = usePopover({
      defaultOpen: false,
      triggerRef,
      popoverRef,
    });

    return (
      <>
        <div>
          <PopoverTrigger as="div" {...triggerProps}>
            click
          </PopoverTrigger>
          <PopoverContent as="span" {...popoverContentProps}>
            <div>Popover content</div>
          </PopoverContent>
        </div>
      </>
    );
  },
};

const MyCustomButton = forwardRef<HTMLButtonElement, any>(function (props, ref) {
  return <button className="..." ref={ref} {...props} />;
});

export const PolymorphicOwnCustomComponent: Story = {
  render: () => {
    const { triggerProps, popoverContentProps } = usePopover({
      defaultOpen: false,
    });

    return (
      <>
        <PopoverTrigger {...triggerProps} as={MyCustomButton}>
          click
        </PopoverTrigger>
        <PopoverContent {...popoverContentProps}>
          <div>Popover content</div>
        </PopoverContent>
      </>
    );
  },
};
