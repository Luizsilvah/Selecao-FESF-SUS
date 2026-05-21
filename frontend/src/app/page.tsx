'use client'

import { useEffect, useState } from 'react'

interface Produto {
  id?: number
  nome: string
  quantidade: number
  preco: number
  categoria: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const categorias = ['Bebidas', 'Alimentos', 'Higiene', 'Limpeza', 'Outros']

const produtoVazio: Produto = { nome: '', quantidade: 0, preco: 0, categoria: 'Bebidas' }

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [form, setForm] = useState<Produto>(produtoVazio)
  const [editando, setEditando] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const buscarProdutos = async () => {
    try {
      const res = await fetch(`${API_URL}/produtos`)
      const data = await res.json()
      setProdutos(data)
    } catch {
      setMensagem('Erro ao conectar com a API')
    }
  }

  useEffect(() => { buscarProdutos() }, [])

  const salvar = async () => {
    if (!form.nome.trim()) return setMensagem('Informe o nome do produto')
    setLoading(true)
    try {
      if (editando !== null) {
        await fetch(`${API_URL}/produtos/${editando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        setMensagem('Produto atualizado!')
      } else {
        await fetch(`${API_URL}/produtos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        setMensagem('Produto cadastrado!')
      }
      setForm(produtoVazio)
      setEditando(null)
      buscarProdutos()
    } catch {
      setMensagem('Erro ao salvar produto')
    }
    setLoading(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  const editar = (p: Produto) => {
    setForm(p)
    setEditando(p.id!)
  }

  const deletar = async (id: number) => {
    if (!confirm('Deseja deletar este produto?')) return
    await fetch(`${API_URL}/produtos/${id}`, { method: 'DELETE' })
    setMensagem('Produto deletado!')
    buscarProdutos()
    setTimeout(() => setMensagem(''), 3000)
  }

  const cancelar = () => {
    setForm(produtoVazio)
    setEditando(null)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-blue-700 text-white rounded-xl p-6 mb-6 shadow">
          <h1 className="text-2xl font-bold">📦 Gestão de Produtos</h1>
          <p className="text-blue-200 text-sm mt-1">Sistema de controle de estoque</p>
        </div>

        {/* Mensagem */}
        {mensagem && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg mb-4">
            {mensagem}
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {editando ? '✏️ Editar Produto' : '➕ Novo Produto'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.nome}
                onChange={e => setForm({ ...form, nome: e.target.value })}
                placeholder="Ex: Açaí 500ml"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Categoria</label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.categoria}
                onChange={e => setForm({ ...form, categoria: e.target.value })}
              >
                {categorias.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Quantidade</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.quantidade}
                onChange={e => setForm({ ...form, quantidade: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.preco}
                onChange={e => setForm({ ...form, preco: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={salvar}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Salvando...' : editando ? 'Atualizar' : 'Cadastrar'}
            </button>
            {editando && (
              <button
                onClick={cancelar}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Lista */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">📋 Produtos Cadastrados ({produtos.length})</h2>
          {produtos.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">Nenhum produto cadastrado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600">
                    <th className="text-left px-4 py-3 rounded-l-lg">Nome</th>
                    <th className="text-left px-4 py-3">Categoria</th>
                    <th className="text-left px-4 py-3">Qtd</th>
                    <th className="text-left px-4 py-3">Preço</th>
                    <th className="text-left px-4 py-3 rounded-r-lg">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map(p => (
                    <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{p.nome}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{p.categoria}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${p.quantidade < 10 ? 'text-red-600' : 'text-green-600'}`}>
                          {p.quantidade}
                        </span>
                      </td>
                      <td className="px-4 py-3">R$ {p.preco.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => editar(p)}
                            className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-xs hover:bg-yellow-200 transition"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deletar(p.id!)}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs hover:bg-red-200 transition"
                          >
                            Deletar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
