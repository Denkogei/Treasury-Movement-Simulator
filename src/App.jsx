import { useState } from 'react';
import AccountList from './components/AccountList';
import TransferForm from './components/TransferForm';
import TransactionLog from './components/TransactionLog';
import { initialAccounts, exchangeRates } from './data/accounts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState([]);

  const handleTransfer = ({ from, to, amount, note, futureDate }) => {
    const fromAccount = accounts.find((acc) => acc.name === from);
    const toAccount = accounts.find((acc) => acc.name === to);

    if (!fromAccount || !toAccount) {
      toast.error('Invalid account selection');
      return;
    }

    if (from === to) {
      toast.error('Cannot transfer to the same account');
      return;
    }

    if (amount <= 0 || isNaN(amount)) {
      toast.error('Invalid amount');
      return;
    }

    if (fromAccount.balance < amount) {
      toast.error('Insufficient balance in source account');
      return;
    }

    // Get today's local date in YYYY-MM-DD format
    const today = new Date();
    const localDateString = today.toLocaleDateString('en-CA'); // "YYYY-MM-DD"

    const fxRate = exchangeRates[fromAccount.currency][toAccount.currency] || 1;
    const converted = fromAccount.currency === toAccount.currency
      ? amount
      : amount * fxRate;

    const updatedAccounts = accounts.map((acc) => {
      if (acc.name === from) {
        return { ...acc, balance: acc.balance - amount };
      }
      if (acc.name === to) {
        return { ...acc, balance: acc.balance + converted };
      }
      return acc;
    });

    setAccounts(updatedAccounts);

    const transaction = {
      id: Date.now(),
      from,
      to,
      amount,
      fromCurrency: fromAccount.currency,
      toCurrency: toAccount.currency,
      fxRate: fxRate.toFixed(2),
      converted,
      note,
      date: futureDate || localDateString,
      future: !!futureDate && futureDate !== localDateString,
    };

    setTransactions([transaction, ...transactions]);

    toast.success(`Transfer of ${amount} ${fromAccount.currency} successful`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Treasury Movement Simulator</h1>
      <AccountList accounts={accounts} />
      <TransferForm accounts={accounts} onTransfer={handleTransfer} />
      <TransactionLog transactions={transactions} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default App;
