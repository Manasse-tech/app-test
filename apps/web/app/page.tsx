'use client';

import React from 'react';
import NegotiationWidget from './components/NegotiationWidget';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Barre de navigation simplifiée */}
      <nav className="w-full border-b border-[#1A1A1A] bg-[#0E0E0E] px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-[#D4AF37] tracking-widest">NSUG</span>
          <span className="text-[10px] text-gray-500 tracking-wider uppercase bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
            ENTERPRISE
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        {/* Partie gauche : Le produit (7 colonnes) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/5 px-3 py-1 rounded-full border border-[#D4AF37]/10">
              Vitrine Démo Active
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white mt-4">
              Collection Haute Couture Impériale
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Négociez directement l'ensemble du catalogue de luxe auprès de notre agent cognitif
              autonome.
            </p>
          </div>

          {/* Carte Produit */}
          <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl overflow-hidden shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 group">
            <div className="h-80 bg-gradient-to-b from-[#1c1c1c] to-[#111] flex items-center justify-center relative">
              <span className="text-8xl group-hover:scale-110 transition-transform duration-500">
                🧥
              </span>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-[#2A2A2A]">
                <span className="text-[10px] text-[#D4AF37] uppercase font-mono tracking-widest">
                  SKU-OBS-001
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">Costume Obsidian Limited</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Tissage haut de gamme - Fils dorés 24 carats
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#D4AF37]">1 200 €</span>
                  <p className="text-xs text-gray-500 line-through">1 800 €</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">
                Conçu pour l'élite technologique et les cadres dirigeants de licornes. Intègre une
                doublure en soie noire et une coupe ajustée. Ce produit est protégé contre la
                revente spéculative par notre smart-contract interne.
              </p>

              <div className="pt-4 border-t border-[#1C1C1C] flex gap-3 text-[11px] font-mono text-gray-500">
                <div>
                  Stock: <span className="text-white">Disponible</span>
                </div>
                <div>•</div>
                <div>
                  Livraison: <span className="text-white">48h Chrono</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partie droite : Le Widget IA (5 colonnes) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <NegotiationWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
