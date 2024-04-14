import { beforeEach } from "vitest";
import resetDb from "../utils/resetdb";
import prisma from "../utils/prisma";
import mockUser from "../mocks/mockuser";

beforeEach(async () => {
    await resetDb();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = mockUser
    await prisma.user.create({
        data: {
            ...rest
        }
    })
})