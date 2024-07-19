import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
export const users = express.Router();

// REGISTER USER POST REQ route: users/register

type UserType = {
  email: string;
  password: string;
};

users.post('/v1/register', async (req, res) => {
  try {
    const { email, password }: UserType = req.body;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return res.send({
        success: false,
        error: 'Email / Password Required',
      });
    }

    const checkUser = await prisma.user.findUnique({
      where: {
        email: trimmedEmail,
      },
    });

    if (checkUser) {
      return res.send({
        succes: false,
        error: 'This email is already in use, please login',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: trimmedEmail,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.send({
      success: true,
      token,
    });
  } catch (e) {
    if (
      typeof e === 'object' &&
      e &&
      'message' in e &&
      typeof e.message === 'string'
    )
      return res.send({
        success: false,
        error: e.message,
      });
  }
});
