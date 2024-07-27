import type { Meta, StoryObj } from "@storybook/react";

import { Popover } from "./popover";
import React from "react";
import { useOverlayTriggerState } from "../../hooks/use-overlay-trigger-state.hook";

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
  const state = useOverlayTriggerState({ defaultOpen: false });
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={triggerRef}>click</button>
      <Popover triggerRef={triggerRef} state={state}>
        <div>Popover content</div>
      </Popover>
    </>
  );
};

export const Default: Story = {
  render,
};
