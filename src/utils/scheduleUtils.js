/**
 * Membuat jadwal pertandingan berformat Round Robin.
 * Menggunakan algoritma poligon/Berger untuk memastikan posisi Home & Away 
 * dirotasi dengan adil dan urutan pool awal terurut (contoh: A1 vs A2).
 * 
 * @param {Array} gTeams - Daftar tim dalam satu grup.
 * @param {string} label - Nama grup (misal: 'Grup A').
 * @returns {Array} Array yang berisi jadwal per ronde.
 */
export const createRoundRobin = (gTeams, label) => {
    if (gTeams.length < 2) return []; 
    
    let teams = [...gTeams];
    // Jika jumlah tim ganjil, tambahkan slot kosong (BYE)
    if (teams.length % 2 !== 0) teams.push(null);
    
    const n = teams.length;
    const totalRounds = n - 1;
    const halfSize = n / 2;
    let schedule = [];
  
    for (let round = 0; round < totalRounds; round++) {
      let roundMatches = [];
      
      for (let i = 0; i < halfSize; i++) {
        let home = teams[i];
        let away = teams[n - 1 - i];
        
        if (home === null || away === null) continue;
  
        // Rotasi Home/Away berdasarkan nomor indeks ronde untuk keadilan bermain
        if ((i + round) % 2 === 1) {
          roundMatches.push({ teamA: away, teamB: home, groupLabel: label, roundLabel: `P${round + 1}` });
        } else {
          roundMatches.push({ teamA: home, teamB: away, groupLabel: label, roundLabel: `P${round + 1}` });
        }
      }
      schedule.push(roundMatches);
      
      // Putar posisi elemen array kecuali elemen pertama
      teams.splice(1, 0, teams.pop());
    }
    
    return schedule;
  };