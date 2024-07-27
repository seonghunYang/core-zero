import { PopoverRoot } from "./popover";
import { PopoverTrigger } from "./popover-trigger";
import { PopoverContent } from "./popover-content";

const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});

export { Popover, PopoverRoot, PopoverTrigger, PopoverContent };
