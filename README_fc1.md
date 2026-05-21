# Seleção FESF-SUS – 1 F.C

Sistema de Gestão de Produtos com API em Python/FastAPI e Frontend em Next.js/React.

## Tecnologias

- **Backend:** Python 3.11, FastAPI, Uvicorn, Pydantic
- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS

## Funcionalidades

- Listagem de produtos
- Cadastro de novo produto
- Edição de produto existente
- Exclusão de produto
- API REST completa (GET, POST, PUT, DELETE)

## Como executar localmente

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API disponível em: http://localhost:8000  
Documentação automática: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em: http://localhost:3000

## Estrutura do Projeto

```
├── backend/
│   ├── main.py           # API FastAPI
│   ├── requirements.txt  # Dependências Python
│   └── Dockerfile
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx      # Página principal com CRUD
│   │   ├── layout.tsx    # Layout raiz
│   │   └── globals.css   # Estilos globais
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```
