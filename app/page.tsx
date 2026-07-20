import Image from 'next/image';
import FormularioAgendamento from '../components/FormularioAgendamento';

export default function Home() {
  const servicos = [
    { titulo: "Massagem Relaxamento Corpo Completo", duracao: "1 hora" },
    { titulo: "Massagem Localizada", duracao: "30 min" },
    { titulo: "Massagem Pedras Quentes", duracao: "1 hora" },
    { titulo: "Massagem Velas", duracao: "1 hora" },
    { titulo: "Massagem de Ventosas", duracao: "1 hora" },
    { titulo: "Esfoliação Corporal e Hidratação", duracao: "1 hora" },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black scroll-smooth">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto border-b border-[#D4AF37]/20">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-[#D4AF37]/30">
            <Image
              src="/logo.jpg"
              alt="Flávio Loureiro Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden sm:block text-[#D4AF37] font-serif text-xl md:text-2xl font-bold tracking-widest">
            FLÁVIO LOUREIRO
          </div>
        </div>

        <a href="https://wa.me/351911093543" target="_blank" rel="noreferrer" className="hidden md:block px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors rounded-full font-semibold">
          Contactar via WhatsApp
        </a>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-32 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif text-[#D4AF37] mb-6">
          Terapias e massagens profissionais no coração do Porto.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
          Dores, stress e cansaço não têm de fazer parte da tua rotina. Visite o nosso gabinete e ofereça ao seu corpo o cuidado que ele merece.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#agendar" className="px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-full hover:bg-[#b5952f] transition-all transform hover:scale-105 block text-center">
            Agendar Sessão
          </a>
          <a href="#servicos" className="px-8 py-4 bg-transparent border-2 border-gray-600 text-gray-300 font-semibold rounded-full hover:border-gray-400 hover:text-white transition-all block text-center">
            Ver Serviços
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 px-4 bg-zinc-950 border-t border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-4">
              Os Nossos Serviços
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Bem-estar que se sente, cuidado que fica. Tratamentos especializados no nosso gabinete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico, index) => (
              <div key={index} className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-[#D4AF37]/50 transition-all group flex flex-col justify-between">
                <div>
                  <div className="text-[#D4AF37] mb-4">
                    <svg className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{servico.titulo}</h3>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-md w-fit">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {servico.duracao}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secção de Agendamento (NOVO) */}
      <section id="agendar" className="py-20 px-4 bg-black border-t border-[#D4AF37]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-4">
              Faça a sua Marcação
            </h2>
            <p className="text-gray-400">
              Preencha os dados abaixo. O Flávio entrará em contacto direto consigo para confirmar a disponibilidade.
            </p>
          </div>

          <FormularioAgendamento />

        </div>
      </section>

      {/* Secção Sobre o Terapeuta */}
      <section className="py-20 px-4 bg-zinc-950 border-t border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] flex items-center justify-center bg-zinc-900 group">
              <span className="font-serif text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                Flávio Loureiro
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-6">
              O Seu Terapeuta
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Especialista em terapias manuais, com foco em proporcionar-lhe uma experiência revitalizante com total descrição e profissionalismo no nosso espaço dedicado ao seu bem-estar.
            </p>
            <blockquote className="border-l-4 border-[#D4AF37] pl-6 py-2 italic text-gray-400 bg-black rounded-r-lg">
              &quot;Dores, stress e cansaço não têm de fazer parte da tua rotina. Oferece ao teu corpo o cuidado que ele merece.&quot;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-[#D4AF37]/20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-[#D4AF37] font-serif text-2xl tracking-widest mb-2">FLÁVIO LOUREIRO</p>
          <p className="text-gray-400 mb-4 font-light tracking-wide italic">"Bem-estar que se sente, cuidado que fica."</p>

          <div className="flex flex-col items-center gap-4 mb-10 text-gray-500">
            <p className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Rua de Passos Manuel, 71, Porto
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-2">
              <a href="https://www.instagram.com/flavioloureiromassagem?igsh=MXRyODV5bXd6ZDA4MA==" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                Instagram
              </a>
              <a href="https://wa.me/351911093543" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                WhatsApp: 911 093 543
              </a>
            </div>
          </div>
          <p className="text-xs text-gray-700 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Flávio Loureiro Massagem. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}