export const initialAccounts = [
  { name: 'Mpesa_KES_1', currency: 'KES', balance: 100000 },
  { name: 'Bank_KES_2', currency: 'KES', balance: 80000 },
  { name: 'Wallet_KES_3', currency: 'KES', balance: 60000 },
  { name: 'Mpesa_USD_1', currency: 'USD', balance: 1000 },
  { name: 'Bank_USD_2', currency: 'USD', balance: 2000 },
  { name: 'Wallet_USD_3', currency: 'USD', balance: 3000 },
  { name: 'Mpesa_NGN_1', currency: 'NGN', balance: 500000 },
  { name: 'Bank_NGN_2', currency: 'NGN', balance: 200000 },
  { name: 'Wallet_NGN_3', currency: 'NGN', balance: 100000 },
  { name: 'Safe_KES_4', currency: 'KES', balance: 40000 },
];

export const exchangeRates = {
  KES: { USD: 0.0067, NGN: 4.6, KES: 1 },
  USD: { KES: 150, NGN: 700, USD: 1 },
  NGN: { USD: 0.0014, KES: 0.22, NGN: 1 },
};
