import { beforeAll, vi } from "vitest";
import { mockReset } from "vitest-mock-extended";

beforeAll(() => {
    mockReset(auth)
})


export const auth = vi.fn()