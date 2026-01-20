import React, { useState, useEffect } from 'react';
import {
  Menu, X, ArrowRight, Instagram, Linkedin, Mail, CheckCircle,
  Star, ChevronDown, Phone, MapPin, MessageCircle, Monitor,
  Clock, Shield, Plus, ChevronLeft, ChevronRight
} from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [currentDiffIndex, setCurrentDiffIndex] = useState(0);

  // Scarcity Logic
  const getOccupancyPercentage = () => {
    const now = new Date();
    const day = now.getDate();
    const hour = now.getHours();

    if (day >= 27) return 100;

    let progress = ((day - 1) / 26);
    let percentage = 35 + (progress * 65);

    if (hour < 12) {
      percentage -= 1;
    }

    return Math.floor(Math.min(100, Math.max(35, percentage)));
  };

  const occupancy = getOccupancyPercentage();
  const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long' });

  // Scheduling Modal State
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '', // Added
    type: 'Presencial', // Added
    notes: '' // Added
  });

  const differentials = [
    {
      icon: <Shield size={32} />,
      title: "Visão Integral",
      text: "Não tratamos apenas a doença, mas a pessoa. Uma análise completa do seu histórico, hábitos e necessidades."
    },
    {
      icon: <Clock size={32} />,
      title: "Tempo de Qualidade",
      text: "Consultas sem pressa. Acreditamos que ouvir o paciente é a ferramenta diagnóstica mais poderosa que existe."
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Acompanhamento Contínuo",
      text: "Uma médica para chamar de sua. Cuidado longitudinal para você e sua família ao longo dos anos."
    }
  ];

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = () => {
    const { name, phone, email, message } = contactForm;
    const waPhone = "55699993807039";

    let text = `Olá! Vim pelo site. \n`;
    if (name) text += `*Nome*: ${name}\n`;
    if (phone) text += `*Telefone*: ${phone}\n`;
    if (email) text += `*Email*: ${email}\n`;
    if (message) text += `*Mensagem*: ${message}`;

    const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppRedirect = () => {
    const { name, date, time, phone, type, notes } = scheduleData; // added new fields
    const waPhone = "55699993807039";
    let message = `Olá Dra. Nathália!`;

    if (name) message += ` Meu nome é *${name}*.`;
    if (date && time) {
      message += ` Gostaria de verificar disponibilidade para uma consulta *${type || 'Presencial'}* no dia *${date}* às *${time}*.`;
    } else {
      message += ` Gostaria de agendar uma consulta.`;
    }
    if (phone) message += ` Meu contato é: ${phone}.`;
    if (notes) message += ` Obs: ${notes}`;

    const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsSchedulingOpen(false);
  };

  // Efeito para mudar a navbar ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDiffIndex((prev) => (prev + 1) % differentials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [differentials.length]);

  const nextDiff = () => {
    setCurrentDiffIndex((prev) => (prev + 1) % differentials.length);
  };

  const prevDiff = () => {
    setCurrentDiffIndex((prev) => (prev === 0 ? differentials.length - 1 : prev - 1));
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 selection:text-stone-900 relative bg-noise">

      {/* WhatsApp Float Button - Standard Brand Style */}
      <a
        href="https://wa.me/55699993807039"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group"
        aria-label="Conversar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Navbar */}
      <nav
        className={`fixed w-full z-40 transition-all duration-500 border-b border-transparent ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-stone-100 py-3' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl md:text-2xl font-serif-display tracking-widest font-semibold text-stone-900 group-hover:text-stone-600 transition-colors">
              DRA. NATHÁLIA LIMA SOUZA
            </span>
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-stone-400"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-body font-medium">
                CRM-RO 12072
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center font-body text-sm tracking-wide">
            {['Sobre', 'Atendimento', 'Telemedicina', 'Dúvidas'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-stone-500 transition-colors uppercase text-xs font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-stone-800 after:transition-all hover:after:w-full"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setIsSchedulingOpen(true)}
              className="border border-stone-800 px-6 py-2 bg-stone-900 text-white hover:bg-white hover:text-stone-900 transition-all duration-300 uppercase text-xs tracking-widest font-medium"
            >
              Agendar
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-stone-800 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden flex flex-col py-8 border-t border-stone-100 animate-in slide-in-from-top-5">
            {['Sobre', 'Atendimento', 'Telemedicina', 'Dúvidas'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 py-4 px-8 text-left uppercase tracking-widest text-sm border-b border-stone-50"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsSchedulingOpen(true); }}
              className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 py-4 px-8 text-left uppercase tracking-widest text-sm border-b border-stone-50"
            >
              Agendar
            </button>
          </div>
        )}
      </nav>

      {/* Scheduling Modal */}
      {isSchedulingOpen && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-lg animate-in zoom-in-95 ease-out duration-300">
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-stone-100">
              <h3 className="font-serif-display text-2xl text-stone-900">Agendar Consulta</h3>
              <button onClick={() => setIsSchedulingOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-stone-500 text-sm mb-4 font-light">
                Selecione sua preferência de data e horário. Enviaremos a solicitação diretamente para o WhatsApp da clínica.
              </p>

              {/* Scarcity Badge */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3 animate-in slide-in-from-top-2">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 animate-pulse">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-amber-800 text-sm font-semibold mb-1 flex justify-between">
                    <span>Alta Procura: Agenda de <span className="capitalize">{currentMonth}</span></span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-200/50 px-2 py-0.5 rounded-full">{occupancy}% cheia</span>
                  </p>
                  <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden mb-1">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${occupancy}%` }}
                    ></div>
                  </div>
                  <p className="text-amber-700/80 text-[10px] md:text-xs">
                    {occupancy >= 90 ? "Últimas vagas disponíveis este mês." : "Garanta seu horário preferido antes que esgote."}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-stone-900 transition-colors">Nome Completo</label>
                  <input
                    type="text"
                    value={scheduleData.name}
                    onChange={(e) => setScheduleData({ ...scheduleData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-stone-900 transition-colors">Telefone (WhatsApp)</label>
                  <input
                    type="tel"
                    value={scheduleData.phone || ''}
                    onChange={(e) => setScheduleData({ ...scheduleData, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors"
                    placeholder="(XX) 99999-9999"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-stone-900 transition-colors">Tipo de Consulta</label>
                  <select
                    value={scheduleData.type || 'Presencial'}
                    onChange={(e) => setScheduleData({ ...scheduleData, type: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors text-stone-700"
                  >
                    <option>Presencial</option>
                    <option>Telemedicina</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-stone-900 transition-colors">Mensagem (Opcional)</label>
                  <textarea
                    rows="3"
                    value={scheduleData.notes || ''}
                    onChange={(e) => setScheduleData({ ...scheduleData, notes: e.target.value })}
                    className="w-full bg-stone-50 p-3 border-none focus:ring-1 focus:ring-stone-300 transition-all resize-none text-stone-700"
                    placeholder="Alguma preferência de data/horário ou observação?"
                  ></textarea>
                </div>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-stone-900 text-white px-10 py-4 hover:bg-stone-800 transition-all uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2"
                >
                  Enviar Solicitação <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header id="inicio" className="relative md:min-h-screen flex items-center bg-stone-50 overflow-hidden pt-24 md:pt-0">

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">

          {/* Text Content - Responsive Split */}
          <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
            <div className="inline-block border border-stone-800/30 px-4 py-1 rounded-full mb-6 bg-white/50">
              <p className="font-body text-stone-800 tracking-widest uppercase text-[10px] font-semibold">
                Medicina Integrativa & Humanizada
              </p>
            </div>

            <h1 className="font-serif-display text-5xl md:text-7xl text-stone-900 mb-6 leading-[1.1]">
              Sua saúde vista por<br />
              <span className="italic font-light text-stone-600">inteiro</span>, não em partes.
            </h1>

            <p className="font-body text-stone-700 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-10 font-light leading-relaxed">
              Dra. Nathália Lima Souza. Uma abordagem médica que une a precisão técnica da ciência com a sensibilidade do cuidado humano.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
              <button
                onClick={() => setIsSchedulingOpen(true)}
                className="bg-stone-900 text-white px-10 py-4 hover:bg-stone-800 transition-all duration-300 font-body text-xs tracking-[0.2em] uppercase shadow-lg shadow-stone-900/20"
              >
                Agendar Consulta
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="px-10 py-4 hover:bg-stone-100 transition-all duration-300 font-body text-xs tracking-[0.2em] uppercase border border-stone-800 text-stone-800 bg-transparent"
              >
                Conhecer a Dra.
              </button>
            </div>
          </div>

          {/* Image - Responsive Split */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-[90vh] relative order-1 md:order-2">
            <div className="absolute inset-0 bg-stone-200 rounded-bl-[5rem] rounded-tr-[5rem] overflow-hidden shadow-2xl">
              <img
                src="/dra-contato.jpg"
                alt="Dra. Nathália"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-20 h-20 md:w-40 md:h-40 border-b-2 border-l-2 border-stone-300 rounded-bl-3xl -z-10"></div>
            <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-20 h-20 md:w-40 md:h-40 border-t-2 border-r-2 border-stone-300 rounded-tr-3xl -z-10"></div>
          </div>

        </div>
      </header>

      {/* Differentials / Why Generalist */}
      <section className="py-20 bg-stone-100 border-b border-stone-200">
        <div className="container mx-auto px-6 md:px-12 relative">

          {/* MOBILE: Carousel */}
          <div className="md:hidden max-w-4xl mx-auto relative overflow-hidden group">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentDiffIndex * 100}%)` }}
            >
              {differentials.map((item, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-6 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 mb-6 shadow-inner mx-auto mt-4">
                    {item.icon}
                  </div>
                  <h3 className="font-serif-display text-3xl text-stone-900 mb-4">{item.title}</h3>
                  <p className="font-body text-stone-600 text-lg leading-relaxed max-w-md mx-auto mb-8">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Dots Indicators (Mobile) */}
            <div className="flex justify-center gap-3 mt-8">
              {differentials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentDiffIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentDiffIndex === idx ? 'bg-stone-800 w-8' : 'bg-stone-300 w-2 hover:bg-stone-400'
                    }`}
                  aria-label={`Ir para diferencial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* DESKTOP: Grid (Normal Way) */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {differentials.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-stone-800 mb-6 shadow-md border border-stone-100">
                  {item.icon}
                </div>
                <h3 className="font-serif-display text-2xl text-stone-900 mb-3">{item.title}</h3>
                <p className="font-body text-stone-600 text-base leading-relaxed max-w-xs">{item.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Imagem da Dra - Agora aparece primeiro no Mobile */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 aspect-[3/4] overflow-hidden bg-stone-200 shadow-2xl rounded-tr-[5rem] rounded-bl-[5rem]">
                <img
                  src="/dra-sobre.jpg"
                  alt="Dra. Nathália Lima Souza"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-stone-400 z-0 rounded-tl-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-stone-400 z-0 rounded-br-3xl"></div>
            </div>

            {/* Texto Sobre */}
            <div className="w-full lg:w-1/2 font-body">
              <span className="text-stone-500 text-xs uppercase tracking-[0.2em] mb-2 block">Quem é a Dra.</span>
              <h2 className="font-serif-display text-4xl md:text-5xl text-stone-900 mb-8 leading-tight">
                Nathália Lima Souza
              </h2>

              <div className="space-y-6 text-stone-600 font-light text-lg leading-relaxed">
                <p>
                  Médica formada pela <strong>Universidade São Lucas (Porto Velho - RO)</strong>, encontrei na Medicina Generalista a oportunidade de exercer um cuidado verdadeiro e próximo.
                </p>
                <p>
                  Em um mundo de consultas rápidas e impessoais, minha missão (CRM 12072) é resgatar a essência da relação médico-paciente. Acredito que para curar, primeiro é preciso compreender.
                </p>
                <p>
                  Minha prática clínica combina rigor técnico com acolhimento. Aqui, sua queixa é ouvida com atenção e seu tratamento é desenhado especificamente para sua realidade.
                </p>
              </div>

              <div className="mt-10 p-6 bg-white border border-stone-100 shadow-sm">
                <p className="font-serif-display italic text-xl text-stone-800 mb-2">
                  "O bom médico trata a doença. O grande médico trata o paciente que tem a doença."
                </p>
                <p className="text-xs uppercase tracking-widest text-stone-400">— William Osler</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="atendimento" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-stone-50 z-0"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-stone-500 text-xs uppercase tracking-[0.2em]">Especialidades</span>
              <h2 className="font-serif-display text-4xl md:text-5xl text-stone-900 mt-2">Áreas de Atuação</h2>
            </div>
            <button onClick={() => setIsSchedulingOpen(true)} className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:gap-4 transition-all">
              Ver agenda <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Check-up & Prevenção",
                desc: "Avaliação laboratorial e clínica completa para identificar riscos antes que se tornem problemas.",
                list: ["Exames de rotina", "Risco cardiovascular", "Orientações de vida"]
              },
              {
                title: "Saúde da Mulher",
                desc: "Cuidado integral em todas as fases da vida, com foco no bem-estar físico e hormonal.",
                list: ["Preventivo", "Planejamento familiar", "Climatério e menopausa"]
              },
              {
                title: "Doenças Crônicas",
                desc: "Manejo cuidadoso de condições que exigem acompanhamento constante para uma vida plena.",
                list: ["Hipertensão", "Diabetes", "Dislipidemias (Colesterol)"]
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white p-10 border border-stone-100 shadow-xl shadow-stone-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-12 h-1 bg-stone-900 mb-8 group-hover:w-20 transition-all"></div>
                <h3 className="font-serif-display text-2xl text-stone-900 mb-4">{service.title}</h3>
                <p className="text-stone-600 font-body font-light mb-6 leading-relaxed text-sm">
                  {service.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.list.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-stone-500">
                      <Plus size={12} /> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsSchedulingOpen(true)}
                  className="text-stone-900 text-xs uppercase tracking-widest font-semibold border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors"
                >
                  Agendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telemedicine Banner */}
      <section id="telemedicina" className="py-20 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Pattern or texture could go here */}
          <div className="absolute right-0 top-0 w-full h-full bg-stone-800 skew-x-12 transform translate-x-20"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">

          {/* Text Content */}
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-stone-800 px-3 py-1 rounded-full text-xs uppercase tracking-widest text-green-400 mb-6">
              <Monitor size={14} /> Atendimento Online
            </div>
            <h2 className="font-serif-display text-4xl md:text-5xl mb-6">Consulta Médica no Conforto da sua Casa</h2>
            <p className="text-stone-300 font-light text-lg mb-8 leading-relaxed">
              Não está em Porto Velho ou prefere a comodidade do digital? A Telemedicina permite uma avaliação detalhada, análise de exames e prescrição digital válida em todo território nacional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsSchedulingOpen(true)} className="bg-white text-stone-900 px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-stone-200 transition-colors">
                Agendar Teleconsulta
              </button>
              <div className="flex items-center gap-4 text-stone-400 text-sm">
                <span className="flex items-center gap-2"><CheckCircle size={16} /> Receita Digital</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} /> Prontuário Seguro</span>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center order-1 md:order-2 w-full">
            <div className="relative aspect-square md:aspect-[4/3] w-full max-w-sm md:max-w-md bg-stone-800 rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden shadow-2xl border border-stone-700/50">
              <img
                src="/dra-telemedicina.jpg"
                alt="Telemedicina"
                className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700 grayscale hover:grayscale-0"
              />
            </div>
            {/* Decorative */}
            <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-stone-700/50 rounded-tr-3xl -z-10 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-stone-50 border-b border-stone-200">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-stone-500 text-xs uppercase tracking-[0.2em]">Depoimentos</span>
            <h2 className="font-serif-display text-4xl text-stone-900 mt-2">Histórias Reais</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Mariana S.",
                role: "Paciente de Check-up",
                text: "Pela primeira vez senti que uma médica realmente me ouviu. A Dra. Nathália não olhou apenas meus exames, mas entendeu minha rotina. O tratamento fez sentido e mudou minha disposição."
              },
              {
                name: "Carlos Eduardo",
                role: "Telemedicina",
                text: "Estava receoso com consulta online, mas foi impecável. A atenção aos detalhes e a facilidade de receber a receita no celular foram incríveis. Recomendo para todos."
              },
              {
                name: "Fernanda L.",
                role: "Saúde da Mulher",
                text: "O ambiente acolhedor e a calma da Dra. fazem toda diferença. Não é aquela consulta corrida de 15 minutos. É medicina de verdade, com tempo e carinho."
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 shadow-lg shadow-stone-200/50 rounded-2xl relative hover:-translate-y-1 transition-all">
                <div className="text-yellow-400 flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-stone-600 font-light italic mb-6 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-serif-display text-stone-900 text-lg">{t.name}</p>
                  <p className="text-stone-400 text-xs uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="dúvidas" className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-serif-display text-4xl text-stone-900">Dúvidas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Você atende por convênios?",
                a: "Atualmente, o atendimento é particular para garantir o tempo e a qualidade que você merece. No entanto, fornecemos nota fiscal para solicitação de reembolso junto ao seu plano de saúde."
              },
              {
                q: "Como funciona a Telemedicina?",
                a: "Realizamos uma videochamada segura. Você recebe o link no WhatsApp. Durante a consulta, conversamos, avalio seus exames (que você pode enviar antes) e envio receitas e pedidos de exame digitalmente via SMS/Email."
              },
              {
                q: "Qual o endereço do consultório?",
                a: "O consultório está localizado em uma região central e acessível de Porto Velho. O endereço completo é enviado no momento da confirmação do agendamento."
              },
              {
                q: "Quanto tempo dura a consulta?",
                a: "Reservamos 1 hora para a primeira consulta. Não trabalhamos com pressa. O foco é resolver sua queixa com calma."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-stone-200">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-stone-50 transition-colors"
                >
                  <span className="font-body font-medium text-stone-800">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-stone-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-stone-600 font-light leading-relaxed border-t border-stone-100">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row shadow-2xl shadow-stone-200/50 overflow-hidden">

            {/* Contact Info */}
            <div className="md:w-2/5 bg-stone-900 p-12 text-white flex flex-col justify-between relative overflow-hidden group">
              {/* Background Image Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/dra-contato.jpg"
                  alt="Dra. Nathália"
                  className="w-full h-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:opacity-40 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/80"></div>
              </div>

              <div className="relative z-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-stone-800 rounded-bl-full opacity-50 mix-blend-overlay"></div>

                <div>
                  <span className="text-stone-400 text-xs uppercase tracking-[0.2em]">Contato</span>
                  <h2 className="font-serif-display text-4xl mt-4 mb-8">Vamos cuidar da sua saúde?</h2>
                  <p className="text-stone-300 font-light mb-12 leading-relaxed">
                    Entre em contato para agendar sua consulta presencial ou online. Nossa equipe retornará o mais breve possível.
                  </p>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-stone-800/80 backdrop-blur-sm p-3 rounded-full"><Phone size={20} className="text-stone-300" /></div>
                      <div>
                        <p className="text-xs uppercase text-stone-400 tracking-wider mb-1">Telefone / WhatsApp</p>
                        <p className="text-lg font-medium">+55 (69) 99999-9999</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-stone-800/80 backdrop-blur-sm p-3 rounded-full"><Mail size={20} className="text-stone-300" /></div>
                      <div>
                        <p className="text-xs uppercase text-stone-400 tracking-wider mb-1">Email</p>
                        <p className="text-lg font-medium">contato@dranathalia.com.br</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-stone-800/80 backdrop-blur-sm p-3 rounded-full"><MapPin size={20} className="text-stone-300" /></div>
                      <div>
                        <p className="text-xs uppercase text-stone-400 tracking-wider mb-1">Localização</p>
                        <p className="text-lg font-medium">Porto Velho - RO</p>
                        <p className="text-sm text-stone-400">Bairro Olaria, Av. Pinheiro Machado</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <a href="#" className="p-2 bg-stone-800/80 backdrop-blur-sm hover:bg-white hover:text-stone-900 transition-all rounded-full"><Instagram size={20} /></a>
                  <a href="#" className="p-2 bg-stone-800/80 backdrop-blur-sm hover:bg-white hover:text-stone-900 transition-all rounded-full"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:w-3/5 bg-white p-12">
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleContactSubmit(); }}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-stone-900 transition-colors">Nome Completo</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors"
                      placeholder="Digite seu nome"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-stone-900 transition-colors">Telefone</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors"
                      placeholder="(XX) 99999-9999"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-stone-900 transition-colors">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2 group-focus-within:text-stone-900 transition-colors">Como posso ajudar?</label>
                  <textarea
                    rows="4"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-stone-50 p-4 border-none focus:ring-1 focus:ring-stone-300 transition-all resize-none text-stone-700"
                    placeholder="Descreva brevemente sua necessidade..."
                  ></textarea>
                </div>

                <button className="w-full md:w-auto bg-stone-900 text-white px-10 py-4 hover:bg-stone-800 transition-all uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2">
                  Enviar Mensagem <ArrowRight size={16} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-16 font-body text-sm">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12 border-b border-stone-800 pb-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-serif-display text-2xl mb-6">Dra. Nathália Lima Souza</h3>
            <p className="max-w-xs leading-relaxed mb-6 text-stone-500">
              Medicina integrativa com foco na prevenção e no cuidado humanizado. Sua saúde em primeiro lugar.
            </p>
            <div className="text-stone-600 text-xs uppercase tracking-wider">
              CRM-RO 12072
            </div>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              {['Sobre', 'Atendimento', 'Telemedicina', 'Dúvidas'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors block">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-6">Atendimento</h4>
            <ul className="space-y-4 text-stone-500">
              <li className="flex items-center gap-2"><Clock size={14} /> Seg - Sex: 08h às 18h</li>
              <li className="flex items-center gap-2"><Clock size={14} /> Sáb: 08h às 12h</li>
              <li className="pt-4 text-stone-600 text-xs">Atendimento com hora marcada.</li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest text-stone-600">
          <p>&copy; 2024 Dra. Nathália Lima Souza.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
