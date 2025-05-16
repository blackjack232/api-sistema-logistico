import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

export default app;
