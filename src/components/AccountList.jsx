function AccountList({ accounts }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Accounts</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {accounts.map((acc) => (
          <div key={acc.name} className="p-4 bg-white rounded shadow">
            <div className="font-bold">{acc.name}</div>
            <div>{acc.currency}</div>
            <div className="text-green-600 font-semibold">
              {acc.balance.toLocaleString()} {acc.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountList;
