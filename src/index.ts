import app from './interfaces/config/app';
import env from "./app/environment/environment";
import authRouter from './interfaces/routers/auth.router';
import trainerRouter from './interfaces/routers/trainer.router';
import * as authRepository from './app/repositories/auth.repository';
import * as trainerRepository from './app/repositories/trainer.repository';

const PORT = env.getPort();

app.use('/api/auth', authRouter(authRepository));
app.use('/api/trainer', trainerRouter(trainerRepository));

app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);
});
