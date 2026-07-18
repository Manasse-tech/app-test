'use client';

import React, { useState, useRef, useEffect } from 'react';
import { z } from 'zod';

const offerSchema = z.string().refine(
  (val) => {
    const price = parseInt(val.replace(/[^0-9]/g, ''));
    return !isNaN(price) && price > 0;
  },
  {
    message: 'Veuillez entrer une offre numérique valide (ex: 850 €)',
  }
);

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  price?: number;
}

export default function NegotiationWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Salutations de la Collection Privée NSUG. Ce costume Obsidian Limited vous intéresse ? Notre prix de base est de 1 200 €. Quel est votre budget d'investissement ?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fait défiler le chat automatiquement vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Validation Zod
    const validation = offerSchema.safeParse(input);
    if (!validation.success) {
      const errorMsg: Message = {
        id: Date.now().toString(),
        sender: 'ai',
        text: validation.error.issues[0].message,
      };
      setMessages((prev) => [...prev, errorMsg]);
      return;
    }

    // Ajoute le message de l'utilisateur
    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/v1/ai/negotiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          productId: 'SKU-OBS-001', // ID du produit en cours de négociation
        }),
      });

      if (!response.ok) throw new Error('Échec de la négociation');

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: 'ai', text: data.message },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Désolé, une erreur technique empêche la négociation.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[550px] bg-[#111] border border-[#222] rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* En-tête Premium */}
      <div className="px-6 py-4 bg-[#161616] border-b border-[#222] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-pulse" />
          <span className="text-white text-sm font-semibold tracking-wide uppercase">
            NSUG AI Negotiator
          </span>
        </div>
        <span className="text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20 font-mono">
          LANGGRAPH CORE v4
        </span>
      </div>

      {/* Zone des messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[85%] rounded-xl p-4 text-xs leading-relaxed transition-all ${
              msg.sender === 'user'
                ? 'bg-[#D4AF37] text-black font-medium self-end rounded-tr-none shadow-[0_4px_12px_rgba(212,175,55,0.15)]'
                : 'bg-[#1A1A1A] text-gray-300 border border-[#262626] self-start rounded-tl-none'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-[#1A1A1A] border border-[#262626] text-gray-500 text-[11px] px-4 py-3 rounded-xl self-start rounded-tl-none animate-pulse">
            Analyse des marges en cours...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulaire de saisie */}
      <form onSubmit={handleSend} className="p-4 bg-[#161616] border-t border-[#222] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Proposer une contre-offre... (ex: 850 €)"
          className="flex-1 bg-[#0A0A0A] border border-[#262626] text-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors"
        />
        <button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#b8952e] text-black font-bold px-5 py-3 rounded-lg text-xs tracking-wider uppercase transition-colors"
        >
          Négocier
        </button>
      </form>
    </div>
  );
}
