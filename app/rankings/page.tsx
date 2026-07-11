"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Player = {
  id: string;
  name: string;
  position: string;
  value: number;
  rank?: number;
};

export default function Rankings() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live values from FantasyCalc
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch('https://api.fantasycalc.com/values/current?isDynasty=true&numQbs=1&numTeams=12&ppr=1');
        const data = await response.json();

        const formattedPlayers: Player[] = data
          .filter((item: any) => item.player && ['QB', 'RB', 'WR', 'TE'].includes(item.player.position))
          .map((item: any) => ({
            id: item.player.sleeperId || item.player.id?.toString() || item.player.name,
            name: item.player.name,
            position: item.player.position,
            value: item.value || 0,
          }))
          .sort((a: Player, b: Player) => b.value - a.value)
          // Assign an overall rank based on the sorted order
          .map((player: Player, index: number) => ({ ...player, rank: index + 1 }));

        setPlayers(formattedPlayers);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, []);

  // Filter logic for Search and Position tabs
  const filteredPlayers = players.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = positionFilter === "ALL" || p.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-950 text-white p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>

      <header className="w-full max-w-4xl py-6 border-b border-gray-800 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center z-10">
        <div>
          <Link href="/" className="text-sm text-gray-400 hover:text-blue-400 transition-colors mb-2 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
            Dynasty Rankings
          </h1>
        </div>
      </header>

      <div className="w-full max-w-4xl z-10">
        {/* Controls: Search and Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-xl mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <input 
            type="text" 
            placeholder="Search players..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-gray-950 border border-gray-700 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <div className="flex bg-gray-950 border border-gray-700 rounded-lg overflow-hidden">
            {["ALL", "QB", "RB", "WR", "TE"].map((pos) => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  positionFilter === pos 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* Rankings List */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-emerald-400 animate-pulse font-semibold">
              Loading Live Market Data...
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-950 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-2 text-center">Rank</div>
                <div className="col-span-6">Player</div>
                <div className="col-span-4 text-right">Value</div>
              </div>

              {/* Player Rows (Limit to top 100 for performance) */}
              <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                {filteredPlayers.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 italic">No players found matching your criteria.</div>
                ) : (
                  filteredPlayers.slice(0, 100).map((player) => (
                    <div 
                      key={player.id} 
                      className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors items-center"
                    >
                      <div className="col-span-2 text-center font-black text-gray-600 text-lg">
                        #{player.rank}
                      </div>
                      <div className="col-span-6">
                        <span className="font-bold text-gray-200 block md:inline md:mr-2">{player.name}</span>
                        <span className="text-xs text-gray-500 font-medium">{player.position}</span>
                      </div>
                      <div className="col-span-4 text-right font-bold text-emerald-400">
                        {player.value.toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}