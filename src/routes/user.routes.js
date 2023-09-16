import express from 'express';
import userController from '../controllers/user.controller.js';
import verifyToken from '../middleware/auth.verify.js';

const router = express.Router();

router.get('/', verifyToken, userController.getAllUsers)
    .post('/', userController.createUser)
    .get('/:id', userController.singleUser)
    .put('/:id/activate', userController.activate)
    .put('/:id/deactivate', userController.deactivate);


export default router;

