import express from 'express';
import router from './routes/index.js';
import cors from 'cors'; // CORSミドルウェアをインポート

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server start: http://localhost:${PORT}`);
});