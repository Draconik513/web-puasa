import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TasbihDigital({ mobile = false }) {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [dzikir, setDzikir] = useState('Subhanallah');

  const dzikirList = [
    { name: 'Subhanallah', meaning: 'Maha Suci Allah', default: 33 },
    { name: 'Alhamdulillah', meaning: 'Segala puji bagi Allah', default: 33 },
    { name: 'Allahu Akbar', meaning: 'Allah Maha Besar', default: 33 },
    { name: 'Laa ilaha illallah', meaning: 'Tiada Tuhan selain Allah', default: 100 },
    { name: 'Astaghfirullah', meaning: 'Aku memohon ampun kepada Allah', default: 100 },
  ];

  const increment = () => {
    if (count < target) {
      setCount(count + 1);
    } else {
      // Reset dan ganti dzikir
      setCount(0);
      const currentIndex = dzikirList.findIndex(d => d.name === dzikir);
      const nextIndex = (currentIndex + 1) % dzikirList.length;
      setDzikir(dzikirList[nextIndex].name);
      setTarget(dzikirList[nextIndex].default);
    }
  };

  const reset = () => {
    setCount(0);
  };

  const changeDzikir = (name) => {
    const selected = dzikirList.find(d => d.name === name);
    setDzikir(name);
    setTarget(selected.default);
    setCount(0);
  };

  if (mobile) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800 dark:text-white">📿 Tasbih Digital</h3>
          <span className="text-xs bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded-full">
            {count}/{target}
          </span>
        </div>
        <button
          onClick={increment}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl text-center"
        >
          <span className="text-2xl font-bold">{count}</span>
          <p className="text-xs mt-1 opacity-90">{dzikir}</p>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="ramadhan-card text-center"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">📿</span>
          <h3 className="font-semibold text-gray-800 dark:text-white">Tasbih Digital</h3>
        </div>
        <button 
          onClick={reset}
          className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>

      {/* Pilihan Dzikir */}
      <div className="flex flex-wrap gap-2 mb-6">
        {dzikirList.map((d) => (
          <button
            key={d.name}
            onClick={() => changeDzikir(d.name)}
            className={`px-3 py-1.5 text-xs rounded-full transition ${
              dzikir === d.name
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Counter */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={increment}
        className="w-full relative"
      >
        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 
          rounded-full flex flex-col items-center justify-center shadow-2xl relative overflow-hidden
          hover:shadow-3xl transition-all duration-300">
          
          {/* Animasi Cahaya */}
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity"></div>
          
          <span className="text-6xl font-bold text-white">{count}</span>
          <span className="text-sm text-white/80 mt-2">/ {target}</span>
          <span className="text-lg font-semibold text-white mt-2">{dzikir}</span>
          
          <div className="absolute bottom-4 text-xs text-white/60">
            Ketuk untuk menghitung
          </div>
        </div>
      </motion.button>

      {/* Makna Dzikir */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {dzikirList.find(d => d.name === dzikir)?.meaning}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          Target: {target} kali
        </p>
      </div>
    </motion.div>
  );
}