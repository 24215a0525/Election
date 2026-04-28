const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files from 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 5000;
const OPENCAGE_API_KEY = "f1283192adb5480ea44a389fa2291cfa"; // Provided by user

// --- LOAD ELECTION DATASET ---
const electionDataPath = path.join(__dirname, 'data', 'electionData.json');
let electionDatabase = {};

try {
  const dataRaw = fs.readFileSync(electionDataPath, 'utf8');
  electionDatabase = JSON.parse(dataRaw);
} catch (err) {
  console.error("Failed to load electionData.json:", err.message);
}

const pollingBooths = [
  { name: "Govt High School, Room 1", address: "Main Road", distance: "0.5 km" },
  { name: "Community Center Hall A", address: "Sector 4", distance: "1.2 km" },
  { name: "Primary School Building", address: "Village Square", distance: "2.1 km" }
];

// --- 1. GEOLOCATION ENDPOINT ---
app.get('/api/location', async (req, res) => {
  const { pincode } = req.query;
  if (!pincode || pincode.length !== 6) {
    return res.status(400).json({ error: "Invalid pincode" });
  }

  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${pincode},+India&key=${OPENCAGE_API_KEY}`;
    const response = await axios.get(url);
    const results = response.data.results;

    if (results && results.length > 0) {
      const components = results[0].components;
      const state = components.state || "Unknown State";
      const district = components.state_district || components.county || "Unknown District";
      res.json({ state, district });
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
});

// --- 2. ELECTION DATA ENDPOINT ---
app.get('/api/election-data', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: "State is required" });

  // Try exact match first, then partial match since geocoding might return "National Capital Territory of Delhi" instead of "Delhi"
  let data = electionDatabase[state];
  
  if (!data) {
    const matchedStateKey = Object.keys(electionDatabase).find(k => state.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(state.toLowerCase()));
    if (matchedStateKey) {
      data = electionDatabase[matchedStateKey];
    }
  }

  if (data) {
    res.json({ state, booths: pollingBooths, ...data });
  } else {
    res.json({
      status: "none",
      state: state
    });
  }
});

// --- 3. RULE-BASED CHATBOT ENDPOINT ---
const chatbotLogic = {
  en: {
    register: "To register, you need to be 18+ and an Indian citizen. Fill Form 6 on the NVSP portal or the Voter Helpline App.",
    documents: "You need a passport-size photo, age proof (Birth Certificate/Aadhaar), and address proof (Electricity Bill/Aadhaar).",
    evm: "EVMs are electronic voting machines. Press the blue button next to your chosen candidate's symbol. A red light and a beep will confirm your vote.",
    booth: "You can find your polling booth on the NVSP website using your EPIC (Voter ID) number, or call 1950.",
    date: "Elections are held in phases. Check the 'Local Election Data' section on this page with your pincode to see your exact polling date.",
    fallback: "I can help with voter registration, EVMs, documents, and polling booths. Please ask about these topics."
  },
  hi: {
    register: "पंजीकरण करने के लिए, आपकी आयु 18+ और भारतीय नागरिक होना चाहिए। NVSP पोर्टल पर फॉर्म 6 भरें।",
    documents: "आपको एक फोटो, आयु प्रमाण पत्र (आधार) और पता प्रमाण पत्र की आवश्यकता होगी।",
    evm: "ईवीएम इलेक्ट्रॉनिक वोटिंग मशीनें हैं। अपने उम्मीदवार के चुनाव चिह्न के बगल में नीला बटन दबाएं।",
    booth: "आप अपने EPIC नंबर का उपयोग करके NVSP वेबसाइट पर अपना पोलिंग बूथ खोज सकते हैं।",
    date: "चुनाव चरणों में होते हैं। अपनी सटीक मतदान तिथि देखने के लिए अपना पिनकोड दर्ज करें।",
    fallback: "मैं मतदाता पंजीकरण, ईवीएम और मतदान विवरण में मदद कर सकता हूं। कृपया इनसे संबंधित कुछ पूछें।"
  },
  te: {
    register: "నమోదు చేయడానికి, మీకు 18+ సంవత్సరాలు ఉండాలి. NVSP పోర్టల్‌లో ఫారం 6 నింపండి.",
    documents: "మీకు ఫోటో, వయస్సు రుజువు (ఆధార్) మరియు చిరునామా రుజువు అవసరం.",
    evm: "EVMలు ఎలక్ట్రానిక్ ఓటింగ్ యంత్రాలు. అభ్యర్థి గుర్తు పక్కన ఉన్న నీలిరంగు బటన్‌ను నొక్కండి.",
    booth: "మీ EPIC నంబర్‌ని ఉపయోగించి NVSP వెబ్‌సైట్‌లో మీ పోలింగ్ బూత్‌ను కనుగొనవచ్చు.",
    date: "ఎన్నికలు దశలవారీగా జరుగుతాయి. మీ ఖచ్చితమైన తేదీ కోసం మీ పిన్‌కోడ్‌ను నమోదు చేయండి.",
    fallback: "నేను ఓటరు నమోదు, EVM వినియోగంపై సహాయపడగలను. దయచేసి సంబంధిత ప్రశ్న అడగండి."
  },
  mr: {
    register: "नोंदणी करण्यासाठी तुमचे वय १८+ आणि भारतीय नागरिक असावे. NVSP पोर्टलवर फॉर्म 6 भरा.",
    documents: "तुम्हाला फोटो, वयाचा पुरावा (आधार) आणि पत्त्याचा पुरावा लागेल.",
    evm: "EVM हे इलेक्ट्रॉनिक व्होटिंग मशीन आहे. उमेदवाराच्या चिन्हाशेजारील निळे बटण दाबा.",
    booth: "तुम्ही EPIC नंबर वापरून NVSP वेबसाइटवर तुमचे मतदान केंद्र शोधू शकता.",
    date: "निवडणुका टप्प्याटप्प्याने होतात. अचूक तारखेसाठी तुमचा पिनकोड टाका.",
    fallback: "मी मतदार नोंदणी, ईव्हीएम आणि मतदान केंद्रांबद्दल मदत करू शकतो. कृपया संबंधित प्रश्न विचारा."
  },
  ta: {
    register: "பதிவு செய்ய, நீங்கள் 18+ மற்றும் இந்திய குடிமகனாக இருக்க வேண்டும். NVSP போர்ட்டலில் படிவம் 6 ஐ நிரப்பவும்.",
    documents: "புகைப்படம், வயது சான்றிதழ் (ஆதார்) மற்றும் முகவரி சான்றிதழ் தேவை.",
    evm: "EVM என்பது மின்னணு வாக்குப்பதிவு இயந்திரம். வேட்பாளரின் சின்னத்திற்கு அருகிலுள்ள நீல நிற பொத்தானை அழுத்தவும்.",
    booth: "உங்கள் EPIC எண்ணைப் பயன்படுத்தி NVSP இணையதளத்தில் உங்கள் வாக்குச்சாவடியைக் கண்டறியலாம்.",
    date: "தேர்தல்கள் கட்டங்களாக நடைபெறுகின்றன. சரியான தேதிக்கு உங்கள் பின்கோடை உள்ளிடவும்.",
    fallback: "வாக்காளர் பதிவு, EVM மற்றும் வாக்குச்சாவடிகள் பற்றி நான் உதவ முடியும். தயவுசெய்து தொடர்பான கேள்வியைக் கேட்கவும்."
  },
  kn: {
    register: "ನೋಂದಾಯಿಸಲು, ನೀವು 18+ ಮತ್ತು ಭಾರತೀಯ ಪ್ರಜೆಯಾಗಿರಬೇಕು. NVSP ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಫಾರ್ಮ್ 6 ಭರ್ತಿ ಮಾಡಿ.",
    documents: "ನಿಮಗೆ ಫೋಟೋ, ವಯಸ್ಸಿನ ಪುರಾವೆ (ಆಧಾರ್) ಮತ್ತು ವಿಳಾಸ ಪುರಾವೆ ಬೇಕು.",
    evm: "EVM ಗಳು ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಮತದಾನ ಯಂತ್ರಗಳು. ಅಭ್ಯರ್ಥಿಯ ಚಿಹ್ನೆಯ ಪಕ್ಕದಲ್ಲಿರುವ ನೀಲಿ ಗುಂಡಿಯನ್ನು ಒತ್ತಿ.",
    booth: "ನಿಮ್ಮ EPIC ಸಂಖ್ಯೆಯನ್ನು ಬಳಸಿ NVSP ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಮತದಾನ ಕೇಂದ್ರವನ್ನು ನೀವು ಕಾಣಬಹುದು.",
    date: "ಚುನಾವಣೆಗಳು ಹಂತಗಳಲ್ಲಿ ನಡೆಯುತ್ತವೆ. ನಿಖರವಾದ ದಿನಾಂಕಕ್ಕಾಗಿ ನಿಮ್ಮ ಪಿನ್‌ಕೋಡ್ ನಮೂದಿಸಿ.",
    fallback: "ಮತದಾರರ ನೋಂದಣಿ, ಇವಿಎಂ ಮತ್ತು ಮತದಾನ ಕೇಂದ್ರಗಳ ಕುರಿತು ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ದಯವಿಟ್ಟು ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆ ಕೇಳಿ."
  }
};

app.post('/api/chat', (req, res) => {
  const { message, lang = 'en' } = req.body;
  const msgLower = message.toLowerCase();
  
  let replyKey = 'fallback';
  
  if (msgLower.includes('register') || msgLower.includes('apply') || msgLower.includes('enroll')) {
    replyKey = 'register';
  } else if (msgLower.includes('document') || msgLower.includes('aadhaar') || msgLower.includes('proof')) {
    replyKey = 'documents';
  } else if (msgLower.includes('evm') || msgLower.includes('machine') || msgLower.includes('button')) {
    replyKey = 'evm';
  } else if (msgLower.includes('booth') || msgLower.includes('where to vote') || msgLower.includes('location')) {
    replyKey = 'booth';
  } else if (msgLower.includes('date') || msgLower.includes('when') || msgLower.includes('timeline')) {
    replyKey = 'date';
  }

  // Ensure language fallback to english if lang missing
  const langDict = chatbotLogic[lang] || chatbotLogic['en'];
  const reply = langDict[replyKey];

  // Simulated AI Typing Delay
  setTimeout(() => {
    res.json({ reply });
  }, 1500);
});

// Catch-all route for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
