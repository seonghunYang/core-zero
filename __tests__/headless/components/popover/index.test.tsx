import { PopoverTestTemplate } from "./popover-test-template";
import * as Stories from "headless/components/popover/popover.stories";
import { makeStoriesTotestability } from "__tests__/utils/story";

const TestStories = makeStoriesTotestability(Stories);

const template = PopoverTestTemplate();

template(TestStories.Simple);

template(TestStories.SimpleControl);

template(TestStories.ControlWithHook);

template(TestStories.CustomLogic);

template(TestStories.CustomComponent);

template(TestStories.CustomComponentWithRef);

template(TestStories.PolymorphicComponent);

template(TestStories.PolymorphicComponentWithRef);

template(TestStories.WithoutCompoundComponent);

// template(TestStories.WithoutCompoundComponentWithCustomRef);
