import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

/** 
 * @swagger 
 * tags: 
 *   - name: User Management
 *     description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users.
 *     tags:
 *         -    User Management
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users.
 *     tags:
 *         -    User Management
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/', userController.createUser);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve a single user.
 *     tags:
 *         - User Management
 *     responses:
 *       200:
 *         description: Single user retrieval.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
router.get('/:id', userController.singleUser);

/**
 * @swagger
 * /users/{id}/activate:
 *   put:
 *     summary: Activate user.
 *     description: Activate User.
 *     tags:
 *         -   User Management
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User status updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
router.put('/:id/activate', userController.activate);

/**
 * @swagger
 * /users/{id}/deactivate:
 *      put:
 *          summary: Deactivate a user.
 *          description: Deactivate user records.
 *          tags:
 *              -   User Management
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: Numeric ID of the user to retrieve.
 *                  schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Deactivate a user
 *                  content:
 */
router.put('/:id/deactivate', userController.deactivate);


export default router;

