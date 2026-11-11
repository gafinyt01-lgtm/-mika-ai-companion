 "use client";

import { useMemo, useState } from "react";
import {
  ArrowUp, AudioLines, Heart, MessageCircle, Mic, Moon, MoreHorizontal,
  Sparkles, Smile, Volume2, VolumeX, WandSparkles, X
} from "lucide-react";

type Mood = "happy" | "laugh" | "sad" | "angry" | "surprised" | "sleepy";
type ChatMessage = { role: "user" | "mika"; text: string };

const moods: { id: Mood; label: string; emoji: string }[] = [
  { id: "happy", label: "Senang", emoji: "😊" },
  { id: "laugh", label: "Tertawa", emoji: "😂" },
  { id: "sad", label: "Sedih", emoji: "🥺" },
  { id: "angry", label: "Kesal", emoji: "😤" },
  { id: "surprised", label: "Kaget", emoji: "😳" },
  { id: "sleepy", label: "Ngantuk", emoji: "😴" },
];

const replies: Record<Mood, string[]> = {
  happy: ["Wahh, aku ikut senang dengarnya! Cerita lagi dong! 💜", "Yeay! Hari ini jadi makin menyenangkan! ✨"],
  laugh: ["HAHAHA! Kamu bisa aja. Aku jadi ikut ketawa! 😂", "Aduh, jangan bikin aku ketawa terus dong!"],
  sad: ["Awww, sini cerita sama aku. Aku dengerin, kok. 💜", "Nggak apa-apa kalau hari ini terasa berat. Pelan-pelan ya."],
  angry: ["E-ehh! Jangan jahilin aku terus dong! Hmph! 😤", "Ih, aku jadi manyun nih. Tapi aku tetap dengerin."],
  surprised: ["HAH?! Serius?! Ceritain dari awal!", "W-Wah! Aku nggak nyangka bakal begitu! 😳"],
  sleepy: ["Hmm... aku masih di sini kok. Ngobrol pelan-pelan ya... zZ", "Ngantuk sedikit, tapi aku masih mau nemenin kamu. 🌙"],
};

function detectMood(text: string): Mood {
  const value = text.toLowerCase();
  if (/(sedih|nangis|kecewa|capek|lelah|sendiri|kehilangan)/.test(value)) return "sad";
  if (/(marah|kesal|jengkel|sebel|benci)/.test(value)) return "angry";
  if (/(haha|wkwk|lucu|ngakak|😂)/.test(value)) return "laugh";
  if (/(serius|masa sih|wah|astaga|kaget|wow)/.test(value)) return "surprised";
  if (/(ngantuk|tidur|malam|lelah banget)/.test(value)) return "sleepy";
  return "happy";
}

export default function Home() {
  const [mood, setMood] = useState<Mood>("happy");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "mika", text: "Haii! Aku Mika. Senang akhirnya bisa ketemu kamu! Mau cerita apa hari ini? ✨" },
  ]);
  const [soundOn, setSoundOn] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const moodInfo = useMemo(() => moods.find((item) => item.id === mood)!, [mood]);

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    const nextMood = detectMood(text);
    const options = replies[nextMood];
    const reply = options[Math.floor(Math.random() * options.length)];
    setMessages((current) => [...current, { role: "user", text }, { role: "mika", text: reply }]);
    setMood(nextMood);
    setDraft("");
    setShowChat(true);
  }

  return (
    <main className="mika-app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#" aria-label="Mika home">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>mika<span className="brand-dot">.</span></span>
          <span className="alpha-tag">PREVIEW 0.1</span>
        </a>
        <div className="top-actions">
          <span className="online-pill"><i /> Mika online</span>
          <button className="icon-button" aria-label="More options"><MoreHorizontal size={19} /></button>
        </div>
      </header>

      <section className="stage">
        <div className="stage-copy">
          <div className="eyebrow"><span /> YOUR VIRTUAL COMPANION</div>
          <h1>A little magic,<br /><em>a lot of heart.</em></h1>
          <p>Teman ngobrol virtual yang selalu siap mendengarkan ceritamu.</p>
          <div className="character-name">
            <span className="name-star">✦</span>
            <div><strong>Mika</strong><small>Cheerful · Caring · Playful</small></div>
          </div>
        </div>

        <div className={`character-wrap mood-${mood}`}>
          <div className="character-halo" />
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="sparkle sparkle-a">✦</div>
          <div className="sparkle sparkle-b">✧</div>
          <div className="character-image" key={mood}>
            <img src={`/mika/${mood}.webp`} alt={`Mika dengan ekspresi ${moodInfo.label}`} />
          </div>
          <div className="mood-caption"><span>{moodInfo.emoji}</span> {moodInfo.label}</div>
        </div>

        <div className="stage-bottom">
          <div className="mood-picker">
            <span className="picker-label">EKSPRESI MIKA</span>
            <div className="mood-list">
              {moods.map((item) => (
                <button key={item.id} onClick={() => setMood(item.id)} className={`mood-button ${mood === item.id ? "active" : ""}`} title={item.label} aria-label={`Ekspresi ${item.label}`}>
                  <span>{item.emoji}</span><small>{item.label}</small>
                </button>
              ))}
            </div>
          </div>
          <div className="stage-controls">
            <button className={`round-control ${soundOn ? "selected" : ""}`} onClick={() => setSoundOn(!soundOn)} aria-label="Toggle sound">
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button className="round-control" onClick={() => setShowChat(!showChat)} aria-label="Toggle chat">
              {showChat ? <MessageCircle size={18} /> : <X size={18} />}
            </button>
          </div>
        </div>
      </section>

      {showChat && (
        <aside className="chat-panel">
          <div className="chat-heading">
            <div className="chat-avatar">M</div>
            <div><strong>Obrolan dengan Mika</strong><small><i /> Siap mendengarkanmu</small></div>
            <button className="chat-close" onClick={() => setShowChat(false)} aria-label="Tutup chat"><X size={17} /></button>
          </div>
          <div className="chat-messages">
            {messages.slice(-5).map((message, index) => (
              <div key={`${index}-${message.text}`} className={`message-row ${message.role}`}>
                {message.role === "mika" && <span className="mini-avatar">M</span>}
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ceritakan sesuatu ke Mika..." aria-label="Pesan untuk Mika" />
            <button type="submit" disabled={!draft.trim()} aria-label="Kirim pesan"><ArrowUp size={18} /></button>
          </form>
          <div className="chat-footnote"><WandSparkles size={12} /> Demo UI · Balasan masih simulasi, belum terhubung ke AI.</div>
        </aside>
      )}

      <footer className="footer-note">
        <span><Heart size={12} /> Made with care</span>
        <span>MIKA AI COMPANION <b>·</b> CONCEPT 2026</span>
      </footer>
    </main>
  );
}
