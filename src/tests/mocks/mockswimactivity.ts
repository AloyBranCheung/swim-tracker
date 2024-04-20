import { UserSwimActivityLog } from "@prisma/client"
import dayjs from "dayjs"

const mockSwimActivity: UserSwimActivityLog[] = [
    {
        id: "3a0fe8dd-2bc9-444a-858c-37d1166686bf",
        createdAt: dayjs(new Date()).subtract(1, 'day').toDate(),
        updatedAt: dayjs(new Date()).subtract(1, 'day').toDate(),
        totalDistanceSwam: 750,
        unit: "m",
        userId: "testUserId",
    },
    {
        id: "34a55ff7-7c56-417c-94d5-fe9625963df6",
        createdAt: new Date(),
        updatedAt: new Date(),
        totalDistanceSwam: 750,
        unit: "m",
        userId: "testUserId",
    },
]

export default mockSwimActivity