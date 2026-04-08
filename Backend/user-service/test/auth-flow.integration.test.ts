const request = require('supertest');
import app from '../index';
import prisma from '../src/utils/prismaClient';
import { hashPassword } from '../src/utils/auth';

jest.mock('../src/utils/prismaClient', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('Auth Flow Integration', () => {
  const mockedPrisma = prisma as unknown as {
    user: {
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };

  const userState = {
    id: 'user-1',
    email: 'flow@example.com',
    password: '',
    role: 'ADMIN',
    firstName: 'Flow',
    lastName: 'Tester',
    refreshTokenHash: null as string | null,
    refreshTokenExpiry: null as Date | null,
  };

  beforeEach(async () => {
    process.env.JWT_SECRET = 'test-secret';
    userState.password = await hashPassword('Password123!');
    userState.refreshTokenHash = null;
    userState.refreshTokenExpiry = null;

    mockedPrisma.user.findUnique.mockImplementation(async ({ where }: any) => {
      if (where?.email === userState.email || where?.id === userState.id) {
        return { ...userState };
      }
      return null;
    });

    mockedPrisma.user.update.mockImplementation(async ({ data }: any) => {
      if (data.refreshTokenHash !== undefined) {
        userState.refreshTokenHash = data.refreshTokenHash;
      }
      if (data.refreshTokenExpiry !== undefined) {
        userState.refreshTokenExpiry = data.refreshTokenExpiry;
      }
      return { ...userState };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('completes login, refresh, and logout lifecycle', async () => {
    const agent = request.agent(app);

    const loginRes = await agent.post('/api/login').send({
      email: userState.email,
      password: 'Password123!',
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.accessToken).toBeDefined();
    expect(loginRes.body.user.email).toBe(userState.email);
    expect(loginRes.headers['set-cookie']).toBeDefined();

    const refreshRes = await agent.post('/api/refresh-token').send({});

    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.accessToken).toBeDefined();

    const logoutRes = await agent
      .post('/api/logout')
      .set('Authorization', `Bearer ${refreshRes.body.accessToken}`)
      .send();

    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.message).toBe('Logged out successfully');
    expect(userState.refreshTokenHash).toBeNull();
    expect(userState.refreshTokenExpiry).toBeNull();
  });
});
