export const PremiumButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-black font-black uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(201,168,76,0.3)]"
  >
    {label}
  </button>
);
