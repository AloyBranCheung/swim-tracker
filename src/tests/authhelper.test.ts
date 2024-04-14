import mockSession from './mocks/mocksession'
import { auth } from '@/auth/auth-helper'
import { describe, it, vi, expect } from 'vitest'

vi.mock('next-auth')

describe('test auth helper', () => {
    it('should return session', async () => {
        const mockNextAuth = await import('next-auth')
        mockNextAuth.getServerSession = vi.fn().mockReturnValue(mockSession)
        const session = auth();

        expect(session).toEqual(mockSession)
    })
    it('should not return session', async () => {
        const mockNextAuth = await import('next-auth')
        mockNextAuth.getServerSession = vi.fn().mockReturnValue(null)

        const session = auth();

        expect(session).toBeNull()

    })
})