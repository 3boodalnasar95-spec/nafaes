import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Plus, Download, Filter } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getTransactions, createTransaction } from '@/lib/db-operations';
import type { Transaction } from '@/types/database';

export default function AdminAccounting() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'income' as 'income' | 'expense',
    category: 'sales' as Transaction['category'],
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadTransactions();
  }, [typeFilter]);

  const loadTransactions = async () => {
    setLoading(true);
    const data = await getTransactions(
      typeFilter === 'all' ? {} : { type: typeFilter }
    );
    setTransactions(data);
    setLoading(false);
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    });
    setNewTransaction({
      type: 'income',
      category: 'sales',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(false);
    loadTransactions();
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const categories = {
    income: ['sales', 'delivery', 'other'] as const,
    expense: ['delivery', 'inventory', 'marketing', 'utilities', 'salaries', 'other'] as const
  };

  const categoryLabels: Record<string, string> = {
    sales: 'مبيعات',
    delivery: 'توصيل',
    inventory: 'مخزون',
    marketing: 'تسويق',
    utilities: 'مرافق',
    salaries: 'رواتب',
    other: 'أخرى'
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">المحاسبة</h2>
            <p className="text-[#6B6B6B]">إدارة الإيرادات والمصروفات</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-[#F5F0E8] text-[#1A1A1A] px-4 py-2 rounded-lg hover:bg-[#E8E0D5] transition-colors">
              <Download className="w-5 h-5" />
              تصدير
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4AF37] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              تسجيل عملية
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">إجمالي الإيرادات</p>
              <p className="text-2xl font-bold text-green-600">{totalIncome.toFixed(3)} د.ك</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">إجمالي المصروفات</p>
              <p className="text-2xl font-bold text-red-600">{totalExpense.toFixed(3)} د.ك</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E0D5] p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#C9A96E]/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">صافي الربح</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netProfit.toFixed(3)} د.ك
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] p-2 mb-6 inline-flex gap-1">
        {(['all', 'income', 'expense'] as const).map(type => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              typeFilter === type
                ? type === 'income' ? 'bg-green-500 text-white' 
                  : type === 'expense' ? 'bg-red-500 text-white'
                  : 'bg-[#C9A96E] text-white'
                : 'text-[#6B6B6B] hover:bg-[#F5F0E8]'
            }`}
          >
            {type === 'all' ? 'الكل' : type === 'income' ? 'إيرادات' : 'مصروفات'}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl border border-[#E8E0D5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F0E8]">
              <tr>
                <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">التاريخ</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-[#1A1A1A]">الوصف</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-[#1A1A1A]">الفئة</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#1A1A1A]">المبلغ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D5]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#6B6B6B]">جاري التحميل...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#6B6B6B]">لا توجد معاملات</td>
                </tr>
              ) : (
                transactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-4 py-4 text-sm text-[#6B6B6B]">{transaction.date}</td>
                    <td className="px-4 py-4">
                      <p className="text-[#1A1A1A]">{transaction.description}</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-xs bg-[#F5F0E8] text-[#6B6B6B]">
                        {categoryLabels[transaction.category] || transaction.category}
                      </span>
                    </td>
                    <td className={`px-4 py-4 text-left font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toFixed(3)} د.ك
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">تسجيل عملية جديدة</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewTransaction({ ...newTransaction, type: 'income' })}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    newTransaction.type === 'income' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-[#F5F0E8] text-[#6B6B6B]'
                  }`}
                >
                  إيراد
                </button>
                <button
                  type="button"
                  onClick={() => setNewTransaction({ ...newTransaction, type: 'expense' })}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    newTransaction.type === 'expense' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-[#F5F0E8] text-[#6B6B6B]'
                  }`}
                >
                  مصروف
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">الفئة</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value as Transaction['category'] })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                >
                  {categories[newTransaction.type].map(cat => (
                    <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">المبلغ</label>
                <input
                  type="number"
                  step="0.001"
                  required
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">الوصف</label>
                <input
                  type="text"
                  required
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">التاريخ</label>
                <input
                  type="date"
                  required
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#E8E0D5] rounded-lg focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#C9A96E] hover:bg-[#D4AF37] text-white py-2 rounded-lg transition-colors"
                >
                  حفظ
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-[#F5F0E8] text-[#1A1A1A] py-2 rounded-lg hover:bg-[#E8E0D5] transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}