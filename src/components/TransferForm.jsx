import { useState } from 'react';

function TransferForm({ accounts, onTransfer }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [futureDate, setFutureDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to || !amount || from === to) {
      alert('Invalid transfer data');
      return;
    }

    onTransfer({ from, to, amount: parseFloat(amount), note, futureDate });
    setAmount('');
    setNote('');
    setFutureDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Transfer Funds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select className="p-2 border rounded" value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="">From Account</option>
          {accounts.map((acc) => (
            <option key={acc.name} value={acc.name}>
              {acc.name} ({acc.currency})
            </option>
          ))}
        </select>

        <select className="p-2 border rounded" value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">To Account</option>
          {accounts.map((acc) => (
            <option key={acc.name} value={acc.name}>
              {acc.name} ({acc.currency})
            </option>
          ))}
        </select>

        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          type="date"
          className="p-2 border rounded"
          value={futureDate}
          onChange={(e) => setFutureDate(e.target.value)}
        />
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Transfer
      </button>
    </form>
  );
}

export default TransferForm;
