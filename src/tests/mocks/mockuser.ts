import { User } from '@prisma/client'
import mockSession from "./mocksession";
const date = new Date();

const mockUser: User = {
    id: 'testuuid',
    email: "test@test.com",
    name: "test",
    auth0Id: "auth0test|1234",
    createdAt: date,
    updatedAt: date,
}

export const mockGetUserAction = {
    dbUsr: mockUser,
    auth0Usr: mockSession.user
}

export default mockUser