import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../hooks/useLocalStorage';
import { PlusIcon, TrashIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Sedekah() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [sedekahList, setSedekahList] = useLocalStorage('sedekahList', []);
  const [sedekahData, setSedekahData] = useLocalStorage('sedekahData', { total: 0, count: 0 });

  const addSedekah = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Masukkan jumlah sedekah yang valid!');
      return;
    }

    const newSedekah = {
      id: Date.now(),
      amount: parseFloat(amount),
      description: description || 'Sedekah',
      date: new Date().toISOString()
    };

    setSedekahList([newSedekah, ...sedekahList]);
    setSedekahData({
      total: sedekahData.total + parseFloat(amount),
      count: sedekahData.count + 1
    });

    setAmount('');
    setDescription('');
    setShowAddForm(false);
  };

  const deleteSedekah = (id, sedekahAmount) => {
    if (window.confirm('Hapus catatan sedekah ini?')) {
      setSedekahList(sedekahList.filter(item => item.id !== id));
      setSedekahData({
        total: Math.max(0, sedekahData.total - sedekahAmount),
        count: Math.max(0, sedekahData.count - 1)
      });
    }
  };

  const resetSedekah = () => {
    if (window.confirm('Reset semua data sedekah? Data tidak bisa dikembalikan!')) {
      setSedekahList([]);
      setSedekahData({ total: 0, count: 0 });
    }
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const quickAmounts = [10000, 20000, 50000, 100000, 200000, 500000];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            💰 Sedekah Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Catat dan pantau sedekah Anda selama Ramadhan
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetSedekah}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          🔄 Reset Data
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="ramadhan-card bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
        >
          <p className="text-sm opacity-90">Total Sedekah</p>
          <p className="text-4xl font-bold mt-2">{formatRupiah(sedekahData.total)}</p>
          <p className="text-sm opacity-90 mt-2">Alhamdulillah 🤲</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="ramadhan-card bg-gradient-to-br from-blue-500 to-cyan-600 text-white"
        >
          <p className="text-sm opacity-90">Jumlah Sedekah</p>
          <p className="text-4xl font-bold mt-2">{sedekahData.count}x</p>
          <p className="text-sm opacity-90 mt-2">Terus berbagi 💚</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="ramadhan-card bg-gradient-to-br from-purple-500 to-pink-600 text-white"
        >
          <p className="text-sm opacity-90">Rata-rata</p>
          <p className="text-4xl font-bold mt-2">
            {formatRupiah(sedekahData.count > 0 ? sedekahData.total / sedekahData.count : 0)}
          </p>
          <p className="text-sm opacity-90 mt-2">Per sedekah 📊</p>
        </motion.div>
      </div>

      {/* Add Sedekah Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Riwayat Sedekah
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Tambah Sedekah</span>
        </motion.button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="ramadhan-card bg-gray-50 dark:bg-gray-700/50"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jumlah Sedekah (Rp)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Masukkan jumlah"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <motion.button
                    key={quickAmount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="px-3 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 
                      dark:text-primary-400 rounded-lg text-sm font-medium hover:bg-primary-200 
                      dark:hover:bg-primary-900/50 transition-colors"
                  >
                    {formatRupiah(quickAmount)}
                  </motion.button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Keterangan (Opsional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Contoh: Sedekah masjid, Infaq yatim, dll"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addSedekah}
                  className="flex-1 btn-primary"
                >
                  Simpan Sedekah
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowAddForm(false);
                    setAmount('');
                    setDescription('');
                  }}
                  className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 
                    rounded-xl font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Batal
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sedekah List */}
      <div className="space-y-3">
        {sedekahList.length === 0 ? (
          <div className="ramadhan-card text-center py-12">
            <span className="text-6xl mb-4 block">💰</span>
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada catatan sedekah. Mulai berbagi kebaikan hari ini!
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {sedekahList.map((sedekah, index) => (
              <motion.div
                key={sedekah.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="ramadhan-card flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full 
                    flex items-center justify-center">
                    <BanknotesIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {formatRupiah(sedekah.amount)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {sedekah.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {format(new Date(sedekah.date), 'dd MMMM yyyy, HH:mm', { locale: id })}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteSedekah(sedekah.id, sedekah.amount)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <TrashIcon className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Motivasi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="ramadhan-card bg-gradient-to-br from-islamic-green to-primary-700 text-white"
      >
        <div className="flex items-center space-x-4">
          <span className="text-4xl">💫</span>
          <div>
            <p className="font-semibold">Keutamaan Sedekah</p>
            <p className="text-sm opacity-90 mt-1">
              "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji. Allah melipatgandakan bagi siapa yang Dia kehendaki."
            </p>
            <p className="text-xs opacity-75 mt-2">— QS. Al-Baqarah: 261</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
