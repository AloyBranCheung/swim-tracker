import { describe, it, expect } from "vitest";
import dayjs from "dayjs";
//
import { isNextDay } from "@/utils/dayjs";

describe("test dayjs utils", () => {
    it("should return true as it is the next day", () => {
        const timeCompleted = dayjs().year(1900).month(1).date(1).hour(13);

        const result = isNextDay(timeCompleted);

        expect(result).toBe(true);
    })

    it("should return false as it is not the next day", () => {
        const timeCompleted = dayjs(new Date()).add(9999, "years");

        const result = isNextDay(timeCompleted);

        expect(result).toBe(false);
    });

    it("should return true as it was completed 1 day before now", () => {
        const timeCompleted = dayjs(new Date()).subtract(1, 'day')

        const result = isNextDay(timeCompleted);

        expect(result).toBe(true);
    })
});
