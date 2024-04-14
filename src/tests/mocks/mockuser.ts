import mockSession from "./mocksession";
const date = new Date();

const mockUser = {
    id: 1,
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