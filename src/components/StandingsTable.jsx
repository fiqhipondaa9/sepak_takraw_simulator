// src/components/StandingsTable.jsx
import React, { memo } from 'react';

export const StandingsTable = memo(({ 
  standingsData, title, borderColor, isTeamEvent, teamLogos = {} 
}) => {
  if (!standingsData || Object.keys(standingsData).length === 0) return null;

  return (
    <div className="mb-12 print-break-inside-avoid">
      <h3 className={`text-lg font-black uppercase mb-6 border-l-4 ${borderColor} pl-4 text-gray-800`}>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(standingsData)
          .filter(([gn]) => !gn.toLowerCase().includes('unknown') && !gn.toLowerCase().includes('eliminated'))
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([gn, gt]) => (
          <div key={gn} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm print-break-inside-avoid overflow-x-auto">
            <div className="text-center font-black text-xs mb-3 text-gray-400 uppercase tracking-widest">{gn}</div>
            <table className="w-full text-xs font-bold text-left whitespace-nowrap">
              <thead>
                <tr className="text-gray-400 border-b border-gray-200 text-[9px] uppercase tracking-widest">
                  <th className="p-2">#</th>
                  <th className="p-2">TIM</th>
                  <th className="p-2 text-center" title="Main">P</th>
                  <th className="p-2 text-center" title="Menang">W</th>
                  <th className="p-2 text-center" title="Kalah">L</th>
                  {isTeamEvent && <th className="p-2 text-center" title="Rasio Partai (Menang - Kalah)">PRT</th>}
                  <th className="p-2 text-center" title="Rasio Set (Menang - Kalah)">SET</th>
                  {/* FITUR BARU: Kolom Selisih Poin */}
                  <th className="p-2 text-center" title="Selisih Poin (Memasukkan - Kemasukan)">PN</th>
                  <th className="p-2 text-right" title="Poin Klasemen">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gt.map((stat, i) => (
                  <tr key={stat.team} className={i === 0 ? "bg-white" : "hover:bg-gray-100/50"}>
                    <td className="p-2 text-gray-400">{i+1}</td>
                    
                    <td className="p-2 text-gray-800 uppercase font-black flex items-center gap-2">
                      {teamLogos[stat.team] && <img src={teamLogos[stat.team]} className="w-5 h-5 rounded-md object-cover border border-gray-200" alt="" />}
                      {stat.team}
                    </td>
                    
                    <td className="p-2 text-center text-gray-500">{stat.play}</td>
                    <td className="p-2 text-center text-emerald-600">{stat.win}</td>
                    <td className="p-2 text-center text-gray-400">{stat.lose}</td>
                    
                    {isTeamEvent && (
                      <td className="p-2 text-center text-gray-500 tracking-wider">
                        {stat.partyWin}-{stat.partyLose}
                      </td>
                    )}
                    
                    <td className="p-2 text-center text-gray-500 tracking-wider">
                      {stat.setWin}-{stat.setLose}
                    </td>

                    {/* FITUR BARU: Menampilkan Rasio/Selisih Poin */}
                    <td className="p-2 text-center text-gray-500 tracking-wider">
                      {stat.pointWin}-{stat.pointLose}
                    </td>

                    <td className="p-2 text-right text-base font-black text-gray-800">
                      {stat.totalPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
});