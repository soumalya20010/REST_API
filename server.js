import express from 'express';
import { sequelize } from './models/index.js';
import app from './app.js';
app.use(express.json());

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});