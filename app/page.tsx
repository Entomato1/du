import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white p-6 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

      <div className="z-10 text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">DynastyHub</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          The fastest, most accurate way to audit your rosters and calculate blockbuster dynasty trades. Stop guessing, start winning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* This Link component is how Next.js changes pages instantly */}
          <Link 
            href="/calculator" 
            className="px-8 py-4 bg-white text-gray-950 font-bold rounded-full hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg shadow-white/10"
          >
            Go to Trade Calculator (Test)
          </Link>
          
          <button className="px-8 py-4 bg-gray-800 text-white font-bold rounded-full border border-gray-700 hover:bg-gray-700 transition cursor-not-allowed opacity-50">
            Rankings (Coming Soon)
          </button>
        </div>
      </div>

    </main>
  );
}