
import express from 'express';
import DatabaseController from './main/controller';
import router from './main/router';

const app = express();
const port = 3004;

const controller = new DatabaseController();

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
