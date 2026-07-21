"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Image from 'next/image';

export default function AdminPanel() {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState('');
  const [marcacoes, setMarcacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Sistema de Login Simples
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'flavio2026') {
      setAutenticado(true);
    } else {
      alert('Password incorreta!');
    }
  };

  // Buscar Dados ao Supabase
  const fetchMarcacoes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('marcacoes')
      .select('*')
      .order('created_at', { ascending: false }); // Mostra as mais recentes primeiro

    if (data) setMarcacoes(data);
    if (error) console.error("Erro ao carregar dados:", error);
    setLoading(false);
  };

  useEffect(() => {
    if (autenticado) {
      fetchMarcacoes();
    }
  }, [autenticado]);

  // Atualizar Estado na Base de Dados
  const atualizarEstado = async (id: string, novoEstado: string) => {
    const { error } = await supabase
      .from('marcacoes')
      .update({ estado: novoEstado })
      .eq('id', id);

    if (!error) {
      // Atualiza a lista visualmente após sucesso
      fetchMarcacoes();
    } else {
      alert('Erro ao atualizar o estado.');
    }
  };

  // Formatar Data para ficar legível
  const formatarData = (dataIso: string) => {
    const data = new Date(dataIso);
    return data.toLocaleString('pt-PT', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Ecrã de Login
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="bg-zinc-900 border border-[#D4AF37]/30 p-10 rounded-2xl max-w-sm w-full text-center shadow-[0_0_30px_rgba(212,175,55,0.1)]">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <Image src="/logo.jpg" alt="Logo" fill className="object-contain rounded-full" />
          </div>
          <h1 className="text-2xl font-serif text-[#D4AF37] mb-2">Backoffice</h1>
          <p className="text-gray-400 text-sm mb-6">Área reservada a administração</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password de acesso" 
              className="w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none text-center"
            />
            <button type="submit" className="w-full py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#b5952f] transition-colors">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Painel de Administração (Dashboard)
  return (
    <div className="min-h-screen bg-zinc-950 text-gray-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-zinc-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-[#D4AF37]">Gestão de Marcações</h1>
            <p className="text-gray-400">Controlo de agenda e clientes</p>
          </div>
          <button onClick={() => setAutenticado(false)} className="px-4 py-2 border border-zinc-700 rounded-md text-sm hover:text-white transition-colors">
            Sair (Logout)
          </button>
        </div>

        {loading ? (
          <p className="text-[#D4AF37] animate-pulse">A carregar dados do servidor...</p>
        ) : (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-950/50 text-gray-400 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Cliente</th>
                  <th className="px-6 py-4 font-medium">Contacto</th>
                  <th className="px-6 py-4 font-medium">Serviço</th>
                  <th className="px-6 py-4 font-medium">Data Agendada</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {marcacoes.map((marcacao) => (
                  <tr key={marcacao.id} className="hover:bg-black/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{marcacao.nome_cliente}</td>
                    <td className="px-6 py-4 text-gray-300">
                      <a href={`https://wa.me/351${marcacao.telefone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-500 hover:underline">
                        {marcacao.telefone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-[#D4AF37]">{marcacao.servico}</td>
                    <td className="px-6 py-4">{formatarData(marcacao.data_marcacao)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        marcacao.estado === 'pendente' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        marcacao.estado === 'confirmado' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        marcacao.estado === 'concluido' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {marcacao.estado.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2 justify-end">
                      {marcacao.estado === 'pendente' && (
                        <button onClick={() => atualizarEstado(marcacao.id, 'confirmado')} className="px-3 py-1 bg-green-500/20 text-green-500 rounded hover:bg-green-500/30 transition-colors">
                          Confirmar
                        </button>
                      )}
                      {marcacao.estado === 'confirmado' && (
                        <button onClick={() => atualizarEstado(marcacao.id, 'concluido')} className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded hover:bg-blue-500/30 transition-colors">
                          Concluir
                        </button>
                      )}
                      {(marcacao.estado === 'pendente' || marcacao.estado === 'confirmado') && (
                        <button onClick={() => atualizarEstado(marcacao.id, 'cancelado')} className="px-3 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors">
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                
                {marcacoes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Ainda não existem marcações registadas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}