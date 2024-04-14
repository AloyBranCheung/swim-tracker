import { describe, it } from "vitest";

describe("helloworld", () => {
    it("should console helloworld", async () => {
        console.log("helloworld")
        console.log(process.env.DATABASE_URL)
    })
})