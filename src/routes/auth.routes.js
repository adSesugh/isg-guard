import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

/** 
 * @swagger 
 * tags: 
 *   - name: User Authentication 
 *     description: User authentication management
 */
/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     summary: 'Account sign in'
 *     tags:
 *       - 'User Authentication'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email Address
 *                 example: david.agada01@gmail.com
 *               password:
 *                 type: string
 *                 description: Password
 *                 example: 123456789  
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/signIn', authController.signIn);

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: Account sign up
 *     description: Account sign-up
 *     tags:
 *       - User Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: First Name
 *               last_name:
 *                 type: string
 *                 description: Last Name
 *               username:
 *                 type: string
 *                 description: Username
 *               email:
 *                 type: string
 *                 description: Email Address
 *               password:
 *                 type: string
 *                 description: Password
 *     responses:
 *       200:
 *         description: OK.
 * 
 */
router.post('/signUp', authController.signUp);

/**
 * @swagger
 * /auth/forgotPassword:
 *      post:
 *          summary: Send forgot password reset link
 *          description: Get a link to reset forgotten password!
 *          tags:
 *              -   User Authentication
 *          responses:
 *              200:
 *                  description: Returns a mysterious string.
 */
router.post('/forgotPassword', authController.forgotPassword);

/**
 * @swagger
 * /auth/resetPassword/{token}:
 *      put:
 *          summary: Password reset
 *          description: Set new password!
 *          tags:
 *              -   User Authentication
 *          responses:
 *              200:
 *                  description: Returns a mysterious string.
 */
router.put('/resetPassword', authController.resetPassword);


export default router;