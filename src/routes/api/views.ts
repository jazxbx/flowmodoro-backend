import express from 'express';

import { getHomePage, getPageNotFound } from '../../controllers/index';
const router = express.Router();

router.route('/').get(getHomePage);
router.route('/error').get(getPageNotFound);

export { router };
