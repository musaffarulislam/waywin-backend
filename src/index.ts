import app from './interfaces/config/app';
import env from "./app/environment/environment";

const PORT = env.getPort();


app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);
});
