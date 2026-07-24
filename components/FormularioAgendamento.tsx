"use client";

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser'; 

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
    
    const dataMarcacao = new Date(`${formData.data}T${formData.hora}:00`).toISOString();

    // 1. Gravar na Base de Dados (Supabase)
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
      
      // 2. PRIMEIRA UTILIDADE: Ping via Telegram
      // Substitui estas duas strings pelas tuas chaves do Telegram!
      const telegramToken = "7977262096:AAEklsk8dZVotc_nW-WyJhRhv1rPF-2dd8M";
      const chatId = "5656732281";
      
      const mensagemTelegram = `🚨 *NOVA MARCAÇÃO* 🚨\n\n👤 *Cliente:* ${formData.nome}\n📱 *Contacto:* ${formData.telefone}\n💆‍♂️ *Serviço:* ${formData.servico}\n📅 *Data:* ${formData.data} às ${formData.hora}\n\n👉 [Aceder ao Backoffice](https://flavio-massagens.netlify.app/admin)`;

      try {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: mensagemTelegram,
            parse_mode: 'Markdown'
          })
        });
      } catch (err) {
        console.error("Erro ao disparar alerta do Telegram:", err);
      }

      // 3. SEGUNDA UTILIDADE: Ping via EmailJS (As tuas chaves já cá estão)
      try {
        await emailjs.send(
          'service_31f9jnk', 
          'template_o04zzbk',
          {
            nome: formData.nome,
            telefone: formData.telefone,
            servico: formData.servico,
            data: formData.data,
            hora: formData.hora,
          },
          'C8oumezIPtvpBeI8K'
        );
      } catch (emailError) {
        console.error("Erro ao enviar email de notificação:", emailError);
      }

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
    <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-2xl mx-auto space-y-6 shadow-xl">
      {erro && <p className="text-red-500 bg-red-500/10 p-3 rounded">{erro}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Nome Completo</label>
          <input required type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors" placeholder="O seu nome..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">WhatsApp / Telefone</label>
          <input required type="tel" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors" placeholder="O seu número..." />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Serviço Pretendido</label>
        <select required value={formData.servico} onChange={(e) => setFormData({...formData, servico: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors">
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
          <input required type="date" value={formData.data} onChange={(e) => setFormData({...formData, data: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors [color-scheme:dark]" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Hora Preferencial</label>
          <select required value={formData.hora} onChange={(e) => setFormData({...formData, hora: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-3 text-white focus:border-[#D4AF37] focus:outline-none transition-colors">
            <option value="" disabled>Escolha a hora...</option>
            {Array.from({ length: 24 }).map((_, i) => {
              const hour = Math.floor(i / 2) + 9; 
              if (hour > 20) return null; 
              const min = i % 2 === 0 ? '00' : '30';
              const time = `${hour.toString().padStart(2, '0')}:${min}`;
              return <option key={time} value={time}>{time}</option>;
            })}
          </select>
        </div>
      </div>

      <button disabled={loading} type="submit" className="w-full py-4 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#b5952f] transition-colors disabled:opacity-50">
        {loading ? 'A processar...' : 'Confirmar Pedido de Marcação'}
      </button>
    </form>
  );
}