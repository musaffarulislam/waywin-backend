import app from './interfaces/config/app';
import env from "./app/environment/environment";
import authRouter from './interfaces/routers/auth.router';
import * as authRepository from './app/repositories/auth.repository';

const PORT = env.getPort();

app.use('/api/auth', authRouter(authRepository));

app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);
});
