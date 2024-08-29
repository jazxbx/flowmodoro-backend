import express from 'express';
import { Request, Response } from 'express';
import { type RequestParams } from '../types/common';
import { prisma } from '../index';
import { goalsRequestBody } from '../types/goals';

const goals = express.Router();

// GET ALL GOALS GET route: api/v1/goals
export const getGoals = goals.get('', async (req: Request, res: Response) => {
  try {
    const goals = await prisma.goal.findMany();

    if (!goals) {
      res.send({
        success: false,
        message: 'No goals found. Please create goal',
      });
    }

    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export const getGoal = goals.get(
  '/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      const goal = await prisma.goal.findUnique({
        where: { id },
      });

      if (!goal) {
        res.send({
          success: false,
          message: 'No goal found. Please create goal',
        });
      }
      res.status(200).json(goal);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

export const createGoal = goals.post(
  '/',
  async (req: Request, res: Response) => {
    const { goalTime, userId } = req.body as goalsRequestBody;
    try {
      const goal = await prisma.goal.create({
        data: {
          goalTime,
          goalStart: new Date(),
          user: {
            connect: { id: userId },
          },
        },
      });
      res.status(200).json(goal);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

export const updateGoal = goals.put(
  '/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const goal = await prisma.goal.update({
        where: { id },
        data: {
          goalComplete: new Date(),
        },
      });
      res.status(200).json(goal);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

export const deleteGoal = goals.delete(
  '/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.goal.delete({
        where: { id },
      });
      res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);
