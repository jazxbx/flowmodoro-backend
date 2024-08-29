import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '..';

export interface CustomRequest extends Request {
  token: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization required' });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    (req as CustomRequest).token = decoded;

    // console.log('Token:', decoded);

    // const user = await prisma.user.findUnique({
    //   where: { id: decoded.userId },
    // });
    // if (!user) {
    //   return res.status(401).json({ message: 'User not found' });
    // }
    // req.user = user.id;

    // console.log('User:', req.user);
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
