export type Language = 'English' | 'Hindi' | 'Punjabi';

export const LANGUAGES: Language[] = ['English', 'Hindi', 'Punjabi'];

export type Dict = Record<string, {
  nav: { home: string; services: string; track: string; resources: string };
  hero: { title: string; subtitle: string; badge: string };
  chat: {
    title: string;
    subtitle: string;
    online: string;
    placeholder: string;
    send: string;
    suggestions: string;
    s1: string;
    s2: string;
    s3: string;
    userQ: string;
    aiIntro: string;
    aiStep1: string;
    aiStep2: string;
    aiStep3: string;
    aiStep4: string;
    aiStep5: string;
    aiOutro: string;
    disclaimer: string;
  };
  cards: {
    reportTitle: string;
    reportDesc: string;
    schemesTitle: string;
    schemesDesc: string;
    trackTitle: string;
    trackDesc: string;
    docsTitle: string;
    docsDesc: string;
    action: string;
  };
  footer: {
    initiative: string;
    initiativeDesc: string;
    emergency: string;
    police: string;
    ambulance: string;
    fire: string;
    privacy: string;
    rights: string;
    links: string;
  };
}>;

export const TRANSLATIONS: Dict = {
  English: {
    nav: { home: 'Home', services: 'Services', track: 'Track Complaints', resources: 'Resources' },
    hero: {
      badge: 'Government of India Digital Initiative',
      title: 'Empowering Citizens, Simplifying Governance.',
      subtitle:
        'Your intelligent AI companion for government services, personalized civic support, and issue reporting.',
    },
    chat: {
      title: 'Civic AI Assistant',
      subtitle: 'Always here to help with your civic needs',
      online: 'Online',
      placeholder: 'Ask about certificates, schemes, complaints...',
      send: 'Send',
      suggestions: 'Suggested questions',
      s1: 'How to apply for an income certificate?',
      s2: 'What schemes am I eligible for?',
      s3: 'Track my recent complaint',
      userQ: 'How to apply for an income certificate?',
      aiIntro: "Here's a step-by-step guide to applying for an income certificate:",
      aiStep1: 'Visit your state e-District portal or the nearest Common Service Centre (CSC).',
      aiStep2: 'Register or log in using your Aadhaar-linked mobile number.',
      aiStep3: 'Fill the income certificate application and upload proof of income (salary slips, ITR, or employer certificate).',
      aiStep4: 'Pay the applicable fee and note your application reference number.',
      aiStep5: 'Track the status online; the certificate is typically issued within 7-15 working days.',
      aiOutro: 'Would you like me to find the nearest CSC or check required documents?',
      disclaimer: 'AI guidance is informational. Verify with official portals before acting.',
    },
    cards: {
      reportTitle: 'Report Public Issue',
      reportDesc: 'Potholes, streetlights, water, sanitation & more',
      schemesTitle: 'Government Schemes',
      schemesDesc: 'Find welfare schemes matched to your eligibility',
      trackTitle: 'Track Complaints',
      trackDesc: 'Check real-time status of your grievances',
      docsTitle: 'Document Requirements',
      docsDesc: 'Checklist of documents for every service',
      action: 'Open',
    },
    footer: {
      initiative: 'Smart Bharat Initiative',
      initiativeDesc: 'A digital civic companion bridging citizens and governance.',
      emergency: 'Emergency Contacts',
      police: 'Police — 100',
      ambulance: 'Ambulance — 108',
      fire: 'Fire — 101',
      privacy: 'Privacy Policy',
      rights: 'All rights reserved.',
      links: 'Quick Links',
    },
  },
  Hindi: {
    nav: { home: 'होम', services: 'सेवाएँ', track: 'शिकायत ट्रैक करें', resources: 'संसाधन' },
    hero: {
      badge: 'भारत सरकार डिजिटल पहल',
      title: 'नागरिकों को सशक्त बनाना, शासन को सरल बनाना।',
      subtitle:
        'सरकारी सेवाओं, व्यक्तिगत नागरिक सहायता और समस्या रिपोर्टिंग के लिए आपका बुद्धिमान AI साथी।',
    },
    chat: {
      title: 'नागरिक AI सहायक',
      subtitle: 'आपकी नागरिक आवश्यकताओं में सदैव सहायता के लिए',
      online: 'ऑनलाइन',
      placeholder: 'प्रमाणपत्र, योजनाओं, शिकायतों के बारे में पूछें...',
      send: 'भेजें',
      suggestions: 'सुझाए गए प्रश्न',
      s1: 'आय प्रमाणपत्र के लिए आवेदन कैसे करें?',
      s2: 'मैं किन योजनाओं के पात्र हूँ?',
      s3: 'मेरी हाल की शिकायत ट्रैक करें',
      userQ: 'आय प्रमाणपत्र के लिए आवेदन कैसे करें?',
      aiIntro: 'आय प्रमाणपत्र के लिए आवेदन करने की चरण-दर-चरण मार्गदर्शिका:',
      aiStep1: 'अपने राज्य के ई-डिस्ट्रिक्ट पोर्टल या निकटतम कॉमन सर्विस सेंट्र (CSC) पर जाएँ।',
      aiStep2: 'अपने आधार-लिंक्ड मोबाइल नंबर से पंजीकरण करें या लॉगिन करें।',
      aiStep3: 'आय प्रमाणपत्र आवेदन भरें और आय का प्रमाण अपलोड करें (वेतन पर्ची, ITR, या नियोक्ता प्रमाणपत्र)।',
      aiStep4: 'लागू शुल्क जमा करें और अपनी आवेदन संदर्भ संख्या नोट करें।',
      aiStep5: 'स्थिति ऑनलाइन ट्रैक करें; प्रमाणपत्र आमतौर पर 7-15 कार्य दिवसों में जारी होता है।',
      aiOutro: 'क्या आप चाहेंगे कि मैं निकटतम CSC खोजूँ या आवश्यक दस्तावेज़ जाँचूँ?',
      disclaimer: 'AI मार्गदर्शन सूचनात्मक है। कार्रवाई से पहले आधिकारिक पोर्टल से सत्यापित करें।',
    },
    cards: {
      reportTitle: 'सार्वजनिक समस्या रिपोर्ट करें',
      reportDesc: 'गड्ढे, स्ट्रीटलाइट, पानी, स्वच्छता आदि',
      schemesTitle: 'सरकारी योजनाएँ',
      schemesDesc: 'अपनी पात्रता के अनुसार कल्याणकारी योजनाएँ खोजें',
      trackTitle: 'शिकायत ट्रैक करें',
      trackDesc: 'अपनी शिकायतों की वास्तविक-समय स्थिति देखें',
      docsTitle: 'दस्तावेज़ आवश्यकताएँ',
      docsDesc: 'हर सेवा के लिए दस्तावेज़ों की सूची',
      action: 'खोलें',
    },
    footer: {
      initiative: 'स्मार्ट भारत पहल',
      initiativeDesc: 'नागरिकों और शासन के बीच एक डिजिटल नागरिक साथी।',
      emergency: 'आपातकालीन संपर्क',
      police: 'पुलिस — 100',
      ambulance: 'एम्बुलेंस — 108',
      fire: 'दमकल — 101',
      privacy: 'गोपनीयता नीति',
      rights: 'सर्वाधिकार सुरक्षित।',
      links: 'त्वरित लिंक',
    },
  },
  Punjabi: {
    nav: { home: 'ਹੋਮ', services: 'ਸੇਵਾਵਾਂ', track: 'ਸ਼ਿਕਾਇਤ ਟਰੈਕ ਕਰੋ', resources: 'ਸਰੋਤ' },
    hero: {
      badge: 'ਭਾਰਤ ਸਰਕਾਰ ਡਿਜੀਟਲ ਪਹਿਲ',
      title: 'ਨਾਗਰਿਕਾਂ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ, ਸ਼ਾਸਨ ਨੂੰ ਸੌਖਾ ਬਣਾਉਣਾ।',
      subtitle:
        'ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ, ਨਿੱਜੀ ਨਾਗਰਿਕ ਸਹਾਇਤਾ ਅਤੇ ਮੁੱਦੇ ਰਿਪੋਰਟਿੰਗ ਲਈ ਤੁਹਾਡਾ ਬੁੱਧੀਮਾਨ AI ਸਾਥੀ।',
    },
    chat: {
      title: 'ਨਾਗਰਿਕ AI ਸਹਾਇਕ',
      subtitle: 'ਤੁਹਾਡੀਆਂ ਨਾਗਰਿਕ ਲੋੜਾਂ ਵਿੱਚ ਹਮੇਸ਼ਾ ਮਦਦ ਲਈ',
      online: 'ਆਨਲਾਈਨ',
      placeholder: 'ਸਰਟੀਫਿਕੇਟ, ਯੋਜਨਾਵਾਂ, ਸ਼ਿਕਾਇਤਾਂ ਬਾਰੇ ਪੁੱਛੋ...',
      send: 'ਭੇਜੋ',
      suggestions: 'ਸੁਝਾਏ ਸਵਾਲ',
      s1: 'ਆਮਦਨੀ ਸਰਟੀਫਿਕੇਟ ਲਈ ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਈਏ?',
      s2: 'ਮੈਂ ਕਿਹੜੀਆਂ ਯੋਜਨਾਵਾਂ ਲਈ ਯੋਗ ਹਾਂ?',
      s3: 'ਮੇਰੀ ਤਾਜ਼ਾ ਸ਼ਿਕਾਇਤ ਟਰੈਕ ਕਰੋ',
      userQ: 'ਆਮਦਨੀ ਸਰਟੀਫਿਕੇਟ ਲਈ ਅਰਜ਼ੀ ਕਿਵੇਂ ਦੇਈਏ?',
      aiIntro: 'ਆਮਦਨੀ ਸਰਟੀਫਿਕੇਟ ਲਈ ਅਰਜ਼ੀ ਦੇਣ ਦੀ ਕਦਮ-ਦਰ-ਕਦਮ ਗਾਈਡ:',
      aiStep1: 'ਆਪਣੇ ਰਾਜ ਦੇ ਈ-ਡਿਸਟ੍ਰਿਕਟ ਪੋਰਟਲ ਜਾਂ ਨੇੜਲੇ ਕਾਮਨ ਸਰਵਿਸ ਸੈਂਟਰ (CSC) ਤੇ ਜਾਓ।',
      aiStep2: 'ਆਪਣੇ ਆਧਾਰ-ਲਿੰਕਡ ਮੋਬਾਈਲ ਨੰਬਰ ਨਾਲ ਰਜਿਸਟਰ ਕਰੋ ਜਾਂ ਲੌਗਇਨ ਕਰੋ।',
      aiStep3: 'ਆਮਦਨੀ ਸਰਟੀਫਿਕੇਟ ਅਰਜ਼ੀ ਭਰੋ ਅਤੇ ਆਮਦਨੀ ਦਾ ਸਬੂਤ ਅੱਪਲੋਡ ਕਰੋ (ਤਨਖਾਹ ਸਲਿੱਪ, ITR, ਜਾਂ ਮਾਲਕ ਸਰਟੀਫਿਕੇਟ)।',
      aiStep4: 'ਲਾਗੂ ਫੀਸ ਜਮ੍ਹਾਂ ਕਰੋ ਅਤੇ ਆਪਣਾ ਅਰਜ਼ੀ ਹਵਾਲਾ ਨੰਬਰ ਨੋਟ ਕਰੋ।',
      aiStep5: 'ਸਥਿਤੀ ਆਨਲਾਈਨ ਟਰੈਕ ਕਰੋ; ਸਰਟੀਫਿਕੇਟ ਆਮ ਤੌਰ ਤੇ 7-15 ਕੰਮ ਦਿਨਾਂ ਵਿੱਚ ਜਾਰੀ ਹੁੰਦਾ ਹੈ।',
      aiOutro: 'ਕੀ ਤੁਸੀਂ ਚਾਹੁੰਦੇ ਹੋ ਕਿ ਮੈਂ ਨੇੜਲਾ CSC ਲੱਭਾਂ ਜਾਂ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ ਜਾਂਚਾਂ?',
      disclaimer: 'AI ਮਾਰਗਦਰਸ਼ਨ ਜਾਣਕਾਰੀਮੂਲਕ ਹੈ। ਕਾਰਵਾਈ ਤੋਂ ਪਹਿਲਾਂ ਅਧਿਕਾਰਤ ਪੋਰਟਲਾਂ ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ।',
    },
    cards: {
      reportTitle: 'ਜਨਤਕ ਮੁੱਦਾ ਰਿਪੋਰਟ ਕਰੋ',
      reportDesc: 'ਪੁਆਇੰਟ, ਸਟ੍ਰੀਟਲਾਈਟ, ਪਾਣੀ, ਸਫ਼ਾਈ ਆਦਿ',
      schemesTitle: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ',
      schemesDesc: 'ਆਪਣੀ ਯੋਗਤਾ ਅਨੁਸਾਰ ਕਲਿਆਣਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭੋ',
      trackTitle: 'ਸ਼ਿਕਾਇਤ ਟਰੈਕ ਕਰੋ',
      trackDesc: 'ਆਪਣੀਆਂ ਸ਼ਿਕਾਇਤਾਂ ਦੀ ਰੀਅਲ-ਟਾਈਮ ਸਥਿਤੀ ਵੇਖੋ',
      docsTitle: 'ਦਸਤਾਵੇਜ਼ ਲੋੜਾਂ',
      docsDesc: 'ਹਰ ਸੇਵਾ ਲਈ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਸੂਚੀ',
      action: 'ਖੋਲ੍ਹੋ',
    },
    footer: {
      initiative: 'ਸਮਾਰਟ ਭਾਰਤ ਪਹਿਲ',
      initiativeDesc: 'ਨਾਗਰਿਕਾਂ ਅਤੇ ਸ਼ਾਸਨ ਵਿਚਕਾਰ ਇੱਕ ਡਿਜੀਟਲ ਨਾਗਰਿਕ ਸਾਥੀ।',
      emergency: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
      police: 'ਪੁਲਿਸ — 100',
      ambulance: 'ਐਂਬੂਲੈਂਸ — 108',
      fire: 'ਫਾਇਰ — 101',
      privacy: 'ਗੁਪਤਤਾ ਨੀਤੀ',
      rights: 'ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।',
      links: 'ਤੁਰੰਤ ਲਿੰਕ',
    },
  },
};
