{
  "_id": { "$oid": "..." },
  "userId": { "$oid": "..." },
  "name": "Monthly Essentials",
  "category": "utilities",
  "amount": 3000,
  "currency": "INR",
  "period": {
    "type": "monthly",           // weekly | monthly | quarterly | yearly | custom
    "start": { "$date": "2025-11-01T00:00:00Z" },
    "end": { "$date": "2025-11-30T23:59:59Z" }
  },
  "rollover": true,
  "spent": 2450.5,
  "alerts": {
    "thresholds": [0.5, 0.8, 1.0], // 50%, 80%, 100%
    "lastAlertAt": { "$date": "2025-11-25T08:00:00Z" }
  },
  "createdAt": { "$date": "2025-10-25T09:00:00Z" }
}
