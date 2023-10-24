import { PrismaClient } from "@prisma/client";
import { currentUser, encryptedPassword, generateAccessToken, getInitials } from "../utils/helpers.js";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const authController = new Object();
const prisma = new PrismaClient();
const { FRONTEND_URL } = process.env;

// User registration function
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
authController.signUp = async (req, res) => {
    try {
        // Request body
        const { first_name, last_name, email, username, password } = req.body;

        if (!(first_name && last_name && email && username && password)) {
            return res.status(400).json({
                message: "Invalid entries",
                success: false
            });
        }

        // Grab registrant name initials
        const fullname = `${first_name} ${last_name}`;
        const initials = getInitials(fullname);

        // Hashed password
        const hashPassword = await encryptedPassword(password);

        // Create user and return the added the user
        const user = await prisma.user.create({
            data: {
                email,
                username,
                initials,
                password: hashPassword,
                FlatOwner: {
                    create: {
                        firstName: first_name,
                        lastName: last_name,
                        email: email,
                    }
                }
            },
        });

        // Remove password from the user object
        delete user.password;

        // prepare payload and generate access token
        const payload = {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            role: user.role
        };
        const { accessToken, refreshToken } = generateAccessToken(payload);

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error
        });
    }
};

// User sign in function
authController.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({ where: { email: email } });

        if (!(email && password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Credentials not found"
            });
        } else if (!bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // prepare payload and generate access token
        const payload = {
            email: user.email,
            id: user.id,
            username: user.username
        };
        const { accessToken, refreshToken } = await generateAccessToken(payload);
        delete payload.email;
        payload.role = user.role;

        return res.status(200).json({
            success: true,
            message: `Welcome ${user.username}!`,
            user: payload,
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error
        });
    }
};

// POST - Send reset password token link
authController.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findFirstOrThrow({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Account doesn't exists"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password Reset Link sent"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error
        });
    }
};

// POST - Reset password
authController.resetPassword = async (req, res) => {
    try {
        const { id, email } = currentUser(req);
        const { password, retryPassword } = req.body;

        return res.status(200).json({
            success: true,
            message: ""
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error
        });
    }
};

export default authController;