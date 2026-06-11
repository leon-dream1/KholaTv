import Link from 'next/link';

export default function FifaHeroBanner() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 border border-gray-800 shadow-2xl group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03152d] via-[#052b5c] to-[#041a37]">
        {/* Diagonal Light Rays */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:bg-[position:100%_100%] transition-all duration-[3000ms] ease-in-out"></div>
      </div>

      {/* Players Imagery - Wow Factor Layout */}
      
      {/* --- LEFT SIDE (Messi, Mbappe, Lamin) --- */}
      {/* Messi (Main Left) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-8 h-24 w-24 md:h-36 md:w-36 rounded-full border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] z-20 overflow-hidden hover:scale-110 hover:z-50 transition-transform duration-300">
        <img src="/messi.jpg" alt="Messi" className="w-full h-full object-cover object-top" />
      </div>
      
      {/* Mbappe (Bottom Left) */}
      <div className="absolute bottom-2 md:bottom-8 left-16 md:left-32 h-16 w-16 md:h-24 md:w-24 rounded-full border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] z-10 overflow-hidden hover:scale-110 hover:z-50 transition-transform duration-300">
        <img src="/mbappe.jpg" alt="Mbappe" className="w-full h-full object-cover object-top" />
      </div>

      {/* Lamin (Top Left) */}
      <div className="absolute top-4 md:top-8 left-20 md:left-40 h-12 w-12 md:h-16 md:w-16 rounded-full border-2 border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.4)] z-10 overflow-hidden hover:scale-110 hover:z-50 transition-transform duration-300">
        <img src="/lamin.jpg" alt="Lamin" className="w-full h-full object-cover object-top" />
      </div>

      {/* --- RIGHT SIDE (Ronaldo, Neymar, Alvarez) --- */}
      {/* Ronaldo (Main Right) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-8 h-24 w-24 md:h-36 md:w-36 rounded-full border-4 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] z-20 overflow-hidden hover:scale-110 hover:z-50 transition-transform duration-300">
        <img src="/ronaldo.jpg" alt="Ronaldo" className="w-full h-full object-cover object-top" />
      </div>

      {/* Neymar (Bottom Right) */}
      <div className="absolute bottom-2 md:bottom-8 right-16 md:right-32 h-16 w-16 md:h-24 md:w-24 rounded-full border-2 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)] z-10 overflow-hidden hover:scale-110 hover:z-50 transition-transform duration-300">
        <img src="/neymar.jpg" alt="Neymar" className="w-full h-full object-cover object-top" />
      </div>

      {/* Alvarez (Top Right) */}
      <div className="absolute top-4 md:top-8 right-20 md:right-40 h-12 w-12 md:h-16 md:w-16 rounded-full border-2 border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.4)] z-10 overflow-hidden hover:scale-110 hover:z-50 transition-transform duration-300">
        <img src="/alvarez.jpg" alt="Alvarez" className="w-full h-full object-cover object-top" />
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
        
        <div className="flex items-center gap-2 text-green-400 font-bold text-xs md:text-sm tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          LIVE FOOTBALL TV
        </div>

        <div className="w-8 h-8 md:w-12 md:h-12 bg-contain bg-center bg-no-repeat mb-2 bg-[url('https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/2026_FIFA_World_Cup_logo.svg/1200px-2026_FIFA_World_Cup_logo.svg.png')]"></div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-1 drop-shadow-lg">
          FIFA WORLD CUP
        </h1>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#facc15] mb-2 drop-shadow-md">
          2026
        </h2>
        
        <div className="text-white text-sm md:text-base font-bold tracking-widest mb-4 drop-shadow-md">
          LIVE MATCH
        </div>

        <div className="bg-[#0b2721] border border-[#115b49] text-[#22c55e] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 mb-6 shadow-lg">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          NO ADS HERE
        </div>

        <Link href="/watch/fifa" className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-gray-900 font-extrabold text-sm md:text-lg px-8 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          Watch Now
        </Link>

      </div>
    </div>
  );
}
