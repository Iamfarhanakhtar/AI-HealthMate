// Interactive Health Guide & First Aid Database
// Contains bilingual educational structures for symptoms, first aid timelines, helpline numbers, and healthy habits.

export const symptoms = [
  {
    id: "fever",
    title: { en: "Fever", hi: "बुखार" },
    category: "General",
    overview: {
      en: "A temporary increase in body temperature, often in response to an infection. It indicates the immune system is actively fighting germs.",
      hi: "शरीर के तापमान में एक अस्थायी वृद्धि, अक्सर संक्रमण के जवाब में। यह इंगित करता है कि प्रतिरक्षा प्रणाली सक्रिय रूप से कीटाणुओं से लड़ रही है।"
    },
    causes: {
      en: "Common cold, flu, dengue, malaria, typhoid, or other respiratory/gastrointestinal infections.",
      hi: "सामान्य सर्दी, फ्लू, डेंगू, मलेरिया, टाइफाइड, या अन्य श्वसन/पेट के संक्रमण।"
    },
    homeCare: {
      en: "Rest in a cool room, drink plenty of fluids (water, soup, ORS), and use a damp cloth on the forehead for cooling. Dress in light clothing.",
      hi: "ठंडे कमरे में आराम करें, खूब सारे तरल पदार्थ (पानी, सूप, ओआरएस) पिएं और माथे पर गीला कपड़ा रखकर तापमान कम करें। हल्के कपड़े पहनें।"
    },
    prevention: {
      en: "Wash hands with soap regularly, stay updated on vaccinations, and avoid close contact with sick people.",
      hi: "नियमित रूप से साबुन से हाथ धोएं, समय पर टीका लगवाएं और बीमार लोगों के निकट संपर्क से बचें।"
    },
    warningSigns: {
      en: "Stiff neck, severe headache, confusion, difficulty breathing, or temperature exceeding 103°F (39.4°C) that doesn't drop with medication.",
      hi: "गर्दन में अकड़न, तेज सिरदर्द, भ्रम, सांस लेने में कठिनाई, या तापमान 103°F (39.4°C) से अधिक होना जो दवा से भी कम न हो।"
    },
    consult: {
      en: "Consult a physician if fever lasts more than 3 days, or immediately if infants under 3 months have a temperature over 100.4°F.",
      hi: "यदि बुखार 3 दिनों से अधिक समय तक रहता है, या 3 महीने से कम उम्र के शिशुओं को 100.4°F से अधिक बुखार होने पर तुरंत डॉक्टर से मिलें।"
    }
  },
  {
    id: "headache",
    title: { en: "Headache", hi: "सिरदर्द" },
    category: "General",
    overview: {
      en: "Pain in any region of the head, which can feel sharp, throbbing, dull, or aching. Most headaches are not signs of serious illness.",
      hi: "सिर के किसी भी हिस्से में होने वाला दर्द, जो तेज, धड़कता हुआ या हल्का महसूस हो सकता है। अधिकांश सिरदर्द गंभीर बीमारी का संकेत नहीं होते हैं।"
    },
    causes: {
      en: "Stress, dehydration, eye strain, lack of sleep, sinus congestion, or high blood pressure.",
      hi: "तनाव, शरीर में पानी की कमी (निर्जलीकरण), आंखों का तनाव, नींद की कमी, साइनस या उच्च रक्तचाप।"
    },
    homeCare: {
      en: "Rest in a quiet, dark room. Drink water immediately. Massage the neck/temples gently, or apply a cool cloth over the forehead.",
      hi: "एक शांत, अंधेरे कमरे में आराम करें। तुरंत पानी पिएं। गर्दन/कनपटियों की हल्की मालिश करें, या माथे पर ठंडा कपड़ा रखें।"
    },
    prevention: {
      en: "Maintain regular sleep cycles, drink at least 8 glasses of water daily, reduce screen time, and manage stress.",
      hi: "सोने का नियमित चक्र बनाए रखें, रोजाना कम से कम 8 गिलास पानी पिएं, स्क्रीन टाइम कम करें और तनाव का प्रबंधन करें।"
    },
    warningSigns: {
      en: "Sudden, extremely severe headache ('thunderclap'), accompanied by fever, stiff neck, confusion, double vision, or weakness on one side of the body.",
      hi: "अचानक, अत्यधिक तेज सिरदर्द, जिसके साथ बुखार, गर्दन में अकड़न, भ्रम, दोहरी दृष्टि, या शरीर के एक तरफ कमजोरी हो।"
    },
    consult: {
      en: "Consult a doctor if headaches occur frequently (more than twice a week), worsen over time, or follow a head injury.",
      hi: "यदि सिरदर्द अक्सर (सप्ताह में दो बार से अधिक) होता है, समय के साथ बदतर हो जाता है, या सिर की चोट के बाद शुरू होता है तो डॉक्टर से मिलें।"
    }
  },
  {
    id: "cough",
    title: { en: "Cough", hi: "खांसी" },
    category: "Respiratory",
    overview: {
      en: "A reflex action to clear breathing passages of irritants, mucus, or foreign particles. It can be dry or productive (wet with mucus).",
      hi: "चिड़चिड़ाहट पैदा करने वाले कणों, बलगम या बाहरी कणों से श्वसन मार्ग को साफ करने की एक अनैच्छिक क्रिया। यह सूखी या बलगम वाली हो सकती है।"
    },
    causes: {
      en: "Common cold, flu, bronchitis, asthma, allergies, tuberculosis (TB), or exposure to smoke.",
      hi: "सामान्य सर्दी, फ्लू, ब्रोंकाइटिस, अस्थमा, एलर्जी, तपेदिक (टीबी) या धुएं का सामना करना।"
    },
    homeCare: {
      en: "Drink warm liquids like herbal tea or warm water with honey (for ages > 1 year). Inhale steam and gargle with warm salt water.",
      hi: "गर्म तरल पदार्थ जैसे काढ़ा या शहद के साथ गुनगुना पानी पिएं (1 वर्ष से अधिक आयु के लिए)। भाप लें और गर्म नमक वाले पानी से गरारे करें।"
    },
    prevention: {
      en: "Avoid smoking and secondhand smoke. Wash hands often, and cover your mouth when coughing.",
      hi: "धूम्रपान और उसके धुएं से बचें। बार-बार हाथ धोएं, और खांसते समय अपना मुंह ढकें।"
    },
    warningSigns: {
      en: "Coughing up blood, difficulty breathing, chest pain, wheezing, or a high fever that lasts multiple days.",
      hi: "खांसते समय खून आना, सांस लेने में कठिनाई, छाती में दर्द, सांस लेते समय आवाज आना, या कई दिनों तक रहने वाला तेज बुखार।"
    },
    consult: {
      en: "Consult a health worker if the cough lasts longer than 3 weeks (crucial to check for Tuberculosis) or is accompanied by chest pain.",
      hi: "यदि खांसी 3 सप्ताह से अधिक समय तक रहती है (तपेदिक की जांच के लिए महत्वपूर्ण) या सीने में दर्द होता है, तो स्वास्थ्य कार्यकर्ता से मिलें।"
    }
  },
  {
    id: "vomiting",
    title: { en: "Vomiting", hi: "उल्टी" },
    category: "Digestive",
    overview: {
      en: "The forceful emptying of stomach contents through the mouth. It is a symptom of an underlying issue, not a disease itself.",
      hi: "मुंह के रास्ते पेट की सामग्री का जबरन बाहर निकलना। यह एक अंतर्निहित समस्या का लक्षण है, खुद कोई बीमारी नहीं है।"
    },
    causes: {
      en: "Food poisoning, stomach infections (gastroenteritis), motion sickness, overeating, or pregnancy.",
      hi: "फूड पॉइजनिंग, पेट का संक्रमण (गैस्ट्रोएंटेराइटिस), सफर में जी मिचलाना, अत्यधिक खाना, या गर्भावस्था।"
    },
    homeCare: {
      en: "Do not eat solid foods for a few hours. Sip small amounts of clean water or ORS frequently to avoid dehydration. Resume bland foods slowly.",
      hi: "कुछ घंटों तक ठोस भोजन न करें। निर्जलीकरण से बचने के लिए थोड़ी-थोड़ी मात्रा में साफ पानी या ओआरएस घोल पिएं। धीरे-धीरे नरम भोजन शुरू करें।"
    },
    prevention: {
      en: "Eat freshly cooked food, wash hands before eating, and avoid unhygienic street foods.",
      hi: "ताजा पका हुआ भोजन खाएं, खाने से पहले हाथ धोएं, और अस्वच्छ स्ट्रीट फूड से बचें।"
    },
    warningSigns: {
      en: "Inability to keep fluids down for 24 hours, blood in vomit (looks like dark coffee grounds), severe abdominal pain, or stiff neck.",
      hi: "24 घंटे तक किसी भी तरल पदार्थ का पेट में न रुकना, उल्टी में खून आना (काले कॉफी के मैदान जैसा दिखता है), गंभीर पेट दर्द, या गर्दन में अकड़न।"
    },
    consult: {
      en: "Consult a doctor if vomiting persists beyond 24 hours, or if signs of severe dehydration develop (extreme thirst, dry mouth, sunken eyes).",
      hi: "यदि उल्टी 24 घंटे से अधिक समय तक जारी रहती है, या यदि गंभीर निर्जलीकरण के लक्षण (अत्यधिक प्यास, मुंह सूखना, धंसी आंखें) विकसित होते हैं तो डॉक्टर से मिलें।"
    }
  },
  {
    id: "diarrhea",
    title: { en: "Diarrhea", hi: "दस्त (लूज मोशन)" },
    category: "Digestive",
    overview: {
      en: "Passing loose, watery stools three or more times a day. It drains water and essential salts rapidly, leading to dehydration.",
      hi: "दिन में तीन या अधिक बार ढीला, पानी जैसा मल आना। यह शरीर से पानी और आवश्यक लवणों को तेजी से बाहर निकालता है, जिससे डिहाइड्रेशन होता है।"
    },
    causes: {
      en: "Bacterial or viral stomach infections, contaminated water, poor hand hygiene, or food intolerance.",
      hi: "जीवाणु या वायरल पेट के संक्रमण, दूषित पानी, हाथों की खराब स्वच्छता, या भोजन की संवेदनशीलता।"
    },
    homeCare: {
      en: "Drink Oral Rehydration Salts (ORS) dissolved in boiled, cooled water. Continue breastfeeding infants. Eat soft foods like khichdi and bananas.",
      hi: "उबले और ठंडे किए गए पानी में ओरल रीहाइड्रेशन साल्ट्स (ORS) घोलकर पिएं। शिशुओं को स्तनपान जारी रखें। खिचड़ी और केला जैसे नरम भोजन लें।"
    },
    prevention: {
      en: "Drink boiled or filtered clean water. Wash hands with soap after using toilets. Keep food covered from flies.",
      hi: "उबला या छना हुआ साफ पानी पिएं। शौचालय के उपयोग के बाद साबुन से हाथ धोएं। भोजन को मक्खियों से ढक कर रखें।"
    },
    warningSigns: {
      en: "Bloody or black stools, high fever, severe abdominal pain, or signs of severe dehydration (lack of urination, sunken eyes, no tears).",
      hi: "मल में खून या काला मल आना, तेज बुखार, पेट में तेज दर्द, या गंभीर निर्जलीकरण के लक्षण (पेशाब न आना, धंसी हुई आंखें, आंसू न आना)।"
    },
    consult: {
      en: "Consult a health worker if diarrhea lasts more than 2 days, or immediately if an infant or young child is affected and shows extreme weakness.",
      hi: "यदि दस्त 2 दिनों से अधिक समय तक रहता है, या तुरंत यदि कोई शिशु या छोटा बच्चा प्रभावित है और अत्यधिक कमजोरी दिखाता है।"
    }
  },
  {
    id: "dehydration",
    title: { en: "Dehydration", hi: "निर्जलीकरण (पानी की कमी)" },
    category: "General",
    overview: {
      en: "A dangerous condition where the body loses more fluids and salts than it takes in, disrupting vital organ functions.",
      hi: "एक खतरनाक स्थिति जहां शरीर जितना पानी लेता है उससे अधिक खो देता है, जिससे महत्वपूर्ण अंगों के कामकाज में बाधा आती है।"
    },
    causes: {
      en: "Severe diarrhea, persistent vomiting, excessive sweating in hot weather, or not drinking enough clean water.",
      hi: "गंभीर दस्त, लगातार उल्टी, गर्म मौसम में अत्यधिक पसीना आना, या पर्याप्त साफ पानी न पीना।"
    },
    homeCare: {
      en: "Drink ORS solution, coconut water, or buttermilk. Take small, frequent sips rather than large gulps, which can cause vomiting.",
      hi: "ओआरएस (ORS) घोल, नारियल पानी या छाछ पिएं। बड़े घूंट के बजाय बार-बार छोटे घूंट लें, जिससे उल्टी नहीं होगी।"
    },
    prevention: {
      en: "Drink fluids throughout the day, especially in hot weather or during physical labor. Carry a water bottle when travelling.",
      hi: "दिन भर तरल पदार्थ पिएं, खासकर गर्म मौसम में या शारीरिक श्रम के दौरान। यात्रा करते समय पानी की बोतल साथ रखें।"
    },
    warningSigns: {
      en: "Extreme thirst, dry mouth, no urine output for 8+ hours (or dark yellow urine), sunken eyes, dizziness, or confusion.",
      hi: "अत्यधिक प्यास, मुंह सूखना, 8+ घंटे तक पेशाब न आना (या गहरा पीला पेशाब), चक्कर आना या भ्रम होना।"
    },
    consult: {
      en: "Seek emergency medical help if a person is confused, lethargic, or unable to swallow fluids, as intravenous (IV) fluids may be required.",
      hi: "यदि कोई व्यक्ति भ्रमित, सुस्त या तरल पदार्थ निगलने में असमर्थ है तो तुरंत आपातकालीन चिकित्सा सहायता लें, क्योंकि नसों में (IV) ड्रिप लगाने की आवश्यकता हो सकती है।"
    }
  },
  {
    id: "heatstroke_sym",
    title: { en: "Heat Stroke Signs", hi: "लू (हीट स्ट्रोक) के लक्षण" },
    category: "Emergency",
    overview: {
      en: "The most severe form of heat injury, where the body's cooling system fails completely, raising internal temperature dangerously.",
      hi: "गर्मी के कारण होने वाली सबसे गंभीर चोट, जहां शरीर की शीतलन प्रणाली पूरी तरह विफल हो जाती है, जिससे तापमान खतरनाक रूप से बढ़ जाता है।"
    },
    causes: {
      en: "Prolonged exposure to hot environments or hard physical work under direct summer sun without adequate shade and hydration.",
      hi: "गर्म वातावरण में लंबे समय तक रहने या गर्मियों की सीधी धूप में बिना पर्याप्त छाया और पानी के कठिन शारीरिक परिश्रम करने से।"
    },
    homeCare: {
      en: "Move the person to a cool, shaded area. Loosen clothing. Apply cool, wet cloths over their body and fan them vigorously. Do not give fluids if unconscious.",
      hi: "व्यक्ति को ठंडी, छायादार जगह पर ले जाएं। कपड़े ढीले करें। उनके शरीर पर गीला, ठंडा कपड़ा लगाएं और तेजी से हवा करें। बेहोश होने पर पानी न दें।"
    },
    prevention: {
      en: "Avoid direct sun between 12 PM and 3 PM. Drink plenty of water and buttermilk. Wear loose, light cotton clothing.",
      hi: "दोपहर 12 से 3 बजे के बीच सीधी धूप से बचें। खूब पानी और छाछ पिएं। ढीले, हल्के सूती कपड़े पहनें।"
    },
    warningSigns: {
      en: "High body temperature (104°F+), hot and dry red skin (lack of sweat), rapid heartbeat, confusion, slurred speech, or seizures.",
      hi: "शरीर का उच्च तापमान (104°F+), गर्म और सूखी लाल त्वचा (पसीना न आना), तेज धड़कन, भ्रम, लड़खड़ाती आवाज, या दौरे पड़ना।"
    },
    consult: {
      en: "Heat stroke is a medical emergency. Call 108 ambulance immediately. Rapid cooling is life-saving.",
      hi: "हीट स्ट्रोक एक मेडिकल इमरजेंसी है। तुरंत 108 एम्बुलेंस को कॉल करें। शरीर को जल्दी ठंडा करना ही जान बचा सकता है।"
    }
  },
  {
    id: "burns_sym",
    title: { en: "Burns", hi: "जलना (Burns)" },
    category: "Emergency",
    overview: {
      en: "Damage to the skin tissue caused by heat, hot liquids, steam, electricity, or chemicals. Proper first aid stops tissue damage.",
      hi: "गर्मी, गर्म तरल पदार्थ, भाप, बिजली या रसायनों के कारण त्वचा के ऊतकों को होने वाली क्षति। उचित प्राथमिक उपचार ऊतकों की क्षति को रोकता है।"
    },
    causes: {
      en: "Accidents with hot kitchen oil, hot water, open wood stoves, firecrackers, or electrical short circuits.",
      hi: "रसोई के गर्म तेल, गर्म पानी, खुले चूल्हे, पटाखों या बिजली के शॉर्ट सर्किट से होने वाली दुर्घटनाएं।"
    },
    homeCare: {
      en: "Pour cool, running tap water over the burn for 10-15 minutes immediately. Cover gently with a clean, dry, non-stick cloth.",
      hi: "जलने पर तुरंत 10-15 मिनट के लिए बहता हुआ ठंडा पानी डालें। एक साफ, सूखे और न चिपकने वाले कपड़े से हल्के से ढकें।"
    },
    prevention: {
      en: "Keep children away from stoves and hot liquids. Store matches and chemicals safely. Use insulated handles for hot pans.",
      hi: "बच्चों को चूल्हे और गर्म तरल पदार्थों से दूर रखें। माचिस और रसायनों को सुरक्षित रखें। गर्म बर्तनों के लिए इंसुलेटेड हैंडल का प्रयोग करें।"
    },
    warningSigns: {
      en: "Large blisters, skin that looks charred (black) or white, burns covering the face, hands, or joints, or chemical/electrical burns.",
      hi: "बड़े छाले पड़ना, त्वचा का झुलसा हुआ (काला) या सफेद दिखना, चेहरे, हाथों या जोड़ों का जलना, या रासायनिक/बिजली से जलना।"
    },
    consult: {
      en: "Seek immediate emergency hospital care for second-degree (blistering) or third-degree (charred) burns. Never pop blisters.",
      hi: "दूसरी डिग्री (छाले) या तीसरी डिग्री (झुलसी त्वचा) के जलने पर तुरंत अस्पताल में आपातकालीन उपचार लें। छालों को कभी न फोड़ें।"
    }
  },
  {
    id: "cuts_sym",
    title: { en: "Cuts & Scrapes", hi: "कट और खरोंच" },
    category: "Emergency",
    overview: {
      en: "A break or opening in the skin layer. Most minor cuts heal well with basic cleaning, while deep cuts need stitching.",
      hi: "त्वचा की परत में होने वाला कट या घाव। अधिकांश मामूली कट सामान्य सफाई से ठीक हो जाते हैं, जबकि गहरे कटों में टांके लगाने की आवश्यकता होती है।"
    },
    causes: {
      en: "Accidents with kitchen knives, rusted farming tools, broken glass, or falls on rough roads.",
      hi: "रसोई के चाकू, जंग लगे खेती के औजारों, टूटे कांच, या उबड़-खाबड़ सड़कों पर गिरने से होने वाली दुर्घटनाएं।"
    },
    homeCare: {
      en: "Wash the cut with soap and clean water. Apply firm pressure with a clean cloth to stop bleeding, apply antiseptic cream, and cover with a sterile bandage.",
      hi: "कटने वाली जगह को साबुन और साफ पानी से धोएं। खून रोकने के लिए साफ कपड़े से दबाव डालें, एंटीसेप्टिक क्रीम लगाएं और साफ पट्टी से ढकें।"
    },
    prevention: {
      en: "Keep sharp knives and rusted agricultural implements locked. Use safety gloves when gardening or farming.",
      hi: "तेज चाकू और जंग लगे कृषि उपकरणों को बंद करके रखें। बागवानी या खेती करते समय सुरक्षात्मक दस्ताने पहनें।"
    },
    warningSigns: {
      en: "Deep wound showing muscle or fat, bleeding that does not stop after 10 minutes of direct pressure, or signs of infection (redness, pus).",
      hi: "गहरा घाव जिसमें मांसपेशी या वसा दिख रही हो, 10 मिनट के दबाव के बाद भी खून का न रुकना, या संक्रमण के लक्षण (लालिमा, मवाद)।"
    },
    consult: {
      en: "Go to a doctor if the wound is dirty/rusty to receive a Tetanus injection, or if the cut is deep and needs stitches.",
      hi: "यदि घाव गंदा/जंग लगा हो तो टेटनस (Tetanus) का इंजेक्शन लगवाने के लिए डॉक्टर के पास जाएं, या यदि कट गहरा हो और टांके की आवश्यकता हो।"
    }
  },
  {
    id: "snakebite_sym",
    title: { en: "Snake Bite Signs", hi: "सांप के काटने के लक्षण" },
    category: "Emergency",
    overview: {
      en: "Bites from venomous snakes are critical emergencies. Quick action, keeping the limb still, and anti-venom save lives.",
      hi: "जहरीले सांपों का काटना एक अत्यंत गंभीर आपातकालीन स्थिति है। त्वरित कार्रवाई, अंग को स्थिर रखना और एंटी-वेनम ही जान बचाते हैं।"
    },
    causes: {
      en: "Accidental encounters with snakes while walking in tall grass, farming without footwear, or sleeping on the floor in rural areas during monsoon.",
      hi: "मानसून के दौरान ग्रामीण क्षेत्रों में लंबी घास में टहलते समय, बिना जूते पहने खेती करते समय या फर्श पर सोते समय सांपों से सामना होना।"
    },
    homeCare: {
      en: "Keep the victim calm. Remove rings or tight clothing near the bite. Immobilize the limb using a splint or bandage. Do not cut or apply ice.",
      hi: "पीड़ित को शांत रखें। काटने की जगह के पास की अंगूठी या तंग कपड़े हटा दें। पट्टी या खपच्ची का उपयोग करके अंग को स्थिर रखें। कट न लगाएं या बर्फ न लगाएं।"
    },
    prevention: {
      en: "Wear high boots when farming. Use a flashlight when walking outdoors at night. Sleep on elevated beds (charpai) and use mosquito nets.",
      hi: "खेती करते समय ऊंचे जूते पहनें। रात में बाहर टहलते समय टॉर्च का प्रयोग करें। चारपाई पर सोएं और मच्छरदानी का उपयोग करें।"
    },
    warningSigns: {
      en: "Two puncture fang marks, rapid swelling and discoloration, severe pain, difficulty breathing, slurred speech, or paralysis.",
      hi: "सांप के दो दांतों के निशान, तेजी से सूजन आना और रंग बदलना, तेज दर्द, सांस लेने में कठिनाई, लड़खड़ाती आवाज या पक्षाघात (लकवा)।"
    },
    consult: {
      en: "All snake bites must be treated as venomous. Rush immediately to the nearest government hospital that stocks Anti-Snake Venom (ASV).",
      hi: "सभी सांप के काटने को जहरीला माना जाना चाहिए। तुरंत निकटतम सरकारी अस्पताल जाएं जहां एंटी-स्नेक वेनम (ASV) उपलब्ध हो।"
    }
  },
  {
    id: "insectbite_sym",
    title: { en: "Insect Bites & Stings", hi: "कीड़े का काटना और डंक मारना" },
    category: "General",
    overview: {
      en: "Bites from bees, wasps, scorpions, or spiders. Most cause minor local pain, but some scorpions or severe allergies require medical care.",
      hi: "मधुमक्खी, ततैया, बिच्छू या मकड़ियों का काटना। अधिकांश में मामूली स्थानीय दर्द होता है, लेकिन कुछ बिच्छुओं या गंभीर एलर्जी में तत्काल उपचार की आवश्यकता होती है।"
    },
    causes: {
      en: "Accidental contact with hives, cleaning old wood heaps, or handling agricultural crops.",
      hi: "छत्तों के साथ आकस्मिक संपर्क, पुरानी लकड़ियों के ढेरों की सफाई, या कृषि फसलों की कटाई के दौरान।"
    },
    homeCare: {
      en: "Scrape off the stinger if visible using a flat card. Wash with soap and water. Apply an ice pack wrapped in a cloth to reduce swelling.",
      hi: "यदि डंक दिख रहा हो तो समतल कार्ड का उपयोग करके खुरच कर निकालें। साबुन और पानी से धोएं। सूजन कम करने के लिए कपड़े में लपेटकर बर्फ लगाएं।"
    },
    prevention: {
      en: "Avoid disturbing bee or wasp nests. Wear protective clothing when cleaning old storerooms or clearing weeds.",
      hi: "मधुमक्खी या ततैया के छत्तों को न छुएं। पुराने स्टोररूम की सफाई करते समय या घास-फूस साफ करते समय सुरक्षात्मक कपड़े पहनें।"
    },
    warningSigns: {
      en: "Difficulty breathing, swelling of the face, throat, or tongue, dizziness, hives all over the body, or severe scorpion bite pain.",
      hi: "सांस लेने में कठिनाई, चेहरे, गले या जीभ पर सूजन आना, चक्कर आना, पूरे शरीर पर चकत्ते होना, या बिच्छू के काटने का असहनीय दर्द।"
    },
    consult: {
      en: "Seek emergency medical care immediately for severe allergic reactions (anaphylaxis) or scorpion stings, especially in children.",
      hi: "विशेष रूप से बच्चों में गंभीर एलर्जी प्रतिक्रिया (एनाफिलेक्सिस) या बिच्छू के डंक मारने पर तुरंत आपातकालीन चिकित्सा सहायता लें।"
    }
  }
];

export const firstAidGuides = [
  {
    id: "burns",
    title: { en: "Burns Treatment", hi: "जलने का प्राथमिक उपचार" },
    overview: { en: "Immediate care for heat or hot liquid burns to prevent deeper tissue injury.", hi: "गर्म तरल पदार्थ या आग से जलने पर गहरी क्षति को रोकने के लिए तत्काल देखभाल।" },
    steps: {
      en: [
        "Cool immediately under cool, running tap water for 10-15 minutes. Do not use ice water.",
        "Remove rings, bangles, or tight clothing gently before the area starts to swell.",
        "Cover the burn loosely with a clean, dry, sterile gauze bandage or clean cotton cloth.",
        "Manage pain using simple paracetamol under medical guidance."
      ],
      hi: [
        "तुरंत 10-15 मिनट के लिए नल के ठंडे बहते पानी के नीचे रखें। बर्फ के पानी का प्रयोग न करें।",
        "सूजन शुरू होने से पहले प्रभावित क्षेत्र के पास की अंगूठी, चूड़ी या तंग कपड़े धीरे से हटा दें।",
        "जले हुए हिस्से को साफ, सूखे, गैर-चिपकने वाले सूती कपड़े या साफ पट्टी से हल्के से ढकें।",
        "चिकित्सकीय सलाह के अनुसार दर्द को नियंत्रित करने के लिए पैरासिटामोल का उपयोग करें।"
      ]
    },
    whatNotToDo: {
      en: "Do NOT apply toothpaste, butter, oils, or turmeric on the burn. Do NOT pop blisters, as this breaks the skin barrier and causes severe infections.",
      hi: "जलने पर टूथपेस्ट, मक्खन, तेल या हल्दी न लगाएं। छालों को न फोड़ें, क्योंकि इससे त्वचा की सुरक्षात्मक परत टूट जाती है और गंभीर संक्रमण होता है।"
    },
    emergencyTips: {
      en: "For electrical or chemical burns, turn off the power source safely and wash with running water for 20 minutes before heading to the hospital.",
      hi: "बिजली या रासायनिक जलन के लिए, सुरक्षापूर्वक बिजली बंद करें और अस्पताल जाने से पहले 20 मिनट के लिए बहते पानी से धोएं।"
    },
    whenToCall108: {
      en: "Call 108 immediately if the burn covers the face, hands, feet, joints, or is a deep third-degree burn (skin looks white or charred black).",
      hi: "यदि जलन चेहरे, हाथों, पैरों, जोड़ों को कवर करती है, या गहरी तीसरी डिग्री की जलन है (त्वचा सफेद या झुलसी हुई काली दिखती है), तो तुरंत 108 को कॉल करें।"
    },
    mistakes: {
      en: "Applying ice directly (can cause tissue frostbite) or using dirty cloths to wrap the wound.",
      hi: "सीधे बर्फ लगाना (ऊतकों को नुकसान पहुंचा सकता है) या घाव को लपेटने के लिए गंदे कपड़ों का उपयोग करना।"
    }
  },
  {
    id: "cuts",
    title: { en: "Cuts & Bleeding", hi: "कटने और रक्तस्राव का उपचार" },
    overview: { en: "How to stop blood loss and clean open wounds to prevent infection.", hi: "रक्तस्राव को रोकने और संक्रमण से बचने के लिए खुले घावों को साफ करने का तरीका।" },
    steps: {
      en: [
        "Clean: Wash the wound gently under clean running water to remove dirt.",
        "Press: Apply direct, firm pressure on the wound using a clean cloth or sterile gauze.",
        "Elevate: Raise the injured limb above heart level if possible to reduce blood flow.",
        "Cover: Apply antiseptic cream and secure with a clean bandage once bleeding stops."
      ],
      hi: [
        "सफाई: गंदगी हटाने के लिए घाव को साफ बहते पानी के नीचे धीरे से धोएं।",
        "दबाव: साफ कपड़े या साफ पट्टी का उपयोग करके घाव पर सीधे, दृढ़ता से दबाव डालें।",
        "ऊंचाई: रक्त प्रवाह को कम करने के लिए यदि संभव हो तो घायल अंग को हृदय के स्तर से ऊपर उठाएं।",
        "पट्टी: रक्तस्राव रुकने पर एंटीसेप्टिक क्रीम लगाएं और साफ पट्टी से सुरक्षित करें।"
      ]
    },
    whatNotToDo: {
      en: "Do NOT apply dirt, cow dung, or raw coffee powder to stop bleeding, as this introduces deadly tetanus bacteria. Do NOT remove a deeply embedded object yourself.",
      hi: "खून बहना रोकने के लिए मिट्टी, गाय का गोबर या कच्चा कॉफी पाउडर न लगाएं, क्योंकि इससे घातक टेटनस बैक्टीरिया फैलते हैं। गहरे फंसे हुए वस्तु को खुद न निकालें।"
    },
    emergencyTips: {
      en: "If blood spurts or leaks rapidly, maintain constant direct pressure and do not lift the cloth to check if it has stopped.",
      hi: "यदि खून तेजी से बह रहा है, तो लगातार सीधा दबाव बनाए रखें और यह जांचने के लिए कपड़े को न उठाएं कि यह रुका है या नहीं।"
    },
    whenToCall108: {
      en: "Call 108 if the bleeding does not stop after 10 minutes of direct pressure, if the cut is deep and gaping, or if the victim feels dizzy or faints.",
      hi: "यदि 10 मिनट के सीधे दबाव के बाद भी रक्तस्राव नहीं रुकता है, यदि घाव गहरा और खुला हुआ है, या यदि पीड़ित को चक्कर आता है या बेहोश हो जाता है, तो 108 को कॉल करें।"
    },
    mistakes: {
      en: "Loosening pressure too early or applying tight ropes (tourniquets) incorrectly, which can cut off blood circulation completely and damage the limb.",
      hi: "दबाव को बहुत जल्दी छोड़ देना या रस्सी (टूर्निकेट) को गलत तरीके से बांधना, जिससे रक्त परिसंचरण पूरी तरह से बंद हो सकता है और अंग को नुकसान हो सकता है।"
    }
  },
  {
    id: "fainting",
    title: { en: "Fainting Care", hi: "बेहोश होने पर प्राथमिक उपचार" },
    overview: { en: "Immediate recovery steps for a temporary loss of consciousness due to low blood flow to the brain.", hi: "मस्तिष्क में रक्त प्रवाह कम होने से अस्थायी रूप से बेहोश होने पर तत्काल रिकवरी के उपाय।" },
    steps: {
      en: [
        "Lay the person flat on their back in a cool, well-ventilated spot.",
        "Elevate their feet 12 inches (30 cm) above heart level to restore blood flow to the head.",
        "Loosen collar, belts, or any tight clothing around the neck.",
        "Check breathing; if unconscious but breathing, turn them onto their side (recovery position)."
      ],
      hi: [
        "व्यक्ति को किसी ठंडे, हवादार स्थान पर पीठ के बल सीधा लेटाएं।",
        "सिर में रक्त प्रवाह को बहाल करने के लिए उनके पैरों को हृदय के स्तर से 12 इंच (30 सेमी) ऊपर उठाएं।",
        "कॉलर, बेल्ट या गर्दन के आसपास के किसी भी तंग कपड़े को ढीला करें।",
        "सांस की जांच करें; यदि बेहोश है लेकिन सांस ले रहा है, तो उन्हें करवट दिलाकर लेटाएं (रिकवरी स्थिति)।"
      ]
    },
    whatNotToDo: {
      en: "Do NOT give the person water, food, or medicines while they are unconscious, as they can choke. Do NOT throw cold water on their face or slap them to wake up.",
      hi: "बेहोश होने पर व्यक्ति को पानी, भोजन या दवा न दें, क्योंकि वे चोक हो सकते हैं (दम घुट सकता है)। उनके चेहरे पर ठंडा पानी न फेंकें या होश में लाने के लिए थप्पड़ न मारें।"
    },
    emergencyTips: {
      en: "If the person fainted due to extreme heat, sponge their body with cool water and move them into air-conditioning or shade.",
      hi: "यदि व्यक्ति अत्यधिक गर्मी के कारण बेहोश हुआ है, तो उनके शरीर को ठंडे पानी से पोंछें और उन्हें छाया या ठंडी जगह पर ले जाएं।"
    },
    whenToCall108: {
      en: "Call 108 if the person does not regain consciousness within 1 minute, has difficulty breathing, is pregnant, or has a known heart condition.",
      hi: "यदि व्यक्ति 1 मिनट के भीतर होश में नहीं आता है, सांस लेने में कठिनाई होती है, गर्भवती है, या हृदय रोग से पीड़ित है, तो तुरंत 108 को कॉल करें।"
    },
    mistakes: {
      en: "Trying to stand the person up too quickly after they wake up, which can cause them to faint again.",
      hi: "होश में आने के बाद व्यक्ति को बहुत जल्दी खड़ा करने का प्रयास करना, जिससे वे दोबारा बेहोश हो सकते हैं।"
    }
  },
  {
    id: "snakebite",
    title: { en: "Snake Bite Response", hi: "सांप के काटने पर प्रतिक्रिया" },
    overview: { en: "Critical steps to slow venom spread and ensure rapid anti-venom treatment.", hi: "जहर फैलने की गति को धीमा करने और त्वरित एंटी-वेनम उपचार सुनिश्चित करने के लिए महत्वपूर्ण कदम।" },
    steps: {
      en: [
        "Keep the patient completely still and calm. Movement speeds up venom circulation.",
        "Immobilize the bitten limb using a splint or bandage. Keep it below heart level.",
        "Remove rings, watches, or tight clothing near the bite, as rapid swelling will occur.",
        "Note the time of the bite and rush immediately to the nearest government hospital."
      ],
      hi: [
        "पीड़ित को पूरी तरह से स्थिर और शांत रखें। चलने-फिरने से जहर तेजी से फैलता है।",
        "पट्टी या खपच्ची का उपयोग करके काटे गए अंग को पूरी तरह स्थिर करें। इसे हृदय के स्तर से नीचे रखें।",
        "काटने की जगह के पास की अंगूठी, घड़ी या तंग कपड़े हटा दें, क्योंकि वहां तेजी से सूजन आएगी।",
        "काटने का समय नोट करें और तुरंत निकटतम सरकारी अस्पताल के लिए रवाना हों।"
      ]
    },
    whatNotToDo: {
      en: "Do NOT cut the wound. Do NOT try to suck out venom. Do NOT apply ice or tight ropes (tourniquets) that completely block blood supply, which can cause amputation.",
      hi: "घाव पर कट न लगाएं। मुंह से जहर चूसने का प्रयास न करें। बर्फ न लगाएं या तंग रस्सी (टूर्निकेट) न बांधें जो खून की आपूर्ति को पूरी तरह से रोक दे, जिससे अंग काटना पड़ सकता है।"
    },
    emergencyTips: {
      en: "Try to remember the color and shape of the snake to describe it to the doctor, but do NOT try to catch or kill it.",
      hi: "डॉक्टर को बताने के लिए सांप के रंग और आकार को याद रखने का प्रयास करें, लेकिन उसे पकड़ने या मारने का प्रयास न करें।"
    },
    whenToCall108: {
      en: "Call 108 and rush to the hospital immediately for all snake bites. Do not wait for symptoms to appear before seeking help.",
      hi: "सभी सांप के काटने के मामलों में तुरंत 108 को कॉल करें और अस्पताल भागें। सहायता लेने से पहले लक्षणों के प्रकट होने की प्रतीक्षा न करें।"
    },
    mistakes: {
      en: "Wasting time going to traditional healers (tantriks/local magicians) instead of a hospital stocking Anti-Snake Venom (ASV).",
      hi: "एंटी-स्नेक वेनम (ASV) वाले सरकारी अस्पताल जाने के बजाय पारंपरिक ओझा या तांत्रिक के पास जाकर समय बर्बाद करना।"
    }
  },
  {
    id: "choking",
    title: { en: "Choking (Heimlich)", hi: "दम घुटना (हीमलिच पैंतरा)" },
    overview: { en: "First aid for a blocked airway when a person cannot breathe or speak.", hi: "जब कोई व्यक्ति सांस न ले पा रहा हो या बोल न पा रहा हो, तो बंद श्वसन मार्ग को खोलने का उपाय।" },
    steps: {
      en: [
        "Ask: 'Are you choking?' If they can cough or speak, encourage them to cough hard.",
        "Give 5 firm back blows between the shoulder blades using the heel of your hand.",
        "Perform 5 abdominal thrusts (Heimlich maneuver): wrap arms around waist, make a fist, place it above belly button, and pull quickly inward and upward.",
        "Repeat cycle of 5 back blows and 5 abdominal thrusts until object is expelled."
      ],
      hi: [
        "पूछें: 'क्या आपका दम घुट रहा है?' यदि वे खांस या बोल सकते हैं, तो उन्हें जोर से खांसने के लिए प्रोत्साहित करें।",
        "अपनी हथेली के पिछले हिस्से का उपयोग करके कंधे की हड्डियों के बीच 5 बार थपथपाएं (Back blows)।",
        "5 पेट के संपीड़न (हीमलिच पैंतरा) करें: कमर के चारों ओर हाथ लपेटें, एक मुट्ठी बनाएं, उसे नाभि के ऊपर रखें, और तेजी से अंदर और ऊपर की ओर खींचें।",
        "जब तक वस्तु बाहर न निकल जाए, तब तक 5 बार पीठ थपथपाने और 5 बार पेट दबाने के चक्र को दोहराएं।"
      ]
    },
    whatNotToDo: {
      en: "Do NOT perform abdominal thrusts on infants under 1 year. Do NOT reach into the mouth to blind sweep with fingers, which can push the object deeper.",
      hi: "1 वर्ष से कम उम्र के शिशुओं पर पेट का संपीड़न (Abdominal thrusts) न करें। मुंह में उंगली डालकर बिना देखे वस्तु निकालने का प्रयास न करें, इससे वह और अंदर जा सकती है।"
    },
    emergencyTips: {
      en: "For choking infants: lay them facedown on your forearm, support the head, and give 5 gentle back slaps, followed by 5 chest thrusts with two fingers.",
      hi: "शिशुओं के दम घुटने पर: उन्हें अपनी अग्रबाहु (फोरआर्म) पर मुंह के बल लेटाएं, सिर को सहारा दें, और पीठ पर 5 बार थपथपाएं, फिर दो उंगलियों से छाती को 5 बार दबाएं।"
    },
    whenToCall108: {
      en: "Call 108 immediately if the choking person loses consciousness. Start CPR if they stop breathing.",
      hi: "यदि दम घुटने वाला व्यक्ति बेहोश हो जाता है, तो तुरंत 108 को कॉल करें। यदि वे सांस लेना बंद कर देते हैं, तो सीपीआर (CPR) शुरू करें।"
    },
    mistakes: {
      en: "Delaying abdominal thrusts when the airway is completely blocked (no air exchange, victim turning blue).",
      hi: "जब श्वसन मार्ग पूरी तरह से अवरुद्ध हो (हवा का आदान-प्रदान न होना, पीड़ित का नीला पड़ना) तो पेट दबाने में देरी करना।"
    }
  },
  {
    id: "accident",
    title: { en: "Road Accident Care", hi: "सड़क दुर्घटना प्राथमिक उपचार" },
    overview: { en: "Vital priorities to protect injured victims and manage trauma scene safely.", hi: "घायल पीड़ितों की सुरक्षा करने और दुर्घटना स्थल का सुरक्षित प्रबंधन करने के लिए महत्वपूर्ण कदम।" },
    steps: {
      en: [
        "Secure Scene: Ensure your safety first. Direct traffic away from the injured person.",
        "Check Response: Call out and check if the victim is awake and breathing.",
        "Control Bleeding: Apply direct pressure to any bleeding wounds with clean cloths.",
        "Stabilize Spine: Keep the neck and spine straight. Do not move the victim unless there is a fire hazard."
      ],
      hi: [
        "सुरक्षित क्षेत्र: पहले अपनी सुरक्षा सुनिश्चित करें। यातायात को घायल व्यक्ति से दूर निर्देशित करें।",
        "प्रतिक्रिया जांचें: आवाज दें और जांचें कि पीड़ित होश में है और सांस ले रहा है।",
        "रक्तस्राव नियंत्रण: बहते खून को रोकने के लिए किसी भी घाव पर साफ कपड़े से सीधा दबाव डालें।",
        "रीढ़ की हड्डी को स्थिर करें: गर्दन और रीढ़ को सीधा रखें। जब तक आग का खतरा न हो, पीड़ित को न हिलाएं।"
      ]
    },
    whatNotToDo: {
      en: "Do NOT remove a helmet from an unconscious victim unless they are not breathing, as it can worsen neck injuries. Do NOT pull limbs of suspected fractures.",
      hi: "बेहोश पीड़ित के सिर से हेलमेट न निकालें जब तक कि वे सांस न ले पा रहे हों, क्योंकि इससे गर्दन की चोट गंभीर हो सकती है। संदिग्ध फ्रैक्चर वाले अंगों को न खींचें।"
    },
    emergencyTips: {
      en: "If the victim is trapped inside a vehicle, check if they are responsive and call fire emergency services immediately.",
      hi: "यदि पीड़ित वाहन के अंदर फंसा हुआ है, तो जांचें कि वे प्रतिक्रिया दे रहे हैं या नहीं और तुरंत अग्निशमन/आपातकालीन सेवाओं को कॉल करें।"
    },
    whenToCall108: {
      en: "Call 108 ambulance immediately. Provide precise location details of the road accident.",
      hi: "तुरंत 108 एम्बुलेंस को कॉल करें। सड़क दुर्घटना के सटीक स्थान का विवरण प्रदान करें।"
    },
    mistakes: {
      en: "Moving the patient's neck or back unnecessarily, which can cause permanent spinal cord injury and paralysis.",
      hi: "रोगी की गर्दन या पीठ को अनावश्यक रूप से हिलाना, जिससे रीढ़ की हड्डी में स्थायी चोट और लकवा हो सकता है।"
    }
  },
  {
    id: "shock",
    title: { en: "Electric Shock Response", hi: "बिजली का झटका लगने पर प्राथमिक उपचार" },
    overview: { en: "Safety-first protocols to detach victims from active currents and manage burns.", hi: "पीड़ितों को बिजली के संपर्क से सुरक्षित रूप से अलग करने और प्राथमिक उपचार के नियम।" },
    steps: {
      en: [
        "Do NOT touch the victim directly if they are still in contact with the electrical source.",
        "Turn off power supply immediately (main switch / circuit breaker).",
        "If power cannot be cut, push the source away using dry wooden sticks or plastic broom handles.",
        "Check breathing once detached. If breathing is absent, start CPR immediately."
      ],
      hi: [
        "यदि पीड़ित अभी भी बिजली के स्रोत के संपर्क में है, तो उन्हें सीधे न छुएं।",
        "तुरंत बिजली की आपूर्ति बंद करें (मेन स्विच या सर्किट ब्रेकर)।",
        "यदि बिजली बंद नहीं की जा सकती, तो सूखे लकड़ी के डंडे या प्लास्टिक के हैंडल से स्रोत को दूर धकेलें।",
        "बिजली से अलग होने के बाद सांस की जांच करें। यदि सांस नहीं चल रही है, तो तुरंत सीपीआर (CPR) शुरू करें।"
      ]
    },
    whatNotToDo: {
      en: "Do NOT get near high voltage lines. Do NOT use wet objects or bare hands to rescue the victim, which will electrocute you as well.",
      hi: "हाई वोल्टेज लाइनों के पास न जाएं। पीड़ित को बचाने के लिए गीली वस्तुओं या नंगे हाथों का उपयोग न करें, इससे आपको भी बिजली का झटका लग सकता है।"
    },
    emergencyTips: {
      en: "All electric shock victims need clinical observation, as currents can cause invisible internal heart rhythm irregularities.",
      hi: "बिजली का झटका लगने वाले सभी पीड़ितों को डॉक्टर की देखरेख की आवश्यकता होती है, क्योंकि बिजली दिल की धड़कन में अदृश्य अनियमितता पैदा कर सकती है।"
    },
    whenToCall108: {
      en: "Call 108 immediately. Electric shock requires specialized trauma care.",
      hi: "तुरंत 108 को कॉल करें। बिजली के झटके के लिए विशेषज्ञ आघात देखभाल की आवश्यकता होती है।"
    },
    mistakes: {
      en: "Rushing to touch the victim without checking if the electrical current is still active.",
      hi: "यह जांचे बिना कि बिजली का प्रवाह अभी भी सक्रिय है या नहीं, पीड़ित को छूने के लिए दौड़ना।"
    }
  }
];

export const emergencyHelplines = [
  {
    id: "ambulance",
    number: "108",
    title: { en: "National Ambulance", hi: "राष्ट्रीय एम्बुलेंस" },
    desc: { en: "For medical emergencies, accidents, and urgent hospital transfers.", hi: "चिकित्सा आपातकाल, दुर्घटनाओं और तत्काल अस्पताल स्थानांतरण के लिए।" },
    badge: "Emergency"
  },
  {
    id: "national",
    number: "112",
    title: { en: "All-in-One Emergency", hi: "अखिल भारतीय आपातकालीन नंबर" },
    desc: { en: "Single emergency response number for police, fire, and ambulance services.", hi: "पुलिस, अग्निशमन और एम्बुलेंस सेवाओं के लिए एकल आपातकालीन प्रतिक्रिया नंबर।" },
    badge: "Emergency"
  },
  {
    id: "women",
    number: "1091",
    title: { en: "Women Helpline", hi: "महिला हेल्पलाइन" },
    desc: { en: "For women safety, medical distress, and legal assistance.", hi: "महिला सुरक्षा, चिकित्सा संकट और कानूनी सहायता के लिए।" },
    badge: "Safety"
  },
  {
    id: "child",
    number: "1098",
    title: { en: "Child Helpline", hi: "चाइल्ड हेल्पलाइन" },
    desc: { en: "Support services for children in distress, health safety, or abandonment.", hi: "संकटग्रस्त, स्वास्थ्य सुरक्षा या परित्यक्त बच्चों के लिए सहायता सेवाएं।" },
    badge: "Safety"
  },
  {
    id: "disaster",
    number: "1078",
    title: { en: "Disaster Management", hi: "आपदा प्रबंधन हेल्पलाइन" },
    desc: { en: "Helpline during floods, earthquakes, heatwaves, or natural hazards.", hi: "बाढ़, भूकंप, लू या प्राकृतिक आपदाओं के दौरान आपातकालीन हेल्पलाइन।" },
    badge: "Disaster"
  }
];

export const healthyHabits = [
  {
    id: "handwash",
    title: { en: "Hand Washing", hi: "हाथ धोना" },
    benefits: {
      en: "Prevents up to 50% of foodborne diarrheal illnesses and respiratory infections.",
      hi: "खाद्य जनित दस्त की बीमारियों और श्वसन संक्रमणों को 50% तक रोकता है।"
    },
    routine: {
      en: "Wash before preparing food, before eating, and immediately after toilet visits.",
      hi: "भोजन तैयार करने से पहले, खाने से पहले और शौचालय के उपयोग के तुरंत बाद हाथ धोएं।"
    },
    tips: {
      en: "Use soap and rub lather between fingers, backs of hands, and nails for 20 seconds.",
      hi: "साबुन का प्रयोग करें और उंगलियों के बीच, हाथों के पिछले हिस्से और नाखूनों को 20 सेकंड तक रगड़ें।"
    }
  },
  {
    id: "cleanwater",
    title: { en: "Clean Drinking Water", hi: "साफ पीने का पानी" },
    benefits: {
      en: "Eliminates risk of cholera, typhoid, dysentery, and intestinal parasites.",
      hi: "हैजा, टाइफाइड, पेचिश और आंतों के परजीवियों के खतरे को समाप्त करता है।"
    },
    routine: {
      en: "Drink at least 8 glasses of boiled, filtered, or chlorinated water daily.",
      hi: "रोजाना कम से कम 8 गिलास उबला, छना या क्लोरीनीकृत पानी पिएं।"
    },
    tips: {
      en: "Keep water storage vessels fully covered with lids. Never dip bare hands to draw water.",
      hi: "पानी के बर्तनों को हमेशा ढक्कन से ढक कर रखें। पानी निकालने के लिए नंगे हाथ कभी न डुबोएं।"
    }
  },
  {
    id: "nutrition",
    title: { en: "Balanced Nutrition", hi: "संतुलित पोषण" },
    benefits: {
      en: "Boosts immune defense, prevents anemia, and supports child cognitive growth.",
      hi: "प्रतिरक्षा प्रणाली को मजबूत करता है, एनीमिया रोकता है और बच्चों के मानसिक विकास का समर्थन करता है।"
    },
    routine: {
      en: "Eat three balanced meals rich in local seasonal vegetables, pulses, and dairy.",
      hi: "स्थानीय मौसमी सब्जियों, दालों और डेयरी से भरपूर तीन संतुलित भोजन लें।"
    },
    tips: {
      en: "Eat green leafy vegetables and lentils for iron. Avoid processed sugary snacks.",
      hi: "लोहे (आयरन) के लिए हरी पत्तेदार सब्जियां और दालें खाएं। मीठे डिब्बाबंद स्नैक्स से बचें।"
    }
  },
  {
    id: "exercise",
    title: { en: "Daily Exercise", hi: "दैनिक व्यायाम" },
    benefits: {
      en: "Lowers blood pressure, controls blood glucose, and improves heart health.",
      hi: "रक्तचाप (बीपी) को कम करता है, ब्लड शुगर को नियंत्रित करता है और हृदय स्वास्थ्य में सुधार करता है।"
    },
    routine: {
      en: "Walk briskly, cycle, or do physical labor for at least 30 minutes every day.",
      hi: "हर दिन कम से कम 30 मिनट तेज चलें, साइकिल चलाएं या शारीरिक श्रम करें।"
    },
    tips: {
      en: "Choose walking or stairs for short distances instead of motorbikes.",
      hi: "कम दूरी के लिए मोटरबाइक के बजाय पैदल चलने या सीढ़ियों का विकल्प चुनें।"
    }
  },
  {
    id: "sleep",
    title: { en: "Restful Sleep", hi: "गहरी नींद" },
    benefits: {
      en: "Allows cellular and brain repair, manages stress, and improves concentration.",
      hi: "कोशिकाओं और मस्तिष्क की मरम्मत की अनुमति देता है, तनाव प्रबंधित करता है और एकाग्रता में सुधार करता है।"
    },
    routine: {
      en: "Aim for 7 to 8 hours of uninterrupted sleep every night at regular times.",
      hi: "हर रात नियमित समय पर 7 से 8 घंटे की निर्बाध नींद लेने का लक्ष्य रखें।"
    },
    tips: {
      en: "Avoid screen usage or mobile phones for at least 30 minutes before bedtime.",
      hi: "सोने से कम से कम 30 मिनट पहले स्क्रीन या मोबाइल फोन का उपयोग करने से बचें।"
    }
  },
  {
    id: "vaccination",
    title: { en: "Immunization", hi: "नियमित टीकाकरण" },
    benefits: {
      en: "Protects children and mothers from deadly vaccine-preventable illnesses like polio and measles.",
      hi: "पोलियो और खसरा जैसी जानलेवा बीमारियों से बच्चों और माताओं की रक्षा करता है।"
    },
    routine: {
      en: "Follow national schedules for child immunizations from birth to booster doses.",
      hi: "जन्म से लेकर बूस्टर खुराक तक बच्चों के टीकाकरण के लिए राष्ट्रीय समय सारिणी का पालन करें।"
    },
    tips: {
      en: "Keep vaccination cards safe and consult local ASHA workers for missed updates.",
      hi: "टीकाकरण कार्ड को सुरक्षित रखें और छूटे हुए टीकों के लिए स्थानीय आशा कार्यकर्ता से संपर्क करें।"
    }
  },
  {
    id: "hygiene",
    title: { en: "Personal Hygiene", hi: "व्यक्तिगत स्वच्छता" },
    benefits: {
      en: "Prevents skin rashes, fungal infections, bad breath, and dental decay.",
      hi: "त्वचा पर चकत्ते, फंगल संक्रमण, मुंह की दुर्गंध और दांतों की सड़न को रोकता है।"
    },
    routine: {
      en: "Bathe daily with clean water, brush teeth twice, and cut nails weekly.",
      hi: "रोजाना साफ पानी से स्नान करें, दो बार ब्रश करें और साप्ताहिक रूप से नाखून काटें।"
    },
    tips: {
      en: "Wash and wear dry, sun-dried clean clothes every day.",
      hi: "रोजाना धुले और धूप में सुखाए गए साफ कपड़े पहनें।"
    }
  },
  {
    id: "wellness",
    title: { en: "Mental Wellness", hi: "मानसिक कल्याण" },
    benefits: {
      en: "Improves mood, builds stress resilience, and supports positive social relationships.",
      hi: "मूड में सुधार करता है, तनाव झेलने की क्षमता बढ़ाता है और सामाजिक संबंधों का समर्थन करता है।"
    },
    routine: {
      en: "Practice 5 minutes of quiet breathing. Discuss worries openly with friends or teachers.",
      hi: "5 मिनट शांत सांस लेने का अभ्यास करें। चिंताओं पर दोस्तों या शिक्षकों के साथ खुलकर चर्चा करें।"
    },
    tips: {
      en: "Take brief breaks from work. Focus on small daily achievements and keep a positive outlook.",
      hi: "काम से छोटे ब्रेक लें। छोटी दैनिक उपलब्धियों पर ध्यान केंद्रित करें और सकारात्मक दृष्टिकोण रखें।"
    }
  }
];

export default {
  symptoms,
  firstAidGuides,
  emergencyHelplines,
  healthyHabits
};
