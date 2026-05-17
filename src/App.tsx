// src/App.js
import React, { useState, useCallback, useEffect } from 'react';
import './index.css';

import { themes } from './constants/themes';
import * as Icons from './constants/icons';
import { useTournament } from './hooks/useTournament';

// Import Komponen
import { TopNavigation } from './components/TopNavigation';
import { CoffeeModal } from './components/CoffeeModal';
import { RegistrationForm } from './components/RegistrationForm';
import { MasterScheduleModal } from './components/MasterScheduleModal';
import { MatchCard } from './components/MatchCard';
import { StandingsTable } from './components/StandingsTable';

// Import Utilitas
import { compressImage } from './utils/imageUtils';
import { createRoundRobin } from './utils/scheduleUtils';
import { generateDirectKnockout } from './utils/bracketUtils';

export default function App() {
  const [activeTheme, setActiveTheme] = useState('emerald');
  const theme = themes[activeTheme] || themes.emerald;
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);

  const {
    stage, setStage, matchHistory, setMatchHistory, teams, setTeams, schedule, setSchedule,
    tournamentType, setTournamentType, roundRobinType, setRoundRobinType, numGroups, setNumGroups,
    groupAssignments, setGroupAssignments, selectedEventFormat, setSelectedEventFormat,
    mixDisciplines, setMixDisciplines, courts, setCourts, teamLogos, setTeamLogos, sponsorLogos, setSponsorLogos,
    championshipTitles, setChampionshipTitles, knockoutData, setKnockoutData, phase1Standings, setPhase1Standings,
    undoStack, saveSnapshot, handleRollback, moveMatchSchedule, updateMatchDateTime, handleScoreChange, 
    handleClearScores, handleAutoAssign, handleReset
  } = useTournament();

  const [inputValue, setInputValue] = useState('');
  const [courtInputValue, setCourtInputValue] = useState('');

  const isTeamEvent = selectedEventFormat.toUpperCase().includes('TEAM');
  let eventDiscipline = 'Regu';
  if (selectedEventFormat.toUpperCase().includes('DOUBLE')) eventDiscipline = 'Double';
  else if (selectedEventFormat.toUpperCase().includes('QUADRANT')) eventDiscipline = 'Quadrant';
  else if (selectedEventFormat.toUpperCase().includes('MIXED')) eventDiscipline = 'Mix';

  const hasPhase2GroupStage = Object.values(groupAssignments).includes('Eliminated');

  useEffect(() => {
    const handleBeforeUnload = (e) => { if (stage > 0) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [stage]);

  useEffect(() => {
    const apresiasiTimer = setInterval(() => { if (!isProjectorMode) setShowCoffeeModal(true); }, 33 * 60 * 1000);
    return () => clearInterval(apresiasiTimer);
  }, [isProjectorMode]);

  const handleEnterProjectorMode = () => {
    setIsProjectorMode(true);
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen().catch(err => console.log(err));
  };
  
  const handleExitProjectorMode = () => {
    setIsProjectorMode(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(err => console.log(err));
  };

  useEffect(() => {
    const handleFullscreenChange = () => { if (!document.fullscreenElement) setIsProjectorMode(false); };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleSaveFile = () => {
    const dataToSave = { stage, matchHistory, teams, schedule, tournamentType, roundRobinType, selectedEventFormat, mixDisciplines, numGroups, groupAssignments, teamLogos, sponsorLogos, championshipTitles, knockoutData, courts, activeTheme, phase1Standings };
    const blob = new Blob([JSON.stringify(dataToSave)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `Takraw_${new Date().toISOString().slice(0,10)}.json`; link.click(); URL.revokeObjectURL(url);
  };

  const handleOpenFile = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setStage(data.stage || 0); setMatchHistory(data.matchHistory || []); setTeams(data.teams || []); setSchedule(data.schedule || []);
        setTournamentType(data.tournamentType || 'Groups'); setRoundRobinType(data.roundRobinType || 'Single Round Robin');
        setSelectedEventFormat(data.selectedEventFormat || 'Regu Event'); 
        if (data.mixDisciplines) setMixDisciplines(data.mixDisciplines); setNumGroups(data.numGroups || 2); setGroupAssignments(data.groupAssignments || {});
        setTeamLogos(data.teamLogos || {}); setSponsorLogos(data.sponsorLogos || []); if (data.championshipTitles) setChampionshipTitles(data.championshipTitles);
        setKnockoutData(data.knockoutData || []); setCourts(data.courts || ['Lapangan Utama']);
        if (data.activeTheme && themes[data.activeTheme]) setActiveTheme(data.activeTheme);
        setPhase1Standings(data.phase1Standings || null);
      } catch (err) { alert("Gagal memuat! Format file tidak valid."); }
    };
    reader.readAsText(file); e.target.value = null; 
  };

  const handleAddSponsor = async (e) => { 
    const file = e.target.files[0]; 
    if (file) { 
      try {
        const compressed = await compressImage(file, 400); 
        setSponsorLogos([...sponsorLogos, compressed]); 
      } catch (err) { alert("Gagal memproses gambar!"); }
    } 
  };

  const handleTeamLogoUpload = async (teamName, e) => { 
    const file = e.target.files[0]; 
    if (file) { 
      try {
        const compressed = await compressImage(file, 200); 
        setTeamLogos({ ...teamLogos, [teamName]: compressed }); 
      } catch (err) { alert("Gagal memproses gambar!"); }
    } 
  };

  const handleRemoveSponsor = (index) => { const newSponsors = [...sponsorLogos]; newSponsors.splice(index, 1); setSponsorLogos(newSponsors); };
  const handleAddCourt = (e) => { if (e) e.preventDefault(); const newCourt = courtInputValue.trim(); if (!newCourt || courts.includes(newCourt)) return; setCourts([...courts, newCourt]); setCourtInputValue(''); };
  const handleRemoveCourt = (courtToRemove) => { if (courts.length === 1) return alert("Minimal 1 lapangan aktif!"); setCourts(courts.filter(c => c !== courtToRemove)); };
  const handleRemoveTeam = (teamToRemove) => { setTeams(teams.filter(team => team !== teamToRemove)); const newAssignments = { ...groupAssignments }; delete newAssignments[teamToRemove]; setGroupAssignments(newAssignments); const newLogos = { ...teamLogos }; delete newLogos[teamToRemove]; setTeamLogos(newLogos); };

  // Logika skor sistem gugur (bisa dipindah ke utils/hook nanti, tapi kita pertahankan di sini agar state reaktif)
  const handleKnockoutScoreChange = (rIndex, mIdx, pIdx, sIdx, side, val) => {
    if (val !== '' && (val < 0 || val > 30)) return; 
    setKnockoutData(prevData => {
        const newData = [...prevData];
        const round = [...newData[rIndex]];
        const match = { ...round[mIdx] };
        
        const pts = match.parties.map((party, i) => {
            if (i !== pIdx) return party;
            const sets = party.sets.map((set, j) => j === sIdx ? { ...set, [side]: val } : set);
            let wA=0, wB=0, z=0;
            sets.forEach(s => { 
                const a=parseInt(s.scoreA); const b=parseInt(s.scoreB); 
                if(!isNaN(a)&&!isNaN(b)){ if(a>b)wA++; else if(b>a)wB++; else if(a===0&&b===0)z++; }
            });
            const winner = wA>=2 ? match.teamA : wB>=2 ? match.teamB : (z>=2 ? 'SERI' : null);
            return { ...party, sets, winner };
        });

        let mW=0, mL=0, mS=0; 
        pts.forEach(px => { if(px.winner===match.teamA) mW++; else if(px.winner===match.teamB) mL++; else if(px.winner==='SERI') mS++; });
        let req = Math.ceil(pts.length/2); 
        let fW = mW>=req ? match.teamA : mL>=req ? match.teamB : mS>=req ? 'SERI' : (mW+mL+mS===pts.length ? (mW>mL?match.teamA:mL>mW?match.teamB:'SERI') : null);
        
        match.parties = pts;
        match.winner = fW;
        match.winsA = mW;
        match.winsB = mL;
        round[mIdx] = match;
        newData[rIndex] = round;

        if (match.nextMatchRef) {
           const { r: nextR, m: nextM, slot: nextSlot } = match.nextMatchRef;
           if (newData[nextR] && newData[nextR][nextM]) {
               const nextMatchObj = { ...newData[nextR][nextM] };
               if (fW && fW !== 'SERI' && fW !== '?') {
                   nextMatchObj[nextSlot] = fW;
               } else {
                   nextMatchObj[nextSlot] = '?'; 
               }
               const newNextRound = [...newData[nextR]];
               newNextRound[nextM] = nextMatchObj;
               newData[nextR] = newNextRound;
           }
        }
        return newData;
    });
  };

  const getStandings = useCallback((specificSchedule = schedule, specificAssignments = groupAssignments) => {
    let standings = {};
    teams.forEach(t => { standings[t] = { team: t, group: tournamentType === 'Groups' ? (specificAssignments[t] ? `Grup ${specificAssignments[t]}` : 'Unknown') : 'Pool Utama', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 }; });
    
    const isPhase2 = Object.values(specificAssignments).includes('Eliminated');
    const filteredMatches = [...matchHistory, ...specificSchedule].filter(match => {
       if (!match.winner || match.winner === '?') return false;
       if (isPhase2) return match.groupLabel === 'Grup D' || match.groupLabel === 'Grup E';
       return true;
    });
    
    filteredMatches.forEach(match => {
      const tA = match.teamA; const tB = match.teamB;
      if(!standings[tA]) standings[tA] = { team: tA, group: 'Unknown', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 };
      if(!standings[tB]) standings[tB] = { team: tB, group: 'Unknown', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 };
      standings[tA].play += 1; standings[tB].play += 1;
      if (match.winner === tA) { standings[tA].win += 1; standings[tB].lose += 1; } else if (match.winner === tB) { standings[tB].win += 1; standings[tA].lose += 1; } else if (match.winner === 'SERI') { standings[tA].lose += 1; standings[tB].lose += 1; }
      let mPWA = 0; let mPWB = 0;
      match.parties?.forEach(party => {
        if (party.winner === tA) { standings[tA].partyWin += 1; standings[tB].partyLose += 1; mPWA += 1; } else if (party.winner === tB) { standings[tB].partyWin += 1; standings[tA].partyLose += 1; mPWB += 1; } else if (party.winner === 'SERI') { standings[tA].partyLose += 1; standings[tB].partyLose += 1; }
        party.sets.forEach(set => {
          const a = parseInt(set.scoreA); const b = parseInt(set.scoreB);
          if (!isNaN(a) && !isNaN(b)) {
            if (a > b) { standings[tA].setWin += 1; standings[tB].setLose += 1; } else if (b > a) { standings[tB].setWin += 1; standings[tA].setLose += 1; }
            standings[tA].pointWin += a; standings[tA].pointLose += b; standings[tB].pointWin += b; standings[tB].pointLose += a;
          }
        });
      });
      if (isTeamEvent) {
        if (match.winner === tA) { standings[tA].totalPoints += (mPWB === 1) ? 2 : 3; standings[tB].totalPoints += (mPWB === 1) ? 1 : 0; } else if (match.winner === tB) { standings[tB].totalPoints += (mPWA === 1) ? 2 : 3; standings[tA].totalPoints += (mPWA === 1) ? 1 : 0; }
      } else { if (match.winner === tA) standings[tA].totalPoints += 2; else if (match.winner === tB) standings[tB].totalPoints += 2; }
    });
    
    const sortedTeams = Object.values(standings).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints; 
      if (b.win !== a.win) return b.win - a.win;
      if (isTeamEvent) { const aP = a.partyWin - a.partyLose; const bP = b.partyWin - b.partyLose; if (bP !== aP) return bP - aP; } 
      const aS = a.setWin - a.setLose; const bS = b.setWin - b.setLose; if (bS !== aS) return bS - aS; 
      const aPt = a.pointWin - a.pointLose; const bPt = b.pointWin - b.pointLose; if (bPt !== aPt) return bPt - aPt; 
      return 0; 
    });
    
    const grouped = {}; 
    sortedTeams.forEach(stat => { if (!grouped[stat.group]) grouped[stat.group] = []; grouped[stat.group].push(stat); });
    return grouped;
  }, [teams, matchHistory, schedule, tournamentType, groupAssignments, isTeamEvent]);

  const handleCopyWhatsApp = () => {
    const standings = getStandings();
    let waText = `🏆 *FASE PENYISIHAN* 🏆\n*${championshipTitles[0]}*\n\n`;
    Object.entries(standings).filter(([gn]) => !gn.toLowerCase().includes('unknown') && !gn.toLowerCase().includes('eliminated')).forEach(([groupName, groupTeams]) => {
      waText += `*${groupName}*\n`;
      groupTeams.forEach((stat, index) => {
        let medal = index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2 ? '🥉 ' : '▪️ ';
        waText += `${index + 1}. ${medal}*${stat.team}* - *${stat.totalPoints} PTS* (W:${stat.win} L:${stat.lose})\n`;
      }); waText += `\n`;
    });
    waText += `_Update via Sepak Takraw TMS_`;
    const textArea = document.createElement("textarea"); textArea.value = waText; document.body.appendChild(textArea); textArea.select();
    try { document.execCommand('copy'); alert("✅ Klasemen disalin! Silakan Paste di WhatsApp."); } catch (err) { alert("❌ Gagal menyalin."); } document.body.removeChild(textArea);
  };

  const handleStartTournament = () => {
    if (tournamentType === 'Knocked Out Round') {
      saveSnapshot(); 
      setSchedule([]); 
      setKnockoutData(generateDirectKnockout(teams, tournamentType, stage, isTeamEvent, eventDiscipline, mixDisciplines, courts, 0, 1)); 
      setStage(3);
    } else {
      generateTournamentSchedule();
    }
  };

  const generateTournamentSchedule = () => {
    if (tournamentType === 'Groups' && !teams.every(t => groupAssignments[t])) return alert("Ada tim yang belum masuk ke dalam grup!");
    saveSnapshot(); 
    let allMatches = [];
    
    if (tournamentType === 'Groups') {
      const gl = Array.from({length: Number(numGroups) || 2}, (_, i) => String.fromCharCode(65 + i));
      let gM = {}; let maxRounds = 0; 
      gl.forEach(g => { 
          const t = teams.filter(x => groupAssignments[x] === g); 
          const m = createRoundRobin(t, `Grup ${g}`); // Menggunakan utilitas yang diupdate
          gM[g] = m; 
          if(m.length > maxRounds) maxRounds = m.length; 
      });
      for (let r = 0; r < maxRounds; r++) { 
          gl.forEach(g => { if (gM[g] && gM[g][r]) allMatches.push(...gM[g][r]); }); 
      }
    } else { 
      const rounds = createRoundRobin(teams, 'Pool Utama'); // Menggunakan utilitas yang diupdate
      rounds.forEach(r => allMatches.push(...r));
    }

    if (roundRobinType === 'Double Round Robin') {
      const round2Matches = allMatches.map(m => ({ teamA: m.teamB, teamB: m.teamA, groupLabel: m.groupLabel, roundLabel: 'P2' }));
      allMatches = [...allMatches, ...round2Matches]; 
    }

    let fSch = []; let counter = 1; const nP = isTeamEvent ? 3 : 1; const aC = courts.length > 0 ? courts : ['Lap. Utama'];
    let cTimes = aC.map(() => { let t = new Date(); t.setHours(8, 0, 0, 0); return t; }); const addMins = isTeamEvent ? 120 : 45;
    const pL = eventDiscipline === 'Mix' ? mixDisciplines : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];

    allMatches.forEach(m => {
      let pts = []; 
      for(let p=0; p<nP; p++) {
          pts.push({ id: `p${p}`, label: isTeamEvent ? pL[p] : `Match`, sets: [{scoreA:'',scoreB:''},{scoreA:'',scoreB:''},{scoreA:'',scoreB:''}], winner: null });
      }
      let eIdx = 0; for(let i=1; i<cTimes.length; i++) if(cTimes[i] < cTimes[eIdx]) eIdx = i;
      fSch.push({ id: counter++, teamA: m.teamA, teamB: m.teamB, groupLabel: m.groupLabel, roundLabel: m.roundLabel, parties: pts, winner: null, winsA: 0, winsB: 0, date: cTimes[eIdx].toISOString().slice(0, 10), time: cTimes[eIdx].toLocaleTimeString([],{hour:'2-digit',minute:'2-digit', hour12: false}), court: aC[eIdx] });
      cTimes[eIdx].setMinutes(cTimes[eIdx].getMinutes() + addMins);
    });
    setSchedule(fSch); setKnockoutData([]); setStage(1); 
  };

  const generateMasterPlan = () => {
    let masterPlan = []; let matchId = 1;
    const allMatches = [...matchHistory, ...schedule];
    if (allMatches.length > 0) { allMatches.forEach(m => { masterPlan.push({ ...m, id: m.id, phase: "Penyisihan" }); matchId = Math.max(matchId, parseInt(m.id) + 1); }); }
    if (knockoutData.length > 0) { knockoutData.forEach(round => { round.forEach(m => { masterPlan.push({ ...m, id: m.id, label: m.title, phase: "Knockout" }); }); }); }
    return masterPlan;
  };

  const formatMatchScore = (match) => {
    if (match.isBye) return "BYE / W.O";
    if (!match.winner || match.winner === '?') return "TBD";
    if (match.winner === 'SERI' && match.winsA === 0 && match.winsB === 0) return "DOUBLE W.O";
    let setDetails = [];
    match.parties?.forEach(party => {
      let pWinA = 0, pWinB = 0;
      party.sets.forEach(s => { const a = parseInt(s.scoreA); const b = parseInt(s.scoreB); if(!isNaN(a) && !isNaN(b)) { if(a>b) pWinA++; else if(b>a) pWinB++; } });
      if (pWinA > 0 || pWinB > 0) setDetails.push(`${pWinA}-${pWinB}`);
    });
    return isTeamEvent ? `${match.winsA}-${match.winsB} (${setDetails.join(', ')})` : (setDetails[0] || `${match.winsA}-${match.winsB}`);
  };

  const handleExportPNG = async () => {
    setIsExportingPng(true); document.body.classList.add('export-mode');
    try {
      if (!window.htmlToImage) {
        const script = document.createElement('script'); script.src = "https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js"; document.head.appendChild(script);
        await new Promise((resolve) => { script.onload = resolve; });
      }
      await new Promise(r => setTimeout(r, 500));
      const element = document.getElementById('master-print-area');
      const dataUrl = await window.htmlToImage.toPng(element, { quality: 1, pixelRatio: 2, backgroundColor: "#ffffff", style: { margin: '0' } });
      const link = document.createElement("a"); link.download = `Laporan_Takraw_${new Date().toISOString().slice(0,10)}.png`; link.href = dataUrl; link.click();
    } catch (error) { alert("Gagal mengekspor gambar. Pastikan koneksi stabil."); } 
    finally { document.body.classList.remove('export-mode'); setIsExportingPng(false); }
  };

  return (
    <div className={`min-h-screen uppercase ${theme.bgApp} font-sans text-gray-800 pb-20 transition-all duration-500`}>
      <style>{`
        .hide-arrows::-webkit-outer-spin-button, .hide-arrows::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; } 
        .hide-arrows { -moz-appearance: textfield; } 
        .export-mode .master-modal-content { max-height: none !important; overflow: visible !important; height: auto !important; }
        .export-mode #master-print-area { max-height: none !important; overflow: visible !important; height: auto !important; }
        @media print { 
            @page { size: landscape; margin: 10mm; } 
            body { background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } 
            .no-print { display: none !important; } 
            .master-modal-overlay { position: absolute !important; inset: 0 !important; background: white !important; display: block !important; align-items: flex-start !important; } 
            .master-modal-content { box-shadow: none !important; max-width: 100% !important; width: 100% !important; max-height: none !important; height: auto !important; border-radius: 0 !important; overflow: visible !important; }
            #master-print-area { overflow: visible !important; max-height: none !important; height: auto !important; padding: 0 !important; }
        }
      `}</style>

      {/* MODAL APRESIASI */}
      {showCoffeeModal && <CoffeeModal onClose={() => setShowCoffeeModal(false)} />}

      {/* MODE PROYEKTOR / LIVE MODE */}
      {isProjectorMode && (
        <button onClick={handleExitProjectorMode} className="no-print fixed bottom-8 right-8 bg-white text-red-600 px-6 py-4 rounded-full shadow-2xl font-black z-50 flex items-center gap-3 animate-bounce border-4 border-red-100 hover:bg-red-50">
          <Icons.IconX /> EXIT
        </button>
      )}

      {!isProjectorMode && (
        <button onClick={() => setShowCoffeeModal(true)} className="no-print fixed bottom-8 right-8 bg-emerald-500 hover:bg-emerald-600 text-white h-14 rounded-full shadow-2xl z-50 flex items-center justify-center px-4 gap-0 hover:gap-3 transition-all duration-300 border-4 border-emerald-100 group overflow-hidden" title="Konsultasi & Apresiasi">
          <div className="relative flex items-center justify-center">
            <Icons.IconCoffee />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
          </div>
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap font-black text-xs uppercase tracking-widest">Konsultasi WA</span>
        </button>
      )}

      {/* NAVIGASI ATAS */}
      {!isProjectorMode && (
        <TopNavigation theme={theme} themes={themes} activeTheme={activeTheme} setActiveTheme={setActiveTheme} handleOpenFile={handleOpenFile} handleSaveFile={handleSaveFile} />
      )}

      {/* DASHBOARD KONTROL */}
      {!isProjectorMode && stage > 0 && (
        <div className="max-w-7xl mx-auto mt-6 px-4 no-print">
          <div className="bg-white rounded-3xl shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-100">
             <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${theme.soft} ${theme.textPrimary}`}><Icons.IconTable /></div>
                <div><h3 className="font-black text-gray-800">Tournament Dashboard</h3><p className="text-xs text-gray-500 font-medium normal-case">Input skor pertandingan atau lihat Jadwal Induk.</p></div>
             </div>
             <div className="flex flex-wrap gap-2 items-center">
                <button onClick={() => setShowMasterModal(true)} className={`${theme.soft} ${theme.textPrimary} hover:bg-gray-100 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-black transition-colors`}><Icons.IconList /> JADWAL INDUK (LAPORAN)</button>
                <button onClick={handleEnterProjectorMode} className={`${theme.accent} ${theme.accentHover} ${theme.accentText} px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-black transition-colors shadow-md ml-2`}><Icons.IconMonitor /> LIVE MODE</button>
             </div>
          </div>
        </div>
      )}

      <main className={`max-w-7xl mx-auto mt-6 px-4 space-y-6 ${isProjectorMode ? 'max-w-full' : ''}`}>
        
        {/* HEADER KEJUARAAN & SPONSOR */}
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

        {/* KOMPONEN REGISTRASI */}
        {!isProjectorMode && stage === 0 && (
          <RegistrationForm 
            theme={theme} teams={teams} setTeams={setTeams} inputValue={inputValue} setInputValue={setInputValue}
            teamLogos={teamLogos} handleTeamLogoUpload={handleTeamLogoUpload} groupAssignments={groupAssignments}
            setGroupAssignments={setGroupAssignments} numGroups={numGroups} handleRemoveTeam={handleRemoveTeam}
            selectedEventFormat={selectedEventFormat} setSelectedEventFormat={setSelectedEventFormat}
            mixDisciplines={mixDisciplines} setMixDisciplines={setMixDisciplines} courtInputValue={courtInputValue}
            setCourtInputValue={setCourtInputValue} handleAddCourt={handleAddCourt} courts={courts}
            handleRemoveCourt={handleRemoveCourt} tournamentType={tournamentType} setTournamentType={setTournamentType}
            roundRobinType={roundRobinType} setRoundRobinType={setRoundRobinType} handleAutoAssign={handleAutoAssign}
            onStartTournament={handleStartTournament}
          />
        )}

        {/* FASE GRUP / PENYISIHAN */}
        {(stage === 1 || stage === 2) && schedule.length > 0 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-8 ${isProjectorMode ? 'shadow-2xl' : ''}`}>
               <div className="flex justify-between items-center border-b pb-6 mb-6">
                 <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-2xl ${theme.soft} ${theme.textPrimary}`}><Icons.IconTable /></div>
                   <h2 className="text-3xl font-black text-gray-800 tracking-tight">KLASEMEN SEMENTARA</h2>
                 </div>
                 {!isProjectorMode && (
                   <button onClick={handleCopyWhatsApp} className="no-print bg-green-50 text-green-700 px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 border border-green-200 shadow-sm"><Icons.IconCopy /> SALIN WA</button>
                 )}
               </div>
               <StandingsTable standingsData={getStandings()} borderColor={`border-${theme.primary.split('-')[1]}-500`} isTeamEvent={isTeamEvent} teamLogos={teamLogos} />
            </div>

            <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-8 ${isProjectorMode ? 'shadow-2xl' : ''}`}>
               <div className="flex justify-between items-center border-b pb-6 mb-6">
                 <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-2xl ${theme.soft} ${theme.textPrimary}`}><Icons.IconCalendar /></div>
                   <h2 className="text-3xl font-black text-gray-800 tracking-tight">JADWAL & SKOR LIVE</h2>
                 </div>
                 {!isProjectorMode && (
                   <div className="no-print flex items-center gap-2">
                     {undoStack.length > 0 && <button onClick={handleRollback} className="bg-purple-50 text-purple-700 px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 border border-purple-200 shadow-sm"><Icons.IconUndo /> UNDO</button>}
                     <button onClick={handleClearScores} className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl font-black text-xs flex items-center border border-amber-200 shadow-sm">BERSIHKAN SKOR</button>
                     <button onClick={handleReset} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-black text-xs flex items-center border border-red-200 shadow-sm">RESET ULANG</button>
                   </div>
                 )}
               </div>
               <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                 {schedule.map((match, index) => (
                   <MatchCard 
                     key={match.id} match={match} theme={theme} isProjectorMode={isProjectorMode} index={index} totalMatches={schedule.length}
                     teamLogos={teamLogos} isTeamEvent={isTeamEvent} onMove={moveMatchSchedule} onUpdateDateTime={updateMatchDateTime} onScoreChange={handleScoreChange} 
                   />
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* FASE KNOCKOUT / SISTEM GUGUR */}
        {((stage === 3) || (stage === 1 && tournamentType === 'Knocked Out Round')) && knockoutData.length > 0 && (
          <div className={`space-y-8 animate-in fade-in duration-500 ${isProjectorMode ? 'space-y-12' : ''}`}>
             <div className={`text-center bg-white rounded-3xl shadow-sm border border-gray-100 print:border-none print:shadow-none print:p-2 ${isProjectorMode ? 'p-12 shadow-2xl border-none' : 'p-8'}`}>
                <h2 className={`font-black text-gray-900 flex items-center justify-center gap-4 ${isProjectorMode ? 'text-5xl tracking-tight' : 'text-3xl'}`}><div className={`p-3 rounded-2xl ${theme.primary} text-white`}><Icons.IconTrophy /></div>PENGINPUTAN SKOR BAGAN UTAMA</h2>
                
                {!isProjectorMode && (
                   <div className="no-print mt-6 flex justify-center gap-2">
                     {undoStack.length > 0 && <button onClick={handleRollback} className="bg-purple-50 text-purple-700 px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 border border-purple-200 shadow-sm"><Icons.IconUndo /> Batal Lanjut Fase</button>}
                     <button onClick={handleClearScores} className="bg-amber-50 text-amber-700 px-4 py-2.5 rounded-xl font-black text-xs flex items-center border border-amber-200 shadow-sm">Bersihkan Skor</button>
                     <button onClick={handleReset} className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-black text-xs flex items-center border border-red-200 shadow-sm">Reset Ulang</button>
                   </div>
                )}
             </div>

             {knockoutData.map((round, rIndex) => (
                <div key={rIndex} className={`bg-gray-50/50 rounded-3xl border border-gray-200 print-break-inside-avoid print:bg-white print:border-none print:p-0 ${isProjectorMode ? 'p-12 shadow-inner' : 'p-8 shadow-sm'}`}>
                   <h3 className={`font-black text-center ${theme.textPrimary} mb-10 uppercase tracking-widest ${theme.soft} w-fit mx-auto rounded-2xl shadow-sm print:bg-gray-200 print:text-black border ${theme.border} ${isProjectorMode ? 'text-2xl px-10 py-4' : 'text-sm px-6 py-3'}`}>{round[0].title}</h3>
                   <div className={`flex flex-wrap justify-center print:gap-4 ${isProjectorMode ? 'gap-10' : 'gap-6'}`}>
                      {round.map((match, mIdx) => ( 
                         <div key={match.id} className={`w-full ${isProjectorMode ? 'lg:w-[48%] xl:w-[46%]' : 'lg:w-[48%] xl:w-[45%]'}`}>
                           <MatchCard match={match} theme={theme} isProjectorMode={isProjectorMode} isKnockout={true} teamLogos={teamLogos} isTeamEvent={isTeamEvent} onScoreChange={(mId, pIdx, sIdx, side, val) => handleKnockoutScoreChange(round[0].roundIndex, mIdx, pIdx, sIdx, side, val)} />
                         </div> 
                      ))}
                   </div>
                </div>
             ))}
          </div>
        )}

        <div className="text-center mt-16 pb-8 print:mt-10 print:pb-4">
          <p className="font-black text-sm tracking-widest uppercase text-gray-400">
            Sepak Takraw Tournament Management System <span className={`mx-2 ${theme.textPrimary}`}>&bull;</span> by <span className={theme.textPrimary}>fiqhipondaa9</span>
          </p>
        </div>

      </main>

      {/* MODAL JADWAL INDUK */}
      {showMasterModal && (
        <MasterScheduleModal 
          theme={theme} setShowMasterModal={setShowMasterModal} sponsorLogos={sponsorLogos}
          championshipTitles={championshipTitles} phase1Standings={phase1Standings} getStandings={getStandings}
          tournamentType={tournamentType} hasPhase2GroupStage={hasPhase2GroupStage} stage={stage}
          knockoutData={knockoutData} isTeamEvent={isTeamEvent} teamLogos={teamLogos}
          generateMasterPlan={generateMasterPlan} formatMatchScore={formatMatchScore}
          handleExportPNG={handleExportPNG} isExportingPng={isExportingPng}
        />
      )}
    </div>
  );
}