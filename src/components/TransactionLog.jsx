import { useState } from 'react';

function TransactionLog({ transactions }) {
  const [filterAccount, setFilterAccount] = useState('');
  const [filterCurrency, setFilterCurrency] = useState('');
  const [showAll, setShowAll] = useState(true);

  const filtered = showAll
    ? transactions
    : transactions.filter((txn) => {
        return (
          (filterAccount === '' || txn.from === filterAccount || txn.to === filterAccount) &&
          (filterCurrency === '' || txn.fromCurrency === filterCurrency || txn.toCurrency === filterCurrency)
        );
      });

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Transaction Log</h2>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          />
          <span>Show All Logs</span>
        </label>

        {!showAll && (
          <>
            <select
              className="p-2 border rounded"
              value={filterAccount}
              onChange={(e) => setFilterAccount(e.target.value)}
            >
              <option value="">Filter by Account</option>
              {[...new Set(transactions.flatMap((txn) => [txn.from, txn.to]))].map((acc) => (
                <option key={acc} value={acc}>{acc}</option>
              ))}
            </select>

            <select
              className="p-2 border rounded"
              value={filterCurrency}
              onChange={(e) => setFilterCurrency(e.target.value)}
            >
              <option value="">Filter by Currency</option>
              {[...new Set(transactions.flatMap((txn) => [txn.fromCurrency, txn.toCurrency]))].map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">From</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">FX Rate</th>
              <th className="p-2 border">Converted</th>
              <th className="p-2 border">Note</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="7" className="p-4 text-center">No transactions found</td></tr>
            ) : (
              filtered.map((txn) => (
                <tr key={txn.id}>
                  <td className="p-2 border">{txn.date}</td>
                  <td className="p-2 border">{txn.from} ({txn.fromCurrency})</td>
                  <td className="p-2 border">{txn.to} ({txn.toCurrency})</td>
                  <td className="p-2 border">{txn.amount} {txn.fromCurrency}</td>
                  <td className="p-2 border">
                    {txn.fromCurrency !== txn.toCurrency ? txn.fxRate : 'N/A'}
                  </td>
                  <td className="p-2 border">
                    {txn.fromCurrency !== txn.toCurrency
                      ? `${txn.converted.toFixed(2)} ${txn.toCurrency}`
                      : 'N/A'}
                  </td>
                  <td className="p-2 border">
                    {txn.note || '—'}
                    {txn.future && (
                      <span className="ml-2 text-xs text-yellow-600">(Scheduled)</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionLog;
