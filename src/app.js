import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import societyRouter from './routes/society.routes.js';
import towerRouter from './routes/tower.routes.js';
import flatRouter from './routes/flat.routes.js';
import verifyToken from './middleware/auth.verify.js';

dotenv.config();

const { HOSTNAME, SERVER_PORT } = process.env;

const app = express();

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', verifyToken, userRouter);
app.use('/api/v1/societies', verifyToken, societyRouter);
app.use('/api/v1/towers', verifyToken, towerRouter);
app.use('/api/v1/flats', verifyToken, flatRouter);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "ISG Guard Restful API",
            version: '1.0.0',
            description:
                "Visitor management system",
            contact: {
                name: "Sesugh Agbadu",
                url: "https://github.com/adsesugh",
                email: "sesughagbadu@yahoo.com",
            },
        },
        servers: [
            {
                url: `http://${HOSTNAME}:${SERVER_PORT}/api/v1`,
                description: 'Development server',
                basePath: {
                    default: 'v1'
                }
            },
        ],
        schemes: [
            'https',
            'http'
        ],
        components: {
            "securitySchemes": {
                "name": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

export default app;