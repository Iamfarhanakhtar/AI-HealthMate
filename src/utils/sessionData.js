// Guided Awareness Session presentation slides dataset
// Structured for B.Tech Social Internship campaign presenter workflows

export const slidesData = [
  {
    id: "welcome",
    title: { en: "Welcome to AI HealthMate Session", hi: "AI HealthMate सत्र में आपका स्वागत है" },
    type: "info",
    desc: {
      en: "Welcome participants and introduce yourself. Explain that this session will demonstrate how AI HealthMate helps villagers, students, and community volunteers master health awareness, emergency first aid, and disease prevention.",
      hi: "प्रतिभागियों का स्वागत करें और अपना परिचय दें। समझाएं कि यह सत्र यह प्रदर्शित करेगा कि कैसे AI HealthMate ग्रामीणों, छात्रों और स्वयंसेवकों को स्वास्थ्य जागरूकता, प्राथमिक चिकित्सा और रोकथाम में मदद करता है।"
    },
    discussion: {
      en: "Ask: 'What does health awareness mean to your family daily?'",
      hi: "पूछें: 'आपके परिवार के लिए दैनिक स्वास्थ्य जागरूकता का क्या अर्थ है?'"
    },
    notes: {
      en: "Ensure everyone is seated comfortably. Keep your tone friendly and open. Introduce B.Tech social internship context.",
      hi: "सुनिश्चित करें कि सभी लोग आराम से बैठे हैं। अपनी आवाज दोस्ताना और खुली रखें। सामाजिक इंटर्नशिप संदर्भ का परिचय दें।"
    }
  },
  {
    id: "why_awareness",
    title: { en: "Why Preventative Healthcare Matters", hi: "निवारक स्वास्थ्य देखभाल क्यों महत्वपूर्ण है" },
    type: "info",
    desc: {
      en: "Preventative healthcare saves lives. Over 70% of vector-borne illnesses (like Dengue and Malaria) and waterborne infections (like Cholera) are preventable through simple hygiene, clean water habits, and mosquito control.",
      hi: "निवारक स्वास्थ्य देखभाल जान बचाती है। 70% से अधिक मच्छर जनित बीमारियां (जैसे डेंगू और मलेरिया) और जल जनित संक्रमण (जैसे हैजा) साधारण स्वच्छता, साफ पानी की आदतों और मच्छरों पर नियंत्रण से रोके जा सकते हैं।"
    },
    discussion: {
      en: "Ask: 'Do you know how to identify clean vs dirty standing water in your neighborhood?'",
      hi: "पूछें: 'क्या आप जानते हैं कि अपने पड़ोस में साफ और गंदे ठहरे हुए पानी की पहचान कैसे करें?'"
    },
    notes: {
      en: "Highlight that Aedes (Dengue mosquito) breeds in clean stagnant water (coolers, flower pots), whereas Anopheles (Malaria mosquito) breeds in dirty pools.",
      hi: "इस बात पर जोर दें कि एडीज (डेंगू का मच्छर) साफ ठहरे हुए पानी (कूलर, गमले) में पनपता है, जबकि एनोफिलीज (मलेरिया का मच्छर) गंदे गड्ढों में पनपता है।"
    }
  },
  {
    id: "challenges",
    title: { en: "Common Rural Healthcare Challenges", hi: "आम ग्रामीण स्वास्थ्य चुनौतियाँ" },
    type: "checkpoint",
    checkpointType: "hand",
    desc: {
      en: "Lack of immediate doctors, delayed diagnostic facilities, and reliance on unscientific local treatments often worsen minor conditions into emergencies in rural communities.",
      hi: "तत्काल डॉक्टरों की कमी, विलंबित नैदानिक सुविधाएं और अवैज्ञानिक स्थानीय उपचारों पर निर्भरता अक्सर ग्रामीण समुदायों में मामूली स्थितियों को आपात स्थिति में बदल देती है।"
    },
    discussion: {
      en: "Raise Hands: 'How many of you have had to travel more than 10 kilometers for emergency medical assistance?'",
      hi: "हाथ उठाएं: 'आप में से कितने लोगों को आपातकालीन चिकित्सा सहायता के लिए 10 किलोमीटर से अधिक की यात्रा करनी पड़ी है?'"
    },
    notes: {
      en: "Encourage active participation. Pause and count how many hands are raised in the audience. Note down their concerns.",
      hi: "सक्रिय भागीदारी को प्रोत्साहित करें। रुकें और दर्शकों में हाथ उठाने वालों की संख्या गिनें। उनकी चिंताओं को नोट करें।"
    }
  },
  {
    id: "library_demo",
    title: { en: "Showcase: Disease Awareness Library", hi: "प्रदर्शन: रोग जागरूकता लाइब्रेरी" },
    type: "embed",
    embedModule: "library",
    desc: {
      en: "AI HealthMate contains a complete Disease Awareness Library. It features articles on Dengue, Malaria, Typhoid, Nutrition, and Sanitation, standardizing symptoms, causes, and warning red flags in both English and Hindi.",
      hi: "AI HealthMate में एक संपूर्ण रोग जागरूकता लाइब्रेरी है। इसमें डेंगू, मलेरिया, टाइफाइड, पोषण और स्वच्छता पर लेख हैं, जो अंग्रेजी और हिंदी दोनों में लक्षणों, कारणों और चेतावनी रेड फ्लैग को मानकीकृत करते हैं।"
    },
    discussion: {
      en: "Let's scroll through the library dashboard and read an article summary.",
      hi: "आइए लाइब्रेरी डैशबोर्ड के माध्यम से स्क्रॉल करें और एक लेख सारांश पढ़ें।"
    },
    notes: {
      en: "Scroll down to show Featured Topics. Point out the bilingual English/Hindi toggle button in the library showcase frame.",
      hi: "फीचर्ड टॉपिक्स दिखाने के लिए स्क्रॉल करें। लाइब्रेरी शोकेस फ्रेम में द्विभाषी अंग्रेजी/हिंदी टॉगल बटन की ओर इशारा करें।"
    }
  },
  {
    id: "assistant_demo",
    title: { en: "Showcase: AI Healthcare Assistant", hi: "प्रदर्शन: AI स्वास्थ्य सहायक" },
    type: "embed",
    embedModule: "assistant",
    desc: {
      en: "Need instant explanations? The AI Health Assistant answers queries in simple language suitable for students and villagers. If offline, it automatically fails over to the local database.",
      hi: "तुरंत स्पष्टीकरण चाहिए? AI स्वास्थ्य सहायक छात्रों और ग्रामीणों के लिए उपयुक्त सरल भाषा में प्रश्नों के उत्तर देता है। यदि ऑफ़लाइन है, तो यह स्थानीय डेटाबेस पर काम करता है।"
    },
    discussion: {
      en: "Let's type a question: 'How can we prevent malaria in our home?'",
      hi: "आइए एक प्रश्न टाइप करें: 'हम अपने घर में मलेरिया से कैसे बच सकते हैं?'"
    },
    notes: {
      en: "Demonstrate conversational queries. Explain that the AI has a strict medical disclaimer and will never recommend medicines.",
      hi: "संवाद आधारित प्रश्नों का प्रदर्शन करें। समझाएं कि AI का एक सख्त चिकित्सा अस्वीकरण है और वह कभी भी दवाओं की सिफारिश नहीं करेगा।"
    }
  },
  {
    id: "guide_demo",
    title: { en: "Showcase: First Aid Timeline", hi: "प्रदर्शन: प्राथमिक चिकित्सा समयरेखा" },
    type: "embed",
    embedModule: "guide",
    desc: {
      en: "When emergencies occur, seconds count. The First Aid Guide outlines step-by-step vertical timelines for Burns, Cuts, Snake Bites, choking, and electric shocks.",
      hi: "जब आपात स्थिति होती है, तो हर सेकंड मायने रखता है। प्राथमिक चिकित्सा गाइड जलन, कट, सांप के काटने, दम घुटने और बिजली के झटके के लिए कदम-दर-कदम समयरेखा प्रदान करता है।"
    },
    discussion: {
      en: "Review the 'What NOT To Do' warnings. (e.g. Do not apply toothpaste on burns, do not suck snake venom).",
      hi: "समीक्षा करें कि 'क्या न करें' (जैसे जलने पर टूथपेस्ट न लगाएं, सांप का जहर न चूसें)।"
    },
    notes: {
      en: "Emphasize common mistakes. Mention that wrong first aid causes severe tissue infections and complications.",
      hi: "आम गलतियों पर जोर दें। उल्लेख करें कि गलत प्राथमिक चिकित्सा से गंभीर ऊतक संक्रमण और जटिलताएं होती हैं।"
    }
  },
  {
    id: "poll_checkpoint",
    title: { en: "Interactive Checkpoint: Quick Poll", hi: "इंटरैक्टिव चेकपॉइंट: त्वरित पोल" },
    type: "checkpoint",
    checkpointType: "poll",
    desc: {
      en: "Let's test our collective emergency confidence. Present this poll question to the group and record their answers.",
      hi: "आइए हमारे सामूहिक आपातकालीन आत्मविश्वास का परीक्षण करें। इस पोल प्रश्न को समूह के सामने प्रस्तुत करें और उनके उत्तरों को दर्ज करें।"
    },
    discussion: {
      en: "Poll Question: 'Do you feel confident performing Heimlich maneuver on someone choking?'",
      hi: "पोल प्रश्न: 'क्या आप दम घुटने वाले किसी व्यक्ति पर हीमलिच पैंतरा (Heimlich Maneuver) करने में आश्वस्त महसूस करते हैं?'"
    },
    notes: {
      en: "Trigger Yes / No clicks based on group responses. Discuss how simple training removes fear during crisis.",
      hi: "समूह की प्रतिक्रियाओं के आधार पर हाँ / ना क्लिकों को दर्ज करें। चर्चा करें कि सरल प्रशिक्षण संकट के दौरान डर को कैसे दूर करता है।"
    }
  },
  {
    id: "quiz_demo",
    title: { en: "Showcase: Group Knowledge Check", hi: "प्रदर्शन: समूह ज्ञान की जांच" },
    type: "embed",
    embedModule: "quiz",
    desc: {
      en: "Let's test what we learned in this session. We will solve a knowledge check question together as a group.",
      hi: "आइए इस सत्र में सीखी गई बातों का परीक्षण करें। हम एक साथ मिलकर एक ज्ञान जांच प्रश्न का उत्तर देंगे।"
    },
    discussion: {
      en: "Read the question, ask the audience to vote on options A, B, C, or D, then check the correct answer.",
      hi: "प्रश्न पढ़ें, दर्शकों से विकल्प ए, बी, सी, या डी पर मतदान करने के लिए कहें, फिर सही उत्तर की जांच करें।"
    },
    notes: {
      en: "Read the detailed correct answer explanation to the group. Point out how the quiz explains concepts.",
      hi: "समूह को सही उत्तर की विस्तृत व्याख्या पढ़कर सुनाएं। इंगित करें कि प्रश्नोत्तरी अवधारणाओं को कैसे स्पष्ट करती है।"
    }
  },
  {
    id: "certificate_demo",
    title: { en: "Showcase: Earning Certificates", hi: "प्रदर्शन: प्रमाणपत्र अर्जित करना" },
    type: "embed",
    embedModule: "certificate",
    desc: {
      en: "Participants scoring 70% or higher on assessments earn the certified digital 'Health Champion Award', validating their healthcare awareness.",
      hi: "मूल्यांकन में 70% या उससे अधिक अंक प्राप्त करने वाले प्रतिभागी प्रमाणित डिजिटल 'हेल्थ चैंपियन अवार्ड' अर्जित करते हैं।"
    },
    discussion: {
      en: "Show how recipient names can be typed to update the print-ready certificate live.",
      hi: "दिखाएं कि प्रिंट-सहेजने योग्य प्रमाणपत्र को लाइव अपडेट करने के लिए प्राप्तकर्ता के नाम कैसे टाइप किए जा सकते हैं।"
    },
    notes: {
      en: "Explain that this certificate can be printed or saved to show during social campaigns.",
      hi: "समझाएं कि इस प्रमाणपत्र को प्रिंट किया जा सकता है या सामाजिक अभियानों के दौरान दिखाने के लिए सहेजा जा सकता है।"
    }
  },
  {
    id: "feedback_demo",
    title: { en: "Showcase: Collecting Reviews", hi: "प्रदर्शन: समीक्षाएं एकत्र करना" },
    type: "embed",
    embedModule: "feedback",
    desc: {
      en: "NGOs and campaign managers collect community feedback to track satisfaction and plan future local topics.",
      hi: "NGO और अभियान प्रबंधक संतुष्टि को ट्रैक करने और भविष्य के स्थानीय विषयों की योजना बनाने के लिए सामुदायिक प्रतिक्रिया एकत्र करते।"
    },
    discussion: {
      en: "Submit a sample feedback review to demonstrate learning outcomes verification.",
      hi: "अधिगम परिणामों के सत्यापन को प्रदर्शित करने के लिए एक नमूना प्रतिक्रिया समीक्षा सबमिट करें।"
    },
    notes: {
      en: "Encourage participants to share honest suggestions. Reiterate that data helps upgrade the site.",
      hi: "प्रतिभागियों को ईमानदार सुझाव साझा करने के लिए प्रोत्साहित करें। दोहराएं कि डेटा साइट को अपग्रेड करने में मदद करता है।"
    }
  },
  {
    id: "impact_demo",
    title: { en: "Showcase: Community Impact", hi: "प्रदर्शन: सामुदायिक प्रभाव" },
    type: "embed",
    embedModule: "impact",
    desc: {
      en: "The campaign dashboard visualizes aggregated progress metrics (people reached, certificates generated, quiz performance line plots).",
      hi: "अभियान डैशबोर्ड संचित प्रगति मेट्रिक्स (पहुंचे हुए लोग, प्रमाणपत्र, प्रश्नोत्तरी प्रदर्शन ग्राफ) को प्रदर्शित करता है।"
    },
    discussion: {
      en: "Let's review the Performance Curve of recently completed quizzes.",
      hi: "आइए हाल ही में पूरी की गई प्रश्नोत्तरियों के प्रदर्शन ग्राफ की समीक्षा करें।"
    },
    notes: {
      en: "Explain that this dashboard provides visual proof of internship achievements to teachers and evaluators.",
      hi: "समझाएं कि यह डैशबोर्ड शिक्षकों और मूल्यांकनकर्ताओं को इंटर्नशिप उपलब्धियों का दृश्य प्रमाण प्रदान करता है।"
    }
  },
  {
    id: "thankyou",
    title: { en: "Thank You & Campaign Report", hi: "धन्यवाद और अभियान रिपोर्ट" },
    type: "report",
    desc: {
      en: "Congratulations on completing this Guided Awareness Session. You are now equipped with knowledge to make your community safer.",
      hi: "इस निर्देशित जागरूकता सत्र को पूरा करने पर बधाई। अब आप अपने समुदाय को सुरक्षित बनाने के लिए ज्ञान से लैस हैं।"
    },
    discussion: {
      en: "Presenters: Review the generated Social Internship Report below and click Print Summary.",
      hi: "प्रस्तुतकर्ता: नीचे दी गई सामाजिक इंटर्नशिप रिपोर्ट की समीक्षा करें और प्रिंट सारांश पर क्लिक करें।"
    },
    notes: {
      en: "End the session with a round of applause. Distribute printed certificates if prepared.",
      hi: "तालियों की गड़गड़ाहट के साथ सत्र का समापन करें। यदि तैयार हो तो मुद्रित प्रमाणपत्र वितरित करें।"
    }
  }
];

export const learningObjectives = [
  { en: "Understand mosquito-borne disease cycles (Dengue, Malaria)", hi: "मच्छर जनित बीमारी चक्रों को समझें (डेंगू, मलेरिया)" },
  { en: "Learn emergency response steps for snake bites and burns", hi: "सांप के काटने और जलने के लिए आपातकालीन प्रतिक्रिया कदम सीखें" },
  { en: "Master the Heimlich maneuver for choking victims", hi: "दम घुटने वाले पीड़ितों के लिए हीमलिच पैंतरा में महारत हासिल करें" },
  { en: "Promote daily water hygiene and balanced nutrition practices", hi: "दैनिक पानी की स्वच्छता और संतुलित पोषण प्रथाओं को बढ़ावा दें" }
];

export default {
  slidesData,
  learningObjectives
};
