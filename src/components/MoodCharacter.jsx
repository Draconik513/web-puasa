import React from 'react';
import { motion } from 'framer-motion';

export default function MoodCharacter({ mood = 'good', purity = 80 }) {
  const getMoodEmoji = () => {
    switch(mood) {
      case 'excellent': return '🌟😊🌟';
      case 'good': return '😊';
      case 'calm': return '😌';
      case 'tired': return '😴';
      case 'sad': return '😔';
      default: return '😊';
    }
  };

  const getBackgroundColor = () => {
    if (purity >= 90) return 'from-yellow-300 to-amber-400';
    if (purity >= 70) return 'from-green-300 to-emerald-400';
    if (purity >= 50) return 'from-blue-300 to-indigo-400';
    if (purity >= 30) return 'from-orange-300 to-red-400';
    return 'from-gray-300 to-gray-500';
  };

  const getAuraSize = () => {
    return 120 + (purity * 0.5);
  };

  return (
    <div className="relative flex justify-center items-center py-8">
      {/* Aura / Cahaya */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.3 }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute w-${getAuraSize()} h-${getAuraSize()} 
          bg-gradient-to-r ${getBackgroundColor()} rounded-full blur-3xl opacity-20`}
        style={{ width: getAuraSize(), height: getAuraSize() }}
      />

      {/* Karakter Utama */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Lingkaran Luar */}
        <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${getBackgroundColor()} 
          shadow-2xl flex items-center justify-center relative overflow-hidden`}>
          
          {/* Cahaya Dalam */}
          <div className="absolute inset-0 bg-white opacity-20"></div>
          
          {/* Wajah */}
          <div className="text-center relative z-10">
            <span className="text-7xl">{getMoodEmoji()}</span>
            
            {/* Purity Indicator */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
              bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                ✨ {purity}%
              </span>
            </div>
          </div>

          {/* Ornamen Islami */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-2 left-2 text-yellow-300 text-xs">🕋</div>
            <div className="absolute top-2 right-2 text-yellow-300 text-xs">🌙</div>
            <div className="absolute bottom-2 left-2 text-yellow-300 text-xs">⭐</div>
            <div className="absolute bottom-2 right-2 text-yellow-300 text-xs">☪️</div>
          </div>
        </div>

        {/* Cahaya Titik-titik */}
        {purity > 70 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1
            }}
            className="absolute -top-4 -right-4 text-2xl"
          >
            ✨
          </motion.div>
        )}
      </motion.div>

      {/* Label Kebersihan */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {purity >= 80 ? 'Hati Bersih' : 
           purity >= 60 ? 'Cukup Bersih' : 
           'Perlu Perbaikan'}
        </p>
      </div>
    </div>
  );
}