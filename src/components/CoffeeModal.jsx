import React from 'react';
import * as Icons from '../constants/icons';

export const CoffeeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl flex flex-col overflow-hidden text-center relative p-8">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 p-2 rounded-xl transition-colors"
        >
          <Icons.IconX />
        </button>
        <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.IconCoffee />
        </div>
        <h3 className="text-xl font-black text-gray-800 mb-2">Traktir Kopi Developer</h3>
        <p className="text-xs font-bold text-gray-500 mb-6 leading-relaxed normal-case">
          Terima kasih telah menggunakan aplikasi ini! Dukungan Anda sangat berarti bagi pengembangan fitur selanjutnya.
        </p>
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 flex justify-center">
            {/* Catatan: Di masa depan, gambar ini bisa dipindah dari folder public ke folder src/assets/ */}
            <img src="/shareqr.png" alt="QRIS" className="max-w-[200px] h-auto rounded-xl shadow-sm" />
        </div>
        <a 
          href="https://wa.me/6285340804702" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl shadow-md transition-colors w-full flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
        >
            Konsultasi WhatsApp
        </a>
      </div>
    </div>
  );
};