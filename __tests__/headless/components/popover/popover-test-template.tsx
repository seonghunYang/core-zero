import userEvent from "@testing-library/user-event";
import { TestStory } from "__tests__/utils/story";
import { render, screen, within } from "__tests__/utils/test-uitls";
import { act } from "react";

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

        act(() => {
          screen.getByText("click").focus();
        });
        await user.keyboard("{Enter}");

        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await user.keyboard("{Escape}");

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });

      it("open and close with space and escape key", async () => {
        const user = userEvent.setup();

        render(<Component />);

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

        // screen.getho
        act(() => {
          screen.getByText("click").focus();
        });
        await user.keyboard(" ");

        expect(screen.getByText("Popover content")).toBeInTheDocument();

        await user.keyboard("{Escape}");

        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });

    describe("interaction", () => {
      it("hover trigger button", async () => {
        const user = userEvent.setup();
        render(<Component />);

        const tirggerButton = screen.getByText("click");

        expect(tirggerButton.dataset.hover).toBe("false");

        await user.hover(tirggerButton);

        expect(tirggerButton.dataset.hover).toBe("true");
        // within(tirggerButton).getByDataHover("true");
      });
    });
  };
}
