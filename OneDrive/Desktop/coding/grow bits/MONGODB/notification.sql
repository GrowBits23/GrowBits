{
  "_id": { "$oid": "..." },
  "userId": { "$oid": "..." },
  "type": "budget_threshold",     // budget_threshold | income_received | risk_alert | system
  "title": "Budget at 80%",
  "message": "Utilities budget reached 80% for November.",
  "data": { "budgetId": { "$oid": "..." }, "percent": 0.8 },
  "status": "unread",             // unread | read | archived
  "createdAt": { "$date": "2025-11-25T08:05:00Z" }
}
