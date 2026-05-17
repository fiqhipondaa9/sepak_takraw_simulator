import React from 'react';
import * as Icons from '../constants/icons';

export const TopNavigation = ({ 
  theme, 
  themes, 
  activeTheme, 
  setActiveTheme, 
  handleOpenFile, 
  handleSaveFile 
}) => {
  return (
    <div className="no-print sticky top-0 z-40 p-4 backdrop-blur-md bg-white/60 border-b border-white/20 shadow-sm flex justify-between items-center">
       <div className="flex items-center gap-3">
          <div className={`${theme.primary} text-white p-2 rounded-xl shadow-md`}>
            <Icons.IconTrophy />
          </div>
          <div className="hidden sm:block">
             <div className="font-black tracking-widest text-gray-800 leading-none">
                SEPAK TAKRAW<span className={theme.textPrimary}> Tournament Management System</span>
             </div>
             <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${theme.textPrimary} opacity-70`}>
                by fiqhipondaa9
             </div>
          </div>
       </div>
       
       <div className="flex items-center gap-2 sm:gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100 mr-2">
             {Object.keys(themes).map(t => ( 
               <button 
                 key={t} 
                 onClick={() => setActiveTheme(t)} 
                 className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${activeTheme === t ? 'bg-white shadow-sm scale-110' : 'hover:bg-gray-200'}`} 
                 title={themes[t].name}
               >
                 <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${themes[t].primary}`}></div>
               </button> 
             ))}
          </div>
          <label className={`cursor-pointer ${theme.soft} ${theme.textPrimary} hover:bg-gray-100 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-xs`}>
            <Icons.IconFolder /> <span>OPEN</span>
            <input type="file" accept=".json" hidden onChange={handleOpenFile} />
          </label>
          <button 
            onClick={handleSaveFile} 
            className={`${theme.primary} ${theme.primaryHover} text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-md text-xs`}
          >
            <Icons.IconSave /> <span>SAVE</span>
          </button>
       </div>
    </div>
  );
};