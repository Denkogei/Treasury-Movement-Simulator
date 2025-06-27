import { useState } from 'react';

function TransferForm({ accounts, onTransfer }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [simulationOption, setSimulationOption] = useState('0'); // 0 = Today

  // Compute the actual date based on simulationOption
  const computedDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(simulationOption));
    return date.toLocaleDateString('en-CA');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const futureDateString = computedDate();

    onTransfer({
      from,
      to,
      amount: parseFloat(amount),
      note,
      futureDate: futureDateString,
    });

    // Reset form
    setFrom('');
    setTo('');
    setAmount('');
    setNote('');
    setSimulationOption('0');
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Transfer Funds</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">From Account</label>
          <select
            className="w-full p-2 border rounded"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.name} value={acc.name}>
                {acc.name} ({acc.currency}) - {acc.balance.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">To Account</label>
          <select
            className="w-full p-2 border rounded"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          >
            <option value="">Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.name} value={acc.name}>
                {acc.name} ({acc.currency}) - {acc.balance.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div>
          <label className="block mb-1">Note (Optional)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Simulate Transfer Date</label>
          <select
            className="w-full p-2 border rounded"
            value={simulationOption}
            onChange={(e) => setSimulationOption(e.target.value)}
          >
            <option value="0">Today</option>
            <option value="1">Tomorrow</option>
            <option value="3">In 3 Days</option>
            <option value="7">In 7 Days</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Will process on: <span className="font-medium">{computedDate()}</span>
          </p>
        </div>

        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit Transfer
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransferForm;
