import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// components
import AuthGuard from "@/auth/AuthGuard";

vi.mock("../auth/auth-helper.ts");

describe("helloworld test", () => {
  it("should render helloworld", async () => {
    const authHelper = await import("../auth/auth-helper");
    authHelper.auth = vi.fn().mockReturnValue({
      user: {
        email: "test@test.com",
      },
    });

    render(
      await AuthGuard({
        children: <div>helloworld</div>,
      }),
    );

    await expect(screen.getByText("helloworld")).toBeDefined();
    await expect(screen.queryAllByText("Access Denied").length).toBe(0);
  });

  it("should NOT render helloworld", async () => {
    const authHelper = await import("../auth/auth-helper");
    authHelper.auth = vi.fn().mockReturnValue(null);

    render(
      await AuthGuard({
        children: <div>helloworld</div>,
      }),
    );

    await expect(screen.getByText("Login")).toBeDefined();
    await expect(screen.getAllByText("Access Denied").length).toBe(5);
    await expect(screen.getAllByText("Access Denied")).toBeDefined();
  });
});
