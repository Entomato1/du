"use client";

import { useState, useEffect } from 'react';

type Player = {
  id: string;
  name: string;
  position: string;
  value: number;
};

export default function Calculator() {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live trade values directly from FantasyCalc
  useEffect(() => {
    const fetchFantasyCalcPlayers = async () => {
      try {
        const response = await fetch('https://api.fantasycalc.com/values/current?isDynasty=true&numQbs=1&numTeams=12&ppr=1');
        const data = await response.json();

        const offensivePlayers: Player[] = data
          .filter((item: any) => item.player && ['QB', 'RB', 'WR', 'TE'].includes(item.player.position))
          .map((item: any) => ({
            id: item.player.sleeperId || item.player.id?.toString() || item.player.name,
            name: item.player.name,
            position: item.player.position,
            value: item.value || 0, 
          }))
          .sort((a: Player, b: Player) => b.value - a.value);

        setAllPlayers(offensivePlayers);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch FantasyCalc players:", error);
        setIsLoading(false);
      }
    };

    fetchFantasyCalcPlayers();
  }, []);

  // Functions to add/remove players
  const addToTeamA = (player: Player) => {
    if (!teamA.some((p) => p.id === player.id)) setTeamA([...teamA, player]);
  };

  const addToTeamB = (player: Player) => {
    if (!teamB.some((p) => p.id === player.id)) setTeamB([...teamB, player]);
  };

  const removeFromTeamA = (playerId: string) => {
    setTeamA(teamA.filter(p => p.id !== playerId));
  };

  const removeFromTeamB = (playerId: string) => {
    setTeamB(teamB.filter(p => p.id !== playerId));
  };

  // Math
  const totalValueA = teamA.reduce((sum, p) => sum + p.value, 0);
  const totalValueB = teamB.reduce((sum, p) => sum + p.value, 0);

  // Search Filter logic
  const displayedPlayers = allPlayers
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 50);

  // --- NEW SLIDER MATH ---
  // We cap the visual extreme at a 5,000 point difference. 
  // Any difference larger than 5k will just pin the slider to the absolute edge.
  const maxDiff = 5000; 
  let sliderPos = 50; // Default to dead center

  if (totalValueA > 0 || totalValueB > 0) {
    const diff = totalValueB - totalValueA; // Negative means A is winning, Positive means B is winning
    sliderPos = 50 + (diff / maxDiff) * 50;
    // Clamp the value so the slider doesn't fly off the screen if the trade is insanely lopsided
    sliderPos = Math.max(0, Math.min(100, sliderPos));
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-950 text-white p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>

      <header className="w-full max-w-5xl py-6 border-b border-gray-800 mb-10 flex justify-between items-center z-10">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
          DynastyHub Calculator
        </h1>
        <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full uppercase tracking-widest border border-gray-700">
          Values provided currently by FantasyCalc
        </span>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        
        {/* Left Side: Team A */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-400">Side A Receives</h2>
            <ul className="space-y-2">
              {teamA.length === 0 && <p className="text-gray-500 text-sm italic">No players added.</p>}
              {teamA.map((p) => (
                <li key={p.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center border border-gray-700 group">
                  <div>
                    <span className="block text-sm font-medium">{p.name}</span>
                    <span className="text-xs text-gray-400">{p.position}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-blue-400">{p.value}</span>
                    <button onClick={() => removeFromTeamA(p.id)} className="text-red-400 hover:text-red-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-right">
            <span className="text-sm text-gray-400 block">Total Value</span>
            <span className="text-2xl font-bold text-blue-400">{totalValueA}</span>
          </div>
        </div>

        {/* Middle: Available Player Pool with Search */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl flex flex-col h-[600px]">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-300 flex justify-between items-center mb-3">
              Player Pool
              {isLoading && <span className="text-xs text-emerald-400 animate-pulse">Loading...</span>}
            </h2>
            
            <input 
              type="text" 
              placeholder="Search players..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-2">
            {!isLoading && displayedPlayers.length === 0 && (
              <p className="text-gray-500 text-sm italic">No players match your search.</p>
            )}
            {displayedPlayers.map((player) => (
              <div key={player.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex flex-col gap-2 hover:border-gray-600 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm">{player.name}</div>
                    <div className="text-xs text-gray-400">{player.position} • {player.value} pts</div>
                  </div>
                </div>
                <div className="flex gap-2 w-full mt-1">
                  <button onClick={() => addToTeamA(player)} className="flex-1 text-xs bg-blue-900/40 hover:bg-blue-600 border border-blue-800/50 text-blue-300 hover:text-white font-medium py-1.5 rounded transition">
                    + Side A
                  </button>
                  <button onClick={() => addToTeamB(player)} className="flex-1 text-xs bg-emerald-900/40 hover:bg-emerald-600 border border-emerald-800/50 text-emerald-300 hover:text-white font-medium py-1.5 rounded transition">
                    + Side B
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Team B */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Side B Receives</h2>
            <ul className="space-y-2">
              {teamB.length === 0 && <p className="text-gray-500 text-sm italic">No players added.</p>}
              {teamB.map((p) => (
                <li key={p.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center border border-gray-700 group">
                  <div>
                    <span className="block text-sm font-medium">{p.name}</span>
                    <span className="text-xs text-gray-400">{p.position}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-emerald-400">{p.value}</span>
                    <button onClick={() => removeFromTeamB(p.id)} className="text-red-400 hover:text-red-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-right">
            <span className="text-sm text-gray-400 block">Total Value</span>
            <span className="text-2xl font-bold text-emerald-400">{totalValueB}</span>
          </div>
        </div>
      </div>

      {/* Trade Verdict & Slider */}
      <div className="w-full max-w-5xl mt-8 bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl z-10">
        
        {/* Dynamic Visual Slider */}
        <div className="relative w-full h-3 bg-gradient-to-r from-blue-500 via-gray-700 to-emerald-500 rounded-full mb-4">
          {/* Dead Center Tick Mark */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-900 opacity-80"></div>
          
          {/* The Drifting Indicator */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-8 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out border border-gray-300"
            style={{ left: `${sliderPos}%` }}
          ></div>
        </div>

        {/* Labels below slider */}
        <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest mb-6">
          <span className="text-blue-500/70">Side A Favored</span>
          <span>Fair Trade</span>
          <span className="text-emerald-500/70">Side B Favored</span>
        </div>

        {/* Text Verdict */}
        <p className="text-xl font-bold text-center">
          {totalValueA === 0 && totalValueB === 0 ? (
            <span className="text-gray-500">Add players to evaluate the trade</span>
          ) : Math.abs(totalValueA - totalValueB) < 1000 ? (
            <span className="text-gray-300">Fair Trade!</span>
          ) : totalValueA > totalValueB ? (
            <span className="text-blue-400">Side A wins this trade by {totalValueA - totalValueB} pts</span>
          ) : (
            <span className="text-emerald-400">Side B wins this trade by {totalValueB - totalValueA} pts</span>
          )}
        </p>
      </div>
    </main>
  );
}