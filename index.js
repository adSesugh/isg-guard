import http from 'http';
import dotenv from 'dotenv';

// local module
import app from './src/app.js';

// Load environment variables
dotenv.config();

// Destructure process.env
const { SERVER_PORT, HOSTNAME } = process.env;

const PORT = process.env.PORT || SERVER_PORT;
const server = http.createServer(app);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});