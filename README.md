# IP Address Management System (IPAM)

A comprehensive internal dashboard for managing network infrastructure IP allocations across banking operations.

## 🎯 Problem

Managing IP addresses in a large banking network with hundreds of branches, ATMs, and distributed systems is complex and error-prone:

- **IP Address Conflicts**: Manual IP allocation leads to conflicts and network outages
- **Poor Visibility**: No centralized view of IP usage across districts, branches, and ATMs
- **Inefficient Resource Management**: Difficulty tracking which IPs are leased, available, or reserved
- **Security Risks**: Lack of audit trails and role-based access control
- **Scalability Issues**: Managing LAN and tunnel IP ranges across multiple clusters and districts

## ✅ Solution

IPAM provides a centralized, web-based dashboard that solves these challenges with:

- **Centralized IP Management**: Single source of truth for all IP allocations
- **Automated Conflict Prevention**: System prevents duplicate IP assignments
- **Real-time Visibility**: Dashboard showing IP usage across all locations and devices
- **Role-Based Access Control**: Secure access with different permission levels
- **Audit Trail**: Complete tracking of IP assignments and changes
- **Efficient Resource Utilization**: Automated IP leasing for branches and ATMs

## 🌟 Key Features

### IP Range Management
- Define and manage LAN IP ranges for different districts and clusters
- Configure tunnel IP ranges for secure inter-branch connectivity
- Automatic IP pool generation from defined ranges

### Device Management
- Track IP assignments for branches and ATMs
- Automated lease management with conflict detection
- Location-based IP allocation (district → branch → ATM)

### User Management
- Role-based access control (Admin, Manager, User)
- Secure authentication with NextAuth
- Audit logging for all IP changes

### Administrative Tools
- Bulk IP operations and management
- Real-time dashboards and reporting
- Database-backed with full audit history

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Backend**: tRPC for type-safe APIs
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with role-based access
- **Styling**: Tailwind CSS with shadcn/ui components
- **Validation**: Zod for schema validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/dayOneAbu/IPAM.git
cd ip-watcher

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and auth secrets
```

### Database Setup

```bash
# Push schema to database
pnpm run db:push

# (Optional) Open Prisma Studio to view data
pnpm run db:studio
```

### Development

```bash
# Start development server
pnpm run dev
```

Visit `http://localhost:3000` to access the application.

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm run db:push` | Push schema to database |
| `pnpm run db:migrate` | Create and run migrations |
| `pnpm run db:studio` | Open Prisma Studio |
| `pnpm run lint` | Run ESLint |

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ipam_db"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Skip env validation during builds
SKIP_ENV_VALIDATION=1
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (routes)/          # Main application routes
│   ├── api/               # API routes (NextAuth)
│   └── _components/       # Shared UI components
├── server/
│   ├── api/               # tRPC routers and configuration
│   ├── auth.ts            # Authentication logic
│   └── db.ts              # Database connection
├── trpc/                  # tRPC client configuration
└── lib/                   # Utility functions
```

## 🔐 Authentication & Authorization

The system uses role-based access control with three main roles:

- **Admin**: Full system access, user management
- **Manager**: District/cluster management, IP range oversight
- **User**: Read-only access, limited IP management

## 📊 Database Schema

Key entities managed by the system:

- **Users**: System users with roles and permissions
- **Clusters**: Geographic groupings of districts
- **Districts**: Regional administrative divisions
- **Branches**: Physical bank locations
- **ATMs**: Automated teller machines
- **LAN Ranges**: IP address ranges for local networks
- **Tunnel Ranges**: IP ranges for secure connections
- **IP Pools**: Individual assignable IP addresses
- **Leases**: IP address assignments to devices/locations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software for internal banking operations.

## 🆘 Support

For support or questions, please contact the IT infrastructure team.
