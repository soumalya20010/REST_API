import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import app from './app.js';
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});