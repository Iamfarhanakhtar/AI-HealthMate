/**
 * Offline Educational Health Database
 * Provides predefined health guides and answers when no network connectivity is available.
 */

const OFFLINE_DATABASE = {
  dengue: {
    summary: "Dengue is a viral fever spread by infected Aedes mosquitoes. It is common during and after the rainy season. It is not contagious (does not spread from person to person).",
    keyPoints: [
      "High fever (up to 104°F) that starts suddenly.",
      "Severe headache and pain behind the eyes.",
      "Pain in muscles and joints (often called 'breakbone fever').",
      "Skin rash and extreme tiredness."
    ],
    prevention: [
      "Remove stagnant water around your home where mosquitoes lay eggs.",
      "Keep water containers, buckets, and flower pots covered.",
      "Wear long-sleeved clothes and trousers to prevent mosquito bites.",
      "Use mosquito nets while sleeping and apply mosquito repellents."
    ],
    consult: "Consult a doctor immediately if you notice severe stomach pain, persistent vomiting, bleeding from gums/nose, or difficulty breathing, as these are signs of severe dengue.",
    disclaimer: "Offline Mode: This information is for educational purposes. Never self-medicate, especially with pain relievers like aspirin or ibuprofen, which can increase bleeding risk."
  },
  malaria: {
    summary: "Malaria is a serious but preventable fever caused by parasites transmitted through the bites of infected female Anopheles mosquitoes.",
    keyPoints: [
      "High fever with severe shaking chills (shivering).",
      "Profuse sweating as the body temperature falls.",
      "Headache, body aches, nausea, and vomiting.",
      "Symptoms often cycle every 48 to 72 hours."
    ],
    prevention: [
      "Sleep under insecticidal mosquito nets (ITNs).",
      "Spray anti-mosquito sprays inside living areas.",
      "Clear weeds and drain pools of standing water near houses.",
      "Keep windows closed in the evening or install mesh screens."
    ],
    consult: "Always see a health worker or doctor for a blood test if you suspect malaria. Prompt treatment is crucial to prevent serious complications.",
    disclaimer: "Offline Mode: Educational information only. Malaria can only be diagnosed through blood tests by qualified professionals."
  },
  typhoid: {
    summary: "Typhoid is a bacterial infection caused by Salmonella typhi. It spreads through contaminated food and water, causing high fever and digestive trouble.",
    keyPoints: [
      "Slowly rising fever that remains high for several days.",
      "Stomach pain, headache, and weakness.",
      "Constipation or loose watery stools.",
      "Loss of appetite and sometimes a faint rash on the chest."
    ],
    prevention: [
      "Always wash hands with soap before eating or cooking.",
      "Drink only boiled, filtered, or bottled clean water.",
      "Avoid raw foods, unpeeled fruits, and street food prepared in unhygienic conditions.",
      "Keep food covered to protect it from flies."
    ],
    consult: "Consult a doctor immediately for correct antibiotics. Do not stop taking antibiotics early even if you feel better.",
    disclaimer: "Offline Mode: Educational information only. Typhoid requires specific antibiotic treatments prescribed by a physician."
  },
  covid: {
    summary: "COVID-19 is a respiratory disease caused by the coronavirus. It spreads through droplets when an infected person talks, coughs, or sneezes.",
    keyPoints: [
      "Fever, dry cough, and feeling very tired.",
      "Loss of taste or smell.",
      "Sore throat, runny nose, or body aches.",
      "Difficulty breathing in severe cases."
    ],
    prevention: [
      "Wash hands frequently with clean water and soap for 20 seconds.",
      "Wear a mask in crowded or poorly ventilated places.",
      "Maintain a safe distance of at least 6 feet from others.",
      "Get fully vaccinated and keep up with booster doses."
    ],
    consult: "Seek urgent medical attention if you experience difficulty breathing, chest pain, or low oxygen levels.",
    disclaimer: "Offline Mode: Educational resource. COVID-19 management varies; follow instructions from local public health authorities."
  },
  diabetes: {
    summary: "Diabetes is a chronic condition where the body cannot properly manage blood glucose (sugar) levels. It requires long-term care, healthy eating, and active living.",
    keyPoints: [
      "Feeling unusually thirsty and urinating frequently (especially at night).",
      "Increased hunger and feeling very tired.",
      "Slow-healing cuts, sores, or blurred vision.",
      "Unexplained weight loss."
    ],
    prevention: [
      "Eat healthy meals rich in vegetables, whole grains, and lean proteins.",
      "Reduce intake of refined sugar, sweets, and sweetened beverages.",
      "Engage in at least 30 minutes of physical activity daily (walking, cycling, etc.).",
      "Maintain a healthy weight."
    ],
    consult: "Consult a primary health physician if you have symptoms. Regular blood sugar checks are recommended for individuals over 35 or with family history.",
    disclaimer: "Offline Mode: Educational guide. Diabetes management plans must be customized by an endocrinologist or physician."
  },
  nutrition: {
    summary: "Good nutrition is about eating a balanced diet that provides the body with vitamins, minerals, proteins, healthy fats, and energy to grow, learn, and fight diseases.",
    keyPoints: [
      "A balanced plate contains half vegetables/fruits, a quarter grains, and a quarter protein.",
      "Iron-rich foods (spinach, lentils, beans) prevent anemia, especially in children and women.",
      "Calcium (milk, curd, green leaves) strengthens bones.",
      "Proper meals boost immunity and aid child development."
    ],
    prevention: [
      "Eat locally grown seasonal fruits and vegetables.",
      "Limit packaged snacks, bakery foods, and highly salty foods.",
      "Ensure infants receive exclusive breastfeeding for the first 6 months.",
      "Include a mix of pulses, lentils, nuts, and dairy products."
    ],
    consult: "Consult a community health worker or nutritionist if a child shows signs of malnutrition (stunted growth, weak limbs, or swollen belly).",
    disclaimer: "Offline Mode: Educational information. Nutritional requirements vary based on age, gender, and health status."
  },
  water: {
    summary: "Clean water is essential for life. Drinking contaminated water spreads deadly diseases like cholera, dysentery, and typhoid. Safe storage and purification are vital.",
    keyPoints: [
      "Contaminated water can look clean. Invisible germs cause illness.",
      "Store water in clean, narrow-neck covered containers.",
      "Never dip dirty hands or cups directly into drinking water.",
      "Clean storage vessels weekly with soap and clean water."
    ],
    prevention: [
      "Boil water: Bring to a rolling boil for 1 full minute to kill all germs.",
      "Chlorination: Use chlorine tablets in correct doses if boiling is not possible.",
      "Filtration: Use ceramic or candle water filters.",
      "Keep source areas (wells, hand pumps) free from waste and sewage."
    ],
    consult: "Seek immediate medical help if anyone in your household suffers from severe diarrhea, vomiting, or signs of dehydration (sunken eyes, dry mouth).",
    disclaimer: "Offline Mode: Educational guidelines. Clean water is the single most effective barrier against diarrheal illnesses."
  },
  sanitation: {
    summary: "Sanitation refers to keeping our surroundings, toilets, and water sources free from waste and germs. Good hygiene prevents the spread of infectious illnesses.",
    keyPoints: [
      "Open defecation spreads germs, contaminates water sources, and causes sickness.",
      "Toilets must be kept clean, covered, and away from drinking water wells.",
      "Dispose of household waste in covered bins, never in open spaces.",
      "Keep drainage channels clear to prevent dirty water pooling."
    ],
    prevention: [
      "Always wash hands with soap after using the toilet and before preparing food.",
      "Cover food to protect it from houseflies, which carry germs from waste.",
      "Keep fingernails clean and trimmed.",
      "Participate in keeping community common areas free of open garbage."
    ],
    consult: "Contact local sanitation authorities or community health workers if there is a sewage leak or public health hazard near your house.",
    disclaimer: "Offline Mode: Educational information. Sanitation is a collective community responsibility for public health."
  },
  vaccination: {
    summary: "Vaccines protect children and adults from serious, life-threatening diseases. They work by preparing the body's natural defense system to fight germs.",
    keyPoints: [
      "Vaccines are safe, thoroughly tested, and highly effective.",
      "They prevent deadly diseases like polio, measles, tetanus, and tuberculosis.",
      "Getting vaccinated protects not only you but also the vulnerable around you.",
      "A minor fever or sore arm after vaccination is normal and goes away in 1-2 days."
    ],
    prevention: [
      "Keep track of the national immunization schedule for infants.",
      "Ensure children receive vaccines at birth, 6 weeks, 10 weeks, 14 weeks, 9 months, and 1.5 years.",
      "Pregnant women should receive Tetanus vaccines to protect the baby.",
      "Keep the immunization card safe; it is needed for school admissions."
    ],
    consult: "Visit your local health center or ASHA worker to check if your child's vaccinations are up to date.",
    disclaimer: "Offline Mode: Educational guidance. Vaccines are the most successful public health measure in human history."
  },
  firstaid: {
    summary: "First aid is the immediate care given to an injured or sick person before professional medical help arrives. Doing the right thing quickly saves lives.",
    keyPoints: [
      "For minor burns: Cool the burn under cool running water for 10-15 minutes. Do not apply toothpaste, butter, or ice.",
      "For cuts: Press clean cloth firmly on the wound to stop bleeding. Clean with soap and water.",
      "For snake bites: Keep the patient calm and completely still. Do not cut the wound or try to suck out venom. Go to hospital immediately.",
      "For choking: Perform back blows and abdominal thrusts (Heimlich maneuver) if they cannot breathe."
    ],
    prevention: [
      "Keep a basic first aid box at home containing bandages, cotton, antiseptic, and ORS.",
      "Keep sharp objects, medicines, and chemicals out of reach of children.",
      "Wear helmets while riding two-wheelers and seatbelts in cars.",
      "Learn basic CPR techniques from certified community instructors."
    ],
    consult: "Always seek professional medical treatment after first aid for major injuries, deep cuts, animal bites, snake bites, or head trauma.",
    disclaimer: "Offline Mode: Educational guide. First aid is temporary assistance; it does not replace a doctor's examination."
  },
  lifestyle: {
    summary: "A healthy lifestyle keeps your mind and body strong. Simple, consistent daily habits prevent long-term diseases like high blood pressure, heart disease, and stress.",
    keyPoints: [
      "Physical: Walk at least 10,000 steps or do 30 minutes of moderate exercise daily.",
      "Diet: Eat fresh food, drink lots of water, and cut down on fried foods and excess salt.",
      "Sleep: Get 7 to 8 hours of quiet, restful sleep every night.",
      "Avoid: Stay away from tobacco, smoking, and alcohol, which harm every organ in the body."
    ],
    prevention: [
      "Wake up and sleep at regular times.",
      "Include green vegetables, seasonal fruits, and whole grains in meals.",
      "Spend some time outdoors in fresh air and sunshine.",
      "Take breaks from mobile phones and screens, especially before bedtime."
    ],
    consult: "Consult a physician if you experience constant fatigue, chest tightness, irregular heartbeat, or sudden unexplained changes in your health.",
    disclaimer: "Offline Mode: Educational lifestyle guide. Small daily choices are the best medicine for long-term well-being."
  },
  mentalhealth: {
    summary: "Mental health is about how we think, feel, and cope with life. Just like physical illness, mental stress and sadness are normal health concerns that can be treated.",
    keyPoints: [
      "Feeling sad, anxious, or stressed is common. You are not alone.",
      "Talking about your worries with a trusted family member, teacher, or friend helps.",
      "Good sleep, regular exercise, and healthy food support brain health.",
      "Avoid self-isolation when going through difficult situations."
    ],
    prevention: [
      "Practice deep breathing or meditation for 5 minutes when feeling stressed.",
      "Maintain a balanced schedule between work, study, and rest.",
      "Limit screen time and excessive exposure to negative news.",
      "Connect with friends and join in community activities."
    ],
    consult: "Seek help from a counselor or doctor if sadness or anxiety lasts for more than two weeks, interferes with daily life, or if you feel hopeless.",
    disclaimer: "Offline Mode: Educational resource. Mental health conditions are treatable; seeking help is a sign of strength."
  },
  womenshealth: {
    summary: "Women have unique health needs related to pregnancy, menstruation, bone density, and hormonal shifts. Regular nutrition and hygiene are keys to health.",
    keyPoints: [
      "Menstrual Hygiene: Use clean sanitary pads or clean cotton cloths (washed and dried in direct sunlight). Change every 4-6 hours.",
      "Pregnancy Nutrition: Pregnant women need extra iron, calcium, and folic acid to prevent anemia and ensure baby growth.",
      "Bone Health: Adequate calcium (dairy, ragi) prevents osteoporosis in later years.",
      "Anemia: Very common; eat green leafy vegetables, jaggery, and iron-fortified food."
    ],
    prevention: [
      "Maintain vaginal hygiene with simple clean water; avoid harsh soaps.",
      "Ensure pregnant women attend regular antenatal checkups.",
      "Include iron-rich foods in every girl's diet from puberty onward.",
      "Discuss reproductive health openly to break unhelpful cultural taboos."
    ],
    consult: "Consult a gynecologist or ASHA worker if you have severe menstrual pain, irregular bleeding, vaginal infection, or during pregnancy.",
    disclaimer: "Offline Mode: Educational guide. Women's health requirements vary significantly across different life stages."
  },
  childhealth: {
    summary: "Child health focuses on a child's physical, mental, and social development. Proper nutrition, immunization, and hygiene protect children from growth issues.",
    keyPoints: [
      "Breastfeeding: Exclusive breastfeeding for the first 6 months provides best immunity.",
      "ORS for Diarrhea: Dehydration is dangerous. Give Oral Rehydration Salts (ORS) dissolved in boiled, cooled water.",
      "Growth Monitoring: Weight and height should increase steadily month by month.",
      "Play and Learn: Active play and talking build language and cognitive skills."
    ],
    prevention: [
      "Wash hands thoroughly before feeding infants.",
      "Keep children's nails clean and discourage putting dirty objects in the mouth.",
      "Follow the complete vaccination schedule.",
      "Provide nutrient-dense weaning foods (mashed banana, khichdi, ragi) after 6 months."
    ],
    consult: "Consult a pediatrician or ASHA worker immediately if a child has high fever, loose motions, refusal to feed, or breathing problems.",
    disclaimer: "Offline Mode: Educational guide. Early childhood health is the foundation for a healthy adulthood."
  }
};

export const offlineService = {
  /**
   * Searches the local offline database for keywords.
   * @param {string} query 
   * @returns {Object} A formatted response structure
   */
  getResponse: (query) => {
    const cleanQuery = query.toLowerCase();
    
    // Check keyword mapping
    let match = null;
    if (cleanQuery.includes('dengue')) match = 'dengue';
    else if (cleanQuery.includes('malaria')) match = 'malaria';
    else if (cleanQuery.includes('typhoid')) match = 'typhoid';
    else if (cleanQuery.includes('covid') || cleanQuery.includes('corona')) match = 'covid';
    else if (cleanQuery.includes('diabet') || cleanQuery.includes('sugar')) match = 'diabetes';
    else if (cleanQuery.includes('nutri') || cleanQuery.includes('diet') || cleanQuery.includes('food') || cleanQuery.includes('eat')) match = 'nutrition';
    else if (cleanQuery.includes('water') || cleanQuery.includes('drink')) match = 'water';
    else if (cleanQuery.includes('sanit') || cleanQuery.includes('clean') || cleanQuery.includes('toilet') || cleanQuery.includes('hygiene')) match = 'sanitation';
    else if (cleanQuery.includes('vacc') || cleanQuery.includes('immun') || cleanQuery.includes('polio')) match = 'vaccination';
    else if (cleanQuery.includes('first aid') || cleanQuery.includes('burn') || cleanQuery.includes('snake') || cleanQuery.includes('cut') || cleanQuery.includes('bite')) match = 'firstaid';
    else if (cleanQuery.includes('lifestyle') || cleanQuery.includes('habit') || cleanQuery.includes('sleep') || cleanQuery.includes('exercise')) match = 'lifestyle';
    else if (cleanQuery.includes('mental') || cleanQuery.includes('stress') || cleanQuery.includes('sad') || cleanQuery.includes('depress') || cleanQuery.includes('anxiety')) match = 'mentalhealth';
    else if (cleanQuery.includes('women') || cleanQuery.includes('pregnan') || cleanQuery.includes('period') || cleanQuery.includes('menstru')) match = 'womenshealth';
    else if (cleanQuery.includes('child') || cleanQuery.includes('baby') || cleanQuery.includes('infant') || cleanQuery.includes('pediatric')) match = 'childhealth';

    if (match && OFFLINE_DATABASE[match]) {
      return OFFLINE_DATABASE[match];
    }

    // Default fallback structured educational response
    return {
      summary: "I am currently in Offline Mode. I couldn't find a specific guide for your query, but I can help you learn about common preventative health guidelines.",
      keyPoints: [
        "Drink clean, filtered, or boiled water to prevent intestinal infections.",
        "Wash hands with soap and water before meals and after toilet use.",
        "Ensure children complete their scheduled immunizations.",
        "Maintain clean, dry surroundings to prevent mosquitoes breeding."
      ],
      prevention: [
        "Keep waste and garbage in covered bins.",
        "Wear protective clothing or use repellents in mosquito-dense seasons.",
        "Follow a healthy lifestyle with daily exercise and fresh foods."
      ],
      consult: "If you are feeling unwell or have persistent symptoms, please consult a qualified healthcare doctor immediately.",
      disclaimer: "Offline Mode: AI HealthMate has switched to offline mode because no internet connection is active. Please reconnect to access real-time educational assistance."
    };
  }
};
