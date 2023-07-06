import express from 'express';
import * as bodyParser from "body-parser";
import morgan from 'morgan'
import cors from 'cors';
import { connectToDatabase } from '../../interfaces/config/database';

import authRouter from '../routers/auth.router';
import trainerRouter from '../routers/trainer.router';
import userRouter from '../routers/user.router';
import adminRouter from '../routers/admin.router';
import * as authRepository from '../..//app/repositories/auth.repository';
import * as trainerRepository from '../../app/repositories/trainer.repository';
import * as userRepository from '../../app/repositories/user.repository';
import * as adminRepository from '../../app/repositories/admin.repository';

class App {
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

        this.app.use(cors({
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }

    private routes(): void {
        this.app.use('/api/auth', authRouter(authRepository));
        this.app.use('/api/trainer', trainerRouter(trainerRepository));
        this.app.use('/api/user', userRouter(userRepository));
        this.app.use('/api/admin', adminRouter(adminRepository));
    }
    
    private mongoSetup(): void{connectToDatabase()}

}

export default new App().app;