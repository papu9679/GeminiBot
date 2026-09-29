import express from 'express';
import geminiRoute from './routes/geminiRoute.js';
import cors from 'cors';

const app = express();

// app level middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Welcome to GEMINI');
});

app.use('/gemini', geminiRoute);

const port = 3000;
app.listen(port, () => {
	console.log('Server running on', port);
});
