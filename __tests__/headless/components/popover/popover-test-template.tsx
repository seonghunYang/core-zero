import { StoryObj } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

type TestStory = StoryObj & {
  name: string;
};

export function PopoverTestTemplate() {
  return (story: TestStory) => {
    const Component = story.render;

    if (!Component) {
      throw new Error("Story should have a render function");
    }

    describe(`${story.name}`, () => {
      it("should render", async () => {
        render(<Component />);

        expect(screen.getByRole("button")).toHaveTextContent("click");
      });

      it("open and close with trigger button", async () => {
        const user = userEvent.setup();

        render(<Component />);

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

        await user.click(screen.getByText("click"));

        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await user.click(screen.getByText("click"));

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });

      it("open and close with outside click", async () => {
        const user = userEvent.setup();

        render(<Component />);

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

        await user.click(screen.getByText("click"));

        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await user.click(document.body);

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });

      it("open and close with escape key", async () => {
        const user = userEvent.setup();

        render(<Component />);

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

        await user.click(screen.getByText("click"));

        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await user.keyboard("{Escape}");

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });

      it("open and close with enter and escape key", async () => {
        const user = userEvent.setup();

        render(<Component />);

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

        screen.getByText("click").focus();
        await user.keyboard("{Enter}");

        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await user.keyboard("{Escape}");

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });

      it("open and close with space and escape key", async () => {
        const user = userEvent.setup();

        render(<Component />);

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

        screen.getByText("click").focus();
        await user.keyboard(" ");

        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await user.keyboard("{Escape}");

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });
  };
}
