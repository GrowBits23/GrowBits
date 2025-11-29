{
  "_id": { "$oid": "..." },
  "transferCode": "TRF-2025-000123", // unique human-friendly code
  "senderUserId": { "$oid": "..." },
  "receiverUserId": { "$oid": "..." },
  "amount": 500,
  "currency": "INR",
  "fee": 0,
  "memo": "Rent split",
  "settlement": {
    "mode": "internal",            // internal | upi | onchain
    "network": "Polygon",
    "status": "settled",           // pending | settled | failed | reversed
    "txHash": "0xabc...",
    "settledAt": { "$date": "2025-11-26T16:20:00Z" }
  },
  "linkedTransactionIds": [
    { "$oid": "..." },             // references to Transactions
    { "$oid": "..." }
  ],
  "createdAt": { "$date": "2025-11-26T16:15:00Z" }
}
