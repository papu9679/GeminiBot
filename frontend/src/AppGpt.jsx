import { useState } from 'react';

function App() {
	const [messages, setMessages] = useState([]);
	const [formInput, setFormInput] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const currQuestion = formInput.trim();

		if (!currQuestion) {
			return;
		}

		const newMessages = [
			...messages,
			{
				role: 'user',
				text: currQuestion,
			},
		];

		setFormInput('');

		try {
			const response = await fetch('http://localhost:3000/gemini/ask', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ question: newMessages }),
			});

			const data = await response.json();

			const ans = data.message;

			const newMessages2 = [
				...newMessages,
				{
					role: 'bot',
					text: ans,
				},
			];

			setMessages(newMessages2);
		} catch (err) {
			console.log('err', err);
		}
	}

	return (
		<div className="app">
			<div className="chat-container">
				<header className="chat-header">
					<h1>AI Assistant</h1>
					<p>Ask me anything</p>
				</header>

				<main className="messages-container">
					{messages.map((msg, i) => (
						<div
							key={i}
							className={`message-row ${
								msg.role === 'user' ? 'user-row' : 'bot-row'
							}`}
						>
							<div
								className={`message-bubble ${
									msg.role === 'user' ? 'user-message' : 'bot-message'
								}`}
							>
								{msg.text}
							</div>
						</div>
					))}
				</main>

				<div className="input-container">
					<form onSubmit={handleSubmit} className="chat-form">
						<input
							type="text"
							value={formInput}
							onChange={(e) => setFormInput(e.target.value)}
							placeholder="Type your message..."
							className="chat-input"
						/>

						<button type="submit" className="send-button">
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
