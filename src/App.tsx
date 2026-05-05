// src/App.js
import React, { useState, useCallback } from 'react';
import './index.css';

import { themes } from './constants/themes';
import * as Icons from './constants/icons';
import { useTournament } from './hooks/useTournament';
import { MatchCard } from './components/MatchCard';
import { StandingsTable } from './components/StandingsTable';

export default function App() {
  const [activeTheme, setActiveTheme] = useState('emerald');
  const theme = themes[activeTheme] || themes.emerald;
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  
  const {
    stage, setStage, matchHistory, teams, setTeams, schedule, setSchedule,
    tournamentType, setTournamentType, numGroups, setNumGroups,
    groupAssignments, selectedEventFormat, mixDisciplines, courts, teamLogos, 
    championshipTitles, setChampionshipTitles, setKnockoutData,
    undoStack, saveSnapshot, handleRollback, moveMatchSchedule, updateMatchDateTime, handleScoreChange
  } = useTournament();

  const [inputValue, setInputValue] = useState('');

  const isTeamEvent = selectedEventFormat.toUpperCase().includes('TEAM');
  let eventDiscipline = 'Regu';
  if (selectedEventFormat.toUpperCase().includes('DOUBLE')) eventDiscipline = 'Double';
  else if (selectedEventFormat.toUpperCase().includes('QUADRANT')) eventDiscipline = 'Quadrant';
  else if (selectedEventFormat.toUpperCase().includes('MIXED')) eventDiscipline = 'Mix';

  // LOGIKA 1 POOL TAMAT
  const isActivePhaseFinished = schedule.length > 0 && schedule.every(match => match.winner !== null);
  const isSinglePoolCompleted = tournamentType === 'Group' && isActivePhaseFinished;

  const getStandings = useCallback(() => {
    let standings = {};
    teams.forEach(t => { 
      standings[t] = { team: t, group: tournamentType === 'Groups' ? (groupAssignments[t] ? `Grup ${groupAssignments[t]}` : 'Unknown') : 'Pool Utama', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 }; 
    });

    const filteredMatches = [...matchHistory, ...schedule].filter(match => match.winner && match.winner !== '?');

    filteredMatches.forEach(match => {
      const tA = match.teamA; const tB = match.teamB;
      if(!standings[tA] || !standings[tB]) return;

      standings[tA].play += 1; standings[tB].play += 1;
      if (match.winner === tA) { standings[tA].win += 1; standings[tB].lose += 1; } 
      else if (match.winner === tB) { standings[tB].win += 1; standings[tA].lose += 1; }

      let mPWA = 0; let mPWB = 0;
      match.parties?.forEach(party => {
        if (party.winner === tA) { standings[tA].partyWin += 1; standings[tB].partyLose += 1; mPWA += 1; } 
        else if (party.winner === tB) { standings[tB].partyWin += 1; standings[tA].partyLose += 1; mPWB += 1; }
        party.sets.forEach(set => {
          const a = parseInt(set.scoreA); const b = parseInt(set.scoreB);
          if (!isNaN(a) && !isNaN(b)) {
            if (a > b) { standings[tA].setWin += 1; standings[tB].setLose += 1; } else if (b > a) { standings[tB].setWin += 1; standings[tA].setLose += 1; }
            standings[tA].pointWin += a; standings[tA].pointLose += b; standings[tB].pointWin += b; standings[tB].pointLose += a;
          }
        });
      });

      if (isTeamEvent) {
        if (match.winner === tA) { standings[tA].totalPoints += (mPWB === 1) ? 2 : 3; standings[tB].totalPoints += (mPWB === 1) ? 1 : 0; } 
        else if (match.winner === tB) { standings[tB].totalPoints += (mPWA === 1) ? 2 : 3; standings[tA].totalPoints += (mPWA === 1) ? 1 : 0; }
      } else {
        if (match.winner === tA) standings[tA].totalPoints += 2; else if (match.winner === tB) standings[tB].totalPoints += 2;
      }
    });

    const sortedTeams = Object.values(standings).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints; 
      if (isTeamEvent) { const aP = a.partyWin - a.partyLose; const bP = b.partyWin - b.partyLose; if (bP !== aP) return bP - aP; } 
      const aS = a.setWin - a.setLose; const bS = b.setWin - b.setLose; if (bS !== aS) return bS - aS; 
      const aPt = a.pointWin - a.pointLose; const bPt = b.pointWin - b.pointLose; if (bPt !== aPt) return bPt - aPt; 
      return 0; 
    });

    const grouped = {};
    sortedTeams.forEach(stat => { if (!grouped[stat.group]) grouped[stat.group] = []; grouped[stat.group].push(stat); });
    return grouped;
  }, [teams, matchHistory, schedule, tournamentType, groupAssignments, isTeamEvent]);

  const generateSchedule = () => {
    if (tournamentType === 'Groups' && !teams.every(t => groupAssignments[t])) return alert("Ada tim yang belum masuk ke dalam grup!");
    saveSnapshot(); 
    
    let allMatches = [];
    const createRR = (gTeams, label) => {
      if(gTeams.length < 2) return []; let sch = []; let cur = [...gTeams]; if(cur.length % 2 !== 0) cur.push(null);
      const n = cur.length; 
      for(let r=0; r<n-1; r++){ 
        for(let i=0; i<n/2; i++){ 
          if(cur[i] && cur[n-1-i]) sch.push({ teamA: cur[i], teamB: cur[n-1-i], groupLabel: label, roundLabel: 'P1' }); 
        } 
        cur.splice(1, 0, cur.pop()); 
      } return sch;
    };

    if (tournamentType === 'Groups') {
      const gl = Array.from({length: Number(numGroups) || 2}, (_, i) => String.fromCharCode(65 + i));
      let gM = {}; let maxM = 0;
      gl.forEach(g => { const t = teams.filter(x => groupAssignments[x] === g); const m = createRR(t, `Grup ${g}`); gM[g] = m; if(m.length > maxM) maxM = m.length; });
      for (let i = 0; i < maxM; i++) { gl.forEach(g => { if (gM[g] && gM[g][i]) allMatches.push(gM[g][i]); }); }
    } else { 
      allMatches = createRR(teams, 'Pool Utama'); 
    }

    let fSch = []; let counter = 1;
    const nP = isTeamEvent ? 3 : 1;
    const pL = eventDiscipline === 'Mix' ? mixDisciplines : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];
    const aC = courts.length > 0 ? courts : ['Lap. Utama'];
    
    let cTimes = aC.map(() => { let t = new Date(); t.setHours(8, 0, 0, 0); return t; });
    const addMins = isTeamEvent ? 120 : 45;

    allMatches.forEach(m => {
      let pts = []; for(let p=0; p<nP; p++) pts.push({ id: `p${p}`, label: isTeamEvent ? pL[p] : `Match`, sets: [{scoreA:'',scoreB:''},{scoreA:'',scoreB:''},{scoreA:'',scoreB:''}], winner: null });
      let eIdx = 0; for(let i=1; i<cTimes.length; i++) if(cTimes[i] < cTimes[eIdx]) eIdx = i;
      
      fSch.push({ 
        id: counter++, teamA: m.teamA, teamB: m.teamB, groupLabel: m.groupLabel, roundLabel: m.roundLabel, 
        parties: pts, winner: null, winsA: 0, winsB: 0, 
        date: cTimes[eIdx].toISOString().slice(0, 10), 
        time: cTimes[eIdx].toLocaleTimeString([],{hour:'2-digit',minute:'2-digit', hour12: false}), 
        court: aC[eIdx] 
      });
      cTimes[eIdx].setMinutes(cTimes[eIdx].getMinutes() + addMins);
    });

    setSchedule(fSch); setKnockoutData([]); setStage(1); 
  };

  return (
    <div className={`min-h-screen uppercase ${theme.bgApp} font-sans text-gray-800 pb-20 transition-all duration-500`}>
      <style>{`
        .hide-arrows::-webkit-outer-spin-button, .hide-arrows::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; } 
        .hide-arrows { -moz-appearance: textfield; } 
        @media print { @page { size: landscape; margin: 10mm; } body { background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none !important; } }
      `}</style>

      {/* HEADER NAVIGASI ADMIN DENGAN SIGNATURE */}
      {!isProjectorMode && (
        <div className="no-print sticky top-0 z-40 p-4 backdrop-blur-md bg-white/60 border-b border-white/20 shadow-sm flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className={`${theme.primary} text-white p-2 rounded-xl shadow-md`}><Icons.IconTrophy /></div>
              <div className="hidden sm:block">
                 <div className="font-black tracking-widest text-gray-800 leading-none">SEPAK TAKRAW<span className={theme.textPrimary}> Tournament Management System</span></div>
                 <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${theme.textPrimary} opacity-70`}>by fiqhipondaa9</div>
              </div>
           </div>
           <div className="flex items-center gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
              <button onClick={() => setIsProjectorMode(true)} className={`${theme.accent} ${theme.accentHover} ${theme.accentText} px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black shadow-md`}><Icons.IconMonitor /> LIVE VIEW</button>
           </div>
        </div>
      )}

      <main className={`max-w-7xl mx-auto mt-6 px-4 space-y-6 ${isProjectorMode ? 'max-w-full' : ''}`}>
        
        <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 relative p-8 print-break-inside-avoid ${isProjectorMode ? 'shadow-2xl' : ''}`}>
           <div className={`absolute top-0 left-0 w-full h-3 ${theme.primary}`}></div>
           <div className="flex flex-col items-center max-w-5xl mx-auto">
             <input value={championshipTitles[0]} onChange={(e) => setChampionshipTitles([e.target.value, championshipTitles[1], championshipTitles[2]])} readOnly={isProjectorMode} className={`font-black text-gray-900 text-center uppercase focus:outline-none focus:bg-gray-50 rounded-2xl bg-transparent w-full ${isProjectorMode ? 'text-6xl cursor-default' : 'text-4xl'}`} placeholder="NAMA KEJUARAAN" />
             <input value={championshipTitles[1]} onChange={(e) => setChampionshipTitles([championshipTitles[0], e.target.value, championshipTitles[2]])} readOnly={isProjectorMode} className={`font-black ${theme.textPrimary} text-center uppercase focus:outline-none focus:bg-gray-50 rounded-xl bg-transparent w-full mt-2 ${isProjectorMode ? 'text-3xl cursor-default' : 'text-xl'}`} placeholder="KETERANGAN" />
           </div>
        </div>

        {!isProjectorMode && stage === 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
             <div className="flex items-center gap-3 mb-6"><div className={`p-2.5 rounded-xl ${theme.soft} ${theme.textPrimary}`}><Icons.IconUsers /></div><h2 className="text-xl font-black text-gray-800">Registrasi Tim & Sistem</h2></div>
             <form onSubmit={(e) => { e.preventDefault(); const t = inputValue.trim(); if(t && !teams.includes(t)) { setTeams([...teams, t]); setInputValue(''); } }} className="flex gap-3 mb-6">
                <input type="text" maxLength={30} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="KETIK NAMA TIM BARU..." className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 font-black uppercase" />
                <button type="submit" className={`${theme.primary} text-white px-6 py-4 rounded-2xl font-black`}><Icons.IconPlus /></button>
             </form>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 max-h-80 overflow-y-auto">
                 {teams.map((team) => (
                   <div key={team} className="bg-white p-3 rounded-xl flex items-center justify-between border border-gray-200 mb-2 shadow-sm">
                      <span className="font-black text-gray-800 uppercase">{team}</span>
                      <button onClick={() => setTeams(teams.filter(t => t !== team))} className="text-red-400 hover:text-red-600"><Icons.IconTrash /></button>
                   </div>
                 ))}
               </div>
               <div className="flex flex-col gap-4">
                 <select value={tournamentType} onChange={(e) => setTournamentType(e.target.value)} className="w-full bg-white border border-gray-200 font-black text-sm rounded-xl px-4 py-3 outline-none uppercase">
                    <option value="Group">GROUP (SATU POOL - KOMPETISI PENUH)</option>
                    <option value="Groups">GROUPS (BANYAK GRUP & BABAK GUGUR)</option>
                 </select>
                 {tournamentType === 'Groups' && (
                    <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                      <span className="font-black text-xs">JUMLAH GRUP</span>
                      <input type="number" min="2" max="10" value={numGroups} onChange={(e) => setNumGroups(e.target.value)} className="w-16 h-10 text-center font-black bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                    </div>
                 )}
                 <button onClick={generateSchedule} disabled={teams.length < 2} className={`w-full mt-auto ${theme.accent} ${theme.accentText} disabled:opacity-50 font-black py-4 rounded-xl shadow-md transition-all text-lg`}>MULAI TURNAMEN</button>
               </div>
             </div>
          </div>
        )}

        {(stage === 1 || stage === 2) && schedule.length > 0 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-8 ${isProjectorMode ? 'shadow-2xl' : ''}`}>
               <div className="flex items-center gap-4 border-b pb-6 mb-6">
                 <div className={`p-3 rounded-2xl ${theme.soft} ${theme.textPrimary}`}><Icons.IconTable /></div>
                 <h2 className="text-3xl font-black text-gray-800 tracking-tight">KLASEMEN SEMENTARA</h2>
               </div>
               <StandingsTable standingsData={getStandings()} borderColor={`border-${theme.primary.split('-')[1]}-500`} isTeamEvent={isTeamEvent} teamLogos={teamLogos} />
            </div>

            <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-8 ${isProjectorMode ? 'shadow-2xl' : ''}`}>
               <div className="flex justify-between items-center border-b pb-6 mb-6">
                 <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-2xl ${theme.soft} ${theme.textPrimary}`}><Icons.IconCalendar /></div>
                   <h2 className="text-3xl font-black text-gray-800 tracking-tight">JADWAL & SKOR LIVE</h2>
                 </div>
                 {!isProjectorMode && undoStack.length > 0 && (
                   <button onClick={handleRollback} className="no-print bg-purple-50 text-purple-700 px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2"><Icons.IconUndo /> UNDO LAST ACTION</button>
                 )}
               </div>
               <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                 {schedule.map((match, index) => (
                   <MatchCard 
                     key={match.id} match={match} theme={theme} isProjectorMode={isProjectorMode} index={index} totalMatches={schedule.length}
                     teamLogos={teamLogos} isTeamEvent={isTeamEvent}
                     onMove={moveMatchSchedule} onUpdateDateTime={updateMatchDateTime} onScoreChange={handleScoreChange} 
                   />
                 ))}
               </div>
            </div>

            {!isProjectorMode && stage === 1 && (
               isSinglePoolCompleted ? (
                 <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden mt-8 animate-in zoom-in-95">
                    <Icons.IconTrophy className="w-20 h-20 mx-auto mb-4 opacity-90" />
                    <h2 className="text-4xl font-black mb-2 tracking-tight drop-shadow-md">TURNAMEN TELAH BERAKHIR!</h2>
                    <p className="text-amber-100 font-bold mb-6">Sistem Satu Pool (Kompetisi Penuh) telah menyelesaikan seluruh jadwal pertandingannya.</p>
                    <button onClick={() => window.print()} className="bg-white text-amber-700 font-black py-4 px-10 rounded-2xl shadow-lg hover:scale-105 transition-transform uppercase tracking-widest text-lg">Cetak Hasil Akhir</button>
                 </div>
               ) : (
                 tournamentType === 'Groups' && (
                   <div className="bg-gray-900 text-white rounded-3xl p-12 text-center shadow-xl border border-gray-800 mt-8">
                     <h2 className="text-3xl font-black mb-3">MENUJU FASE GUGUR</h2>
                     {isActivePhaseFinished ? (
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-10 rounded-2xl shadow-lg uppercase tracking-widest text-lg">LANJUTKAN KE BABAK PLAY-OFF</button>
                     ) : <p className="text-gray-400 font-bold">Selesaikan semua pertandingan di atas untuk membuka babak sistem gugur.</p>}
                   </div>
                 )
               )
            )}
          </div>
        )}

        {/* FOOTER HAK CIPTA DENGAN SIGNATURE */}
        <div className="text-center mt-16 pb-8 print:mt-10 print:pb-4">
          <p className="font-black text-sm tracking-widest uppercase text-gray-400">
            Sepak Takraw Tournament Management System <span className={`mx-2 ${theme.textPrimary}`}>&bull;</span> by <span className={theme.textPrimary}>fiqhipondaa9</span>
          </p>
        </div>

      </main>
    </div>
  );
}