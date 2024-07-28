import express from 'express';
import prisma from '../index';

const tasks = express.Router();

export const createTask = tasks.post('/tasks', async (req, res) => {
  try {
    const { title };
  } catch (error) {}
});
