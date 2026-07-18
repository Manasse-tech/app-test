# 🚀 NSUG — PROMPT ULTIME BASE44 v3.0

## Stack Licorne Tech × Architecture Enterprise × IA Avancée

---

> **Tu es une task force technologique d'élite mondiale** — 100+ ingénieurs seniors issus de
> GAFAM, Stripe, Shopify, OpenAI, Vercel, HashiCorp, Confluent et Cloudflare.
> Budget illimité. Zéro compromis. Zéro version simplifiée.
> Le résultat doit impressionner un CTO de licorne tech, un architecte cloud senior,
> un investisseur Series B et un ML Engineer expert.

**Produit à créer :** `NSUG` — Plateforme e-commerce enterprise-grade + marketplace
multi-vendeurs + SaaS multi-tenant, optimisée Afrique et marché international.

**Standard de qualité cible :** Shopify × Amazon × Stripe × OpenAI × Apple — combinés.

---

## 🧠 RÔLES ACTIFS SIMULTANÉMENT

| Domaine          | Rôles                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Architecture** | Cloud Architect (AWS/GCP/Azure), Microservices Architect, Platform Engineer, FinOps Engineer |
| **IA/ML**        | ML Engineer (TensorFlow/PyTorch), NLP/LLM Expert, MLOps Engineer, AI Agents Orchestrator     |
| **Frontend**     | Tech Lead Next.js, Design System Expert, Accessibility Lead, WebAssembly Engineer            |
| **Backend**      | NestJS Expert, Event Sourcing/CQRS Architect, API Gateway Expert, gRPC Specialist            |
| **DevOps**       | SRE Lead, CI/CD Expert, OpenTelemetry Engineer, FinOps Analyst                               |
| **Sécurité**     | CISO, Zero-Trust Architect, Pentester OWASP, PCI-DSS Compliance Expert                       |
| **Produit**      | PM E-commerce, UX/UI Senior, Growth Expert, Marketplace Strategist                           |
| **Data**         | Data Engineer, Vector DB Specialist, RAG Architect, Real-time Analytics Expert               |

---

## 📐 SECTION 1 — ARCHITECTURE GLOBALE

### 1.1 Principes Fondamentaux

Appliquer **simultanément** :

```
✅ Clean Architecture (Dependency Inversion absolue)
✅ Domain Driven Design (Bounded Contexts stricts)
✅ Event Sourcing (immutable event log comme source de vérité)
✅ CQRS (Command Query Responsibility Segregation)
✅ Hexagonal Architecture (Ports & Adapters par domaine)
✅ Event Driven Architecture (async-first)
✅ BFF Architecture (Backend For Frontend par surface)
✅ API-First (OpenAPI contract avant implémentation)
✅ Zero-Trust Security (jamais de confiance implicite)
✅ Observability-First (traces/metrics/logs dès le jour 1)
```

### 1.2 Topologie des Services

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTS                              │
│  Next.js Web  |  Flutter Mobile  |  Admin Dashboard    │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              EDGE LAYER (Cloudflare/Vercel Edge)        │
│  Edge Functions  |  AI Caching  |  WAF  |  DDoS        │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                 BFF LAYER                               │
│  BFF Web  |  BFF Mobile  |  BFF Admin  |  BFF Partner  │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              API GATEWAY (Kong / Traefik)               │
│  Auth  |  Rate Limiting  |  Circuit Breaker  |  Routing │
└───────────┬───────────────────────────┬─────────────────┘
            │                           │
┌───────────▼───────────┐   ┌───────────▼───────────────┐
│   COMMAND SIDE (CQRS) │   │    QUERY SIDE (CQRS)      │
│   NestJS + Event Bus  │   │   Read Models + Redis     │
└───────────┬───────────┘   └───────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────────┐
│              EVENT STORE (Kafka + EventStoreDB)           │
│  Event Sourcing  |  Event Replay  |  Audit Log complet   │
└──────────────────────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────────┐
│              MICROSERVICES DOMAINES                       │
│  Auth  |  Catalogue  |  Orders  |  Payment  |  Search   │
│  Notifications  |  Recommendations  |  Analytics         │
│  Inventory  |  Vendors  |  Media  |  Shipping  |  AI    │
└──────────────────────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────────┐
│              DATA LAYER                                   │
│  PostgreSQL (transactionnel) | MongoDB (documents)        │
│  Redis (cache) | Elasticsearch (search)                   │
│  Qdrant/Pinecone (Vector DB) | ClickHouse (analytics)    │
└──────────────────────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────────┐
│           MULTI-CLOUD INFRASTRUCTURE                      │
│  Primary: AWS eu-west-1  |  Failover: GCP europe-west1   │
│  CDN: Cloudflare  |  Edge: Vercel Edge Network           │
└──────────────────────────────────────────────────────────┘
```

### 1.3 Monorepo — TurboRepo / NX

```
nsug/
├── apps/
│   ├── web/                    # Next.js 14+ (App Router)
│   ├── mobile/                 # Flutter 3.x
│   ├── admin/                  # Next.js (dashboard)
│   ├── bff-web/                # BFF Web (Node.js/NestJS)
│   ├── bff-mobile/             # BFF Mobile
│   ├── bff-admin/              # BFF Admin
│   └── bff-partner/            # BFF Vendeurs
├── services/
│   ├── auth-service/
│   ├── catalogue-service/
│   ├── order-service/
│   ├── payment-service/
│   ├── search-service/
│   ├── recommendation-service/
│   ├── notification-service/
│   ├── inventory-service/
│   ├── vendor-service/
│   ├── media-service/
│   ├── shipping-service/
│   └── ai-orchestrator/
├── packages/
│   ├── ui/                     # Design System partagé
│   ├── events/                 # Event schemas (CloudEvents)
│   ├── contracts/              # OpenAPI + Proto definitions
│   ├── utils/                  # Utilitaires partagés
│   ├── config/                 # Configs ESLint, TS, etc.
│   └── monitoring/             # OpenTelemetry setup partagé
├── infrastructure/
│   ├── terraform/              # IaC multi-cloud
│   ├── kubernetes/             # Helm charts
│   ├── ci-cd/                  # GitHub Actions workflows
│   └── scripts/
├── docs/
│   ├── architecture/
│   ├── api/
│   └── runbooks/
├── turbo.json
└── nx.json
```

**TurboRepo config :**

```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "test": { "dependsOn": ["build"] },
    "lint": {},
    "type-check": {}
  },
  "remoteCache": { "enabled": true }
}
```

---

## 🎨 SECTION 2 — FRONTEND PREMIUM

### 2.1 Technologies

```
- Next.js 14+ (App Router, RSC, Server Actions)
- React 18+ (Suspense, Concurrent Mode, Transitions)
- TypeScript 5+ (strict mode, zero `any`)
- Tailwind CSS 4.0 + shadcn/ui + Radix UI
- Framer Motion (animations déclaratives)
- Zustand (store global léger)
- TanStack Query v5 (server state)
- React Hook Form + Zod (validation)
- next-intl (i18n)
- Storybook 8 (design system)
```

### 2.2 WebAssembly Optimizations

Utiliser WASM pour les opérations CPU-intensives côté client :

```typescript
// Exemple : calcul de prix promotionnels complexes en WASM
// packages/wasm-engine/ (Rust → WASM via wasm-pack)
import init, { calculateBestPrice } from '@nsug/wasm-engine';

await init();
const optimalPrice = calculateBestPrice(basePrice, rules, userSegment);

// Autres cas WASM :
// - Compression images côté client avant upload
// - Parsing CSV bulk import vendeurs
// - Chiffrement données sensibles avant transit
// - Rendu virtuel listes de 100k+ produits
```

### 2.3 Feature Flags

```typescript
// packages/feature-flags/ — intégration LaunchDarkly / OpenFeature
import { useFeatureFlag } from '@nsug/feature-flags';

// Dans un composant :
const isAISearchEnabled = useFeatureFlag('ai-semantic-search');
const isNewCheckoutEnabled = useFeatureFlag('checkout-v2', {
  userSegment: user.segment,
  country: user.country,
});

// Feature flags utilisés pour :
// - Canary deployments progressifs
// - A/B tests produit
// - Kill switches sécurité
// - Progressive rollout par région
// - Features premium par plan SaaS
```

### 2.4 Design System & UI

**Inspirations :** Apple Store × Linear × Stripe × Nike × Vercel

**Palette NSUG :**

```css
:root {
  --nsug-obsidian: #0a0a0f;
  --nsug-gold: #c9a84c;
  --nsug-gold-light: #f0d080;
  --nsug-electric: #00d4ff;
  --nsug-surface: #12121a;
  --nsug-border: rgba(255, 255, 255, 0.08);
}
```

**UI patterns à implémenter :**

- Glassmorphism avec backdrop-filter
- Neumorphism subtil sur dark background
- Micro-interactions Framer Motion sur chaque action
- Skeleton loading avec shimmer animation
- Infinite scroll avec IntersectionObserver
- Drag & drop natif (dnd-kit)
- Dark mode système (prefers-color-scheme) + toggle
- RTL support (arabe/Maghreb)
- WCAG 2.1 AA partout
- Gestures mobile (swipe, pinch-to-zoom produit)

---

## ⚙️ SECTION 3 — EVENT SOURCING & CQRS

### 3.1 Event Sourcing

```typescript
// services/order-service/src/domain/events/order.events.ts
export interface OrderCreated extends DomainEvent {
  type: 'ORDER_CREATED';
  payload: {
    orderId: string;
    customerId: string;
    items: OrderItem[];
    totalAmount: Money;
    currency: 'XOF' | 'EUR' | 'USD';
  };
}

export interface OrderPaid extends DomainEvent {
  type: 'ORDER_PAID';
  payload: {
    orderId: string;
    paymentMethod: 'STRIPE' | 'MTN_MOMO' | 'ORANGE_MONEY' | 'WAVE';
    transactionId: string;
    amount: Money;
  };
}

// Event Store : EventStoreDB + Kafka comme transport
// Chaque agrégat = stream d'événements immuables
// Replay possible pour reconstruire n'importe quel état
// Audit log natif et complet
```

### 3.2 CQRS

```typescript
// COMMAND SIDE — NestJS CQRS module
@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    const order = Order.create(command);
    await this.orderRepo.save(order);
    order.getUncommittedEvents().forEach((e) => this.eventBus.publish(e));
  }
}

// QUERY SIDE — Read models optimisés (dénormalisés)
@QueryHandler(GetOrdersByCustomerQuery)
export class GetOrdersByCustomerHandler {
  constructor(private readonly readDb: ReadOnlyOrderRepository) {}

  async execute(query: GetOrdersByCustomerQuery) {
    // Lit depuis un read model Redis/PostgreSQL optimisé
    return this.readDb.findByCustomer(query.customerId, query.pagination);
  }
}
```

### 3.3 Hexagonal Architecture par Service

```
order-service/
├── src/
│   ├── domain/          # Entités, Value Objects, Domain Events
│   │   ├── order.aggregate.ts
│   │   ├── order.events.ts
│   │   └── order.repository.interface.ts
│   ├── application/     # Commands, Queries, Handlers, DTOs
│   │   ├── commands/
│   │   ├── queries/
│   │   └── sagas/
│   ├── infrastructure/  # Adapters (DB, Kafka, HTTP)
│   │   ├── persistence/
│   │   ├── messaging/
│   │   └── http/
│   └── ports/           # Interfaces (driven & driving)
│       ├── inbound/     # REST, gRPC, Message Consumer
│       └── outbound/    # DB, Message Producer, External APIs
```

---

## 🤖 SECTION 4 — AI AVANCÉE

### 4.1 AI Agents Orchestration

```typescript
// services/ai-orchestrator/ — Multi-agent système
// Framework : LangGraph ou AutoGen

interface NSUGAgentOrchestrator {
  agents: {
    // Agent recherche produits
    searchAgent: {
      tools: ['vector_search', 'elasticsearch', 'reranking'];
      model: 'claude-3-5-sonnet';
    };
    // Agent recommandations personnalisées
    recommendationAgent: {
      tools: ['user_history', 'collaborative_filter', 'vector_similarity'];
      model: 'gpt-4o-mini'; // coût optimisé pour inférence fréquente
    };
    // Agent support client
    supportAgent: {
      tools: ['order_lookup', 'product_info', 'return_initiation', 'escalate'];
      model: 'claude-3-5-sonnet';
      fallback: 'human_handoff';
    };
    // Agent pricing dynamique
    pricingAgent: {
      tools: ['competitor_prices', 'demand_forecast', 'inventory_level'];
      model: 'gpt-4o';
      schedule: 'every_15_minutes';
    };
    // Agent fraude
    fraudAgent: {
      tools: ['transaction_history', 'device_fingerprint', 'ip_reputation'];
      model: 'fine-tuned-fraud-detector';
      latency_budget: '50ms'; // décision temps réel
    };
  };
}

// Agentic Workflows — orchestration longue durée
// Exemple : onboarding vendeur automatique
const vendorOnboardingWorkflow = new AgenticWorkflow({
  steps: [
    'document_extraction_agent', // OCR + extraction info
    'kyc_verification_agent', // vérification identité
    'business_validation_agent', // validation légale
    'risk_scoring_agent', // score de risque
    'onboarding_completion_agent', // setup compte + config
  ],
  timeout: '24h',
  retryPolicy: 'exponential_backoff',
});
```

### 4.2 Vector Database & RAG Architecture

```typescript
// Vector DB : Qdrant (self-hosted) ou Pinecone (managed)
// Dimensions : 1536 (OpenAI) ou 1024 (Cohere)

// RAG pour recherche produits
interface NSUGRAGPipeline {
  // 1. INDEXATION (offline)
  indexing: {
    source: 'product_catalog + reviews + descriptions';
    chunking: 'semantic_chunking'; // pas de fixed-size chunks
    embedding_model: 'text-embedding-3-large';
    metadata: ['category', 'price_range', 'vendor', 'stock', 'rating'];
    update_strategy: 'incremental_on_product_change';
  };

  // 2. RETRIEVAL (temps réel)
  retrieval: {
    query_embedding: 'embed user query';
    search: 'hybrid (dense + sparse BM25)'; // meilleur des 2 mondes
    top_k: 20;
    reranking: 'Cohere Rerank v3'; // après retrieval
    final_k: 5;
  };

  // 3. GÉNÉRATION
  generation: {
    model: 'claude-3-5-sonnet';
    prompt: 'search_results + user_context + query';
    output: 'ranked_products + explanation + suggestions';
  };
}

// RAG pour support client
// Knowledge base : FAQs + politiques + docs produits
// Retrieval : recherche dans base de connaissances
// Génération : réponse personnalisée au contexte commande
```

### 4.3 AI Caching Strategy

```typescript
// Cache sémantique pour éviter re-inférence sur requêtes similaires
// Solution : GPTCache ou implémentation custom avec Qdrant

interface AICachingStrategy {
  // Cache L1 : exact match (Redis, TTL 1h)
  exactCache: {
    key: 'sha256(prompt + model + params)';
    ttl: 3600;
  };

  // Cache L2 : semantic similarity (Qdrant, seuil cosine > 0.95)
  semanticCache: {
    embed_query: true;
    similarity_threshold: 0.95;
    ttl: 86400; // 24h
    // "Iphone 14 rouge pas cher" ≈ "iPhone 14 couleur rouge prix bas"
    // → même résultat sans réinférence
  };

  // Cache L3 : résultats de recommandation par segment (Redis)
  recommendationCache: {
    key: 'user_segment + category + context';
    ttl: 900; // 15 minutes
    invalidation: 'on_purchase OR on_stock_change';
  };

  // Économies estimées : 60-80% de réduction des appels LLM
}
```

---

## 🏗️ SECTION 5 — DEVOPS AVANCÉ

### 5.1 Canary Deployments

```yaml
# kubernetes/deployments/web-canary.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: nsug-web
spec:
  strategy:
    canary:
      steps:
        - setWeight: 5 # 5% du trafic → nouvelle version
        - pause: { duration: 10m }
        - analysis: # Métriques automatiques
            templates:
              - templateName: error-rate-analysis
              - templateName: latency-analysis
        - setWeight: 25 # Si OK → 25%
        - pause: { duration: 30m }
        - setWeight: 50
        - pause: { duration: 1h }
        - setWeight: 100 # Promotion complète
      trafficRouting:
        nginx:
          stableIngress: nsug-web-stable
      analysis:
        successCondition: 'result[0] < 0.01' # error rate < 1%
```

### 5.2 Multi-Cloud Failover

```terraform
# infrastructure/terraform/multi-cloud.tf

# PRIMARY : AWS (eu-west-1 — Europe/Irlande)
module "primary_cluster" {
  source = "./modules/aws-eks"
  region = "eu-west-1"
  min_nodes = 3
  max_nodes = 50
}

# SECONDARY : GCP (europe-west1 — Belgique)
module "failover_cluster" {
  source = "./modules/gcp-gke"
  region = "europe-west1"
  min_nodes = 2
  max_nodes = 30
}

# DNS Failover : Cloudflare Load Balancer
resource "cloudflare_load_balancer" "nsug_global" {
  name = "nsug-global-lb"
  fallback_pool_id = cloudflare_load_balancer_pool.gcp.id
  default_pool_ids = [cloudflare_load_balancer_pool.aws.id]

  rules {
    name = "health-check-failover"
    condition = "http.request.uri.path ne \"/health\""
    overrides {
      # Bascule automatique si AWS health check fail 2x
      fallback_pool_id = cloudflare_load_balancer_pool.gcp.id
    }
  }
}

# RTO (Recovery Time Objective) : < 60 secondes
# RPO (Recovery Point Objective) : < 5 minutes
# Stratégie données : CockroachDB multi-région OU PostgreSQL streaming replication
```

### 5.3 Edge Functions

```typescript
// Cloudflare Workers / Vercel Edge Functions
// apps/web/middleware.ts

export const config = { matcher: ['/((?!_next|api).*)'] };

export default async function middleware(request: NextRequest) {
  // 1. Géolocalisation instantanée (edge, < 5ms)
  const country = request.geo?.country ?? 'CI';
  const currency = getCurrencyForCountry(country); // XOF, EUR, USD...

  // 2. Feature flags à l'edge (sans roundtrip backend)
  const flags = await getEdgeFeatureFlags(request);

  // 3. A/B test assignment à l'edge
  const variant = assignABVariant(request, 'checkout-v2');

  // 4. Auth JWT vérification à l'edge (Vercel Edge Runtime)
  const token = await verifyEdgeJWT(request.cookies.get('auth-token'));

  // 5. Personnalisation headers
  const response = NextResponse.next();
  response.headers.set('x-currency', currency);
  response.headers.set('x-ab-variant', variant);
  response.headers.set('x-country', country);

  return response;
}

// Edge Functions utilisées pour :
// - Redirection géographique (FCFA markets vs EUR)
// - Personnalisation sans cold start
// - Rate limiting distribué
// - Bot detection (Cloudflare Turnstile)
// - Image optimization on-the-fly
```

---

## 📊 SECTION 6 — OBSERVABILITY & DISTRIBUTED TRACING

### 6.1 OpenTelemetry — Setup Universel

```typescript
// packages/monitoring/src/otel.ts
// Instrumenter TOUS les services de façon identique

import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';

export function initTelemetry(serviceName: string) {
  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]: process.env.APP_VERSION,
      'deployment.environment': process.env.NODE_ENV,
      'cloud.region': process.env.CLOUD_REGION,
    }),
    traceExporter: new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    }),
    spanProcessor: new BatchSpanProcessor(traceExporter),
    instrumentations: [
      getNodeAutoInstrumentations(), // HTTP, gRPC, DB, Redis auto
    ],
  });

  sdk.start();
}

// Collector : OpenTelemetry Collector → Grafana Tempo
// Metrics : Prometheus → Grafana
// Logs : Loki → Grafana
// Traces : Tempo → Grafana

// Grafana stack unifiée :
// - 1 dashboard par service
// - 1 dashboard "golden signals" global (latency, traffic, errors, saturation)
// - Alerting sur SLOs définis
```

### 6.2 SLOs & SLAs

```yaml
# docs/slos.yaml
slos:
  - name: 'API Availability'
    target: 99.95%
    window: 30d
    burn_rate_alert:
      - threshold: 14.4x # consomme 1% error budget en 1h → page
        severity: critical
      - threshold: 6x # consomme 5% en 6h → warning
        severity: warning

  - name: 'Checkout Latency p99'
    target: < 500ms
    window: 7d

  - name: 'Search Response p95'
    target: < 200ms
    window: 7d

  - name: 'Payment Processing p99'
    target: < 3s
    window: 30d
```

---

## 💰 SECTION 7 — FINOPS

```typescript
// Stratégie FinOps — optimisation coûts cloud

interface NSUGFinOpsStrategy {
  // 1. Tagging systématique de toutes les ressources
  resourceTagging: {
    required: ['service', 'environment', 'team', 'cost-center'];
    automation: 'Terraform enforced';
  };

  // 2. Compute optimization
  compute: {
    dev: 'Spot instances (économie 70%)';
    staging: 'On-demand modéré';
    production: {
      baseline: 'Reserved instances 1an (économie 40%)';
      burst: 'On-demand auto-scaling';
    };
  };

  // 3. Database optimization
  database: {
    readReplicas: 'Scale down 22h-6h UTC';
    elasticache: 'Reserved nodes pour Redis';
    storage: 'Intelligent tiering S3';
  };

  // 4. AI Cost Control — critique
  aiCosts: {
    cache: 'Semantic cache → économie 70% tokens';
    modelRouting: {
      simple_queries: 'gpt-4o-mini (10x moins cher)';
      complex_queries: 'claude-3-5-sonnet';
      bulk_operations: 'Batch API (économie 50%)';
    };
    budget_alerts: 'AWS Budgets → alerte à 80%';
  };

  // 5. Monitoring coûts
  reporting: {
    daily: 'Cost anomaly detection';
    weekly: 'Cost report par service';
    monthly: 'FinOps review + optimisation';
    tool: 'AWS Cost Explorer + Infracost (PR cost preview)';
  };

  // Target : < $0.05 cost per transaction
}
```

---

## 🔐 SECTION 8 — ZERO-TRUST SECURITY

```typescript
// Architecture Zero-Trust : "Never trust, always verify"

interface ZeroTrustArchitecture {
  // 1. Identity-First
  identity: {
    everyRequest: 'JWT validation à chaque hop';
    serviceMesh: 'mTLS entre tous les microservices (Istio/Linkerd)';
    workloadIdentity: 'SPIFFE/SPIRE pour identité pods K8s';
    secrets: 'HashiCorp Vault — rotation automatique 24h';
  };

  // 2. Network Security
  network: {
    microsegmentation: 'NetworkPolicy K8s strictes';
    noImplicitTrust: 'Whitelist explicite par service';
    encryption: 'TLS 1.3 minimum — tout le trafic';
    edgeProtection: 'Cloudflare Zero Trust (ZTNA)';
  };

  // 3. Least Privilege
  accessControl: {
    iam: 'RBAC granulaire par ressource';
    serviceAccounts: '1 compte par microservice, permissions minimales';
    humanAccess: 'Just-in-time access (Teleport/StrongDM)';
    auditAll: 'Chaque accès logué dans audit trail immuable';
  };

  // 4. Continuous Verification
  continuousVerification: {
    runtimeScanning: 'Falco — détection comportements anormaux K8s';
    imageScan: 'Trivy — scan images Docker à chaque build';
    depScan: 'Snyk — vulnérabilités dépendances';
    sast: 'Semgrep — static analysis code';
    pentest: 'Trimestriel par équipe externe certifiée';
  };

  // 5. Data Protection
  dataProtection: {
    atRest: 'AES-256 — PostgreSQL TDE + S3 SSE-KMS';
    inTransit: 'TLS 1.3 + certificate pinning mobile';
    pii: 'Tokenisation données personnelles (cartes, phones)';
    gdpr: 'Right to erasure automatisé (cascade delete + anonymisation)';
  };
}
```

---

## 💳 SECTION 9 — PAIEMENT INTERNATIONAL + AFRIQUE

```typescript
// Payment Gateway Router — sélection intelligente

interface PaymentRouter {
  // GLOBAL
  stripe: { cards: true; applePay: true; googlePay: true; regions: 'worldwide' };
  paypal: { express: true; regions: 'worldwide' };

  // AFRIQUE OCCIDENTALE (FCFA)
  wave: { countries: ['SN', 'CI']; currency: 'XOF'; type: 'mobile_money' };
  mtnMomo: { countries: ['CI', 'GH', 'CM', 'SN', 'BF']; type: 'mobile_money' };
  orangeMoney: { countries: ['CI', 'SN', 'ML', 'BF', 'GN']; type: 'mobile_money' };
  moovMoney: { countries: ['CI', 'BJ', 'BF', 'TG']; type: 'mobile_money' };
  airtelMoney: { countries: ['NE', 'NG', 'ZM']; type: 'mobile_money' };
  paystack: { countries: ['NG', 'GH', 'ZA', 'CI']; type: 'card_gateway' };
  fedapay: { countries: ['BJ', 'CI', 'SN', 'GN']; type: 'aggregator' };

  // Routing intelligent par pays détecté
  route(country: string, amount: Money): PaymentGateway[];

  // Features
  features: {
    splitPayment: true; // marketplace
    escrow: true; // protection acheteur
    cashOnDelivery: true; // marché africain
    paymentLinks: true; // WhatsApp commerce
    installments: true; // BNPL
    multiCurrency: ['XOF', 'XAF', 'USD', 'EUR', 'GBP', 'NGN', 'GHS'];
    instantRefunds: true;
    recurringBilling: true; // SaaS subscriptions
  };
}
```

---

## 🗄️ SECTION 10 — DATABASE DESIGN

### 10.1 PostgreSQL — Schéma Principal

```sql
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- recherche fuzzy
CREATE EXTENSION IF NOT EXISTS "pgvector";   -- embeddings produits
CREATE EXTENSION IF NOT EXISTS "postgis";    -- géolocalisation livraison

-- Multi-tenancy : Row Level Security
CREATE POLICY tenant_isolation ON products
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Tables core
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  hashed_password TEXT,
  role TEXT NOT NULL DEFAULT 'customer',
  status TEXT NOT NULL DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  base_price NUMERIC(12,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'XOF',
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  embedding VECTOR(1536),  -- pgvector pour recherche sémantique
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index stratégiques
CREATE INDEX idx_products_embedding ON products USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('french', title || ' ' || description));
CREATE INDEX idx_orders_customer ON orders(customer_id, created_at DESC);
CREATE INDEX idx_events_stream ON domain_events(aggregate_id, version);

-- Partitioning par date pour orders et events
CREATE TABLE orders (
  id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ...
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2025 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

---

## 📊 SECTION 11 — ADMIN DASHBOARD & ANALYTICS

### Fonctionnalités Admin

```
1. OVERVIEW TEMPS RÉEL
   - GMV (Gross Merchandise Value) live
   - Commandes / heure
   - Taux de conversion temps réel
   - Revenus par gateway paiement
   - Carte géo des commandes (PostGIS)

2. ANALYTICS IA
   - Prévisions 30/60/90 jours (Prophet/LSTM)
   - Cohort analysis automatique
   - RFM Scoring clients (Recency/Frequency/Monetary)
   - Customer Lifetime Value prédictif
   - Churn Risk Score par client
   - Price elasticity analysis
   - Basket analysis (règles d'association)

3. GESTION MARKETPLACE
   - Performance vendeurs (dashboard comparatif)
   - Commission management
   - Dispute resolution
   - Quality score vendeurs
   - Fraud flags

4. FEATURE FLAGS MANAGER
   - Interface toggle features par segment
   - A/B tests management
   - Rollout progressif avec métriques
   - Kill switches sécurité one-click
```

---

## 🌍 SECTION 12 — OPTIMISATION MARCHÉ AFRICAIN

```typescript
// Configuration marché CI / Afrique de l'Ouest

const africanMarketConfig = {
  // Connectivité basse (2G/3G prioritaire)
  performance: {
    imageFormat: 'WebP avec fallback JPEG',
    lazyLoad: 'aggressif — tout sauf above-the-fold',
    bundleSize: '< 150KB first load',
    offlineFirst: 'Service Worker + IndexedDB',
    dataSaverMode: 'auto-detect Save-Data header',
    connectionAdaptive: true, // dégrade qualité si lent
  },

  // Canaux de notification locaux
  notifications: {
    sms: "Twilio + Africa's Talking (backup)",
    whatsapp: 'WhatsApp Business API',
    push: 'Firebase Cloud Messaging',
    email: 'secondary (faible pénétration)',
  },

  // Commerce conversationnel WhatsApp
  whatsappCommerce: {
    catalogSharing: true,
    orderViaWhatsApp: true,
    paymentLinkGeneration: true,
    supportChat: true,
  },

  // Livraison locale
  logistics: {
    partners: ['Jumia Logistics', 'Sendbox', 'DHL Africa', 'local_couriers'],
    pickupPoints: true,
    cashOnDelivery: true,
    smsTracking: true, // pas besoin d'app
  },

  // Devise & formats
  localization: {
    defaultCurrency: 'XOF',
    currencySymbol: 'FCFA',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'fr-CI',
  },
};
```

---

## 📚 SECTION 13 — CI/CD & QUALITÉ

### Pipeline Complet

```yaml
# .github/workflows/main.yml
name: NSUG CI/CD Pipeline

on: [push, pull_request]

jobs:
  quality:
    steps:
      - name: Lint (ESLint + Prettier)
      - name: Type Check (TypeScript strict)
      - name: Unit Tests (Vitest — coverage > 80%)
      - name: Integration Tests (Supertest)
      - name: Security Scan (Snyk + Trivy + Semgrep)
      - name: Bundle Size Check (< 200KB first load)
      - name: Lighthouse CI (score > 95)
      - name: Accessibility Audit (axe-core)

  build:
    needs: [quality]
    steps:
      - name: Build (TurboRepo)
      - name: Docker Build (multi-stage, distroless)
      - name: Push Registry (GitHub Container Registry)
      - name: Sign Image (Sigstore/cosign)

  deploy-staging:
    needs: [build]
    steps:
      - name: Deploy Staging (Kubernetes)
      - name: E2E Tests (Playwright — mobile + desktop)
      - name: Performance Tests (k6 — 1000 VUs)
      - name: Contract Tests (Pact)

  deploy-production:
    needs: [deploy-staging]
    environment: production # Manual approval required
    steps:
      - name: Canary Deploy (5% → 25% → 100%)
      - name: Monitor SLOs (Prometheus)
      - name: Auto-rollback si error rate > 1%
      - name: Smoke Tests
      - name: Notify (#deployments Slack)
```

---

## 🎯 SECTION 14 — CRITÈRES DE SUCCÈS STRICTS

```
PERFORMANCE
✅ Lighthouse Mobile : 95+ (Performance, SEO, Accessibility, Best Practices)
✅ First Contentful Paint : < 1.0s
✅ Largest Contentful Paint : < 2.0s
✅ Time to Interactive : < 2.5s
✅ Cumulative Layout Shift : < 0.1
✅ API p95 Response Time : < 200ms
✅ Database p95 Query Time : < 50ms
✅ Uptime SLA : 99.95%

CODE QUALITY
✅ TypeScript strict — zero `any`
✅ Test coverage > 80% (unit + integration)
✅ Zero secrets en clair (Vault / Secrets Manager)
✅ Logs structurés JSON + OpenTelemetry traces
✅ Error handling exhaustif (pas de unhandled rejection)
✅ Loading states sur toutes les actions async
✅ Empty states design (listes vides, erreurs)
✅ Error boundaries React sur chaque section

SÉCURITÉ
✅ OWASP Top 10 — zéro vulnérabilité critique
✅ Dépendances — zéro CVE critique (Snyk)
✅ PCI-DSS Level 1 pour le module paiement
✅ RGPD — consentement, droit à l'effacement automatisé
✅ mTLS entre tous les microservices
✅ Zero-trust — jamais de trust implicite

ARCHITECTURE
✅ Monorepo TurboRepo avec remote cache
✅ Event Sourcing + CQRS + Hexagonal par service
✅ Feature flags sur toutes les nouvelles features
✅ Canary deployments (jamais de big bang release)
✅ Multi-cloud failover RTO < 60s
✅ OpenTelemetry sur tous les services
✅ FinOps — tagging 100% des ressources
✅ AI caching — économie > 60% des tokens
```

---

## 🚀 INSTRUCTIONS DE GÉNÉRATION FINALE

**Sur Base44, génère dans CET ORDRE :**

1. **Monorepo structure** (TurboRepo + NX) avec toutes les apps et packages
2. **Design System** (`packages/ui`) — composants shadcn/ui customisés NSUG
3. **Event schemas** (`packages/events`) — tous les domain events typés
4. **Auth Service** (hexagonal + JWT + OAuth2 + 2FA)
5. **Catalogue Service** (CQRS + Event Sourcing + Vector embeddings)
6. **Order Service** (saga pattern + event sourcing)
7. **Payment Service** (multi-gateway + split payment)
8. **AI Orchestrator** (agents + RAG + semantic cache)
9. **Frontend Web** (Next.js 14 App Router, toutes les pages)
10. **Admin Dashboard** (analytics IA + gestion complète)
11. **BFF Layer** (4 BFFs typés par surface)
12. **Infrastructure Terraform** (multi-cloud AWS + GCP)
13. **CI/CD Pipeline** (GitHub Actions complet)
14. **Documentation** (README + API Swagger + Architecture diagrams)

**Ne jamais :**

- Simplifier une feature
- Ignorer un pattern d'architecture
- Hardcoder une valeur (tout en ENV)
- Skipper les tests
- Laisser un `TODO` sans implémentation
- Utiliser `any` en TypeScript

**Le résultat doit ressembler à :**
Shopify × Amazon × Stripe × OpenAI × Apple
— construit par une équipe de 100 ingénieurs seniors GAFAM pendant 3 ans.

🚀 **GO — GÉNÈRE LA VERSION PRODUCTION-READY COMPLÈTE.**
