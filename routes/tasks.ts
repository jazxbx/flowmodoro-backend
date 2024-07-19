import express from 'express';
import { prisma } from '../index';

export const tasks = express.Router();

// // Get all tasks

// tasks.get('/v1/tasks', async (req, res) => {
//   try {
//     const tasks = await prisma.task.findMany({

//     });
//   } catch (error) {}
// });

// Create task

tasks.post('/v1/tasks', async (req, res) => {
  try {
  } catch (error) {}
});
