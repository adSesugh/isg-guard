import express from 'express';
import userController from '../controllers/user.controller.js';
import verifyToken from '../middleware/auth.verify.js';

const router = express.Router();

router.get('/', verifyToken,  userController.getAllUsers)
    .post('/', userController.createUser);


export default router;

