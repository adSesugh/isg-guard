/**
 * Required External Modules
 */
import express from 'express';
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient()

app.use(express.json());

app.get('/', async (req, res) => {
    const encryptedPassword = await bcrypt.hash('admin', 10);
    const user = await prisma.user.create({
        data: {
            email: 'admin@gmail.com',
            username: 'admin',
            name: 'Sesugh Agbadu',
            role: 'FLATOWNER',
            password: encryptedPassword
        }
    });
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        role: user.role
    }, process.env.SECRET_KEY, { expiresIn: '2h'});
    user.token = token;
    //delete user.password;
    console.log(user)
    res.status(200).json(user);
});

app.listen(PORT, process.env.HOSTNAME, () => {
    console.log(`Server is running on http://${process.env.HOSTNAME}:${PORT}`)
})