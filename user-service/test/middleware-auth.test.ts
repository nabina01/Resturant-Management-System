import { authMiddleware, authorizeRoles } from '../src/middleware/auth';
import { generateAccessToken } from '../src/utils/jwt';

describe('Auth Middleware', () => {
  const buildRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('attaches user data for a valid access token', () => {
    const token = generateAccessToken({
      userId: 'u1',
      email: 'u1@example.com',
      role: 'ADMIN',
    });

    const req: any = { headers: { authorization: `Bearer ${token}` } };
    const res = buildRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.userId).toBe('u1');
    expect(req.user.role).toBe('ADMIN');
  });

  it('returns 401 when token is missing', () => {
    const req: any = { headers: {} };
    const res = buildRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });
});

describe('Role Middleware', () => {
  const buildRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('allows access for permitted roles', () => {
    const req: any = { user: { role: 'ADMIN' } };
    const res = buildRes();
    const next = jest.fn();

    authorizeRoles('ADMIN', 'WORKER')(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('returns 403 for non-permitted roles', () => {
    const req: any = { user: { role: 'CUSTOMER' } };
    const res = buildRes();
    const next = jest.fn();

    authorizeRoles('ADMIN', 'WORKER')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });
});
