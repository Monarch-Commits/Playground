'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SendHorizontal, User, Loader2 } from 'lucide-react';


import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { askGeminiAction } from '@/app/actions/AI/ai.action';
import Animabot from './AnimaBot';

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

// Sub-component para sa Message Bubble para sa mas mabilis na rendering
const MessageBubble = ({ msg }: { msg: ChatMessage }) => (
  <div
    className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
  >
    {msg.role === 'ai' && (
      <Avatar className="relative h-8 w-8 shrink-0 overflow-hidden">
        <Image
          src="/robot.png"
          alt="AI avatar"
          fill
          className="object-contain"
        />
      </Avatar>
    )}
    <div
      className={`max-w-[80%] overflow-hidden rounded-[1.5rem] px-5 py-3 text-[13px] leading-relaxed break-all whitespace-pre-wrap ${
        msg.role === 'user'
          ? 'rounded-br-none bg-[#452829] text-[#F3E8DF]'
          : 'rounded-bl-none border border-black/5 bg-white text-[#452829]'
      }`}
    >
      {msg.content}
    </div>

    {msg.role === 'user' && (
      /* Inalis ang backtick (`) sa simula ng className dito */
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#452829]">
        <User className="h-4 w-4 text-[#F3E8DF]" />
      </div>
    )}
  </div>
);

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmedInput };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('prompt', trimmedInput);
      const result = await askGeminiAction(formData);

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: result?.output || 'Something went wrong.',
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: 'Error calling AI. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && setTimeout(scrollToBottom, 100)}>
      <DialogTrigger asChild>
        <button
          className="fixed right-4 bottom-4 z-100 p-1 transition-transform hover:scale-110 active:scale-95 sm:right-8 sm:bottom-8"
          aria-label="Open Chat"
        >
          <div className="relative">
            <div className="absolute -top-1 -right-1 z-10 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
            <Animabot width={70} height={70} />
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] border-none bg-transparent p-0 shadow-none md:max-w-2xl">
        <div className="flex h-[80vh] flex-col overflow-hidden rounded-3xl bg-white/80 shadow-xl backdrop-blur-md">
          <DialogHeader
            showCloseButton={true}
            className="flex shrink-0 flex-row items-center justify-between border-b border-black/5 bg-white/60 px-8 py-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <DialogTitle className="bg-linear-to-r from-slate-800 via-orange-700 to-blue-700 bg-clip-text text-lg font-bold text-transparent">
                Monarch AI Assistant
              </DialogTitle>
            </div>
          </DialogHeader>

          <div
            ref={scrollRef}
            className="scrollbar-thin scrollbar-thumb-black/10 flex-1 space-y-5 overflow-y-auto scroll-smooth p-6"
          >
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}

            {loading && (
              <div className="flex animate-pulse items-center gap-2 text-xs text-[#452829]/50">
                <Loader2 className="h-3 w-3 animate-spin" />
                AI is processing...
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-black/5 bg-white/50 p-6 backdrop-blur-sm">
            <div className="relative flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="w-full rounded-2xl border border-[#EBD1C5]/70 bg-white/90 py-3.5 pr-14 pl-6 text-sm transition-all focus:ring-2 focus:ring-[#452829]/20 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-3 rounded-xl bg-[#452829] p-2.5 text-white shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <SendHorizontal className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="mt-4 text-center text-[10px] font-bold tracking-widest text-[#452829]/40">
              DESIGNED BY MONARCH
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}