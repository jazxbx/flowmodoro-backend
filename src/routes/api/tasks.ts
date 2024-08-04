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

//TASKTIME TIMER TODO:idk rename to timer??

// test if route is working
// router.route('/:id/tasktime').get(getTasktime);
router.route('/:id/tasktime').post(createTasktime).put(updateTasktime);

export { router };


TODO: model validation 