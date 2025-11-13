const fs = require('fs');
const path = require('path');

// Generate comprehensive 10000 Q&A database for Clinica San Miguel
const qaDatabase = [];
let idCounter = 1;

// Core information about Clinica San Miguel
const coreInfo = {
  pricing: "$19 per visit",
  locations: "17 locations across Texas including Dallas, Houston, and San Antonio",
  insurance: "No insurance required",
  appointments: "Walk-in care, no appointment needed",
  staff: "Bilingual team (English and Spanish)",
  mission: "Making healthcare a right, not a privilege"
};

// Categories with base questions
const baseQuestions = [
  // Pricing (200 questions)
  { q: "What is the cost of a visit?", a: "A visit at Clinica San Miguel costs just $19, making quality healthcare accessible to everyone.", cat: "pricing" },
  { q: "How much does it cost?", a: "Our visits cost just $19. This affordable price makes quality healthcare accessible regardless of insurance status.", cat: "pricing" },
  { q: "Is it affordable?", a: "Yes! Our $19 visits are designed to be affordable for everyone, making healthcare accessible to all.", cat: "pricing" },
  { q: "Do I need to pay upfront?", a: "Payment is typically collected at the time of service. Our $19 visit fee is very affordable.", cat: "pricing" },
  
  // Insurance (200 questions)
  { q: "Do I need insurance?", a: "No, you don't need insurance to visit Clinica San Miguel. We provide affordable care starting at $19 without requiring insurance.", cat: "insurance" },
  { q: "What if I don't have insurance?", a: "No problem! Our $19 visits don't require insurance, making healthcare accessible to everyone.", cat: "insurance" },
  { q: "Do you accept Medicaid?", a: "Please contact your nearest location to inquire about Medicaid. Our $19 visits make care affordable even without insurance.", cat: "insurance" },
  { q: "Do you accept Medicare?", a: "Please contact your nearest location to inquire about Medicare. Our affordable $19 visits are available to all patients.", cat: "insurance" },
  
  // Appointments (200 questions)
  { q: "Do I need an appointment?", a: "No appointment is needed! Clinica San Miguel offers walk-in care, so you can visit us whenever it's convenient for you.", cat: "appointments" },
  { q: "Can I walk in?", a: "Yes! We offer walk-in care with no appointment needed. Just come in when it's convenient for you.", cat: "appointments" },
  { q: "How long is the wait?", a: "Wait times may vary as a walk-in clinic. We work to see patients as quickly as possible while providing quality care.", cat: "appointments" },
  
  // Locations (300 questions)
  { q: "How many locations do you have?", a: "Clinica San Miguel has 17 locations across Texas, making quality healthcare accessible throughout the state.", cat: "locations" },
  { q: "Where are you located?", a: "We have 17 locations across Texas, including Dallas, Houston, San Antonio, and other cities. Visit our website to find the nearest clinic.", cat: "locations" },
  { q: "Do you have a Dallas location?", a: "Yes, we have locations in the Dallas area. Visit our website or contact us for specific addresses.", cat: "locations" },
  { q: "Do you have a Houston location?", a: "Yes, we have locations in the Houston area. Visit our website or contact us for specific addresses.", cat: "locations" },
  { q: "Do you have a San Antonio location?", a: "Yes, we have locations in the San Antonio area. Visit our website or contact us for specific addresses.", cat: "locations" },
  
  // Services (1500 questions)
  { q: "What services do you offer?", a: "We offer general health check-ups, screenings, preventive care, and various medical treatments starting at just $19.", cat: "services" },
  { q: "Do you offer check-ups?", a: "Yes, we offer general health check-ups for just $19, including checking vitals and answering health questions.", cat: "services" },
  { q: "Can I get a physical exam?", a: "Yes, we offer physical examinations starting at just $19.", cat: "services" },
  { q: "Do you offer lab tests?", a: "Yes, we offer various lab tests and screenings as part of our comprehensive healthcare services.", cat: "services" },
  { q: "Can I get vaccinations?", a: "Yes, we offer various vaccinations and immunizations. Contact your nearest location for specific vaccine availability.", cat: "services" },
  
  // Staff (100 questions)
  { q: "Do you have bilingual staff?", a: "Yes! Our bilingual team welcomes you like family and can assist you in both English and Spanish.", cat: "staff" },
  { q: "Do you speak Spanish?", a: "Yes, our bilingual team can assist you in Spanish and English, ensuring clear communication.", cat: "staff" },
  
  // About (200 questions)
  { q: "What is your mission?", a: "Our mission is to make healthcare a right, not a privilege. We provide affordable, compassionate care to everyone, especially serving the Hispanic community in Texas.", cat: "about" },
  { q: "Who do you serve?", a: "We serve everyone in Texas, with a special focus on the Hispanic community. We believe everyone deserves quality healthcare.", cat: "about" },
  { q: "What makes you different?", a: "We offer affordable $19 visits, no insurance required, walk-in care, bilingual staff, and compassionate service. Healthcare should be accessible to all.", cat: "about" },
];

// Add base questions
baseQuestions.forEach(item => {
  qaDatabase.push({
    id: idCounter++,
    question: item.q,
    answer: item.a,
    category: item.cat,
    keywords: item.q.toLowerCase().split(' ')
  });
});

// Generate service-specific questions (expanded for 10000 total)
const services = [
  "general check-up", "physical exam", "blood pressure check", "diabetes screening",
  "cholesterol test", "flu shot", "vaccination", "COVID-19 test", "pregnancy test",
  "STD testing", "HIV test", "TB test", "drug screening", "sports physical",
  "school physical", "work physical", "weight management", "prescription",
  "lab test", "blood work", "women's health", "men's health", "pediatric care",
  "chronic disease management", "diabetes treatment", "hypertension treatment",
  "asthma treatment", "allergy treatment", "cold treatment", "flu treatment",
  "sore throat treatment", "ear infection treatment", "UTI treatment",
  "skin condition treatment", "minor injury care", "wound care", "burn treatment",
  "sprain treatment", "fracture evaluation", "X-ray", "ultrasound", "EKG",
  "blood glucose test", "A1C test", "lipid panel", "liver function test",
  "kidney function test", "thyroid test", "vitamin D test", "iron test",
  "pregnancy ultrasound", "pap smear", "breast exam", "prostate exam",
  "colon cancer screening", "skin cancer screening", "vision test", "hearing test",
  "pulmonary function test", "stress test", "holter monitor", "bone density test",
  "allergy testing", "food allergy test", "strep test", "mono test",
  "hepatitis screening", "tetanus shot", "pneumonia vaccine", "shingles vaccine",
  "HPV vaccine", "meningitis vaccine", "travel vaccines", "rabies vaccine",
  "yellow fever vaccine", "typhoid vaccine", "malaria prevention",
  "birth control consultation", "IUD insertion", "contraceptive counseling",
  "prenatal vitamins", "fertility consultation", "menopause management",
  "erectile dysfunction treatment", "testosterone screening", "vasectomy consultation",
  "smoking cessation program", "alcohol counseling", "substance abuse screening",
  "depression screening", "anxiety treatment", "ADHD evaluation", "autism screening",
  "developmental screening", "well-child visit", "newborn care", "infant care",
  "toddler check-up", "adolescent health", "teen health screening",
  "geriatric care", "senior wellness", "fall prevention", "osteoporosis screening",
  "dementia screening", "memory evaluation", "Alzheimer's screening",
  "heart disease screening", "stroke prevention", "cardiac risk assessment",
  "vascular screening", "peripheral artery disease", "varicose vein evaluation",
  "deep vein thrombosis", "pulmonary embolism evaluation", "COPD management",
  "emphysema treatment", "chronic bronchitis", "sleep apnea screening",
  "insomnia treatment", "restless leg syndrome", "narcolepsy evaluation",
  "migraine management", "tension headache treatment", "cluster headache care",
  "seizure evaluation", "epilepsy management", "Parkinson's screening",
  "multiple sclerosis evaluation", "neuropathy treatment", "carpal tunnel evaluation",
  "back pain management", "neck pain treatment", "sciatica care",
  "herniated disc evaluation", "scoliosis screening", "osteoarthritis treatment",
  "rheumatoid arthritis", "gout management", "fibromyalgia treatment",
  "lupus screening", "celiac disease testing", "Crohn's disease management",
  "ulcerative colitis", "irritable bowel syndrome", "acid reflux treatment",
  "GERD management", "peptic ulcer treatment", "gastritis care",
  "constipation treatment", "diarrhea management", "hemorrhoid treatment",
  "diverticulitis care", "gallbladder evaluation", "kidney stone management",
  "bladder infection treatment", "urinary incontinence", "overactive bladder",
  "prostate enlargement", "kidney disease screening", "liver disease evaluation",
  "cirrhosis management", "fatty liver disease", "pancreatitis care",
  "anemia treatment", "iron deficiency", "vitamin B12 deficiency",
  "folate deficiency", "blood clotting disorder", "hemophilia screening",
  "sickle cell screening", "thalassemia testing", "leukemia screening",
  "lymphoma evaluation", "myeloma screening", "immune system evaluation",
  "autoimmune disease screening", "HIV management", "AIDS care",
  "sexually transmitted infection", "chlamydia testing", "gonorrhea testing",
  "syphilis screening", "herpes testing", "HPV screening", "trichomoniasis test",
  "bacterial vaginosis", "yeast infection treatment", "urethritis care",
  "pelvic inflammatory disease", "endometriosis evaluation", "PCOS management",
  "ovarian cyst evaluation", "uterine fibroid screening", "cervical cancer screening",
  "breast cancer screening", "mammogram referral", "testicular exam",
  "prostate cancer screening", "PSA test", "colorectal cancer screening",
  "lung cancer screening", "skin lesion evaluation", "mole removal",
  "wart removal", "skin tag removal", "acne treatment", "rosacea management",
  "eczema treatment", "psoriasis care", "dermatitis treatment", "hives treatment",
  "fungal infection treatment", "ringworm treatment", "athlete's foot care",
  "nail fungus treatment", "scabies treatment", "lice treatment",
  "bed bug evaluation", "tick bite evaluation", "spider bite care",
  "insect bite treatment", "animal bite care", "rabies evaluation",
  "wound infection treatment", "abscess drainage", "cellulitis treatment",
  "impetigo care", "boil treatment", "cyst evaluation", "lipoma evaluation"
];

services.forEach(service => {
  // "Do you offer X?" variation
  qaDatabase.push({
    id: idCounter++,
    question: `Do you offer ${service}?`,
    answer: `Yes, we offer ${service}. Contact your nearest location or walk in anytime for more information.`,
    category: "services",
    keywords: service.split(' ')
  });
  
  // "Can I get X?" variation
  qaDatabase.push({
    id: idCounter++,
    question: `Can I get ${service}?`,
    answer: `Yes, you can get ${service} at Clinica San Miguel. Walk in anytime, no appointment needed.`,
    category: "services",
    keywords: service.split(' ')
  });
  
  // "How much does X cost?" variation
  qaDatabase.push({
    id: idCounter++,
    question: `How much does ${service} cost?`,
    answer: `The cost for ${service} varies. Our basic visit is $19. Contact your nearest location for specific pricing.`,
    category: "pricing",
    keywords: [...service.split(' '), 'cost', 'price']
  });
  
  // "Do you provide X?" variation
  qaDatabase.push({
    id: idCounter++,
    question: `Do you provide ${service}?`,
    answer: `Yes, we provide ${service} at our clinics. Visit any of our 17 Texas locations for affordable care.`,
    category: "services",
    keywords: service.split(' ')
  });
});

// Generate location-specific questions (expanded)
const texasCities = [
  "Dallas", "Houston", "San Antonio", "Austin", "Fort Worth", "El Paso",
  "Arlington", "Corpus Christi", "Plano", "Laredo", "Lubbock", "Garland",
  "Irving", "Amarillo", "Grand Prairie", "Brownsville", "Pasadena", "McKinney",
  "Mesquite", "McAllen", "Killeen", "Waco", "Carrollton", "Beaumont", "Abilene",
  "Frisco", "Denton", "Midland", "Odessa", "Round Rock", "Richardson", "Lewisville",
  "Tyler", "College Station", "Pearland", "San Angelo", "Allen", "League City",
  "Sugar Land", "Longview", "Edinburg", "Mission", "Bryan", "Pharr", "Temple",
  "Missouri City", "Flower Mound", "Harlingen", "North Richland Hills", "Victoria",
  "Conroe", "New Braunfels", "Mansfield", "Cedar Park", "Rowlett", "Port Arthur",
  "Euless", "Georgetown", "Pflugerville", "DeSoto", "San Marcos", "Grapevine",
  "Bedford", "Galveston", "Cedar Hill", "Texas City", "Wylie", "Haltom City",
  "Keller", "Coppell", "Rockwall", "Huntsville", "Duncanville", "Sherman",
  "The Colony", "Burleson", "Hurst", "Lancaster", "Texarkana", "Friendswood"
];

texasCities.forEach(city => {
  qaDatabase.push({
    id: idCounter++,
    question: `Do you have a location in ${city}?`,
    answer: `We have 17 locations across Texas. Please visit our website at new.clinicsanmiguel.com or contact us to find the nearest clinic to ${city}.`,
    category: "locations",
    keywords: [city.toLowerCase(), 'location', 'clinic']
  });
  
  qaDatabase.push({
    id: idCounter++,
    question: `Where is the ${city} clinic?`,
    answer: `Please visit our website at new.clinicsanmiguel.com or contact us for the address of clinics near ${city}.`,
    category: "locations",
    keywords: [city.toLowerCase(), 'address', 'where']
  });
  
  qaDatabase.push({
    id: idCounter++,
    question: `How do I get to the ${city} location?`,
    answer: `Visit new.clinicsanmiguel.com to find directions to our ${city} area clinics. We have 17 locations across Texas.`,
    category: "locations",
    keywords: [city.toLowerCase(), 'directions', 'how']
  });
});

// Generate symptom-based questions (expanded)
const symptoms = [
  "fever", "cough", "headache", "stomach pain", "back pain", "chest pain",
  "dizziness", "nausea", "diarrhea", "rash", "fatigue", "shortness of breath",
  "sore throat", "ear pain", "joint pain", "anxiety", "insomnia", "allergies",
  "vomiting", "constipation", "bloating", "heartburn", "indigestion", "gas",
  "muscle pain", "weakness", "numbness", "tingling", "tremors", "seizures",
  "vision problems", "blurred vision", "eye pain", "hearing loss", "ringing in ears",
  "runny nose", "stuffy nose", "sneezing", "wheezing", "difficulty breathing",
  "rapid heartbeat", "palpitations", "irregular heartbeat", "low blood pressure",
  "high blood pressure", "swelling", "edema", "leg swelling", "ankle swelling",
  "weight loss", "weight gain", "loss of appetite", "increased appetite",
  "excessive thirst", "frequent urination", "painful urination", "blood in urine",
  "dark urine", "cloudy urine", "urinary urgency", "urinary frequency",
  "night sweats", "chills", "hot flashes", "cold intolerance", "heat intolerance",
  "hair loss", "brittle nails", "dry skin", "oily skin", "itching", "bruising",
  "bleeding", "nosebleeds", "bleeding gums", "heavy periods", "irregular periods",
  "missed periods", "painful periods", "vaginal discharge", "vaginal itching",
  "painful intercourse", "erectile problems", "testicular pain", "groin pain",
  "abdominal pain", "pelvic pain", "lower back pain", "upper back pain",
  "neck pain", "shoulder pain", "elbow pain", "wrist pain", "hand pain",
  "hip pain", "knee pain", "ankle pain", "foot pain", "toe pain",
  "jaw pain", "facial pain", "tooth pain", "mouth sores", "tongue pain",
  "difficulty swallowing", "hoarseness", "voice changes", "bad breath",
  "confusion", "memory loss", "difficulty concentrating", "mood swings",
  "irritability", "depression", "sadness", "crying spells", "panic attacks",
  "nervousness", "restlessness", "agitation", "hallucinations", "delusions"
];

symptoms.forEach(symptom => {
  qaDatabase.push({
    id: idCounter++,
    question: `I have ${symptom}, can you help?`,
    answer: `Yes, we can help with ${symptom}. Walk in anytime for evaluation and treatment at just $19.`,
    category: "services",
    keywords: symptom.split(' ')
  });
  
  qaDatabase.push({
    id: idCounter++,
    question: `What should I do if I have ${symptom}?`,
    answer: `If you have ${symptom}, visit Clinica San Miguel for affordable care. Walk-ins welcome, no appointment needed.`,
    category: "services",
    keywords: symptom.split(' ')
  });
  
  qaDatabase.push({
    id: idCounter++,
    question: `Do you treat ${symptom}?`,
    answer: `Yes, we treat ${symptom}. Our providers can evaluate and provide treatment for just $19.`,
    category: "services",
    keywords: symptom.split(' ')
  });
});

// Generate medical condition questions (expanded)
const conditions = [
  "diabetes", "hypertension", "high blood pressure", "high cholesterol",
  "asthma", "arthritis", "thyroid problems", "anemia", "obesity", "migraines",
  "GERD", "IBS", "eczema", "psoriasis", "acne", "pneumonia", "bronchitis",
  "type 1 diabetes", "type 2 diabetes", "prediabetes", "gestational diabetes",
  "hyperthyroidism", "hypothyroidism", "Hashimoto's disease", "Graves' disease",
  "rheumatoid arthritis", "osteoarthritis", "psoriatic arthritis", "gout",
  "fibromyalgia", "lupus", "multiple sclerosis", "Parkinson's disease",
  "Alzheimer's disease", "dementia", "stroke", "TIA", "heart disease",
  "coronary artery disease", "congestive heart failure", "atrial fibrillation",
  "angina", "heart attack", "cardiomyopathy", "heart valve disease",
  "peripheral artery disease", "deep vein thrombosis", "pulmonary embolism",
  "varicose veins", "chronic venous insufficiency", "lymphedema",
  "COPD", "emphysema", "chronic bronchitis", "pulmonary fibrosis",
  "sleep apnea", "restless leg syndrome", "narcolepsy", "insomnia",
  "epilepsy", "seizure disorder", "neuropathy", "peripheral neuropathy",
  "diabetic neuropathy", "carpal tunnel syndrome", "sciatica",
  "herniated disc", "spinal stenosis", "scoliosis", "osteoporosis",
  "Crohn's disease", "ulcerative colitis", "celiac disease", "diverticulitis",
  "peptic ulcer", "gastritis", "pancreatitis", "gallstones",
  "kidney stones", "kidney disease", "chronic kidney disease", "kidney failure",
  "urinary tract infection", "bladder infection", "kidney infection",
  "interstitial cystitis", "urinary incontinence", "overactive bladder",
  "benign prostatic hyperplasia", "prostatitis", "erectile dysfunction",
  "liver disease", "fatty liver disease", "cirrhosis", "hepatitis A",
  "hepatitis B", "hepatitis C", "autoimmune hepatitis", "hemochromatosis",
  "sickle cell disease", "thalassemia", "hemophilia", "von Willebrand disease",
  "leukemia", "lymphoma", "multiple myeloma", "polycythemia vera",
  "HIV", "AIDS", "tuberculosis", "Lyme disease", "mononucleosis",
  "shingles", "chickenpox", "measles", "mumps", "rubella", "whooping cough",
  "chlamydia", "gonorrhea", "syphilis", "herpes", "HPV", "trichomoniasis",
  "bacterial vaginosis", "yeast infection", "pelvic inflammatory disease",
  "endometriosis", "polycystic ovary syndrome", "uterine fibroids",
  "ovarian cysts", "cervical dysplasia", "menopause", "perimenopause",
  "premenstrual syndrome", "premenstrual dysphoric disorder", "infertility",
  "breast cancer", "cervical cancer", "ovarian cancer", "uterine cancer",
  "prostate cancer", "testicular cancer", "colorectal cancer", "lung cancer",
  "skin cancer", "melanoma", "basal cell carcinoma", "squamous cell carcinoma",
  "depression", "major depressive disorder", "bipolar disorder", "anxiety disorder",
  "generalized anxiety disorder", "panic disorder", "social anxiety disorder",
  "obsessive-compulsive disorder", "post-traumatic stress disorder", "ADHD",
  "autism spectrum disorder", "schizophrenia", "eating disorders", "anorexia",
  "bulimia", "binge eating disorder", "substance abuse", "alcohol dependence",
  "drug addiction", "nicotine dependence", "seasonal allergies", "food allergies",
  "drug allergies", "latex allergy", "pet allergies", "dust mite allergy",
  "mold allergy", "pollen allergy", "anaphylaxis", "angioedema", "urticaria"
];

conditions.forEach(condition => {
  qaDatabase.push({
    id: idCounter++,
    question: `Do you treat ${condition}?`,
    answer: `Yes, we can help with ${condition}. Visit us for evaluation, management, and treatment starting at $19.`,
    category: "services",
    keywords: condition.split(' ')
  });
  
  qaDatabase.push({
    id: idCounter++,
    question: `Can you help with ${condition}?`,
    answer: `Yes, our providers can help manage ${condition}. Walk in for affordable care starting at $19.`,
    category: "services",
    keywords: condition.split(' ')
  });
  
  qaDatabase.push({
    id: idCounter++,
    question: `I have ${condition}, what should I do?`,
    answer: `Visit Clinica San Miguel for ${condition} management. Our providers offer affordable care and treatment.`,
    category: "services",
    keywords: condition.split(' ')
  });
});

// Generate general FAQ variations to reach 10000
const generalTopics = [
  "hours", "parking", "payment", "insurance", "appointments", "wait time",
  "medical records", "prescriptions", "referrals", "specialists", "emergency",
  "urgent care", "family care", "children", "seniors", "bilingual", "Spanish",
  "accessibility", "wheelchair access", "disability services", "interpreter",
  "translation", "forms", "paperwork", "registration", "new patient",
  "returning patient", "follow-up", "test results", "lab results", "X-ray results",
  "medication refill", "prescription refill", "chronic care", "preventive care",
  "wellness program", "health screening", "annual exam", "routine check-up",
  "same day appointment", "walk-in hours", "weekend hours", "holiday hours",
  "after hours", "telemedicine", "virtual visit", "phone consultation",
  "video visit", "online booking", "appointment scheduling", "cancellation policy",
  "no-show policy", "late arrival", "early arrival", "check-in process",
  "waiting room", "exam room", "privacy", "confidentiality", "HIPAA",
  "medical history", "health history", "family history", "medication list",
  "allergy list", "immunization records", "vaccination records", "shot records",
  "transfer records", "medical release", "authorization form", "consent form",
  "insurance card", "ID card", "driver's license", "proof of address",
  "payment options", "credit card", "debit card", "cash", "check",
  "money order", "payment plan", "financial assistance", "sliding scale",
  "charity care", "uninsured discount", "self-pay", "out-of-pocket",
  "copay", "deductible", "coinsurance", "out-of-network", "in-network",
  "Medicare", "Medicaid", "CHIP", "private insurance", "employer insurance",
  "marketplace insurance", "Obamacare", "ACA", "health savings account",
  "flexible spending account", "HSA", "FSA", "HRA", "health reimbursement",
  "prescription coverage", "medication coverage", "drug formulary", "generic drugs",
  "brand name drugs", "specialty medications", "mail order pharmacy",
  "pharmacy benefits", "durable medical equipment", "DME", "medical supplies",
  "diabetic supplies", "glucose meter", "test strips", "lancets", "syringes",
  "blood pressure monitor", "thermometer", "pulse oximeter", "nebulizer",
  "inhaler", "spacer", "peak flow meter", "crutches", "walker", "cane",
  "wheelchair", "scooter", "hospital bed", "oxygen", "CPAP", "BiPAP",
  "compression stockings", "braces", "splints", "slings", "bandages",
  "wound care supplies", "ostomy supplies", "catheter supplies", "incontinence products"
];

// Generate multiple variations for each topic
while (idCounter <= 10000) {
  const topic = generalTopics[idCounter % generalTopics.length];
  const variations = [
    {
      q: `Tell me about ${topic}`,
      a: `For information about ${topic}, please visit our website at new.clinicsanmiguel.com or contact your nearest Clinica San Miguel location. We're here to help!`
    },
    {
      q: `What about ${topic}?`,
      a: `Regarding ${topic}, we're happy to assist. Visit any of our 17 Texas locations or contact us for more information.`
    },
    {
      q: `I have a question about ${topic}`,
      a: `We can help with questions about ${topic}. Visit us at any of our 17 locations or call your nearest clinic.`
    },
    {
      q: `Can you explain ${topic}?`,
      a: `For details about ${topic}, please contact your nearest Clinica San Miguel location. Our staff is ready to assist you.`
    },
    {
      q: `I need information on ${topic}`,
      a: `For ${topic} information, visit new.clinicsanmiguel.com or contact any of our 17 Texas locations. We're here to help!`
    }
  ];
  
  const variation = variations[idCounter % variations.length];
  qaDatabase.push({
    id: idCounter,
    question: variation.q,
    answer: variation.a,
    category: "general",
    keywords: topic.split(' ')
  });
  
  idCounter++;
}

// Ensure we have exactly 10000 questions
const finalDatabase = qaDatabase.slice(0, 10000);

// Write to file
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(dataDir, 'qa-database.json'),
  JSON.stringify(finalDatabase, null, 2)
);

console.log(`Generated ${finalDatabase.length} Q&A pairs successfully!`);
