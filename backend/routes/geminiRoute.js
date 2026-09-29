import express from 'express';
import { askQuestion } from '../services/geminiService.js';

const router = express.Router();

// gemini

router.post('/ask', async (req, res) => {
	const { question } = req.body;

	if (!question) {
		return res.status(400).json({
			message: 'Not a valid input',
		});
	}

	try {
		const response = await askQuestion(question);

		return res.status(200).json({
			message: response,
		});
	} catch (err) {
		console.error('Gemini route error:', err);
		return res.status(500).json({
			message: err.message || 'Internal Server Error',
		});
	}
});

export default router;
