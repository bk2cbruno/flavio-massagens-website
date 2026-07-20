"use client";

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function FormularioAgendamento() {
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    servico: 'Massagem Relaxamento Corpo Completo',
    data: '',
    hora: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    
    // Juntar data e hora para o formato timestamp da base de dados
    const dataMarcacao = new Date(`${formData.data}T${formData.hora}:00`).toISOString();

    const { error } = await supabase
      .from('marcacoes')
      .insert([
        {
          nome_cliente: formData.nome,
          telefone: formData.telefone,
          servico: formData.servico,
          data_marcacao: dataMarcacao,
        }
      ]);

    if (error) {
      setErro('Erro ao fazer marcação. Tente novamente ou use o WhatsApp.');
      console.error(error);
    } else {
      setSucesso(true);
      setFormData({ nome: '', telefone: '', servico: 'Massagem Relaxamento Corpo Completo', data: '', hora: '' });
    }
    setLoading(false);
  };

  if (sucesso) {
    return (
      <div className="bg-[#D4AF37]/10 border border-[#D4AF37] p-8 rounded-xl text-center max-w-lg mx-auto">
        <h3 className="text-2xl text-[#D4AF37] font-serif mb-2">Pedido Enviado!</h3>
        <p className="text-gray-300">A sua marcação foi registada. O Flávio entrará em contacto para confirmar.</p>
        <button onClick={() => setSucesso(false)} className="mt-6 text-[#D4AF37] underline hover:text-white transition-colors">
          Fazer nova marcação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 border border-gray-800 p-8 rounded-xl max-w-2xl mx-auto space-y-6">
      {erro && <p className="text-red-500 bg-red-500/10 p-3 rounded">{erro}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Nome Completo</label>
          <input required type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors" placeholder="O seu nome..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">WhatsApp / Telefone</label>
          <input required type="tel" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} className="w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors" placeholder="O seu número..." />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Serviço Pretendido</label>
        <select required value={formData.servico} onChange={(e) => setFormData({...formData, servico: e.target.value})} className="w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors">
          <option>Massagem Relaxamento Corpo Completo</option>
          <option>Massagem Localizada</option>
          <option>Massagem Pedras Quentes</option>
          <option>Massagem Velas</option>
          <option>Massagem de Ventosas</option>
          <option>Esfoliação Corporal e Hidratação</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Data Preferencial</label>
          <input required type="date" value={formData.data} onChange={(e) => setFormData({...formData, data: e.target.value})} className="w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors [color-scheme:dark]" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Hora Preferencial</label>
          <input required type="time" value={formData.hora} onChange={(e) => setFormData({...formData, hora: e.target.value})} className="w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors [color-scheme:dark]" />
        </div>
      </div>

      <button disabled={loading} type="submit" className="w-full py-4 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#b5952f] transition-colors disabled:opacity-50">
        {loading ? 'A processar...' : 'Confirmar Pedido de Marcação'}
      </button>
    </form>
  );
}