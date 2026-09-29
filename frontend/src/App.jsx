import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function SparkIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			aria-hidden="true"
			className="h-5 w-5"
		>
			<path d="m12 3-1.2 5.8L5 10l5.8 1.2L12 17l1.2-5.8L19 10l-5.8-1.2L12 3Z" />
			<path d="m19 16-.6 2.4L16 19l2.4.6L19 22l.6-2.4L22 19l-2.4-.6L19 16Z" />
		</svg>
	);
}

function ArrowIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
			className="h-4 w-4"
		>
			<path d="M5 12h14M13 6l6 6-6 6" />
		</svg>
	);
}

function MarkdownMessage({ content }) {
	return (
		<div className="markdown-content">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					h1: ({ children }) => (
						<h1 className="mb-3 mt-1 font-[Georgia] text-2xl font-bold text-[#263229]">
							{children}
						</h1>
					),
					h2: ({ children }) => (
						<h2 className="mb-2 mt-5 font-[Georgia] text-xl font-bold text-[#263229]">
							{children}
						</h2>
					),
					h3: ({ children }) => (
						<h3 className="mb-2 mt-4 text-base font-bold text-[#304535]">
							{children}
						</h3>
					),
					p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
					ul: ({ children }) => (
						<ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">
							{children}
						</ul>
					),
					ol: ({ children }) => (
						<ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">
							{children}
						</ol>
					),
					blockquote: ({ children }) => (
						<blockquote className="my-4 border-l-4 border-[#c9dc75] pl-4 italic text-[#6e7e6e]">
							{children}
						</blockquote>
					),
					a: ({ children, href }) => (
						<a
							href={href}
							target="_blank"
							rel="noreferrer"
							className="font-semibold text-[#64852f] underline decoration-[#c2d67e] underline-offset-2 transition-colors hover:text-[#304535]"
						>
							{children}
						</a>
					),
					code: ({ children, className, ...props }) => (
						<code
							className={`rounded-md bg-[#eef3e9] px-1.5 py-0.5 font-mono text-[0.85em] text-[#536a42] ${className || ''}`}
							{...props}
						>
							{children}
						</code>
					),
					pre: ({ children }) => (
						<pre className="my-4 max-w-full overflow-x-auto rounded-2xl bg-[#202b24] p-4 text-sm leading-6 text-[#e7f0df] shadow-inner">
							{children}
						</pre>
					),
					table: ({ children }) => (
						<div className="my-4 overflow-x-auto rounded-xl border border-[#dfe8dd]">
							<table className="min-w-full divide-y divide-[#dfe8dd] text-left text-sm">
								{children}
							</table>
						</div>
					),
					th: ({ children }) => (
						<th className="bg-[#f3f7ee] px-3 py-2 font-bold text-[#304535]">
							{children}
						</th>
					),
					td: ({ children }) => (
						<td className="border-t border-[#e7eee3] px-3 py-2">{children}</td>
					),
					hr: () => <hr className="my-5 border-[#e1e9dd]" />,
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}

function App() {
	const [messages, setMessages] = useState([]);
	const [formInput, setFormInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();
		const currentQuestion = formInput.trim();

		if (!currentQuestion || isLoading) return;

		const newMessages = [...messages, { role: 'user', text: currentQuestion }];
		setMessages(newMessages);
		setFormInput('');
		setError('');
		setIsLoading(true);

		const port = process.env.PORT

		try {
			const response = await fetch(`${port}gemini/ask`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ question: newMessages }),
			});
			const data = await response.json();

			if (!response.ok)
				throw new Error(data.message || 'Something went wrong.');
			setMessages([...newMessages, { role: 'bot', text: data.message }]);
		} catch (requestError) {
			setError(requestError.message || 'Unable to reach the assistant.');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-[#f5f7f2] px-4 py-5 text-[#18211c] sm:px-8 sm:py-8">
			<div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col overflow-hidden rounded-4xl border border-[#dfe8dd] bg-[#fbfcf9] shadow-[0_24px_80px_rgba(51,73,52,0.12)] sm:min-h-[calc(100vh-4rem)]">
				<header className="flex items-center justify-between border-b border-[#e5ebe2] px-5 py-5 sm:px-8">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d8f06b] text-[#27331c] shadow-[0_5px_16px_rgba(176,204,76,0.35)] transition-transform duration-300 hover:rotate-6">
							<SparkIcon />
						</div>
						<div>
							<p className="font-[Georgia] text-lg font-bold tracking-[-0.02em]">
								GeminiBot
							</p>
							<p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7b897b]">
								Your thinking partner
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 text-xs font-semibold text-[#728071]">
						<span className="h-2 w-2 animate-pulse rounded-full bg-[#7ba843]" />
						Online
					</div>
				</header>

				<main className="flex flex-1 flex-col overflow-hidden">
					<div className="flex-1 overflow-y-auto px-5 py-8 sm:px-12 sm:py-12">
						{messages.length === 0 ? (
							<div className="mx-auto flex h-full max-w-2xl flex-col justify-center">
								<p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8a9d82]">
									A fresh conversation
								</p>
								<h1 className="max-w-xl font-[Georgia] text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#263229] sm:text-6xl">
									What shall we make sense of today?
								</h1>
								<p className="mt-5 max-w-lg text-base leading-7 text-[#778477] sm:text-lg">
									Ask a question, untangle an idea, or start somewhere
									unexpected. I am here to help you think it through.
								</p>
								<div className="mt-10 flex flex-wrap gap-2">
									{[
										'Explain a complex idea',
										'Help me brainstorm',
										'Plan my next step',
									].map((prompt) => (
										<button
											key={prompt}
											type="button"
											onClick={() => setFormInput(prompt)}
											className="rounded-full border border-[#dce7d7] bg-white px-4 py-2.5 text-sm font-medium text-[#586858] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b9ca8a] hover:bg-[#f5f9e7] hover:text-[#33452c]"
										>
											{prompt}
										</button>
									))}
								</div>
							</div>
						) : (
							<div className="mx-auto flex max-w-3xl flex-col gap-5">
								{messages.map((message, index) => (
									<div
										key={`${message.role}-${index}`}
										className={`flex animate-[fade-in_400ms_ease-out] ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
									>
										<div
											className={`max-w-[88%] rounded-3xl px-5 py-4 text-[0.95rem] leading-7 shadow-sm transition-all duration-200 sm:max-w-[75%] ${message.role === 'user' ? 'rounded-br-md bg-[#304535] text-white' : 'rounded-bl-md border border-[#e2e9df] bg-white text-[#465548]'}`}
										>
											{message.role === 'bot' ? (
												<MarkdownMessage content={message.text} />
											) : (
												message.text
											)}
										</div>
									</div>
								))}
								{isLoading && (
									<div className="flex justify-start">
										<div className="rounded-3xl rounded-bl-md border border-[#e2e9df] bg-white px-5 py-4 text-sm text-[#7d8c7a] shadow-sm">
											<span className="animate-pulse">Thinking...</span>
										</div>
									</div>
								)}
							</div>
						)}
					</div>

					<div className="border-t border-[#e5ebe2] bg-white/70 px-5 py-5 sm:px-12 sm:py-7">
						{error && (
							<p className="mx-auto mb-3 max-w-3xl text-sm text-[#bd5d4f]">
								{error}
							</p>
						)}
						<form
							onSubmit={handleSubmit}
							className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-[#dce6d8] bg-white p-2 shadow-[0_8px_24px_rgba(62,83,62,0.08)] transition-all duration-200 focus-within:border-[#aebe78] focus-within:shadow-[0_10px_30px_rgba(62,83,62,0.13)]"
						>
							<input
								type="text"
								value={formInput}
								onChange={(event) => setFormInput(event.target.value)}
								placeholder="Ask anything..."
								aria-label="Message"
								className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#27352b] outline-none placeholder:text-[#a4afa1] sm:text-base"
								disabled={isLoading}
							/>
							<button
								type="submit"
								disabled={!formInput.trim() || isLoading}
								aria-label="Send message"
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d8f06b] text-[#27331c] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c9e358] hover:shadow-[0_5px_14px_rgba(176,204,76,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
							>
								<ArrowIcon />
							</button>
						</form>
						<p className="mt-3 text-center text-xs text-[#9aa59a]">
							Gemini can make mistakes. Check important information.
						</p>
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
