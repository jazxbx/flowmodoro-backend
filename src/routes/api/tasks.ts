import express from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
} from '../../controllers/tasks';

const router = express.Router();

router.route('/tasks').get(getTasks);
router.route('/tasks/:id').get(getTask);
router.route('/tasks').post(createTask);
router.route('/tasks/:id').put(updateTask);

export { router };
