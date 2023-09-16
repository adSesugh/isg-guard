import http from 'http';
import dotenv from 'dotenv';

// local module
import app from './src/app.js';

// Load environment variables
dotenv.config();

const { API_PORT, HOSTNAME } = process.env;

const PORT = process.env.PORT || API_PORT;
const server = http.createServer(app);

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});