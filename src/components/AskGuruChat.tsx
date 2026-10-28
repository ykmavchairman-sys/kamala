import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, PhoneCall } from 'lucide-react';
import { AstrologicalReport } from '../types/astrology';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  report?: AstrologicalReport | null;
  onOpenBooking: () => void;
}

interface Message {
  sender: 'user' | 'guru';
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  'Can I wear Yellow Sapphire (Pukhraj) and Blue Sapphire (Neelam) together?',
  'Why is the open-back skin touch ring setting mandatory in Vedic astrology?',
  'How do I test if my Ruby or Emerald is 100% natural and unheated?',
  'Which hand and finger is recommended for women vs men in Jyotish?',
  'What should I do if I cannot afford a natural Diamond or Emerald?'
];

export const AskGuruChat: React.FC<Props> = ({ report, onOpenBooking }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'guru',
      text: `Namaste! I am Acharya Nukala Srinivas Rao, Chief Astrologer & Master Gemologist at Lucky Stone Guru. ${
        report
          ? `I see your Ascendant is ${report.lagnaRashi} and your lucky life stone is ${report.primaryStone.name}. How may I guide your planetary remedies today?`
          : 'Welcome to Lucky Stone Guru. Share your birth details or ask any questions regarding Vedic gemstones, planetary doshas, or sacred jewelry rituals.'
      }`,
      time: 'Just now'
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (questionToSend?: string) => {
    const q = questionToSend || inputQuestion;
    if (!q.trim() || loading) return;

    bellPlayer.playBell(587);

    const userMsg: Message = {
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask-gemologist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          userContext: report
            ? {
                name: report.input.name,
                lagna: report.lagnaRashi,
                moon: report.moonRashi,
                primaryStone: report.primaryStone.name,
                lifeGoal: report.input.lifeGoal,
              }
            : null,
        }),
      });

      let answerText = '';
      if (res.ok) {
        const text = await res.text();
        if (text && !text.trim().startsWith('<')) {
          try {
            const data = JSON.parse(text);
            answerText = data.answer || '';
          } catch {
            answerText = '';
          }
        }
      }

      if (!answerText) {
        const lowerQ = q.toLowerCase();
        if (lowerQ.includes('pukhraj') && lowerQ.includes('neelam')) {
          answerText = 'Namaste! Yellow Sapphire (Guru) and Blue Sapphire (Shani) are neutral to mildly adversarial. They should only be combined for Capricorn or Aquarius ascendants with specific yogas, as combining them can otherwise induce mental restlessness. Always verify your birth chart first.';
        } else if (lowerQ.includes('skin') || lowerQ.includes('open back')) {
          answerText = 'Namaste! An open-back bezel setting is crucial in Vedic astrology because the gemstone\'s pavilion must touch the skin to transmit cosmic electromagnetic rays directly into your body nadis. Closed-back settings diminish planetary potency significantly.';
        } else if (lowerQ.includes('finger') || lowerQ.includes('hand')) {
          answerText = 'Namaste! Prescribed Jyotish fingers: Index finger for Yellow Sapphire (Jupiter); Ring finger for Ruby (Sun) and Red Coral (Mars); Middle finger for Blue Sapphire (Saturn) and Hessonite (Rahu); Little finger for Emerald (Mercury) and Pearl (Moon). Wear on your active working hand.';
        } else if (lowerQ.includes('real') || lowerQ.includes('test') || lowerQ.includes('unheated')) {
          answerText = 'Namaste! Astrological gemstones must be 100% natural and unheated. Heat treatment alters the atomic crystal lattice and neutralizes planetary healing rays. Always insist on an IGI, GIA, or Government-recognized lab certificate with microscopic inclusion verification.';
        } else {
          answerText = `Namaste! In classical Vedic astrology, natural gemstones act as optical prisms harmonizing your 9th house (Bhagya Sthana) and Lagna vitality. Ensure your gemstone is unheated, lab-certified, mounted in an open-back setting, and energized during Shukla Paksha. Feel free to schedule a free video call with our senior astrologer!`;
        }
      }

      bellPlayer.playBell(528);

      const guruMsg: Message = {
        sender: 'guru',
        text: answerText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, guruMsg]);
    } catch {
      const guruMsg: Message = {
        sender: 'guru',
        text: 'Namaste! As per our Vedic traditions, gemstones must touch the skin through an open-back setting to transmit planetary rays directly into your lymphatic and nervous system. Ensure you wear only unheated, lab-certified stones energised with the correct Beej Mantra on an auspicious Shukla Paksha day.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, guruMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header (Pearl White & Tan Glassmorphic) */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(179,128,72,0.12)] flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#B38048]/35">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 aspect-square rounded-2xl bg-white p-1 shadow-sm shrink-0 border border-[#B38048]/35 flex items-center justify-center">
            <img
              src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
              alt="Lucky Stone Guru Logo"
              className="w-full h-full aspect-square object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif-royal text-xl sm:text-2xl font-bold text-stone-900">
                Acharya Nukala Srinivas Rao
              </h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-[#B38048] font-bold">
              Founder & Chief Astrologer • Lucky Stone Guru
            </p>
            <span className="text-[11px] text-stone-500 font-medium block mt-0.5">
              Available for real-time Vedic horoscope & gemstone inquiry
            </span>
          </div>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C59359] via-[#B38048] to-[#8F5E29] text-white text-xs font-bold uppercase tracking-wider hover:brightness-105 shadow-[0_4px_16px_rgba(179,128,72,0.3)] transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          Schedule Video Call
        </button>
      </div>

      {/* Chat Messages Box */}
      <div className="glass-card rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 border border-[#B38048]/30">
        <div className="h-96 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-9 h-9 aspect-square rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-br from-[#C59359] to-[#B38048] text-white shadow-xs'
                    : 'bg-white text-[#B38048] border border-[#B38048]/35 shadow-xs overflow-hidden p-0.5'
                }`}
              >
                {m.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <img
                    src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                    alt="Lucky Stone Guru Logo"
                    className="w-full h-full aspect-square object-contain"
                  />
                )}
              </div>

              <div
                className={`max-w-[82%] sm:max-w-[70%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-[#C59359] to-[#B38048] text-white font-bold rounded-tr-none shadow-md'
                    : 'bg-white/95 text-stone-800 border border-[#B38048]/25 rounded-tl-none shadow-md font-medium'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <span
                  className={`text-[10px] block mt-1.5 font-semibold ${
                    m.sender === 'user' ? 'text-white/80 text-right' : 'text-stone-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white text-[#B38048] border border-[#B38048]/35 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-3xl bg-white/90 text-stone-600 text-xs border border-[#B38048]/25 flex items-center gap-2 shadow-xs font-medium">
                <div className="w-2 h-2 rounded-full bg-[#B38048] animate-ping" />
                <span>Acharya Nukala Srinivas Rao is examining the natal planetary coordinates...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Query Pills */}
        <div className="pt-2 border-t border-[#B38048]/25">
          <span className="text-[10px] text-[#B38048] font-extrabold uppercase tracking-wider block mb-2">
            Frequently Asked Astrological Queries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(q)}
                className="text-[11px] px-3.5 py-1.5 rounded-full bg-white/90 border border-[#B38048]/35 text-stone-800 hover:text-[#B38048] hover:border-[#B38048] hover:bg-[#B38048]/10 font-medium transition text-left shadow-2xs cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Ask anything about your gemstone, birth chart, dosha, or rituals..."
            className="flex-1 bg-white/90 border border-[#B38048]/35 rounded-2xl px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#B38048] focus:ring-2 focus:ring-[#B38048]/20 transition shadow-xs"
          />
          <button
            type="submit"
            disabled={!inputQuestion.trim() || loading}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-[#C59359] via-[#B38048] to-[#8F5E29] text-white font-bold hover:brightness-105 active:scale-95 transition disabled:opacity-40 cursor-pointer shadow-md shadow-[#B38048]/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
