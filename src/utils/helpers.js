import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv  from 'dotenv';

dotenv.config();
const { HASH_SALT, TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

// Generate User Access Token
export const generateAccessToken = (payload) => {
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(payload, TOKEN_SECRET, { expiresIn: '2m' })

    return {
        accessToken,
        refreshToken
    };
}

// Create password hash
export const encryptedPassword = async (password) => {
    const hashSalt = parseInt(HASH_SALT);
    const hashPassword = await bcrypt.hash(password, hashSalt);
    return hashPassword;
}

export const getInitials = (name) => {
    return name.match(/(\b\S)?/g).join("");
}
