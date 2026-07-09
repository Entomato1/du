"use client";

import { useState } from 'react';

type Player = {
  id: string;
  name: string;
  position: string;
  value: number;
};

export default function Home() {
  const mockPlayers: Player[] = [
    { id: '1', name: 'Justin Jefferson', position: 'WR', value: 9999 },
    { id: '2', name: 'Patrick Mahomes', position: 'QB', value: 9500 },
    { id: '3', name: 'Breece Hall', position: 'RB', value: 8800 },
    { id: '4', name: 'CeeDee Lamb', position: 'WR', value: 9400 },
    { id: '5', name: 'Bijan Robinson', position: 'RB', value: 8900 },
  ];

  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);

  // Functions to add players to either side
  const addToTeamA = (player: Player) => {
    if (!teamA.some((p) => p.id === player.id)) setTeamA([...teamA, player]);
  };

  const addToTeamB = (player: Player) => {
    if (!teamB.some((p) => p.id === player.id)) setTeamB([...teamB, player]);
  };

  const totalValueA = teamA.reduce((sum, p) => sum + p.value, 0);
  const totalValueB = teamB.reduce((sum, p) => sum + p.value, 0);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-950 text-white p-6">
      {/* Header */}
      <header className="w-full max-w-5xl py-6 border-b border-gray-800 mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-500 tracking-tight">DynastyHub</h1>
        <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full uppercase tracking-widest">Local Sandbox MVP</span>
      </header>

      {/* Main Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Team A */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-400">Side A Receives</h2>
            <ul className="space-y-2">
              {teamA.length === 0 && <p className="text-gray-500 text-sm italic">No players added.</p>}
              {teamA.map((p) => (
                <li key={p.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center border border-gray-700">
                  <span>{p.name} <span className="text-xs text-gray-400">({p.position})</span></span>
                  <span className="text-sm font-semibold text-blue-400">{p.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-right">
            <span className="text-sm text-gray-400 block">Total Value</span>
            <span className="text-2xl font-bold">{totalValueA}</span>
          </div>
        </div>

        {/* Middle: Available Player Pool */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gray-300">Available Players</h2>
          <div className="space-y-2">
            {mockPlayers.map((player) => (
              <div key={player.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm">{player.name}</div>
                  <div className="text-xs text-gray-400">{player.position} • {player.value} pts</div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => addToTeamA(player)} className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-2 py-1 rounded transition">
                    + A
                  </button>
                  <button onClick={() => addToTeamB(player)} className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-2 py-1 rounded transition">
                    + B
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
                <li key={p.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center border border-gray-700">
                  <span>{p.name} <span className="text-xs text-gray-400">({p.position})</span></span>
                  <span className="text-sm font-semibold text-emerald-400">{p.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 text-right">
            <span className="text-sm text-gray-400 block">Total Value</span>
            <span className="text-2xl font-bold">{totalValueB}</span>
          </div>
        </div>
      </div>

      {/* Trade Verdict */}
      <div className="w-full max-w-5xl mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6 text-center shadow-xl">
        <h3 className="text-sm font-medium text-gray-400 mb-1">Trade Verdict</h3>
        <p className="text-xl font-bold">
          {totalValueA === 0 && totalValueB === 0 ? (
            <span className="text-gray-500">Add players to evaluate the trade</span>
          ) : Math.abs(totalValueA - totalValueB) < 1000 ? (
            <span className="text-emerald-400">Fair Trade!</span>
          ) : totalValueA > totalValueB ? (
            <span className="text-blue-400">Side A wins this trade</span>
          ) : (
            <span className="text-emerald-400">Side B wins this trade</span>
          )}
        </p>
      </div>
    </main>
  );
}