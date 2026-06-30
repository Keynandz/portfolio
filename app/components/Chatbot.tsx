"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, ChevronRight, Sparkles } from "lucide-react";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

const qaPairs = [
  {
    question: "What is your main tech stack?",
    answer: "My core stack is Golang for backend services, PostgreSQL for databases, and Next.js with TypeScript for the frontend. I also use Docker and Redis extensively.",
  },
  {
    question: "Are you open for new opportunities?",
    answer: "Yes, I am currently available for new opportunities. You can reach out to me via the contact form or directly at nanpurnanda@gmail.com.",
  },
  {
    question: "What kind of projects do you prefer?",
    answer: "I enjoy building scalable backend architectures, microservices, and integrating AI models or IoT hardware into real-world production systems.",
  },
  {
    question: "Where are you located?",
    answer: "I am based in Jakarta, Indonesia.",
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hi there! I am Ananda's virtual assistant. What would you like to know?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [clickedQuestions, setClickedQuestions] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleQuestionClick = (qa: typeof qaPairs[0], index: number) => {
    setClickedQuestions((prev) => [...prev, index]);
    const userMsg: Message = {
      id: Date.now().toString() + "-user",
      sender: "user",
      text: qa.question,
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now().toString() + "-bot",
        sender: "bot",
        text: qa.answer,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 2.5, duration: 0.4 }}
            className="fixed bottom-[34px] right-[88px] z-50 bg-surface border border-teal/20 text-text-primary text-sm px-4 py-2 rounded-2xl rounded-br-sm shadow-lg pointer-events-none flex items-center gap-2 glow-teal-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
            </span>
            Ask me something!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-teal text-bg shadow-lg glow-teal transition-transform hover:scale-110 ${isOpen ? "hidden" : "block"}`}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <MessageSquare size={24} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl glass-strong max-sm:!bg-surface max-sm:!backdrop-blur-none border border-border shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-teal/20 text-teal">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Virtual Assistant</h3>
                  <p className="text-xs text-teal">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-teal text-bg rounded-tr-sm"
                        : "bg-surface border border-border text-text-secondary rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface border border-border p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border bg-surface">
              <p className="text-xs text-text-muted mb-2 px-1">Suggested questions:</p>
              <div className="flex flex-col gap-2">
                {qaPairs.map((qa, i) => (
                  !clickedQuestions.includes(i) && (
                    <button
                      key={i}
                      onClick={() => handleQuestionClick(qa, i)}
                      disabled={isTyping}
                      className="flex items-center justify-between w-full text-left p-2.5 rounded-lg border border-border hover:border-teal/30 hover:bg-teal/5 text-sm text-text-secondary hover:text-text-primary transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="truncate pr-2">{qa.question}</span>
                      <ChevronRight size={14} className="text-teal/0 group-hover:text-teal shrink-0 transition-colors" />
                    </button>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
