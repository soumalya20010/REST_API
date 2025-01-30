// const express = require('express');
import express from 'express';
import gadgetRoutes from './routes/gadgetRoutes.js';
// import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());

app.use('/api', gadgetRoutes);
// app.use('/auth', authRoutes);

export default app;