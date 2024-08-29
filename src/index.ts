import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//Load env variables
dotenv.config();

// Routes
import { authRouter, viewsRouter, tasksRouter, goalsRouter } from './routes';
import { authMiddleware } from './middleware/auth';

// Environment Variables Setup
const PORT = process.env.PORT;

// Initial Setup
const app = express();
export const prisma = new PrismaClient();

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routers
// app.use('/v1', authMiddleware, viewsRouter);
app.use('/v1', viewsRouter);
app.use('/v1/auth', authRouter);
app.use('/v1/tasks', authMiddleware, tasksRouter);
app.use('/v1/goals', goalsRouter);
// app.use('/v1/tasks', taskstimeRouter);
// app.use('/v1/users', usersRouter);

//Not Found

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/v1`);
});
