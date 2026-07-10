import Link from 'next/link';

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white p-6 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>

      <div className="z-10 w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <Link href="/" className="text-sm text-gray-400 hover:text-blue-400 transition-colors mb-6 inline-block">
          &larr; Back to Home
        </Link>

        <p className="text-gray-400 text-sm mb-6">
          Have any suggestions are just wanna talk? Feel free to reach talk to me.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold mb-1">Email</span>
            <a href="mailto:yeatopnoquestion@gmail.com" className="text-blue-400 hover:underline break-all">
              yeatopnoquestion@gmail.com
            </a>
          </div>

          <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold mb-1">Twitter / X</span>
            <a href="https://x.com/EntomatoP" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              @EntomatoP
            </a>
          </div>

        <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
            <span className="text-xs text-gray-500 block uppercase tracking-wider font-semibold mb-1">Discord</span>
            <span className="text-emerald-400 font-medium">
                devowtion
            </span>
        </div>

        </div>
      </div>

    </main>
  );
}