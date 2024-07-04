import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
// const prisma = new PrismaClient();
const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ success: true, message: 'Hello world' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
