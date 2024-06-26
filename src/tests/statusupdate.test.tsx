import { describe, it, expect, vi, afterEach, beforeAll } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
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
  beforeAll(() => {
    /* 
    Silence below warning because jsdom/vitest is not vary compatible testing next14
    Warning: Invalid value for prop `action` on <form> tag. Either remove it
    from the element, or pass a string or number value to keep it in the DOM.
    For details, see https://reactjs.org/link/attribute-behavior
    */
    window.global.console = {
      ...window.global.console,
      error: vi.fn(),
    };
  });
  afterEach(() => {
    cleanup(); // remove duplicate renders
  });

  it("should count msg.length (10) /280 correctly", async () => {
    render(<StatusUpdate />);

    await user.type(screen.getByRole("textbox"), "test typed");
    const form = screen.getByTestId("statusupdateform");

    fireEvent.submit(form);

    expect(screen.queryByText("10/280")).not.toBeNull();
  });

  it("should show validation err msg", async () => {
    const mockedReactdom = await import("react-dom");
    // server returns err msg
    mockedReactdom.useFormState = vi.fn(() => [
      {
        msg: "",
        errors: { msg: ["String must contain at least 1 character(s)"] },
        success: false,
      },
      mockedAction,
      false,
    ]);

    render(<StatusUpdate />);

    await user.click(screen.getByRole("textbox"));

    expect(screen.queryByText("0/280")).not.toBeNull();
    expect(
      screen.queryByText("String must contain at least 1 character(s)"),
    ).not.toBeNull();
  });
});
