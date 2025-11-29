{
  "_id": { "$oid": "..." },
  "email": "user@example.com",
  "phone": "+91XXXXXXXXXX",
  "passwordHash": "argon2id$...",
  "status": "active",               // active | blocked | pending
  "kyc": {
    "status": "verified",           // unverified | pending | verified | rejected
    "provider": "Onfido",
    "referenceId": "KYC-REF-123",
    "updatedAt": { "$date": "2025-11-25T10:00:00Z" }
  },
  "security": {
    "mfaEnabled": true,
    "recoveryMethods": ["email"],
    "allowedDevices": [
      { "deviceId": "hash", "lastSeen": { "$date": "2025-11-27T08:00:00Z" } }
    ]
  },
  "profile": {
    "name": "Aarav Sharma",
    "country": "IN",
    "currency": "INR",
    "dob": "1999-04-12"
  },
  "wallets": [
    {
      "type": "custodial",          // custodial | non-custodial
      "network": "Polygon",
      "address": "0xabc123...",
      "publicKey": "0x...",
      "createdAt": { "$date": "2025-11-20T11:00:00Z" },
      "default": true
    }
  ],
  "linkedAccounts": [
    {
      "type": "bank",
      "provider": "UPI",
      "accountId": "upi:user@bank",
      "status": "linked",
      "metadata": { "bankName": "HDFC" }
    }
  ],
  "createdAt": { "$date": "2025-11-20T11:00:00Z" },
  "updatedAt": { "$date": "2025-11-27T11:00:00Z" }
}
