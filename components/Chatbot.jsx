"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, RefreshCw, SendHorizontal, Sparkles, User, X } from "lucide-react";

const quickReplies = [
  { id: "stack", text: "What is your tech stack?" },
  { id: "availability", text: "Are you available immediately?" },
  { id: "mern", text: "Can you build MERN e-commerce apps?" },
];

const starterMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I am the portfolio assistant. Ask about Aniket's MERN stack, project experience, or availability.",
  },
];

function getBotReply(input) {
  const text = input.toLowerCase();

  if (text.includes("stack") || text.includes("tech") || text.includes("skills")) {
    return "The core stack includes React.js, Next.js, Redux, Node.js, Express.js, NestJS, MongoDB, REST APIs, JWT, and RBAC-driven admin flows.";
  }

  if (text.includes("start") || text.includes("available") || text.includes("joining")) {
    return "The resume lists immediate joining availability, so discussions can move quickly for the right opportunity or project.";
  }

  if (
    text.includes("website") ||
    text.includes("build") ||
    text.includes("mern") ||
    text.includes("e-commerce")
  ) {
    return "Yes. Recent work includes MERN and Next.js delivery for e-commerce platforms, wallet flows, dashboards, and real-time chat products.";
  }

  if (text.includes("experience") || text.includes("company") || text.includes("role")) {
    return "Aniket has 7+ years in web development, including work at Appristine Technology and Exceptionaire Technology across frontend and full-stack roles.";
  }

  return "Use the contact form or email directly with your project scope, timeline, and stack requirements to continue the conversation.";
}

function createMessage(role, text) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [hiddenReplyIds, setHiddenReplyIds] = useState([]);
  const [input, setInput] = useState("");
  const messagesRef = useRef(null);

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }

    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  function resetChat() {
    setMessages(starterMessages);
    setHiddenReplyIds([]);
    setInput("");
    setIsOpen(true);
  }

  function sendMessage(text, quickReplyId) {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const userMessage = createMessage("user", trimmed);
    const botMessage = createMessage("assistant", getBotReply(trimmed));

    setMessages((current) => [...current, userMessage, botMessage]);
    setInput("");
    setIsOpen(true);

    if (quickReplyId) {
      setHiddenReplyIds((current) => [...new Set([...current, quickReplyId])]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  const visibleReplies = quickReplies.filter((reply) => !hiddenReplyIds.includes(reply.id));

  return (
    <div className={`chatbot ${isOpen ? "chatbot--open" : ""}`}>
      <button
        aria-expanded={isOpen}
        aria-label="Toggle chatbot"
        className="chatbot__toggle"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="chatbot__toggle-icon">
          <MessageCircle aria-hidden="true" size={18} strokeWidth={2.2} />
        </span>
        <span>Chat</span>
        <strong>{messages.length}</strong>
      </button>

      {isOpen ? (
        <div className="chatbot__panel glass-card">
          <div className="chatbot__header">
            <div className="chatbot__identity">
              <span className="chatbot__identity-icon">
                <Bot aria-hidden="true" size={20} strokeWidth={2} />
              </span>
              <div>
                <p className="eyebrow">Assistant</p>
                <h3>Project Chatbot</h3>
                <span className="chatbot__status">
                  <Sparkles aria-hidden="true" size={14} strokeWidth={2.2} />
                  Ready to answer portfolio questions
                </span>
              </div>
            </div>

            <button
              aria-label="Close chatbot"
              className="chatbot__close"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={16} strokeWidth={2.6} />
            </button>
          </div>

          <div className="chatbot__messages" ref={messagesRef}>
            {messages.map((message) => (
              <div
                className={`chatbot__message-row chatbot__message-row--${message.role}`}
                key={message.id}
              >
                <span className="chatbot__avatar">
                  {message.role === "assistant" ? (
                    <Bot aria-hidden="true" size={16} strokeWidth={2} />
                  ) : (
                    <User aria-hidden="true" size={16} strokeWidth={2} />
                  )}
                </span>
                <div className={`chatbot__message chatbot__message--${message.role}`}>{message.text}</div>
              </div>
            ))}
          </div>

          {visibleReplies.length ? (
            <div className="chatbot__quick-replies">
              {visibleReplies.map((reply) => (
                <button
                  className="chip"
                  key={reply.id}
                  onClick={() => sendMessage(reply.text, reply.id)}
                  type="button"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          ) : null}

          <form className="chatbot__form" onSubmit={handleSubmit}>
            <input
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the project..."
              value={input}
            />
            <button className="button button--primary" type="submit">
              <SendHorizontal aria-hidden="true" size={16} strokeWidth={2.2} />
              Send
            </button>
          </form>

          <button className="chatbot__reset" onClick={resetChat} type="button">
            <RefreshCw aria-hidden="true" size={15} strokeWidth={2.1} />
            New Chat
          </button>
        </div>
      ) : null}
    </div>
  );
}
