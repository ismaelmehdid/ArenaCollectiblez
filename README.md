# ArenaCollectiblez

ArenaCollectiblez is a fan engagement platform that transforms sports events into collectible NFT experiences. Fans scan tickets or find hidden QR codes to unlock loot boxes, collect team-based NFTs, and join raffles — all integrated with the **Socios Wallet** and **Chiliz blockchain**.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/redarling/ArenaCollectiblez.git
cd ArenaCollectiblez
pnpm i
```

### Start Local Instance with Docker
Make sure Docker is running, then:
```bash
./init_local_instance.sh
```

### Create .env File
In the root of the project, create a .env file with the following contents:
```bash
# WalletConnect
NEXT_PUBLIC_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID

# Local PostgreSQL database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres?search_path=drizzle,public
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_DB=postgres

# Smart contract & Chiliz RPC
SPICY_RPC_URL=https://spicy-rpc.chiliz.com/
SMART_CONTRACT_ADDR=0xaF6AAb8aD86Cf596472491e308547a0b711B9df3

# Pinata (IPFS file storage)
PINATA_API_KEY=YOUR_PINATA_API_KEY
PINATA_SECRET_API_KEY=YOUR_PINATA_SECRET_API_KEY
PINATA_JWT=YOUR_PINATA_JWT

# Loot box secret (for secure claim generation)
LOOT_BOX_SECRET="6C824CF7FDBD0EA5E2E5685040518695037C2D9621CE0354B2664E0209688959"

# Pusher (for real-time updates)
PUSHER_APP_ID=YOUR_PUSHER_APP_ID
PUSHER_APP_KEY=YOUR_PUSHER_APP_KEY
PUSHER_APP_SECRET=YOUR_PUSHER_APP_SECRET
PUSHER_APP_CLUSTER=YOUR_PUSHER_CLUSTER

NEXT_PUBLIC_PUSHER_APP_KEY=YOUR_PUSHER_APP_KEY
NEXT_PUBLIC_PUSHER_APP_CLUSTER=YOUR_PUSHER_CLUSTER

# App base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

```

🔑 Where to Get Credentials

WalletConnect Project ID
https://cloud.walletconnect.com/
Pinata API Keys (for IPFS file uploads)
https://app.pinata.cloud/
Pusher Keys (for real-time features)
https://pusher.com/

### Run 
```bash
pnpm run dev
```

### Access website
```bash
http://localhost:3000
```

### Ticket example
<img width="1022" height="1318" alt="ticket" src="https://github.com/user-attachments/assets/4f5ea300-f3f0-49e6-9a56-6098fb13fde0" />


### Tip: Use ngrok to access to the website from mobile to scan a ticket
