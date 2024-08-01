import express from 'express';
import { Request, Response } from 'express';
import { tasksRequestBody, tasksSchema } from '../types/tasks';
import { type RequestParams } from '../types/common';
import { prisma } from '../index';
import { userRequest } from '../types/users';

const tasks = express.Router();

// GET ALL TASKS GET route: api/v1/tasks

export const getTasks = tasks.get(
  '/tasks',
  async (_: Request, res: Response) => {
    try {
      const tasks = await prisma.task.findMany();

      if (!tasks) {
        res.send({
          success: false,
          message: 'No tasks found. Please create task',
        });
      }

      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

// GET SINGLE TASK GET route: api/v1/tasks/:taskId

export const getTask = tasks.get(
  '/tasks/:id',
  async (req: Request<RequestParams>, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      const task = await prisma.task.findUnique({
        where: { id },
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

// CREATE TASK POST REQ route: api/v1/tasks
export const createTask = tasks.post(
  '/tasks',
  async (req: Request, res: Response) => {
    // TODO: pass userId in reqbody correct??

    const { title, completed, userId } = req.body as tasksRequestBody;
    try {
      const newTask = await prisma.task.create({
        data: { title, completed, user: { connect: { id: userId } } },
      });
      res.status(200).send(newTask);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

export const updateTask = tasks.put(
  '/tasks/:id',
  async (req: Request<RequestParams>, res: Response) => {
    const { id } = req.params;

    const { title, completed } = req.body as tasksRequestBody;
    try {
      const findTask = await prisma.task.findUnique({
        where: { id },
      });

      if (!findTask) {
        return res.status(400).json({ error: 'Invalid Task ID' });
      }

      const task = await prisma.task.update({
        where: { id },
        data: {
          title,
          completed,
        },
      });

      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

export const deleteTask = tasks.delete(
  '/tasks/:id',
  async (req: Request<RequestParams>, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    try {
      await prisma.task.delete({
        where: { id },
      });
      res.status(200).send({ message: 'Successfully deleted task' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);
