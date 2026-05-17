/**
 * Menghasilkan struktur bagan pertandingan sistem gugur.
 * 
 * @param {Array} manualTeams - Daftar tim yang bermain.
 * @param {string} tournamentType - Format turnamen.
 * @param {number} stage - Tahap aplikasi.
 * @param {boolean} isTeamEvent - Apakah event beregu.
 * @param {string} eventDiscipline - Disiplin pertandingan utama.
 * @param {Array} mixDisciplines - Disiplin untuk kategori Mix.
 * @param {number} startRoundIdx - Indeks awal (default: 0).
 * @param {number} initialId - Nomor urut pertandingan awal.
 * @returns {Array} Struktur bagan multi-dimensi.
 */
export const generateDirectKnockout = (
    manualTeams, tournamentType, stage, isTeamEvent, eventDiscipline, mixDisciplines, startRoundIdx = 0, initialId = 1
  ) => {
    const size = Math.pow(2, Math.ceil(Math.log2(manualTeams.length))); 
    let orderedTeams = Array(size).fill('BYE');
    
    if (manualTeams.length === size && manualTeams.some(t => t.includes('['))) { 
        orderedTeams = [...manualTeams]; 
    } else if (tournamentType === 'Knocked Out Round' && stage === 0) {
        let shuffledTeams = [...manualTeams];
        orderedTeams = [...shuffledTeams];
        while(orderedTeams.length < size) orderedTeams.push('BYE');
    } else { 
        orderedTeams = [...manualTeams]; 
        while(orderedTeams.length < size) orderedTeams.push('BYE'); 
    }
  
    const numRounds = Math.log2(size); 
    let rounds = []; 
    let matchCounter = initialId;
    const nP = isTeamEvent ? 3 : 1; 
    const pL = eventDiscipline === 'Mix' ? mixDisciplines : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];
  
    for(let r = 0; r < numRounds; r++) {
       let matchesInRound = size / Math.pow(2, r + 1); 
       let roundMatches = [];
       for(let m = 0; m < matchesInRound; m++) {
          let tA = r === 0 ? orderedTeams[m * 2] : '?'; 
          let tB = r === 0 ? orderedTeams[m * 2 + 1] : '?';
          
          if (r > 0) { 
              let prevA = rounds[r-1][m*2]; 
              let prevB = rounds[r-1][m*2+1]; 
              if (prevA.winner) tA = prevA.winner; 
              if (prevB.winner) tB = prevB.winner; 
          }
  
          let isByeMatch = (tA === 'BYE' || tB === 'BYE') && tA !== '?' && tB !== '?';
          let autoWinner = isByeMatch ? (tA === 'BYE' ? tB : tA) : null; 
          if (tA === 'BYE' && tB === 'BYE') autoWinner = 'BYE';
  
          let initialParties = [];
          for(let p = 0; p < nP; p++) { 
              initialParties.push({ id: `k_dir_p${p}`, label: isTeamEvent ? pL[p] : `Match`, sets: [{ scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }], winner: null }); 
          }
          
          let nextR = r + 1; 
          let nextM = Math.floor(m / 2); 
          let nextSlot = m % 2 === 0 ? 'teamA' : 'teamB';
          let roundTitle = r === numRounds - 1 ? 'BABAK FINAL' : r === numRounds - 2 ? 'SEMI FINAL' : r === numRounds - 3 ? 'PEREMPAT FINAL' : 'BABAK PENYISIHAN';
          
          roundMatches.push({ 
              id: matchCounter++, roundIndex: r, matchIndex: m, title: roundTitle, 
              teamA: tA, teamB: tB, parties: initialParties, winner: autoWinner, winsA: 0, winsB: 0, 
              isBye: isByeMatch, nextMatchRef: nextR < numRounds ? { r: nextR, m: nextM, slot: nextSlot } : null 
          });
       }
       rounds.push(roundMatches);
    }
    return rounds;
  };