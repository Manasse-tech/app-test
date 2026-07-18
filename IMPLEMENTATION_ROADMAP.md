# 📋 NSUG — Roadmap d'Implémentation & Instructions Continuation

## ✅ Complété — Phases 0 & 1

### PHASE 0: Foundation (12 package.json + 11 tsconfig)

- ✅ Root package.json (all monorepo dependencies)
- ✅ Workspace package.json for all 9 services
- ✅ Workspace package.json for all 4 packages
- ✅ TypeScript strict configs (tsconfig.base.json)
- ✅ ESLint, Prettier, Jest setup
- ✅ Monorepo ready for development

### PHASE 1: Hexagonal Architecture (Auth Service)

- ✅ Domain Layer:
  - `User` aggregate root (entity)
  - `Email` value object (strict validation)
  - `PasswordHash` value object (bcrypt hashing)
  - `UserId` value object
  - Domain events (`UserRegisteredEvent`, `UserAuthenticatedEvent`)
- ✅ Application Layer:
  - `RegisterUserCommand` + handler
  - `AuthenticateUserCommand` (ready)
  - `GetUserByIdQuery` + handler
- ✅ Infrastructure Layer:
  - `InMemoryUserRepository` (persistence adapter)
  - NestJS module configuration
  - Main.ts entry point

**Architecture Established:** Auth Service is a complete example of hexagonal architecture that can be replicated across all other services.

---

## 🚀 Next Steps — Priorities by Impact

### Immediate (HIGH IMPACT, 2-3 days)

#### 1. Apply Auth Service Pattern to Core Services

**Copy the hexagonal pattern from Auth Service to:**

**Catalogue Service:**

```
src/domain/
  ├── entities/Product.ts
  ├── value-objects/ProductPrice.ts, SKU.ts
  ├── repositories/IProductRepository.ts
  ├── events/ProductCreatedEvent.ts, ProductUpdatedEvent.ts

src/application/
  ├── commands/CreateProductCommand.ts + handler
  ├── queries/SearchProductsQuery.ts + handler

src/infrastructure/
  ├── repositories/InMemoryProductRepository.ts
  ├── config/catalogue.module.ts
```

**Order Service:**

```
src/domain/
  ├── entities/Order.ts (aggregate root)
  ├── value-objects/OrderLineItem.ts, OrderStatus.ts, Money.ts
  ├── repositories/IOrderRepository.ts
  ├── events/OrderCreatedEvent.ts, OrderPaidEvent.ts, OrderShippedEvent.ts

src/application/
  ├── commands/CreateOrderCommand.ts + handler
  ├── queries/GetOrdersByCustomerQuery.ts + handler

src/infrastructure/
  ├── repositories/InMemoryOrderRepository.ts
  ├── config/order.module.ts
```

**Payment Service:**

```
src/domain/
  ├── entities/Payment.ts
  ├── value-objects/Money.ts (currency, amount)
  ├── repositories/IPaymentRepository.ts
  ├── events/PaymentInitiatedEvent.ts, PaymentCompletedEvent.ts, PaymentFailedEvent.ts

src/application/
  ├── commands/InitiatePaymentCommand.ts + handler
  ├── queries/GetPaymentStatusQuery.ts + handler

src/infrastructure/
  ├── adapters/StripePaymentGateway.ts
  ├── repositories/InMemoryPaymentRepository.ts
  ├── config/payment.module.ts
```

#### 2. Implement Event Store (PHASE 2)

Once services are structured, implement shared event infrastructure:

**Files to create:**

- `services/shared/src/infrastructure/event-store/EventStore.ts` (interface)
- `services/shared/src/infrastructure/event-store/InMemoryEventStore.ts` (MVP)
- `services/shared/src/infrastructure/event-bus/EventBus.ts` (publisher/subscriber)
- `services/shared/src/infrastructure/outbox/OutboxPattern.ts` (guaranteed delivery)

**Then connect each service:**

```typescript
// In each service's handler:
async execute(command: CreateOrderCommand): Promise<void> {
  const order = Order.create(command);
  await this.orderRepository.save(order);

  // Publish events to event bus
  const events = order.getUncommittedEvents();
  for (const event of events) {
    await this.eventBus.publish(event);
  }
  order.clearUncommittedEvents();
}
```

---

### Medium Priority (3-5 days)

#### 3. Add HTTP Controllers (PHASE 4)

Each service needs REST endpoints:

```
src/api/
  ├── controllers/auth.controller.ts
  │   ├── POST /auth/register
  │   ├── POST /auth/login
  │   ├── GET /auth/me
  ├── dtos/
  │   ├── RegisterUserDto.ts (with validation)
  │   ├── LoginDto.ts
  ├── guards/
  │   ├── JwtAuthGuard.ts
  ├── interceptors/
  │   ├── ErrorInterceptor.ts
```

#### 4. Add Tests (PHASE 11)

For Auth Service pattern:

```
test/unit/domain/user.spec.ts         # Domain logic only
test/unit/application/register.spec.ts # Command handler
test/integration/register.spec.ts      # Full flow with repo
```

Run: `npm run test`

#### 5. Add Database (PHASE 7)

Replace `InMemoryRepository` with TypeORM:

```
services/auth-service/src/infrastructure/
  ├── persistence/
  │   ├── user.entity.ts (TypeORM entity)
  │   ├── TypeOrmUserRepository.ts (implements IUserRepository)
  ├── database/
  │   ├── migrations/001-create-users-table.ts
```

---

### Lower Priority (Can be done in parallel)

#### 6. BFF & GraphQL (PHASE 9)

Aggregation layer for frontend:

```
services/bff-web/src/
  ├── schema/
  │   ├── schema.graphql (or @ObjectType definitions)
  ├── resolvers/
  │   ├── user.resolver.ts
  │   ├── products.resolver.ts
  │   ├── orders.resolver.ts
```

#### 7. AI Orchestrator (PHASE 10)

Semantic caching + LLM integration:

```
services/ai-orchestrator/src/
  ├── infrastructure/
  │   ├── adapters/AnthropicClientAdapter.ts
  │   ├── cache/RedisSemanticCache.ts
  ├── agents/
  │   ├── NegotiationAgent.ts
```

#### 8. Infrastructure & Deployment (PHASE 12-13)

Terraform + Kubernetes:

```
infrastructure/
  ├── terraform/
  │   ├── aws-primary/eks.tf
  │   ├── gcp-failover/main.tf
  ├── kubernetes/
  │   ├── auth-service-deployment.yaml
  │   ├── postgresql-statefulset.yaml
```

---

## 🎯 How to Continue Efficiently

### Step-by-Step for Next Service (e.g., Catalogue Service)

1. **Copy the Auth pattern:**

   ```bash
   cp -r services/auth-service/src/domain services/catalogue-service/src/
   cp -r services/auth-service/src/application services/catalogue-service/src/
   cp -r services/auth-service/src/infrastructure services/catalogue-service/src/
   cp services/auth-service/src/main.ts services/catalogue-service/src/
   ```

2. **Rename to domain concepts:**
   - User → Product
   - UserRepository → ProductRepository
   - UserRegisteredEvent → ProductCreatedEvent
   - RegisterUserCommand → CreateProductCommand

3. **Add domain-specific logic:**
   - Product has SKU, price, inventory
   - Add ProductPrice value object
   - Add stock management logic

4. **Run type checking:**

   ```bash
   npm run type-check
   ```

5. **Run tests:**
   ```bash
   npm run test
   ```

---

## 📊 Current Codebase Status

### Files Created

- **13 package.json** files (root + 9 services + 4 packages)
- **11 tsconfig.json** files (strict mode enabled everywhere)
- **3 config files** (.eslintrc.json, .prettierrc, jest.config.js)
- **Auth Service complete** (7 domain files + 6 app files + 3 infra files)

### Total LOC (Lines of Code)

- Domain layer: ~300 LOC
- Application layer: ~250 LOC
- Infrastructure layer: ~150 LOC
- **Total so far: ~700 LOC**

### Time Estimate to Production-Ready

- **Core Services** (Auth, Catalogue, Order, Payment): 4-5 days
- **Event Sourcing + CQRS**: 2-3 days
- **HTTP/GraphQL APIs**: 2-3 days
- **Database + Migrations**: 2 days
- **Testing (80% coverage)**: 3-4 days
- **Observability + Monitoring**: 2 days
- **Deployment (Docker + K8s)**: 3-4 days
- **CI/CD Pipelines**: 2 days

**Total Estimated Time: 3-4 weeks** for a production-ready MVP

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run all services
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Run tests (all)
npm run test

# Test coverage
npm run test:cov

# Build all
npm run build

# Clean
npm run clean
```

---

## 📁 Critical Files to Keep Synchronized

1. `packages/events/src/index.ts` — All domain events exported
2. `services/shared/src/infrastructure/` — Shared utilities used by all services
3. `tsconfig.base.json` — TypeScript strict configuration
4. `package.json` — Root dependencies

---

## ✨ Key Architecture Principles

1. **Domain-Driven Design**: Pure domain logic with zero external dependencies
2. **Hexagonal Architecture**: Clear ports (interfaces) between layers
3. **CQRS Pattern**: Commands modify state, Queries read from projections
4. **Event Sourcing**: Immutable event log as source of truth
5. **Strict TypeScript**: `noImplicitAny: true`, zero `any` types
6. **Testing First**: Unit tests on domain, integration tests on handlers
7. **Observability**: OpenTelemetry tracing from day 1
8. **Multi-tenancy**: Row-level security, tenant isolation

---

## 🚨 Common Pitfalls to Avoid

❌ Don't put business logic in repositories or controllers
✅ Do put it in domain entities and value objects

❌ Don't have domain depend on infrastructure
✅ Do use dependency injection in application layer

❌ Don't mix commands with queries
✅ Do separate write (commands) from read (queries)

❌ Don't skip tests for "MVP speed"
✅ Do write tests as you implement — it's faster overall

❌ Don't use `any` types
✅ Do embrace strict TypeScript — IDE refactoring saves time

---

## 📞 Next Session Instructions

If continuing this project, start with:

```
1. Implement Catalogue Service (copy Auth pattern)
2. Implement Order Service
3. Implement Payment Service
4. Then: Event Store + Event Bus
5. Then: HTTP Controllers + Tests
6. Then: Database layer
```

This order ensures maximum testability and parallel development.
