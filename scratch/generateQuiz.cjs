const fs = require('fs');

const data = `// Reusable Bilingual Quiz Dataset
// Categories: General Healthcare, Dengue, Malaria, Nutrition, Vaccination, Clean Water, Sanitation, First Aid, Mental Health, Healthy Lifestyle

export const quizCategories = [
  { id: "general", title: { en: "General Healthcare", hi: "सामान्य स्वास्थ्य" }, icon: "Stethoscope" },
  { id: "dengue", title: { en: "Dengue Awareness", hi: "डेंगू जागरूकता" }, icon: "ShieldAlert" },
  { id: "malaria", title: { en: "Malaria Awareness", hi: "मलेरिया जागरूकता" }, icon: "ShieldAlert" },
  { id: "nutrition", title: { en: "Diet & Nutrition", hi: "आहार और पोषण" }, icon: "Apple" },
  { id: "vaccination", title: { en: "Vaccination & Immunization", hi: "टीकाकरण और सुरक्षा" }, icon: "ShieldCheck" },
  { id: "cleanwater", title: { en: "Clean Water Habits", hi: "साफ पानी की आदतें" }, icon: "Droplet" },
  { id: "sanitation", title: { en: "Sanitation & Waste Care", hi: "स्वच्छता और कचरा प्रबंधन" }, icon: "Trash2" },
  { id: "firstaid", title: { en: "First Aid Basics", hi: "प्राथमिक चिकित्सा" }, icon: "Activity" },
  { id: "mentalhealth", title: { en: "Mental Wellness", hi: "मानसिक कल्याण" }, icon: "Sparkles" },
  { id: "lifestyle", title: { en: "Healthy Lifestyle", hi: "स्वस्थ जीवन शैली" }, icon: "CheckSquare" }
];

export const quizQuestions = {
  general: [
    {
      id: "gen_q1", type: "single", difficulty: "easy", relatedTopic: "hygiene",
      question: { en: "What is the single most effective way to prevent the spread of stomach infections?", hi: "पेट के संक्रमण को फैलने से रोकने का सबसे प्रभावी तरीका क्या है?" },
      options: { en: ["Taking antibiotics daily", "Washing hands with soap and clean water", "Eating street food regularly", "Staying indoors"], hi: ["रोजाना एंटीबायोटिक लेना", "साबुन और साफ पानी से हाथ धोना", "नियमित रूप से स्ट्रीट फूड खाना", "घर के अंदर रहना"] },
      correct: 1, explanation: { en: "Washing hands breaks the transmission cycle of foodborne germs.", hi: "हाथ धोने से भोजन से फैलने वाले कीटाणुओं का चक्र टूट जाता है।" }
    },
    {
      id: "gen_q2", type: "boolean", difficulty: "medium", relatedTopic: "hypertension",
      question: { en: "True or False: Hypertension always shows obvious warning symptoms.", hi: "सही या गलत: उच्च रक्तचाप हमेशा स्पष्ट चेतावनी लक्षण दिखाता है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 1, explanation: { en: "Hypertension is often called a 'silent killer' with no symptoms.", hi: "उच्च रक्तचाप को अक्सर बिना लक्षणों वाला 'साइलेंट किलर' कहा जाता है।" }
    },
    {
      id: "gen_q3", type: "single", difficulty: "easy", relatedTopic: "fever",
      question: { en: "What is the normal human body temperature?", hi: "सामान्य मानव शरीर का तापमान क्या है?" },
      options: { en: ["37°C (98.6°F)", "40°C (104°F)", "35°C (95°F)", "39°C (102°F)"], hi: ["37°C (98.6°F)", "40°C (104°F)", "35°C (95°F)", "39°C (102°F)"] },
      correct: 0, explanation: { en: "Normal body temperature is around 37°C or 98.6°F.", hi: "शरीर का सामान्य तापमान लगभग 37°C या 98.6°F होता है।" }
    },
    {
      id: "gen_q4", type: "single", difficulty: "medium", relatedTopic: "diabetes",
      question: { en: "Which organ produces insulin in the human body?", hi: "मानव शरीर में कौन सा अंग इंसुलिन बनाता है?" },
      options: { en: ["Liver", "Kidney", "Pancreas", "Stomach"], hi: ["लिवर", "किडनी", "अग्न्याशय (पैंक्रियास)", "पेट"] },
      correct: 2, explanation: { en: "The pancreas produces insulin to regulate blood sugar levels.", hi: "अग्न्याशय रक्त शर्करा के स्तर को नियंत्रित करने के लिए इंसुलिन बनाता है।" }
    },
    {
      id: "gen_q5", type: "single", difficulty: "hard", relatedTopic: "heart",
      question: { en: "What is a common sign of a heart attack?", hi: "दिल के दौरे का एक सामान्य संकेत क्या है?" },
      options: { en: ["Chest pain or discomfort", "Itchy skin", "Runny nose", "Knee pain"], hi: ["छाती में दर्द या बेचैनी", "खुजली वाली त्वचा", "बहती नाक", "घुटने का दर्द"] },
      correct: 0, explanation: { en: "Chest pain or pressure is the most common warning sign of a heart attack.", hi: "सीने में दर्द या दबाव दिल के दौरे का सबसे आम चेतावनी संकेत है।" }
    }
  ],
  dengue: [
    {
      id: "den_q1", type: "single", difficulty: "easy", relatedTopic: "dengue",
      question: { en: "Which mosquito transmits the Dengue virus?", hi: "डेंगू वायरस को कौन सा मच्छर फैलाता है?" },
      options: { en: ["Female Anopheles", "Male Aedes", "Female Aedes aegypti", "Culex"], hi: ["मादा एनोफिलीज", "नर एडीज", "मादा एडीज इजिप्टी", "क्यूलेक्स"] },
      correct: 2, explanation: { en: "Dengue is transmitted by the female Aedes aegypti mosquito.", hi: "डेंगू मादा एडीज इजिप्टी मच्छर के काटने से फैलता है।" }
    },
    {
      id: "den_q2", type: "boolean", difficulty: "medium", relatedTopic: "dengue",
      question: { en: "True or False: Dengue spreads directly from person to person.", hi: "सही या गलत: डेंगू सीधे एक व्यक्ति से दूसरे व्यक्ति में फैलता है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 1, explanation: { en: "Dengue is not contagious. It requires a mosquito bite.", hi: "डेंगू संक्रामक नहीं है। इसके लिए मच्छर के काटने की आवश्यकता होती है।" }
    },
    {
      id: "den_q3", type: "single", difficulty: "easy", relatedTopic: "dengue",
      question: { en: "When do dengue-carrying mosquitoes typically bite?", hi: "डेंगू फैलाने वाले मच्छर आमतौर पर कब काटते हैं?" },
      options: { en: ["Only at night", "During the day", "Only in winter", "Only when it's raining"], hi: ["केवल रात में", "दिन के दौरान", "केवल सर्दियों में", "केवल जब बारिश हो रही हो"] },
      correct: 1, explanation: { en: "Aedes mosquitoes primarily bite during the daytime.", hi: "एडीज मच्छर मुख्य रूप से दिन के समय काटते हैं।" }
    },
    {
      id: "den_q4", type: "single", difficulty: "medium", relatedTopic: "dengue",
      question: { en: "Where do Aedes mosquitoes typically breed?", hi: "एडीज मच्छर आमतौर पर कहाँ पनपते हैं?" },
      options: { en: ["Flowing rivers", "Clean stagnant water", "Dirty sewage", "Dry sand"], hi: ["बहती नदियां", "साफ रुका हुआ पानी", "गंदा सीवेज", "सूखी रेत"] },
      correct: 1, explanation: { en: "They breed in clean, stagnant water like in tires, pots, and buckets.", hi: "वे साफ, रुके हुए पानी जैसे टायर, बर्तन और बाल्टी में पनपते हैं।" }
    },
    {
      id: "den_q5", type: "single", difficulty: "hard", relatedTopic: "dengue",
      question: { en: "What is a dangerous symptom of severe dengue?", hi: "गंभीर डेंगू का खतरनाक लक्षण क्या है?" },
      options: { en: ["Hair loss", "Bleeding gums and severe abdominal pain", "Slight cough", "Dry eyes"], hi: ["बालों का झड़ना", "मसूड़ों से खून आना और पेट में तेज दर्द", "हल्की खांसी", "सूखी आंखें"] },
      correct: 1, explanation: { en: "Bleeding and severe pain are signs of Dengue Hemorrhagic Fever.", hi: "रक्तस्राव और तेज दर्द डेंगू रक्तस्रावी बुखार के संकेत हैं।" }
    }
  ],
  malaria: [
    {
      id: "mal_q1", type: "single", difficulty: "easy", relatedTopic: "malaria",
      question: { en: "What is the primary symptom of Malaria fever?", hi: "मलेरिया बुखार का प्राथमिक लक्षण क्या है?" },
      options: { en: ["High fever with intense shivering chills", "Runny nose", "Joint pain without fever", "Skin peeling"], hi: ["तेज कंपकंपी के साथ तेज बुखार", "बहती नाक", "बिना बुखार के जोड़ों का दर्द", "त्वचा का छिलना"] },
      correct: 0, explanation: { en: "Malaria classically presents with cyclic high fever and chills.", hi: "मलेरिया में चक्रानुक्रम तेज बुखार और ठंड होती है।" }
    },
    {
      id: "mal_q2", type: "single", difficulty: "medium", relatedTopic: "malaria",
      question: { en: "Which mosquito spreads Malaria?", hi: "मलेरिया कौन सा मच्छर फैलाता है?" },
      options: { en: ["Aedes", "Culex", "Female Anopheles", "Male Anopheles"], hi: ["एडीज", "क्यूलेक्स", "मादा एनोफिलीज", "नर एनोफिलीज"] },
      correct: 2, explanation: { en: "Malaria is spread by the infected female Anopheles mosquito.", hi: "मलेरिया संक्रमित मादा एनोफिलीज मच्छर द्वारा फैलता है।" }
    },
    {
      id: "mal_q3", type: "boolean", difficulty: "easy", relatedTopic: "malaria",
      question: { en: "True or False: Using insecticide-treated bed nets reduces malaria risk.", hi: "सही या गलत: कीटनाशक युक्त मच्छरदानी का उपयोग करने से मलेरिया का खतरा कम होता है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 0, explanation: { en: "Bed nets are one of the most effective ways to prevent malaria.", hi: "मच्छरदानी मलेरिया को रोकने के सबसे प्रभावी तरीकों में से एक है।" }
    },
    {
      id: "mal_q4", type: "single", difficulty: "medium", relatedTopic: "malaria",
      question: { en: "Malaria is caused by a:", hi: "मलेरिया किसके कारण होता है:" },
      options: { en: ["Virus", "Bacteria", "Fungus", "Parasite (Plasmodium)"], hi: ["वायरस", "बैक्टीरिया", "फंगस", "परजीवी (प्लाज्मोडियम)"] },
      correct: 3, explanation: { en: "Malaria is a disease caused by Plasmodium parasites.", hi: "मलेरिया प्लाज्मोडियम परजीवी के कारण होने वाली बीमारी है।" }
    },
    {
      id: "mal_q5", type: "single", difficulty: "hard", relatedTopic: "malaria",
      question: { en: "When are Anopheles mosquitoes most active?", hi: "एनोफिलीज मच्छर सबसे अधिक सक्रिय कब होते हैं?" },
      options: { en: ["Midday", "Between dusk and dawn (nighttime)", "Only in winter", "In dry heat"], hi: ["दोपहर", "शाम और भोर (रात के समय) के बीच", "केवल सर्दियों में", "सूखी गर्मी में"] },
      correct: 1, explanation: { en: "Anopheles mosquitoes typically bite during the night.", hi: "एनोफिलीज मच्छर आमतौर पर रात के समय काटते हैं।" }
    }
  ],
  nutrition: [
    {
      id: "nut_q1", type: "single", difficulty: "easy", relatedTopic: "nutrition",
      question: { en: "Which deficiency is the primary cause of Anemia?", hi: "एनीमिया (खून की कमी) का मुख्य कारण किस तत्व की कमी है?" },
      options: { en: ["Calcium", "Iron", "Vitamin C", "Protein"], hi: ["कैल्शियम", "आयरन", "विटामिन सी", "प्रोटीन"] },
      correct: 1, explanation: { en: "Lack of iron causes anemia.", hi: "आयरन की कमी से एनीमिया होता है।" }
    },
    {
      id: "nut_q2", type: "single", difficulty: "easy", relatedTopic: "nutrition",
      question: { en: "Which nutrient is essential for strong bones and teeth?", hi: "मजबूत हड्डियों और दांतों के लिए कौन सा पोषक तत्व आवश्यक है?" },
      options: { en: ["Iron", "Vitamin C", "Calcium", "Zinc"], hi: ["आयरन", "विटामिन सी", "कैल्शियम", "जिंक"] },
      correct: 2, explanation: { en: "Calcium is the main mineral that makes up your bones.", hi: "कैल्शियम वह मुख्य खनिज है जो आपकी हड्डियों को बनाता है।" }
    },
    {
      id: "nut_q3", type: "single", difficulty: "medium", relatedTopic: "nutrition",
      question: { en: "Vitamin C is found in high amounts in which foods?", hi: "विटामिन सी किन खाद्य पदार्थों में अधिक मात्रा में पाया जाता है?" },
      options: { en: ["Meat", "Dairy", "Citrus fruits like oranges", "Rice"], hi: ["मांस", "डेयरी", "खट्टे फल जैसे संतरे", "चावल"] },
      correct: 2, explanation: { en: "Citrus fruits are rich sources of Vitamin C, which boosts immunity.", hi: "खट्टे फल विटामिन सी के समृद्ध स्रोत हैं, जो रोग प्रतिरोधक क्षमता बढ़ाते हैं।" }
    },
    {
      id: "nut_q4", type: "boolean", difficulty: "easy", relatedTopic: "nutrition",
      question: { en: "True or False: Drinking water is not important if you drink fruit juice.", hi: "सही या गलत: यदि आप फलों का रस पीते हैं तो पानी पीना महत्वपूर्ण नहीं है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 1, explanation: { en: "Plain water is essential for hydration without added sugars.", hi: "बिना शक्कर के हाइड्रेशन के लिए सादा पानी आवश्यक है।" }
    },
    {
      id: "nut_q5", type: "single", difficulty: "medium", relatedTopic: "nutrition",
      question: { en: "Which macronutrient provides the body with its primary source of energy?", hi: "कौन सा मैक्रोन्यूट्रिएंट शरीर को ऊर्जा का प्राथमिक स्रोत प्रदान करता है?" },
      options: { en: ["Protein", "Carbohydrates", "Fats", "Vitamins"], hi: ["प्रोटीन", "कार्बोहाइड्रेट", "वसा (फैट)", "विटामिन"] },
      correct: 1, explanation: { en: "Carbohydrates are broken down into glucose, the body's main energy source.", hi: "कार्बोहाइड्रेट ग्लूकोज में टूट जाते हैं, जो शरीर का मुख्य ऊर्जा स्रोत है।" }
    }
  ],
  vaccination: [
    {
      id: "vac_q1", type: "single", difficulty: "easy", relatedTopic: "vaccination",
      question: { en: "Which vaccine is given at birth for Tuberculosis?", hi: "जन्म के समय टीबी के लिए कौन सा टीका दिया जाता है?" },
      options: { en: ["Polio", "BCG", "Hepatitis B", "DPT"], hi: ["पोलियो", "बीसीजी (BCG)", "हेपेटाइटिस बी", "डीपीटी"] },
      correct: 1, explanation: { en: "The BCG vaccine protects infants against tuberculosis.", hi: "बीसीजी का टीका शिशुओं को तपेदिक से बचाता है।" }
    },
    {
      id: "vac_q2", type: "single", difficulty: "easy", relatedTopic: "vaccination",
      question: { en: "Polio drops are given to children primarily to prevent what?", hi: "पोलियो की बूंदें मुख्य रूप से बच्चों को किस चीज से बचाने के लिए दी जाती हैं?" },
      options: { en: ["Fever", "Paralysis", "Blindness", "Cough"], hi: ["बुखार", "पक्षाघात (लकवा)", "अंधापन", "खांसी"] },
      correct: 1, explanation: { en: "Polio can cause irreversible paralysis.", hi: "पोलियो से अपरिवर्तनीय लकवा हो सकता है।" }
    },
    {
      id: "vac_q3", type: "boolean", difficulty: "medium", relatedTopic: "vaccination",
      question: { en: "True or False: Vaccines contain tiny amounts of the weakened or killed virus.", hi: "सही या गलत: टीकों में कमजोर या मारे गए वायरस की बहुत कम मात्रा होती है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 0, explanation: { en: "Vaccines use weakened viruses to train the immune system safely.", hi: "टीके प्रतिरक्षा प्रणाली को सुरक्षित रूप से प्रशिक्षित करने के लिए कमजोर वायरस का उपयोग करते हैं।" }
    },
    {
      id: "vac_q4", type: "single", difficulty: "medium", relatedTopic: "vaccination",
      question: { en: "What does the DPT vaccine protect against?", hi: "DPT का टीका किससे बचाता है?" },
      options: { en: ["Dengue, Polio, Tetanus", "Diphtheria, Pertussis, Tetanus", "Dysentery, Polio, Typhoid", "None"], hi: ["डेंगू, पोलियो, टिटनेस", "डिप्थीरिया, पर्टुसिस, टिटनेस", "पेचिश, पोलियो, टाइफाइड", "कोई नहीं"] },
      correct: 1, explanation: { en: "DPT stands for Diphtheria, Pertussis (whooping cough), and Tetanus.", hi: "DPT का मतलब डिप्थीरिया, पर्टुसिस (काली खांसी) और टिटनेस है।" }
    },
    {
      id: "vac_q5", type: "single", difficulty: "hard", relatedTopic: "vaccination",
      question: { en: "Herd immunity means:", hi: "हर्ड इम्युनिटी (Herd immunity) का अर्थ है:" },
      options: { en: ["No one is vaccinated", "Vaccinating animals", "Enough people are vaccinated to protect those who aren't", "Vaccines don't work"], hi: ["किसी का टीकाकरण नहीं हुआ है", "जानवरों का टीकाकरण", "इतने लोगों को टीका लगाया गया है कि दूसरों की रक्षा हो सके", "टीके काम नहीं करते"] },
      correct: 2, explanation: { en: "Herd immunity protects vulnerable individuals when most of the community is immune.", hi: "हर्ड इम्युनिटी कमजोर लोगों की रक्षा करती है जब अधिकांश समुदाय प्रतिरक्षित होता है।" }
    }
  ],
  cleanwater: [
    {
      id: "wat_q1", type: "single", difficulty: "easy", relatedTopic: "cleanwater",
      question: { en: "How long should you boil drinking water to kill disease germs?", hi: "पीने के पानी को कीटाणुओं को मारने के लिए कितनी देर तक उबालना चाहिए?" },
      options: { en: ["10 seconds", "1 full minute of rolling boil", "Until lukewarm", "30 minutes"], hi: ["10 सेकंड", "1 मिनट तक पूरी तरह उबालना", "गुनगुना होने तक", "30 मिनट"] },
      correct: 1, explanation: { en: "A rolling boil for 1 minute kills pathogens.", hi: "1 मिनट तक पानी उबालने से कीटाणु मर जाते हैं।" }
    },
    {
      id: "wat_q2", type: "single", difficulty: "easy", relatedTopic: "cleanwater",
      question: { en: "Which disease is commonly spread through contaminated water?", hi: "दूषित पानी से आमतौर पर कौन सी बीमारी फैलती है?" },
      options: { en: ["Malaria", "Cholera", "Diabetes", "Asthma"], hi: ["मलेरिया", "हैजा (Cholera)", "मधुमेह (Diabetes)", "अस्थमा"] },
      correct: 1, explanation: { en: "Cholera is a waterborne disease causing severe diarrhea.", hi: "हैजा दूषित पानी से होने वाली बीमारी है जिससे गंभीर दस्त होते हैं।" }
    },
    {
      id: "wat_q3", type: "boolean", difficulty: "medium", relatedTopic: "cleanwater",
      question: { en: "True or False: Clear water is always safe to drink.", hi: "सही या गलत: साफ दिखने वाला पानी हमेशा पीने के लिए सुरक्षित होता है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 1, explanation: { en: "Clear water can still contain microscopic bacteria and viruses.", hi: "साफ पानी में भी सूक्ष्म बैक्टीरिया और वायरस हो सकते हैं।" }
    },
    {
      id: "wat_q4", type: "single", difficulty: "medium", relatedTopic: "cleanwater",
      question: { en: "What chemical is commonly used by municipalities to disinfect water?", hi: "नगर पालिकाओं द्वारा पानी को कीटाणुरहित करने के लिए आमतौर पर किस रसायन का उपयोग किया जाता है?" },
      options: { en: ["Salt", "Sugar", "Chlorine", "Vinegar"], hi: ["नमक", "चीनी", "क्लोरीन", "सिरका"] },
      correct: 2, explanation: { en: "Chlorine is highly effective at killing bacteria in water systems.", hi: "क्लोरीन पानी में बैक्टीरिया को मारने में अत्यधिक प्रभावी है।" }
    },
    {
      id: "wat_q5", type: "single", difficulty: "hard", relatedTopic: "cleanwater",
      question: { en: "What is the safest way to store purified drinking water?", hi: "शुद्ध पीने के पानी को स्टोर करने का सबसे सुरक्षित तरीका क्या है?" },
      options: { en: ["In an open bucket", "In a clean, covered container with a narrow neck or tap", "In a rusty metal drum", "Under direct sunlight"], hi: ["खुली बाल्टी में", "संकरी गर्दन या नल वाले साफ, ढके हुए बर्तन में", "जंग लगे धातु के ड्रम में", "सीधी धूप में"] },
      correct: 1, explanation: { en: "A covered container with a tap prevents re-contamination from hands or cups.", hi: "नल के साथ ढका हुआ बर्तन हाथों या कप से होने वाले संदूषण को रोकता है।" }
    }
  ],
  sanitation: [
    {
      id: "san_q1", type: "single", difficulty: "easy", relatedTopic: "sanitation",
      question: { en: "How does open defecation primarily affect community health?", hi: "खुले में शौच सामुदायिक स्वास्थ्य को कैसे प्रभावित करता है?" },
      options: { en: ["It contaminates soil and water sources", "It reduces humidity", "It raises temperature", "It only affects crops"], hi: ["यह मिट्टी और पानी के स्रोतों को दूषित करता है", "यह नमी को कम करता है", "यह तापमान बढ़ाता है", "यह केवल फसलों को प्रभावित करता है"] },
      correct: 0, explanation: { en: "Open defecation spreads pathogens to food and water.", hi: "खुले में शौच भोजन और पानी में कीटाणु फैलाता है।" }
    },
    {
      id: "san_q2", type: "boolean", difficulty: "easy", relatedTopic: "sanitation",
      question: { en: "True or False: Handwashing with ash or mud is as effective as soap.", hi: "सही या गलत: राख या मिट्टी से हाथ धोना साबुन जितना ही प्रभावी है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 1, explanation: { en: "Soap breaks down the lipid layer of viruses; mud or ash does not.", hi: "साबुन वायरस की वसा परत को तोड़ता है; मिट्टी या राख ऐसा नहीं करते।" }
    },
    {
      id: "san_q3", type: "single", difficulty: "medium", relatedTopic: "sanitation",
      question: { en: "Why is it important to separate dry waste and wet waste?", hi: "सूखे और गीले कचरे को अलग करना क्यों महत्वपूर्ण है?" },
      options: { en: ["It looks better", "Wet waste can be composted, while dry can be recycled", "It is legally required everywhere", "It prevents fires"], hi: ["यह बेहतर दिखता है", "गीले कचरे से खाद बनाई जा सकती है, जबकि सूखे को रिसाइकल किया जा सकता है", "यह हर जगह कानूनी रूप से आवश्यक है", "यह आग से बचाता है"] },
      correct: 1, explanation: { en: "Separation enables proper recycling and composting.", hi: "पृथक्करण से उचित रिसाइक्लिंग और खाद बनाना संभव होता है।" }
    },
    {
      id: "san_q4", type: "single", difficulty: "medium", relatedTopic: "sanitation",
      question: { en: "What is the most hygienic way to dispose of sanitary pads?", hi: "सेनेटरी पैड को निपटाने का सबसे स्वच्छ तरीका क्या है?" },
      options: { en: ["Flush them down the toilet", "Throw them in open drains", "Wrap them in paper and dispose in a covered dustbin", "Burn them in the open"], hi: ["उन्हें शौचालय में फ्लश करें", "उन्हें खुली नालियों में फेंक दें", "कागज में लपेटें और ढके हुए कूड़ेदान में फेंकें", "खुले में जलाएं"] },
      correct: 2, explanation: { en: "Wrapping and bin disposal prevents drain clogs and hygiene risks.", hi: "लपेटने और कूड़ेदान में फेंकने से नालियां ब्लॉक होने और संक्रमण का खतरा टलता है।" }
    },
    {
      id: "san_q5", type: "single", difficulty: "hard", relatedTopic: "sanitation",
      question: { en: "How can standing water in open drains impact community health?", hi: "खुली नालियों में रुका हुआ पानी सामुदायिक स्वास्थ्य को कैसे प्रभावित कर सकता है?" },
      options: { en: ["It cools the environment", "It becomes a breeding ground for mosquitoes", "It provides drinking water for animals", "It reduces dust"], hi: ["यह पर्यावरण को ठंडा करता है", "यह मच्छरों के पनपने का स्थान बन जाता है", "यह जानवरों के लिए पीने का पानी प्रदान करता है", "यह धूल कम करता है"] },
      correct: 1, explanation: { en: "Stagnant drains breed mosquitoes that carry malaria and dengue.", hi: "रुकी हुई नालियों में मच्छर पनपते हैं जो मलेरिया और डेंगू फैलाते हैं।" }
    }
  ],
  firstaid: [
    {
      id: "fa_q1", type: "scenario", difficulty: "easy", relatedTopic: "firstaid",
      question: { en: "Scenario: A child spills hot tea on their arm. What is your immediate action?", hi: "परिदृश्य: एक बच्चा अपनी बांह पर गर्म चाय गिरा लेता है। आप तुरंत क्या करेंगे?" },
      options: { en: ["Apply toothpaste", "Pop blisters", "Pour cool running water for 10-15 mins", "Wrap tightly"], hi: ["टूथपेस्ट लगाएं", "छाले फोड़ें", "10-15 मिनट के लिए ठंडा पानी डालें", "कसकर लपेटें"] },
      correct: 2, explanation: { en: "Cool water dissipates heat. Toothpaste traps it.", hi: "ठंडा पानी गर्मी को कम करता है। टूथपेस्ट इसे रोकता है।" }
    },
    {
      id: "fa_q2", type: "single", difficulty: "medium", relatedTopic: "firstaid",
      question: { en: "What should you do immediately if someone is bitten by a venomous snake?", hi: "यदि किसी को जहरीला सांप काट ले तो क्या करें?" },
      options: { en: ["Cut the wound", "Suck out venom", "Keep the limb still and rush to hospital", "Apply a tight tourniquet"], hi: ["घाव पर कट लगाएं", "जहर चूसें", "अंग को स्थिर रखें और अस्पताल भागें", "टूर्निकेट बांधें"] },
      correct: 2, explanation: { en: "Keeping calm and still slows venom spread.", hi: "शांत और स्थिर रहने से जहर का फैलना धीमा होता है।" }
    },
    {
      id: "fa_q3", type: "single", difficulty: "easy", relatedTopic: "firstaid",
      question: { en: "If a person gets a deep cut that is bleeding heavily, what is the first step?", hi: "यदि किसी को गहरा घाव हो जाए और बहुत खून बह रहा हो, तो पहला कदम क्या है?" },
      options: { en: ["Wash with dirty water", "Apply firm, direct pressure with a clean cloth", "Wait for it to stop", "Put mud on it"], hi: ["गंदे पानी से धोएं", "साफ कपड़े से सीधा दबाव डालें", "रुकने का इंतजार करें", "उस पर मिट्टी डालें"] },
      correct: 1, explanation: { en: "Direct pressure stops heavy bleeding effectively.", hi: "सीधा दबाव अत्यधिक रक्तस्राव को प्रभावी ढंग से रोकता है।" }
    },
    {
      id: "fa_q4", type: "boolean", difficulty: "medium", relatedTopic: "firstaid",
      question: { en: "True or False: If someone faints, you should immediately prop them up in a sitting position.", hi: "सही या गलत: यदि कोई बेहोश हो जाता है, तो उसे तुरंत बैठने की स्थिति में सहारा देना चाहिए।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 1, explanation: { en: "You should lay them flat and elevate their legs to restore blood flow to the brain.", hi: "मस्तिष्क में रक्त के प्रवाह को बहाल करने के लिए उन्हें सीधा लिटाना और उनके पैरों को ऊपर उठाना चाहिए।" }
    },
    {
      id: "fa_q5", type: "single", difficulty: "hard", relatedTopic: "firstaid",
      question: { en: "In CPR for an adult, where should you place your hands for chest compressions?", hi: "वयस्क के लिए सीपीआर में, छाती को दबाने के लिए आपको अपने हाथ कहां रखने चाहिए?" },
      options: { en: ["On the stomach", "In the center of the chest, on the lower half of the breastbone", "On the neck", "On the ribs on the left side"], hi: ["पेट पर", "छाती के केंद्र में, उरोस्थि (ब्रेस्टबोन) के निचले आधे हिस्से पर", "गर्दन पर", "बाईं ओर पसलियों पर"] },
      correct: 1, explanation: { en: "Compressions must be done in the center of the chest to effectively pump the heart.", hi: "हृदय को प्रभावी ढंग से पंप करने के लिए छाती के केंद्र में दबाव डाला जाना चाहिए।" }
    }
  ],
  mentalhealth: [
    {
      id: "men_q1", type: "single", difficulty: "easy", relatedTopic: "mentalhealth",
      question: { en: "What is a healthy habit to manage daily stress?", hi: "दैनिक तनाव प्रबंधित करने की एक स्वस्थ आदत क्या है?" },
      options: { en: ["Isolating yourself", "Deep breathing or mindfulness", "Staying up late", "Skipping meals"], hi: ["खुद को अलग करना", "गहरी सांस लेना या ध्यान", "देर तक जागना", "भोजन छोड़ना"] },
      correct: 1, explanation: { en: "Breathing exercises lower stress hormones.", hi: "सांस के व्यायाम तनाव के हार्मोन कम करते हैं।" }
    },
    {
      id: "men_q2", type: "single", difficulty: "medium", relatedTopic: "mentalhealth",
      question: { en: "How does regular physical exercise affect mental health?", hi: "नियमित शारीरिक व्यायाम मानसिक स्वास्थ्य को कैसे प्रभावित करता है?" },
      options: { en: ["It makes you more angry", "It releases endorphins that improve mood", "It has no effect", "It causes depression"], hi: ["यह आपको और क्रोधित करता है", "यह एंडोर्फिन जारी करता है जो मूड में सुधार करता है", "इसका कोई प्रभाव नहीं होता", "यह डिप्रेशन का कारण बनता है"] },
      correct: 1, explanation: { en: "Exercise releases endorphins, the brain's natural feel-good chemicals.", hi: "व्यायाम से एंडोर्फिन निकलता है, जो मूड को बेहतर बनाता है।" }
    },
    {
      id: "men_q3", type: "boolean", difficulty: "easy", relatedTopic: "mentalhealth",
      question: { en: "True or False: Seeking professional help for a mental health issue is a sign of weakness.", hi: "सही या गलत: मानसिक स्वास्थ्य समस्या के लिए पेशेवर मदद मांगना कमजोरी की निशानी है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 1, explanation: { en: "Therapy is a proactive step for well-being, just like visiting a doctor for physical illness.", hi: "थेरेपी शारीरिक बीमारी के लिए डॉक्टर के पास जाने की तरह ही स्वास्थ्य के लिए एक सक्रिय कदम है।" }
    },
    {
      id: "men_q4", type: "single", difficulty: "medium", relatedTopic: "mentalhealth",
      question: { en: "What is 'mindfulness'?", hi: "'माइंडफुलनेस' (ध्यान) क्या है?" },
      options: { en: ["Ignoring your problems", "Focusing fully on the present moment without judgment", "Sleeping all day", "Worrying about the future"], hi: ["अपनी समस्याओं को नज़रअंदाज़ करना", "बिना किसी निर्णय के वर्तमान क्षण पर पूरी तरह ध्यान केंद्रित करना", "दिन भर सोना", "भविष्य के बारे में चिंता करना"] },
      correct: 1, explanation: { en: "Mindfulness helps ground you in the present, reducing anxiety about the past or future.", hi: "माइंडफुलनेस आपको वर्तमान में रहने में मदद करता है, जिससे चिंता कम होती है।" }
    },
    {
      id: "men_q5", type: "single", difficulty: "hard", relatedTopic: "mentalhealth",
      question: { en: "Lack of sleep can lead to which of the following?", hi: "नींद की कमी के कारण क्या हो सकता है?" },
      options: { en: ["Increased immunity", "Better memory", "Increased irritability and risk of depression", "Stronger muscles"], hi: ["बढ़ी हुई इम्युनिटी", "बेहतर याददाश्त", "चिड़चिड़ापन और डिप्रेशन का बढ़ा हुआ जोखिम", "मजबूत मांसपेशियां"] },
      correct: 2, explanation: { en: "Sleep deprivation heavily impacts emotional regulation and mental stability.", hi: "नींद की कमी भावनात्मक नियंत्रण और मानसिक स्थिरता को बहुत प्रभावित करती है।" }
    }
  ],
  lifestyle: [
    {
      id: "life_q1", type: "single", difficulty: "easy", relatedTopic: "lifestyle",
      question: { en: "How many minutes of exercise should adults do daily?", hi: "वयस्कों को रोजाना कितने मिनट का व्यायाम करना चाहिए?" },
      options: { en: ["5 minutes", "30 minutes", "2 hours", "Only weekends"], hi: ["5 मिनट", "30 मिनट", "2 घंटे", "केवल सप्ताहांत"] },
      correct: 1, explanation: { en: "30 mins of daily exercise improves heart health.", hi: "रोजाना 30 मिनट का व्यायाम हृदय स्वास्थ्य में सुधार करता है।" }
    },
    {
      id: "life_q2", type: "single", difficulty: "easy", relatedTopic: "lifestyle",
      question: { en: "Which of the following is a negative lifestyle habit?", hi: "निम्नलिखित में से कौन सी एक नकारात्मक जीवन शैली की आदत है?" },
      options: { en: ["Drinking 8 glasses of water", "Sleeping 7-8 hours", "Smoking tobacco", "Eating fresh vegetables"], hi: ["8 गिलास पानी पीना", "7-8 घंटे सोना", "तंबाकू धूम्रपान", "ताजी सब्जियां खाना"] },
      correct: 2, explanation: { en: "Smoking damages lungs and heart, leading to severe chronic diseases.", hi: "धूम्रपान फेफड़ों और हृदय को नुकसान पहुंचाता है।" }
    },
    {
      id: "life_q3", type: "boolean", difficulty: "medium", relatedTopic: "lifestyle",
      question: { en: "True or False: Fast food is a healthy choice for daily meals.", hi: "सही या गलत: फास्ट फूड दैनिक भोजन के लिए एक स्वस्थ विकल्प है।" },
      options: { en: ["True", "False"], hi: ["सही", "गलत"] },
      correct: 1, explanation: { en: "Fast food is high in unhealthy fats, sugar, and salt.", hi: "फास्ट फूड में अस्वास्थ्यकर वसा, चीनी और नमक की मात्रा अधिक होती है।" }
    },
    {
      id: "life_q4", type: "single", difficulty: "medium", relatedTopic: "lifestyle",
      question: { en: "How many hours of sleep is generally recommended for an adult?", hi: "एक वयस्क के लिए आमतौर पर कितने घंटे की नींद की सिफारिश की जाती है?" },
      options: { en: ["3-4 hours", "5-6 hours", "7-8 hours", "10-12 hours"], hi: ["3-4 घंटे", "5-6 घंटे", "7-8 घंटे", "10-12 घंटे"] },
      correct: 2, explanation: { en: "7-8 hours allows the body and brain to repair and rest properly.", hi: "7-8 घंटे शरीर और मस्तिष्क को ठीक से आराम करने और मरम्मत करने देते हैं।" }
    },
    {
      id: "life_q5", type: "single", difficulty: "hard", relatedTopic: "lifestyle",
      question: { en: "What is the consequence of prolonged sitting without breaks?", hi: "बिना ब्रेक के लंबे समय तक बैठने का क्या परिणाम होता है?" },
      options: { en: ["Improved focus", "Increased risk of obesity and cardiovascular issues", "Stronger back muscles", "Better digestion"], hi: ["बेहतर फोकस", "मोटापे और हृदय संबंधी समस्याओं का बढ़ा हुआ जोखिम", "मजबूत पीठ की मांसपेशियां", "बेहतर पाचन"] },
      correct: 1, explanation: { en: "Sedentary behavior increases risks for heart disease and metabolic syndrome.", hi: "गतिहीन व्यवहार हृदय रोग और चयापचय सिंड्रोम के जोखिम को बढ़ाता है।" }
    }
  ]
};

export default {
  quizCategories,
  quizQuestions
};
`;

fs.writeFileSync('/Users/farhan/Desktop/IP3/src/utils/quizData.js', data);
console.log('Quiz data rewritten successfully!');
