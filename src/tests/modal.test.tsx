import { expect, afterEach, describe, it, vi, beforeAll } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
// components
import Modal from "@/components/Modal";

describe("test Modal component", () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3294
    // not implemented by jsdom
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
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
});
