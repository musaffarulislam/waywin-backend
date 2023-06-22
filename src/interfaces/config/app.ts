import express from 'express';
import * as bodyParser from "body-parser";
import morgan from 'morgan'
import cors from 'cors';
import { connectToDatabase } from '../../interfaces/config/database';

class App {
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
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
    
    private mongoSetup(): void{connectToDatabase()}

}

export default new App().app;