import express from 'express';
import { Request, Response } from 'express';

import { type RequestParams } from '../types/common';
import { prisma } from '../index';
import { taskTimesRequestBody } from '../types/tasktimes';

const tasksRouter = express.Router();
//mergeParams from tasksRouter
const tasktime = express.Router({ mergeParams: true });
const dayjs = require('dayjs');

// //TEST ROUTE
// export const getTasktime = tasktime.get(
//   '/:id/tasktime',
//   async (req: Request<RequestParams>, res: Response) => {
//     const { id } = req.params;

//     try {
//       const findTask = await prisma.task.findUnique({
//         where: { id },
//       });

//       res.send({ success: true, message: 'get task time test test' });
//     } catch (error) {
//       res.status(400).json({ error: (error as Error).message });
//     }
//   }
// );

export const createTasktime = tasktime.post(
  '/:id/tasktime',
  async (req: Request<RequestParams>, res: Response) => {
    const { id } = req.params;
    const { started } = req.body as taskTimesRequestBody;

    try {
      const findTask = await prisma.task.findUnique({
        where: { id },
      });

      if (!findTask) {
        return res.status(400).json({
          error: 'Invalid Task ID',
        });
      }

      const tasktime = await prisma.taskTime.create({
        data: {
          started: new Date(started),
          ended: null,
          duration: 0,
          taskId: id,
        },
      });

      res.status(200).json(tasktime);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

//PUT api/version/tasks/:id/tasktime/id

// Ends timer

export const updateTasktime = tasktime.put(
  '/:id/tasktime/:id',

  async (req: Request<RequestParams>, res: Response) => {
    const { id } = req.params;
    const { ended } = req.body as taskTimesRequestBody;

    try {
      const findTasktime = await prisma.taskTime.findUnique({
        where: { id },
      });

      if (!findTasktime) {
        return res.status(400).json({
          error: 'Task Time not found',
        });
      }

      const duration = dayjs(ended).diff(dayjs(findTasktime.started), 'second');

      const tasktime = await prisma.taskTime.update({
        where: { id },
        data: {
          ended,
          duration,
        },
      });
      res.status(200).json(tasktime);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);
