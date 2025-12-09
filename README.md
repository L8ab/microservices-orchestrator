# Microservices Orchestrator

A service orchestration tool with circuit breaker pattern.

## Features

- Service registration
- Service discovery
- Circuit breaker pattern
- Health checking
- Failure handling

## Tech Stack

- **Language**: Node.js
- **Pattern**: Circuit Breaker

## Project Structure

\`\`\`
microservices-orchestrator/
├── src/
│   ├── orchestrator.js  # Core orchestrator
│   ├── utils/           # Health checker
│   └── index.js         # API server
└── package.json
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## API Endpoints

- \`POST /services/:name/register\` - Register service
- \`POST /services/:name/call\` - Call service

---

**POWERED BY L8AB SYSTEMS**
