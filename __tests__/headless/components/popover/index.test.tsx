import { PopoverTestTemplate } from "./popover-test-template";
import * as Stories from "headless/components/popover/popover.stories";

const tempalate = PopoverTestTemplate();

Object.entries(Stories).forEach(([name, story]) => {
  if (name === "default") return;

  tempalate({ ...story, name });
});
