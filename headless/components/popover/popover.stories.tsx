import type { Meta, StoryObj } from "@storybook/react";

import { Popover } from ".";
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

export const Default: Story = {
  render,
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

export const StateControlWithoutHook: Story = {
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

export const StateControl: Story = {
  render: () => {
    const { rootProps, triggerProps } = usePopover({ defaultOpen: false });

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

export const LogicControl: Story = {
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

// export const LogicControl2: Story = {
//   render: () => {
//     const { getRootProps, close } = usePopover({
//       defaultOpen: false,
//       onClose: () => console.log("close"),
//     });

//     const handleClose = () => {
//       // console.log("close");
//       close();
//     };

//     return (
//       <>
//         <Popover
//           {...getRootProps({
//             onClose: handleClose,
//           })}
//         >
//           <Popover.Trigger>click click</Popover.Trigger>
//           <Popover.Content>
//             <div>Popover content</div>
//           </Popover.Content>
//         </Popover>
//       </>
//     );
//   },
// };

export const TriggerRefControl: Story = {
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
