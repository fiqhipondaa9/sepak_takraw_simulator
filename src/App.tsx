// src/App.js
import React, { useState, useCallback, useEffect } from 'react';
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
  const [phase2Format, setPhase2Format] = useState('group'); 
  const [phase2ByeSystem, setPhase2ByeSystem] = useState('seeding'); 

  const isTeamEvent = selectedEventFormat.toUpperCase().includes('TEAM');
  let eventDiscipline = 'Regu';
  if (selectedEventFormat.toUpperCase().includes('DOUBLE')) eventDiscipline = 'Double';
  else if (selectedEventFormat.toUpperCase().includes('QUADRANT')) eventDiscipline = 'Quadrant';
  else if (selectedEventFormat.toUpperCase().includes('MIXED')) eventDiscipline = 'Mix';

  const isActivePhaseFinished = schedule.length > 0 && schedule.every(match => match.winner !== null);
  const isSinglePoolCompleted = tournamentType === 'Group' && isActivePhaseFinished;
  
  // PENANDA BARU: Mengecek secara pasti apakah turnamen benar-benar melewati Fase 2 (Grup D & E)
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

  const handleAddSponsor = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setSponsorLogos([...sponsorLogos, reader.result]); reader.readAsDataURL(file); } };
  const handleRemoveSponsor = (index) => { const newSponsors = [...sponsorLogos]; newSponsors.splice(index, 1); setSponsorLogos(newSponsors); };
  const handleTeamLogoUpload = (teamName, e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setTeamLogos({ ...teamLogos, [teamName]: reader.result }); reader.readAsDataURL(file); } };
  const handleAddCourt = (e) => { if (e) e.preventDefault(); const newCourt = courtInputValue.trim(); if (!newCourt || courts.includes(newCourt)) return; setCourts([...courts, newCourt]); setCourtInputValue(''); };
  const handleRemoveCourt = (courtToRemove) => { if (courts.length === 1) return alert("Minimal 1 lapangan aktif!"); setCourts(courts.filter(c => c !== courtToRemove)); };
  const handleRemoveTeam = (teamToRemove) => { setTeams(teams.filter(team => team !== teamToRemove)); const newAssignments = { ...groupAssignments }; delete newAssignments[teamToRemove]; setGroupAssignments(newAssignments); const newLogos = { ...teamLogos }; delete newLogos[teamToRemove]; setTeamLogos(newLogos); };

  // --- BUG FIX: Logika Klasemen Presisi ---
  const getStandings = useCallback((specificSchedule = schedule, specificAssignments = groupAssignments) => {
    let standings = {};
    teams.forEach(t => { standings[t] = { team: t, group: tournamentType === 'Groups' ? (specificAssignments[t] ? `Grup ${specificAssignments[t]}` : 'Unknown') : 'Pool Utama', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 }; });
    
    // Perbaikan membaca data Fase 2 dengan aman
    const isPhase2 = Object.values(specificAssignments).includes('Eliminated');
    
    // Menggunakan seluruh matchHistory agar Klasemen Master Schedule aman membaca rekaman lama
    const filteredMatches = [...matchHistory, ...specificSchedule].filter(match => {
       if (!match.winner || match.winner === '?') return false;
       if (isPhase2) {
           // Jika kita sedang di Fase 2, pastikan HANYA pertandingan Fase 2 yang dihitung
           return match.groupLabel === 'Grup D' || match.groupLabel === 'Grup E';
       }
       // Jika bukan Fase 2, artinya kita di Fase 1 (hitung semua)
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
    const grouped = {}; sortedTeams.forEach(stat => { if (!grouped[stat.group]) grouped[stat.group] = []; grouped[stat.group].push(stat); });
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

  const generateDirectKnockout = (manualTeams = teams, startRoundIdx = 0, initialId = 1) => {
    const size = Math.pow(2, Math.ceil(Math.log2(manualTeams.length))); 
    let orderedTeams = Array(size).fill('BYE');
    if (manualTeams.length === size && manualTeams.some(t => t.includes('['))) { orderedTeams = [...manualTeams]; } 
    else if (tournamentType === 'Knocked Out Round' && stage === 0) {
        let shuffledTeams = [...manualTeams].sort(() => 0.5 - Math.random()); let fillOrder = [];
        for(let i=0; i < size; i+=2) fillOrder.push(i); for(let i=1; i < size; i+=2) fillOrder.push(i); 
        shuffledTeams.forEach((team, index) => { orderedTeams[fillOrder[index]] = team; });
    } else { orderedTeams = [...manualTeams]; while(orderedTeams.length < size) orderedTeams.push('BYE'); }

    const numRounds = Math.log2(size); let rounds = []; let matchCounter = initialId;
    const nP = isTeamEvent ? 3 : 1; const pL = eventDiscipline === 'Mix' ? mixDisciplines : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];

    for(let r = 0; r < numRounds; r++) {
       let matchesInRound = size / Math.pow(2, r + 1); let roundMatches = [];
       for(let m = 0; m < matchesInRound; m++) {
          let tA = '?'; let tB = '?';
          if (r === 0) { tA = orderedTeams[m * 2]; tB = orderedTeams[m * 2 + 1]; } 
          else { let prevA = rounds[r-1][m*2]; let prevB = rounds[r-1][m*2+1]; if (prevA.winner) tA = prevA.winner; if (prevB.winner) tB = prevB.winner; }

          let isByeMatch = (tA === 'BYE' || tB === 'BYE') && tA !== '?' && tB !== '?';
          let autoWinner = isByeMatch ? (tA === 'BYE' ? tB : tA) : null; if (tA === 'BYE' && tB === 'BYE') autoWinner = 'BYE';

          let initialParties = [];
          for(let p = 0; p < nP; p++) { initialParties.push({ id: `k_dir_p${p}`, label: isTeamEvent ? pL[p] : `Match`, sets: [{ scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }], winner: null }); }
          
          let nextR = r + 1; let nextM = Math.floor(m / 2); let nextSlot = m % 2 === 0 ? 'teamA' : 'teamB';
          let roundTitle = r === numRounds - 1 ? 'BABAK FINAL' : r === numRounds - 2 ? 'SEMI FINAL' : r === numRounds - 3 ? 'PEREMPAT FINAL' : 'BABAK PENYISIHAN';
          
          roundMatches.push({ id: matchCounter++, roundIndex: r, matchIndex: m, title: roundTitle, teamA: tA, teamB: tB, parties: initialParties, winner: autoWinner, winsA: 0, winsB: 0, isBye: isByeMatch, nextMatchRef: nextR < numRounds ? { r: nextR, m: nextM, slot: nextSlot } : null });
       }
       rounds.push(roundMatches);
    }
    return rounds;
  };

  const handleExecutePhase2 = () => {
    const std = getStandings(); let q = []; Object.values(std).forEach(gt => { if (gt[0]) q.push(gt[0]); if (gt[1]) q.push(gt[1]); });
    if (q.length < 2) return alert("Tim tidak cukup!");
    saveSnapshot(); setMatchHistory([...matchHistory, ...schedule]); const startId = [...matchHistory, ...schedule].length + 1;

    if (tournamentType === 'Groups' && Number(numGroups) === 4) {
       const ord = [std['Grup A']?.[0]?.team||'?', std['Grup B']?.[1]?.team||'?', std['Grup C']?.[0]?.team||'?', std['Grup D']?.[1]?.team||'?', std['Grup B']?.[0]?.team||'?', std['Grup A']?.[1]?.team||'?', std['Grup D']?.[0]?.team||'?', std['Grup C']?.[1]?.team||'?'];
       setPhase1Standings(std); setSchedule([]); setKnockoutData(generateDirectKnockout(ord, 0, startId)); setStage(3); window.scrollTo(0,0);
    }
    else if (tournamentType === 'Groups' && Number(numGroups) === 2) {
       const ord = [std['Grup A']?.[0]?.team||'?', std['Grup B']?.[1]?.team||'?', std['Grup B']?.[0]?.team||'?', std['Grup A']?.[1]?.team||'?'];
       setPhase1Standings(std); setSchedule([]); setKnockoutData(generateDirectKnockout(ord, 0, startId)); setStage(3); window.scrollTo(0,0);
    }
    else if (phase2Format === 'group' && Number(numGroups) === 3 && q.length >= 6) {
       const tA1=std['Grup A']?.[0]?.team, tA2=std['Grup A']?.[1]?.team, tB1=std['Grup B']?.[0]?.team, tB2=std['Grup B']?.[1]?.team, tC1=std['Grup C']?.[0]?.team, tC2=std['Grup C']?.[1]?.team;
       if(!tA1||!tB1||!tC1) return alert("Skor belum lengkap.");
       setPhase1Standings(std); const newAssigns = { ...groupAssignments };
       teams.forEach(t => { if ([tA1, tB2, tC1].includes(t)) newAssigns[t] = 'D'; else if ([tB1, tA2, tC2].includes(t)) newAssigns[t] = 'E'; else newAssigns[t] = 'Eliminated'; });
       setGroupAssignments(newAssigns); setTournamentType('Groups'); setNumGroups(2);
       let fSch = []; let counter = startId; const aC = courts.length > 0 ? courts : ['Lap. Utama']; let cTimes = aC.map(() => { let t = new Date(); t.setHours(8, 0, 0, 0); return t; });
       const pushMatch = (tA, tB, lbl) => { let pts = []; for(let p=0; p<(isTeamEvent?3:1); p++) pts.push({ id: `p${p}`, label: `Match`, sets: [{scoreA:'',scoreB:''},{scoreA:'',scoreB:''},{scoreA:'',scoreB:''}], winner: null }); let eIdx = 0; for(let i=1; i<cTimes.length; i++) if(cTimes[i] < cTimes[eIdx]) eIdx = i; fSch.push({ id: counter++, teamA: tA, teamB: tB, groupLabel: lbl, parties: pts, winner: null, winsA: 0, winsB: 0, date: cTimes[eIdx].toISOString().slice(0, 10), time: cTimes[eIdx].toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false}), court: aC[eIdx] }); cTimes[eIdx].setMinutes(cTimes[eIdx].getMinutes() + (isTeamEvent?120:45)); };
       pushMatch(tA1, tB2, "Grup D"); pushMatch(tB1, tA2, "Grup E"); pushMatch(tB2, tC1, "Grup D"); pushMatch(tA2, tC2, "Grup E"); pushMatch(tA1, tC1, "Grup D"); pushMatch(tB1, tC2, "Grup E");
       setSchedule(fSch); setStage(2); window.scrollTo(0,0);
    } 
    else if (phase2Format === 'knockout') {
       let ord = Array(8).fill('BYE');
       if (phase2ByeSystem === 'seeding') {
          q.sort((a,b) => { if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints; const aS = a.setWin - a.setLose; const bS = b.setWin - b.setLose; if (bS !== aS) return bS - aS; return 0; });
          if(q.length >= 6) { ord[0]=q[0].team; ord[1]='BYE'; ord[2]=q[3].team; ord[3]=q[4].team; ord[4]=q[1].team; ord[5]='BYE'; ord[6]=q[2].team; ord[7]=q[5].team; }
       } else {
          if(q.length >= 6) { ord[0]=std['Grup A']?.[0]?.team||'?'; ord[1]='BYE'; ord[2]=std['Grup C']?.[0]?.team||'?'; ord[3]=std['Grup B']?.[1]?.team||'?'; ord[4]=std['Grup B']?.[0]?.team||'?'; ord[5]='BYE'; ord[6]=std['Grup C']?.[1]?.team||'?'; ord[7]=std['Grup A']?.[1]?.team||'?'; }
       }
       setPhase1Standings(std); setSchedule([]); setKnockoutData(generateDirectKnockout(ord, 0, startId)); setStage(3); window.scrollTo(0,0);
    }
  };

  const generateSchedule = () => {
    if (tournamentType === 'Groups' && !teams.every(t => groupAssignments[t])) return alert("Ada tim yang belum masuk ke dalam grup!");
    saveSnapshot(); 
    let allMatches = [];
    const createRR = (gTeams, label) => {
      if(gTeams.length < 2) return []; let sch = []; let cur = [...gTeams]; if(cur.length % 2 !== 0) cur.push(null);
      const n = cur.length; for(let r=0; r<n-1; r++){ for(let i=0; i<n/2; i++){ if(cur[i] && cur[n-1-i]) sch.push({ teamA: cur[i], teamB: cur[n-1-i], groupLabel: label, roundLabel: 'P1' }); } cur.splice(1, 0, cur.pop()); } return sch;
    };
    if (tournamentType === 'Groups') {
      const gl = Array.from({length: Number(numGroups) || 2}, (_, i) => String.fromCharCode(65 + i));
      let gM = {}; let maxM = 0; gl.forEach(g => { const t = teams.filter(x => groupAssignments[x] === g); const m = createRR(t, `Grup ${g}`); gM[g] = m; if(m.length > maxM) maxM = m.length; });
      for (let i = 0; i < maxM; i++) { gl.forEach(g => { if (gM[g] && gM[g][i]) allMatches.push(gM[g][i]); }); }
    } else { allMatches = createRR(teams, 'Pool Utama'); }

    if (roundRobinType === 'Double Round Robin') {
      const round2Matches = allMatches.map(m => ({ teamA: m.teamB, teamB: m.teamA, groupLabel: m.groupLabel, roundLabel: 'P2' }));
      allMatches = [...allMatches, ...round2Matches]; 
    }

    let fSch = []; let counter = 1; const nP = isTeamEvent ? 3 : 1; const aC = courts.length > 0 ? courts : ['Lap. Utama'];
    let cTimes = aC.map(() => { let t = new Date(); t.setHours(8, 0, 0, 0); return t; }); const addMins = isTeamEvent ? 120 : 45;

    allMatches.forEach(m => {
      let pts = []; for(let p=0; p<nP; p++) pts.push({ id: `p${p}`, label: `Match`, sets: [{scoreA:'',scoreB:''},{scoreA:'',scoreB:''},{scoreA:'',scoreB:''}], winner: null });
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

  const renderAestheticBracket = () => {
    const isRealData = knockoutData.length > 0;
    
    let jointThirdTeams = [];
    if (isRealData) {
      const semiFinalRound = knockoutData.find(r => r && r[0] && r[0].title === 'SEMI FINAL');
      if (semiFinalRound && semiFinalRound.length === 2) {
        const m1 = semiFinalRound[0]; const m2 = semiFinalRound[1];
        if (m1.winner && m2.winner && m1.winner !== '?' && m2.winner !== '?') {
           const loser1 = m1.winner === m1.teamA ? m1.teamB : m1.teamA;
           const loser2 = m2.winner === m2.teamA ? m2.teamB : m2.teamA;
           if (loser1 !== '?' && loser2 !== '?') jointThirdTeams = [loser1, loser2];
        }
      }
    }

    const getTeamScore = (matchInfo, isTeamA) => {
        if (!matchInfo || !matchInfo.winner || matchInfo.winner === '?') return "-";
        if (isTeamEvent) return isTeamA ? matchInfo.winsA : matchInfo.winsB;
        if (matchInfo.parties && matchInfo.parties[0]) {
            let wA = 0, wB = 0;
            matchInfo.parties[0].sets.forEach(s => { const a = parseInt(s.scoreA), b = parseInt(s.scoreB); if (!isNaN(a) && !isNaN(b)) { if (a > b) wA++; else if (b > a) wB++; } });
            return isTeamA ? wA : wB;
        } return "-";
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

    if (knockoutData.length === 3 || numGroups === 4) {
       const qf = isRealData ? knockoutData[0] : [{ teamA: "JUARA A", teamB: "RUNNER B" }, { teamA: "JUARA C", teamB: "RUNNER D" }, { teamA: "JUARA B", teamB: "RUNNER A" }, { teamA: "JUARA D", teamB: "RUNNER C" }];
       const sf = isRealData ? knockoutData[1] : [{ teamA: "MENANG PF 1", teamB: "MENANG PF 2" }, { teamA: "MENANG PF 3", teamB: "MENANG PF 4" }];
       const fM = isRealData ? knockoutData[2][0] : { teamA: "MENANG SF 1", teamB: "MENANG SF 2" };
       return (
         <div className="flex gap-8 min-w-max items-center justify-start p-6 bg-gray-50/30 rounded-[40px] border border-gray-50 print-break-inside-avoid">
            <div className="flex flex-col gap-6 w-56"><div className="text-[9px] font-black text-gray-400 text-center mb-2 tracking-widest">PEREMPAT FINAL</div>{qf.map((m, i) => <BracketBox key={i} matchInfo={m} />)}</div>
            <div className="flex flex-col gap-12 w-56 justify-around h-full"><div className="text-[9px] font-black text-gray-400 text-center mb-2 tracking-widest -mt-8">SEMI FINAL</div>{sf.map((m, i) => <BracketBox key={i} matchInfo={m} />)}</div>
            <div className="flex flex-col gap-6 w-64 items-center">
               <div className="text-[9px] font-black text-emerald-600 text-center mb-4 tracking-[0.3em]">PARTAI PUNCAK</div>
               <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[32px] p-8 shadow-xl flex flex-col gap-3 w-full text-center relative print-break-inside-avoid">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[8px] font-black px-4 py-1 rounded-full">FINALIS</div>
                  <div className="flex justify-between items-center w-full px-2">
                      <div className={`text-[10px] font-black truncate w-1/3 text-right ${fM.winner === fM.teamA ? 'text-emerald-700' : 'text-emerald-900'}`}>{fM.teamA}</div>
                      <div className="flex flex-col items-center justify-center w-1/3"><div className="text-[10px] font-black text-emerald-500 mb-1">VS</div><div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-[9px] font-black">{getTeamScore(fM, true)} - {getTeamScore(fM, false)}</div></div>
                      <div className={`text-[10px] font-black truncate w-1/3 text-left ${fM.winner === fM.teamB ? 'text-emerald-700' : 'text-emerald-900'}`}>{fM.teamB}</div>
                  </div>
               </div>
               {isRealData && jointThirdTeams.length === 2 && (
                  <div className="mt-8 text-center print-break-inside-avoid">
                     <div className="text-amber-500 font-black text-xs flex flex-col items-center gap-2"><Icons.IconTrophy /><span className="tracking-widest">JUARA 3 BERSAMA</span></div>
                     <div className="mt-3 bg-amber-50/50 border border-amber-100 rounded-xl p-2 shadow-sm text-[10px] font-black text-amber-800 flex flex-col gap-1">
                        <div>{jointThirdTeams[0]}</div><div className="h-px bg-amber-200/50"></div><div>{jointThirdTeams[1]}</div>
                     </div>
                  </div>
               )}
            </div>
         </div>
       );
    }
    return <div className="text-gray-400 text-xs font-bold p-8 text-center border-2 border-dashed rounded-3xl">BAGAN SISTEM GUGUR AKAN DITAMPILKAN BERDASARKAN HASIL FASE SEBELUMNYA</div>;
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

      {showCoffeeModal && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl flex flex-col overflow-hidden text-center relative p-8">
            <button onClick={() => setShowCoffeeModal(false)} className="absolute top-4 right-4 bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 p-2 rounded-xl transition-colors"><Icons.IconX /></button>
            <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.IconCoffee /></div>
            <h3 className="text-xl font-black text-gray-800 mb-2">Traktir Kopi Developer</h3>
            <p className="text-xs font-bold text-gray-500 mb-6 leading-relaxed normal-case">Terima kasih telah menggunakan aplikasi ini! Dukungan Anda sangat berarti bagi pengembangan fitur selanjutnya.</p>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 flex justify-center">
                <img src="/shareqr.png" alt="QRIS" className="max-w-[200px] h-auto rounded-xl shadow-sm" />
            </div>
            <a href="https://wa.me/6285340804702" target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl shadow-md transition-colors w-full flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                Konsultasi WhatsApp
            </a>
          </div>
        </div>
      )}

      {isProjectorMode && <button onClick={handleExitProjectorMode} className="no-print fixed bottom-8 right-8 bg-white text-red-600 px-6 py-4 rounded-full shadow-2xl font-black z-50 flex items-center gap-3 animate-bounce border-4 border-red-100 hover:bg-red-50"><Icons.IconX /> EXIT</button>}

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

      {!isProjectorMode && (
        <div className="no-print sticky top-0 z-40 p-4 backdrop-blur-md bg-white/60 border-b border-white/20 shadow-sm flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className={`${theme.primary} text-white p-2 rounded-xl shadow-md`}><Icons.IconTrophy /></div>
              <div className="hidden sm:block">
                 <div className="font-black tracking-widest text-gray-800 leading-none">SEPAK TAKRAW<span className={theme.textPrimary}> Tournament Management System</span></div>
                 <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${theme.textPrimary} opacity-70`}>by fiqhipondaa9</div>
              </div>
           </div>
           
           <div className="flex items-center gap-2 sm:gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100 mr-2">
                 {Object.keys(themes).map(t => ( <button key={t} onClick={() => setActiveTheme(t)} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${activeTheme === t ? 'bg-white shadow-sm scale-110' : 'hover:bg-gray-200'}`} title={themes[t].name}><div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${themes[t].primary}`}></div></button> ))}
              </div>
              <label className={`cursor-pointer ${theme.soft} ${theme.textPrimary} hover:bg-gray-100 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-xs`}><Icons.IconFolder /> <span>OPEN</span><input type="file" accept=".json" hidden onChange={handleOpenFile} /></label>
              <button onClick={handleSaveFile} className={`${theme.primary} ${theme.primaryHover} text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-md text-xs`}><Icons.IconSave /> <span>SAVE</span></button>
           </div>
        </div>
      )}

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

        {!isProjectorMode && stage === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
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
             
             <div className="lg:col-span-5 flex flex-col gap-6">
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
                        <div className="flex flex-col gap-1"><span className="text-[10px] font-black uppercase tracking-widest">Partai 1</span><select value={mixDisciplines[0]} onChange={(e) => setMixDisciplines([e.target.value, mixDisciplines[1], mixDisciplines[2]])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 uppercase"><option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option></select></div>
                        <div className="flex flex-col gap-1"><span className="text-[10px] font-black uppercase tracking-widest">Partai 2</span><select value={mixDisciplines[1]} onChange={(e) => setMixDisciplines([mixDisciplines[0], e.target.value, mixDisciplines[2]])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 uppercase"><option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option></select></div>
                        <div className="flex flex-col gap-1"><span className="text-[10px] font-black uppercase tracking-widest">Partai 3</span><select value={mixDisciplines[2]} onChange={(e) => setMixDisciplines([mixDisciplines[0], mixDisciplines[1], e.target.value])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 uppercase"><option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option></select></div>
                     </div>
                   )}
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
                   <h2 className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Sistem & Lapangan</h2>
                   
                   <form className="flex gap-2 mb-3"><input type="text" value={courtInputValue} onChange={(e) => setCourtInputValue(e.target.value)} placeholder="Tambah lapangan..." className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white text-xs font-bold uppercase" /><button type="button" onClick={handleAddCourt} className="bg-gray-800 hover:bg-black text-white px-4 py-3 rounded-xl font-bold transition-colors"><Icons.IconPlus /></button></form>
                   <div className="flex flex-wrap gap-2 mb-6">{courts.map((court, index) => ( <div key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 border border-gray-200">{court} {courts.length > 1 && <button type="button" onClick={() => handleRemoveCourt(court)} className="text-gray-400 hover:text-red-500"><Icons.IconTrash /></button>}</div> ))}</div>

                   <select value={tournamentType} onChange={(e) => setTournamentType(e.target.value)} className="w-full bg-white border border-gray-200 font-black text-sm rounded-xl px-4 py-3 outline-none cursor-pointer mb-3 uppercase">
                      <option value="Group">GROUP (1 POOL - KOMPETISI PENUH)</option>
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
                        <div className="flex items-center gap-2">
                          <input type="number" min="2" max="26" value={numGroups} onChange={(e) => setNumGroups(e.target.value)} className="w-12 h-10 text-center font-black bg-white border border-gray-200 rounded-lg outline-none shadow-sm" />
                          <button onClick={handleAutoAssign} className="bg-white border border-gray-200 text-gray-700 font-black text-[10px] px-3 h-10 rounded-lg hover:bg-gray-50 uppercase shadow-sm">Susun</button>
                        </div>
                      </div>
                   )}
                   
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
                    <button onClick={() => setShowMasterModal(true)} className="bg-white text-amber-700 font-black py-4 px-10 rounded-2xl shadow-lg hover:scale-105 transition-transform uppercase tracking-widest text-lg">Lihat Hasil Akhir</button>
                 </div>
               ) : (
                 tournamentType === 'Groups' && (
                   <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-xl border border-gray-800 mt-8">
                     <h2 className="text-3xl font-black mb-6">PENGATURAN FASE BERIKUTNYA</h2>
                     {isActivePhaseFinished ? (
                        <div className="max-w-2xl mx-auto flex flex-col gap-4">
                           {Number(numGroups) === 3 && (
                             <div className="flex gap-4">
                                <select value={phase2Format} onChange={(e) => setPhase2Format(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 text-white font-bold text-sm rounded-xl px-4 py-3 uppercase outline-none">
                                   <option value="group">Grup Fase 2 (Grup D & E)</option>
                                   <option value="knockout">Langsung Gugur (6 Tim Play-off)</option>
                                </select>
                                {phase2Format === 'knockout' && (
                                   <select value={phase2ByeSystem} onChange={(e) => setPhase2ByeSystem(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 text-white font-bold text-sm rounded-xl px-4 py-3 uppercase outline-none">
                                      <option value="seeding">BYE untuk Tim Terbaik (Poin/Set)</option>
                                      <option value="standard">BYE untuk Juara Grup A & B</option>
                                   </select>
                                )}
                             </div>
                           )}
                           <button onClick={handleExecutePhase2} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-10 rounded-2xl shadow-lg uppercase tracking-widest text-lg mt-4">LANJUTKAN KE BABAK PLAY-OFF</button>
                        </div>
                     ) : <p className="text-gray-400 font-bold">Selesaikan semua pertandingan di atas untuk membuka babak sistem gugur.</p>}
                   </div>
                 )
               )
            )}
            
            {!isProjectorMode && stage === 2 && phase2Format === 'group' && (
               <div className="no-print bg-gray-900 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl mt-8">
                  <h2 className="text-3xl font-black text-white mb-3">Menuju Semi Final</h2>
                  {isActivePhaseFinished ? (
                     <button onClick={() => {
                        const std = getStandings(); const gD = std['Grup D']||[]; const gE = std['Grup E']||[];
                        if(!gD[0]||!gD[1]||!gE[0]||!gE[1]) return alert("Skor belum lengkap!");
                        saveSnapshot(); setMatchHistory([...matchHistory, ...schedule]); 
                        setSchedule([]); setKnockoutData(generateDirectKnockout([gD[0].team, gE[1].team, gE[0].team, gD[1].team], 0, [...matchHistory, ...schedule].length + 1)); 
                        setStage(3); window.scrollTo(0,0);
                     }} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-8 rounded-2xl shadow-md transition-all text-lg uppercase tracking-widest mt-4">Mulai Semi Final & Final</button>
                  ) : <p className="text-gray-400 font-bold normal-case">Selesaikan jadwal Fase 2 di atas untuk membuka Semi Final.</p>}
               </div>
            )}
          </div>
        )}

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
                           <MatchCard 
                             match={match} theme={theme} isProjectorMode={isProjectorMode} isKnockout={true} 
                             teamLogos={teamLogos} isTeamEvent={isTeamEvent} 
                             onScoreChange={(mId, pIdx, sIdx, side, val) => handleKnockoutScoreChange(round[0].roundIndex, mIdx, pIdx, sIdx, side, val)} 
                           />
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

      {/* MODAL JADWAL INDUK (MASTER SCHEDULE) */}
      {showMasterModal && (
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
                   
                   {/* TAMBAHAN: SPONSOR LOGOS UNTUK CETAK/LAPORAN */}
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
                
                {/* BUG FIX: Memastikan HASIL FASE 2 hanya muncul JIKA turnamen benar-benar melewati fase tersebut */}
                {(phase1Standings && hasPhase2GroupStage && stage >= 2) && <StandingsTable standingsData={getStandings()} title="HASIL FASE 2" borderColor="border-amber-400" isTeamEvent={isTeamEvent} teamLogos={teamLogos} />}

                {(knockoutData.length > 0 || tournamentType === 'Groups') && (
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
                      <thead><tr className="bg-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500"><th className="p-4 text-left rounded-tl-xl">ID</th><th className="p-4 text-left">FASE / GRUP</th><th className="p-4 text-center">PERTANDINGAN</th><th className="p-4 text-right rounded-tr-xl">HASIL</th></tr></thead>
                      <tbody>
                        {generateMasterPlan().map((m, idx) => (
                          <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 font-black text-gray-400">{String(m.id) !== 'TBD' ? `#${m.id}` : m.id}</td>
                            <td className="p-4"><span className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 shadow-sm">{m.label || m.groupLabel}</span></td>
                            <td className="p-4 font-black text-center">
                              <div className="flex justify-center items-center gap-4">
                                 <span className={`w-1/2 text-right uppercase ${m.winner === m.teamA && m.winner !== '?' && m.winner !== 'SERI' ? 'text-emerald-600' : 'text-gray-800'}`}>{m.teamA}</span><span className="text-[10px] text-gray-300 bg-gray-50 px-2 py-1 rounded-md">VS</span><span className={`w-1/2 text-left uppercase ${m.winner === m.teamB && m.winner !== '?' && m.winner !== 'SERI' ? 'text-emerald-600' : 'text-gray-800'}`}>{m.teamB}</span>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                               {m.winner && m.winner !== '?' ? (
                                 <span className={`text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm ${m.winner==='SERI'?'bg-gray-100 text-gray-500 border border-gray-200':'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                                    {formatMatchScore(m)}
                                 </span>
                               ) : ( <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">TBD</span> )}
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
                <button onClick={() => window.print()} className="bg-gray-800 hover:bg-black text-white px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-colors"><Icons.IconPrinter /> Cetak PDF Resmi</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}