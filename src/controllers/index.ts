import express from 'express';

const route = express.Router();

export const getHomePage = route.get('/', (req, res) => {
  res.send({ success: true, message: 'Welcome to the Flowmodoro server' });
});

export const getPageNotFound = route.get('/error', (req, res, next) => {
  res.status(404).send({
    success: false,
    message: 'Page not found',
  });
});
