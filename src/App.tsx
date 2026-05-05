import React, { useState, useEffect } from 'react';
import './index.css';

// --- KOMPONEN IKON SVG ---
const IconTrophy = () => <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const IconPlus = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const IconTrash = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const IconCalendar = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const IconUsers = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconTable = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>;
const IconSave = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconFolder = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
const IconImage = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconPrinter = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
const IconMonitor = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IconX = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconArrowUp = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>;
const IconArrowDown = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>;
const IconChevronsUp = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 11-5-5-5 5"/><path d="m17 18-5-5-5 5"/></svg>;
const IconChevronsDown = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/></svg>;
const IconCopy = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const IconList = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const IconUndo = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>;
const IconCoffee = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>;
const IconChevronRight = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const IconShare = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

// --- KONFIGURASI TEMA ---
const themes = {
  emerald: { name: 'Emerald', bgApp: 'bg-emerald-50/50', primary: 'bg-emerald-600', primaryHover: 'hover:bg-emerald-700', textPrimary: 'text-emerald-900', border: 'border-emerald-100', accent: 'bg-amber-400', accentText: 'text-amber-900', accentHover: 'hover:bg-amber-500', soft: 'bg-emerald-50', header: 'bg-emerald-800' },
  ocean: { name: 'Ocean', bgApp: 'bg-blue-50/50', primary: 'bg-blue-600', primaryHover: 'hover:bg-blue-700', textPrimary: 'text-blue-900', border: 'border-blue-100', accent: 'bg-orange-400', accentText: 'text-orange-900', accentHover: 'hover:bg-orange-500', soft: 'bg-blue-50', header: 'bg-blue-900' },
  sunset: { name: 'Sunset', bgApp: 'bg-rose-50/50', primary: 'bg-rose-600', primaryHover: 'hover:bg-rose-700', textPrimary: 'text-rose-900', border: 'border-rose-100', accent: 'bg-yellow-400', accentText: 'text-yellow-900', accentHover: 'hover:bg-yellow-500', soft: 'bg-rose-50', header: 'bg-rose-900' },
  amethyst: { name: 'Amethyst', bgApp: 'bg-purple-50/50', primary: 'bg-purple-600', primaryHover: 'hover:bg-purple-700', textPrimary: 'text-purple-900', border: 'border-purple-100', accent: 'bg-teal-400', accentText: 'text-teal-900', accentHover: 'hover:bg-teal-500', soft: 'bg-purple-50', header: 'bg-purple-900' },
  slate: { name: 'Slate', bgApp: 'bg-slate-100', primary: 'bg-slate-800', primaryHover: 'hover:bg-slate-900', textPrimary: 'text-slate-900', border: 'border-slate-200', accent: 'bg-indigo-500', accentText: 'text-indigo-50', accentHover: 'hover:bg-indigo-600', soft: 'bg-slate-100', header: 'bg-slate-950' },
  amber: { name: 'Amber', bgApp: 'bg-amber-50/50', primary: 'bg-amber-600', primaryHover: 'hover:bg-amber-700', textPrimary: 'text-amber-900', border: 'border-amber-100', accent: 'bg-blue-400', accentText: 'text-blue-900', accentHover: 'hover:bg-blue-500', soft: 'bg-amber-50', header: 'bg-amber-800' },
  indigo: { name: 'Indigo', bgApp: 'bg-indigo-50/50', primary: 'bg-indigo-600', primaryHover: 'hover:bg-indigo-700', textPrimary: 'text-indigo-900', border: 'border-indigo-100', accent: 'bg-pink-400', accentText: 'text-pink-900', accentHover: 'hover:bg-pink-500', soft: 'bg-indigo-50', header: 'bg-indigo-800' },
  teal: { name: 'Teal', bgApp: 'bg-teal-50/50', primary: 'bg-teal-600', primaryHover: 'hover:bg-teal-700', textPrimary: 'text-teal-900', border: 'border-teal-100', accent: 'bg-orange-400', accentText: 'text-orange-900', accentHover: 'hover:bg-orange-500', soft: 'bg-teal-50', header: 'bg-teal-800' }
};

export default function App() {
  const [activeTheme, setActiveTheme] = useState('emerald');
  const theme = themes[activeTheme];
  const [stage, setStage] = useState(0); 
  const [matchHistory, setMatchHistory] = useState([]); 
  const [teams, setTeams] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [tournamentType, setTournamentType] = useState('Groups'); 
  const [roundRobinType, setRoundRobinType] = useState('Single Round Robin'); 
  const [numGroups, setNumGroups] = useState(2); 
  const [groupAssignments, setGroupAssignments] = useState({}); 
  const [courts, setCourts] = useState(['LAPANGAN 1', 'LAPANGAN 2']);
  const [courtInputValue, setCourtInputValue] = useState('');
  const [teamLogos, setTeamLogos] = useState({}); 
  const [sponsorLogos, setSponsorLogos] = useState([]); 
  const [championshipTitles, setChampionshipTitles] = useState(["EDIT NAMA KEJUARAAN", "EDIT KETERANGAN", "LOKASI & TANGGAL"]);
  const [tournamentStartDate, setTournamentStartDate] = useState(''); 
  const [knockoutData, setKnockoutData] = useState([]);
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [selectedEventFormat, setSelectedEventFormat] = useState('REGU EVENT');
  const [mixDisciplines, setMixDisciplines] = useState(['DOUBLE', 'REGU', 'QUADRANT']); 
  const [phase2Format, setPhase2Format] = useState('group'); 
  const [phase2ByeSystem, setPhase2ByeSystem] = useState('seeding'); 
  const [phase1Standings, setPhase1Standings] = useState(null);

  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  
  // UNDO/REDO STATE
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  // SCOREBOARD STATE
  const [activeScoreboard, setActiveScoreboard] = useState(null); 
  const [serviceStarter, setServiceStarter] = useState(null); 

  const [showCoffeeModal, setShowCoffeeModal] = useState(false); 

  const isTeamEvent = selectedEventFormat.toUpperCase().includes('TEAM');
  let eventDiscipline = 'Regu';
  if (selectedEventFormat.toUpperCase().includes('DOUBLE')) eventDiscipline = 'Double';
  else if (selectedEventFormat.toUpperCase().includes('REGU')) eventDiscipline = 'Regu';
  else if (selectedEventFormat.toUpperCase().includes('QUADRANT')) eventDiscipline = 'Quadrant';
  else if (selectedEventFormat.toUpperCase().includes('MIXED')) eventDiscipline = 'Mix';

  const isActivePhaseFinished = schedule.length > 0 && schedule.every(match => match.winner !== null);

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
    const dataToSave = { stage, matchHistory, teams, schedule, tournamentType, roundRobinType, selectedEventFormat, mixDisciplines, numGroups, groupAssignments, teamLogos, sponsorLogos, championshipTitles, tournamentStartDate, knockoutData, courts, activeTheme, phase1Standings };
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
        setTournamentStartDate(data.tournamentStartDate || '');
        setKnockoutData(data.knockoutData || []); setCourts(data.courts || ['LAPANGAN 1', 'LAPANGAN 2']);
        if (data.activeTheme && themes[data.activeTheme]) setActiveTheme(data.activeTheme);
        setPhase1Standings(data.phase1Standings || null); setPast([]); setFuture([]);
      } catch (err) { alert("Gagal memuat! Format file tidak valid."); }
    };
    reader.readAsText(file); e.target.value = null; 
  };

  const getCurrentSnapshot = () => ({
    stage, schedule: JSON.parse(JSON.stringify(schedule)), matchHistory: JSON.parse(JSON.stringify(matchHistory)),
    knockoutData: JSON.parse(JSON.stringify(knockoutData)), teams: [...teams], groupAssignments: { ...groupAssignments },
    tournamentType, numGroups, phase1Standings: phase1Standings ? JSON.parse(JSON.stringify(phase1Standings)) : null, tournamentStartDate
  });

  const saveSnapshot = () => {
    const snap = getCurrentSnapshot();
    setPast(prev => [...prev.slice(-14), snap]);
    setFuture([]);
  };

  const handleUndo = () => {
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    setFuture(f => [getCurrentSnapshot(), ...f]);
    setPast(p => p.slice(0, -1));
    setStage(prev.stage); setSchedule(prev.schedule); setMatchHistory(prev.matchHistory); setKnockoutData(prev.knockoutData);
    setTeams(prev.teams); setGroupAssignments(prev.groupAssignments); setTournamentType(prev.tournamentType);
    setNumGroups(prev.numGroups); setPhase1Standings(prev.phase1Standings); setTournamentStartDate(prev.tournamentStartDate);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setPast(p => [...p, getCurrentSnapshot()]);
    setFuture(f => f.slice(1));
    setStage(next.stage); setSchedule(next.schedule); setMatchHistory(next.matchHistory); setKnockoutData(next.knockoutData);
    setTeams(next.teams); setGroupAssignments(next.groupAssignments); setTournamentType(next.tournamentType);
    setNumGroups(next.numGroups); setPhase1Standings(next.phase1Standings); setTournamentStartDate(next.tournamentStartDate);
  };

  const handleAddSponsor = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setSponsorLogos([...sponsorLogos, reader.result]); reader.readAsDataURL(file); } };
  const handleRemoveSponsor = (index) => { const newSponsors = [...sponsorLogos]; newSponsors.splice(index, 1); setSponsorLogos(newSponsors); };
  const handleTeamLogoUpload = (teamName, e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setTeamLogos({ ...teamLogos, [teamName]: reader.result }); reader.readAsDataURL(file); } };
  const handleUpdateTitle = (index, value) => { const newTitles = [...championshipTitles]; newTitles[index] = value; setChampionshipTitles(newTitles); };
  const handleAddCourt = (e) => { if (e) e.preventDefault(); const newCourt = courtInputValue.trim(); if (!newCourt || courts.includes(newCourt)) return; setCourts([...courts, newCourt]); setCourtInputValue(''); };
  const handleRemoveCourt = (courtToRemove) => { if (courts.length === 1) return alert("Minimal 1 lapangan aktif!"); setCourts(courts.filter(c => c !== courtToRemove)); };
  
  const handleAddTeam = (e) => { e.preventDefault(); const newTeam = inputValue.trim(); if (!newTeam || teams.includes(newTeam)) return; setTeams([...teams, newTeam]); setInputValue(''); };
  const handleRemoveTeam = (teamToRemove) => { setTeams(teams.filter(team => team !== teamToRemove)); const newAssignments = { ...groupAssignments }; delete newAssignments[teamToRemove]; setGroupAssignments(newAssignments); const newLogos = { ...teamLogos }; delete newLogos[teamToRemove]; setTeamLogos(newLogos); };
  const handleNumGroupsChange = (e) => { const val = e.target.value; if (val === '') { setNumGroups(''); return; } const num = Number(val); if (num >= 1 && num <= 26) { setNumGroups(num); setGroupAssignments({}); } };
  const handleAutoAssign = () => { if (teams.length === 0) return; const activeNG = Number(numGroups) || 2; const shf = [...teams].sort(() => 0.5 - Math.random()); const assignments = {}; const gl = Array.from({length: activeNG}, (_, i) => String.fromCharCode(65 + i)); shf.forEach((t, i) => { assignments[t] = gl[i % activeNG]; }); setGroupAssignments(assignments); };

  // --- TAHAP 4: DRAG & DROP UNTUK GRUP (STAGE 0) ---
  const handleTeamDropGroup = (e, targetGroup) => {
    e.preventDefault();
    const teamName = e.dataTransfer.getData('text/plain');
    if (!teamName || !teams.includes(teamName)) return;
    if (groupAssignments[teamName] === targetGroup) return;
    
    saveSnapshot();
    const newAssignments = { ...groupAssignments };
    if (targetGroup === '') {
        delete newAssignments[teamName];
    } else {
        newAssignments[teamName] = targetGroup;
    }
    setGroupAssignments(newAssignments);
  };

  const getStandings = (specificSchedule = schedule, specificAssignments = groupAssignments) => {
    let standings = {};
    teams.forEach(t => { standings[t] = { team: t, group: tournamentType === 'Groups' ? (specificAssignments[t] ? `Grup ${specificAssignments[t]}` : 'Unknown') : 'Pool Utama', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 }; });
    const isPhase2Active = Object.values(specificAssignments).some(g => g === 'D' || g === 'E');
    const filteredMatches = [...matchHistory, ...specificSchedule].filter(match => { if (!match.winner || match.winner === '?') return false; if (isPhase2Active) return match.groupLabel && match.groupLabel.includes("Fase 2"); return !match.groupLabel || !match.groupLabel.includes("Fase 2"); });
    filteredMatches.forEach(match => {
      const tA = match.teamA; const tB = match.teamB;
      if(!standings[tA]) standings[tA] = { team: tA, group: 'Unknown', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 };
      if(!standings[tB]) standings[tB] = { team: tB, group: 'Unknown', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 };
      standings[tA].play += 1; standings[tB].play += 1;
      if (match.winner === tA) { standings[tA].win += 1; standings[tB].lose += 1; } else if (match.winner === tB) { standings[tB].win += 1; standings[tA].lose += 1; }
      match.parties.forEach(party => {
        if (party.winner === tA) { standings[tA].partyWin += 1; standings[tB].partyLose += 1; } else if (party.winner === tB) { standings[tB].partyWin += 1; standings[tA].partyLose += 1; }
        party.sets.forEach(set => {
          const a = parseInt(set.scoreA); const b = parseInt(set.scoreB);
          if (!isNaN(a) && !isNaN(b)) {
            if (a > b) { standings[tA].setWin += 1; standings[tB].setLose += 1; } else if (b > a) { standings[tB].setWin += 1; standings[tA].setLose += 1; }
            standings[tA].pointWin += a; standings[tA].pointLose += b; standings[tB].pointWin += b; standings[tB].pointLose += a;
          }
        });
      });
      if (isTeamEvent) {
        if (match.winner === tA) { standings[tA].totalPoints += (match.winsB === 1) ? 2 : 3; standings[tB].totalPoints += (match.winsB === 1) ? 1 : 0; } 
        else if (match.winner === tB) { standings[tB].totalPoints += (match.winsA === 1) ? 2 : 3; standings[tA].totalPoints += (match.winsA === 1) ? 1 : 0; }
      } else { if (match.winner === tA) standings[tA].totalPoints += 2; else if (match.winner === tB) standings[tB].totalPoints += 2; }
    });
    const sorted = Object.values(standings).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.win !== a.win) return b.win - a.win;
      const aS = a.setWin - a.setLose; const bS = b.setWin - b.setLose; if (bS !== aS) return bS - aS;
      const aPt = a.pointWin - a.pointLose; const bPt = b.pointWin - b.pointLose; if (bPt !== aPt) return bPt - aPt;
      return 0;
    });
    const grouped = {}; sorted.forEach(stat => { if (!grouped[stat.group]) grouped[stat.group] = []; grouped[stat.group].push(stat); });
    return grouped;
  };

  const generateSchedule = () => {
    if (tournamentType === 'Groups' && !teams.every(team => groupAssignments[team])) return alert("Data grup belum lengkap!");
    saveSnapshot(); 
    let allMatches = [];
    const createRR = (gTeams, label) => {
      if(gTeams.length < 2) return []; let sch = []; let cur = [...gTeams]; if(cur.length % 2 !== 0) cur.push(null);
      const n = cur.length; for(let r=0; r<n-1; r++){ for(let i=0; i<n/2; i++){ if(cur[i] && cur[n-1-i]) sch.push({ teamA: cur[i], teamB: cur[n-1-i], groupLabel: label, roundLabel: 'P1' }); } cur.splice(1, 0, cur.pop()); } return sch;
    };
    if (tournamentType === 'Groups') {
      const gl = Array.from({length: Number(numGroups)}, (_, i) => String.fromCharCode(65 + i));
      let gM = {}; let maxM = 0; gl.forEach(g => { const t = teams.filter(x => groupAssignments[x] === g); const m = createRR(t, `Grup ${g}`); gM[g] = m; if(m.length > maxM) maxM = m.length; });
      for (let i = 0; i < maxM; i++) { gl.forEach(g => { if (gM[g][i]) allMatches.push(gM[g][i]); }); }
    } else { allMatches = createRR(teams, 'Pool Utama'); }
    if (roundRobinType === 'Double Round Robin') allMatches = [...allMatches, ...allMatches.map(m => ({ teamA: m.teamB, teamB: m.teamA, groupLabel: m.groupLabel, roundLabel: 'P2' }))];

    const defaultDate = tournamentStartDate || new Date().toISOString().slice(0, 10);
    const nP = isTeamEvent ? 3 : 1;
    const pL = eventDiscipline === 'Mix' ? mixDisciplines : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];
    const aC = courts.length > 0 ? courts : ['Lapangan Utama'];
    let cTimes = aC.map(() => { let t = new Date(); t.setHours(8, 0, 0, 0); return t; });
    const addMins = isTeamEvent ? 120 : 45;

    let fSch = allMatches.map((m, idx) => {
      let pts = []; for(let p=0; p<nP; p++) pts.push({ id: `p${p}`, label: isTeamEvent ? pL[p] : `Match`, sets: [{scoreA:'',scoreB:''},{scoreA:'',scoreB:''},{scoreA:'',scoreB:''}], winner: null });
      let eIdx = 0; for(let i=1; i<cTimes.length; i++) if(cTimes[i] < cTimes[eIdx]) eIdx = i;
      const match = { id: idx+1, teamA: m.teamA, teamB: m.teamB, groupLabel: m.groupLabel, roundLabel: m.roundLabel, parties: pts, winner: null, winsA: 0, winsB: 0, time: cTimes[eIdx].toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false}), date: defaultDate, court: aC[eIdx] };
      cTimes[eIdx].setMinutes(cTimes[eIdx].getMinutes() + addMins);
      return match;
    });
    setSchedule(fSch); setKnockoutData([]); setStage(1); 
  };

  const generateDirectKnockout = (manualTeams = teams, startRoundIdx = 0, initialId = 1) => {
    const size = Math.pow(2, Math.ceil(Math.log2(manualTeams.length))); 
    let orderedTeams = Array(size).fill('BYE');
    if (tournamentType === 'Knocked Out Round' && stage === 0) {
        let shuffled = [...manualTeams].sort(() => 0.5 - Math.random());
        let fillOrder = []; for(let i=0; i < size; i+=2) fillOrder.push(i); for(let i=1; i < size; i+=2) fillOrder.push(i);
        shuffled.forEach((t, i) => { orderedTeams[fillOrder[i]] = t; });
    } else { orderedTeams = [...manualTeams]; while(orderedTeams.length < size) orderedTeams.push('BYE'); }

    const numRounds = Math.log2(size); let rounds = [];
    const nP = isTeamEvent ? 3 : 1;
    const pL = eventDiscipline === 'Mix' ? mixDisciplines : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];
    const defaultDate = tournamentStartDate || new Date().toISOString().slice(0, 10);
    let mCount = initialId;

    for(let r = 0; r < numRounds; r++) {
       let matchesInRound = size / Math.pow(2, r + 1); let roundMatches = [];
       for(let m = 0; m < matchesInRound; m++) {
          let tA = r === 0 ? orderedTeams[m*2] : '?'; let tB = r === 0 ? orderedTeams[m*2+1] : '?';
          if (r > 0) {
              let pA = rounds[r-1][m*2]; let pB = rounds[r-1][m*2+1];
              if (pA.winner) tA = pA.winner; if (pB.winner) tB = pB.winner;
          }
          let isB = (tA === 'BYE' || tB === 'BYE') && tA !== '?' && tB !== '?';
          let aW = isB ? (tA === 'BYE' ? tB : tA) : null;
          let pts = []; for(let p=0; p<nP; p++) pts.push({ id: `k_p${p}`, label: isTeamEvent?pL[p]:`Match`, sets:[{scoreA:'',scoreB:''},{scoreA:'',scoreB:''},{scoreA:'',scoreB:''}], winner:null });
          roundMatches.push({ id: mCount++, roundIndex: r, matchIndex: m, title: r===numRounds-1?'BABAK FINAL':r===numRounds-2?'SEMI FINAL':r===numRounds-3?'PEREMPAT FINAL':'PENYISIHAN', teamA: tA, teamB: tB, parties: pts, winner: aW, winsA: 0, winsB: 0, isBye: isB, time: 'TBD', date: defaultDate, court: 'TBD', nextMatchRef: r<numRounds-1 ? { r: r+1, m: Math.floor(m/2), slot: m%2===0?'teamA':'teamB' } : null });
       }
       rounds.push(roundMatches);
    }
    return rounds;
  };

  const handleDateTimeChange = (mId, isK, rI, mI, field, val) => {
    if (isK) { setKnockoutData(prev => { const nd = JSON.parse(JSON.stringify(prev)); nd[rI][mI][field] = val; return nd; }); }
    else { setSchedule(prev => prev.map(m => m.id === mId ? { ...m, [field]: val } : m)); }
  };

  const handleScoreChange = (mId, pI, sI, side, val) => {
    if (val !== '' && (val < 0 || val > 17)) return;
    setSchedule(prev => prev.map(m => {
      if (m.id === mId) {
        const pts = [...m.parties]; const p = {...pts[pI]}; p.sets[sI][side] = val;
        let wA=0, wB=0, z=0;
        p.sets.forEach(s => { const a=parseInt(s.scoreA); const b=parseInt(s.scoreB); if(!isNaN(a)&&!isNaN(b)){ if(a>b)wA++; else if(b>a)wB++; else if(a===0&&b===0)z++; }});
        p.winner = wA>=2 ? m.teamA : wB>=2 ? m.teamB : (z>=2 ? 'SERI' : null);
        let mW=0, mL=0, mS=0; pts.forEach(px => { if(px.winner===m.teamA) mW++; else if(px.winner===m.teamB) mL++; else if(px.winner==='SERI') mS++; });
        let req = Math.ceil(pts.length/2);
        let fW = mW>=req ? m.teamA : mL>=req ? m.teamB : mS>=req ? 'SERI' : (mW+mL+mS===pts.length ? (mW>mL?m.teamA:mL>mW?m.teamB:'SERI') : null);
        return { ...m, parties: pts, winner: fW, winsA: mW, winsB: mL };
      } return m;
    }));
  };

  const handleKnockoutScoreChange = (rI, mI, pI, sI, side, val) => {
    if (val !== '' && (val < 0 || val > 17)) return;
    setKnockoutData(prev => {
      const nd = JSON.parse(JSON.stringify(prev)); const m = nd[rI][mI]; const p = m.parties[pI]; p.sets[sI][side] = val;
      let wA=0, wB=0, z=0;
      p.sets.forEach(s => { const a=parseInt(s.scoreA), b=parseInt(s.scoreB); if(!isNaN(a)&&!isNaN(b)){ if(a>b)wA++; else if(b>a)wB++; else if(a===0&&b===0)z++; }});
      p.winner = wA>=2 ? m.teamA : wB>=2 ? m.teamB : (z>=2 ? 'SERI' : null);
      let mW=0, mL=0, mS=0; m.parties.forEach(px => { if(px.winner===m.teamA) mW++; else if(px.winner===m.teamB) mL++; else if(px.winner==='SERI') mS++; });
      let req = Math.ceil(m.parties.length/2);
      let fW = mW>=req ? m.teamA : mL>=req ? m.teamB : mS>=req ? 'SERI' : (mW+mL+mS===m.parties.length ? (mW>mL?m.teamA:mL>mW?m.teamB:'SERI') : null);
      m.winner = fW; m.winsA = mW; m.winsB = mL;
      if (m.nextMatchRef && fW && fW!=='SERI') nd[m.nextMatchRef.r][m.nextMatchRef.m][m.nextMatchRef.slot] = fW;
      return nd;
    });
  };

  // --- TAHAP 4: FUNGSI REORDER (DRAG & DROP JADWAL) ---
  const reorderMatchSchedule = (srcIdx, destIdx) => {
    if (srcIdx === destIdx) return;
    saveSnapshot();
    const newSchedule = [...schedule];
    const [moved] = newSchedule.splice(srcIdx, 1);
    newSchedule.splice(destIdx, 0, moved);

    // Mempertahankan Waktu, ID, dan Lapangan agar urutan tidak rusak di laporan
    const origMeta = schedule.map(m => ({ id: m.id, time: m.time, date: m.date, court: m.court }));
    const finalized = newSchedule.map((m, i) => ({ 
        ...m, 
        id: origMeta[i].id, 
        time: origMeta[i].time, 
        date: origMeta[i].date, 
        court: origMeta[i].court 
    }));
    setSchedule(finalized);
  };

  // SCOREBOARD LOGIC (TAHAP 3)
  const handleUpdatePapanSkor = (isA, amount) => {
    if (!activeScoreboard) return;
    const currentMatch = activeScoreboard.isKnockout ? knockoutData[activeScoreboard.rI]?.[activeScoreboard.mI] : schedule.find(m => m.id === activeScoreboard.id);
    if (!currentMatch) return;
    const currentSet = currentMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex];
    const scoreA = parseInt(currentSet.scoreA) || 0;
    const scoreB = parseInt(currentSet.scoreB) || 0;

    const isFinished = (scoreA >= 15 || scoreB >= 15) && Math.abs(scoreA - scoreB) >= 2;
    const isMax = scoreA === 17 || scoreB === 17;
    if (amount > 0 && (isFinished || isMax)) { alert(`Set sudah selesai di angka ${scoreA} - ${scoreB}! Silakan lanjut ke set berikutnya.`); return; }

    saveSnapshot();
    const newVal = isA ? Math.max(0, scoreA + amount) : Math.max(0, scoreB + amount);
    if (activeScoreboard.isKnockout) { handleKnockoutScoreChange(activeScoreboard.rI, activeScoreboard.mI, activeScoreboard.pIndex, activeScoreboard.setIndex, isA ? 'scoreA' : 'scoreB', newVal.toString()); } 
    else { handleScoreChange(activeScoreboard.id, activeScoreboard.pIndex, activeScoreboard.setIndex, isA ? 'scoreA' : 'scoreB', newVal.toString()); }
  };

  const handleResetSet = () => {
    if (!activeScoreboard || !window.confirm("Mulai ulang skor set ini?")) return;
    saveSnapshot();
    if (activeScoreboard.isKnockout) { handleKnockoutScoreChange(activeScoreboard.rI, activeScoreboard.mI, activeScoreboard.pIndex, activeScoreboard.setIndex, 'scoreA', '0'); handleKnockoutScoreChange(activeScoreboard.rI, activeScoreboard.mI, activeScoreboard.pIndex, activeScoreboard.setIndex, 'scoreB', '0'); } 
    else { handleScoreChange(activeScoreboard.id, activeScoreboard.pIndex, activeScoreboard.setIndex, 'scoreA', '0'); handleScoreChange(activeScoreboard.id, activeScoreboard.pIndex, activeScoreboard.setIndex, 'scoreB', '0'); }
  };

  const handleClearScores = () => {
    if (!window.confirm("Bersihkan semua skor?")) return;
    saveSnapshot(); 
    setSchedule(schedule.map(m => ({ ...m, winner: null, winsA:0, winsB:0, parties: m.parties.map(p => ({...p, winner:null, sets:[{scoreA:'',scoreB:''},{scoreA:'',scoreB:''},{scoreA:'',scoreB:''}]})) })));
    if (knockoutData.length > 0) {
        setKnockoutData(prev => prev.map((r, ri) => r.map(m => {
            if (m.isBye) return m; 
            let resetTeamA = ri === 0 ? m.teamA : '?'; let resetTeamB = ri === 0 ? m.teamB : '?';
            if (ri > 0) { let prevA = prev[ri-1][m.matchIndex*2]; let prevB = prev[ri-1][m.matchIndex*2+1]; if (prevA.isBye) resetTeamA = prevA.winner; if (prevB.isBye) resetTeamB = prevB.winner; }
            return { ...m, winner: null, winsA:0, winsB:0, teamA: resetTeamA, teamB: resetTeamB, parties: m.parties.map(p => ({...p, winner:null, sets:[{scoreA:'',scoreB:''},{scoreA:'',scoreB:''},{scoreA:'',scoreB:''}]})) };
        })));
    }
  };

  const handleReset = () => { if (window.confirm("Hapus semua data turnamen?")) { saveSnapshot(); setTeams([]); setSchedule([]); setGroupAssignments({}); setKnockoutData([]); setMatchHistory([]); setStage(0); setPhase1Standings(null); } };

  const generateMasterPlan = () => {
    let masterPlan = []; const allMatches = [...matchHistory, ...schedule];
    if (allMatches.length > 0) allMatches.forEach(m => masterPlan.push({ ...m, label: m.groupLabel, phase: "Penyisihan" }));
    else masterPlan.push({ id: `TBD`, teamA: "TBD", teamB: "TBD", winner: null, label: "Penyisihan Belum Disusun", phase: "Penyisihan", court: "-", time: "-", date: "-" });

    if (stage < 3) {
      let mId = allMatches.length > 0 ? Math.max(...allMatches.map(m => parseInt(m.id) || 0)) + 1 : 1;
      const isSP = tournamentType === 'Group';
      if ((tournamentType === 'Groups' && Number(numGroups) === 2) || isSP) {
         masterPlan.push({ id: mId++, teamA: isSP ? "[PERINGKAT 1]" : "[JUARA A]", teamB: isSP ? "[PERINGKAT 3]" : "[RUNNER B]", winner: null, label: "SEMI FINAL 1", phase: "Knockout", court: "TBD", time: "TBD", date: "TBD" });
         masterPlan.push({ id: mId++, teamA: isSP ? "[PERINGKAT 2]" : "[JUARA B]", teamB: isSP ? "[PERINGKAT 4]" : "[RUNNER A]", winner: null, label: "SEMI FINAL 2", phase: "Knockout", court: "TBD", time: "TBD", date: "TBD" });
         masterPlan.push({ id: mId++, teamA: "[MENANG SF 1]", teamB: "[MENANG SF 2]", winner: null, label: "FINAL", phase: "Final Stage", court: "TBD", time: "TBD", date: "TBD" });
      }
    } else { knockoutData.forEach(r => r.forEach(m => masterPlan.push({ ...m, label: m.title, phase: "Knockout" }))); }
    return masterPlan;
  };

  const formatMatchScore = (m) => {
    if (m.isBye) return "BYE / W.O"; if (!m.winner || m.winner === '?') return "TBD";
    let sets = []; m.parties?.forEach(p => { let wA=0, wB=0; p.sets.forEach(s => { const a=parseInt(s.scoreA), b=parseInt(s.scoreB); if(a>b) wA++; else if(b>a) wB++; }); if(wA+wB>0) sets.push(`${wA}-${wB}`); });
    return isTeamEvent ? `${m.winsA}-${m.winsB} (${sets.join(', ')})` : (sets[0] || "WIN");
  };

  const renderAestheticBracket = () => {
    const isSP = tournamentType === 'Group'; const isReal = knockoutData.length > 0;
    const getS = (m, isA) => { if (!m || !m.winner || m.winner==='?') return "-"; return isTeamEvent ? (isA?m.winsA:m.winsB) : "-"; };
    const Box = ({ m }) => (
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm w-full">
          <div className="text-[9px] font-black flex justify-between uppercase"><span>{m.teamA}</span><span>{getS(m,true)}</span></div>
          <div className="h-px bg-gray-50 my-1"></div>
          <div className="text-[9px] font-black flex justify-between uppercase"><span>{m.teamB}</span><span>{getS(m,false)}</span></div>
      </div>
    );
    if (isSP || (tournamentType==='Groups' && Number(numGroups)===2)) {
      const sf = isReal ? knockoutData[0] : [{ teamA: isSP?"PERINGKAT 1":"JUARA A", teamB: isSP?"PERINGKAT 3":"RUNNER B" }, { teamA: isSP?"PERINGKAT 2":"JUARA B", teamB: isSP?"PERINGKAT 4":"RUNNER A" }];
      const f = isReal ? (knockoutData.length > 1 ? knockoutData[1][0] : {teamA:'TBD', teamB:'TBD'}) : { teamA: "MENANG SF 1", teamB: "MENANG SF 2" };
      return (
        <div className="flex gap-10 min-w-max items-center p-6 bg-gray-50/30 rounded-[40px] border border-gray-50">
           <div className="flex flex-col gap-6 w-56">{sf.map((m, i) => <Box key={i} m={m} />)}</div>
           <div className="flex flex-col gap-6 w-64 items-center">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[32px] p-8 shadow-xl w-full text-center relative">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="w-1/3 truncate text-right">{f.teamA}</span>
                    <div className="w-1/3 flex flex-col items-center"><span className="text-emerald-500 mb-1">VS</span><span className="bg-emerald-100 px-3 py-1 rounded-lg">{getS(f,true)} - {getS(f,false)}</span></div>
                    <span className="w-1/3 truncate text-left">{f.teamB}</span>
                 </div>
              </div>
           </div>
        </div>
      );
    }
    return <div className="text-gray-400 text-xs font-bold p-8 text-center border-2 border-dashed rounded-3xl">BAGAN AKAN DITAMPILKAN SESUAI FORMAT</div>;
  };

  const renderTeamCard = (team) => (
    <div key={team} draggable onDragStart={(e) => { e.dataTransfer.setData('text/plain', team); }} className="bg-white p-3 rounded-2xl flex items-center justify-between border border-gray-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group">
       <div className="flex items-center gap-4">
          <label className={`cursor-pointer w-12 h-12 rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden hover:border-gray-300 group-hover:border-blue-200 relative`}>{teamLogos[team] ? <img src={teamLogos[team]} className="w-full h-full object-cover" alt="Logo" /> : <IconImage className="w-5 h-5 text-gray-300 group-hover:text-blue-400" />}<input type="file" accept="image/*" hidden onChange={(e) => handleTeamLogoUpload(team, e)} /></label>
          <span className="font-black text-gray-800 text-sm uppercase">{team}</span>
       </div>
       <div className="flex items-center gap-3">
          {tournamentType === 'Groups' && (
             <select value={groupAssignments[team] || ''} onChange={(e) => setGroupAssignments({...groupAssignments, [team]: e.target.value})} className="bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-2 py-1 outline-none cursor-pointer focus:bg-white focus:border-gray-300 transition-colors hidden sm:block"><option value="" disabled>GRUP</option>{Array.from({length: Number(numGroups) || 2}, (_, i) => String.fromCharCode(65 + i)).map(g => <option key={g} value={g}>{g}</option>)}</select>
          )}
          <button onClick={() => handleRemoveTeam(team)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors" title="Hapus"><IconTrash /></button>
       </div>
    </div>
  );

  const renderMatchCard = (m, isK = false, index = null) => {
    const isTBD = String(m.teamA).includes('?') || String(m.teamB).includes('?');
    const isL = !isTBD && !m.winner && m.parties.some(p => p.sets.some(s => s.scoreA!=='' || s.scoreB!==''));
    
    return (
      <div key={m.id} draggable={!isProjectorMode && !isK && !isL} onDragStart={(e) => { e.dataTransfer.setData('text/plain', index); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const src = e.dataTransfer.getData('text/plain'); if(src !== '') reorderMatchSchedule(parseInt(src), index); }} className={`bg-white rounded-3xl shadow-sm border ${isL && !isProjectorMode ? 'border-red-400 shadow-md ring-4 ring-red-50' : theme.border} overflow-hidden flex flex-col transition-all duration-300 print-break-inside-avoid print:border-gray-300 print:shadow-none print:ring-0 ${isProjectorMode ? (isLive ? 'border-4 border-red-500 shadow-2xl' : 'border-none shadow-xl') : ''} ${!isProjectorMode && !isK && !isL ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-200' : ''}`}>
        <div className={`p-4 text-center border-b ${isL ? 'border-red-200' : theme.border} ${m.winner ? (m.winner === 'SERI' ? 'bg-gray-100 border-transparent print:bg-gray-100' : `${theme.accent} ${theme.accentText} border-transparent print:bg-gray-100`) : isL ? 'bg-red-50/80 print:bg-white' : `bg-gray-50/50 print:bg-white`} ${isProjectorMode ? 'py-5' : ''} relative`}>
          {isL && <div className="no-print absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 shadow-sm"><span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span><span className={`font-black text-red-700 uppercase tracking-widest ${isProjectorMode ? 'text-xs' : 'text-[10px]'}`}>LIVE</span></div>}
          <div className="flex flex-col items-center">
             <span className="font-black uppercase tracking-widest text-xs">{isK ? m.title : m.groupLabel}</span>
             <div className="font-medium mt-1 flex items-center justify-center gap-2 text-[10px] opacity-70">
                <span>MATCH #{m.id} &bull; {m.court}</span>
                {!isProjectorMode && (
                  <div className="flex gap-1 no-print">
                    <input type="date" value={m.date||''} onChange={e=>handleDateTimeChange(m.id,isK,m.roundIndex,m.matchIndex,'date',e.target.value)} className="bg-transparent border-b border-gray-300 w-[100px] text-center" />
                    <input type="time" value={m.time||''} onChange={e=>handleDateTimeChange(m.id,isK,m.roundIndex,m.matchIndex,'time',e.target.value)} className="bg-transparent border-b border-gray-300 w-[60px] text-center" />
                  </div>
                )}
             </div>
          </div>
          {/* TOMBOL BUKA SCOREBOARD */}
          {!isProjectorMode && !isTBD && !m.winner && (
            <button onClick={() => setActiveScoreboard({ id: m.id, isKnockout: isK, rI: m.roundIndex, mI: m.matchIndex, pIndex: 0, setIndex: 0 })} className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-md flex items-center gap-2 hover:bg-blue-700 transition-colors">SCOREBOARD <IconChevronRight /></button>
          )}

          {/* TAHAP 4: SHORTCUT REORDER (DRAG & DROP) */}
          {!isProjectorMode && !isK && index !== null && (
            <div className="no-print absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
               <button onClick={(e) => { e.stopPropagation(); reorderMatchSchedule(index, 0); }} disabled={index === 0} title="Pindah ke Paling Atas" className={`p-1 rounded bg-white border border-gray-200 shadow-sm transition-all ${index===0?'opacity-30':'hover:bg-gray-100 hover:text-blue-600'}`}><IconChevronsUp /></button>
               <button onClick={(e) => { e.stopPropagation(); reorderMatchSchedule(index, index - 1); }} disabled={index === 0} title="Naik Satu Tingkat" className={`p-1 rounded bg-white border border-gray-200 shadow-sm transition-all ${index===0?'opacity-30':'hover:bg-gray-100 hover:text-blue-600'}`}><IconArrowUp /></button>
               <button onClick={(e) => { e.stopPropagation(); reorderMatchSchedule(index, index + 1); }} disabled={index === schedule.length - 1} title="Turun Satu Tingkat" className={`p-1 rounded bg-white border border-gray-200 shadow-sm transition-all ${index===schedule.length-1?'opacity-30':'hover:bg-gray-100 hover:text-blue-600'}`}><IconArrowDown /></button>
               <button onClick={(e) => { e.stopPropagation(); reorderMatchSchedule(index, schedule.length - 1); }} disabled={index === schedule.length - 1} title="Pindah ke Paling Bawah" className={`p-1 rounded bg-white border border-gray-200 shadow-sm transition-all ${index===schedule.length-1?'opacity-30':'hover:bg-gray-100 hover:text-blue-600'}`}><IconChevronsDown /></button>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center p-5 bg-white relative pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-gray-400 font-black rounded-xl text-[10px] px-3 py-1">VS</div>
          <div className="w-2/5 flex flex-col items-center text-center"><div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 overflow-hidden">{teamLogos[m.teamA] ? <img src={teamLogos[m.teamA]} className="w-full h-full object-cover" /> : <IconUsers />}</div><span className="font-black text-sm uppercase truncate w-full">{m.teamA}</span></div>
          <div className="w-2/5 flex flex-col items-center text-center"><div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-2 overflow-hidden">{teamLogos[m.teamB] ? <img src={teamLogos[m.teamB]} className="w-full h-full object-cover" /> : <IconUsers />}</div><span className="font-black text-sm uppercase truncate w-full">{m.teamB}</span></div>
        </div>
        <div className="bg-gray-50/50 p-5 flex flex-col gap-3">
          {m.isBye ? <div className="p-4 text-center font-black text-emerald-500 border-2 border-emerald-100 border-dashed rounded-2xl text-sm">AUTO ADVANCE (BYE)</div> : (!isTBD && m.parties.map((p, pi) => (
            <div key={pi} className="bg-white border border-emerald-100 rounded-2xl p-3 shadow-sm">
               <div className="text-[9px] font-black text-gray-400 text-center uppercase mb-2">{p.label}</div>
               <div className="flex justify-center gap-4">
                 {[0,1,2].map(si => (
                   <div key={si} className="flex flex-col items-center">
                     <span className="text-[8px] font-black text-gray-300 mb-1">SET {si+1}</span>
                     <div className="flex gap-1">
                        <input type="number" value={p.sets[si].scoreA} onChange={e => isK?handleKnockoutScoreChange(m.roundIndex,m.matchIndex,pi,si,'scoreA',e.target.value):handleScoreChange(m.id,pi,si,'scoreA',e.target.value)} className="w-9 h-9 text-center text-xs font-black border border-gray-200 rounded-lg" />
                        <input type="number" value={p.sets[si].scoreB} onChange={e => isK?handleKnockoutScoreChange(m.roundIndex,m.matchIndex,pi,si,'scoreB',e.target.value):handleScoreChange(m.id,pi,si,'scoreB',e.target.value)} className="w-9 h-9 text-center text-xs font-black border border-gray-200 rounded-lg" />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )))}
        </div>
        {m.winner && <div className={`${theme.primary} text-white p-3 text-center font-black text-xs uppercase flex items-center justify-center gap-2`}><IconTrophy /> WINNER: {m.winner}</div>}
      </div>
    );
  };

  let activeMatch = null;
  if (activeScoreboard) {
      if (activeScoreboard.isKnockout) { activeMatch = knockoutData[activeScoreboard.rI]?.[activeScoreboard.mI]; } 
      else { activeMatch = schedule.find(m => m.id === activeScoreboard.id); }
  }

  return (
    <div className={`min-h-screen uppercase ${theme.bgApp} font-sans text-gray-800 pb-20 transition-all duration-500`}>
      <style>{`.export-mode .master-modal-content { max-height:none!important; overflow:visible!important; height:auto!important; } @media print { .no-print { display:none!important; } body { background:white!important; } }`}</style>
      
      {!isProjectorMode && (
        <div className="no-print sticky top-0 z-40 p-4 backdrop-blur-md bg-white/60 border-b border-white/20 shadow-sm flex justify-between items-center">
           <div className="flex items-center gap-3"><div className={`${theme.primary} text-white p-2 rounded-xl shadow-md`}><IconTrophy /></div><div className="font-black text-xs">SEPAK TAKRAW TMS</div></div>
           <div className="flex items-center gap-2 sm:gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
                 {Object.keys(themes).map(t => ( <button key={t} onClick={() => setActiveTheme(t)} className={`w-6 h-6 rounded-lg flex items-center justify-center ${activeTheme===t?'bg-white shadow-sm':''}`}><div className={`w-3 h-3 rounded-full ${themes[t].primary}`}></div></button> ))}
              </div>
              <label className="cursor-pointer bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold"><IconFolder /> OPEN<input type="file" accept=".json" hidden onChange={handleOpenFile} /></label>
              <button onClick={handleSaveFile} className={`${theme.primary} text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold shadow-md`}><IconSave /> SAVE</button>
           </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto mt-6 px-4 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 relative overflow-hidden text-center">
           <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600"></div>
           <div className="flex justify-center flex-wrap gap-4 mb-8">
              {sponsorLogos.map((l, i) => ( <div key={i} className="relative group w-24 h-24 bg-white border border-gray-100 rounded-3xl p-2 shadow-sm"><img src={l} className="w-full h-full object-contain" /><button onClick={()=>handleRemoveSponsor(i)} className="no-print absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100"><IconTrash /></button></div> ))}
              <label className="no-print w-24 h-24 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all text-gray-400 font-bold text-[10px] uppercase"><IconPlus /> Sponsor<input type="file" hidden onChange={handleAddSponsor} /></label>
           </div>
           <div className="space-y-2">
              <input value={championshipTitles[0]} onChange={e=>handleUpdateTitle(0,e.target.value)} className="w-full text-center font-black text-4xl uppercase outline-none focus:bg-gray-50 rounded-xl" />
              <input value={championshipTitles[1]} onChange={e=>handleUpdateTitle(1,e.target.value)} className="w-full text-center font-bold text-gray-500 text-xl uppercase outline-none focus:bg-gray-50 rounded-xl" />
              <div className="flex flex-col items-center gap-2 mt-4 no-print">
                 <input value={championshipTitles[2]} onChange={e=>handleUpdateTitle(2,e.target.value)} placeholder="Lokasi" className="text-center font-black text-xs text-gray-400 uppercase outline-none" />
                 <input type="date" value={tournamentStartDate} onChange={e=>setTournamentStartDate(e.target.value)} className="text-center text-xs font-black text-emerald-600 border border-emerald-100 px-3 py-1 rounded-lg uppercase" />
              </div>
           </div>
        </div>

        {stage === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
             <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col h-[600px] overflow-hidden">
                <h2 className="font-black text-lg mb-6 flex items-center gap-3"><IconUsers /> PENDAFTARAN TIM</h2>
                <form onSubmit={handleAddTeam} className="flex gap-3 mb-6 shrink-0"><input value={inputValue} onChange={e=>setInputValue(e.target.value)} placeholder="Nama Tim..." className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-black text-sm uppercase outline-none focus:border-blue-400" /><button className={`${theme.primary} text-white px-6 rounded-2xl shadow-lg`}><IconPlus /></button></form>
                
                {/* TAHAP 4: DRAG & DROP UNTUK GRUP */}
                <div className="flex-1 overflow-y-auto pr-2 pb-4">
                  {tournamentType === 'Groups' ? (
                     <div className="flex flex-col gap-4 h-full">
                        <div className="text-xs font-black text-gray-400 text-center border-b border-dashed pb-2">Geser (Drag & Drop) tim ke dalam Grup</div>
                        
                        {/* KOTAK UNASSIGNED */}
                        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleTeamDropGroup(e, '')} className="bg-gray-50/80 p-4 rounded-2xl border-2 border-dashed border-gray-200 min-h-[120px]">
                           <h4 className="text-[10px] font-black text-gray-400 mb-3 text-center">BELUM MASUK GRUP ({teams.filter(t => !groupAssignments[t]).length})</h4>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {teams.filter(t => !groupAssignments[t]).map(t => renderTeamCard(t))}
                           </div>
                        </div>

                        {/* KOTAK GRUP */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                           {Array.from({length: Number(numGroups) || 2}, (_, i) => String.fromCharCode(65 + i)).map(g => (
                              <div key={g} onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleTeamDropGroup(e, g)} className="bg-blue-50/40 p-4 rounded-2xl border-2 border-dashed border-blue-200 min-h-[150px]">
                                 <h4 className="text-[10px] font-black text-blue-700 mb-3 text-center">GRUP {g} ({teams.filter(t => groupAssignments[t] === g).length})</h4>
                                 <div className="flex flex-col gap-2">
                                    {teams.filter(t => groupAssignments[t] === g).map(t => renderTeamCard(t))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-col gap-3">
                        {teams.length === 0 && <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 font-bold text-sm normal-case">Belum ada tim didaftarkan.</div>}
                        {teams.map(t => renderTeamCard(t))}
                     </div>
                  )}
                </div>
             </div>

             <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">
                <div><h3 className="text-[10px] font-black text-gray-400 uppercase mb-3">Event</h3><select value={selectedEventFormat} onChange={e=>setSelectedEventFormat(e.target.value)} className="w-full bg-gray-50 p-4 rounded-2xl font-black text-sm uppercase outline-none focus:border-blue-400"><option value="Regu Event">Regu Event</option><option value="Regu Event Team">Regu Event Team</option><option value="Mixed Event Team">Mixed Event Team</option></select></div>
                <div><h3 className="text-[10px] font-black text-gray-400 uppercase mb-3">Sistem Turnamen</h3>
                  <select value={tournamentType} onChange={e=>setTournamentType(e.target.value)} className="w-full bg-gray-50 p-4 rounded-2xl font-black text-sm uppercase outline-none focus:border-blue-400 mb-4"><option value="Group">1 Pool Utama</option><option value="Groups">Banyak Grup</option><option value="Knocked Out Round">Sistem Gugur</option></select>
                  {tournamentType==='Groups' && <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-2xl border border-emerald-100"><span className="text-xs font-black text-emerald-800">Jumlah Grup</span><div className="flex gap-2"><input type="number" min="2" max="26" value={numGroups} onChange={handleNumGroupsChange} className="w-16 text-center font-black p-2 rounded-lg border border-emerald-200 outline-none" /><button onClick={handleAutoAssign} className="bg-white text-[10px] font-black px-4 py-2 rounded-lg text-emerald-700 shadow-sm border border-emerald-200 hover:bg-emerald-100">ACAK</button></div></div>}
                </div>
                <button onClick={tournamentType==='Knocked Out Round'?()=>{setKnockoutData(generateDirectKnockout());setStage(3);}:generateSchedule} disabled={teams.length<2} className={`mt-auto w-full ${theme.accent} ${theme.accentText} py-5 rounded-2xl font-black text-lg uppercase shadow-lg transition-all active:scale-95 disabled:opacity-50`}>Mulai Turnamen</button>
             </div>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="no-print bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3"><div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><IconTable /></div><div><h3 className="font-black text-sm">Dashboard</h3><p className="text-[10px] text-gray-400 font-bold">Input Skor & Pantau Laporan</p></div></div>
                <div className="flex gap-2">
                   <button onClick={handleUndo} disabled={past.length===0} className="bg-white border text-[10px] font-black px-4 py-2 rounded-xl shadow-sm disabled:opacity-30"><IconUndo /> UNDO</button>
                   <button onClick={handleRedo} disabled={future.length===0} className="bg-white border text-[10px] font-black px-4 py-2 rounded-xl shadow-sm disabled:opacity-30">REDO</button>
                   <button onClick={()=>setShowMasterModal(true)} className="bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase shadow-sm"><IconList /> Laporan Induk</button>
                   <button onClick={handleEnterProjectorMode} className="bg-amber-400 text-amber-900 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase shadow-sm"><IconMonitor /> Live Mode</button>
                </div>
             </div>

             {stage < 3 && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {Object.entries(getStandings()).map(([gn, gt]) => (
                   <div key={gn} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                      <div className="bg-gray-50/80 p-4 border-b border-gray-100 font-black text-center text-xs text-gray-400">{gn}</div>
                      <table className="w-full text-left">
                         <thead><tr className="text-[9px] font-black text-gray-400 border-b border-gray-50 uppercase"><th className="p-4">#</th><th className="p-4">Tim</th><th className="p-4 text-center">P</th><th className="p-4 text-center">W</th><th className="p-4 text-center">L</th><th className="p-4 text-center">PTS</th></tr></thead>
                         <tbody>
                            {gt.map((s, i) => (
                              <tr key={s.team} className={`${i===0?`${theme.soft}`:''} border-b border-gray-50`}>
                                <td className="p-4 text-xs font-black text-gray-300">{i+1}</td>
                                <td className="p-4 text-xs font-black uppercase">{s.team}</td>
                                <td className="p-4 text-center text-xs font-bold text-gray-400">{s.play}</td>
                                <td className="p-4 text-center text-xs font-black text-gray-700">{s.win}</td>
                                <td className="p-4 text-center text-xs font-black text-gray-400">{s.lose}</td>
                                <td className={`p-4 text-center text-sm font-black ${i===0?theme.primary:'bg-gray-50'} ${i===0?'text-white':'text-gray-800'}`}>{s.totalPoints}</td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                 ))}
               </div>
             )}

             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {(stage < 3 ? schedule : knockoutData.flat()).map((m, i) => renderMatchCard(m, stage >= 3, i))}
             </div>
             
             {stage === 1 && isActivePhaseFinished && (
               <div className="no-print bg-gray-900 p-12 rounded-[40px] text-center text-white shadow-2xl">
                  <h2 className="text-2xl font-black mb-6">Penyisihan Selesai!</h2>
                  <button onClick={()=>{
                    const std = tournamentType === 'Group' ? getStandings()['Pool Utama'] : [];
                    const top4 = tournamentType === 'Group' ? [std[0]?.team, std[2]?.team, std[1]?.team, std[3]?.team] : teams;
                    saveSnapshot();
                    setKnockoutData(generateDirectKnockout(top4, 0, schedule.length+1));
                    setStage(3);
                  }} className="bg-emerald-600 px-10 py-5 rounded-2xl font-black uppercase text-lg shadow-xl hover:bg-emerald-700 transition-all">Lanjut Semi Final</button>
               </div>
             )}
          </div>
        )}
      </main>

      {/* --- SCOREBOARD OVERLAY MODAL --- */}
      {activeMatch && activeScoreboard && (
        <div className="fixed inset-0 z-[100] bg-gray-950 flex flex-col p-6 text-white animate-in zoom-in duration-300">
           <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <div>
                 <h2 className="text-xl font-black text-amber-500 uppercase tracking-widest">{activeMatch.groupLabel || activeMatch.title}</h2>
                 <p className="text-xs font-bold text-gray-500">LAPANGAN: {activeMatch.court} | MATCH #{activeMatch.id}</p>
              </div>
              <div className="flex gap-3">
                 <button onClick={() => {
                      const dummyLink = `${window.location.origin}/live?matchId=${activeMatch.id}`;
                      navigator.clipboard.writeText(dummyLink);
                      alert(`Link disalin: ${dummyLink}\n(Catatan: Fitur live antar-perangkat akan aktif 100% pada pembaruan Database selanjutnya)`);
                 }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 transition-all">
                     <IconShare /> SHARE LINK
                 </button>
                 <button onClick={handleResetSet} className="bg-red-500/20 text-red-500 border border-red-500/50 px-6 py-3 rounded-2xl font-black text-xs uppercase hover:bg-red-500 hover:text-white transition-all">Reset Set {activeScoreboard.setIndex + 1}</button>
                 <button onClick={() => setActiveScoreboard(null)} className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors"><IconX /></button>
              </div>
           </div>

           <div className="flex-1 flex items-center justify-center gap-10">
              <div className="flex-1 flex flex-col items-center gap-8">
                 <div className={`relative p-8 rounded-[40px] border-4 transition-all duration-500 w-full text-center ${serviceStarter === 'A' ? 'border-amber-400 bg-amber-400/5' : 'border-white/10 bg-white/5'}`}>
                    {((parseInt(activeMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex].scoreA || 0) + parseInt(activeMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex].scoreB || 0)) % 2 === (serviceStarter === 'A' ? 0 : 1)) && (
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 px-6 py-2 rounded-full font-black text-xs shadow-xl animate-bounce">SERVICE</div>
                    )}
                    <span className="text-3xl md:text-5xl font-black uppercase truncate block mb-4">{activeMatch.teamA}</span>
                    <div className="text-[180px] md:text-[250px] font-black leading-none selection:bg-transparent">{activeMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex].scoreA || 0}</div>
                 </div>
                 <div className="flex gap-4 w-full">
                    <button onClick={() => handleUpdatePapanSkor(true, -1)} className="flex-1 bg-white/10 py-8 rounded-[30px] font-black text-3xl hover:bg-white/20 transition-all">-</button>
                    <button onClick={() => handleUpdatePapanSkor(true, 1)} className="flex-[2] bg-emerald-600 py-8 rounded-[30px] font-black text-5xl shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all">+</button>
                 </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                 <div className="text-4xl font-black text-gray-700">VS</div>
                 {(parseInt(activeMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex].scoreA || 0) >= 14 && parseInt(activeMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex].scoreB || 0) >= 14) && (
                    <div className="bg-red-600 px-6 py-2 rounded-lg font-black text-xs animate-pulse">DEUCE</div>
                 )}
              </div>

              <div className="flex-1 flex flex-col items-center gap-8">
                 <div className={`relative p-8 rounded-[40px] border-4 transition-all duration-500 w-full text-center ${serviceStarter === 'B' ? 'border-amber-400 bg-amber-400/5' : 'border-white/10 bg-white/5'}`}>
                    {((parseInt(activeMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex].scoreA || 0) + parseInt(activeMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex].scoreB || 0)) % 2 === (serviceStarter === 'B' ? 0 : 1)) && (
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 px-6 py-2 rounded-full font-black text-xs shadow-xl animate-bounce">SERVICE</div>
                    )}
                    <span className="text-3xl md:text-5xl font-black uppercase truncate block mb-4">{activeMatch.teamB}</span>
                    <div className="text-[180px] md:text-[250px] font-black leading-none selection:bg-transparent">{activeMatch.parties[activeScoreboard.pIndex].sets[activeScoreboard.setIndex].scoreB || 0}</div>
                 </div>
                 <div className="flex gap-4 w-full">
                    <button onClick={() => handleUpdatePapanSkor(false, -1)} className="flex-1 bg-white/10 py-8 rounded-[30px] font-black text-3xl hover:bg-white/20 transition-all">-</button>
                    <button onClick={() => handleUpdatePapanSkor(false, 1)} className="flex-[2] bg-emerald-600 py-8 rounded-[30px] font-black text-5xl shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all">+</button>
                 </div>
              </div>
           </div>

           <div className="flex justify-center gap-4 mt-8">
              {[0, 1, 2].map(idx => (
                 <button key={idx} onClick={() => {
                   setActiveScoreboard(prev => ({ ...prev, setIndex: idx }));
                   if (idx > 0 && serviceStarter) setServiceStarter(serviceStarter === 'A' ? 'B' : 'A'); 
                 }} className={`px-10 py-5 rounded-[25px] font-black text-lg transition-all ${activeScoreboard.setIndex === idx ? 'bg-amber-400 text-gray-900 scale-110 shadow-xl' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}>SET {idx + 1}</button>
              ))}
              <div className="ml-10 border-l border-white/10 pl-10 flex items-center gap-4">
                 <span className="text-xs font-black text-gray-500">PENENTUAN SERVER AWAL:</span>
                 <button onClick={() => setServiceStarter('A')} className={`px-6 py-3 rounded-xl font-black text-xs ${serviceStarter==='A'?'bg-amber-400 text-black':'bg-white/10'}`}>TIM A</button>
                 <button onClick={() => setServiceStarter('B')} className={`px-6 py-3 rounded-xl font-black text-xs ${serviceStarter==='B'?'bg-amber-400 text-black':'bg-white/10'}`}>TIM B</button>
              </div>
           </div>
        </div>
      )}

      {showMasterModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 master-modal-overlay">
           <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden master-modal-content">
              <div className={`${theme.header} p-6 flex justify-between items-center text-white no-print`}>
                 <div className="font-black">LAPORAN INDUK TURNAMEN</div>
                 <button onClick={()=>setShowMasterModal(false)}><IconX /></button>
              </div>
              <div id="master-print-area" className="flex-1 overflow-y-auto p-12 bg-white text-gray-800">
                 <div className="text-center mb-12 border-b pb-12">
                    <h1 className="text-4xl font-black mb-2 uppercase">{championshipTitles[0]}</h1>
                    <p className="text-xl font-bold text-gray-400 uppercase">{championshipTitles[1]}</p>
                 </div>
                 <div className="mb-12"><h3 className="font-black text-lg border-l-4 border-emerald-500 pl-4 mb-8">Klasemen Akhir</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{Object.entries(getStandings()).map(([gn,gt])=>(<div key={gn} className="bg-gray-50 p-6 rounded-3xl"><div className="text-center font-black text-xs text-gray-400 mb-4">{gn}</div><table className="w-full text-xs font-bold"><tbody>{gt.map((s,i)=>(<tr key={i} className="border-b border-gray-100"><td className="p-2 text-gray-300">#{i+1}</td><td className="p-2 uppercase">{s.team}</td><td className="p-2 text-right">{s.totalPoints} PTS</td></tr>))}</tbody></table></div>))}</div></div>
                 <div className="mb-12"><h3 className="font-black text-lg border-l-4 border-emerald-500 pl-4 mb-8">Bagan Pertandingan</h3>{renderAestheticBracket()}</div>
                 <div className="mb-12">
                    <h3 className="font-black text-lg border-l-4 border-emerald-500 pl-4 mb-8">Seluruh Hasil Pertandingan</h3>
                    <table className="w-full text-[10px] font-black uppercase">
                       <thead className="bg-gray-50 text-gray-400"><tr><th className="p-4 text-left">ID</th><th className="p-4 text-left">Fase</th><th className="p-4 text-center">Partai</th><th className="p-4 text-center">Jadwal</th><th className="p-4 text-right">Skor</th></tr></thead>
                       <tbody className="divide-y divide-gray-100">{generateMasterPlan().map(m=>(<tr key={m.id}>
                          <td className="p-4 text-gray-300">#{m.id}</td><td className="p-4">{m.label}</td>
                          <td className="p-4 text-center"><div className="flex justify-center gap-4"><span>{m.teamA}</span><span className="text-gray-200">VS</span><span>{m.teamB}</span></div></td>
                          <td className="p-4 text-center text-gray-400">{m.date} | {m.time}</td>
                          <td className="p-4 text-right"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">{formatMatchScore(m)}</span></td>
                       </tr>))}</tbody>
                    </table>
                 </div>
              </div>
              <div className="p-6 bg-gray-50 border-t flex justify-end gap-3 no-print">
                 <button onClick={()=>handleExportPNG()} className="bg-white border px-6 py-3 rounded-2xl font-black text-sm"><IconImage /> Export PNG</button>
                 <button onClick={handleExportPDF} className="bg-gray-800 text-white px-6 py-3 rounded-2xl font-black text-sm"><IconPrinter /> Cetak PDF</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}