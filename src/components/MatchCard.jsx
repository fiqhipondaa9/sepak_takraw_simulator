// src/components/MatchCard.jsx
import React, { memo } from 'react';
import { 
  IconTrophy, IconX, IconUsers, IconArrowUp, IconArrowDown, 
  IconChevronsUp, IconChevronsDown, IconClock 
} from '../constants/icons';

// React.memo mencegah komponen ini dirender ulang jika datanya tidak berubah!
export const MatchCard = memo(({ 
  match, theme, isProjectorMode, isKnockout, index, totalMatches,
  teamLogos, isTeamEvent,
  onMove, onUpdateDateTime, onScoreChange 
}) => {
  const safeTeamA = String(match.teamA || '');
  const safeTeamB = String(match.teamB || '');
  const isTeamA_TBD = safeTeamA.includes('?'); 
  const isTeamB_TBD = safeTeamB.includes('?');

  const hasStarted = !isTeamA_TBD && !isTeamB_TBD && match.parties?.some(p => p.sets.some(s => s.scoreA !== '' || s.scoreB !== ''));
  const isLive = hasStarted && !match.winner;

  return (
    <div className={`bg-white rounded-3xl shadow-sm border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md print-break-inside-avoid print:border-gray-300 print:shadow-none print:ring-0
      ${isLive && !isProjectorMode ? 'border-red-400 shadow-md ring-4 ring-red-50' : theme.border} 
      ${isProjectorMode ? (isLive ? 'border-4 border-red-500 shadow-2xl' : 'border-none shadow-xl') : ''}
    `}>
      
      {/* HEADER KARTU */}
      <div className={`p-4 text-center border-b relative
        ${isLive ? 'border-red-200 bg-red-50/80 print:bg-white' : theme.border} 
        ${match.winner ? (match.winner === 'SERI' ? 'bg-gray-100 border-transparent' : `${theme.accent} ${theme.accentText} border-transparent`) : 'bg-gray-50/50'}
        ${isProjectorMode ? 'py-5' : ''}
      `}>
        {isLive && (
          <div className="no-print absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className={`font-black text-red-700 uppercase tracking-widest ${isProjectorMode ? 'text-xs' : 'text-[10px]'}`}>LIVE</span>
          </div>
        )}

        {isKnockout ? (
          <div className={`font-black tracking-widest uppercase ${isProjectorMode ? 'text-xl' : 'text-sm'} ${isLive ? 'text-red-800' : ''}`}>{match.title}</div>
        ) : (
          <div className="flex flex-col items-center">
            <span className={`font-black uppercase tracking-widest ${isLive ? 'text-red-800' : theme.textPrimary} ${isProjectorMode ? 'text-lg' : 'text-xs'}`}>
              {match.groupLabel} {match.roundLabel && `(${match.roundLabel})`}
            </span>
            
            {/* FITUR BARU: TANGGAL & JAM EDITABLE (Mode Admin) */}
            {!isProjectorMode ? (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
                <span className="text-[10px] font-bold opacity-70">MATCH #{match.id} &bull; {match.court} &bull;</span>
                <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-lg border border-black/10 hover:bg-white transition-colors">
                  <IconClock />
                  <input 
                    type="date" 
                    value={match.date || ''} 
                    onChange={(e) => onUpdateDateTime(match.id, 'date', e.target.value)}
                    className="text-[10px] font-bold bg-transparent outline-none cursor-pointer"
                  />
                  <input 
                    type="time" 
                    value={match.time || ''} 
                    onChange={(e) => onUpdateDateTime(match.id, 'time', e.target.value)}
                    className="text-[10px] font-bold bg-transparent outline-none cursor-pointer w-16"
                  />
                </div>
              </div>
            ) : (
              <span className={`font-medium mt-1 ${isLive ? 'text-red-600 font-bold' : 'opacity-70'} text-base`}>
                MATCH #{match.id} &bull; {match.court} &bull; {match.date ? `${match.date} ` : ''}{match.time}
              </span>
            )}

            {/* FITUR BARU: TOMBOL SORONG JADWAL EKSTREM */}
            {!isProjectorMode && index !== null && onMove && (
              <div className="no-print absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 bg-white/60 p-1 rounded-lg border border-black/5 shadow-sm backdrop-blur-sm">
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => onMove(index, 'top')} disabled={index === 0} title="Pindah Paling Atas" className="p-1 rounded hover:bg-white disabled:opacity-30"><IconChevronsUp /></button>
                  <button onClick={() => onMove(index, 'up')} disabled={index === 0} title="Pindah Naik" className="p-1 rounded hover:bg-white disabled:opacity-30"><IconArrowUp /></button>
                </div>
                <div className="flex flex-col gap-0.5 border-l border-black/5 pl-1">
                  <button onClick={() => onMove(index, 'down')} disabled={index === totalMatches - 1} title="Pindah Turun" className="p-1 rounded hover:bg-white disabled:opacity-30"><IconArrowDown /></button>
                  <button onClick={() => onMove(index, 'bottom')} disabled={index === totalMatches - 1} title="Pindah Paling Bawah" className="p-1 rounded hover:bg-white disabled:opacity-30"><IconChevronsDown /></button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TAMPILAN TIM VS TIM */}
      <div className={`flex justify-between items-center bg-white relative ${isProjectorMode ? 'p-8' : 'p-5'}`}>
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-gray-400 font-black rounded-xl z-0 print:border ${isProjectorMode ? 'text-base px-4 py-2' : 'text-[10px] px-3 py-1'}`}>VS</div>
        
        <div className={`w-2/5 flex flex-col items-center text-center z-10 ${match.winner === safeTeamA ? 'scale-110 transition-transform' : ''}`}>
          {teamLogos[safeTeamA] && !isTeamA_TBD && safeTeamA !== 'BYE' ? (
            <img src={teamLogos[safeTeamA]} className={`${isProjectorMode ? 'w-24 h-24 border-4' : 'w-14 h-14 border-2'} rounded-2xl object-cover ${theme.border} shadow-sm mb-3`} alt="" />
          ) : (
            <div className={`${isProjectorMode ? 'w-24 h-24 rounded-3xl' : 'w-14 h-14 rounded-2xl'} bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-3`}><IconUsers /></div>
          )}
          <span className={`font-black line-clamp-2 ${isProjectorMode ? 'text-2xl' : 'text-sm'} ${isTeamA_TBD ? 'text-gray-400 italic' : match.winner === safeTeamA ? theme.textPrimary : 'text-gray-700'}`}>{safeTeamA}</span>
        </div>

        <div className={`w-2/5 flex flex-col items-center text-center z-10 ${match.winner === safeTeamB ? 'scale-110 transition-transform' : ''}`}>
          {teamLogos[safeTeamB] && !isTeamB_TBD && safeTeamB !== 'BYE' ? (
            <img src={teamLogos[safeTeamB]} className={`${isProjectorMode ? 'w-24 h-24 border-4' : 'w-14 h-14 border-2'} rounded-2xl object-cover ${theme.border} shadow-sm mb-3`} alt="" />
          ) : (
            <div className={`${isProjectorMode ? 'w-24 h-24 rounded-3xl' : 'w-14 h-14 rounded-2xl'} bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-3`}><IconUsers /></div>
          )}
          <span className={`font-black line-clamp-2 ${isProjectorMode ? 'text-2xl' : 'text-sm'} ${isTeamB_TBD ? 'text-gray-400 italic' : match.winner === safeTeamB ? theme.textPrimary : 'text-gray-700'}`}>{safeTeamB}</span>
        </div>
      </div>

      {/* INPUT SKOR PARTAI/SET */}
      <div className={`bg-gray-50/50 flex-1 flex flex-col gap-3 print:bg-white ${isProjectorMode ? 'p-8' : 'p-5'}`}>
        {match.isBye ? (
          <div className={`h-full flex items-center justify-center font-black text-emerald-500 bg-emerald-50/30 rounded-2xl border-2 border-emerald-100 border-dashed print-break-inside-avoid ${isProjectorMode ? 'text-2xl p-8' : 'text-sm p-4'}`}>AUTO ADVANCE (BYE)</div>
        ) : (!isTeamA_TBD && !isTeamB_TBD) ? match.parties?.map((party, pIndex) => (
          <div key={pIndex} className={`bg-white border ${theme.border} rounded-2xl relative shadow-sm print-break-inside-avoid ${isProjectorMode ? 'p-6' : 'p-3'}`}>
            {match.parties.length > 1 && ( 
              <div className={`font-bold text-center text-gray-400 mb-3 uppercase tracking-widest border-b border-gray-100 pb-2 ${isProjectorMode ? 'text-sm' : 'text-[10px]'}`}> 
                {party.label} {party.winner && <span className={`${party.winner === 'SERI' ? 'text-gray-400' : theme.textPrimary} ml-1`}>{party.winner === 'SERI' ? '(W.O)' : `(W: ${party.winner})`}</span>} 
              </div> 
            )}
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
                        <input type="number" min="0" max="30" value={scoreA} onChange={(e) => onScoreChange(match.id, pIndex, setIndex, 'scoreA', e.target.value)} className={`w-10 h-10 text-center text-sm font-black border-2 rounded-xl focus:ring-4 focus:outline-none transition-colors print:bg-transparent print:border-gray-300 hide-arrows ${isAWinner ? `${theme.primary} text-white border-transparent` : 'border-gray-200 text-gray-700 focus:border-gray-400 focus:ring-gray-100'}`} />
                        <input type="number" min="0" max="30" value={scoreB} onChange={(e) => onScoreChange(match.id, pIndex, setIndex, 'scoreB', e.target.value)} className={`w-10 h-10 text-center text-sm font-black border-2 rounded-xl focus:ring-4 focus:outline-none transition-colors print:bg-transparent print:border-gray-300 hide-arrows ${isBWinner ? `${theme.primary} text-white border-transparent` : 'border-gray-200 text-gray-700 focus:border-gray-400 focus:ring-gray-100'}`} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )) : <div className={`h-full flex items-center justify-center text-gray-400 font-medium text-center py-8 ${isProjectorMode ? 'text-xl' : 'text-sm'}`}>Menunggu penantang...</div>}
      </div>

      {/* FOOTER PEMENANG */}
      {match.winner && (
        <div className={`${match.winner === 'SERI' ? 'bg-gray-500' : theme.primary} text-white p-3 text-center font-black flex items-center justify-center gap-2 print:border-t print:bg-gray-100 print:text-black ${isProjectorMode ? 'text-2xl py-5' : 'text-base'}`}> 
          {match.isBye ? <><IconTrophy /> AUTO ADVANCE: {match.winner}</> : match.winner === 'SERI' ? <><IconX /> DOUBLE WALK-OVER</> : <><IconTrophy /> WINNER: {match.winner}</>} 
        </div> 
      )}
    </div>
  );
});