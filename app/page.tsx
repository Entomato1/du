import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white p-6 relative overflow-hidden">
      
      <div className="absolute top-6 right-6 z-20">
        <Link 
          href="/contact" 
          className="px-5 py-2 bg-gray-900 border border-gray-800 text-gray-300 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-all shadow-md"
        >
          Contact
        </Link>
      </div>


      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

      <div className="z-10 text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">DynastyHub</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          WELCOME! This is a little passion project for fantasy football dynasty leagues. Hope you enjoy!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Calculator Link */}
          <Link 
            href="/calculator" 
            className="px-8 py-4 bg-white text-gray-950 font-bold rounded-full hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg shadow-white/10"
          >
            Go to Trade Calculator
          </Link>
          
          {/* NEW: Rankings Link */}
          <Link 
            href="/rankings"
            className="px-8 py-4 bg-gray-800 text-white font-bold rounded-full border border-gray-700 hover:bg-gray-700 transition-transform hover:scale-105 shadow-lg shadow-black/20"
          >
            View Rankings
          </Link>
        </div>
      </div>

    </main>
  );
}