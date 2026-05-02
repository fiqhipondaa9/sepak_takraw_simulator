import React, { useState } from 'react';
import './index.css';

// --- KOMPONEN IKON SVG ---
const IconTrophy = () => <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const IconPlus = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const IconTrash = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const IconCalendar = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const IconCheck = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconUsers = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconTable = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>;
const IconSave = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconFolder = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
const IconImage = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconBracket = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18"/><path d="M3 12h5"/><path d="M8 7v10"/><path d="M8 7h5"/><path d="M8 17h5"/><path d="M13 12h5"/><path d="M18 7v10"/><path d="M18 12h3"/></svg>;
const IconPrinter = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
const IconFileSpreadsheet = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M12 13v4"/></svg>;
const IconDownloadImg = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconMonitor = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IconX = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconPalette = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
const IconArrowUp = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>;
const IconArrowDown = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>;
const IconCopy = () => <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;

// --- KONFIGURASI TEMA BENTO 2026 ---
const themes = {
  emerald: { name: 'Emerald', bgApp: 'bg-emerald-50/50', primary: 'bg-emerald-600', primaryHover: 'hover:bg-emerald-700', textPrimary: 'text-emerald-900', border: 'border-emerald-100', accent: 'bg-amber-400', accentText: 'text-amber-900', accentHover: 'hover:bg-amber-500', ring: 'focus:ring-emerald-400', soft: 'bg-emerald-50', header: 'bg-emerald-800' },
  ocean: { name: 'Ocean', bgApp: 'bg-blue-50/50', primary: 'bg-blue-600', primaryHover: 'hover:bg-blue-700', textPrimary: 'text-blue-900', border: 'border-blue-100', accent: 'bg-orange-400', accentText: 'text-orange-900', accentHover: 'hover:bg-orange-500', ring: 'focus:ring-blue-400', soft: 'bg-blue-50', header: 'bg-blue-900' },
  sunset: { name: 'Sunset', bgApp: 'bg-rose-50/50', primary: 'bg-rose-600', primaryHover: 'hover:bg-rose-700', textPrimary: 'text-rose-900', border: 'border-rose-100', accent: 'bg-yellow-400', accentText: 'text-yellow-900', accentHover: 'hover:bg-yellow-500', ring: 'focus:ring-rose-400', soft: 'bg-rose-50', header: 'bg-rose-900' },
  amethyst: { name: 'Amethyst', bgApp: 'bg-purple-50/50', primary: 'bg-purple-600', primaryHover: 'hover:bg-purple-700', textPrimary: 'text-purple-900', border: 'border-purple-100', accent: 'bg-teal-400', accentText: 'text-teal-900', accentHover: 'hover:bg-teal-500', ring: 'focus:ring-purple-400', soft: 'bg-purple-50', header: 'bg-purple-900' },
  slate: { name: 'Slate', bgApp: 'bg-slate-100', primary: 'bg-slate-800', primaryHover: 'hover:bg-slate-900', textPrimary: 'text-slate-900', border: 'border-slate-200', accent: 'bg-indigo-500', accentText: 'text-indigo-50', accentHover: 'hover:bg-indigo-600', ring: 'focus:ring-slate-400', soft: 'bg-slate-100', header: 'bg-slate-950' }
};

export default function App() {
  // --- STATE MANAGEMENT (Tanpa Local Storage) ---
  const [activeTheme, setActiveTheme] = useState('emerald');
  const theme = themes[activeTheme];

  const [teams, setTeams] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [tournamentType, setTournamentType] = useState('group'); 
  const [eventCategory, setEventCategory] = useState('single'); 
  const [eventDiscipline, setEventDiscipline] = useState('Regu'); 
  const [mixDisciplines, setMixDisciplines] = useState(['Double', 'Regu', 'Quadrant']); 
  const [numGroups, setNumGroups] = useState(2); 
  const [groupAssignments, setGroupAssignments] = useState({}); 
  const [courts, setCourts] = useState(['Lapangan Utama', 'Lapangan B']);
  const [courtInputValue, setCourtInputValue] = useState('');
  const [teamLogos, setTeamLogos] = useState({}); 
  const [sponsorLogos, setSponsorLogos] = useState([]); 
  const [championshipTitles, setChampionshipTitles] = useState([
    "EDIT NAMA KEJUARAAN",
    "EDIT KETERANGAN DAN LAIN-LAIN",
    "EDIT LOKASI & TANGGAL PELAKSANAAN"
  ]);
  const [knockoutData, setKnockoutData] = useState([]);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isProjectorMode, setIsProjectorMode] = useState(false);

  // --- CEK STATUS FASE 1 ---
  const isPhase1Finished = schedule.length > 0 && schedule.every(match => match.winner !== null);

  // --- FUNGSI MODE LAYAR PENUH (FULLSCREEN) ---
  const handleEnterProjectorMode = () => {
    setIsProjectorMode(true);
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.log(err));
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen().catch(err => console.log(err));
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen().catch(err => console.log(err));
    }
  };

  const handleExitProjectorMode = () => {
    setIsProjectorMode(false);
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.log(err));
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen().catch(err => console.log(err));
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen().catch(err => console.log(err));
      }
    }
  };

  // Sensor pintar: Jika user menekan tombol 'ESC'
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        setIsProjectorMode(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // --- EFEK PERINGATAN TUTUP TAB ---
  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (teams.length > 0 || schedule.length > 0) {
        e.preventDefault();
        e.returnValue = ''; 
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [teams.length, schedule.length]);

  // --- FUNGSI FITUR FILE (SAVE & OPEN JSON) ---
  const handleSaveFile = () => {
    const dataToSave = {
      teams, schedule, tournamentType, eventCategory, eventDiscipline, mixDisciplines, numGroups, 
      groupAssignments, teamLogos, sponsorLogos, championshipTitles, knockoutData, courts, activeTheme
    };
    const blob = new Blob([JSON.stringify(dataToSave)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TakrawBento_${new Date().toISOString().slice(0,10)}.json`; 
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setTeams(data.teams || []);
        setSchedule(data.schedule || []);
        setTournamentType(data.tournamentType || 'group');
        setEventCategory(data.eventCategory || 'single');
        setEventDiscipline(data.eventDiscipline || 'Regu'); 
        if (data.mixDisciplines) setMixDisciplines(data.mixDisciplines);
        setNumGroups(data.numGroups || 2);
        setGroupAssignments(data.groupAssignments || {});
        setTeamLogos(data.teamLogos || {});
        setSponsorLogos(data.sponsorLogos || []);
        if (data.championshipTitles) setChampionshipTitles(data.championshipTitles);
        setKnockoutData(data.knockoutData || []); 
        setCourts(data.courts || ['Lapangan Utama', 'Lapangan B']);
        if (data.activeTheme && themes[data.activeTheme]) setActiveTheme(data.activeTheme);
      } catch (err) {
        alert("Gagal memuat! Format file tidak valid.");
      }
    };
    reader.readAsText(file);
    e.target.value = null; 
  };

  // --- FUNGSI EKSPOR: EXCEL, PDF, & PNG ---
  const handleExportPDF = () => window.print();

  const handleExportExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "=== KLASEMEN TURNAMEN SEPAK TAKRAW ===\n\n";
    const standings = getStandings();
    Object.entries(standings).forEach(([groupName, groupTeams]) => {
      csvContent += `${groupName}\n`;
      csvContent += "Posisi,Tim,Main,Menang,Kalah,Partai(W-L),Set(W-L),Angka(W-L),POINT\n";
      groupTeams.forEach((stat, index) => {
        csvContent += `${index + 1},"${stat.team}",${stat.play},${stat.win},${stat.lose},${stat.partyWin}-${stat.partyLose},${stat.setWin}-${stat.setLose},${stat.pointWin}-${stat.pointLose},${stat.totalPoints}\n`;
      });
      csvContent += "\n";
    });

    csvContent += "=== JADWAL & HASIL PERTANDINGAN ===\n\n";
    csvContent += "Match ID,Kategori,Waktu,Lapangan,Tim A,Tim B,Pemenang\n";
    schedule.forEach(match => {
      csvContent += `#${match.id},${match.groupLabel || 'Pool Utama'},${match.time},${match.court},"${match.teamA}","${match.teamB}","${match.winner || 'Belum selesai'}"\n`;
    });

    if (knockoutData.length > 0) {
      csvContent += "\n=== FASE SISTEM GUGUR ===\n\n";
      knockoutData.forEach(round => {
        csvContent += `${round[0].title}\n`;
        csvContent += "Tim A,Tim B,Pemenang\n";
        round.forEach(match => {
          csvContent += `"${match.teamA}","${match.teamB}","${match.winner || 'Belum selesai'}"\n`;
        });
        csvContent += "\n";
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Takraw_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPNG = async () => {
    setIsExportingPng(true);
    try {
      if (!window.html2canvas) {
        if (!document.getElementById('html2canvas-script')) {
            const script = document.createElement('script');
            script.id = 'html2canvas-script';
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
        } else {
            await new Promise(r => setTimeout(r, 1000)); 
        }
      }
      const element = document.getElementById('capture-area');
      const canvas = await window.html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const link = document.createElement("a");
      link.download = `Takraw_Board_${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      alert("Gagal membuat gambar PNG.");
    } finally {
      setIsExportingPng(false);
    }
  };

  // --- FUNGSI SALIN KLASEMEN KE WHATSAPP ---
  const handleCopyWhatsApp = () => {
    const standings = getStandings();
    let waText = `🏆 *KLASEMEN SEMENTARA* 🏆\n`;
    waText += `*${championshipTitles[0]}*\n`;
    if (championshipTitles[1]) waText += `${championshipTitles[1]}\n`;
    waText += `\n`;

    Object.entries(standings).forEach(([groupName, groupTeams]) => {
      waText += `*${groupName}*\n`;
      groupTeams.forEach((stat, index) => {
        let medal = '';
        if (index === 0) medal = '🥇 ';
        else if (index === 1) medal = '🥈 ';
        else if (index === 2) medal = '🥉 ';
        else medal = '▪️ ';

        waText += `${index + 1}. ${medal}*${stat.team}* - *${stat.totalPoints} PTS*\n`;
        waText += `   (Main: ${stat.play} | Menang: ${stat.win} | Set: ${stat.setWin}-${stat.setLose})\n`;
      });
      waText += `\n`;
    });

    waText += `_Update via Sepak Takraw Tournament Management System_\n`;

    const textArea = document.createElement("textarea");
    textArea.value = waText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert("✅ Klasemen berhasil disalin! Silakan Paste (Tempel) di grup WhatsApp Anda.");
    } catch (err) {
      alert("❌ Gagal menyalin teks. Silakan coba lagi.");
    }
    document.body.removeChild(textArea);
  };

  // --- FUNGSI MANAJEMEN MEDIA & LAPANGAN ---
  const handleAddSponsor = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSponsorLogos([...sponsorLogos, reader.result]);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSponsor = (index) => {
    const newSponsors = [...sponsorLogos]; newSponsors.splice(index, 1); setSponsorLogos(newSponsors);
  };

  const handleTeamLogoUpload = (teamName, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTeamLogos({ ...teamLogos, [teamName]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateTitle = (index, value) => {
    const newTitles = [...championshipTitles]; newTitles[index] = value; setChampionshipTitles(newTitles);
  };

  const handleAddCourt = (e) => {
    e.preventDefault();
    const newCourt = courtInputValue.trim();
    if (!newCourt) return;
    if (courts.includes(newCourt)) return alert("Lapangan ini sudah terdaftar!");
    setCourts([...courts, newCourt]);
    setCourtInputValue('');
  };

  const handleRemoveCourt = (courtToRemove) => {
    if (courts.length === 1) return alert("Peringatan: Turnamen minimal harus memiliki 1 lapangan aktif!");
    setCourts(courts.filter(c => c !== courtToRemove));
  };


  // --- FUNGSI LOGIKA TURNAMEN (GROUP STAGE) ---
  const handleAddTeam = (e) => {
    e.preventDefault();
    const newTeam = inputValue.trim();
    if (!newTeam) return;
    if (teams.includes(newTeam)) return alert("Tim ini sudah terdaftar!");
    setTeams([...teams, newTeam]);
    setInputValue('');
  };

  const handleRemoveTeam = (teamToRemove) => {
    setTeams(teams.filter(team => team !== teamToRemove));
    const newAssignments = { ...groupAssignments }; delete newAssignments[teamToRemove]; setGroupAssignments(newAssignments);
    const newLogos = { ...teamLogos }; delete newLogos[teamToRemove]; setTeamLogos(newLogos);
  };

  const handleNumGroupsChange = (e) => {
    const val = e.target.value;
    if (val === '') { setNumGroups(''); return; }
    const num = Number(val);
    if (num >= 1 && num <= 26) { setNumGroups(num); setGroupAssignments({}); }
  };

  const handleAutoAssign = () => {
    if (teams.length === 0) return alert("Tambahkan tim terlebih dahulu!");
    const activeNumGroups = Number(numGroups) || 2;
    const shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
    const assignments = {};
    const groupLetters = Array.from({length: activeNumGroups}, (_, i) => String.fromCharCode(65 + i)); 
    shuffledTeams.forEach((team, index) => { assignments[team] = groupLetters[index % activeNumGroups]; });
    setGroupAssignments(assignments);
  };

  // --- FUNGSI BARU: SISTEM GUGUR LANGSUNG ---
  const generateDirectKnockout = () => {
    if (teams.length < 2) return alert("Butuh minimal 2 tim untuk bertanding!");

    // 1. Cari ukuran bagan (kelipatan 2 terdekat: 2, 4, 8, 16, 32)
    const size = Math.pow(2, Math.ceil(Math.log2(teams.length))); 
    
    // 2. Susun tim biar adil
    let shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
    
    // 3. Distribusikan tim dan sisipkan "BYE" untuk slot yang kosong
    let orderedTeams = Array(size).fill('BYE');
    let fillOrder = [];
    for(let i=0; i < size; i+=2) fillOrder.push(i); // Isi slot kiri dulu (0, 2, 4...)
    for(let i=1; i < size; i+=2) fillOrder.push(i); // Baru isi slot lawannya (1, 3, 5...)
    
    shuffledTeams.forEach((team, index) => {
       orderedTeams[fillOrder[index]] = team;
    });

    // 4. Buat struktur ronde seperti babak final biasa
    const numRounds = Math.log2(size); let rounds = [];
    const numParties = eventCategory === 'team' ? 3 : 1;
    const partyLabels = eventDiscipline === 'Mix' ? mixDisciplines : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];

    for(let r = 0; r < numRounds; r++) {
       let matchesInRound = size / Math.pow(2, r + 1); let roundMatches = [];
       for(let m = 0; m < matchesInRound; m++) {
          let tA = '?'; let tB = '?';
          if (r === 0) { tA = orderedTeams[m * 2]; tB = orderedTeams[m * 2 + 1]; }
          
          let initialParties = [];
          for(let p = 0; p < numParties; p++) { 
             initialParties.push({ id: `k_dir_p${p}`, label: eventCategory === 'team' ? partyLabels[p] : `Pertandingan ${eventDiscipline === 'Mix' ? 'Campuran' : eventDiscipline}`, sets: [{ scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }], winner: null }); 
          }
          
          let nextR = r + 1; let nextM = Math.floor(m / 2); let nextSlot = m % 2 === 0 ? 'teamA' : 'teamB';
          
          // Penamaan Babak
          let roundTitle = 'BABAK PENYISIHAN';
          if (r === numRounds - 1) roundTitle = 'BABAK FINAL';
          else if (r === numRounds - 2) roundTitle = 'SEMI FINAL';
          else if (r === numRounds - 3) roundTitle = 'PEREMPAT FINAL';

          roundMatches.push({ id: `k_dir_${r}_${m}`, roundIndex: r, matchIndex: m, title: roundTitle, teamA: tA, teamB: tB, parties: initialParties, winner: null, winsA: 0, winsB: 0, nextMatchRef: nextR < numRounds ? { r: nextR, m: nextM, slot: nextSlot } : null });
       }
       rounds.push(roundMatches);
    }
    
    setKnockoutData(rounds);
    setSchedule([]); // Kosongkan jadwal grup agar halaman grup disembunyikan
  };

  const generateSchedule = () => {
    if (tournamentType === 'group') {
      const isAllAssigned = teams.every(team => groupAssignments[team]);
      if (!isAllAssigned) return alert("Ada tim yang belum masuk ke dalam grup!");
    }

    // --- ALGORITMA ROUND-ROBIN (JADWAL ADIL STANDAR INTERNASIONAL) ---
    const createRoundRobin = (groupTeams, groupLabel) => {
      if (groupTeams.length < 2) return [];
      let rSchedule = [];
      let currentTeams = [...groupTeams];
      
      // Jika jumlah tim ganjil, tambahkan "Dummy" (tim bayangan untuk BYE / Istirahat)
      if (currentTeams.length % 2 !== 0) {
        currentTeams.push(null);
      }
      
      const numTeams = currentTeams.length;
      const rounds = numTeams - 1;
      const half = numTeams / 2;

      for (let r = 0; r < rounds; r++) {
        for (let i = 0; i < half; i++) {
          const teamA = currentTeams[i];
          const teamB = currentTeams[numTeams - 1 - i];
          // Hanya masukkan ke jadwal jika tidak melawan Dummy (tim mendapat lawan nyata)
          if (teamA !== null && teamB !== null) {
            rSchedule.push({ teamA, teamB, groupLabel });
          }
        }
        // Rotasi tim searah jarum jam (Tim di index 0 tetap diam sebagai poros)
        currentTeams.splice(1, 0, currentTeams.pop());
      }
      return rSchedule;
    };

    let allMatches = [];
    const activeNumGroups = Number(numGroups) || 2;
    
    if (tournamentType === 'group') {
      const groupLetters = Array.from({length: activeNumGroups}, (_, i) => String.fromCharCode(65 + i));
      let matchesByGroup = {}; let maxMatchesInAGroup = 0;
      
      groupLetters.forEach(groupId => {
        const groupTeams = teams.filter(t => groupAssignments[t] === groupId);
        // Buat jadwal Round-Robin per Grup
        const gMatches = createRoundRobin(groupTeams, `Grup ${groupId}`);
        matchesByGroup[groupId] = gMatches;
        if (gMatches.length > maxMatchesInAGroup) maxMatchesInAGroup = gMatches.length;
      });
      
      // Menggabungkan jadwal dari grup yang berbeda secara bergantian (Silang Grup)
      // Contoh: Match 1 dari Grup A, Match 2 dari Grup B, Match 3 dari Grup A, dst.
      for (let i = 0; i < maxMatchesInAGroup; i++) {
        groupLetters.forEach(groupId => { 
          if (matchesByGroup[groupId][i]) allMatches.push(matchesByGroup[groupId][i]); 
        });
      }
    } else {
      // Buat jadwal Round-Robin untuk Sistem Pool Utama
      allMatches = createRoundRobin(teams, 'Pool Utama');
    }

    let finalSchedule = []; 
    let matchCounter = 1;
    const numParties = eventCategory === 'team' ? 3 : 1;
    
    // LOGIKA LABEL SPESIFIK & MIX FORMAT
    const partyLabels = eventDiscipline === 'Mix' 
      ? mixDisciplines // Jika Mix, ambil dari array mix [Double, Regu, Quadrant]
      : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];

    const activeCourts = courts.length > 0 ? courts : ['Lapangan Utama'];
    let courtNextAvailableTimes = activeCourts.map(() => {
        let t = new Date(); t.setHours(8, 0, 0, 0); return t;
    });
    const addMinutes = eventCategory === 'team' ? 120 : 45;

    allMatches.forEach(matchInfo => {
      let initialParties = [];
      for(let p = 0; p < numParties; p++) {
        initialParties.push({ id: `p${p}`, label: eventCategory === 'team' ? partyLabels[p] : `Pertandingan ${eventDiscipline === 'Mix' ? 'Campuran' : eventDiscipline}`, sets: [{ scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }], winner: null });
      }
      
      let earliestTimeIdx = 0;
      for (let i = 1; i < courtNextAvailableTimes.length; i++) {
         if (courtNextAvailableTimes[i] < courtNextAvailableTimes[earliestTimeIdx]) earliestTimeIdx = i;
      }

      const matchTime = courtNextAvailableTimes[earliestTimeIdx];
      const timeString = matchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const assignedCourt = activeCourts[earliestTimeIdx];

      finalSchedule.push({ 
        id: matchCounter, teamA: matchInfo.teamA, teamB: matchInfo.teamB, groupLabel: matchInfo.groupLabel, 
        parties: initialParties, winner: null, winsA: 0, winsB: 0, time: timeString, court: assignedCourt
      });
      
      courtNextAvailableTimes[earliestTimeIdx].setMinutes(courtNextAvailableTimes[earliestTimeIdx].getMinutes() + addMinutes);
      matchCounter++;
    });

    setSchedule(finalSchedule); setKnockoutData([]); 
  };

  // --- FUNGSI PINDAH URUTAN JADWAL (FITUR BARU) ---
  const moveMatchSchedule = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === schedule.length - 1) return;

    const newSchedule = [...schedule];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    // Kloning data untuk menghindari mutasi langsung pada state React
    const item1 = { ...newSchedule[index] };
    const item2 = { ...newSchedule[swapIndex] };

    // Simpan Nomor Match (ID), Waktu, dan Lapangan agar tetap pada posisinya
    const id1 = item1.id; const time1 = item1.time; const court1 = item1.court;
    const id2 = item2.id; const time2 = item2.time; const court2 = item2.court;

    // Tukar jam dan lapangan agar selaras dengan slot urutannya
    item1.id = id2; item1.time = time2; item1.court = court2;
    item2.id = id1; item2.time = time1; item2.court = court1;

    // Letakkan kembali ke array di posisi yang sudah ditukar
    newSchedule[index] = item2;
    newSchedule[swapIndex] = item1;

    setSchedule(newSchedule);
  };

  // --- LOGIKA MENGHITUNG PEMENANG PARTAI (DENGAN DUKUNGAN W.O. GANDA) ---
  const calculatePartyWinner = (sets, teamA, teamB) => {
    let winsA = 0; let winsB = 0; let zeros = 0;
    sets.forEach(set => {
      const a = parseInt(set.scoreA); const b = parseInt(set.scoreB);
      if (!isNaN(a) && !isNaN(b)) { 
         if (a > b) winsA++; 
         else if (b > a) winsB++; 
         else if (a === 0 && b === 0) zeros++; // Deteksi input 0-0 (Walk-Over)
      }
    });
    
    if (winsA >= 2) return teamA; 
    if (winsB >= 2) return teamB;
    // Jika ada 2 set dengan skor 0-0, otomatis W.O. Ganda (Seri)
    if (zeros >= 2 || (winsA === 1 && winsB === 1 && zeros === 1)) return 'SERI'; 
    return null; 
  };

  const handleScoreChange = (matchId, partyIndex, setIndex, side, newScore) => {
    if (newScore !== '' && (newScore < 0 || newScore > 17)) return;
    const updatedSchedule = schedule.map(match => {
      if (match.id === matchId) {
        const updatedParties = [...match.parties]; const targetParty = { ...updatedParties[partyIndex] }; const updatedSets = [...targetParty.sets];
        updatedSets[setIndex] = { ...updatedSets[setIndex], [side]: newScore };
        targetParty.sets = updatedSets; targetParty.winner = calculatePartyWinner(updatedSets, match.teamA, match.teamB);
        updatedParties[partyIndex] = targetParty;
        
        let matchWinsA = 0; let matchWinsB = 0; let matchSeri = 0;
        updatedParties.forEach(p => { 
           if (p.winner === match.teamA) matchWinsA++; 
           else if (p.winner === match.teamB) matchWinsB++; 
           else if (p.winner === 'SERI') matchSeri++;
        });
        
        const requiredWins = Math.ceil(updatedParties.length / 2); let finalWinner = null;
        
        if (matchWinsA >= requiredWins) finalWinner = match.teamA; 
        else if (matchWinsB >= requiredWins) finalWinner = match.teamB;
        else if (matchSeri >= requiredWins) finalWinner = 'SERI';
        else if (matchWinsA + matchWinsB + matchSeri === updatedParties.length) {
           // Jika seluruh partai selesai tapi tak ada yang capai requiredWins
           if (matchWinsA > matchWinsB) finalWinner = match.teamA;
           else if (matchWinsB > matchWinsA) finalWinner = match.teamB;
           else finalWinner = 'SERI';
        }
        
        return { ...match, parties: updatedParties, winner: finalWinner, winsA: matchWinsA, winsB: matchWinsB };
      }
      return match;
    });
    setSchedule(updatedSchedule);
  };

  const handleReset = () => {
    if (window.confirm("Hapus semua tim & jadwal? (Sponsor, Lapangan & Judul aman)")) {
      setTeams([]); setSchedule([]); setGroupAssignments({}); setTeamLogos({}); setKnockoutData([]);
    }
  };

  // --- FUNGSI MEMBERSIHKAN SKOR (FITUR BARU) ---
  const handleClearScores = () => {
    if (window.confirm("Bersihkan semua skor? (Daftar tim dan jadwal akan tetap aman)")) {
      // 1. Bersihkan skor di Fase Grup
      const clearedSchedule = schedule.map(match => ({
        ...match,
        winner: null,
        winsA: 0,
        winsB: 0,
        parties: match.parties.map(party => ({
          ...party,
          winner: null,
          sets: [{ scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }]
        }))
      }));
      setSchedule(clearedSchedule);

      // 2. Bersihkan skor di Fase Gugur (jika ada)
      if (knockoutData.length > 0) {
        const clearedKnockout = knockoutData.map((round, rIndex) =>
          round.map(match => ({
            ...match,
            winner: null,
            winsA: 0,
            winsB: 0,
            // Hapus nama tim yang sudah terlanjur maju ke babak selanjutnya
            teamA: rIndex === 0 ? match.teamA : '?',
            teamB: rIndex === 0 ? match.teamB : '?',
            parties: match.parties.map(party => ({
              ...party,
              winner: null,
              sets: [{ scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }]
            }))
          }))
        );
        setKnockoutData(clearedKnockout);
      }
    }
  };

  // --- LOGIKA KLASEMEN OTOMATIS (DENGAN HEAD-TO-HEAD) ---
  const getStandings = () => {
    let standings = {};
    teams.forEach(t => {
      standings[t] = { team: t, group: tournamentType === 'group' ? `Grup ${groupAssignments[t]}` : 'Pool Utama', play: 0, win: 0, lose: 0, partyWin: 0, partyLose: 0, setWin: 0, setLose: 0, pointWin: 0, pointLose: 0, totalPoints: 0 };
    });

    schedule.forEach(match => {
      if (!match.winner) return;
      const tA = match.teamA; const tB = match.teamB;
      standings[tA].play += 1; standings[tB].play += 1;
      
      if (match.winner === tA) { standings[tA].win += 1; standings[tB].lose += 1; } 
      else if (match.winner === tB) { standings[tB].win += 1; standings[tA].lose += 1; }
      else if (match.winner === 'SERI') { standings[tA].lose += 1; standings[tB].lose += 1; } // W.O Ganda = Dua-duanya Kalah

      let matchPartyWinsA = 0; let matchPartyWinsB = 0;
      match.parties.forEach(party => {
        if (party.winner === tA) { standings[tA].partyWin += 1; standings[tB].partyLose += 1; matchPartyWinsA += 1; } 
        else if (party.winner === tB) { standings[tB].partyWin += 1; standings[tA].partyLose += 1; matchPartyWinsB += 1; }
        else if (party.winner === 'SERI') { standings[tA].partyLose += 1; standings[tB].partyLose += 1; }

        party.sets.forEach(set => {
          const a = parseInt(set.scoreA); const b = parseInt(set.scoreB);
          if (!isNaN(a) && !isNaN(b)) {
            if (a > b) { standings[tA].setWin += 1; standings[tB].setLose += 1; } 
            else if (b > a) { standings[tB].setWin += 1; standings[tA].setLose += 1; }
            
            standings[tA].pointWin += a; standings[tA].pointLose += b; 
            standings[tB].pointWin += b; standings[tB].pointLose += a;
          }
        });
      });

      if (eventCategory === 'team') {
        if (match.winner === tA) { standings[tA].totalPoints += (matchPartyWinsB === 1) ? 2 : 3; standings[tB].totalPoints += (matchPartyWinsB === 1) ? 1 : 0; } 
        else if (match.winner === tB) { standings[tB].totalPoints += (matchPartyWinsA === 1) ? 2 : 3; standings[tA].totalPoints += (matchPartyWinsA === 1) ? 1 : 0; }
        // Jika SERI, tidak ada yang dapat total point
      } else {
        if (match.winner === tA) standings[tA].totalPoints += 2; 
        else if (match.winner === tB) standings[tB].totalPoints += 2;
      }
    });

    const sortedTeams = Object.values(standings).sort((a, b) => {
      // 1. KRITERIA TOTAL POIN
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      
      // 2. KRITERIA HEAD-TO-HEAD
      const h2hMatch = schedule.find(m => 
        ((m.teamA === a.team && m.teamB === b.team) || (m.teamA === b.team && m.teamB === a.team)) && m.winner
      );
      if (h2hMatch && h2hMatch.winner !== 'SERI') {
        if (h2hMatch.winner === a.team) return -1;
        if (h2hMatch.winner === b.team) return 1;
      }

      // 3. KRITERIA LANJUTAN (Kemenangan, Partai, Set, Poin)
      if (b.win !== a.win) return b.win - a.win;
      if (eventCategory === 'team') {
        const aPartyDiff = a.partyWin - a.partyLose; const bPartyDiff = b.partyWin - b.partyLose;
        if (bPartyDiff !== aPartyDiff) return bPartyDiff - aPartyDiff;
      }
      const aSetDiff = a.setWin - a.setLose; const bSetDiff = b.setWin - b.setLose;
      if (bSetDiff !== aSetDiff) return bSetDiff - aSetDiff;
      return (b.pointWin - b.pointLose) - (a.pointWin - a.pointLose);
    });

    const groupedStandings = {};
    sortedTeams.forEach(stat => {
      if (!groupedStandings[stat.group]) groupedStandings[stat.group] = [];
      groupedStandings[stat.group].push(stat);
    });
    return groupedStandings;
  };

  // --- FUNGSI TRANSISI OTOMATIS (DARI FASE 1 KE FASE 2) ---
  const handleTransitionToPhase2Group = () => {
    const standings = getStandings();
    let qualifiers = [];
    Object.values(standings).forEach(groupTeams => {
      if (groupTeams[0]) qualifiers.push(groupTeams[0].team);
      if (groupTeams[1]) qualifiers.push(groupTeams[1].team);
    });

    if (qualifiers.length < 2) return alert("Tim tidak cukup untuk lanjut ke Fase 2!");
    
    if (window.confirm("Apakah Anda yakin ingin lanjut ke Grup Fase 2? Jadwal Fase 1 akan ditutup.")) {
        setTeams(qualifiers);
        setTournamentType('group');
        setNumGroups(2); // Otomatis dibagi 2 grup di fase 2
        setSchedule([]);
        setGroupAssignments({});
        setKnockoutData([]);
        alert("Tim terpilih telah dipindahkan ke Fase 2. Silakan atur pembagian grup silang dan tekan 'Buat Jadwal'.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- FUNGSI SISTEM GUGUR (KNOCKOUT BRACKET) ---
  const generateKnockout = (size) => {
    const standings = getStandings();
    let orderedTeams = [];
    
    if (tournamentType === 'group' && numGroups === 2 && size === 4) {
      const groupA = standings['Grup A'] || []; const groupB = standings['Grup B'] || [];
      if(groupA.length >= 2 && groupB.length >= 2) { orderedTeams = [groupA[0].team, groupB[1].team, groupB[0].team, groupA[1].team]; }
    } 
    
    if (orderedTeams.length !== size) {
      let allStats = []; Object.values(standings).forEach(group => allStats.push(...group));
      allStats.sort((a,b) => b.totalPoints - a.totalPoints || b.win - a.win);
      if (size === 4 && allStats.length >= 4) { orderedTeams = [allStats[0].team, allStats[3].team, allStats[1].team, allStats[2].team]; } 
      else if (size === 8 && allStats.length >= 8) { orderedTeams = [allStats[0].team, allStats[7].team, allStats[3].team, allStats[4].team, allStats[1].team, allStats[6].team, allStats[2].team, allStats[5].team]; } 
      else { orderedTeams = allStats.slice(0, size).map(s => s.team); }
    }

    if (orderedTeams.length < size) return alert(`Jumlah tim (${orderedTeams.length}) tidak cukup.`);

    const numRounds = Math.log2(size); let rounds = [];
    const numParties = eventCategory === 'team' ? 3 : 1; 
    
    // LABEL SPESIFIK DI FASE GUGUR
    const partyLabels = eventDiscipline === 'Mix' 
      ? mixDisciplines 
      : [`${eventDiscipline} 1`, `${eventDiscipline} 2`, `${eventDiscipline} 3`];

    for(let r = 0; r < numRounds; r++) {
       let matchesInRound = size / Math.pow(2, r + 1); let roundMatches = [];
       for(let m = 0; m < matchesInRound; m++) {
          let tA = '?'; let tB = '?';
          if (r === 0) { tA = orderedTeams[m * 2]; tB = orderedTeams[m * 2 + 1]; }
          let initialParties = [];
          for(let p = 0; p < numParties; p++) { initialParties.push({ id: `kp${p}`, label: eventCategory === 'team' ? partyLabels[p] : `Pertandingan ${eventDiscipline === 'Mix' ? 'Campuran' : eventDiscipline}`, sets: [{ scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }, { scoreA: '', scoreB: '' }], winner: null }); }
          let nextR = r + 1; let nextM = Math.floor(m / 2); let nextSlot = m % 2 === 0 ? 'teamA' : 'teamB';
          roundMatches.push({ id: `k_${r}_${m}`, roundIndex: r, matchIndex: m, title: r === numRounds - 1 ? 'BABAK FINAL' : r === numRounds - 2 ? 'SEMI FINAL' : 'PEREMPAT FINAL', teamA: tA, teamB: tB, parties: initialParties, winner: null, winsA: 0, winsB: 0, nextMatchRef: nextR < numRounds ? { r: nextR, m: nextM, slot: nextSlot } : null });
       }
       rounds.push(roundMatches);
    }
    setKnockoutData(rounds);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 300);
  };

  const handleKnockoutScoreChange = (rIndex, mIndex, pIndex, sIndex, side, newScore) => {
    if (newScore !== '' && (newScore < 0 || newScore > 17)) return;
    setKnockoutData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); 
      const match = newData[rIndex][mIndex]; const targetParty = match.parties[pIndex];
      targetParty.sets[sIndex][side] = newScore; targetParty.winner = calculatePartyWinner(targetParty.sets, match.teamA, match.teamB);
      
      let matchWinsA = 0; let matchWinsB = 0; let matchSeri = 0;
      match.parties.forEach(p => { 
         if (p.winner === match.teamA) matchWinsA++; 
         else if (p.winner === match.teamB) matchWinsB++; 
         else if (p.winner === 'SERI') matchSeri++;
      });
      
      const requiredWins = Math.ceil(match.parties.length / 2); let finalWinner = null;
      if (matchWinsA >= requiredWins) finalWinner = match.teamA; 
      else if (matchWinsB >= requiredWins) finalWinner = match.teamB;
      else if (matchSeri >= requiredWins) finalWinner = 'SERI';
      else if (matchWinsA + matchWinsB + matchSeri === match.parties.length) {
         if (matchWinsA > matchWinsB) finalWinner = match.teamA;
         else if (matchWinsB > matchWinsA) finalWinner = match.teamB;
         else finalWinner = 'SERI';
      }

      match.winner = finalWinner; match.winsA = matchWinsA; match.winsB = matchWinsB;
      // Jangan majukan ke babak selanjutnya jika W.O Ganda
      if (match.nextMatchRef && finalWinner && finalWinner !== 'SERI') { 
         const { r, m, slot } = match.nextMatchRef; newData[r][m][slot] = finalWinner; 
      } 
      else if (match.nextMatchRef) { 
         const { r, m, slot } = match.nextMatchRef; newData[r][m][slot] = '?'; 
      }
      return newData;
    });
  };

  const activeNumGroups = Number(numGroups) || 2;
  const groupLetters = Array.from({length: activeNumGroups}, (_, i) => String.fromCharCode(65 + i));

  // --- LOGIKA JUARA 3 BERSAMA (SEPAK TAKRAW) ---
  let jointThirdTeams = [];
  if (knockoutData.length > 0) {
    const semiFinalRound = knockoutData.find(r => r && r[0] && r[0].title === 'SEMI FINAL');
    if (semiFinalRound && semiFinalRound.length === 2) {
      const match1 = semiFinalRound[0];
      const match2 = semiFinalRound[1];
      if (match1.winner && match2.winner) {
         const loser1 = match1.winner === match1.teamA ? match1.teamB : match1.teamA;
         const loser2 = match2.winner === match2.teamA ? match2.teamB : match2.teamA;
         if (loser1 !== '?' && loser2 !== '?') {
             jointThirdTeams = [loser1, loser2];
         }
      }
    }
  }

  // --- KOMPONEN BENTO MATCH CARD ---
  const renderMatchCard = (match, isKnockout = false, index = null) => {
    const isTeamA_TBD = match.teamA === '?'; const isTeamB_TBD = match.teamB === '?';
    
    // LOGIKA FITUR LIVE: Cek apakah skor sudah mulai diisi tapi belum ada pemenang
    const hasStarted = !isTeamA_TBD && !isTeamB_TBD && match.parties.some(party => 
      party.sets.some(set => set.scoreA !== '' || set.scoreB !== '')
    );
    const isLive = hasStarted && !match.winner;

    return (
      <div key={match.id} className={`bg-white rounded-3xl shadow-sm border ${isLive && !isProjectorMode ? 'border-red-400 shadow-md ring-4 ring-red-50' : theme.border} overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md print:border-gray-300 print:shadow-none print:ring-0 ${isProjectorMode ? (isLive ? 'border-4 border-red-500 shadow-2xl' : 'border-none shadow-xl') : ''}`}>
        
        <div className={`p-4 text-center border-b ${isLive ? 'border-red-200' : theme.border} ${match.winner ? (match.winner === 'SERI' ? 'bg-gray-100 border-transparent print:bg-gray-100' : `${theme.accent} ${theme.accentText} border-transparent print:bg-gray-100`) : isLive ? 'bg-red-50/80 print:bg-white' : `bg-gray-50/50 print:bg-white`} ${isProjectorMode ? 'py-5' : ''} relative`}>
          
          {/* INDIKATOR LIVE (FITUR BARU) */}
          {isLive && (
             <div className="no-print absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
                <span className={`font-black text-red-700 uppercase tracking-widest ${isProjectorMode ? 'text-xs' : 'text-[10px]'}`}>LIVE</span>
             </div>
          )}

          {isKnockout ? ( <div className={`font-black tracking-widest uppercase ${isProjectorMode ? 'text-xl' : 'text-sm'} ${isLive ? 'text-red-800' : ''}`}>{match.title}</div> ) : (
            <div className="flex flex-col items-center">
               <span className={`font-black uppercase tracking-widest ${isLive ? 'text-red-800' : theme.textPrimary} ${isProjectorMode ? 'text-lg' : 'text-xs'}`}>{match.groupLabel}</span>
               <span className={`font-medium mt-1 ${isLive ? 'text-red-600 font-bold opacity-100' : 'opacity-70'} ${isProjectorMode ? 'text-base' : 'text-[10px]'}`}>MATCH #{match.id} &bull; {match.court} &bull; {match.time}</span>
               
               {/* TOMBOL PANAH GESER (Hanya tampil di mode Admin & Fase Grup) */}
               {!isProjectorMode && index !== null && (
                 <div className="no-print absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                    <button onClick={() => moveMatchSchedule(index, 'up')} disabled={index === 0} className={`p-1 rounded bg-white border border-gray-200 shadow-sm transition-all ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600 hover:scale-110'}`} title="Naikkan Jadwal (Main Lebih Cepat)"><IconArrowUp /></button>
                    <button onClick={() => moveMatchSchedule(index, 'down')} disabled={index === schedule.length - 1} className={`p-1 rounded bg-white border border-gray-200 shadow-sm transition-all ${index === schedule.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600 hover:scale-110'}`} title="Turunkan Jadwal (Tunda Main)"><IconArrowDown /></button>
                 </div>
               )}
            </div>
          )}
        </div>
        
        <div className={`flex justify-between items-center bg-white relative ${isProjectorMode ? 'p-8' : 'p-5'}`}>
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-gray-400 font-black rounded-xl z-0 print:border ${isProjectorMode ? 'text-base px-4 py-2' : 'text-[10px] px-3 py-1'}`}>VS</div>
          <div className={`w-2/5 flex flex-col items-center text-center z-10 ${match.winner === match.teamA ? 'scale-110 transition-transform' : ''}`}>
            {teamLogos[match.teamA] && !isTeamA_TBD ? ( <img src={teamLogos[match.teamA]} className={`${isProjectorMode ? 'w-24 h-24 border-4' : 'w-14 h-14 border-2'} rounded-2xl object-cover ${theme.border} shadow-sm mb-3`} alt="" /> ) : ( <div className={`${isProjectorMode ? 'w-24 h-24 rounded-3xl' : 'w-14 h-14 rounded-2xl'} bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-3`}><IconUsers /></div> )}
            <span className={`font-black line-clamp-2 ${isProjectorMode ? 'text-2xl' : 'text-sm'} ${isTeamA_TBD ? 'text-gray-400 italic' : match.winner === match.teamA ? theme.textPrimary : 'text-gray-700'}`}>{match.teamA}</span>
          </div>
          <div className={`w-2/5 flex flex-col items-center text-center z-10 ${match.winner === match.teamB ? 'scale-110 transition-transform' : ''}`}>
            {teamLogos[match.teamB] && !isTeamB_TBD ? ( <img src={teamLogos[match.teamB]} className={`${isProjectorMode ? 'w-24 h-24 border-4' : 'w-14 h-14 border-2'} rounded-2xl object-cover ${theme.border} shadow-sm mb-3`} alt="" /> ) : ( <div className={`${isProjectorMode ? 'w-24 h-24 rounded-3xl' : 'w-14 h-14 rounded-2xl'} bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-3`}><IconUsers /></div> )}
            <span className={`font-black line-clamp-2 ${isProjectorMode ? 'text-2xl' : 'text-sm'} ${isTeamB_TBD ? 'text-gray-400 italic' : match.winner === match.teamB ? theme.textPrimary : 'text-gray-700'}`}>{match.teamB}</span>
          </div>
        </div>

        <div className={`bg-gray-50/50 flex-1 flex flex-col gap-3 print:bg-white ${isProjectorMode ? 'p-8' : 'p-5'}`}>
          {(!isTeamA_TBD && !isTeamB_TBD) ? match.parties.map((party, pIndex) => (
            <div key={pIndex} className={`bg-white border ${theme.border} rounded-2xl relative shadow-sm ${isProjectorMode ? 'p-6' : 'p-3'}`}>
               {match.parties.length > 1 && ( <div className={`font-bold text-center text-gray-400 mb-3 uppercase tracking-widest border-b border-gray-100 pb-2 ${isProjectorMode ? 'text-sm' : 'text-[10px]'}`}> {party.label} {party.winner && <span className={`${party.winner === 'SERI' ? 'text-gray-400' : theme.textPrimary} ml-1`}>{party.winner === 'SERI' ? '(W.O Ganda)' : `(W: ${party.winner})`}</span>} </div> )}
               <div className="flex justify-center gap-4 sm:gap-8">
                 {[0, 1, 2].map((setIndex) => {
                    const scoreA = party.sets[setIndex].scoreA;
                    const scoreB = party.sets[setIndex].scoreB;
                    const isAWinner = scoreA !== '' && scoreB !== '' && Number(scoreA) > Number(scoreB);
                    const isBWinner = scoreA !== '' && scoreB !== '' && Number(scoreB) > Number(scoreA);

                    return (
                    <div key={setIndex} className="flex flex-col items-center">
                      <span className={`font-black text-gray-300 mb-2 ${isProjectorMode ? 'text-xs' : 'text-[9px]'}`}>SET {setIndex + 1}</span>
                      
                      {isProjectorMode ? (
                         <div className="flex items-center gap-4 text-3xl font-black">
                            <span className={isAWinner ? theme.textPrimary : 'text-gray-400'}>{scoreA !== '' ? scoreA : '-'}</span>
                            <span className="text-gray-200 text-xl">-</span>
                            <span className={isBWinner ? theme.textPrimary : 'text-gray-400'}>{scoreB !== '' ? scoreB : '-'}</span>
                         </div>
                      ) : (
                         <div className="flex items-center gap-1.5">
                           <input type="number" min="0" max="17" value={scoreA} onChange={(e) => { isKnockout ? handleKnockoutScoreChange(match.roundIndex, match.matchIndex, pIndex, setIndex, 'scoreA', e.target.value) : handleScoreChange(match.id, pIndex, setIndex, 'scoreA', e.target.value) }} className={`w-10 h-10 text-center text-sm font-black border-2 rounded-xl focus:ring-4 focus:outline-none transition-colors print:bg-transparent print:border-gray-300 print:appearance-none hide-arrows ${isAWinner ? `${theme.primary} text-white border-transparent` : 'border-gray-200 text-gray-700 focus:border-gray-400 focus:ring-gray-100'}`} />
                           <input type="number" min="0" max="17" value={scoreB} onChange={(e) => { isKnockout ? handleKnockoutScoreChange(match.roundIndex, match.matchIndex, pIndex, setIndex, 'scoreB', e.target.value) : handleScoreChange(match.id, pIndex, setIndex, 'scoreB', e.target.value) }} className={`w-10 h-10 text-center text-sm font-black border-2 rounded-xl focus:ring-4 focus:outline-none transition-colors print:bg-transparent print:border-gray-300 print:appearance-none hide-arrows ${isBWinner ? `${theme.primary} text-white border-transparent` : 'border-gray-200 text-gray-700 focus:border-gray-400 focus:ring-gray-100'}`} />
                         </div>
                      )}
                    </div>
                 )})}
               </div>
            </div>
          )) : (
            <div className={`h-full flex items-center justify-center text-gray-400 font-medium text-center py-8 ${isProjectorMode ? 'text-xl' : 'text-sm'}`}>Menunggu penantang...</div>
          )}
        </div>
        {match.winner && ( <div className={`${match.winner === 'SERI' ? 'bg-gray-500 text-white' : `${theme.primary} text-white`} p-3 text-center font-black flex items-center justify-center gap-2 print:border-t print:bg-gray-100 print:text-black ${isProjectorMode ? 'text-2xl py-5' : 'text-base'}`}> {match.winner === 'SERI' ? <><IconX /> DOUBLE WALK-OVER</> : <><IconTrophy /> WINNER: {match.winner}</>} </div> )}
      </div>
    );
  };

  // --- TAMPILAN UTAMA (BENTO RENDER) ---
  return (
    <div className={`min-h-screen ${theme.bgApp} font-sans text-gray-800 pb-20 transition-all duration-500 ${isProjectorMode ? 'px-2 md:px-8' : ''}`}>
      
      <style>
        {`
        /* Sembunyikan tanda panah (spinner) pada input number untuk desain yang lebih bersih */
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .hide-arrows {
          -moz-appearance: textfield;
        }
        
        @media print { @page { size: landscape; margin: 10mm; } body { background-color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none !important; } .print-break-inside-avoid { page-break-inside: avoid; } .print-border { border: 1px solid #e5e7eb !important; } input[type="number"] { -moz-appearance: textfield; } input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; } }
        `}
      </style>

      {/* FLOAT BUTTON: PROJECTOR EXIT */}
      {isProjectorMode && (
        <button onClick={handleExitProjectorMode} className="no-print fixed bottom-8 right-8 bg-white text-red-600 px-6 py-4 rounded-full shadow-2xl font-black z-50 flex items-center gap-3 animate-bounce border-4 border-red-100 hover:bg-red-50 transition-all">
          <IconX /> EXIT PRESENTATION
        </button>
      )}

      {/* TOP NAVIGATION (BENTO STYLE) */}
      {!isProjectorMode && (
        <div className="no-print sticky top-0 z-40 p-4 backdrop-blur-md bg-white/60 border-b border-white/20 shadow-sm flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className={`${theme.primary} text-white p-2 rounded-xl shadow-md`}><IconTrophy /></div>
              <div className="hidden sm:block">
                 <div className="font-black tracking-widest text-gray-800 leading-none">SEPAK TAKRAW<span className={theme.textPrimary}> Tournament Management System</span></div>
                 <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${theme.textPrimary} opacity-70`}>by fiqhipondaa9</div>
              </div>
           </div>
           
           <div className="flex items-center gap-2 sm:gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
              {/* THEME SWITCHER */}
              <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100 mr-2">
                 {Object.keys(themes).map(t => (
                   <button key={t} onClick={() => setActiveTheme(t)} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${activeTheme === t ? 'bg-white shadow-sm scale-110' : 'hover:bg-gray-200'}`} title={themes[t].name}>
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${themes[t].primary}`}></div>
                   </button>
                 ))}
              </div>
              <label className={`cursor-pointer ${theme.soft} ${theme.textPrimary} hover:bg-gray-100 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-bold text-xs sm:text-sm`}>
                <IconFolder /> <span className="hidden md:inline">Open</span>
                <input type="file" accept=".json" hidden onChange={handleOpenFile} />
              </label>
              <button onClick={handleSaveFile} className={`${theme.primary} ${theme.primaryHover} text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-colors shadow-md text-xs sm:text-sm`}>
                <IconSave /> <span className="hidden md:inline">Save</span>
              </button>
           </div>
        </div>
      )}

      {/* MAIN CAPTURE AREA */}
      <div id="capture-area" className={`${isProjectorMode ? 'bg-transparent' : 'bg-transparent'} min-h-screen pb-10`}>
        
        <main className={`${isProjectorMode ? 'w-full max-w-full mt-4' : 'max-w-7xl mx-auto mt-6'} px-4 space-y-6 transition-all`}>
          
          {/* BENTO: EXPORT & TOOLS */}
          {!isProjectorMode && (schedule.length > 0 || knockoutData.length > 0) && (
            <div className="no-print bg-white rounded-3xl shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-100">
              <div className="flex items-center gap-3">
                 <div className={`p-3 rounded-2xl ${theme.soft} ${theme.textPrimary}`}><IconTable /></div>
                 <div><h3 className="font-black text-gray-800">Tournament Dashboard</h3><p className="text-xs text-gray-500 font-medium">Export reports or enter live mode.</p></div>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <button onClick={handleExportExcel} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-black transition-colors"><IconFileSpreadsheet /> CSV</button>
                <button onClick={handleExportPNG} disabled={isExportingPng} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-black transition-colors"><IconDownloadImg /> {isExportingPng ? '...' : 'PNG'}</button>
                <button onClick={handleExportPDF} className="bg-gray-800 text-white hover:bg-black px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-black transition-colors shadow-md"><IconPrinter /> PRINT</button>
                <button onClick={handleEnterProjectorMode} className={`${theme.accent} ${theme.accentHover} ${theme.accentText} px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-black transition-colors shadow-md ml-2`}><IconMonitor /> LIVE MODE</button>
              </div>
            </div>
          )}

          {/* BENTO: BRANDING & HEADER */}
          <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden print-break-inside-avoid print:shadow-none print:border-none print:p-0 ${isProjectorMode ? 'p-10 md:p-16 mb-8 shadow-xl' : 'p-8'}`}>
            <div className={`absolute top-0 left-0 w-full h-3 ${theme.gradient || theme.primary}`}></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Logo Sponsors Area */}
              <div className={`flex justify-center flex-wrap gap-4 min-h-[5rem] ${isProjectorMode ? 'mb-10' : 'mb-8'}`}>
                {sponsorLogos.map((logo, index) => (
                  <div key={index} className={`relative group border border-gray-100 bg-white rounded-3xl shadow-sm flex items-center justify-center p-3 print:border-none print:shadow-none ${isProjectorMode ? 'w-36 h-36 md:w-48 md:h-48' : 'w-24 h-24 md:w-32 md:h-32'}`}>
                    <img src={logo} alt="Sponsor" className="max-w-full max-h-full object-contain drop-shadow-sm" />
                    {!isProjectorMode && <button onClick={() => handleRemoveSponsor(index)} className="no-print absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"><IconTrash /></button>}
                  </div>
                ))}
                {!isProjectorMode && (
                  <label className="no-print w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-gray-200 bg-gray-50 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group flex-shrink-0">
                    <IconPlus className="text-gray-400 group-hover:text-gray-600 mb-1" />
                    <span className="text-[10px] md:text-xs font-bold text-gray-400 group-hover:text-gray-600 text-center px-2">Sponsor</span>
                    <input type="file" accept="image/*" hidden onChange={handleAddSponsor} />
                  </label>
                )}
              </div>

              {/* Title Inputs */}
              <div className={`flex flex-col gap-2 max-w-5xl mx-auto w-full`}>
                <input value={championshipTitles[0]} onChange={(e) => handleUpdateTitle(0, e.target.value)} readOnly={isProjectorMode} className={`font-black text-gray-900 text-center uppercase focus:outline-none focus:bg-gray-50 rounded-2xl bg-transparent transition-colors placeholder:text-gray-300 w-full px-4 print:p-0 ${isProjectorMode ? 'text-5xl md:text-7xl cursor-default tracking-tight' : 'text-3xl md:text-5xl'}`} placeholder="EDIT NAMA KEJUARAAN" />
                <input value={championshipTitles[1]} onChange={(e) => handleUpdateTitle(1, e.target.value)} readOnly={isProjectorMode} className={`font-black ${theme.textPrimary} text-center uppercase focus:outline-none focus:bg-gray-50 rounded-xl bg-transparent transition-colors placeholder:text-gray-300 w-full px-4 print:p-0 ${isProjectorMode ? 'text-2xl md:text-4xl mt-3 cursor-default' : 'text-xl md:text-2xl mt-1'}`} placeholder="EDIT KETERANGAN DAN LAIN-LAIN" />
                <input value={championshipTitles[2]} onChange={(e) => handleUpdateTitle(2, e.target.value)} readOnly={isProjectorMode} className={`font-bold text-gray-400 text-center uppercase focus:outline-none focus:bg-gray-50 rounded-xl bg-transparent transition-colors placeholder:text-gray-200 w-full px-4 print:p-0 ${isProjectorMode ? 'text-xl md:text-2xl mt-3 cursor-default' : 'text-sm md:text-base mt-1'}`} placeholder="EDIT LOKASI & TANGGAL PELAKSANAAN" />
              </div>
            </div>
          </div>

          {/* BENTO GRID: SETUP PHASE */}
          {!isProjectorMode && schedule.length === 0 && knockoutData.length === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
              
              {/* CARD 1: TEAM REGISTRATION (Wider) */}
              <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                   <div className={`p-2.5 rounded-xl ${theme.soft} ${theme.textPrimary}`}><IconUsers /></div>
                   <h2 className="text-xl font-black text-gray-800">Pendaftaran Peserta</h2>
                </div>
                
                <form onSubmit={handleAddTeam} className="flex gap-3 mb-6">
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ketik nama tim baru..." className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-gray-300 focus:bg-white transition-all font-bold text-gray-700" />
                  <button type="submit" className={`${theme.primary} ${theme.primaryHover} text-white px-6 py-4 rounded-2xl font-black transition-all shadow-md hover:shadow-lg`}><IconPlus /></button>
                </form>

                <div className="flex justify-between items-end mb-4 px-1">
                   <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Daftar Tim ({teams.length})</h3>
                </div>
                
                <div className="flex flex-col gap-3 overflow-y-auto pr-2 pb-2 flex-1">
                  {teams.length === 0 && <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 font-bold text-sm">Belum ada tim didaftarkan.</div>}
                  {teams.map((team) => (
                    <div key={team} className="bg-white p-3 pr-4 rounded-2xl flex items-center justify-between border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <label className={`cursor-pointer w-12 h-12 rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden hover:border-gray-300 group relative`}>
                          {teamLogos[team] ? <img src={teamLogos[team]} className="w-full h-full object-cover" alt="Logo" /> : <IconImage className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />}
                          <input type="file" accept="image/*" hidden onChange={(e) => handleTeamLogoUpload(team, e)} />
                        </label>
                        <span className="font-black text-gray-800 text-lg">{team}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {tournamentType === 'group' && (
                          <select value={groupAssignments[team] || ''} onChange={(e) => setGroupAssignments({...groupAssignments, [team]: e.target.value})} className="bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-3 py-2 outline-none cursor-pointer focus:bg-white focus:border-gray-300 transition-colors">
                            <option value="" disabled>Pilih Grup</option>
                            {groupLetters.map(g => <option key={g} value={g}>Grup {g}</option>)}
                          </select>
                        )}
                        <button onClick={() => handleRemoveTeam(team)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors" title="Hapus"><IconTrash /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN BENTO MODULES */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* CARD 2: EVENT CATEGORY & DISCIPLINE */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Kategori Nomor Event</h2>
                  <div className="flex flex-col gap-3 mb-6">
                    <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${eventCategory === 'single' ? `${theme.border} ${theme.soft}` : 'border-gray-100 hover:border-gray-200'}`}>
                      <input type="radio" value="single" checked={eventCategory === 'single'} onChange={() => { setEventCategory('single'); if(eventDiscipline === 'Mix') setEventDiscipline('Regu'); }} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${eventCategory === 'single' ? `border-transparent ${theme.primary}` : 'border-gray-300'}`}>
                         {eventCategory === 'single' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div>
                         <div className="font-black text-gray-800 text-sm leading-tight">Double Event / Regu Event / Quadrant Event</div>
                      </div>
                    </label>
                    <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${eventCategory === 'team' ? `${theme.border} ${theme.soft}` : 'border-gray-100 hover:border-gray-200'}`}>
                      <input type="radio" value="team" checked={eventCategory === 'team'} onChange={() => setEventCategory('team')} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${eventCategory === 'team' ? `border-transparent ${theme.primary}` : 'border-gray-300'}`}>
                         {eventCategory === 'team' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div>
                         <div className="font-black text-gray-800 text-sm leading-tight">Double Event Team / Regu Event Team / Quadrant Event Team</div>
                      </div>
                    </label>
                  </div>

                  <h2 className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Disiplin Spesifik (Label Papan Skor)</h2>
                  <div className="flex flex-wrap bg-gray-50 p-1 rounded-2xl border border-gray-100 gap-1">
                    <button onClick={() => setEventDiscipline('Regu')} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${eventDiscipline === 'Regu' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>Regu</button>
                    <button onClick={() => setEventDiscipline('Double')} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${eventDiscipline === 'Double' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>Double</button>
                    <button onClick={() => setEventDiscipline('Quadrant')} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${eventDiscipline === 'Quadrant' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>Quadrant</button>
                    {eventCategory === 'team' && (
                      <button onClick={() => setEventDiscipline('Mix')} className={`flex-1 py-3 px-2 text-xs font-black rounded-xl transition-all ${eventDiscipline === 'Mix' ? `${theme.primary} shadow-sm text-white` : 'text-gray-400 hover:text-gray-600'}`}>Campuran (Mix)</button>
                    )}
                  </div>
                  
                  {/* PANEL DROPDOWN KHUSUS MIX */}
                  {eventCategory === 'team' && eventDiscipline === 'Mix' && (
                    <div className={`mt-4 p-4 rounded-2xl border ${theme.border} ${theme.soft} flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200`}>
                       <div className="flex flex-col gap-1">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${theme.textPrimary} opacity-70 px-1`}>Format Partai 1</span>
                          <select value={mixDisciplines[0]} onChange={(e) => setMixDisciplines([e.target.value, mixDisciplines[1], mixDisciplines[2]])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 outline-none focus:border-gray-400 shadow-sm cursor-pointer">
                            <option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option>
                          </select>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${theme.textPrimary} opacity-70 px-1`}>Format Partai 2</span>
                          <select value={mixDisciplines[1]} onChange={(e) => setMixDisciplines([mixDisciplines[0], e.target.value, mixDisciplines[2]])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 outline-none focus:border-gray-400 shadow-sm cursor-pointer">
                            <option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option>
                          </select>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${theme.textPrimary} opacity-70 px-1`}>Format Partai 3</span>
                          <select value={mixDisciplines[2]} onChange={(e) => setMixDisciplines([mixDisciplines[0], mixDisciplines[1], e.target.value])} className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 outline-none focus:border-gray-400 shadow-sm cursor-pointer">
                            <option value="Double">Double</option><option value="Regu">Regu</option><option value="Quadrant">Quadrant</option>
                          </select>
                       </div>
                    </div>
                  )}
                </div>

                {/* CARD 3: TOURNAMENT SYSTEM & COURTS */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
                  <h2 className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Sistem & Lapangan</h2>
                  
                  {/* Courts */}
                  <div className="mb-6">
                    <form onSubmit={handleAddCourt} className="flex gap-2 mb-3">
                      <input type="text" value={courtInputValue} onChange={(e) => setCourtInputValue(e.target.value)} placeholder="Tambah lapangan (misal: Lap 2)" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white transition-all text-xs font-bold" />
                      <button type="submit" className="bg-gray-800 hover:bg-black text-white px-4 py-3 rounded-xl font-bold transition-colors"><IconPlus /></button>
                    </form>
                    <div className="flex flex-wrap gap-2">
                      {courts.map((court, index) => (
                        <div key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 border border-gray-200">
                          {court}
                          {courts.length > 1 && <button type="button" onClick={() => handleRemoveCourt(court)} className="text-gray-400 hover:text-red-500"><IconTrash /></button>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System */}
                  <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 mb-4">
                    <button onClick={() => setTournamentType('group')} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${tournamentType === 'group' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>Grup</button>
                    <button onClick={() => setTournamentType('half-robin')} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${tournamentType === 'half-robin' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>Satu Pool</button>
                    <button onClick={() => setTournamentType('knockout')} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${tournamentType === 'knockout' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>Sistem Gugur</button>
                  </div>

                  {tournamentType === 'group' && (
                    <div className={`p-4 rounded-2xl border ${theme.border} ${theme.soft} flex justify-between items-center mb-4`}>
                       <div className="font-black text-gray-700 text-xs uppercase tracking-wider">Jumlah Grup</div>
                       <div className="flex items-center gap-2">
                         <input type="number" min="2" max="26" value={numGroups} onChange={handleNumGroupsChange} onBlur={() => !numGroups && setNumGroups(2)} className="w-12 h-10 text-center font-black bg-white border border-gray-200 rounded-xl outline-none focus:border-gray-400" />
                         <button onClick={handleAutoAssign} className="bg-white border border-gray-200 text-gray-700 font-black text-[10px] px-3 h-10 rounded-xl hover:bg-gray-50 transition-colors uppercase tracking-widest shadow-sm">Susun</button>
                       </div>
                    </div>
                  )}

                  {/* GENERATE BUTTON */}
                  <div className="mt-auto pt-4">
                  <button onClick={tournamentType === 'knockout' ? generateDirectKnockout : generateSchedule} disabled={teams.length < 2} className={`w-full ${theme.accent} ${theme.accentHover} ${theme.accentText} disabled:bg-gray-100 disabled:text-gray-300 font-black py-5 rounded-2xl shadow-md transition-all flex justify-center items-center gap-3 text-lg uppercase tracking-wider`}>
                      <IconCalendar /> {teams.length < 2 ? "Min. 2 Tim" : "Buat Jadwal"}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* BENTO GRID: TOURNAMENT ACTIVE PHASE (Group Stage / Satu Pool) */}
          {schedule.length > 0 && knockoutData.length === 0 && (
            <div className={`space-y-6 animate-in fade-in duration-500 print:space-y-4 ${isProjectorMode ? 'space-y-10' : ''}`}>
              
              {/* CARD: STANDINGS */}
              <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden print-break-inside-avoid print-border ${isProjectorMode ? 'shadow-2xl border-none' : ''}`}>
                <div className={`flex justify-between items-center border-b border-gray-100 print:bg-gray-200 print:text-black ${isProjectorMode ? 'p-8 bg-gray-50' : 'p-6 bg-white'}`}>
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-2xl ${theme.soft} ${theme.textPrimary}`}><IconTable /></div>
                     <h2 className={`font-black text-gray-800 tracking-tight print:text-black ${isProjectorMode ? 'text-4xl' : 'text-xl'}`}>Klasemen Grup</h2>
                  </div>
                  {!isProjectorMode && (
                    <div className="no-print flex items-center gap-2">
                       <button onClick={handleCopyWhatsApp} className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-xl transition-colors font-black uppercase tracking-widest border border-green-200 flex items-center gap-2 shadow-sm" title="Salin untuk WhatsApp">
                         <IconCopy /> Salin WA
                       </button>
                       <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-gray-200 hidden sm:block">Auto Update</div>
                    </div>
                  )}
                  {isProjectorMode && <div className={`${theme.accent} ${theme.accentText} px-6 py-3 rounded-2xl font-black text-sm tracking-widest uppercase shadow-sm flex items-center gap-2`}><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> LIVE SCORE</div>}
                </div>
                
                <div className={`grid grid-cols-1 lg:grid-cols-2 print:gap-4 print:p-2 ${isProjectorMode ? 'p-8 gap-8 bg-white' : 'p-6 gap-6 bg-gray-50/50'}`}>
                  {Object.entries(getStandings()).map(([groupName, groupTeams]) => (
                    <div key={groupName} className="bg-white border border-gray-100 rounded-3xl overflow-hidden print-break-inside-avoid shadow-sm flex flex-col">
                      <div className={`font-black uppercase tracking-widest text-center border-b border-gray-100 print:bg-gray-100 ${isProjectorMode ? 'px-6 py-5 text-2xl text-gray-800 bg-gray-50' : 'px-4 py-4 text-sm text-gray-400'}`}>{groupName}</div>
                      <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left whitespace-nowrap">
                          <thead>
                            <tr className={`text-gray-400 bg-white border-b border-gray-50 ${isProjectorMode ? 'text-sm uppercase tracking-widest' : 'text-[10px] uppercase tracking-widest'}`}>
                              <th className="px-5 py-4 font-black">#</th>
                              <th className="px-4 py-4 font-black">Tim</th>
                              <th className="px-2 py-4 font-black text-center" title="Main">P</th>
                              <th className="px-2 py-4 font-black text-center" title="Menang">W</th>
                              <th className="px-2 py-4 font-black text-center" title="Kalah">L</th>
                              {eventCategory === 'team' && <th className="px-2 py-4 font-black text-center bg-gray-50" title="Partai Menang - Kalah">Prt</th>}
                              <th className="px-2 py-4 font-black text-center" title="Set Menang - Kalah">Set</th>
                              <th className="px-2 py-4 font-black text-center" title="Angka Memasukkan - Kemasukan">Pts</th>
                              <th className={`px-4 py-4 font-black text-center ${theme.soft} ${theme.textPrimary}`} title="Total Poin Klasemen">SCORE</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {groupTeams.map((stat, index) => (
                              <tr key={stat.team} className={`${index === 0 ? `${theme.soft} bg-opacity-40` : "hover:bg-gray-50"} ${isProjectorMode ? 'text-2xl' : 'text-sm'} transition-colors`}>
                                <td className={`px-5 py-4 font-black ${index === 0 ? theme.textPrimary : 'text-gray-300'}`}>{index + 1}</td>
                                <td className="px-4 py-4 font-black text-gray-800">
                                  <div className="flex items-center gap-3">
                                    {teamLogos[stat.team] && <img src={teamLogos[stat.team]} className={`${isProjectorMode ? 'w-12 h-12' : 'w-8 h-8'} rounded-xl object-cover border border-gray-100 bg-white shadow-sm`} alt="" />}
                                    {stat.team}
                                  </div>
                                </td>
                                <td className="px-2 py-4 text-center font-bold text-gray-500">{stat.play}</td>
                                <td className="px-2 py-4 text-center font-black text-gray-700">{stat.win}</td>
                                <td className="px-2 py-4 text-center font-black text-gray-400">{stat.lose}</td>
                                {eventCategory === 'team' && <td className={`px-2 py-4 text-center font-bold text-gray-500 bg-gray-50/50 ${isProjectorMode ? 'text-xl' : 'text-xs'}`}>{stat.partyWin}-{stat.partyLose}</td>}
                                <td className={`px-2 py-4 text-center font-bold text-gray-500 ${isProjectorMode ? 'text-xl' : 'text-xs'}`}>{stat.setWin}-{stat.setLose}</td>
                                <td className={`px-2 py-4 text-center font-bold text-gray-500 ${isProjectorMode ? 'text-xl' : 'text-xs'}`}>{stat.pointWin}-{stat.pointLose}</td>
                                <td className={`px-4 py-4 text-center font-black ${index === 0 ? theme.primary : 'bg-gray-100'} ${index === 0 ? 'text-white' : 'text-gray-800'} ${isProjectorMode ? 'text-4xl' : 'text-lg'} rounded-l-2xl shadow-sm my-1`}>{stat.totalPoints}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD: SCHEDULES */}
              <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden print-border ${isProjectorMode ? 'shadow-2xl border-none' : ''}`}>
                <div className={`flex justify-between items-center border-b border-gray-100 print:bg-gray-200 print:text-black ${isProjectorMode ? 'p-8 bg-gray-50' : 'p-6 bg-white'}`}>
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-2xl ${theme.soft} ${theme.textPrimary}`}><IconCalendar /></div>
                     <h2 className={`font-black text-gray-800 tracking-tight print:text-black ${isProjectorMode ? 'text-4xl' : 'text-xl'}`}>Jadwal Pertandingan</h2>
                  </div>
                  {!isProjectorMode && (
                    <div className="no-print flex items-center gap-2">
                       <button onClick={handleClearScores} className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2.5 rounded-xl transition-colors font-black uppercase tracking-widest border border-amber-200">Bersihkan Skor</button>
                       <button onClick={handleReset} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl transition-colors font-black uppercase tracking-widest border border-red-200">Reset Ulang</button>
                    </div>
                  )}
                </div>
                <div className={`grid grid-cols-1 xl:grid-cols-2 bg-gray-50/50 print:bg-white print:p-2 print:gap-4 ${isProjectorMode ? 'p-8 gap-8' : 'p-6 gap-6'}`}>
                  {schedule.map((match, index) => renderMatchCard(match, false, index))}
                </div>
              </div>

              {/* KNOCKOUT TRANSITION BTN (Otomatis muncul jika isPhase1Finished) */}
              {!isProjectorMode && (
                <div className="no-print bg-gray-900 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-gray-800 relative overflow-hidden mt-8">
                   <div className="absolute -top-10 -right-10 opacity-5 text-gray-100"><svg className="w-64 h-64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18"/><path d="M3 12h5"/><path d="M8 7v10"/><path d="M8 7h5"/><path d="M8 17h5"/><path d="M13 12h5"/><path d="M18 7v10"/><path d="M18 12h3"/></svg></div>
                   
                   <div className="relative z-10">
                     <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Menuju Babak Selanjutnya</h2>
                     
                     {isPhase1Finished ? (
                       <>
                         <p className="text-emerald-400 mb-10 max-w-xl mx-auto font-medium">✨ Fase 1 telah selesai! Silakan pilih format untuk melanjutkan turnamen:</p>
                         <div className="flex flex-wrap justify-center gap-4">
                            <button onClick={handleTransitionToPhase2Group} className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-md transition-all border border-blue-500">Lanjut Grup Fase 2</button>
                            <button onClick={() => generateKnockout(8)} className="bg-gray-800 hover:bg-gray-700 text-white font-black py-4 px-8 rounded-2xl shadow-md transition-all border border-gray-700">Gugur (Top 8)</button>
                            <button onClick={() => generateKnockout(4)} className={`${theme.primary} ${theme.primaryHover} text-white font-black py-4 px-8 rounded-2xl shadow-xl transition-all scale-105`}>Gugur (Top 4)</button>
                            <button onClick={() => generateKnockout(2)} className="bg-gray-800 hover:bg-gray-700 text-white font-black py-4 px-8 rounded-2xl shadow-md transition-all border border-gray-700">Gugur (Top 2)</button>
                         </div>
                       </>
                     ) : (
                       <>
                         <p className="text-gray-400 mb-10 max-w-xl mx-auto font-medium">Harap lengkapi semua skor pertandingan di Fase Grup terlebih dahulu untuk membuka kunci babak selanjutnya.</p>
                         <div className="flex justify-center">
                            <div className="bg-gray-800 text-gray-500 font-black py-4 px-8 rounded-2xl border border-gray-700 cursor-not-allowed">Menunggu Hasil...</div>
                         </div>
                       </>
                     )}
                   </div>
                </div>
              )}
            </div>
          )}

          {/* TAMPILAN FASE SISTEM GUGUR */}
          {knockoutData.length > 0 && (
            <div className={`space-y-8 animate-in fade-in duration-500 ${isProjectorMode ? 'space-y-12' : ''}`}>
              <div className={`text-center bg-white rounded-3xl shadow-sm border border-gray-100 print:border-none print:shadow-none print:p-2 ${isProjectorMode ? 'p-12 shadow-2xl border-none' : 'p-8'}`}>
                 <h2 className={`font-black text-gray-900 flex items-center justify-center gap-4 ${isProjectorMode ? 'text-5xl tracking-tight' : 'text-3xl'}`}>
                   <div className={`p-3 rounded-2xl ${theme.primary} text-white`}><IconTrophy /></div>
                   Bagan Turnamen Utama
                 </h2>
                 
                 {/* TOMBOL BATAL & RESET UNTUK SISTEM GUGUR */}
                 {!isProjectorMode && (
                   <div className="no-print mt-6 flex justify-center gap-3">
                      {tournamentType === 'knockout' && <button onClick={handleClearScores} className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2.5 rounded-xl font-bold uppercase tracking-widest border border-amber-200 shadow-sm">Bersihkan Skor</button>}
                      {tournamentType === 'knockout' && <button onClick={handleReset} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl font-bold uppercase tracking-widest border border-red-200 shadow-sm">Reset Ulang</button>}
                      {tournamentType !== 'knockout' && <button onClick={() => setKnockoutData([])} className="text-xs text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-xl font-bold uppercase tracking-widest transition-colors">Batal & Kembali</button>}
                   </div>
                 )}
              </div>

              {knockoutData.map((round, rIndex) => (
                <div key={rIndex} className={`bg-gray-50/50 rounded-3xl border border-gray-200 print-break-inside-avoid print:bg-white print:border-none print:p-0 ${isProjectorMode ? 'p-12 shadow-inner' : 'p-8 shadow-sm'}`}>
                   <h3 className={`font-black text-center ${theme.textPrimary} mb-10 uppercase tracking-widest ${theme.soft} w-fit mx-auto rounded-2xl shadow-sm print:bg-gray-200 print:text-black border ${theme.border} ${isProjectorMode ? 'text-2xl px-10 py-4' : 'text-sm px-6 py-3'}`}>
                     {round[0].title}
                   </h3>
                   <div className={`flex flex-wrap justify-center print:gap-4 ${isProjectorMode ? 'gap-10' : 'gap-6'}`}>
                     {round.map(match => (
                       <div key={match.id} className={`w-full ${isProjectorMode ? 'lg:w-[48%] xl:w-[46%]' : 'lg:w-[48%] xl:w-[45%]'}`}>
                         {renderMatchCard(match, true)}
                       </div>
                     ))}
                   </div>
                </div>
              ))}

              {/* PANEL JUARA 3 BERSAMA */}
              {jointThirdTeams.length === 2 && (
                <div className={`bg-amber-50/50 rounded-3xl border border-amber-200 print-break-inside-avoid print:bg-white print:border-none print:p-0 ${isProjectorMode ? 'p-12 shadow-inner' : 'p-8 shadow-sm'}`}>
                   <h3 className={`font-black text-center text-amber-800 mb-10 uppercase tracking-widest bg-amber-200 w-fit mx-auto rounded-2xl shadow-sm print:bg-gray-200 print:text-black border border-amber-300 ${isProjectorMode ? 'text-2xl px-10 py-4' : 'text-sm px-6 py-3'}`}>
                     JUARA 3 BERSAMA
                   </h3>
                   <div className={`flex flex-wrap justify-center print:gap-4 ${isProjectorMode ? 'gap-10' : 'gap-6'}`}>
                      {jointThirdTeams.map((team, idx) => (
                         <div key={idx} className={`w-full sm:w-[48%] xl:w-[45%] bg-white rounded-3xl shadow-sm border border-amber-200 overflow-hidden flex flex-col items-center justify-center ${isProjectorMode ? 'p-10' : 'p-6'}`}>
                            {teamLogos[team] ? (
                               <img src={teamLogos[team]} className={`${isProjectorMode ? 'w-32 h-32 border-4' : 'w-20 h-20 border-2'} rounded-2xl object-cover border-amber-200 shadow-sm mb-4`} alt="" />
                            ) : (
                               <div className={`${isProjectorMode ? 'w-32 h-32 rounded-3xl' : 'w-20 h-20 rounded-2xl'} bg-amber-50 border-2 border-amber-100 flex items-center justify-center mb-4 text-amber-500`}><IconTrophy /></div>
                            )}
                            <span className={`font-black text-center ${isProjectorMode ? 'text-4xl' : 'text-2xl'} text-amber-900`}>{team}</span>
                            <div className={`mt-4 bg-amber-500 text-white px-4 py-1.5 rounded-full font-bold ${isProjectorMode ? 'text-sm' : 'text-xs'} uppercase tracking-widest shadow-sm`}>Medali Perunggu</div>
                         </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          )}

          {/* SIGNATURE FOOTER */}
          <div className="text-center mt-16 pb-8 print:mt-10 print:pb-4">
            <p className="font-black text-sm tracking-widest uppercase text-gray-400">
              Sepak Takraw Tournament Management System <span className={`mx-2 ${theme.textPrimary}`}>&bull;</span> by <span className={theme.textPrimary}>fiqhipondaa9</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}