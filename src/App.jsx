import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// --- TRANSLATIONS ---
const translations = {
  en: {
    hero_title: "Your Vote. Your Voice. Your Right.",
    step1_title: "Check Eligibility",
    step1_desc: "Age 18+, Indian citizen.",
    step2_title: "Register as Voter",
    step2_desc: "NVSP / Voter Helpline 1950.",
    step3_title: "Get Voter ID",
    step3_desc: "Download your e-EPIC.",
    step4_title: "Find Polling Booth",
    step4_desc: "Check your constituency or pincode.",
    step5_title: "Cast Your Vote",
    step5_desc: "Follow EVM instructions.",
    timeline_title: "Election Timeline",
    chat_header: "AI Election Guide",
    placeholder_input: "Ask me anything...",
    booth_title: "Find Your Polling Booth",
    booth_search: "Enter your constituency or pincode",
    booth_btn: "Find Booth",
    video_title: "Learn & Prepare",
    footer_tag: "Powered by AI | Not affiliated with ECI",
    listen_btn: "Listen",
    read_more: "Learn More"
  },
  te: {
    hero_title: "మీ ఓటు. మీ గొంతు. మీ హక్కు.",
    step1_title: "అర్హత తనిఖీ చేయండి",
    step1_desc: "18+ వయస్సు, భారతీయ పౌరులు.",
    step2_title: "నమోదు చేసుకోండి",
    step2_desc: "NVSP / ఓటర్ హెల్ప్‌లైన్ 1950.",
    step3_title: "ఓటరు ID పొందండి",
    step3_desc: "e-EPIC డౌన్‌లోడ్ చేసుకోండి.",
    step4_title: "బూత్‌ను కనుగొనండి",
    step4_desc: "నియోజకవర్గం లేదా పిన్‌కోడ్ తనిఖీ చేయండి.",
    step5_title: "ఓటు వేయండి",
    step5_desc: "EVM సూచనలను అనుసరించండి.",
    timeline_title: "ఎన్నికల టైమ్‌లైన్",
    chat_header: "AI ఎన్నికల గైడ్",
    placeholder_input: "నన్ను అడగండి...",
    booth_title: "మీ పోలింగ్ బూత్‌ను కనుగొనండి",
    booth_search: "నియోజకవర్గం లేదా పిన్‌కోడ్‌ను నమోదు చేయండి",
    booth_btn: "బూత్ కనుగొనండి",
    video_title: "నేర్చుకోండి & సిద్ధం చేయండి",
    footer_tag: "AI పవర్డ్ | ECI తో అనుబంధం లేదు",
    listen_btn: "వినండి",
    read_more: "మరింత తెలుసుకోండి"
  },
  hi: {
    hero_title: "आपका वोट। आपकी आवाज़। आपका अधिकार।",
    step1_title: "पात्रता जांचें",
    step1_desc: "उम्र 18+, भारतीय नागरिक।",
    step2_title: "पंजीकरण करें",
    step2_desc: "NVSP / हेल्पलाइन 1950।",
    step3_title: "वोटर आईडी प्राप्त करें",
    step3_desc: "अपना e-EPIC डाउनलोड करें।",
    step4_title: "पोलिंग बूथ खोजें",
    step4_desc: "अपना पिनकोड जांचें।",
    step5_title: "अपना वोट डालें",
    step5_desc: "ईवीएम निर्देशों का पालन करें।",
    timeline_title: "चुनाव समयरेखा",
    chat_header: "AI चुनाव गाइड",
    placeholder_input: "मुझसे कुछ भी पूछें...",
    booth_title: "अपना पोलिंग बूथ खोजें",
    booth_search: "निर्वाचन क्षेत्र या पिनकोड दर्ज करें",
    booth_btn: "बूथ खोजें",
    video_title: "सीखें और तैयारी करें",
    footer_tag: "AI द्वारा संचालित | ECI से संबद्ध नहीं",
    listen_btn: "सुनें",
    read_more: "और जानें"
  },
  mr: {
    hero_title: "तुमचे मत. तुमचा आवाज. तुमचा अधिकार.",
    step1_title: "पात्रता तपासा",
    step1_desc: "वय 18+, भारतीय नागरिक.",
    step2_title: "नोंदणी करा",
    step2_desc: "NVSP / हेल्पलाइन 1950.",
    step3_title: "मतदार ओळखपत्र मिळवा",
    step3_desc: "तुमचे e-EPIC डाउनलोड करा.",
    step4_title: "मतदान केंद्र शोधा",
    step4_desc: "तुमचा पिनकोड तपासा.",
    step5_title: "मतदान करा",
    step5_desc: "EVM सूचनांचे पालन करा.",
    timeline_title: "निवडणूक वेळापत्रक",
    chat_header: "AI निवडणूक मार्गदर्शक",
    placeholder_input: "मला काहीही विचारा...",
    booth_title: "तुमचे मतदान केंद्र शोधा",
    booth_search: "मतदारसंघ किंवा पिनकोड टाका",
    booth_btn: "केंद शोधा",
    video_title: "शिका आणि तयारी करा",
    footer_tag: "AI द्वारे समर्थित | ECI शी संलग्न नाही",
    listen_btn: "ऐका",
    read_more: "अधिक जाणून घ्या",
    lang_name: "MARATHI"
  },
  ta: {
    hero_title: "உங்கள் வாக்கு. உங்கள் குரல். உங்கள் உரிமை.",
    step1_title: "தகுதியை சரிபார்க்கவும்",
    step1_desc: "வயது 18+, இந்திய குடிமகன்.",
    step2_title: "வாக்காளராக பதிவு செய்க",
    step2_desc: "NVSP / ஹெல்ப்லைன் 1950.",
    step3_title: "வாக்காளர் அட்டையை பெறுக",
    step3_desc: "உங்கள் e-EPIC ஐ பதிவிறக்கவும்.",
    step4_title: "வாக்குச்சாவடியைக் கண்டறியவும்",
    step4_desc: "உங்கள் பின்கோடை சரிபார்க்கவும்.",
    step5_title: "வாக்களிக்கவும்",
    step5_desc: "EVM வழிமுறைகளைப் பின்பற்றவும்.",
    timeline_title: "தேர்தல் காலவரிசை",
    chat_header: "AI தேர்தல் வழிகாட்டி",
    placeholder_input: "என்னிடம் எதையும் கேளுங்கள்...",
    booth_title: "உங்கள் வாக்குச்சாவடியைக் கண்டறியவும்",
    booth_search: "தொகுதி அல்லது பின்கோடை உள்ளிடவும்",
    booth_btn: "வாக்குச்சாவடியை கண்டறிக",
    video_title: "கற்றுக்கொள்ளுங்கள் & தயாராகுங்கள்",
    footer_tag: "AI ஆல் இயக்கப்படுகிறது | ECI உடன் இணைக்கப்படவில்லை",
    listen_btn: "கேளுங்கள்",
    read_more: "மேலும் அறிக",
    lang_name: "TAMIL"
  },
  kn: {
    hero_title: "ನಿಮ್ಮ ಮತ. ನಿಮ್ಮ ಧ್ವನಿ. ನಿಮ್ಮ ಹಕ್ಕು.",
    step1_title: "ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    step1_desc: "ವಯಸ್ಸು 18+, ಭಾರತೀಯ ಪ್ರಜೆ.",
    step2_title: "ನೋಂದಾಯಿಸಿ",
    step2_desc: "NVSP / ಸಹಾಯವಾಣಿ 1950.",
    step3_title: "ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಪಡೆಯಿರಿ",
    step3_desc: "ನಿಮ್ಮ e-EPIC ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
    step4_title: "ಮತದಾನ ಕೇಂದ್ರವನ್ನು ಹುಡುಕಿ",
    step4_desc: "ನಿಮ್ಮ ಪಿನ್‌ಕೋಡ್ ಪರಿಶೀಲಿಸಿ.",
    step5_title: "ಮತ ಚಲಾಯಿಸಿ",
    step5_desc: "EVM ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
    timeline_title: "ಚುನಾವಣಾ ಟೈಮ್‌ಲೈನ್",
    chat_header: "AI ಚುನಾವಣಾ ಮಾರ್ಗದರ್ಶಿ",
    placeholder_input: "ನನ್ನನ್ನು ಏನನ್ನಾದರೂ ಕೇಳಿ...",
    booth_title: "ನಿಮ್ಮ ಮತದಾನ ಕೇಂದ್ರವನ್ನು ಹುಡುಕಿ",
    booth_search: "ಕ್ಷೇತ್ರ ಅಥವಾ ಪಿನ್‌ಕೋಡ್ ನಮೂದಿಸಿ",
    booth_btn: "ಕೇಂದ್ರವನ್ನು ಹುಡುಕಿ",
    video_title: "ಕಲಿಯಿರಿ ಮತ್ತು ಸಿದ್ಧರಾಗಿ",
    footer_tag: "AI ನಿಂದ ನಡೆಸಲ್ಪಡುತ್ತದೆ | ECI ನೊಂದಿಗೆ ಸಂಯೋಜಿತವಾಗಿಲ್ಲ",
    listen_btn: "ಆಲಿಸಿ",
    read_more: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    lang_name: "KANNADA"
  }
};

// --- STYLES ---
const GlobalStyle = createGlobalStyle`
  :root {
    --navy: #0B1628;
    --amber: #F4A523;
    --white: #F9F6F0;
    --ink-red: #C0392B;
    --font-heading: 'Playfair Display', serif;
    --font-body: 'DM Sans', sans-serif;
    --font-numbers: 'Bebas Neue', sans-serif;
  }

  body {
    margin: 0;
    font-family: var(--font-body);
    background-color: var(--navy);
    color: var(--white);
    overflow-x: hidden;
    background-image: 
      radial-gradient(rgba(244, 165, 35, 0.1) 1px, transparent 1px),
      radial-gradient(rgba(244, 165, 35, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
  }

  h1, h2, h3, h4 { font-family: var(--font-heading); margin: 0; }
  .bebas { font-family: var(--font-numbers); }
  
  * { box-sizing: border-box; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(249, 246, 240, 0.1);
`;

const LangSelector = styled.div`
  display: flex;
  gap: 10px;
`;

const LangPill = styled.button`
  background: ${props => props.active ? 'var(--amber)' : 'transparent'};
  color: ${props => props.active ? 'var(--navy)' : 'var(--white)'};
  border: 1px solid var(--amber);
  padding: 5px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-family: var(--font-body);
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background: var(--amber);
    color: var(--navy);
  }
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 80px 0;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  line-height: 1.1;
  color: var(--amber);
  margin-bottom: 20px;
  @media (max-width: 768px) { font-size: 3rem; }
`;

const dropAnimation = keyframes`
  0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(20px) rotate(10deg); opacity: 0; }
`;

const HeroAnimation = styled.div`
  position: relative;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  svg.ballot {
    position: absolute;
    top: 0;
    width: 80px;
    height: 100px;
    fill: var(--white);
    animation: ${dropAnimation} 2s infinite ease-in;
  }
  svg.box {
    width: 150px;
    height: 150px;
    fill: var(--amber);
    z-index: 2;
  }
`;

const Divider = styled.div`
  height: 100px;
  background: var(--white);
  clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%);
`;

const StepsSection = styled.section`
  background: var(--white);
  color: var(--navy);
  padding: 80px 0;
`;

const StepsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const StepCardStyled = styled.div`
  background: #fff;
  border: 2px solid var(--navy);
  padding: 20px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  transform: perspective(600px) rotateX(-5deg);
  transform-origin: top;
  box-shadow: 5px 5px 0px var(--amber);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  
  &.visible {
    opacity: 1;
    transform: perspective(600px) rotateX(0deg);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 8px 8px 0px var(--amber);
  }
`;

const StepNumber = styled.div`
  font-size: 3rem;
  color: var(--ink-red);
  line-height: 1;
`;

const StepContent = styled.div`
  flex: 1;
`;

const ListenBtn = styled.button`
  background: var(--navy);
  color: var(--white);
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.2s;
  &:hover { background: var(--amber); color: var(--navy); }
`;

const TimelineSection = styled.section`
  padding: 80px 0;
  background: var(--navy);
`;

const TimelineScroll = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding: 20px 0;
  scrollbar-width: thin;
  scrollbar-color: var(--amber) var(--navy);
`;

const TimelineCard = styled.div`
  min-width: 250px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 20px;
  position: relative;
  
  .date { font-size: 2rem; color: var(--amber); }
  .dot {
    width: 12px; height: 12px; border-radius: 50%;
    position: absolute; top: 20px; right: 20px;
    background: ${props => props.status === 'urgent' ? 'var(--ink-red)' : props.status === 'done' ? '#2ecc71' : 'var(--amber)'};
  }
`;

const BoothSection = styled.section`
  padding: 80px 0;
  background: var(--white);
  color: var(--navy);
`;

const BoothForm = styled.form`
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 30px auto;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: 2px solid var(--navy);
  font-size: 1rem;
  font-family: var(--font-body);
`;

const Button = styled.button`
  background: var(--navy);
  color: var(--white);
  border: none;
  padding: 15px 30px;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 0; height: 0;
    background: var(--amber);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
    z-index: 1;
  }
  
  &:hover:after { width: 300px; height: 300px; }
  
  span { position: relative; z-index: 2; transition: color 0.4s; }
  &:hover span { color: var(--navy); }
`;

const ChatBubble = styled.div`
  position: fixed;
  bottom: 30px; right: 30px;
  width: 60px; height: 60px;
  background: var(--amber);
  border-radius: 50%;
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 1000;
  transition: transform 0.2s;
  &:hover { transform: scale(1.1); }
  svg { fill: var(--navy); width: 30px; height: 30px; }
`;

const ChatPanel = styled.div`
  position: fixed;
  bottom: 100px; right: 30px;
  width: 350px; height: 500px;
  background: var(--navy);
  border: 2px solid var(--amber);
  border-radius: 10px;
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  @media (max-width: 400px) {
    width: 90%; right: 5%; bottom: 80px;
  }
`;

const ChatHeader = styled.div`
  padding: 15px;
  background: var(--amber);
  color: var(--navy);
  font-family: var(--font-heading);
  font-weight: bold;
  display: flex; justify-content: space-between;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 10px;
`;

const Msg = styled.div`
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 80%;
  font-size: 0.9rem;
  background: ${props => props.isUser ? 'var(--amber)' : '#1A2A42'};
  color: ${props => props.isUser ? 'var(--navy)' : 'var(--white)'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  border-bottom-right-radius: ${props => props.isUser ? '0' : '15px'};
  border-bottom-left-radius: ${props => props.isUser ? '15px' : '0'};
`;

const ChatInput = styled.div`
  padding: 15px;
  display: flex; gap: 10px; flex-direction: column;
  border-top: 1px solid rgba(255,255,255,0.1);
  input { flex: 1; padding: 10px; border-radius: 4px; border: none; }
  button { background: var(--amber); border: none; padding: 10px; cursor: pointer; font-weight: bold; border-radius: 4px; }
`;

const QuickChips = styled.div`
  display: flex; gap: 5px; overflow-x: auto; padding-bottom: 5px;
  scrollbar-width: none;
  button {
    white-space: nowrap;
    background: rgba(255,255,255,0.1); color: var(--white);
    border: 1px solid var(--amber); padding: 5px 10px; border-radius: 15px;
    font-size: 0.8rem; cursor: pointer;
  }
`;

const typingAnim = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

const TypingDot = styled.span`
  display: inline-block; width: 6px; height: 6px;
  background: var(--white); border-radius: 50%; margin: 0 2px;
  animation: ${typingAnim} 1s infinite;
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

const Footer = styled.footer`
  background: var(--navy);
  border-top: 5px solid var(--amber);
  padding: 40px 0;
  text-align: center;
  color: rgba(255,255,255,0.6);
`;

// --- ICONS ---
const Icons = {
  Box: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 8h-2V5c0-1.1-.9-2-2-2H9C7.9 3 7 3.9 7 5v3H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 8H7v-2h6v2zm-2-8H9V5h4v3z"/></svg>,
  ID: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 15H5v-2h7v2zm0-4H5v-2h7v2zm8-2h-6V7h6v5z"/></svg>,
  Pin: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  EVM: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
};

// --- COMPONENTS ---

const StepCard = ({ number, title, desc, icon, lang }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const speak = () => {
    const text = `${title}. ${desc}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    speechSynthesis.speak(utter);
  };

  return (
    <StepCardStyled ref={ref}>
      <StepNumber className="bebas">{number}</StepNumber>
      <div style={{ color: 'var(--amber)' }}>{icon}</div>
      <StepContent>
        <h3>{title}</h3>
        <p>{desc}</p>
      </StepContent>
      <ListenBtn onClick={speak}>
        🔊 <span>{translations[lang].listen_btn}</span>
      </ListenBtn>
    </StepCardStyled>
  );
};

const Timeline = ({ lang, electionData }) => {
  let milestones = [];

  if (electionData && electionData.status === 'completed') {
    milestones = [
      { date: "DONE", label: "Voter Registration", status: "done" },
      { date: "DONE", label: "Campaign End", status: "done" },
      { date: electionData.electionDate, label: "Polling Day", status: "done" },
      { date: "DECLARED", label: "Results Declared", status: "done" }
    ];
  } else if (electionData && electionData.status === 'upcoming') {
    milestones = [
      { date: "UPCOMING", label: "Voter Registration", status: "urgent" },
      { date: "TBD", label: "Campaign End", status: "upcoming" },
      { date: electionData.electionDate, label: "Polling Day", status: "upcoming" },
      { date: "TBD", label: "Results", status: "upcoming" }
    ];
  } else {
    milestones = [
      { date: "APR 15", label: "Voter Reg. Deadline", status: "done" },
      { date: "MAY 02", label: "Nomination Filing", status: "done" },
      { date: "MAY 18", label: "Campaign End", status: "urgent" },
      { date: "MAY 20", label: "Polling Day", status: "upcoming" },
      { date: "JUN 04", label: "Results", status: "upcoming" }
    ];
  }

  return (
    <TimelineSection>
      <Container>
        <h2 style={{ color: 'var(--amber)', fontSize: '3rem', textAlign: 'center' }}>
          {electionData && electionData.status === 'completed' ? "Election Timeline (Completed)" : translations[lang].timeline_title}
        </h2>
        <TimelineScroll>
          {milestones.map((m, i) => (
            <TimelineCard key={i} status={m.status}>
              <div className="dot"></div>
              <div className="bebas date">{m.date}</div>
              <div>{m.label}</div>
            </TimelineCard>
          ))}
        </TimelineScroll>
      </Container>
    </TimelineSection>
  );
};

export default function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello! I am your AI Election Guide. Ask me anything about voting.", isUser: false }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // New States for Full Stack Integration
  const [pincode, setPincode] = useState("");
  const [electionData, setElectionData] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChat = async (e, directMessage = null) => {
    if (e) e.preventDefault();
    const textToSend = directMessage || input;
    if (!textToSend.trim()) return;
    
    const newMsg = { text: textToSend, isUser: true };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, lang })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Error connecting to AI service.", isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!pincode.trim()) {
      setErrorMsg("Please enter a pincode or state name.");
      return;
    }
    
    setErrorMsg("");
    setLoadingLocation(true);
    try {
      let stateName = pincode.trim();

      // If it's a 6-digit number, treat it as a pincode and get the state from OpenCage
      if (/^\d{6}$/.test(stateName)) {
        const locResponse = await fetch(`/api/location?pincode=${stateName}`);
        if (!locResponse.ok) throw new Error("Invalid location");
        const locData = await locResponse.json();
        stateName = locData.state;
      }

      // Fetch election data using the state name
      const eleResponse = await fetch(`/api/election-data?state=${stateName}`);
      if (!eleResponse.ok) throw new Error("Failed to fetch data");
      const eleData = await eleResponse.json();
      
      setElectionData({ ...eleData, state: stateName });
    } catch (err) {
      if (err.message === "Invalid location") {
        setErrorMsg("Invalid location - Could not find state for this pincode.");
      } else {
        setErrorMsg("Could not fetch data. Is the backend running?");
      }
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      
      <Container>
        <Header>
          <div className="bebas" style={{ fontSize: '2rem', color: 'var(--amber)' }}>DEMOCRATIC INK</div>
          <LangSelector>
            {Object.keys(translations).map(l => (
              <LangPill key={l} active={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </LangPill>
            ))}
          </LangSelector>
        </Header>

        <HeroSection>
          <div>
            <HeroTitle>{t.hero_title}</HeroTitle>
            <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
              Stay informed. Register on time. Make your voice heard in the upcoming elections.
            </p>
          </div>
          <HeroAnimation>
            <svg className="ballot" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            <svg className="box" viewBox="0 0 24 24"><path d="M19 8h-2V5c0-1.1-.9-2-2-2H9C7.9 3 7 3.9 7 5v3H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 8H7v-2h6v2zm-2-8H9V5h4v3z"/></svg>
          </HeroAnimation>
        </HeroSection>
      </Container>

      <Divider />

      <StepsSection>
        <Container>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '40px' }}>How to Vote</h2>
          <StepsGrid>
            <StepCard number="01" title={t.step1_title} desc={t.step1_desc} icon={<Icons.Check/>} lang={lang} />
            <StepCard number="02" title={t.step2_title} desc={t.step2_desc} icon={<Icons.ID/>} lang={lang} />
            <StepCard number="03" title={t.step3_title} desc={t.step3_desc} icon={<Icons.ID/>} lang={lang} />
            <StepCard number="04" title={t.step4_title} desc={t.step4_desc} icon={<Icons.Pin/>} lang={lang} />
            <StepCard number="05" title={t.step5_title} desc={t.step5_desc} icon={<Icons.EVM/>} lang={lang} />
          </StepsGrid>
        </Container>
      </StepsSection>

      {/* Dynamic Location & Election Data Section */}
      <section style={{ padding: '80px 0', background: 'var(--white)', color: 'var(--navy)' }}>
        <Container>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '20px' }}>Local Election Data</h2>
          <BoothForm onSubmit={handleLocationSearch}>
            <Input 
              placeholder="Enter Pincode (e.g. 110001) or State Name (e.g. Delhi)" 
              value={pincode}
              onChange={e => setPincode(e.target.value)}
              required 
            />
            <Button type="submit" disabled={loadingLocation}>
              <span>{loadingLocation ? "Searching..." : "Get Data"}</span>
            </Button>
          </BoothForm>
          {errorMsg && <p style={{ color: 'var(--ink-red)', textAlign: 'center' }}>{errorMsg}</p>}

          {electionData && (
            <div style={{ background: '#f5f5f5', padding: '30px', borderRadius: '10px', marginTop: '30px', border: `3px solid ${electionData.status === 'completed' ? '#2ecc71' : electionData.status === 'upcoming' ? 'var(--amber)' : '#999'}` }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>State: {electionData.state}</h3>
              {electionData.constituencyType && <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Election Type: <strong>{electionData.constituencyType}</strong></p>}
              {electionData.constituency && <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Constituency: <strong>{electionData.constituency}</strong></p>}
              
              {electionData.status === 'completed' ? (
                <div>
                  <h4 style={{ color: '#2ecc71', fontSize: '1.5rem', background: '#e8f8f5', display: 'inline-block', padding: '5px 10px', borderRadius: '5px' }}>✅ Election Completed</h4>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '2', marginTop: '15px' }}>
                    <li><strong>Winner:</strong> {electionData.winner}</li>
                    <li><strong>Party:</strong> {electionData.party}</li>
                    <li><strong>Vote Share:</strong> {electionData.voteShare || electionData.votes}</li>
                    <li><strong>Date:</strong> {electionData.electionDate}</li>
                  </ul>
                </div>
              ) : electionData.status === 'upcoming' ? (
                <div>
                  <h4 style={{ color: 'var(--amber)', fontSize: '1.5rem', background: '#fef5e7', display: 'inline-block', padding: '5px 10px', borderRadius: '5px' }}>⏳ Upcoming Election</h4>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '2', marginTop: '15px' }}>
                    <li><strong>Polling Date:</strong> {electionData.electionDate}</li>
                    <li><strong>Major Parties:</strong> {electionData.parties?.join(', ')}</li>
                    {electionData.candidates && <li><strong>Key Candidates:</strong> {electionData.candidates?.join(', ')}</li>}
                  </ul>
                </div>
              ) : (
                <div>
                  <h4 style={{ color: '#555', fontSize: '1.5rem', background: '#eee', display: 'inline-block', padding: '5px 10px', borderRadius: '5px' }}>We are underbuilding this service not avilable for that state</h4>
                </div>
              )}

              {electionData.booths && electionData.status !== 'none' && (
                <div style={{ marginTop: '30px', borderTop: '2px dashed #ccc', paddingTop: '20px' }}>
                  <h4>Nearby Polling Booths</h4>
                  {electionData.booths?.map((booth, i) => (
                    <div key={i} style={{ background: 'white', padding: '15px', margin: '10px 0', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                      <h5 style={{ color: 'var(--ink-red)', margin: '0 0 5px 0' }}>📍 {booth.name}</h5>
                      <p style={{ margin: 0 }}>{booth.address} | <strong>{booth.distance}</strong></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      <Timeline lang={lang} electionData={electionData} />

      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <Container>
          <h2 style={{ textAlign: 'center', fontSize: '3rem', color: 'var(--navy)', marginBottom: '40px' }}>{t.video_title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                title: "Voter Registration", 
                desc: "To register to vote, you must be an Indian citizen aged 18 or above. You can register online via the NVSP (Voters' Service Portal) or the Voter Helpline App by filling out Form 6. Ensure you have a passport-sized photograph, age proof (like Aadhaar or Birth Certificate), and address proof." 
              },
              { 
                title: "How to Use EVM", 
                desc: "Inside the voting compartment, the EVM will display candidate names and their party symbols. Press the blue button next to the symbol of your preferred candidate. A red light will glow next to it, and a long beep will sound, confirming that your vote has been recorded. Check the VVPAT slip to verify." 
              },
              { 
                title: "Election Day Process", 
                desc: "Carry your Voter ID (EPIC) or an approved alternative photo ID to your designated polling booth. A polling officer will verify your identity against the electoral roll. Your index finger will be marked with indelible ink, and you will then proceed to the EVM to cast your vote in secret." 
              }
            ].map((v, i) => (
              <div key={i} style={{ background: '#f5f5f5', padding: '30px', borderRadius: '10px', border: '2px solid var(--navy)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--amber)', fontSize: '1.8rem', marginBottom: '15px' }}>{v.title}</h3>
                <p style={{ color: '#444', lineHeight: '1.8', fontSize: '1.1rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The BoothSection was integrated into the Local Election Data section above */}
      
      <Footer>
        <Container>
          <h3>{t.footer_tag}</h3>
          <p>Helpline: 1950</p>
        </Container>
      </Footer>

      {/* AI Chatbot */}
      <ChatBubble onClick={() => setChatOpen(!chatOpen)}>
        <Icons.Box />
      </ChatBubble>

      <ChatPanel open={chatOpen}>
        <ChatHeader>
          {t.chat_header}
          <span style={{ cursor: 'pointer' }} onClick={() => setChatOpen(false)}>✖</span>
        </ChatHeader>
        <ChatMessages>
          {messages.map((m, i) => <Msg key={i} isUser={m.isUser}>{m.text}</Msg>)}
          {isTyping && <Msg isUser={false}><TypingDot/><TypingDot/><TypingDot/></Msg>}
        </ChatMessages>
        <form onSubmit={(e) => handleChat(e)}>
          <ChatInput>
            <QuickChips>
              <button type="button" onClick={() => handleChat(null, "How to register?")}>How to register?</button>
              <button type="button" onClick={() => handleChat(null, "Required documents?")}>Required documents?</button>
              <button type="button" onClick={() => handleChat(null, "How to use EVM?")}>How to use EVM?</button>
            </QuickChips>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder={t.placeholder_input} />
              <button type="submit">➤</button>
            </div>
          </ChatInput>
        </form>
      </ChatPanel>
    </>
  );
}
