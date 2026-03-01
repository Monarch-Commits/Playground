'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState, useRef, useEffect } from 'react';
import { askGeminiAction } from '../actions/post.action';
import { SendHorizontal, Sparkles, User, Bot } from 'lucide-react';
import Animabot from "./AnimaBot";

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: "Hello! I'm your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll sa latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Simplified send function
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('prompt', userMsg.content);

      const result = await askGeminiAction(formData);

      const aiMsg: ChatMessage = {
        role: 'ai',
        content: result?.output || 'Something went wrong.',
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: 'ai', content: 'Error calling AI. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Floating Button */}
      <DialogTrigger asChild>
        <button className="fixed bottom-8 right-8 z-50 p-1">
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            <Animabot width={70} height={70} />
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] md:max-w-2xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
        <div className="flex flex-col h-[80vh] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 overflow-hidden">

          {/* Header */}
          <DialogHeader className="px-8 py-6 border-b border-black/5 bg-white/40 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#452829] rounded-xl">
                <Sparkles className="w-5 h-5 text-[#F3E8DF]" />
              </div>
              <div>
                <DialogTitle className="text-[#452829] font-bold text-lg">
                  Monarch AI Assistant
                </DialogTitle>
                <p className="text-[10px] text-[#452829]/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  ONLINE
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#EBD1C5] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#452829]" />
                  </div>
                )}

                <div className={`px-5 py-3.5 rounded-[1.5rem] text-sm max-w-[80%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#452829] text-[#F3E8DF] rounded-br-none'
                    : 'bg-white text-[#452829] rounded-bl-none border border-black/5'
                }`}>
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#452829] flex items-center justify-center">
                    <User className="w-4 h-4 text-[#F3E8DF]" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#452829]/50">
                <Bot className="w-4 h-4" />
                AI is typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-white/40 border-t border-black/5">
            <div className="relative flex items-center">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="w-full bg-white border border-[#EBD1C5] rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-3 bg-[#452829] text-white p-2.5 rounded-xl disabled:opacity-30"
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[10px] text-center mt-4 text-[#452829]/40 font-bold tracking-widest">
              POWERED BY GEMINI
            </p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}