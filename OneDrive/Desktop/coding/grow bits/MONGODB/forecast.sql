{
  "_id": { "$oid": "..." },
  "userId": { "$oid": "..." },
  "horizonDays": 30,
  "currency": "INR",
  "model": {
    "name": "securefin-lstm-v2",
    "version": "2.1.0",
    "features": ["seasonality", "income_variance", "expense_trend", "budget_pressure"]
  },
  "prediction": {
    "expectedBalance": 1200.0,
    "shortfallRisk": 0.62,        // 0..1
    "shortfallDate": { "$date": "2025-12-18T00:00:00Z" },
    "explanations": [
      { "factor": "rent", "impact": -0.25 },
      { "factor": "income_delay", "impact": -0.18 }
    ]
  },
  "generatedAt": { "$date": "2025-11-27T13:00:00Z" }
}
