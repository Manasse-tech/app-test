# NSUG Platform

Projet monorepo d’architecture e-commerce enterprise avec Next.js, services backend, Docker et infrastructure IaC.

## Démarrage rapide

### Prérequis
- Node.js 20+
- npm 10+
- Docker Desktop

### Installation
```bash
npm install
docker compose up -d
npm run dev -- --filter=web
```

### Accès local
- Application web : http://localhost:3000
- PostgreSQL : localhost:5432
- Redis : localhost:6379

### Script Windows
```powershell
./start.ps1
```

## Structure du projet
- apps/web : application frontend Next.js
- services/* : microservices backend
- packages/* : bibliothèques partagées
- infrastructure/* : Terraform, monitoring, GitOps
