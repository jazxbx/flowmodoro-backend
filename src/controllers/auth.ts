import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { prisma } from '../index';
import { userRequestBody } from '../types/users';

//TODO: add Oauth, cookies, logout, cookie parser, safeparse from zod?
//TODO: store jwt in cookie, study how to use middleware

// REGISTER USER POST REQ route: api/v1/auth/register

const users = express.Router();

export const register = users.post(
  '/register',
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as userRequestBody;

      if (!email || !password) {
        return res.send({
          success: false,
          error: 'Email / Password Required',
        });
      }

      const checkUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (checkUser) {
        return res.send({
          sucess: false,
          error: 'This email is already in use, please login',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const expiresIn = 60 * 60 * 24 * 7; // 7 days

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn,
      });

      res.send({
        success: true,
        message: 'User successfully created',
        token,
      });
    } catch (e) {
      console.log('error registering user', e);
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
  }
);

// LOGIN USER POST REQ route: api/v1/auth/login

export const login = users.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as userRequestBody;
    if (!email || !password) {
      return res.send({
        success: false,
        error: 'Email / Password required to login',
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.send({
        success: false,
        error: 'Email / Password incorrect',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      return res.send({
        success: false,
        error: 'User and/or password is invalid.',
      });
    }

    const expiresIn = 60 * 60 * 24 * 7; // 7 days

    const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET, {
      expiresIn,
    });
    res.send({
      success: true,
      message: 'User successfully logged in',
      token,
    });
  } catch (e) {
    console.log('error registering user', e);
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

//TODO: logout route?
