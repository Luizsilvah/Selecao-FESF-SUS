from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="Gestão de Produtos - FESF SUS", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de dados
class Produto(BaseModel):
    id: Optional[int] = None
    nome: str
    quantidade: int
    preco: float
    categoria: str

# Banco de dados em memória
produtos_db: List[Produto] = [
    Produto(id=1, nome="Açaí 500ml", quantidade=50, preco=12.50, categoria="Bebidas"),
    Produto(id=2, nome="Milk Shake Chocolate", quantidade=30, preco=15.00, categoria="Bebidas"),
    Produto(id=3, nome="Açaí 300ml", quantidade=80, preco=8.00, categoria="Bebidas"),
]

contador_id = 4

@app.get("/")
def root():
    return {"message": "API Gestão de Produtos funcionando!", "status": "ok"}

@app.get("/produtos", response_model=List[Produto])
def listar_produtos():
    return produtos_db

@app.get("/produtos/{produto_id}", response_model=Produto)
def buscar_produto(produto_id: int):
    for p in produtos_db:
        if p.id == produto_id:
            return p
    raise HTTPException(status_code=404, detail="Produto não encontrado")

@app.post("/produtos", response_model=Produto)
def criar_produto(produto: Produto):
    global contador_id
    produto.id = contador_id
    contador_id += 1
    produtos_db.append(produto)
    return produto

@app.put("/produtos/{produto_id}", response_model=Produto)
def atualizar_produto(produto_id: int, produto_atualizado: Produto):
    for i, p in enumerate(produtos_db):
        if p.id == produto_id:
            produto_atualizado.id = produto_id
            produtos_db[i] = produto_atualizado
            return produto_atualizado
    raise HTTPException(status_code=404, detail="Produto não encontrado")

@app.delete("/produtos/{produto_id}")
def deletar_produto(produto_id: int):
    for i, p in enumerate(produtos_db):
        if p.id == produto_id:
            produtos_db.pop(i)
            return {"message": "Produto deletado com sucesso"}
    raise HTTPException(status_code=404, detail="Produto não encontrado")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
