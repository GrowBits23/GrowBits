import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import {
  LayoutDashboard,
  ShieldAlert,
  BookOpen,
  PieChart,
  Settings,
  Plus,
  ArrowRightLeft,
  Wallet,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Lock,
  Key,
  Fingerprint,
  Link as LinkIcon,
  X,
  Sun,
  Moon,
  HelpCircle,
  Bell,
  Compass,
  ScanLine,
  ChevronDown,
  Home,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Target,
  Zap
} from 'lucide-react';

// --- Configuration ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase not initialized. Please add your config in App.js to use real-time features.");
}

// --- Mock Data ---
const MOCK_TRANSACTIONS = [
  { id: '1', type: 'income', amount: 5000, description: 'Salary', date: new Date(Date.now() - 86400000 * 2), blockHash: '0x7f83...a1b2' },
  { id: '2', type: 'expense', amount: 1200, description: 'Rent', date: new Date(Date.now() - 86400000 * 5), blockHash: '0x3c4d...e5f6' },
  { id: '3', type: 'p2p_out', amount: 150, description: 'Dinner split', date: new Date(Date.now() - 86400000 * 1), blockHash: '0x9a8b...c7d8' },
  { id: '4', type: 'expense', amount: 80, description: 'Groceries', date: new Date(), blockHash: '0x1e2f...3a4b' },
  { id: '5', type: 'p2p_in', amount: 50, description: 'Refund', date: new Date(), blockHash: '0x5c6d...7e8f' },
];

// --- Components ---

const Sidebar = ({ activePage, setActivePage, isDarkMode, setIsDarkMode }) => {
  const topMenuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'monitoring', icon: ShieldAlert, label: 'Monitoring' },
    { id: 'fraud-alerts', icon: AlertTriangle, label: 'Fraud Alerts' },
    { id: 'ledger', icon: BookOpen, label: 'Ledger' },
    { id: 'smart-spending', icon: PieChart, label: 'Smart Spending' },
  ];

  const bottomMenuItems = [
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`w-20 lg:w-72 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border-r flex flex-col items-center lg:items-start transition-all duration-300 z-20 h-screen sticky top-0`}>
      {/* Logo */}
      <div className="py-6 px-4 flex items-center gap-3 w-full">
        <div className={`w-10 h-10 ${isDarkMode ? 'bg-gradient-to-tr from-emerald-400 to-cyan-500' : 'bg-gradient-to-tr from-blue-500 to-indigo-600'} rounded-xl flex items-center justify-center shadow-lg`}>
          <Wallet className="text-white w-6 h-6" />
        </div>
        <span className={`hidden lg:block text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Securefin
        </span>
      </div>

      {/* Top Navigation */}
      <nav className="w-full space-y-1 px-3 flex-1">
        {topMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${activePage === item.id
                ? isDarkMode
                  ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 border border-blue-500/20'
                : isDarkMode
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="w-full px-3 pb-6 space-y-2">
        {/* Light/Dark Mode Toggle */}
        <div className={`flex items-center justify-between px-3 py-3 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2">
            <Sun className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-yellow-500'}`} />
            <span className={`hidden lg:block text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Light</span>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-emerald-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
          <Moon className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-gray-400'}`} />
        </div>

        {/* Help & Settings */}
        {bottomMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${activePage === item.id
                ? isDarkMode
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-blue-500/10 text-blue-600'
                : isDarkMode
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const HomePage = ({ transactions, balance, income, expenses, isDarkMode }) => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showP2P, setShowP2P] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const QuickActionCard = ({ icon: Icon, label, onClick, color }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'
        } border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} shadow-sm`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{label}</span>
    </button>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Hello, User 👋
          </h1>
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
            Welcome back to your financial dashboard
          </p>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <button className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} transition-all`}>
            <Compass className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
          </button>
          <button className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} transition-all`}>
            <Wallet className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
          </button>
          <button className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} transition-all relative`}>
            <Bell className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Toggle Button for Quick Actions */}
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${isDarkMode
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              } text-white shadow-lg`}
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Quick Actions</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showQuickActions ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Quick Actions Card */}
      {showQuickActions && (
        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border backdrop-blur-sm animate-in slide-in-from-top-4 duration-300`}>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionCard
              icon={ArrowDownRight}
              label="Add Expense"
              onClick={() => setShowAddExpense(true)}
              color="bg-gradient-to-br from-rose-500 to-pink-600"
            />
            <QuickActionCard
              icon={ArrowUpRight}
              label="Add Income"
              onClick={() => setShowAddIncome(true)}
              color="bg-gradient-to-br from-emerald-500 to-teal-600"
            />
            <QuickActionCard
              icon={ArrowRightLeft}
              label="P2P Transfer"
              onClick={() => setShowP2P(true)}
              color="bg-gradient-to-br from-violet-500 to-purple-600"
            />
            <QuickActionCard
              icon={ScanLine}
              label="Scanner"
              onClick={() => setShowScanner(true)}
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
            />
          </div>
        </div>
      )}

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/5 border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'} border relative overflow-hidden`}>
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-100'}`}>
              <Wallet className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <Zap className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total Balance</h3>
          <div className={`text-3xl font-bold ${balance >= 0 ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : 'text-rose-500'}`}>
            ${balance.toLocaleString()}
          </div>
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Available funds</p>
        </div>

        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-blue-500/20 to-indigo-500/5 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'} border`}>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
              <TrendingUp className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>+12%</span>
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total Income</h3>
          <div className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            ${income.toLocaleString()}
          </div>
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Last 30 days</p>
        </div>

        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-rose-500/20 to-pink-500/5 border-rose-500/20' : 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200'} border`}>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-rose-500/10' : 'bg-rose-100'}`}>
              <TrendingDown className={`w-6 h-6 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-100 text-rose-700'}`}>-5%</span>
          </div>
          <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total Expenses</h3>
          <div className={`text-3xl font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
            ${expenses.toLocaleString()}
          </div>
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Last 30 days</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border backdrop-blur-sm`}>
        <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((tx) => (
            <div key={tx.id} className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'income' ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600') :
                    tx.type === 'expense' ? (isDarkMode ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-100 text-rose-600') :
                      (isDarkMode ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-100 text-violet-600')
                  }`}>
                  {tx.type === 'income' ? <TrendingUp size={20} /> :
                    tx.type === 'expense' ? <TrendingDown size={20} /> :
                      <ArrowRightLeft size={20} />}
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{tx.description}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{tx.date.toLocaleDateString()}</p>
                </div>
              </div>
              <div className={`font-bold ${tx.type === 'income' || tx.type === 'p2p_in' ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : (isDarkMode ? 'text-rose-400' : 'text-rose-600')
                }`}>
                {tx.type === 'income' || tx.type === 'p2p_in' ? '+' : '-'}${tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showAddExpense && <TransactionModal type="expense" onClose={() => setShowAddExpense(false)} isDarkMode={isDarkMode} />}
      {showAddIncome && <TransactionModal type="income" onClose={() => setShowAddIncome(false)} isDarkMode={isDarkMode} />}
      {showP2P && <P2PModal onClose={() => setShowP2P(false)} isDarkMode={isDarkMode} />}
      {showScanner && <ScannerModal onClose={() => setShowScanner(false)} isDarkMode={isDarkMode} />}
    </div>
  );
};

const Monitoring = ({ isDarkMode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Security Monitoring</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border`}>
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>System Status</h3>
          </div>
          <div className={`flex items-center gap-4 p-4 rounded-xl mb-4 ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border`}>
            <CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <div>
              <p className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>All Systems Operational</p>
              <p className={`text-sm ${isDarkMode ? 'text-emerald-300/70' : 'text-emerald-600'}`}>No threats detected</p>
            </div>
          </div>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Blockchain-based security monitoring ensures all transactions are immutable and verified.
          </p>
        </div>

        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border`}>
          <div className="flex items-center gap-3 mb-4">
            <Activity className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Activity Monitor</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>Security Score</span>
                <span className={`font-mono ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>98/100</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>
                <div className="h-full w-[98%] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FraudAlerts = ({ isDarkMode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Fraud Detection & Alerts</h2>

      <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'} border`}>
        <div className="flex items-start gap-4">
          <CheckCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>No Suspicious Activity Detected</h3>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-emerald-300/80' : 'text-emerald-600'}`}>
              All transactions are verified and secure. Last scan: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Anomaly Detection</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Unusual Spending</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>Low Risk</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Login Attempts</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Device Recognition</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>Verified</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Alerts</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'} text-center py-8`}>
            No alerts in the last 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

const Ledger = ({ transactions, isDarkMode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Blockchain Ledger</h2>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Immutable transaction records</p>
        </div>
        <div className={`px-3 py-1 rounded-lg text-xs font-mono ${isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-gray-100 text-gray-600 border-gray-200'} border`}>
          Network: TestNet-Sim
        </div>
      </div>

      <div className={`rounded-2xl overflow-hidden ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-xs uppercase tracking-wider ${isDarkMode ? 'bg-slate-800/50 text-slate-400 border-slate-700' : 'bg-gray-50 text-gray-600 border-gray-200'} border-b`}>
                <th className="p-4 text-left font-medium">Date</th>
                <th className="p-4 text-left font-medium">Type</th>
                <th className="p-4 text-left font-medium">Description</th>
                <th className="p-4 text-left font-medium">Amount</th>
                <th className="p-4 text-left font-medium">Block Hash</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-gray-200'}`}>
              {transactions.map((tx) => (
                <tr key={tx.id} className={`transition-colors ${isDarkMode ? 'hover:bg-slate-800/30' : 'hover:bg-gray-50'}`}>
                  <td className={`p-4 text-sm font-mono ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{tx.date.toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${tx.type === 'income' ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-100 text-emerald-700 border-emerald-200') :
                        tx.type === 'expense' ? (isDarkMode ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-100 text-rose-700 border-rose-200') :
                          (isDarkMode ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' : 'bg-violet-100 text-violet-700 border-violet-200')
                      }`}>
                      {tx.type.toUpperCase().replace('_', ' ')}
                    </span>
                  </td>
                  <td className={`p-4 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{tx.description}</td>
                  <td className={`p-4 text-sm font-bold ${tx.type === 'income' || tx.type === 'p2p_in' ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : (isDarkMode ? 'text-rose-400' : 'text-rose-600')
                    }`}>
                    ${tx.amount}
                  </td>
                  <td className={`p-4 text-xs font-mono ${isDarkMode ? 'text-slate-500' : 'text-gray-500'} truncate max-w-[150px]`}>
                    {tx.blockHash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SmartSpending = ({ isDarkMode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Smart Spending Analysis</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border`}>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Category Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Housing & Rent', amount: 1200, color: isDarkMode ? 'bg-blue-500' : 'bg-blue-600' },
              { label: 'Food & Dining', amount: 450, color: isDarkMode ? 'bg-emerald-500' : 'bg-emerald-600' },
              { label: 'Transportation', amount: 120, color: isDarkMode ? 'bg-yellow-500' : 'bg-yellow-600' },
              { label: 'P2P Transfers', amount: 300, color: isDarkMode ? 'bg-violet-500' : 'bg-violet-600' },
              { label: 'Entertainment', amount: 180, color: isDarkMode ? 'bg-rose-500' : 'bg-rose-600' },
            ].map((cat) => (
              <div key={cat.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>{cat.label}</span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${cat.amount}</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>
                  <div className={`h-full ${cat.color} rounded-full transition-all duration-500`} style={{ width: `${(cat.amount / 2250) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl text-white ${isDarkMode ? 'bg-gradient-to-br from-indigo-600 to-violet-700' : 'bg-gradient-to-br from-blue-600 to-indigo-700'}`}>
          <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-white/20'} backdrop-blur-sm`}>
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">AI Insight</h3>
          <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-indigo-100' : 'text-blue-100'}`}>
            You're spending 20% more on dining out. Cooking at home could save you $150/month.
          </p>
          <button className={`w-full py-2 font-bold rounded-lg transition-colors text-sm ${isDarkMode ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-white text-blue-600 hover:bg-blue-50'}`}>
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

const HelpPage = ({ isDarkMode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Help & Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border`}>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How do I add a transaction?</p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Use the Quick Actions button on the home page</p>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Is my data secure?</p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Yes, we use blockchain-based security</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border`}>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Contact Support</h3>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-4`}>Need help? Reach out to our support team.</p>
          <button className={`w-full py-3 rounded-xl font-medium transition-colors ${isDarkMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = ({ isDarkMode }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Security Settings</h2>

      <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border space-y-6`}>
        <div className={`flex items-center gap-4 pb-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
            👤
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</h3>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>User ID: <span className={`font-mono ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>usr_8f92...9a2b</span></p>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>App ID: <span className="font-mono">app_v1.0.2_secure</span></p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { icon: Key, label: 'Security Keys', desc: 'Hardware keys & 2FA' },
            { icon: Fingerprint, label: 'Biometric Login', desc: 'FaceID & TouchID' },
            { icon: LinkIcon, label: 'Linked Accounts', desc: 'External banks & wallets' },
          ].map((item) => (
            <div key={item.label} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isDarkMode ? 'bg-slate-800/30 border-slate-700/50' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>{item.desc}</p>
                </div>
              </div>
              <button className={`text-sm font-medium ${isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-blue-600 hover:text-blue-700'}`}>Configure</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Modals ---

const TransactionModal = ({ type, onClose, isDarkMode }) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Add {type === 'income' ? 'Income' : 'Expense'}
          </h3>
          <button onClick={onClose} className={isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}>
            <X size={20} />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full rounded-xl p-3 focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'} border`}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Description</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className={`w-full rounded-xl p-3 focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'} border`}
              placeholder="e.g. Salary, Groceries"
            />
          </div>
          <button type="submit" className={`w-full py-3 rounded-xl font-bold transition-colors mt-4 ${type === 'income' ? (isDarkMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-600 hover:bg-emerald-700') : (isDarkMode ? 'bg-rose-500 hover:bg-rose-600' : 'bg-rose-600 hover:bg-rose-700')} text-white`}>
            Save {type === 'income' ? 'Income' : 'Expense'}
          </button>
        </form>
      </div>
    </div>
  );
};

const P2PModal = ({ onClose, isDarkMode }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>P2P Transfer</h3>
          <button onClick={onClose} className={isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}>
            <X size={20} />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Recipient ID</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className={`w-full rounded-xl p-3 focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-violet-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-500'} border`}
              placeholder="user_..."
            />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full rounded-xl p-3 focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-violet-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-500'} border`}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className={`block text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Reason</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`w-full rounded-xl p-3 focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-violet-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-violet-500'} border`}
              placeholder="e.g. Dinner split"
            />
          </div>
          <button type="submit" className={`w-full py-3 rounded-xl font-bold transition-colors mt-4 ${isDarkMode ? 'bg-violet-600 hover:bg-violet-700' : 'bg-violet-600 hover:bg-violet-700'} text-white`}>
            Send Funds
          </button>
        </form>
      </div>
    </div>
  );
};

const ScannerModal = ({ onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>QR Scanner</h3>
          <button onClick={onClose} className={isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}>
            <X size={20} />
          </button>
        </div>
        <div className={`aspect-square rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
          <div className="text-center">
            <ScanLine className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`} />
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Scanner interface would appear here</p>
          </div>
        </div>
        <button onClick={onClose} className={`w-full mt-4 py-3 rounded-xl font-bold transition-colors ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
          Close Scanner
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

function App() {
  const [activePage, setActivePage] = useState('home');
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date(),
      }));
      setTransactions(txs);
    });
    return () => unsubscribe();
  }, []);

  const income = transactions
    .filter(t => t.type === 'income' || t.type === 'p2p_in')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense' || t.type === 'p2p_out')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage transactions={transactions} balance={balance} income={income} expenses={expenses} isDarkMode={isDarkMode} />;
      case 'monitoring': return <Monitoring isDarkMode={isDarkMode} />;
      case 'fraud-alerts': return <FraudAlerts isDarkMode={isDarkMode} />;
      case 'ledger': return <Ledger transactions={transactions} isDarkMode={isDarkMode} />;
      case 'smart-spending': return <SmartSpending isDarkMode={isDarkMode} />;
      case 'help': return <HelpPage isDarkMode={isDarkMode} />;
      case 'settings': return <SettingsPage isDarkMode={isDarkMode} />;
      default: return <HomePage transactions={transactions} balance={balance} income={income} expenses={expenses} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-emerald-500/30 transition-colors duration-300`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
