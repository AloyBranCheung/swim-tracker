import { expect, afterEach, describe, it, vi, beforeAll } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// components
import Modal from "@/components/Modal";

const user = userEvent.setup();

describe("test Modal component", () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3294
    // not implemented by jsdom
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    // @ts-expect-error - not implemented by jsdom
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    cleanup(); // remove duplicate renders
  });

  it("should render modal", () => {
    render(
      <div>
        <Modal isOpen={true} onClose={() => {}}>
          <div>helloworld</div>
        </Modal>
      </div>,
    );

    expect(screen.queryByText("helloworld")).not.toBeNull();
  });

  it("should not show modal contents", () => {
    render(
      <div>
        <Modal isOpen={false} onClose={() => {}}>
          <div>helloworld</div>
        </Modal>
      </div>,
    );

    expect(screen.queryByText("helloworld")).toBeNull();
  });

  it("should fire the onClose once", async () => {
    const mockClose = vi.fn();
    render(
      <div>
        <Modal isOpen={true} onClose={mockClose}>
          <div>helloworld</div>
        </Modal>
      </div>,
    );

    await user.click(screen.getByAltText("exit icon"));

    expect(mockClose).toHaveBeenCalledOnce();
  });
});
