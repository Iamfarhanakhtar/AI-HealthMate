// Reusable Bilingual Quiz Dataset
// Categories: General Healthcare, Dengue, Malaria, Nutrition, Vaccination, Clean Water, Sanitation, First Aid, Mental Health, Healthy Lifestyle

export const quizCategories = [
  {
    id: "general",
    title: { en: "General Healthcare", hi: "सामान्य स्वास्थ्य" },
    icon: "Stethoscope"
  },
  {
    id: "dengue",
    title: { en: "Dengue Awareness", hi: "डेंगू जागरूकता" },
    icon: "ShieldAlert"
  },
  {
    id: "malaria",
    title: { en: "Malaria Awareness", hi: "मलेरिया जागरूकता" },
    icon: "ShieldAlert"
  },
  {
    id: "nutrition",
    title: { en: "Diet & Nutrition", hi: "आहार और पोषण" },
    icon: "Apple"
  },
  {
    id: "vaccination",
    title: { en: "Vaccination & Immunization", hi: "टीकाकरण और सुरक्षा" },
    icon: "ShieldCheck"
  },
  {
    id: "cleanwater",
    title: { en: "Clean Water Habits", hi: "साफ पानी की आदतें" },
    icon: "Droplet"
  },
  {
    id: "sanitation",
    title: { en: "Sanitation & Waste Care", hi: "स्वच्छता और कचरा प्रबंधन" },
    icon: "Trash2"
  },
  {
    id: "firstaid",
    title: { en: "First Aid Basics", hi: "प्राथमिक चिकित्सा" },
    icon: "Activity"
  },
  {
    id: "mentalhealth",
    title: { en: "Mental Wellness", hi: "मानसिक कल्याण" },
    icon: "Sparkles"
  },
  {
    id: "lifestyle",
    title: { en: "Healthy Lifestyle", hi: "स्वस्थ जीवन शैली" },
    icon: "CheckSquare"
  }
];

export const quizQuestions = {
  general: [
    {
      id: "gen_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "hygiene",
      question: {
        en: "What is the single most effective way to prevent the spread of stomach infections?",
        hi: "पेट के संक्रमण को फैलने से रोकने का सबसे प्रभावी तरीका क्या है?"
      },
      options: {
        en: ["Taking antibiotics daily", "Washing hands with soap and clean water", "Eating street food regularly", "Staying indoors"],
        hi: ["रोजाना एंटीबायोटिक लेना", "साबुन और साफ पानी से हाथ धोना", "नियमित रूप से स्ट्रीट फूड खाना", "घर के अंदर रहना"]
      },
      correct: 1,
      explanation: {
        en: "Washing hands with soap and water breaks the transmission cycle of foodborne bacteria and viral diarrhea germs.",
        hi: "साबुन और पानी से हाथ धोने से भोजन से फैलने वाले बैक्टीरिया और वायरल दस्त के कीटाणुओं के फैलने का चक्र टूट जाता है।"
      }
    },
    {
      id: "gen_q2",
      type: "boolean",
      difficulty: "medium",
      relatedTopic: "hypertension",
      question: {
        en: "True or False: Hypertension (High Blood Pressure) always shows obvious warning symptoms.",
        hi: "सही या गलत: उच्च रक्तचाप (हाई बीपी) हमेशा स्पष्ट चेतावनी वाले लक्षण दिखाता है।"
      },
      options: {
        en: ["True", "False"],
        hi: ["सही", "गलत"]
      },
      correct: 1,
      explanation: {
        en: "Hypertension is often called a 'silent killer' because it rarely has obvious symptoms. Regular checkups are the only way to detect it.",
        hi: "उच्च रक्तचाप को अक्सर 'साइलेंट किलर' कहा जाता है क्योंकि इसके शायद ही कभी स्पष्ट लक्षण होते हैं। नियमित जांच ही इसका पता लगाने का एकमात्र तरीका है।"
      }
    }
  ],
  dengue: [
    {
      id: "den_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "dengue",
      question: {
        en: "Which mosquito transmits the Dengue virus?",
        hi: "डेंगू वायरस को कौन सा मच्छर फैलाता है?"
      },
      options: {
        en: ["Female Anopheles", "Male Aedes", "Female Aedes aegypti", "Culex"],
        hi: ["मादा एनोफिलीज", "नर एडीज", "मादा एडीज इजिप्टी", "क्यूलेक्स"]
      },
      correct: 2,
      explanation: {
        en: "Dengue is transmitted by the bite of the female Aedes aegypti mosquito, which typically breeds in clean stagnant water and bites during the day.",
        hi: "डेंगू मादा एडीज इजिप्टी मच्छर के काटने से फैलता है, जो आमतौर पर साफ ठहरे हुए पानी में पनपता है और दिन के समय काटता है।"
      }
    },
    {
      id: "den_q2",
      type: "boolean",
      difficulty: "medium",
      relatedTopic: "dengue",
      question: {
        en: "True or False: Dengue spreads directly from person to person through coughing or shaking hands.",
        hi: "सही या गलत: डेंगू खांसने या हाथ मिलाने से सीधे एक व्यक्ति से दूसरे व्यक्ति में फैलता है।"
      },
      options: {
        en: ["True", "False"],
        hi: ["सही", "गलत"]
      },
      correct: 1,
      explanation: {
        en: "Dengue is not contagious. It only spreads when an Aedes mosquito bites an infected person and then bites a healthy person.",
        hi: "डेंगू संक्रामक नहीं है। यह केवल तब फैलता है जब एडीज मच्छर किसी संक्रमित व्यक्ति को काटने के बाद किसी स्वस्थ व्यक्ति को काटता है।"
      }
    }
  ],
  malaria: [
    {
      id: "mal_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "malaria",
      question: {
        en: "What is the primary symptom of Malaria fever?",
        hi: "मलेरिया बुखार का प्राथमिक लक्षण क्या है?"
      },
      options: {
        en: ["High fever with intense shivering chills", "Runny nose and severe sneezing", "Joint pain without fever", "Skin peeling"],
        hi: ["तेज कंपकंपी (थरथराहट) के साथ तेज बुखार", "बहती नाक और छींक आना", "बिना बुखार के जोड़ों का दर्द", "त्वचा का छिलना"]
      },
      correct: 0,
      explanation: {
        en: "Malaria classically presents with cyclic high fever accompanied by severe chills and shivering as the parasites infect red blood cells.",
        hi: "मलेरिया में मुख्य रूप से चक्रानुक्रम तेज बुखार के साथ तेज ठंड और कंपकंपी होती है क्योंकि परजीवी लाल रक्त कोशिकाओं को संक्रमित करते हैं।"
      }
    }
  ],
  nutrition: [
    {
      id: "nut_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "nutrition",
      question: {
        en: "Which deficiency is the primary cause of Anemia (low blood levels) in women and children?",
        hi: "महिलाओं और बच्चों में एनीमिया (खून की कमी) का मुख्य कारण किस तत्व की कमी है?"
      },
      options: {
        en: ["Calcium deficiency", "Iron deficiency", "Vitamin C deficiency", "Protein deficiency"],
        hi: ["कैल्शियम की कमी", "आयरन (लोहा) की कमी", "विटामिन सी की कमी", "प्रोटीन की कमी"]
      },
      correct: 1,
      explanation: {
        en: "Iron is essential to build hemoglobin in red blood cells. Lack of iron in diet causes anemia, leading to fatigue and dizziness.",
        hi: "लाल रक्त कोशिकाओं में हीमोग्लोबिन बनाने के लिए आयरन आवश्यक है। आहार में आयरन की कमी से एनीमिया होता है, जिससे थकान और चक्कर आते हैं।"
      }
    }
  ],
  vaccination: [
    {
      id: "vac_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "vaccination",
      question: {
        en: "Which vaccine is given to newborns at birth to protect against severe forms of Tuberculosis?",
        hi: "नवजात शिशुओं को जन्म के समय तपेदिक (टीबी) से बचाने के लिए कौन सा टीका दिया जाता है?"
      },
      options: {
        en: ["Polio Vaccine", "BCG Vaccine", "Hepatitis B Vaccine", "DPT Vaccine"],
        hi: ["पोलियो का टीका", "बीसीजी (BCG) का टीका", "हेपेटाइटिस बी का टीका", "डीपीटी (DPT) का टीका"]
      },
      correct: 1,
      explanation: {
        en: "The BCG (Bacillus Calmette-Guérin) vaccine is administered at birth to protect infants against severe forms of tuberculosis like TB meningitis.",
        hi: "शिशुओं को गंभीर टीबी (जैसे टीबी मेनिन्जाइटिस) से बचाने के लिए जन्म के समय बीसीजी (BCG) का टीका लगाया जाता है।"
      }
    }
  ],
  cleanwater: [
    {
      id: "wat_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "cleanwater",
      question: {
        en: "How long should you boil drinking water to guarantee all disease-causing germs are killed?",
        hi: "पीने के पानी को कितने समय तक उबालना चाहिए ताकि यह सुनिश्चित हो सके कि सभी कीटाणु मर गए हैं?"
      },
      options: {
        en: ["For 10 seconds", "For 1 full minute of rolling boil", "Until it gets lukewarm", "For 30 minutes"],
        hi: ["10 सेकंड के लिए", "कम से कम 1 मिनट तक पूरी तरह उबालना", "गुनगुना होने तक", "30 मिनट के लिए"]
      },
      correct: 1,
      explanation: {
        en: "Bringing water to a rolling boil for 1 full minute destroys all disease-causing bacteria, viruses, and parasites.",
        hi: "पीने के पानी को 1 मिनट तक पूरी तरह उबालने से सभी हानिकारक बैक्टीरिया, वायरस और परजीवी नष्ट हो जाते हैं।"
      }
    }
  ],
  sanitation: [
    {
      id: "san_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "sanitation",
      question: {
        en: "How does open defecation primarily affect community health?",
        hi: "खुले में शौच मुख्य रूप से सामुदायिक स्वास्थ्य को कैसे प्रभावित करता है?"
      },
      options: {
        en: ["It contaminates soil and drinking water sources", "It reduces air humidity", "It raises temperature", "It only affects crops"],
        hi: ["यह मिट्टी और पीने के पानी के स्रोतों को दूषित करता है", "यह हवा की नमी को कम करता है", "यह तापमान बढ़ाता है", "यह केवल फसलों को प्रभावित करता है"]
      },
      correct: 0,
      explanation: {
        en: "Open defecation spreads pathogens. Houseflies carry germs from feces to food, and rain washes waste into nearby drinking wells, causing diarrhea outbreaks.",
        hi: "खुले में शौच से कीटाणु फैलते हैं। मक्खियाँ गंदगी को भोजन तक लाती हैं और बारिश का पानी कचरे को पीने के कुओं में बहा देता है, जिससे दस्त फैलते हैं।"
      }
    }
  ],
  firstaid: [
    {
      id: "fa_q1",
      type: "scenario",
      difficulty: "easy",
      relatedTopic: "firstaid",
      question: {
        en: "Scenario: A child spills hot tea on their arm, resulting in mild redness and pain. What is your immediate first aid action?",
        hi: "परिदृश्य: एक बच्चा अपनी बांह पर गर्म चाय गिरा लेता है, जिससे त्वचा लाल हो जाती है और दर्द होता है। आपका तत्काल प्राथमिक उपचार क्या होगा?"
      },
      options: {
        en: ["Apply toothpaste or butter immediately", "Pop any blisters that form", "Pour cool running tap water over it for 10-15 minutes", "Wrap it tightly with dry cotton bandages"],
        hi: ["तुरंत टूथपेस्ट या मक्खन लगाएं", "बनने वाले किसी भी छाले को फोड़ें", "10-15 मिनट के लिए बहता हुआ ठंडा पानी डालें", "सूखी सूती पट्टी से कसकर लपेटें"]
      },
      correct: 2,
      explanation: {
        en: "Cool running tap water dissipates heat and stops deep tissue damage. Toothpaste and butter trap heat inside and trigger severe skin infections.",
        hi: "नल का ठंडा बहता हुआ पानी गर्मी को कम करता है और अंदरूनी ऊतकों के नुकसान को रोकता है। टूथपेस्ट और मक्खन गर्मी को रोकते हैं और संक्रमण का कारण बनते हैं।"
      }
    },
    {
      id: "fa_q2",
      type: "single",
      difficulty: "medium",
      relatedTopic: "firstaid",
      question: {
        en: "What should you do immediately if someone is bitten by a venomous snake?",
        hi: "यदि किसी को जहरीला सांप काट ले तो आपको तुरंत क्या करना चाहिए?"
      },
      options: {
        en: ["Cut the wound to let poison out", "Use your mouth to suck out venom", "Keep the limb still and calm the victim, then rush to hospital", "Apply a very tight rope tourniquet above the bite"],
        hi: ["जहर बाहर निकालने के लिए घाव पर कट लगाएं", "मुंह से जहर चूसने का प्रयास करें", "अंग को स्थिर रखें, पीड़ित को शांत रखें और अस्पताल भागें", "काटने की जगह के ऊपर रस्सी (टूर्निकेट) कसकर बांधें"]
      },
      correct: 2,
      explanation: {
        en: "Keeping the limb still and keeping the victim calm slows venom circulation. Cutting, sucking, or using tight ropes can worsen injuries and damage tissue.",
        hi: "प्रभावित अंग को स्थिर और पीड़ित को शांत रखने से जहर का संचार धीमा हो जाता है। घाव को काटने या चूसने से ऊतक नष्ट हो सकते हैं और खतरा बढ़ता है।"
      }
    }
  ],
  mentalhealth: [
    {
      id: "men_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "mentalhealth",
      question: {
        en: "What is a healthy habit to manage daily stress and anxiety?",
        hi: "दैनिक तनाव और चिंता को प्रबंधित करने की एक स्वस्थ आदत क्या है?"
      },
      options: {
        en: ["Isolating yourself from friends", "Practicing 5-10 minutes of deep breathing or mindfulness", "Staying up late using mobile devices", "Skipping meals"],
        hi: ["अपने आप को दोस्तों से अलग करना", "5-10 मिनट गहरी सांस लेने या ध्यान का अभ्यास करना", "देर रात तक मोबाइल का उपयोग करना", "भोजन छोड़ना"]
      },
      correct: 1,
      explanation: {
        en: "Simple breathing exercises or sharing feelings with friends and family activates brain calming centers and lowers stress hormones.",
        hi: "सांस लेने के सरल व्यायाम या मित्रों/परिवार के साथ अपनी भावनाएं साझा करने से मस्तिष्क शांत होता है और तनाव के हार्मोन कम होते हैं।"
      }
    }
  ],
  lifestyle: [
    {
      id: "life_q1",
      type: "single",
      difficulty: "easy",
      relatedTopic: "lifestyle",
      question: {
        en: "How many minutes of physical exercise (like brisk walking) should adults perform daily to reduce chronic illness risks?",
        hi: "क्रोनिक बीमारियों के खतरे को कम करने के लिए वयस्कों को दैनिक रूप से कितने मिनट का व्यायाम (जैसे तेज चलना) करना चाहिए?"
      },
      options: {
        en: ["At least 5 minutes", "At least 30 minutes", "At least 2 hours", "Only on weekends"],
        hi: ["कम से कम 5 मिनट", "कम से कम 30 मिनट", "कम से कम 2 घंटे", "केवल सप्ताहांत पर"]
      },
      correct: 1,
      explanation: {
        en: "30 minutes of daily physical exercise improves cardiovascular health, controls blood pressure, and reduces insulin resistance.",
        hi: "रोजाना 30 मिनट की शारीरिक गतिविधि हृदय स्वास्थ्य में सुधार करती है, रक्तचाप को नियंत्रित करती है और इंसुलिन प्रतिरोध को कम करती है।"
      }
    }
  ]
};

export default {
  quizCategories,
  quizQuestions
};
