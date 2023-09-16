import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/signIn', authController.signIn)
    .post('/signUp', authController.signUp)


export default router