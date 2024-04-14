import { beforeAll, vi } from 'vitest'
import { mockReset } from 'vitest-mock-extended'

beforeAll(() => {
    mockReset(getUserAction)
})

const getUserAction = vi.fn()

export default getUserAction