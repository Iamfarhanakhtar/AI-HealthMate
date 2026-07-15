// Reusable Bilingual Quiz Dataset
// Expanded to 8 questions per category

export const quizCategories = [
  {
    "id": "general",
    "en": "General Healthcare",
    "hi": "सामान्य स्वास्थ्य",
    "icon": "Stethoscope"
  },
  {
    "id": "dengue",
    "en": "Dengue Awareness",
    "hi": "डेंगू जागरूकता",
    "icon": "ShieldAlert"
  },
  {
    "id": "malaria",
    "en": "Malaria Awareness",
    "hi": "मलेरिया जागरूकता",
    "icon": "ShieldAlert"
  },
  {
    "id": "nutrition",
    "en": "Diet & Nutrition",
    "hi": "आहार और पोषण",
    "icon": "Apple"
  },
  {
    "id": "vaccination",
    "en": "Vaccination & Immunization",
    "hi": "टीकाकरण और सुरक्षा",
    "icon": "ShieldCheck"
  },
  {
    "id": "cleanwater",
    "en": "Clean Water Habits",
    "hi": "साफ पानी की आदतें",
    "icon": "Droplet"
  },
  {
    "id": "sanitation",
    "en": "Sanitation & Waste Care",
    "hi": "स्वच्छता और कचरा प्रबंधन",
    "icon": "Trash2"
  },
  {
    "id": "firstaid",
    "en": "First Aid Basics",
    "hi": "प्राथमिक चिकित्सा",
    "icon": "Activity"
  },
  {
    "id": "mentalhealth",
    "en": "Mental Wellness",
    "hi": "मानसिक कल्याण",
    "icon": "Sparkles"
  },
  {
    "id": "lifestyle",
    "en": "Healthy Lifestyle",
    "hi": "स्वस्थ जीवन शैली",
    "icon": "CheckSquare"
  }
];

export const quizQuestions = {
  general: [
    {
      id: "general_q1", type: "single", difficulty: "easy", relatedTopic: "general",
      question: { en: "What is the most effective way to prevent stomach infections?", hi: "What is the most effective way to prevent stomach infections?" },
      options: { en: ["Antibiotics","Handwashing","Eating outside","Staying indoors"], hi: ["Antibiotics","Handwashing","Eating outside","Staying indoors"] },
      correct: 1, explanation: { en: "Handwashing kills germs.", hi: "Handwashing kills germs." }
    },
    {
      id: "general_q2", type: "boolean", difficulty: "easy", relatedTopic: "general",
      question: { en: "True or False: Hypertension always shows obvious symptoms.", hi: "True or False: Hypertension always shows obvious symptoms." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "It is often a silent killer.", hi: "It is often a silent killer." }
    },
    {
      id: "general_q3", type: "single", difficulty: "easy", relatedTopic: "general",
      question: { en: "Normal body temperature is:", hi: "Normal body temperature is:" },
      options: { en: ["37°C","40°C","35°C","39°C"], hi: ["37°C","40°C","35°C","39°C"] },
      correct: 0, explanation: { en: "37°C or 98.6°F is normal.", hi: "37°C or 98.6°F is normal." }
    },
    {
      id: "general_q4", type: "single", difficulty: "medium", relatedTopic: "general",
      question: { en: "Which organ produces insulin?", hi: "Which organ produces insulin?" },
      options: { en: ["Liver","Kidney","Pancreas","Stomach"], hi: ["Liver","Kidney","Pancreas","Stomach"] },
      correct: 2, explanation: { en: "Pancreas makes insulin.", hi: "Pancreas makes insulin." }
    },
    {
      id: "general_q5", type: "single", difficulty: "medium", relatedTopic: "general",
      question: { en: "Common sign of a heart attack?", hi: "Common sign of a heart attack?" },
      options: { en: ["Chest pain","Itchy skin","Runny nose","Knee pain"], hi: ["Chest pain","Itchy skin","Runny nose","Knee pain"] },
      correct: 0, explanation: { en: "Chest pain is a classic sign.", hi: "Chest pain is a classic sign." }
    },
    {
      id: "general_q6", type: "single", difficulty: "medium", relatedTopic: "general",
      question: { en: "Which vitamin is synthesized by sunlight?", hi: "Which vitamin is synthesized by sunlight?" },
      options: { en: ["Vit A","Vit B","Vit C","Vit D"], hi: ["Vit A","Vit B","Vit C","Vit D"] },
      correct: 3, explanation: { en: "Sunlight helps the skin produce Vit D.", hi: "Sunlight helps the skin produce Vit D." }
    },
    {
      id: "general_q7", type: "single", difficulty: "hard", relatedTopic: "general",
      question: { en: "What is a normal resting heart rate for adults?", hi: "What is a normal resting heart rate for adults?" },
      options: { en: ["30-40 bpm","60-100 bpm","120-140 bpm","150-180 bpm"], hi: ["30-40 bpm","60-100 bpm","120-140 bpm","150-180 bpm"] },
      correct: 1, explanation: { en: "60-100 bpm is normal for adults.", hi: "60-100 bpm is normal for adults." }
    },
    {
      id: "general_q8", type: "single", difficulty: "hard", relatedTopic: "general",
      question: { en: "Which fluid makes up most of the human body?", hi: "Which fluid makes up most of the human body?" },
      options: { en: ["Blood","Water","Lymph","Stomach acid"], hi: ["Blood","Water","Lymph","Stomach acid"] },
      correct: 1, explanation: { en: "Up to 60% of the body is water.", hi: "Up to 60% of the body is water." }
    }
  ],
  dengue: [
    {
      id: "dengue_q1", type: "single", difficulty: "easy", relatedTopic: "dengue",
      question: { en: "Which mosquito transmits Dengue?", hi: "Which mosquito transmits Dengue?" },
      options: { en: ["Anopheles","Culex","Aedes aegypti","Mansonia"], hi: ["Anopheles","Culex","Aedes aegypti","Mansonia"] },
      correct: 2, explanation: { en: "Aedes aegypti transmits dengue.", hi: "Aedes aegypti transmits dengue." }
    },
    {
      id: "dengue_q2", type: "boolean", difficulty: "easy", relatedTopic: "dengue",
      question: { en: "Dengue spreads person to person.", hi: "Dengue spreads person to person." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "Needs a mosquito bite.", hi: "Needs a mosquito bite." }
    },
    {
      id: "dengue_q3", type: "single", difficulty: "easy", relatedTopic: "dengue",
      question: { en: "When do dengue mosquitoes bite?", hi: "When do dengue mosquitoes bite?" },
      options: { en: ["Night only","Daytime","Winter only","When raining"], hi: ["Night only","Daytime","Winter only","When raining"] },
      correct: 1, explanation: { en: "Primarily daytime biters.", hi: "Primarily daytime biters." }
    },
    {
      id: "dengue_q4", type: "single", difficulty: "medium", relatedTopic: "dengue",
      question: { en: "Where do Aedes breed?", hi: "Where do Aedes breed?" },
      options: { en: ["Rivers","Clean stagnant water","Sewage","Sand"], hi: ["Rivers","Clean stagnant water","Sewage","Sand"] },
      correct: 1, explanation: { en: "They breed in clean, still water.", hi: "They breed in clean, still water." }
    },
    {
      id: "dengue_q5", type: "single", difficulty: "medium", relatedTopic: "dengue",
      question: { en: "Symptom of severe dengue?", hi: "Symptom of severe dengue?" },
      options: { en: ["Hair loss","Bleeding gums","Cough","Dry eyes"], hi: ["Hair loss","Bleeding gums","Cough","Dry eyes"] },
      correct: 1, explanation: { en: "Bleeding is a severe sign.", hi: "Bleeding is a severe sign." }
    },
    {
      id: "dengue_q6", type: "single", difficulty: "medium", relatedTopic: "dengue",
      question: { en: "How to prevent dengue breeding at home?", hi: "How to prevent dengue breeding at home?" },
      options: { en: ["Empty standing water containers","Plant more trees","Leave lights on","Keep doors open"], hi: ["Empty standing water containers","Plant more trees","Leave lights on","Keep doors open"] },
      correct: 0, explanation: { en: "Removing standing water stops breeding.", hi: "Removing standing water stops breeding." }
    },
    {
      id: "dengue_q7", type: "single", difficulty: "hard", relatedTopic: "dengue",
      question: { en: "Is there a specific medicine to cure dengue?", hi: "Is there a specific medicine to cure dengue?" },
      options: { en: ["Yes, antibiotics","No, only symptom management","Yes, antiviral pills","Yes, herbal tea"], hi: ["Yes, antibiotics","No, only symptom management","Yes, antiviral pills","Yes, herbal tea"] },
      correct: 1, explanation: { en: "Treatment focuses on symptoms like fever and dehydration.", hi: "Treatment focuses on symptoms like fever and dehydration." }
    },
    {
      id: "dengue_q8", type: "single", difficulty: "hard", relatedTopic: "dengue",
      question: { en: "Which blood component drops dangerously low in severe dengue?", hi: "Which blood component drops dangerously low in severe dengue?" },
      options: { en: ["Red blood cells","White blood cells","Platelets","Plasma"], hi: ["Red blood cells","White blood cells","Platelets","Plasma"] },
      correct: 2, explanation: { en: "Platelet drop is a key dengue complication.", hi: "Platelet drop is a key dengue complication." }
    }
  ],
  malaria: [
    {
      id: "malaria_q1", type: "single", difficulty: "easy", relatedTopic: "malaria",
      question: { en: "Primary symptom of Malaria?", hi: "Primary symptom of Malaria?" },
      options: { en: ["High fever & chills","Runny nose","Joint pain only","Skin peeling"], hi: ["High fever & chills","Runny nose","Joint pain only","Skin peeling"] },
      correct: 0, explanation: { en: "Fever and chills are classic.", hi: "Fever and chills are classic." }
    },
    {
      id: "malaria_q2", type: "single", difficulty: "easy", relatedTopic: "malaria",
      question: { en: "Which mosquito spreads Malaria?", hi: "Which mosquito spreads Malaria?" },
      options: { en: ["Aedes","Culex","Female Anopheles","Male Anopheles"], hi: ["Aedes","Culex","Female Anopheles","Male Anopheles"] },
      correct: 2, explanation: { en: "Infected female Anopheles spreads it.", hi: "Infected female Anopheles spreads it." }
    },
    {
      id: "malaria_q3", type: "boolean", difficulty: "easy", relatedTopic: "malaria",
      question: { en: "Bed nets reduce malaria risk.", hi: "Bed nets reduce malaria risk." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 0, explanation: { en: "Very effective prevention.", hi: "Very effective prevention." }
    },
    {
      id: "malaria_q4", type: "single", difficulty: "medium", relatedTopic: "malaria",
      question: { en: "Malaria is caused by a:", hi: "Malaria is caused by a:" },
      options: { en: ["Virus","Bacteria","Fungus","Parasite"], hi: ["Virus","Bacteria","Fungus","Parasite"] },
      correct: 3, explanation: { en: "Caused by Plasmodium parasite.", hi: "Caused by Plasmodium parasite." }
    },
    {
      id: "malaria_q5", type: "single", difficulty: "medium", relatedTopic: "malaria",
      question: { en: "When are Anopheles most active?", hi: "When are Anopheles most active?" },
      options: { en: ["Midday","Nighttime","Winter","Dry heat"], hi: ["Midday","Nighttime","Winter","Dry heat"] },
      correct: 1, explanation: { en: "Typically bite at night.", hi: "Typically bite at night." }
    },
    {
      id: "malaria_q6", type: "single", difficulty: "medium", relatedTopic: "malaria",
      question: { en: "Can malaria be cured?", hi: "Can malaria be cured?" },
      options: { en: ["No","Yes, with antimalarial drugs","Only with surgery","It cures itself"], hi: ["No","Yes, with antimalarial drugs","Only with surgery","It cures itself"] },
      correct: 1, explanation: { en: "Antimalarial drugs cure it if caught early.", hi: "Antimalarial drugs cure it if caught early." }
    },
    {
      id: "malaria_q7", type: "single", difficulty: "hard", relatedTopic: "malaria",
      question: { en: "Where does the malaria parasite multiply in humans?", hi: "Where does the malaria parasite multiply in humans?" },
      options: { en: ["Lungs","Brain","Liver and Red Blood Cells","Stomach"], hi: ["Lungs","Brain","Liver and Red Blood Cells","Stomach"] },
      correct: 2, explanation: { en: "It targets the liver and RBCs.", hi: "It targets the liver and RBCs." }
    },
    {
      id: "malaria_q8", type: "single", difficulty: "hard", relatedTopic: "malaria",
      question: { en: "Which environment favors malaria mosquitoes?", hi: "Which environment favors malaria mosquitoes?" },
      options: { en: ["Dry deserts","Cold mountains","Warm, swampy, tropical areas","Indoor AC rooms"], hi: ["Dry deserts","Cold mountains","Warm, swampy, tropical areas","Indoor AC rooms"] },
      correct: 2, explanation: { en: "They thrive in warm, wet conditions.", hi: "They thrive in warm, wet conditions." }
    }
  ],
  nutrition: [
    {
      id: "nutrition_q1", type: "single", difficulty: "easy", relatedTopic: "nutrition",
      question: { en: "Which deficiency causes Anemia?", hi: "Which deficiency causes Anemia?" },
      options: { en: ["Calcium","Iron","Vitamin C","Protein"], hi: ["Calcium","Iron","Vitamin C","Protein"] },
      correct: 1, explanation: { en: "Iron deficiency causes anemia.", hi: "Iron deficiency causes anemia." }
    },
    {
      id: "nutrition_q2", type: "single", difficulty: "easy", relatedTopic: "nutrition",
      question: { en: "Nutrient for strong bones?", hi: "Nutrient for strong bones?" },
      options: { en: ["Iron","Vit C","Calcium","Zinc"], hi: ["Iron","Vit C","Calcium","Zinc"] },
      correct: 2, explanation: { en: "Calcium builds bones.", hi: "Calcium builds bones." }
    },
    {
      id: "nutrition_q3", type: "single", difficulty: "easy", relatedTopic: "nutrition",
      question: { en: "Vitamin C is found in?", hi: "Vitamin C is found in?" },
      options: { en: ["Meat","Dairy","Citrus fruits","Rice"], hi: ["Meat","Dairy","Citrus fruits","Rice"] },
      correct: 2, explanation: { en: "Citrus fruits are rich in Vit C.", hi: "Citrus fruits are rich in Vit C." }
    },
    {
      id: "nutrition_q4", type: "boolean", difficulty: "medium", relatedTopic: "nutrition",
      question: { en: "Drinking water is not needed if drinking juice.", hi: "Drinking water is not needed if drinking juice." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "Plain water is essential.", hi: "Plain water is essential." }
    },
    {
      id: "nutrition_q5", type: "single", difficulty: "medium", relatedTopic: "nutrition",
      question: { en: "Primary energy macronutrient?", hi: "Primary energy macronutrient?" },
      options: { en: ["Protein","Carbohydrates","Fats","Vitamins"], hi: ["Protein","Carbohydrates","Fats","Vitamins"] },
      correct: 1, explanation: { en: "Carbs provide energy.", hi: "Carbs provide energy." }
    },
    {
      id: "nutrition_q6", type: "single", difficulty: "medium", relatedTopic: "nutrition",
      question: { en: "Which nutrient repairs muscle tissue?", hi: "Which nutrient repairs muscle tissue?" },
      options: { en: ["Carbohydrates","Protein","Fats","Fiber"], hi: ["Carbohydrates","Protein","Fats","Fiber"] },
      correct: 1, explanation: { en: "Protein repairs and builds tissues.", hi: "Protein repairs and builds tissues." }
    },
    {
      id: "nutrition_q7", type: "single", difficulty: "hard", relatedTopic: "nutrition",
      question: { en: "What does dietary fiber do?", hi: "What does dietary fiber do?" },
      options: { en: ["Makes you sleepy","Aids digestion and prevents constipation","Causes weight gain","Provides instant energy"], hi: ["Makes you sleepy","Aids digestion and prevents constipation","Causes weight gain","Provides instant energy"] },
      correct: 1, explanation: { en: "Fiber keeps the digestive system healthy.", hi: "Fiber keeps the digestive system healthy." }
    },
    {
      id: "nutrition_q8", type: "single", difficulty: "hard", relatedTopic: "nutrition",
      question: { en: "Which is a source of healthy fats?", hi: "Which is a source of healthy fats?" },
      options: { en: ["Fried chips","Avocados and nuts","Candy","Soda"], hi: ["Fried chips","Avocados and nuts","Candy","Soda"] },
      correct: 1, explanation: { en: "Nuts and avocados have good fats.", hi: "Nuts and avocados have good fats." }
    }
  ],
  vaccination: [
    {
      id: "vaccination_q1", type: "single", difficulty: "easy", relatedTopic: "vaccination",
      question: { en: "BCG vaccine prevents?", hi: "BCG vaccine prevents?" },
      options: { en: ["Polio","Tuberculosis","Hepatitis B","DPT"], hi: ["Polio","Tuberculosis","Hepatitis B","DPT"] },
      correct: 1, explanation: { en: "Protects against TB.", hi: "Protects against TB." }
    },
    {
      id: "vaccination_q2", type: "single", difficulty: "easy", relatedTopic: "vaccination",
      question: { en: "Polio drops prevent?", hi: "Polio drops prevent?" },
      options: { en: ["Fever","Paralysis","Blindness","Cough"], hi: ["Fever","Paralysis","Blindness","Cough"] },
      correct: 1, explanation: { en: "Polio causes paralysis.", hi: "Polio causes paralysis." }
    },
    {
      id: "vaccination_q3", type: "boolean", difficulty: "easy", relatedTopic: "vaccination",
      question: { en: "Vaccines contain weak/dead virus.", hi: "Vaccines contain weak/dead virus." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 0, explanation: { en: "Trains immune system safely.", hi: "Trains immune system safely." }
    },
    {
      id: "vaccination_q4", type: "single", difficulty: "medium", relatedTopic: "vaccination",
      question: { en: "DPT protects against?", hi: "DPT protects against?" },
      options: { en: ["Dengue, Polio, Tetanus","Diphtheria, Pertussis, Tetanus","Dysentery, Polio, Typhoid","None"], hi: ["Dengue, Polio, Tetanus","Diphtheria, Pertussis, Tetanus","Dysentery, Polio, Typhoid","None"] },
      correct: 1, explanation: { en: "DPT stands for Diphtheria, Pertussis, Tetanus.", hi: "DPT stands for Diphtheria, Pertussis, Tetanus." }
    },
    {
      id: "vaccination_q5", type: "single", difficulty: "medium", relatedTopic: "vaccination",
      question: { en: "Herd immunity means:", hi: "Herd immunity means:" },
      options: { en: ["No one vaccinated","Vaccinating animals","Enough people vaccinated to protect others","Vaccines fail"], hi: ["No one vaccinated","Vaccinating animals","Enough people vaccinated to protect others","Vaccines fail"] },
      correct: 2, explanation: { en: "Protects vulnerable people.", hi: "Protects vulnerable people." }
    },
    {
      id: "vaccination_q6", type: "single", difficulty: "medium", relatedTopic: "vaccination",
      question: { en: "Which vaccine is crucial during a deep rusty cut?", hi: "Which vaccine is crucial during a deep rusty cut?" },
      options: { en: ["Measles","Tetanus","Polio","Flu"], hi: ["Measles","Tetanus","Polio","Flu"] },
      correct: 1, explanation: { en: "Tetanus prevents lockjaw from wound infections.", hi: "Tetanus prevents lockjaw from wound infections." }
    },
    {
      id: "vaccination_q7", type: "single", difficulty: "hard", relatedTopic: "vaccination",
      question: { en: "Do vaccines cause the disease they prevent?", hi: "Do vaccines cause the disease they prevent?" },
      options: { en: ["Yes, always","No, they build immunity without causing the disease","Only in children","Yes, if taken twice"], hi: ["Yes, always","No, they build immunity without causing the disease","Only in children","Yes, if taken twice"] },
      correct: 1, explanation: { en: "They imitate infection to build immunity safely.", hi: "They imitate infection to build immunity safely." }
    },
    {
      id: "vaccination_q8", type: "single", difficulty: "hard", relatedTopic: "vaccination",
      question: { en: "When should most childhood vaccines begin?", hi: "When should most childhood vaccines begin?" },
      options: { en: ["At age 5","At birth or shortly after","Teenage years","Adulthood"], hi: ["At age 5","At birth or shortly after","Teenage years","Adulthood"] },
      correct: 1, explanation: { en: "Immunization starts at birth.", hi: "Immunization starts at birth." }
    }
  ],
  cleanwater: [
    {
      id: "cleanwater_q1", type: "single", difficulty: "easy", relatedTopic: "cleanwater",
      question: { en: "How long to boil water to kill germs?", hi: "How long to boil water to kill germs?" },
      options: { en: ["10 sec","1 minute rolling boil","Lukewarm","30 mins"], hi: ["10 sec","1 minute rolling boil","Lukewarm","30 mins"] },
      correct: 1, explanation: { en: "1 min rolling boil kills pathogens.", hi: "1 min rolling boil kills pathogens." }
    },
    {
      id: "cleanwater_q2", type: "single", difficulty: "easy", relatedTopic: "cleanwater",
      question: { en: "Disease spread by dirty water?", hi: "Disease spread by dirty water?" },
      options: { en: ["Malaria","Cholera","Diabetes","Asthma"], hi: ["Malaria","Cholera","Diabetes","Asthma"] },
      correct: 1, explanation: { en: "Cholera is waterborne.", hi: "Cholera is waterborne." }
    },
    {
      id: "cleanwater_q3", type: "boolean", difficulty: "easy", relatedTopic: "cleanwater",
      question: { en: "Clear water is always safe.", hi: "Clear water is always safe." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "Can still have microscopic germs.", hi: "Can still have microscopic germs." }
    },
    {
      id: "cleanwater_q4", type: "single", difficulty: "medium", relatedTopic: "cleanwater",
      question: { en: "Chemical to disinfect municipal water?", hi: "Chemical to disinfect municipal water?" },
      options: { en: ["Salt","Sugar","Chlorine","Vinegar"], hi: ["Salt","Sugar","Chlorine","Vinegar"] },
      correct: 2, explanation: { en: "Chlorine kills bacteria.", hi: "Chlorine kills bacteria." }
    },
    {
      id: "cleanwater_q5", type: "single", difficulty: "medium", relatedTopic: "cleanwater",
      question: { en: "Safest way to store purified water?", hi: "Safest way to store purified water?" },
      options: { en: ["Open bucket","Covered container with tap","Rusty drum","Direct sunlight"], hi: ["Open bucket","Covered container with tap","Rusty drum","Direct sunlight"] },
      correct: 1, explanation: { en: "Prevents re-contamination.", hi: "Prevents re-contamination." }
    },
    {
      id: "cleanwater_q6", type: "single", difficulty: "medium", relatedTopic: "cleanwater",
      question: { en: "What is a common sign of a waterborne illness?", hi: "What is a common sign of a waterborne illness?" },
      options: { en: ["Hair loss","Severe diarrhea","Sneezing","Joint swelling"], hi: ["Hair loss","Severe diarrhea","Sneezing","Joint swelling"] },
      correct: 1, explanation: { en: "Diarrhea is a classic symptom.", hi: "Diarrhea is a classic symptom." }
    },
    {
      id: "cleanwater_q7", type: "single", difficulty: "hard", relatedTopic: "cleanwater",
      question: { en: "Which household item can filter large dirt from water before boiling?", hi: "Which household item can filter large dirt from water before boiling?" },
      options: { en: ["A clean cotton cloth","A plastic bag","A metal spoon","A paper towel"], hi: ["A clean cotton cloth","A plastic bag","A metal spoon","A paper towel"] },
      correct: 0, explanation: { en: "Cloth filters out large sediment.", hi: "Cloth filters out large sediment." }
    },
    {
      id: "cleanwater_q8", type: "boolean", difficulty: "hard", relatedTopic: "cleanwater",
      question: { en: "Washing hands with contaminated water is safe if using soap.", hi: "Washing hands with contaminated water is safe if using soap." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "Contaminated water can leave germs on hands.", hi: "Contaminated water can leave germs on hands." }
    }
  ],
  sanitation: [
    {
      id: "sanitation_q1", type: "single", difficulty: "easy", relatedTopic: "sanitation",
      question: { en: "How does open defecation affect health?", hi: "How does open defecation affect health?" },
      options: { en: ["Contaminates soil/water","Reduces humidity","Raises temp","Affects crops only"], hi: ["Contaminates soil/water","Reduces humidity","Raises temp","Affects crops only"] },
      correct: 0, explanation: { en: "Spreads pathogens.", hi: "Spreads pathogens." }
    },
    {
      id: "sanitation_q2", type: "boolean", difficulty: "easy", relatedTopic: "sanitation",
      question: { en: "Ash/mud is as effective as soap.", hi: "Ash/mud is as effective as soap." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "Soap destroys virus lipid layers.", hi: "Soap destroys virus lipid layers." }
    },
    {
      id: "sanitation_q3", type: "single", difficulty: "easy", relatedTopic: "sanitation",
      question: { en: "Why separate dry/wet waste?", hi: "Why separate dry/wet waste?" },
      options: { en: ["Looks better","Composting & recycling","Legal requirement","Prevents fires"], hi: ["Looks better","Composting & recycling","Legal requirement","Prevents fires"] },
      correct: 1, explanation: { en: "Enables proper processing.", hi: "Enables proper processing." }
    },
    {
      id: "sanitation_q4", type: "single", difficulty: "medium", relatedTopic: "sanitation",
      question: { en: "Hygienic pad disposal?", hi: "Hygienic pad disposal?" },
      options: { en: ["Flush","Open drains","Wrap in paper, covered bin","Burn open"], hi: ["Flush","Open drains","Wrap in paper, covered bin","Burn open"] },
      correct: 2, explanation: { en: "Prevents clogs and hygiene risks.", hi: "Prevents clogs and hygiene risks." }
    },
    {
      id: "sanitation_q5", type: "single", difficulty: "medium", relatedTopic: "sanitation",
      question: { en: "Standing water in drains causes?", hi: "Standing water in drains causes?" },
      options: { en: ["Cools air","Mosquito breeding","Animal drinking","Reduces dust"], hi: ["Cools air","Mosquito breeding","Animal drinking","Reduces dust"] },
      correct: 1, explanation: { en: "Breeds malaria/dengue mosquitoes.", hi: "Breeds malaria/dengue mosquitoes." }
    },
    {
      id: "sanitation_q6", type: "single", difficulty: "medium", relatedTopic: "sanitation",
      question: { en: "What happens when sewage mixes with drinking water?", hi: "What happens when sewage mixes with drinking water?" },
      options: { en: ["Water tastes better","Causes outbreaks of cholera and typhoid","Prevents rusting of pipes","Nothing"], hi: ["Water tastes better","Causes outbreaks of cholera and typhoid","Prevents rusting of pipes","Nothing"] },
      correct: 1, explanation: { en: "It introduces dangerous fecal bacteria.", hi: "It introduces dangerous fecal bacteria." }
    },
    {
      id: "sanitation_q7", type: "single", difficulty: "hard", relatedTopic: "sanitation",
      question: { en: "Proper handwashing should last at least:", hi: "Proper handwashing should last at least:" },
      options: { en: ["5 seconds","20 seconds","1 minute","5 minutes"], hi: ["5 seconds","20 seconds","1 minute","5 minutes"] },
      correct: 1, explanation: { en: "20 seconds of scrubbing removes most germs.", hi: "20 seconds of scrubbing removes most germs." }
    },
    {
      id: "sanitation_q8", type: "single", difficulty: "hard", relatedTopic: "sanitation",
      question: { en: "Flies landing on uncovered food can transmit:", hi: "Flies landing on uncovered food can transmit:" },
      options: { en: ["Asthma","Diarrheal diseases","Malaria","Dengue"], hi: ["Asthma","Diarrheal diseases","Malaria","Dengue"] },
      correct: 1, explanation: { en: "Flies transfer feces to food.", hi: "Flies transfer feces to food." }
    }
  ],
  firstaid: [
    {
      id: "firstaid_q1", type: "single", difficulty: "easy", relatedTopic: "firstaid",
      question: { en: "Hot tea spill on arm. Immediate action?", hi: "Hot tea spill on arm. Immediate action?" },
      options: { en: ["Toothpaste","Pop blisters","Cool running water 10-15 mins","Wrap tightly"], hi: ["Toothpaste","Pop blisters","Cool running water 10-15 mins","Wrap tightly"] },
      correct: 2, explanation: { en: "Cool water dissipates heat.", hi: "Cool water dissipates heat." }
    },
    {
      id: "firstaid_q2", type: "single", difficulty: "easy", relatedTopic: "firstaid",
      question: { en: "Venomous snake bite action?", hi: "Venomous snake bite action?" },
      options: { en: ["Cut wound","Suck venom","Keep still and rush to hospital","Tight tourniquet"], hi: ["Cut wound","Suck venom","Keep still and rush to hospital","Tight tourniquet"] },
      correct: 2, explanation: { en: "Keeps venom spread slow.", hi: "Keeps venom spread slow." }
    },
    {
      id: "firstaid_q3", type: "single", difficulty: "easy", relatedTopic: "firstaid",
      question: { en: "Heavy bleeding deep cut?", hi: "Heavy bleeding deep cut?" },
      options: { en: ["Wash with dirty water","Direct pressure with clean cloth","Wait to stop","Mud"], hi: ["Wash with dirty water","Direct pressure with clean cloth","Wait to stop","Mud"] },
      correct: 1, explanation: { en: "Direct pressure stops bleeding.", hi: "Direct pressure stops bleeding." }
    },
    {
      id: "firstaid_q4", type: "boolean", difficulty: "medium", relatedTopic: "firstaid",
      question: { en: "Fainted person should be propped sitting.", hi: "Fainted person should be propped sitting." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "Lay flat, elevate legs.", hi: "Lay flat, elevate legs." }
    },
    {
      id: "firstaid_q5", type: "single", difficulty: "medium", relatedTopic: "firstaid",
      question: { en: "Adult CPR hand placement?", hi: "Adult CPR hand placement?" },
      options: { en: ["Stomach","Center of chest","Neck","Ribs"], hi: ["Stomach","Center of chest","Neck","Ribs"] },
      correct: 1, explanation: { en: "Center of chest pumps heart.", hi: "Center of chest pumps heart." }
    },
    {
      id: "firstaid_q6", type: "single", difficulty: "medium", relatedTopic: "firstaid",
      question: { en: "If someone is choking and cannot breathe, you should:", hi: "If someone is choking and cannot breathe, you should:" },
      options: { en: ["Give them water","Perform the Heimlich maneuver","Slap their face","Make them lie down"], hi: ["Give them water","Perform the Heimlich maneuver","Slap their face","Make them lie down"] },
      correct: 1, explanation: { en: "Heimlich pushes the blockage out.", hi: "Heimlich pushes the blockage out." }
    },
    {
      id: "firstaid_q7", type: "single", difficulty: "hard", relatedTopic: "firstaid",
      question: { en: "What is the first step when assessing an emergency?", hi: "What is the first step when assessing an emergency?" },
      options: { en: ["Start CPR","Ensure the scene is safe","Call a lawyer","Run away"], hi: ["Start CPR","Ensure the scene is safe","Call a lawyer","Run away"] },
      correct: 1, explanation: { en: "Safety first to avoid more injuries.", hi: "Safety first to avoid more injuries." }
    },
    {
      id: "firstaid_q8", type: "single", difficulty: "hard", relatedTopic: "firstaid",
      question: { en: "For a suspected broken bone:", hi: "For a suspected broken bone:" },
      options: { en: ["Try to straighten it","Immobilize the area and seek help","Massage it","Apply heat immediately"], hi: ["Try to straighten it","Immobilize the area and seek help","Massage it","Apply heat immediately"] },
      correct: 1, explanation: { en: "Immobilization prevents further nerve/tissue damage.", hi: "Immobilization prevents further nerve/tissue damage." }
    }
  ],
  mentalhealth: [
    {
      id: "mentalhealth_q1", type: "single", difficulty: "easy", relatedTopic: "mentalhealth",
      question: { en: "Healthy habit for stress?", hi: "Healthy habit for stress?" },
      options: { en: ["Isolating","Deep breathing","Staying up late","Skipping meals"], hi: ["Isolating","Deep breathing","Staying up late","Skipping meals"] },
      correct: 1, explanation: { en: "Lowers stress hormones.", hi: "Lowers stress hormones." }
    },
    {
      id: "mentalhealth_q2", type: "single", difficulty: "easy", relatedTopic: "mentalhealth",
      question: { en: "Exercise affects mental health by?", hi: "Exercise affects mental health by?" },
      options: { en: ["More anger","Releasing endorphins","No effect","Depression"], hi: ["More anger","Releasing endorphins","No effect","Depression"] },
      correct: 1, explanation: { en: "Endorphins improve mood.", hi: "Endorphins improve mood." }
    },
    {
      id: "mentalhealth_q3", type: "boolean", difficulty: "easy", relatedTopic: "mentalhealth",
      question: { en: "Therapy is a sign of weakness.", hi: "Therapy is a sign of weakness." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "Proactive step for well-being.", hi: "Proactive step for well-being." }
    },
    {
      id: "mentalhealth_q4", type: "single", difficulty: "medium", relatedTopic: "mentalhealth",
      question: { en: "What is mindfulness?", hi: "What is mindfulness?" },
      options: { en: ["Ignoring problems","Focusing on present moment","Sleeping","Worrying"], hi: ["Ignoring problems","Focusing on present moment","Sleeping","Worrying"] },
      correct: 1, explanation: { en: "Grounds you in the present.", hi: "Grounds you in the present." }
    },
    {
      id: "mentalhealth_q5", type: "single", difficulty: "medium", relatedTopic: "mentalhealth",
      question: { en: "Lack of sleep leads to:", hi: "Lack of sleep leads to:" },
      options: { en: ["Immunity","Better memory","Irritability & depression risk","Muscle"], hi: ["Immunity","Better memory","Irritability & depression risk","Muscle"] },
      correct: 2, explanation: { en: "Impacts emotional regulation.", hi: "Impacts emotional regulation." }
    },
    {
      id: "mentalhealth_q6", type: "single", difficulty: "medium", relatedTopic: "mentalhealth",
      question: { en: "Talking about your feelings with someone you trust:", hi: "Talking about your feelings with someone you trust:" },
      options: { en: ["Makes them worse","Reduces emotional burden","Is a waste of time","Causes physical pain"], hi: ["Makes them worse","Reduces emotional burden","Is a waste of time","Causes physical pain"] },
      correct: 1, explanation: { en: "Sharing helps process emotions.", hi: "Sharing helps process emotions." }
    },
    {
      id: "mentalhealth_q7", type: "single", difficulty: "hard", relatedTopic: "mentalhealth",
      question: { en: "Chronic stress can physically affect the body by:", hi: "Chronic stress can physically affect the body by:" },
      options: { en: ["Improving eyesight","Increasing blood pressure and heart risks","Curing colds","Strengthening teeth"], hi: ["Improving eyesight","Increasing blood pressure and heart risks","Curing colds","Strengthening teeth"] },
      correct: 1, explanation: { en: "Stress hormones strain the cardiovascular system.", hi: "Stress hormones strain the cardiovascular system." }
    },
    {
      id: "mentalhealth_q8", type: "single", difficulty: "hard", relatedTopic: "mentalhealth",
      question: { en: "Which of these is a sign of burnout?", hi: "Which of these is a sign of burnout?" },
      options: { en: ["High energy","Constant exhaustion and cynicism","Perfect attendance","Loud laughing"], hi: ["High energy","Constant exhaustion and cynicism","Perfect attendance","Loud laughing"] },
      correct: 1, explanation: { en: "Burnout depletes mental and physical energy.", hi: "Burnout depletes mental and physical energy." }
    }
  ],
  lifestyle: [
    {
      id: "lifestyle_q1", type: "single", difficulty: "easy", relatedTopic: "lifestyle",
      question: { en: "Daily adult exercise recommendation?", hi: "Daily adult exercise recommendation?" },
      options: { en: ["5 mins","30 mins","2 hours","Weekends only"], hi: ["5 mins","30 mins","2 hours","Weekends only"] },
      correct: 1, explanation: { en: "Improves heart health.", hi: "Improves heart health." }
    },
    {
      id: "lifestyle_q2", type: "single", difficulty: "easy", relatedTopic: "lifestyle",
      question: { en: "Negative lifestyle habit?", hi: "Negative lifestyle habit?" },
      options: { en: ["8 glasses water","7-8 hrs sleep","Smoking tobacco","Fresh veg"], hi: ["8 glasses water","7-8 hrs sleep","Smoking tobacco","Fresh veg"] },
      correct: 2, explanation: { en: "Damages lungs and heart.", hi: "Damages lungs and heart." }
    },
    {
      id: "lifestyle_q3", type: "boolean", difficulty: "easy", relatedTopic: "lifestyle",
      question: { en: "Fast food is healthy daily.", hi: "Fast food is healthy daily." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "High in unhealthy fats & salt.", hi: "High in unhealthy fats & salt." }
    },
    {
      id: "lifestyle_q4", type: "single", difficulty: "medium", relatedTopic: "lifestyle",
      question: { en: "Recommended adult sleep?", hi: "Recommended adult sleep?" },
      options: { en: ["3-4 hrs","5-6 hrs","7-8 hrs","10-12 hrs"], hi: ["3-4 hrs","5-6 hrs","7-8 hrs","10-12 hrs"] },
      correct: 2, explanation: { en: "Allows body/brain to repair.", hi: "Allows body/brain to repair." }
    },
    {
      id: "lifestyle_q5", type: "single", difficulty: "medium", relatedTopic: "lifestyle",
      question: { en: "Prolonged sitting risk?", hi: "Prolonged sitting risk?" },
      options: { en: ["Focus","Obesity & cardiovascular issues","Back muscles","Digestion"], hi: ["Focus","Obesity & cardiovascular issues","Back muscles","Digestion"] },
      correct: 1, explanation: { en: "Increases heart disease risk.", hi: "Increases heart disease risk." }
    },
    {
      id: "lifestyle_q6", type: "single", difficulty: "medium", relatedTopic: "lifestyle",
      question: { en: "Which drink is the healthiest choice for daily hydration?", hi: "Which drink is the healthiest choice for daily hydration?" },
      options: { en: ["Energy drinks","Sugary soda","Plain water","Packaged fruit juice"], hi: ["Energy drinks","Sugary soda","Plain water","Packaged fruit juice"] },
      correct: 2, explanation: { en: "Water has no added sugars or calories.", hi: "Water has no added sugars or calories." }
    },
    {
      id: "lifestyle_q7", type: "single", difficulty: "hard", relatedTopic: "lifestyle",
      question: { en: "Excessive screen time before bed can:", hi: "Excessive screen time before bed can:" },
      options: { en: ["Improve sleep","Disrupt the sleep cycle","Cure headaches","Enhance dreams"], hi: ["Improve sleep","Disrupt the sleep cycle","Cure headaches","Enhance dreams"] },
      correct: 1, explanation: { en: "Blue light suppresses sleep hormones.", hi: "Blue light suppresses sleep hormones." }
    },
    {
      id: "lifestyle_q8", type: "boolean", difficulty: "hard", relatedTopic: "lifestyle",
      question: { en: "Regular health checkups are only for sick people.", hi: "Regular health checkups are only for sick people." },
      options: { en: ["True","False"], hi: ["True","False"] },
      correct: 1, explanation: { en: "Checkups detect issues early before symptoms appear.", hi: "Checkups detect issues early before symptoms appear." }
    }
  ],
};

export default {
  quizCategories,
  quizQuestions
};
