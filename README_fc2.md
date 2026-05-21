# Seleção FESF-SUS – 2 F.C

Conteinerização completa do sistema de Gestão de Produtos via Docker.

## Tecnologias

- Docker
- Docker Compose
- Backend: Python/FastAPI
- Frontend: Next.js/React

## Como executar com Docker

### Pré-requisitos

- Docker Desktop instalado
- Docker Compose disponível

### Subir toda a aplicação com um comando

```bash
docker-compose up --build
```

Aguarde o build e acesse:

- **Frontend:** http://localhost:3000
- **Backend (API):** http://localhost:8000
- **Documentação da API:** http://localhost:8000/docs

### Parar a aplicação

```bash
docker-compose down
```

## Estrutura Docker

```
├── backend/
│   └── Dockerfile        # Imagem Python/FastAPI
├── frontend/
│   └── Dockerfile        # Imagem Node/Next.js
└── docker-compose.yml    # Orquestração dos serviços
```

## Serviços

| Serviço   | Porta | Descrição              |
|-----------|-------|------------------------|
| backend   | 8000  | API REST em FastAPI    |
| frontend  | 3000  | Interface em Next.js   |
