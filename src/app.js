import express from 'express';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', userRouter);
app.use('/auth', authRouter);


export default app