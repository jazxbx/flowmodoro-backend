import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';

type UserType = {
  email: string;
  password: string;
};

//TODO: add Oauth, cookies, logout

// REGISTER USER POST REQ route: api/v1/auth/register

const users = express.Router();

export const register = users.post('/register', async (req, res) => {
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
        sucess: false,
        error: 'This email is already in use, please login',
      });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const user = await prisma.user.create({
      data: {
        email: trimmedEmail,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.send({
      success: true,
      message: 'user successfully created',
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

// LOGIN USER POST REQ route: api/v1/auth/login

export const login = users.post('/login', async (req, res) => {
  try {
    const { email, password }: UserType = req.body;
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
    const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET);
    res.send({
      success: true,
      message: 'user logged in',
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
