import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
import cors from 'cors';

import 'dotenv/config';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/api', routes);

export default app;
