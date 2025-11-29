{
  "_id": { "$oid": "..." },
  "userId": { "$oid": "..." },
  "type": "expense",             // income | expense | transfer | fee | adjustment
  "sourceId": { "$oid": "..." }, // optional: incomeSources._id or linkedAccounts entry
  "fromAccount": {
    "kind": "wallet",            // wallet | bank | external | virtual
    "address": "0xabc123...",
    "network": "Polygon"
  },
  "toAccount": {
    "kind": "external",
    "identifier": "upi:friend@bank",
    "network": "UPI"
  },
  "amount": 350.75,
  "currency": "INR",
  "fx": {
    "base": "INR",
    "quote": "USDT",
    "rate": 0.0121,
    "at": { "$date": "2025-11-27T09:30:00Z" }
  },
  "category": "food",            // food | rent | transport | education | savings | utilities | health | entertainment | other
  "tags": ["mess", "hostel"],
  "date": { "$date": "2025-11-27T12:45:00Z" },
  "status": "confirmed",         // pending | confirmed | failed | reversed
  "p2p": {
    "kind": "internal",          // internal (within SecureFin) | external
    "peerUserId": { "$oid": "..." },
    "memo": "Lunch share"
  },
  "blockchain": {
    "network": "Polygon",
    "txHash": "0x9f...",
    "anchorHash": "0xledgerHash",  // hash of normalized transaction record
    "blockNumber": 5678901,
    "anchoredAt": { "$date": "2025-11-27T12:46:10Z" },
    "status": "onchain"            // pending | onchain | failed
  },
  "audit": {
    "version": 3,
    "prevHash": "0xprev...",
    "sig": "ed25519:...",
    "immutable": true
  },
  "createdAt": { "$date": "2025-11-27T12:45:30Z" },
  "updatedAt": { "$date": "2025-11-27T12:46:20Z" }
}
