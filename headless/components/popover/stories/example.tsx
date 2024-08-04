import { Popover } from "..";

export function Simple() {
  return (
    <Popover>
      <Popover.Trigger>click</Popover.Trigger>
      <Popover.Content>
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  );
}
