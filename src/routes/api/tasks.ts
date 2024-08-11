import express from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from '../../controllers/tasks';

import { createTasktime, updateTasktime } from '../../controllers/tasktimes';
// import {getTasktime} from '../../controllers/taskTime'

const router = express.Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

router.route('/:id/tasktime').post(createTasktime);
router.route('/:id/tasktime/:id').put(updateTasktime);

export { router };

// TODO: model validation
