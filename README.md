# WeekSync

Weekly report generator and team dashboard, built as a microservices system on the PERN stack (PostgreSQL, Express, React, Node.js).

Team members submit structured weekly reports; managers view and analyze them across the team through a consolidated dashboard.

This project exists to learn and demonstrate microservices architecture — service boundaries, database-per-service, an API gateway, inter-service communication, and (later) event-driven data flow — rather than to ship the fastest possible monolith.

## Status

🚧 Early development. Services are being built incrementally; see commit history for progress.

## Architecture (planned)

```
                     ┌─────────────┐
                     │   Web (React) │
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │  API Gateway │
                     └──────┬──────┘
        ┌──────────┬────────┼────────┬───────────┐
   ┌────▼───┐ ┌────▼────┐ ┌─▼──────┐ ┌▼─────────┐ ┌▼─────────┐
   │  Auth  │ │ Report  │ │Project │ │Analytics │ │AI Service│
   │Service │ │ Service │ │Service │ │ Service  │ │(optional)│
   └────┬───┘ └────┬────┘ └───┬────┘ └────┬─────┘ └──────────┘
        │          │          │            │
   ┌────▼───┐ ┌────▼────┐ ┌───▼────┐  ┌────▼─────┐
   │auth_db │ │reports_db│ │projects_db│ (composed from
   └────────┘ └─────────┘ └──────────┘  other services'
                                          internal APIs
                                          for v1)
```

Each service owns its own database. The Gateway is the only entry point the frontend talks to. See `docs/architecture.md` for details and the reasoning behind design decisions.

## Services

| Service             | Responsibility                                        |
| ------------------- | ----------------------------------------------------- |
| `gateway`           | Single entry point, JWT verification, request routing |
| `auth-service`      | Registration, login, JWT issuing, role management     |
| `report-service`    | Weekly report CRUD, submission status                 |
| `project-service`   | Project/category CRUD, team assignment                |
| `analytics-service` | Dashboard metrics and aggregation                     |
| `ai-service`        | AI chat assistant over report data (stretch goal)     |
| `web`               | React frontend                                        |

## Tech stack

- **Frontend:** React
- **Backend:** Node.js / Express (per service)
- **Database:** PostgreSQL (one instance/schema per service)
- **Infra:** Docker Compose
- **Auth:** JWT

## Getting started

Setup instructions will be added as services come online. Target is a single `docker-compose up` to run the whole system locally.

## Why microservices for this

This same idea could be built faster as a monolith. It's deliberately built as microservices to practice service boundaries, database-per-service design, and inter-service communication patterns that come up in real distributed systems work. Design tradeoffs are documented in `docs/architecture.md` as they're made.
