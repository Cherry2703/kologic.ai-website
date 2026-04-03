"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: "user" | "bot", text: string}[]>([
    { role: "bot", text: "Hi there! I'm Kologic's AI assistant. How can I help you transform your enterprise today?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  // Ensure import is available but since it's already there or not, let's fix imports

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("chatbot-toggled", { detail: isOpen }));
  }, [isOpen]);

  const predefinedResponses: Record<string, string> = {
    "what is kologic ai?": "Kologic AI builds conversational AI, agentic systems, and enterprise automation platforms.",
    "what services do you offer?": "We offer conversational AI chatbots, agentic AI systems, enterprise automation platforms, and custom AI solutions.",
    "do you build ai chatbots?": "Yes, we build custom conversational AI chatbots designed specifically for enterprise businesses.",
    "can you build ai agents?": "Absolutely! We build custom AI agents that can securely integrate with your enterprise data and systems.",
    "do you create enterprise websites?": "Yes, we build AI-powered digital platforms and websites tailored for modern enterprises.",
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInputValue("");

    // Simulate AI response delay
    setTimeout(() => {
      const lowerCaseMsg = userMsg.toLowerCase();
      // Simple matching logic
      let botResponse = "I can help you connect with our sales team to discuss custom AI solutions for your specific needs. Would you like to book a demo?";
      
      for (const [key, val] of Object.entries(predefinedResponses)) {
        if (lowerCaseMsg.includes(key.replace("?", ""))) {
          botResponse = val;
          break;
        }
      }

      setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 z-50 hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-100 max-h-120 overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-primary px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Bot size={20} />
                <span className="font-medium">Kologic Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 h-80 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user" 
                        ? "bg-primary text-white rounded-br-none" 
                        : "bg-gray-100/80 text-text-primary rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask Kologic AI..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="w-full bg-gray-50 border border-gray-100 rounded-full px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-shadow"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 top-1.5 p-1.5 bg-primary rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  <Send size={14} className="-translate-x-px translate-y-px" />
                </button>
              </div>
              <div className="mt-2 text-center text-[10px] text-text-secondary uppercase tracking-widest font-mono">
                AI Powered by Kologic
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
