import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const { HASH_SALT, TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

// Generate User Access Token
export const generateAccessToken = (payload) => {
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(payload, TOKEN_SECRET, { expiresIn: '2h' });

    return {
        accessToken,
        refreshToken
    };
};

// Create password hash
export const encryptedPassword = async (password) => {
    const hashSalt = parseInt(HASH_SALT);
    const hashPassword = await bcrypt.hash(password, hashSalt);
    return hashPassword;
};

export const exclude = (data, keys) => {
    const result = data.filter(res => {
        keys.forEach(key => {
            delete res[key];
        });
        return res;
    });

    return result;
};

export const getInitials = (name) => {
    return name.match(/(\b\S)?/g).join("");
};
