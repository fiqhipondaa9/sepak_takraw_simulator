// src/hooks/useTournament.js
import { useState, useCallback } from 'react';

export const useTournament = () => {
  const [stage, setStage] = useState(0); 
  const [matchHistory, setMatchHistory] = useState([]); 
  const [teams, setTeams] = useState([]);
  const [schedule, setSchedule] = useState([]);
  
  // Konfigurasi Turnamen
  const [tournamentType, setTournamentType] = useState('Groups'); 
  const [roundRobinType, setRoundRobinType] = useState('Single Round Robin'); 
  const [numGroups, setNumGroups] = useState(2); 
  const [groupAssignments, setGroupAssignments] = useState({}); 
  const [selectedEventFormat, setSelectedEventFormat] = useState('Regu Event');
  const [mixDisciplines, setMixDisciplines] = useState(['Double', 'Regu', 'Quadrant']); 
  
  // Fasilitas & Estetika
  const [courts, setCourts] = useState(['LAPANGAN 1', 'LAPANGAN 2']);
  const [teamLogos, setTeamLogos] = useState({}); 
  const [sponsorLogos, setSponsorLogos] = useState([]); 
  const [championshipTitles, setChampionshipTitles] = useState(["EDIT NAMA KEJUARAAN", "EDIT KETERANGAN", "LOKASI & TANGGAL"]);
  
  // Fase 2 & Gugur
  const [knockoutData, setKnockoutData] = useState([]);
  const [phase1Standings, setPhase1Standings] = useState(null);
  
  // SISTEM UNDO BERLAPIS (STACK) - Menyelesaikan Masalah History Terbatas
  const [undoStack, setUndoStack] = useState([]);

  // Fungsi Simpan Riwayat (Dipanggil setiap kali ada perubahan fase/skor besar)
  const saveSnapshot = useCallback(() => {
    setUndoStack(prev => [
      ...prev, 
      {
        stage, schedule: [...schedule], matchHistory: [...matchHistory], 
        knockoutData: JSON.parse(JSON.stringify(knockoutData)), 
        teams: [...teams], groupAssignments: {...groupAssignments}, 
        tournamentType, numGroups, 
        phase1Standings: phase1Standings ? JSON.parse(JSON.stringify(phase1Standings)) : null
      }
    ]);
  }, [stage, schedule, matchHistory, knockoutData, teams, groupAssignments, tournamentType, numGroups, phase1Standings]);

  // Fungsi Batal (Undo) bertingkat
  const handleRollback = useCallback(() => {
    if (undoStack.length > 0 && window.confirm("Batalkan aksi terakhir? Anda akan kembali ke kondisi sebelumnya.")) {
      const previousState = undoStack[undoStack.length - 1];
      
      setStage(previousState.stage); 
      setSchedule(previousState.schedule);
      setMatchHistory(previousState.matchHistory); 
      setKnockoutData(previousState.knockoutData);
      setTeams(previousState.teams); 
      setGroupAssignments(previousState.groupAssignments);
      setTournamentType(previousState.tournamentType); 
      setNumGroups(previousState.numGroups);
      setPhase1Standings(previousState.phase1Standings);
      
      // Hapus riwayat terakhir dari stack
      setUndoStack(prev => prev.slice(0, -1));
    }
  }, [undoStack]);

  // --- FITUR BARU: SORONG JADWAL KE ATAS/BAWAH/PUNCAK/DASAR ---
  const moveMatchSchedule = useCallback((index, direction) => {
    setSchedule(prevSchedule => {
      const newSch = [...prevSchedule];
      const matchToMove = newSch.splice(index, 1)[0]; // Cabut jadwal dari array

      if (direction === 'up' && index > 0) {
        newSch.splice(index - 1, 0, matchToMove);
      } else if (direction === 'down' && index < prevSchedule.length - 1) {
        newSch.splice(index + 1, 0, matchToMove);
      } else if (direction === 'top') {
        newSch.unshift(matchToMove); // Taruh di urutan #1
      } else if (direction === 'bottom') {
        newSch.push(matchToMove); // Taruh di urutan paling akhir
      } else {
        return prevSchedule; // Batalkan jika tidak valid
      }
      return newSch;
    });
  }, []);

  // --- FITUR BARU: EDIT JAM & TANGGAL PERTANDINGAN ---
  const updateMatchDateTime = useCallback((matchId, field, value) => {
    setSchedule(prev => prev.map(m => 
      m.id === matchId ? { ...m, [field]: value } : m
    ));
  }, []);

  // --- PERBAIKAN STALE CLOSURE PADA UPDATE SKOR ---
  const handleScoreChange = useCallback((matchId, pIdx, sIdx, side, val) => {
    if (val !== '' && (val < 0 || val > 30)) return; // Validasi ditingkatkan max 30 untuk deuce panjang

    setSchedule(prevSchedule => prevSchedule.map(m => {
      if (m.id === matchId) {
        // Deep copy parties dengan cara yang aman dan cepat (tanpa stringify)
        const pts = m.parties.map((party, i) => {
          if (i !== pIdx) return party;
          const sets = party.sets.map((set, j) => {
            if (j !== sIdx) return set;
            return { ...set, [side]: val };
          });
          
          // Kalkulasi pemenang Set & Partai
          let wA=0, wB=0, z=0;
          sets.forEach(s => { 
            const a=parseInt(s.scoreA); const b=parseInt(s.scoreB); 
            if(!isNaN(a)&&!isNaN(b)){ if(a>b)wA++; else if(b>a)wB++; else if(a===0&&b===0)z++; }
          });
          
          const winner = wA>=2 ? m.teamA : wB>=2 ? m.teamB : (z>=2 ? 'SERI' : null);
          return { ...party, sets, winner };
        });

        // Kalkulasi pemenang Match
        let mW=0, mL=0, mS=0; 
        pts.forEach(px => { if(px.winner===m.teamA) mW++; else if(px.winner===m.teamB) mL++; else if(px.winner==='SERI') mS++; });
        
        let req = Math.ceil(pts.length/2); 
        let fW = mW>=req ? m.teamA : mL>=req ? m.teamB : mS>=req ? 'SERI' : (mW+mL+mS===pts.length ? (mW>mL?m.teamA:mL>mW?m.teamB:'SERI') : null);
        
        return { ...m, parties: pts, winner: fW, winsA: mW, winsB: mL };
      } 
      return m;
    }));
  }, []);

  // Fungsi Reset Total
  const handleReset = useCallback(() => { 
    if (window.confirm("Hapus semua data turnamen? Aksi ini tidak bisa dibatalkan.")) { 
      setTeams([]); setSchedule([]); setGroupAssignments({}); 
      setKnockoutData([]); setMatchHistory([]); setStage(0); 
      setUndoStack([]); setPhase1Standings(null); 
    } 
  }, []);

  return {
    // States
    stage, setStage, matchHistory, setMatchHistory, teams, setTeams, schedule, setSchedule,
    tournamentType, setTournamentType, roundRobinType, setRoundRobinType, numGroups, setNumGroups,
    groupAssignments, setGroupAssignments, selectedEventFormat, setSelectedEventFormat,
    mixDisciplines, setMixDisciplines, courts, setCourts, teamLogos, setTeamLogos, sponsorLogos, setSponsorLogos,
    championshipTitles, setChampionshipTitles, knockoutData, setKnockoutData, phase1Standings, setPhase1Standings,
    undoStack,
    // Actions
    saveSnapshot, handleRollback, moveMatchSchedule, updateMatchDateTime, handleScoreChange, handleReset
  };
};