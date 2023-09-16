import { PrismaClient } from "@prisma/client";
import { encryptedPassword, generateAccessToken } from "../utils/helpers.js";

const prisma = new PrismaClient();
const userController = new Object()

// Get all users
userController.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// Create user
userController.createUser = async (req, res) => {
    try {
        // Request body
        const {
            first_name,
            last_name,
            email,
            username,
            role,
            password
        } = req.body;

        if (!(first_name && last_name && email && username && role && password)){
            return res.status(415).json({
                success: false,
                message: "Invalid entry"
            });
        }

        // Hashed password
        const hashPassword = await encryptedPassword(password);

        // Create user and return the added the user
        const user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                username,
                role,
                password: hashPassword
            }
        })

        // Remove password from the user object
        delete user.password;

        return res.status(200).json({
            success: true,
            message: "Created successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
export default userController;