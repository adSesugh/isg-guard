import { PrismaClient } from "@prisma/client";
import { encryptedPassword, generateAccessToken, getInitials } from "../utils/helpers.js";
import bcrypt from 'bcryptjs';

const authController = new Object();
const prisma = new PrismaClient();

// User registration function
authController.signUp = async (req, res) => {
    try {
        // Request body
        const { first_name, last_name, email, username, password } = req.body;

        if (!(first_name && last_name && email && username && password)) {
            return res.status(415).json({
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
            message: `Welcome ${user.first_name}!`,
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


export default authController;