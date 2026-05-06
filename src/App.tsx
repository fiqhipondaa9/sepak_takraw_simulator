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
    tournamentType, setTournamentType, roundRobinType, setRoundRobinType, numGroups, setNumGroups,
    groupAssignments, setGroupAssignments, selectedEventFormat, setSelectedEventFormat,
    mixDisciplines, setMixDisciplines, courts, setCourts, teamLogos, setTeamLogos, sponsorLogos, setSponsorLogos,
    championshipTitles, setChampionshipTitles, knockoutData, setKnockoutData,
    undoStack, saveSnapshot, handleRollback, moveMatchSchedule, updateMatchDateTime, handleScoreChange
  } = useTournament();

  const [inputValue, setInputValue] = useState('');
  const [courtInputValue, setCourtInputValue] = useState('');

  const isTeamEvent = selectedEventFormat.toUpperCase().includes('TEAM');
  let eventDiscipline = 'Regu';
  if (selectedEventFormat.toUpperCase().includes('DOUBLE')) eventDiscipline = 'Double';
  else if (selectedEventFormat.toUpperCase().includes('QUADRANT')) eventDiscipline = 'Quadrant';
  else if (selectedEventFormat.toUpperCase().includes('MIXED')) eventDiscipline = 'Mix';

  // --- LOGIKA 1 POOL TAMAT ---
  const isActivePhaseFinished = schedule.length > 0 && schedule.every(match => match.winner !== null);
  const isSinglePoolCompleted = tournamentType === 'Group' && isActivePhaseFinished;

  // --- HANDLER UI LOKAL (UPLOAD & MANAJEMEN) ---
  const handleAddSponsor = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setSponsorLogos([...sponsorLogos, reader.result]); reader.readAsDataURL(file); } };
  const handleRemoveSponsor = (index) => { const newSponsors = [...sponsorLogos]; newSponsors.splice(index, 1); setSponsorLogos(newSponsors); };
  const handleTeamLogoUpload = (teamName, e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setTeamLogos({ ...teamLogos, [teamName]: reader.result }); reader.readAsDataURL(file); } };
  const handleAddCourt = (e) => { if (e) e.preventDefault(); const newCourt = courtInputValue.trim(); if (!newCourt || courts.includes(newCourt)) return; setCourts([...courts, newCourt]); setCourtInputValue(''); };
  const handleRemoveCourt = (courtToRemove) => { if (courts.length === 1) return alert("Minimal 1 lapangan aktif!"); setCourts(courts.filter(c => c !== courtToRemove)); };
  const handleRemoveTeam = (teamToRemove) => { 
    setTeams(teams.filter(team => team !== teamToRemove)); 
    const newAssignments = { ...groupAssignments }; delete newAssignments[teamToRemove]; setGroupAssignments(newAssignments); 
    const newLogos = { ...teamLogos }; delete newLogos[teamToRemove]; setTeamLogos(newLogos); 
  };

  // --- FUNGSI KLASMEN ---
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

  // --- FUNGSI GENERATE BAGAN GUGUR (Knockout) ---
  const generateDirectKnockout = (manualTeams = teams, startRoundIdx = 0, initialId = 1) => {
    const size = Math.pow(2, Math.ceil(Math.log2(manualTeams.length))); 
    let orderedTeams = Array(size).fill('BYE');
    
    if (manualTeams.length === size && manualTeams.some(t => t.includes('['))) {
        orderedTeams = [...manualTeams];
    } else if (tournamentType === 'Knocked Out Round' && stage === 0) {
        let shuffledTeams = [...manualTeams].sort(() => 0.5 - Math.random());
        let fillOrder = [];
        for(let i=0; i < size; i+=2) fillOrder.push(i); 
        for(let i=1; i < size; i+=2) fillOrder.push(i); 
        shuffledTeams.forEach((team, index) => { orderedTeams[fillOrder[index]] = team; });
    } else {
        orderedTeams = [...manualTeams];
        while(orderedTeams.length < size) orderedTeams.push('BYE');
    }

    const numRounds = Math.log2(size); let rounds = [];
    const nP = isTeamEvent ? 3 : 1;
    const pL = eventDiscipline === 'Mix' ? mixDisciplines : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];
    let matchCounter = initialId;

    for(let r = 0; r < numRounds; r++) {
       let matchesInRound = size / Math.pow(2, r + 1); let roundMatches = [];
       for(let m = 0; m < matchesInRound; m++) {
          let tA = '?'; let tB = '?';
          if (r === 0) { 
              tA = orderedTeams[m * 2]; 
              tB = orderedTeams[m * 2 + 1]; 
          } else {
              let prevA = rounds[r-1][m*2]; let prevB = rounds[r-1][m*2+1];
              if (prevA.winner) tA = prevA.winner; if (prevB.winner) tB = prevB.winner;
          }

          let isByeMatch = (tA === 'BYE' || tB === 'BYE') && tA !== '?' && tB !== '?';
          let autoWinner = isByeMatch ? (tA === 'BYE' ? tB : tA) : null;
          if (tA === 'BYE' && tB === 'BYE') autoWinner = 'BYE';

          let initialParties = [];
          for(let p = 0; p < nP; p++) { initialParties.push({ id: `k_dir_p${p}`, label: isTeamEvent ? pL[p] : `Match`, sets: [{ scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }], winner: null }); }
          
          let nextR = r + 1; let nextM = Math.floor(m / 2); let nextSlot = m % 2 === 0 ? 'teamA' : 'teamB';
          let roundTitle = r === numRounds - 1 ? 'BABAK FINAL' : r === numRounds - 2 ? 'SEMI FINAL' : r === numRounds - 3 ? 'PEREMPAT FINAL' : 'BABAK PENYISIHAN';
          
          roundMatches.push({ 
              id: matchCounter++, roundIndex: r, matchIndex: m, title: roundTitle, 
              teamA: tA, teamB: tB, parties: initialParties, 
              winner: autoWinner, winsA: 0, winsB: 0, isBye: isByeMatch,
              nextMatchRef: nextR < numRounds ? { r: nextR, m: nextM, slot: nextSlot } : null 
          });
       }
       rounds.push(roundMatches);
    }
    return rounds;
  };

  // --- HANDLER SKOR KNOCKOUT ---
  const handleKnockoutScoreChange = useCallback((rI, mI, pI, sI, side, val) => {
    if (val !== '' && (val < 0 || val > 30)) return;
    setKnockoutData(prev => {
      const nd = JSON.parse(JSON.stringify(prev)); 
      const m = nd[rI][mI]; const p = m.parties[pI]; p.sets[sI][side] = val;
      let wA=0, wB=0, z=0;
      p.sets.forEach(s => { const a=parseInt(s.scoreA); const b=parseInt(s.scoreB); if(!isNaN(a)&&!isNaN(b)){ if(a>b)wA++; else if(b>a)wB++; else if(a===0&&b===0)z++; }});
      p.winner = wA>=2 ? m.teamA : wB>=2 ? m.teamB : (z>=2 ? 'SERI' : null);
      let mW=0, mL=0, mS=0; m.parties.forEach(px => { if(px.winner===m.teamA) mW++; else if(px.winner===m.teamB) mL++; else if(px.winner==='SERI') mS++; });
      let req = Math.ceil(m.parties.length/2); let fW = mW>=req ? m.teamA : mL>=req ? m.teamB : mS>=req ? 'SERI' : (mW+mL+mS===m.parties.length ? (mW>mL?m.teamA:mL>mW?m.teamB:'SERI') : null);
      m.winner = fW; m.winsA = mW; m.winsB = mL;
      if (m.nextMatchRef && fW && fW!=='SERI') { nd[m.nextMatchRef.r][m.nextMatchRef.m][m.nextMatchRef.slot] = fW; }
      else if (m.nextMatchRef) { nd[m.nextMatchRef.r][m.nextMatchRef.m][m.nextMatchRef.slot] = '?'; }
      return nd;
    });
  }, [setKnockoutData]);

  // --- FUNGSI GENERATE JADWAL FASE GRUP ---
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

    if (roundRobinType === 'Double Round Robin') {
      const round2Matches = allMatches.map(m => ({ teamA: m.teamB, teamB: m.teamA, groupLabel: m.groupLabel, roundLabel: 'P2' }));
      allMatches = [...allMatches, ...round2Matches]; 
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

  // ===================== RENDER UI =====================
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
        
        {/* HEADER KEJUARAAN & SPONSOR LENGKAP */}
        <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 relative print-break-inside-avoid ${isProjectorMode ? 'p-10 shadow-2xl' : 'p-8'}`}>
           <div className={`absolute top-0 left-0 w-full h-3 ${theme.primary}`}></div>
           
           <div className={`flex justify-center flex-wrap gap-4 min-h-[5rem] ${isProjectorMode ? 'mb-10' : 'mb-8'}`}>
             {sponsorLogos.map((logo, index) => (
               <div key={index} className={`relative group border border-gray-100 bg-white rounded-3xl shadow-sm flex items-center justify-center p-3 print:border-none print:shadow-none ${isProjectorMode ? 'w-36 h-36 md:w-48 md:h-48' : 'w-24 h-24 md:w-32 md:h-32'}`}>
                 <img src={logo} alt="Sponsor" className="max-w-full max-h-full object-contain drop-shadow-sm" />
                 {!isProjectorMode && <button onClick={() => handleRemoveSponsor(index)} className="no-print absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"><Icons.IconTrash /></button>}
               </div>
             ))}
             {!isProjectorMode && (
               <label className="no-print w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-gray-200 bg-gray-50 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group flex-shrink-0">
                 <Icons.IconPlus className="text-gray-400 group-hover:text-gray-600 mb-1" />
                 <span className="text-[10px] md:text-xs font-bold text-gray-400 group-hover:text-gray-600 text-center px-2">Sponsor</span>
                 <input type="file" accept="image/*" hidden onChange={handleAddSponsor} />
               </label>
             )}
           </div>

           <div className="flex flex-col items-center max-w-5xl mx-auto w-full">
             <input value={championshipTitles[0]} onChange={(e) => setChampionshipTitles([e.target.value, championshipTitles[1], championshipTitles[2]])} readOnly={isProjectorMode} className={`font-black text-gray-900 text-center uppercase focus:outline-none focus:bg-gray-50 rounded-2xl bg-transparent w-full ${isProjectorMode ? 'text-6xl cursor-default' : 'text-3xl md:text-5xl'}`} placeholder="NAMA KEJUARAAN" />
             <input value={championshipTitles[1]} onChange={(e) => setChampionshipTitles([championshipTitles[0], e.target.value, championshipTitles[2]])} readOnly={isProjectorMode} className={`font-black ${theme.textPrimary} text-center uppercase focus:outline-none focus:bg-gray-50 rounded-xl bg-transparent w-full mt-2 ${isProjectorMode ? 'text-3xl cursor-default' : 'text-xl md:text-2xl'}`} placeholder="KETERANGAN" />
             <input value={championshipTitles[2]} onChange={(e) => setChampionshipTitles([championshipTitles[0], championshipTitles[1], e.target.value])} readOnly={isProjectorMode} className={`font-bold text-gray-400 text-center uppercase focus:outline-none focus:bg-gray-50 rounded-xl bg-transparent w-full mt-2 ${isProjectorMode ? 'text-2xl cursor-default' : 'text-sm md:text-base'}`} placeholder="LOKASI & TANGGAL PELAKSANAAN" />
           </div>
        </div>

        {/* FASE 0: REGISTRASI & PENGATURAN PENUH */}
        {!isProjectorMode && stage === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
             
             {/* KIRI: REGISTRASI TIM & LOGO */}
             <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6"><div className={`p-2.5 rounded-xl ${theme.soft} ${theme.textPrimary}`}><Icons.IconUsers /></div><h2 className="text-xl font-black text-gray-800">Registrasi Tim</h2></div>
                <form onSubmit={(e) => { e.preventDefault(); const t = inputValue.trim(); if(t && !teams.includes(t)) { setTeams([...teams, t]); setInputValue(''); } }} className="flex gap-3 mb-6">
                   <input type="text" maxLength={40} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="KETIK NAMA TIM BARU..." className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 font-black uppercase" />
                   <button type="submit" className={`${theme.primary} text-white px-6 py-4 rounded-2xl font-black shadow-md hover:shadow-lg`}><Icons.IconPlus /></button>
                </form>
                
                <div className="flex flex-col gap-3 overflow-y-auto pr-2 flex-1">
                  {teams.length === 0 && <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 font-bold text-sm normal-case">Belum ada tim didaftarkan.</div>}
                  {teams.map((team) => (
                    <div key={team} className="bg-white p-3 pr-4 rounded-2xl flex items-center justify-between border border-gray-200 shadow-sm transition-colors hover:border-gray-300">
                       <div className="flex items-center gap-4">
                          <label className="cursor-pointer w-12 h-12 rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden hover:border-gray-300 group relative">
                             {teamLogos[team] ? <img src={teamLogos[team]} className="w-full h-full object-cover" alt="Logo" /> : <Icons.IconImage className="text-gray-300 group-hover:text-gray-500" />}
                             <input type="file" accept="image/*" hidden onChange={(e) => handleTeamLogoUpload(team, e)} />
                          </label>
                          <span className="font-black text-gray-800 text-lg uppercase">{team}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          {tournamentType === 'Groups' && (
                             <select value={groupAssignments[team] || ''} onChange={(e) => setGroupAssignments({...groupAssignments, [team]: e.target.value})} className="bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-3 py-2 outline-none cursor-pointer">
                                <option value="" disabled>Pilih Grup</option>
                                {Array.from({length: Number(numGroups) || 2}, (_, i) => String.fromCharCode(65 + i)).map(g => <option key={g} value={g}>Grup {g}</option>)}
                             </select>
                          )}
                          <button onClick={() => handleRemoveTeam(team)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"><Icons.IconTrash /></button>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
             
             {/* KANAN: EVENT, LAPANGAN & SISTEM */}
             <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Format Event */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                   <h2 className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Kategori & Disiplin Event</h2>
                   <select value={selectedEventFormat} onChange={(e) => setSelectedEventFormat(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-black text-sm rounded-2xl px-5 py-4 outline-none focus:border-gray-400 shadow-sm cursor-pointer mb-4 uppercase">
                      <option value="Double Event">1. Double Event</option>
                      <option value="Regu Event">2. Regu Event</option>
                      <option value="Quadrant Event">3. Quadrant Event</option>
                      <option value="Double Event Team">4. Double Event Team</option>
                      <option value="Regu Event Team">5. Regu Event Team</option>
                      <option value="Quadrant Event Team">6. Quadrant Event Team</option>
                      <option value="Mixed Event Team">7. Mixed Event Team</option>
                   </select>
                   {selectedEventFormat === 'Mixed Event Team' && (
                     <div className={`p-4 rounded-2xl border ${theme.border} ${theme.soft} flex flex-col gap-3`}>
                        <div className="flex flex-col gap-1"><span className="text-[10px] font-black uppercase tracking-widest">Format Partai 1</span><select value={mixDisciplines[0]} onChange={(e) => setMixDisciplines([e.target.value, mixDisciplines[1], mixDisciplines[2]])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 uppercase"><option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option></select></div>
                        <div className="flex flex-col gap-1"><span className="text-[10px] font-black uppercase tracking-widest">Format Partai 2</span><select value={mixDisciplines[1]} onChange={(e) => setMixDisciplines([mixDisciplines[0], e.target.value, mixDisciplines[2]])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 uppercase"><option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option></select></div>
                        <div className="flex flex-col gap-1"><span className="text-[10px] font-black uppercase tracking-widest">Format Partai 3</span><select value={mixDisciplines[2]} onChange={(e) => setMixDisciplines([mixDisciplines[0], mixDisciplines[1], e.target.value])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 uppercase"><option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option></select></div>
                     </div>
                   )}
                </div>

                {/* Lapangan & Sistem Turnamen */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
                   <h2 className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Sistem & Lapangan</h2>
                   
                   <form className="flex gap-2 mb-3"><input type="text" value={courtInputValue} onChange={(e) => setCourtInputValue(e.target.value)} placeholder="Tambah lapangan..." className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white text-xs font-bold uppercase" /><button type="button" onClick={handleAddCourt} className="bg-gray-800 hover:bg-black text-white px-4 py-3 rounded-xl font-bold transition-colors"><Icons.IconPlus /></button></form>
                   <div className="flex flex-wrap gap-2 mb-6">{courts.map((court, index) => ( <div key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 border border-gray-200">{court} {courts.length > 1 && <button type="button" onClick={() => handleRemoveCourt(court)} className="text-gray-400 hover:text-red-500"><Icons.IconTrash /></button>}</div> ))}</div>

                   <select value={tournamentType} onChange={(e) => setTournamentType(e.target.value)} className="w-full bg-white border border-gray-200 font-black text-sm rounded-xl px-4 py-3 outline-none cursor-pointer mb-3 uppercase">
                      <option value="Group">GROUP (SATU POOL - KOMPETISI PENUH)</option>
                      <option value="Groups">GROUPS (BANYAK GRUP & BABAK GUGUR)</option>
                      <option value="Knocked Out Round">KNOCKED OUT ROUND (SISTEM GUGUR)</option>
                   </select>

                   {(tournamentType === 'Group' || tournamentType === 'Groups') && (
                      <select value={roundRobinType} onChange={(e) => setRoundRobinType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-4 py-3 outline-none cursor-pointer mb-3 uppercase">
                         <option value="Single Round Robin">Single Round Robin (1x Pertemuan)</option>
                         <option value="Double Round Robin">Double Round Robin (Kandang & Tandang)</option>
                      </select>
                   )}

                   {tournamentType === 'Groups' && (
                      <div className={`p-4 rounded-xl border ${theme.border} ${theme.soft} flex justify-between items-center`}>
                        <span className="font-black text-xs">JUMLAH GRUP</span>
                        <input type="number" min="2" max="10" value={numGroups} onChange={(e) => setNumGroups(e.target.value)} className="w-16 h-10 text-center font-black bg-white border border-gray-200 rounded-lg outline-none shadow-sm" />
                      </div>
                   )}
                   
                   {/* Tombol Eksekusi Berdasarkan Tipe Turnamen */}
                   <button 
                     onClick={tournamentType === 'Knocked Out Round' ? () => { saveSnapshot(); setSchedule([]); setKnockoutData(generateDirectKnockout(teams, 0, 1)); setStage(3); } : generateSchedule} 
                     disabled={teams.length < 2} 
                     className={`w-full mt-auto ${theme.accent} ${theme.accentHover} ${theme.accentText} disabled:opacity-50 font-black py-4 rounded-xl shadow-md transition-all text-lg flex justify-center items-center gap-2`}
                   >
                     <Icons.IconCalendar /> MULAI TURNAMEN
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* FASE 1 & 2: KLASEMEN & JADWAL GRUP */}
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

        {/* FASE 3: BAGAN KNOCKOUT EKSKLUSIF */}
        {((stage === 3) || (stage === 1 && tournamentType === 'Knocked Out Round')) && knockoutData.length > 0 && (
          <div className={`space-y-8 animate-in fade-in duration-500 ${isProjectorMode ? 'space-y-12' : ''}`}>
             <div className={`text-center bg-white rounded-3xl shadow-sm border border-gray-100 print:border-none print:shadow-none print:p-2 ${isProjectorMode ? 'p-12 shadow-2xl border-none' : 'p-8'}`}>
                <h2 className={`font-black text-gray-900 flex items-center justify-center gap-4 ${isProjectorMode ? 'text-5xl tracking-tight' : 'text-3xl'}`}><div className={`p-3 rounded-2xl ${theme.primary} text-white`}><Icons.IconTrophy /></div>PENGINPUTAN SKOR BAGAN UTAMA</h2>
                {!isProjectorMode && undoStack.length > 0 && (
                   <div className="no-print mt-6 flex justify-center">
                     <button onClick={handleRollback} className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2.5 rounded-xl font-bold uppercase tracking-widest border border-purple-200 shadow-sm flex items-center gap-2"><Icons.IconUndo /> Batal Lanjut Fase</button>
                   </div>
                )}
             </div>

             {knockoutData.map((round, rIndex) => (
                <div key={rIndex} className={`bg-gray-50/50 rounded-3xl border border-gray-200 print-break-inside-avoid print:bg-white print:border-none print:p-0 ${isProjectorMode ? 'p-12 shadow-inner' : 'p-8 shadow-sm'}`}>
                   <h3 className={`font-black text-center ${theme.textPrimary} mb-10 uppercase tracking-widest ${theme.soft} w-fit mx-auto rounded-2xl shadow-sm print:bg-gray-200 print:text-black border ${theme.border} ${isProjectorMode ? 'text-2xl px-10 py-4' : 'text-sm px-6 py-3'}`}>{round[0].title}</h3>
                   <div className={`flex flex-wrap justify-center print:gap-4 ${isProjectorMode ? 'gap-10' : 'gap-6'}`}>
                      {round.map(match => ( 
                         <div key={match.id} className={`w-full ${isProjectorMode ? 'lg:w-[48%] xl:w-[46%]' : 'lg:w-[48%] xl:w-[45%]'}`}>
                           <MatchCard 
                             match={match} theme={theme} isProjectorMode={isProjectorMode} isKnockout={true} 
                             teamLogos={teamLogos} isTeamEvent={isTeamEvent} 
                             onScoreChange={(mId, pIdx, sIdx, side, val) => handleKnockoutScoreChange(match.roundIndex, match.matchIndex, pIdx, sIdx, side, val)} 
                           />
                         </div> 
                      ))}
                   </div>
                </div>
             ))}
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