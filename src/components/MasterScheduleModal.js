// src/components/MasterScheduleModal.js
import React from 'react';
import * as Icons from '../constants/icons';
import { StandingsTable } from './StandingsTable';

export const MasterScheduleModal = ({
  theme,
  setShowMasterModal,
  sponsorLogos,
  championshipTitles,
  phase1Standings,
  getStandings,
  tournamentType,
  hasPhase2GroupStage,
  stage,
  knockoutData,
  isTeamEvent,
  teamLogos,
  generateMasterPlan,
  formatMatchScore,
  handleExportPNG,
  isExportingPng
}) => {

  // Fungsi pembuat bagan sistem gugur dipindahkan ke sini agar terisolasi
  const renderAestheticBracket = () => {
    if (knockoutData.length === 0) return null;
    
    let jointThirdTeams = null;
    const sfIndex = knockoutData.findIndex(r => r && r.length > 0 && r[0].title.includes('SEMI'));
    if (sfIndex !== -1 && knockoutData[sfIndex].length === 2) {
        const m1 = knockoutData[sfIndex][0]; 
        const m2 = knockoutData[sfIndex][1];
        
        const getLoser = (match, defaultLabel) => {
            if (match.winner && match.winner !== '?') {
                return match.winner === match.teamA ? match.teamB : match.teamA;
            }
            return defaultLabel;
        };

        const loser1 = getLoser(m1, "KALAH SEMIFINAL 1");
        const loser2 = getLoser(m2, "KALAH SEMIFINAL 2");
        jointThirdTeams = [loser1, loser2];
    }

    const getTeamScore = (matchInfo, isTeamA) => {
        if (!matchInfo || !matchInfo.winner || matchInfo.winner === '?') return "-";
        if (isTeamEvent) return isTeamA ? matchInfo.winsA : matchInfo.winsB;
        if (matchInfo.parties && matchInfo.parties[0]) {
            let wA = 0, wB = 0;
            matchInfo.parties[0].sets.forEach(s => { 
                const a = parseInt(s.scoreA), b = parseInt(s.scoreB); 
                if (!isNaN(a) && !isNaN(b)) { if (a > b) wA++; else if (b > a) wB++; } 
            });
            return isTeamA ? wA : wB;
        } 
        return "-";
    };

    const BracketBox = ({ matchInfo }) => {
        const tA = matchInfo.teamA || "?"; const tB = matchInfo.teamB || "?"; const w = matchInfo.winner;
        const sA = matchInfo.isBye ? (w === tA ? 'BYE' : '') : getTeamScore(matchInfo, true);
        const sB = matchInfo.isBye ? (w === tB ? 'BYE' : '') : getTeamScore(matchInfo, false);
        return (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-1 w-full relative print-break-inside-avoid">
                <div className={`text-[9px] font-black flex justify-between ${w === tA && w !== '?' ? 'text-emerald-600' : 'text-gray-700'}`}><span className="truncate w-3/4">{tA}</span><span>{sA}</span></div>
                <div className="h-px bg-gray-50 my-1"></div>
                <div className={`text-[9px] font-black flex justify-between ${w === tB && w !== '?' ? 'text-emerald-600' : 'text-gray-700'}`}><span className="truncate w-3/4">{tB}</span><span>{sB}</span></div>
            </div>
        )
    };

    return (
        <div className="flex gap-8 min-w-max items-center justify-start p-6 bg-gray-50/30 rounded-[40px] border border-gray-50 print-break-inside-avoid">
            {knockoutData.map((round, rIdx) => {
                const isFinal = rIdx === knockoutData.length - 1;
                if (isFinal) {
                    const fM = round[0];
                    return (
                        <div key={rIdx} className="flex flex-col gap-6 w-64 items-center">
                           <div className="text-[9px] font-black text-emerald-600 text-center mb-4 tracking-[0.3em]">{fM.title}</div>
                           <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[32px] p-8 shadow-xl flex flex-col gap-3 w-full text-center relative print-break-inside-avoid">
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[8px] font-black px-4 py-1 rounded-full">FINALIS</div>
                              <div className="flex justify-between items-center w-full px-2">
                                  <div className={`text-[10px] font-black truncate w-1/3 text-right ${fM.winner === fM.teamA ? 'text-emerald-700' : 'text-emerald-900'}`}>{fM.teamA}</div>
                                  <div className="flex flex-col items-center justify-center w-1/3"><div className="text-[10px] font-black text-emerald-500 mb-1">VS</div><div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-[9px] font-black">{getTeamScore(fM, true)} - {getTeamScore(fM, false)}</div></div>
                                  <div className={`text-[10px] font-black truncate w-1/3 text-left ${fM.winner === fM.teamB ? 'text-emerald-700' : 'text-emerald-900'}`}>{fM.teamB}</div>
                              </div>
                           </div>
                           {jointThirdTeams && (
                              <div className="mt-8 text-center print-break-inside-avoid">
                                 <div className="text-amber-500 font-black text-xs flex flex-col items-center gap-2"><Icons.IconTrophy /><span className="tracking-widest">JUARA 3 BERSAMA</span></div>
                                 <div className="mt-3 bg-amber-50/50 border border-amber-100 rounded-xl p-2 shadow-sm text-[10px] font-black text-amber-800 flex flex-col gap-1">
                                    <div>{jointThirdTeams[0]}</div><div className="h-px bg-amber-200/50"></div><div>{jointThirdTeams[1]}</div>
                                 </div>
                              </div>
                           )}
                        </div>
                    )
                }
                return (
                    <div key={rIdx} className={`flex flex-col w-56 justify-around h-full ${rIdx > 0 ? 'gap-12' : 'gap-6'}`}>
                        <div className={`text-[9px] font-black text-gray-400 text-center tracking-widest ${rIdx > 0 ? '-mt-8 mb-2' : 'mb-2'}`}>{round[0].title}</div>
                        {round.map((m, i) => <BracketBox key={i} matchInfo={m} />)}
                    </div>
                );
            })}
        </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300 master-modal-overlay">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden master-modal-content">
         <div className={`p-6 flex justify-between items-center ${theme.header} text-white no-print`}>
            <div>
               <h2 className="text-2xl font-black uppercase tracking-tight">Master Schedule & Results</h2>
               <p className="text-xs opacity-70 font-bold tracking-widest uppercase">Laporan Klasemen & Jadwal Induk Terpadu</p>
            </div>
            <button onClick={() => setShowMasterModal(false)} className="bg-white/20 hover:bg-white/40 p-2 rounded-xl transition-colors"><Icons.IconX /></button>
         </div>

         <div id="master-print-area" className="p-10 overflow-y-auto bg-white flex-1 uppercase relative">
            <div className="text-center mb-10 border-b pb-8 print-break-inside-avoid">
               
               {sponsorLogos && sponsorLogos.length > 0 && (
                  <div className="flex justify-center flex-wrap gap-4 mb-6">
                    {sponsorLogos.map((logo, index) => (
                      <div key={index} className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
                        <img src={logo} alt="Sponsor" className="max-w-full max-h-full object-contain" />
                      </div>
                    ))}
                  </div>
               )}

               <h1 className="text-4xl font-black uppercase text-gray-900 tracking-tight mb-2">{championshipTitles[0] || "NAMA KEJUARAAN"}</h1>
               <p className="text-xl font-bold text-gray-500 uppercase">{championshipTitles[1] || "KETERANGAN"}</p>
               <p className="text-xs font-bold text-gray-400 mt-2 uppercase">{championshipTitles[2]}</p>
            </div>

            {phase1Standings && <StandingsTable standingsData={phase1Standings} title="HASIL FASE 1 (PENYISIHAN AWAL)" borderColor="border-blue-500" isTeamEvent={isTeamEvent} teamLogos={teamLogos} />}
            
            {(!phase1Standings && (tournamentType === 'Groups' || tournamentType === 'Group')) && <StandingsTable standingsData={getStandings()} title="FASE PENYISIHAN" borderColor="border-amber-400" isTeamEvent={isTeamEvent} teamLogos={teamLogos} />}
            
            {(phase1Standings && hasPhase2GroupStage && stage >= 2) && <StandingsTable standingsData={getStandings()} title="HASIL FASE 2" borderColor="border-amber-400" isTeamEvent={isTeamEvent} teamLogos={teamLogos} />}

            {knockoutData.length > 0 && (
              <div className="mb-12 print-break-inside-avoid">
                  <h3 className="text-lg font-black uppercase mb-6 border-l-4 border-emerald-500 pl-4 text-gray-800">FASE SISTEM GUGUR</h3>
                  <div className="overflow-x-auto pb-4">
                      {renderAestheticBracket()}
                  </div>
              </div>
            )}

            <div className="mb-12 print-break-inside-avoid">
               <h3 className="text-lg font-black uppercase mb-6 border-l-4 border-blue-500 pl-4 text-gray-800">Seluruh Jadwal & Hasil</h3>
               <table className="w-full border-collapse">
                  <thead>
                     <tr className="bg-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <th className="p-4 text-left rounded-tl-xl">ID</th>
                        <th className="p-4 text-left">FASE / GRUP</th>
                        <th className="p-4 text-center">PERTANDINGAN</th>
                        <th className="p-4 text-right rounded-tr-xl">HASIL</th>
                     </tr>
                  </thead>
                  <tbody>
                    {generateMasterPlan().map((m, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-black text-gray-400">{String(m.id) !== 'TBD' ? `#${m.id}` : m.id}</td>
                        <td className="p-4"><span className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 shadow-sm">{m.label || m.groupLabel}</span></td>
                        <td className="p-4 font-black text-center">
                          <div className="flex justify-center items-center gap-4">
                             <span className={`w-1/2 text-right uppercase ${m.winner === m.teamA && m.winner !== '?' && m.winner !== 'SERI' ? 'text-emerald-600' : 'text-gray-800'}`}>{m.teamA}</span>
                             <span className="text-[10px] text-gray-300 bg-gray-50 px-2 py-1 rounded-md">VS</span>
                             <span className={`w-1/2 text-left uppercase ${m.winner === m.teamB && m.winner !== '?' && m.winner !== 'SERI' ? 'text-emerald-600' : 'text-gray-800'}`}>{m.teamB}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                           {m.winner && m.winner !== '?' ? (
                             <span className={`text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm ${m.winner==='SERI'?'bg-gray-100 text-gray-500 border border-gray-200':'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                                {formatMatchScore(m)}
                             </span>
                           ) : ( 
                             <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">TBD</span> 
                           )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="p-6 bg-gray-50 border-t flex justify-end gap-3 shrink-0 no-print">
            <button onClick={handleExportPNG} disabled={isExportingPng} className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-black text-sm hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2">
                {isExportingPng ? <span className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></span> : <Icons.IconImage />} Export Gambar (PNG)
            </button>
            <button onClick={() => window.print()} className="bg-gray-800 hover:bg-black text-white px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-colors">
               <Icons.IconPrinter /> Cetak PDF Resmi
            </button>
         </div>
      </div>
    </div>
  );
};