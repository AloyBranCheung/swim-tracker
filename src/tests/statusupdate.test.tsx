import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// components
import StatusUpdate from "@/components/StatusUpdate";

const user = userEvent.setup();

const mockedAction = vi.fn();

vi.mock("react-dom", () => ({
  useFormState: vi.fn(() => [
    {
      msg: "",
      errors: {},
    },
    mockedAction,
  ]),
  useFormStatus: vi.fn(() => ({
    pending: false,
    data: new FormData(),
    method: "post",
    action: mockedAction,
  })),
}));

describe("test statusupdate component", () => {
  it("should count msg.length (10) /280 correctly", async () => {
    render(<StatusUpdate />);

    await user.type(screen.getByRole("textbox"), "test typed");

    expect(screen.queryByText("10/280")).not.toBeNull();
  });
});
