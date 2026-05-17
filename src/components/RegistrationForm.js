// src/components/RegistrationForm.js
import React from 'react';
import * as Icons from '../constants/icons';

/**
 * Komponen RegistrationForm menangani antarmuka pengaturan awal turnamen.
 * Termasuk pendaftaran tim, alokasi grup, pemilihan format event, dan sistem pertandingan.
 */
export const RegistrationForm = ({
  theme,
  teams,
  setTeams,
  inputValue,
  setInputValue,
  teamLogos,
  handleTeamLogoUpload,
  groupAssignments,
  setGroupAssignments,
  numGroups,
  handleRemoveTeam,
  selectedEventFormat,
  setSelectedEventFormat,
  mixDisciplines,
  setMixDisciplines,
  courtInputValue,
  setCourtInputValue,
  handleAddCourt,
  courts,
  handleRemoveCourt,
  tournamentType,
  setTournamentType,
  roundRobinType,
  setRoundRobinType,
  handleAutoAssign,
  onStartTournament // Fungsi yang akan dieksekusi saat tombol "Mulai Turnamen" diklik
}) => {
  
  // Fungsi untuk menangani submit form pendaftaran tim baru
  const handleAddTeamSubmit = (e) => {
    e.preventDefault();
    const t = inputValue.trim();
    if (t && !teams.includes(t)) {
      setTeams([...teams, t]);
      setInputValue('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
      {/* KOLOM KIRI: Registrasi Tim */}
      <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2.5 rounded-xl ${theme.soft} ${theme.textPrimary}`}>
            <Icons.IconUsers />
          </div>
          <h2 className="text-xl font-black text-gray-800">Registrasi Tim</h2>
        </div>
        
        <form onSubmit={handleAddTeamSubmit} className="flex gap-3 mb-6">
          <input 
            type="text" 
            maxLength={40} 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="KETIK NAMA TIM BARU..." 
            className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 font-black uppercase" 
          />
          <button type="submit" className={`${theme.primary} text-white px-6 py-4 rounded-2xl font-black shadow-md hover:shadow-lg`}>
            <Icons.IconPlus />
          </button>
        </form>
        
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 flex-1">
          {teams.length === 0 && (
            <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 font-bold text-sm normal-case">
              Belum ada tim didaftarkan.
            </div>
          )}
          {teams.map((team) => (
            <div key={team} className="bg-white p-3 pr-4 rounded-2xl flex items-center justify-between border border-gray-200 shadow-sm transition-colors hover:border-gray-300">
              <div className="flex items-center gap-4">
                <label className="cursor-pointer w-12 h-12 rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden hover:border-gray-300 group relative">
                  {teamLogos[team] ? (
                    <img src={teamLogos[team]} className="w-full h-full object-cover" alt="Logo" />
                  ) : (
                    <Icons.IconImage className="text-gray-300 group-hover:text-gray-500" />
                  )}
                  <input type="file" accept="image/*" hidden onChange={(e) => handleTeamLogoUpload(team, e)} />
                </label>
                <span className="font-black text-gray-800 text-lg uppercase">{team}</span>
              </div>
              <div className="flex items-center gap-3">
                {tournamentType === 'Groups' && (
                  <select 
                    value={groupAssignments[team] || ''} 
                    onChange={(e) => setGroupAssignments({...groupAssignments, [team]: e.target.value})} 
                    className="bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
                  >
                    <option value="" disabled>Pilih Grup</option>
                    {Array.from({length: Number(numGroups) || 2}, (_, i) => String.fromCharCode(65 + i)).map(g => (
                      <option key={g} value={g}>Grup {g}</option>
                    ))}
                  </select>
                )}
                <button onClick={() => handleRemoveTeam(team)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors">
                  <Icons.IconTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* KOLOM KANAN: Pengaturan Kategori & Sistem */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Kategori & Disiplin Event */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Kategori & Disiplin Event</h2>
          <select 
            value={selectedEventFormat} 
            onChange={(e) => setSelectedEventFormat(e.target.value)} 
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-black text-sm rounded-2xl px-5 py-4 outline-none focus:border-gray-400 shadow-sm cursor-pointer mb-4 uppercase"
          >
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
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest">Partai {idx + 1}</span>
                  <select 
                    value={mixDisciplines[idx]} 
                    onChange={(e) => {
                      const newMix = [...mixDisciplines];
                      newMix[idx] = e.target.value;
                      setMixDisciplines(newMix);
                    }} 
                    className="w-full bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl px-3 py-2 uppercase"
                  >
                    <option value="Double">Double</option>
                    <option value="Regu">Regu</option>
                    <option value="Quadrant">Quadrant</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sistem & Lapangan */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
          <h2 className="text-sm font-black text-gray-400 mb-4 uppercase tracking-widest">Sistem & Lapangan</h2>
          
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              value={courtInputValue} 
              onChange={(e) => setCourtInputValue(e.target.value)} 
              placeholder="Tambah lapangan..." 
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white text-xs font-bold uppercase" 
            />
            <button type="button" onClick={handleAddCourt} className="bg-gray-800 hover:bg-black text-white px-4 py-3 rounded-xl font-bold transition-colors">
              <Icons.IconPlus />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {courts.map((court, index) => ( 
              <div key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 border border-gray-200">
                {court} 
                {courts.length > 1 && (
                  <button type="button" onClick={() => handleRemoveCourt(court)} className="text-gray-400 hover:text-red-500">
                    <Icons.IconTrash />
                  </button>
                )}
              </div> 
            ))}
          </div>

          <select 
            value={tournamentType} 
            onChange={(e) => setTournamentType(e.target.value)} 
            className="w-full bg-white border border-gray-200 font-black text-sm rounded-xl px-4 py-3 outline-none cursor-pointer mb-3 uppercase"
          >
            <option value="Group">GROUP (1 POOL - KOMPETISI PENUH)</option>
            <option value="Groups">GROUPS (BANYAK GRUP & BABAK GUGUR)</option>
            <option value="Knocked Out Round">KNOCKED OUT ROUND (SISTEM GUGUR)</option>
          </select>

          {(tournamentType === 'Group' || tournamentType === 'Groups') && (
            <select 
              value={roundRobinType} 
              onChange={(e) => setRoundRobinType(e.target.value)} 
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl px-4 py-3 outline-none cursor-pointer mb-3 uppercase"
            >
              <option value="Single Round Robin">Single Round Robin (1x Pertemuan)</option>
              <option value="Double Round Robin">Double Round Robin (Kandang & Tandang)</option>
            </select>
          )}

          {tournamentType === 'Groups' && (
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.soft} flex justify-between items-center mb-4`}>
              <span className="font-black text-xs">JUMLAH GRUP</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="2" max="26" 
                  value={numGroups} 
                  onChange={(e) => setNumGroups(e.target.value)} 
                  className="w-12 h-10 text-center font-black bg-white border border-gray-200 rounded-lg outline-none shadow-sm" 
                />
                <button onClick={handleAutoAssign} className="bg-white border border-gray-200 text-gray-700 font-black text-[10px] px-3 h-10 rounded-lg hover:bg-gray-50 uppercase shadow-sm">
                  Susun
                </button>
              </div>
            </div>
          )}
          
          <button 
            onClick={onStartTournament} 
            disabled={teams.length < 2} 
            className={`w-full mt-auto ${theme.accent} ${theme.accentHover} ${theme.accentText} disabled:opacity-50 font-black py-4 rounded-xl shadow-md transition-all text-lg flex justify-center items-center gap-2`}
          >
            <Icons.IconCalendar /> MULAI TURNAMEN
          </button>
        </div>
      </div>
    </div>
  );
};