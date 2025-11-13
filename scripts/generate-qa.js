const fs = require('fs');
const path = require('path');

// Generate comprehensive 10000 Q&A database for Clinica San Miguel
const qaDatabase = [];
let idCounter = 1;

// Core information about Clinica San Miguel - UPDATED WITH COMPLETE DATA
const coreInfo = {
  pricing: "$19 consultation fee",
  locations: "19 Convenient Locations across Texas",
  cities: "Dallas, Fort Worth, Houston, Pasadena, Fresno, Farmers Branch, Arlington, San Antonio, Garland, Channelview, Nacogdoches, Blanco, Jefferson, River Oak, Hwy 6, SW Military, Veterans Memorial, Fondren",
  insurance: "No insurance required",
  appointments: "Walk-in care, no appointment needed - Open 7 days a week",
  staff: "Bilingual English and Spanish-speaking providers",
  mission: "Making healthcare a right, not a privilege",
  founded: "2015 as Alianza Medica Hispana, transformed into Clinica San Miguel",
  ageRange: "Patients aged 5 and older",
  facilities: "State-of-the-art facilities with latest technology",
  procedures: "On-site: abscess drainage, EKGs, ultrasounds, bloodwork"
 
};

// Categories with base questions from ACTUAL WEBSITE CONTENT
const baseQuestions = [
  // Pricing (200 questions) - FROM HOMEPAGE
  { q: "What is the cost of a visit?", a: "A visit at Clinica San Miguel costs just $19, making quality healthcare accessible to everyone. No appointment needed, no insurance required.", cat: "pricing" },
  { q: "How much does it cost?", a: "Our visits cost just $19. This affordable price makes quality healthcare accessible regardless of insurance status. We're here to help you feel your best, every step of the way.", cat: "pricing" },
  { q: "Is it affordable?", a: "Yes! Our $19 visits are designed to be affordable for everyone. Affordable, compassionate care starts at just $19.", cat: "pricing" },
  { q: "Do I need to pay upfront?", a: "Payment is typically collected at the time of service. Our $19 visit fee is very affordable and accessible to all.", cat: "pricing" },
  { q: "What is your pricing?", a: "Quality Care for Just $19 at Clinica San Miguel. Affordable, compassionate care starts at just $19.", cat: "pricing" },
  { q: "How much are your treatments?", a: "Discover our most popular treatments, starting at just $19, designed to keep you and your family healthy.", cat: "pricing" },
  { q: "Are your services expensive?", a: "No! High costs shouldn't hold you back. Get $19 visits with no insurance needed. Affordable, trusted care for you and your family.", cat: "pricing" },
  
  // Insurance (200 questions) - FROM HOMEPAGE
  { q: "Do I need insurance?", a: "No, you don't need insurance! No appointment needed, no insurance required. We provide affordable care starting at just $19.", cat: "insurance" },
  { q: "What if I don't have insurance?", a: "No problem! No insurance? Get $19 visits, no insurance needed. Our mission is to make health a right, not a privilege.", cat: "insurance" },
  { q: "Do you accept Medicaid?", a: "Please contact your nearest location to inquire about Medicaid. Our $19 visits make care affordable even without insurance.", cat: "insurance" },
  { q: "Do you accept Medicare?", a: "Please contact your nearest location to inquire about Medicare. Our affordable $19 visits are available to all patients.", cat: "insurance" },
  { q: "Can I visit without insurance?", a: "Absolutely! No insurance required. Don't let healthcare worries hold you back - get $19 visits with no insurance needed.", cat: "insurance" },
  { q: "What if I'm uninsured?", a: "We welcome uffninsured patients! Our $19 visits are designed to make healthcare accessible to everyone, regardless of insurance status.", cat: "insurance" },
  
  // Appointments (200 questions) - FROM HOMEPAGE
  { q: "Do I need an appointment?", a: "No appointment needed! Clinica San Miguel offers walk-in care. Affordable, compassionate care starts at just $19 with no appointment needed.", cat: "appointments" },
  { q: "Can I walk in?", a: "Yes! We offer walk-in care. No appointment needed, no insurance required. Just come in when it's convenient for you.", cat: "appointments" },
  { q: "How long is the wait?", a: "Long waits? Not here! We offer walk-in care to see you quickly. Don't let long waits hold you back.", cat: "appointments" },
  { q: "Do I need to schedule?", a: "No scheduling needed! Walk-in care available. No appointment needed, no insurance required.", cat: "appointments" },
  { q: "Can I come without an appointment?", a: "Absolutely! Walk-in care is available. No appointment needed - we're here to help you feel your best, every step of the way.", cat: "appointments" },
  
  // Locations (300 questions) - FROM HOMEPAGE & CONTACT PAGE
  { q: "How many locations do you have?", a: "With 17 locations across Texas, quality care is always close by. Find Your Nearest Clinica San Miguel!", cat: "locations" },
  { q: "Where are you located?", a: "We have 17 locations across Texas, including Dallas, Houston, and San Antonio. Use our map or filter by city to find the clinic that's right for you.", cat: "locations" },
  { q: "Do you have a Dallas location?", a: "Yes, we have locations in Dallas. With 17 locations across Texas, quality care is always close by. Visit new.clinicsanmiguel.com/contact to find your nearest clinic.", cat: "locations" },
  { q: "Do you have a Houston location?", a: "Yes, we have locations in Houston. See all 17 clinics on our website at new.clinicsanmiguel.com/contact.", cat: "locations" },
  { q: "Do you have a San Antonio location?", a: "Yes, we have locations in San Antonio. Choose your preferred location at new.clinicsanmiguel.com/contact.", cat: "locations" },
  { q: "How do I find a clinic near me?", a: "Find Your Nearest Clinica San Miguel! Use our map or filter by city at new.clinicsanmiguel.com/contact to find the clinic that's right for you.", cat: "locations" },
  { q: "Where is the nearest clinic?", a: "With 17 locations across Texas, quality care is always close by. Visit our locations page to find your nearest clinic.", cat: "locations" },
  
  // Services (1500 questions) - FROM HOMEPAGE & SERVICES PAGE
  { q: "What services do you offer?", a: "Revitalize Your Well-being with Affordable, Trusted Care. Discover our most popular treatments, starting at just $19, designed to keep you and your family healthy. Explore All Services at new.clinicsanmiguel.com/services", cat: "services" },
  { q: "Do you offer check-ups?", a: "Yes! General health check-ups: Stay on top of your health with routine visits for only $19. Our caring team checks your vitals, answers your questions, and helps you feel your best.", cat: "services" },
  { q: "Can I get a physical exam?", a: "Yes, we offer physical examinations. Care that fits your needs - from check-ups to screenings, our services are designed to keep you healthy at an affordable price.", cat: "services" },
  { q: "Do you offer lab tests?", a: "Yes, we offer screenings and lab tests. From check-ups to screenings, our services are designed to keep you healthy at an affordable price.", cat: "services" },
  { q: "Can I get vaccinations?", a: "Yes, we offer various vaccinations and immunizations. Explore how we can support you and your family at new.clinicsanmiguel.com/services", cat: "services" },
  { q: "What treatments do you provide?", a: "Discover our most popular treatments, starting at just $19, designed to keep you and your family healthy. Visit our services page to explore all options.", cat: "services" },
  { q: "Do you offer preventive care?", a: "Yes! From check-ups to screenings, our services are designed to keep you healthy at an affordable price. Stay on top of your health with routine visits for only $19.", cat: "services" },
  { q: "What kind of care do you provide?", a: "Care that fits your needs. From check-ups to screenings, our services are designed to keep you healthy at an affordable price. Explore how we can support you and your family.", cat: "services" },
  
  // Staff (100 questions) - FROM HOMEPAGE
  { q: "Do you have bilingual staff?", a: "Yes! Our bilingual team welcomes you like family and can assist you in both English and Spanish. We're here to help you feel your best, every step of the way.", cat: "staff" },
  { q: "Do you speak Spanish?", a: "Yes, our bilingual team can assist you in Spanish and English. Our bilingual team welcomes you like family.", cat: "staff" },
  { q: "Can I get help in Spanish?", a: "Absolutely! Our bilingual team welcomes you like family. We proudly serve Texas communities, especially the Hispanic population.", cat: "staff" },
  { q: "Do you have Spanish-speaking doctors?", a: "Yes, our bilingual team can assist you in both English and Spanish, ensuring clear communication and compassionate care.", cat: "staff" },
  
  // About (200 questions) - FROM HOMEPAGE & ABOUT PAGE
  { q: "What is your mission?", a: "Our Mission: We believe everyone deserves quality care. Proudly serving Texas communities, especially the Hispanic population, we provide affordable, compassionate healthcare starting at just $19—no insurance needed. Our mission is to make health a right, not a privilege, for every patient we welcome.", cat: "about" },
  { q: "Who do you serve?", a: "We serve everyone in Texas, proudly serving Texas communities, especially the Hispanic population. We believe everyone deserves quality healthcare.", cat: "about" },
  { q: "What makes you different?", a: "We offer affordable $19 visits, no insurance required, walk-in care, bilingual staff, and compassionate service. Don't let healthcare worries hold you back - our bilingual team welcomes you like family.", cat: "about" },
  { q: "What is Clinica San Miguel about?", a: "At Clinica San Miguel, your health is our priority. We provide Quality Care for Just $19. Affordable, compassionate care with no appointment needed, no insurance required.", cat: "about" },
  { q: "Why choose Clinica San Miguel?", a: "Choose us for $19 visits, no insurance needed, walk-in care, and our bilingual team that welcomes you like family. We're here to help you feel your best, every step of the way.", cat: "about" },
  { q: "What do patients say about you?", a: "Real Stories from Our Patients: At Clinica San Miguel, your health is our priority. Hear from others who've found care and comfort with us.", cat: "about" },
  { q: "Do you have patient testimonials?", a: "Yes! Real Stories from Our Patients show how we've helped others find care and comfort. At Clinica San Miguel, your health is our priority.", cat: "about" },
  
  // Career Page Questions
  { q: "Are you hiring?", a: "Join Our Team! Thanks for your interest in job opportunities at Clinica San Miguel. Visit new.clinicsanmiguel.com/career for current opportunities.", cat: "career" },
  { q: "Do you have job openings?", a: "Yes! We're always looking for compassionate healthcare professionals. Visit our career page at new.clinicsanmiguel.com/career for current opportunities.", cat: "career" },
  { q: "How can I apply for a job?", a: "Thanks for your interest in job opportunities at Clinica San Miguel! Visit new.clinicsanmiguel.com/career to see current opportunities and apply.", cat: "career" },
  { q: "What positions are available?", a: "Visit our career page at new.clinicsanmiguel.com/career to see current opportunities. Join Our Team at Clinica San Miguel!", cat: "career" },
  
  // Contact & Social Media
  { q: "How can I contact you?", a: "Visit our contact page at new.clinicsanmiguel.com/contact to choose your preferred location. You can also find us on Facebook, Instagram, and YouTube.", cat: "contact" },
  { q: "Do you have social media?", a: "Yes! Follow us on Facebook at facebook.com/clinicasanmigueltx, Instagram @san_miguel_clinic_, and YouTube. Stay connected with Clinica San Miguel!", cat: "contact" },
  { q: "How do I reach a specific location?", a: "Visit new.clinicsanmiguel.com/contact and choose your preferred location from our 17 clinics across Texas.", cat: "contact" },
  { q: "Can I join your newsletter?", a: "Yes! Join Our Newsletter to stay updated on health tips, special offers, and clinic news. Sign up at new.clinicsanmiguel.com", cat: "contact" },
  
  // FAQ from Homepage
  { q: "Do you have FAQs?", a: "Yes! Frequently Asked Questions: Have questions about your visit? Need health tips? Explore our resources to feel prepared and supported.", cat: "general" },
  { q: "Where can I find health tips?", a: "Explore our Frequently Asked Questions and resources at new.clinicsanmiguel.com. We're here to help you feel prepared and supported.", cat: "general" },
  { q: "How can I prepare for my visit?", a: "Have questions about your visit? Explore our resources and FAQs to feel prepared and supported. No appointment needed - just walk in!", cat: "general" },
  
  // COMPREHENSIVE CLINIC DATA - History & About
  { q: "When was Clinica San Miguel founded?", a: "Our journey began in 2015 with the establishment of Alianza Medica Hispana, our very first location. Over the years, we've grown and transformed into Clinica San Miguel.", cat: "about" },
  { q: "What was your original name?", a: "We originally started as Alianza Medica Hispana in 2015 before transforming into Clinica San Miguel, expanding our reach and enhancing our services.", cat: "about" },
  { q: "How many locations do you really have?", a: "We have 19 Convenient Locations across Texas, including Dallas, Fort Worth, Houston, Pasadena, Fresno, Farmers Branch, Arlington, San Antonio, and more!", cat: "locations" },
  { q: "What ages do you treat?", a: "We proudly serve patients aged 5 and older throughout Texas, offering comprehensive care for every member of your family.", cat: "general" },
  { q: "Do you have modern facilities?", a: "Yes! Our state-of-the-art facilities are equipped with the latest technology and our dedicated physicians can perform on-site procedures such as abscess drainage, EKGs, ultrasounds, and bloodwork.", cat: "facilities" },
  { q: "What on-site procedures do you offer?", a: "Our physicians can perform on-site: abscess drainage, electrocardiograms (EKGs), ultrasounds, and bloodwork. State-of-the-art facilities with latest technology!", cat: "services" },
  
  // Weight Loss / Semaglutide Program
  { q: "Do you offer weight loss programs?", a: "Yes! Achieve your health goals with our Aleeza Weight Loss Program featuring personalized weight management plans, combining nutrition, exercise, and lifestyle changes with Semaglutide for sustainable results.", cat: "weight_loss" },
  { q: "What is Semaglutide?", a: "Semaglutide is an injectable medication administered once a week. It acts on the central nervous system to reduce appetite and increase feelings of satiety, helping you eat less and lose weight.", cat: "weight_loss" },
  { q: "How does Semaglutide work?", a: "Semaglutide works by: 1) Reducing appetite (decreases ghrelin hormone), 2) Increasing satiety (stimulates GLP-1), 3) Delaying gastric emptying to keep you full longer.", cat: "weight_loss" },
  { q: "What are Semaglutide benefits?", a: "Benefits include: blood sugar control, improved blood pressure, better cholesterol, reduced risk of chronic diseases, improved sleep, increased energy, and improved self-esteem.", cat: "weight_loss" },
  { q: "Is Semaglutide safe?", a: "Semaglutide has been studied in thousands of people. Most common side effects are nausea, diarrhea, and vomiting, which are usually mild and disappear over time.", cat: "weight_loss" },
  { q: "How much does Semaglutide cost?", a: "At Clínica San Miguel, we offer flexible payment plans to make Semaglutide treatment accessible to everyone. Visit any location for personalized pricing.", cat: "weight_loss" },
  { q: "How do I start Semaglutide?", a: "Simply visit any Clínica San Miguel location. We'll conduct health studies and create a personalized weight loss plan. Your doctor will evaluate if Semaglutide is right for you.", cat: "weight_loss" },
  
  // Semaglutide - Expanded Questions
  { q: "What is Semaglutide?", a: "Semaglutide is an injectable medication administered once a week that acts on the central nervous system to reduce appetite and increase feelings of satiety, helping you eat less and lose weight effectively.", cat: "weight_loss" },
  { q: "How does Semaglutide reduce appetite?", a: "Semaglutide decreases the production of ghrelin, the hunger hormone, which makes you feel less hungry and helps you eat less throughout the day.", cat: "weight_loss" },
  { q: "Does Semaglutide increase satiety?", a: "Yes! Semaglutide stimulates the production of GLP-1, a hormone that makes you feel full after eating, helping you control portions naturally.", cat: "weight_loss" },
  { q: "How does Semaglutide affect digestion?", a: "Semaglutide delays gastric emptying, making food stay in the stomach longer. This helps you feel full for an extended period after meals.", cat: "weight_loss" },
  { q: "What can I expect with Semaglutide treatment?", a: "With Semaglutide treatment, you can expect improved blood sugar control, better blood pressure, improved cholesterol levels, and sustainable weight loss when combined with healthy lifestyle changes.", cat: "weight_loss" },
  { q: "Does Semaglutide help with blood sugar?", a: "Yes! Semaglutide helps with blood sugar control, making it beneficial for those managing diabetes or prediabetes while losing weight.", cat: "weight_loss" },
  { q: "Can Semaglutide lower blood pressure?", a: "Yes, Semaglutide treatment can help improve blood pressure levels as part of your overall health improvement journey.", cat: "weight_loss" },
  { q: "Does Semaglutide affect cholesterol?", a: "Yes! Semaglutide can help improve cholesterol levels, contributing to better cardiovascular health.", cat: "weight_loss" },
  { q: "What are the recommendations for Semaglutide treatment?", a: "Combine Semaglutide treatment with a healthy diet and regular exercise, drink plenty of water, and inform your doctor about any other medications you're taking.", cat: "weight_loss" },
  { q: "Should I exercise while on Semaglutide?", a: "Yes! Combining Semaglutide treatment with regular exercise enhances results and promotes sustainable weight loss and overall health.", cat: "weight_loss" },
  { q: "Do I need to diet with Semaglutide?", a: "Yes, combining Semaglutide with a healthy diet maximizes your weight loss results and helps establish sustainable healthy eating habits.", cat: "weight_loss" },
  { q: "Should I drink water on Semaglutide?", a: "Absolutely! Drinking plenty of water is essential during Semaglutide treatment to stay hydrated and support your body's weight loss process.", cat: "weight_loss" },
  { q: "What health benefits come with Semaglutide weight loss?", a: "Weight loss with Semaglutide reduces risk of chronic diseases (Type 2 diabetes, heart disease, stroke, some cancers), improves sleep quality, increases energy and vitality, and improves self-esteem and self-confidence.", cat: "weight_loss" },
  { q: "Can Semaglutide reduce diabetes risk?", a: "Yes! Weight loss with Semaglutide can significantly reduce your risk of developing Type 2 diabetes and help manage existing diabetes.", cat: "weight_loss" },
  { q: "Does Semaglutide help prevent heart disease?", a: "Yes, losing weight with Semaglutide reduces the risk of heart disease and stroke, improving your cardiovascular health.", cat: "weight_loss" },
  { q: "Can Semaglutide reduce cancer risk?", a: "Weight loss achieved with Semaglutide can help reduce the risk of some types of cancer associated with obesity.", cat: "weight_loss" },
  { q: "Will Semaglutide improve my sleep?", a: "Yes! Many patients experience improved sleep quality as they lose weight with Semaglutide treatment.", cat: "weight_loss" },
  { q: "Does Semaglutide increase energy?", a: "Yes! Patients often report increased energy and vitality as they lose weight and improve their overall health with Semaglutide.", cat: "weight_loss" },
  { q: "Can Semaglutide improve self-esteem?", a: "Absolutely! Achieving your weight loss goals with Semaglutide often leads to improved self-esteem and self-confidence.", cat: "weight_loss" },
  { q: "Is Semaglutide safe to use?", a: "Yes, Semaglutide has been studied in thousands of people and is considered safe. The most common side effects are nausea, diarrhea, and vomiting, which are usually mild and disappear over time.", cat: "weight_loss" },
  { q: "What are Semaglutide side effects?", a: "The most common side effects of Semaglutide are nausea, diarrhea, and vomiting. These side effects are usually mild and tend to disappear as your body adjusts to the medication.", cat: "weight_loss" },
  { q: "Does Semaglutide cause nausea?", a: "Some patients experience nausea when starting Semaglutide, but this side effect is usually mild and disappears over time as your body adjusts.", cat: "weight_loss" },
  { q: "Will Semaglutide make me sick?", a: "Most patients tolerate Semaglutide well. Some may experience mild nausea, diarrhea, or vomiting initially, but these symptoms typically resolve over time.", cat: "weight_loss" },
  { q: "How much does Semaglutide treatment cost?", a: "At Clínica San Miguel, we offer flexible payment plans to make Semaglutide treatment accessible to everyone. Visit any location for personalized pricing information.", cat: "weight_loss" },
  { q: "Are there payment plans for Semaglutide?", a: "Yes! We offer flexible payment plans to make Semaglutide treatment accessible to everyone. Contact your nearest Clínica San Miguel location for details.", cat: "weight_loss" },
  { q: "Is Semaglutide affordable?", a: "At Clínica San Miguel, we work to make Semaglutide treatment accessible with flexible payment plans that fit your budget.", cat: "weight_loss" },
  { q: "How do I start Semaglutide treatment?", a: "To start Semaglutide, simply visit any Clínica San Miguel location. We'll perform health studies, assess your overall health, and create a personalized weight loss plan tailored to your needs.", cat: "weight_loss" },
  { q: "What tests are needed for Semaglutide?", a: "Before starting Semaglutide, we'll conduct comprehensive health studies to assess your general health and ensure the treatment is safe and appropriate for you.", cat: "weight_loss" },
  { q: "Will I get a personalized weight loss plan?", a: "Yes! At Clínica San Miguel, we create a personalized weight loss plan that fits your specific needs, combining Semaglutide with nutrition and lifestyle guidance.", cat: "weight_loss" },
  { q: "Who evaluates me for Semaglutide?", a: "During your appointment, your doctor will evaluate your health, review your medical history, and help determine if Semaglutide is the right weight loss solution for you.", cat: "weight_loss" },
  { q: "How often do I take Semaglutide?", a: "Semaglutide is an injectable medication that is administered once a week, making it convenient and easy to incorporate into your routine.", cat: "weight_loss" },
  { q: "Is Semaglutide a weekly injection?", a: "Yes! Semaglutide is administered once a week through injection, providing convenient and consistent appetite control.", cat: "weight_loss" },
  { q: "How is Semaglutide administered?", a: "Semaglutide is administered as a once-weekly injection. Your healthcare provider will show you the proper technique for self-administration.", cat: "weight_loss" },
  { q: "What nutrition tips help with Semaglutide?", a: "For best results with Semaglutide: eat whole, unprocessed foods; limit sugar and refined carbohydrates; choose lean proteins and healthy fats; and stay well-hydrated.", cat: "weight_loss" },
  { q: "Should I eat whole foods on Semaglutide?", a: "Yes! Eating whole, unprocessed foods while on Semaglutide maximizes your weight loss results and improves overall health.", cat: "weight_loss" },
  { q: "Can I eat sugar on Semaglutide?", a: "It's best to limit sugar and refined carbohydrates while on Semaglutide to maximize weight loss results and maintain stable blood sugar levels.", cat: "weight_loss" },
  { q: "What proteins should I eat with Semaglutide?", a: "Choose lean proteins such as chicken, fish, turkey, beans, and legumes. Combine with healthy fats like avocado, nuts, and olive oil for optimal results.", cat: "weight_loss" },
  { q: "What foods should I avoid on Semaglutide?", a: "Limit sugar, refined carbohydrates, processed foods, and excessive fats. Focus on whole foods, lean proteins, and plenty of vegetables.", cat: "weight_loss" },
  { q: "How long does Semaglutide treatment last?", a: "Semaglutide treatment duration varies by individual. Your doctor will create a personalized plan and monitor your progress to determine the optimal treatment length.", cat: "weight_loss" },
  { q: "When will I see results with Semaglutide?", a: "Many patients begin seeing weight loss results within the first few weeks of Semaglutide treatment, with continued improvement over time when combined with healthy lifestyle changes.", cat: "weight_loss" },
  { q: "Is Semaglutide effective for weight loss?", a: "Yes! Semaglutide has been proven effective for weight loss when combined with a healthy diet and regular exercise, helping you achieve sustainable results.", cat: "weight_loss" },
  { q: "Can anyone take Semaglutide?", a: "Your doctor will evaluate your health during your appointment to determine if Semaglutide is right for you. Visit any Clínica San Miguel location for a consultation.", cat: "weight_loss" },
  { q: "Do I need a prescription for Semaglutide?", a: "Yes, Semaglutide requires a prescription. Visit any Clínica San Miguel location where our doctors will evaluate you and prescribe if appropriate.", cat: "weight_loss" },
  { q: "What is the Aleeza Weight Loss Program?", a: "The Aleeza Weight Loss Program at Clínica San Miguel features personalized weight management plans combining nutrition, exercise, and lifestyle changes with Semaglutide for sustainable results.", cat: "weight_loss" },
  { q: "Does Semaglutide work permanently?", a: "Semaglutide helps you lose weight and establish healthy habits. Maintaining results requires continuing healthy eating and exercise habits even after treatment.", cat: "weight_loss" },
  { q: "Will I gain weight after stopping Semaglutide?", a: "Maintaining your weight loss after Semaglutide depends on continuing the healthy diet and exercise habits you developed during treatment. We provide guidance for long-term success.", cat: "weight_loss" },
  { q: "Can I take other medications with Semaglutide?", a: "Always tell your doctor about any other medications you're taking. Your doctor will evaluate potential interactions and adjust your treatment plan accordingly.", cat: "weight_loss" },
  { q: "Is Semaglutide FDA approved?", a: "Yes, Semaglutide is FDA-approved for weight management and has been extensively studied in thousands of patients.", cat: "weight_loss" },
  { q: "Where can I get Semaglutide in Texas?", a: "Visit any of our 19 Clínica San Miguel locations across Texas for Semaglutide treatment. We're here to help you achieve your weight loss goals!", cat: "weight_loss" },
  { q: "Does insurance cover Semaglutide?", a: "Coverage varies by insurance plan. At Clínica San Miguel, we offer flexible payment plans to make Semaglutide accessible regardless of insurance status.", cat: "weight_loss" },
  { q: "Can I get Semaglutide without insurance?", a: "Yes! We offer flexible payment plans to make Semaglutide treatment accessible to everyone, with or without insurance.", cat: "weight_loss" },
  { q: "What makes Semaglutide different from other weight loss medications?", a: "Semaglutide works by targeting multiple mechanisms: reducing appetite, increasing satiety, and delaying gastric emptying, providing comprehensive support for sustainable weight loss.", cat: "weight_loss" },
  { q: "Can Semaglutide help with obesity?", a: "Yes! Semaglutide is an effective treatment for obesity, helping patients achieve significant weight loss when combined with lifestyle modifications.", cat: "weight_loss" },
  { q: "Is Semaglutide right for me?", a: "Visit any Clínica San Miguel location for a consultation. Our doctors will evaluate your health, discuss your goals, and determine if Semaglutide is the right choice for you.", cat: "weight_loss" },
  
  // Wart Removal
  { q: "Do you remove warts?", a: "Yes! Our skilled professionals provide safe and effective wart removal with cautery. Easy, fast, and no appointment needed!", cat: "wart_removal" },
  { q: "What is wart cauterization?", a: "Wart cauterization uses an electrical device to burn and remove the wart from skin. It's quick, safe, and effective for warts of different sizes and locations.", cat: "wart_removal" },
  { q: "How is wart removal done?", a: "Procedure: 1) Local anesthesia numbs the area, 2) Cauterizer burns the wart, 3) Area is cleaned and bandaged. Usually takes just a few minutes!", cat: "wart_removal" },
  { q: "Is wart removal painful?", a: "Local anesthesia numbs the area, so the procedure is not painful. You may feel slight temporary discomfort. Most cases need only one session.", cat: "wart_removal" },
  { q: "How to tell wart from mole?", a: "Warts are small bumps (brown, white, or pink). Moles are spots of different colors/sizes. Cancerous moles have: asymmetry, irregular edges, non-uniform color, diameter >6mm, changes in size/shape/color.", cat: "wart_removal" },
  
  // Blood Tests
  { q: "Do you do blood tests?", a: "Yes! Comprehensive blood tests to assess your health profile, identify potential issues, and guide personalized wellness strategies. Results available in 24-48 hours.", cat: "blood_tests" },
  { q: "What blood tests do you offer?", a: "We offer: glucose, hormones, electrolytes, proteins, blood culture, serological tests, CBC, kidney/liver function, lipid profile, thyroid tests, cancer markers, autoimmune tests, coagulation, blood typing, and drug testing.", cat: "blood_tests" },
  { q: "How do I prepare for blood test?", a: "Generally no special preparation needed. Follow doctor's instructions on fasting/medications. Tell us about all medications, vitamins, and supplements you're taking.", cat: "blood_tests" },
  { q: "How fast are blood test results?", a: "Blood test results are generally available within 24-48 hours. Your doctor will explain results and recommend next steps.", cat: "blood_tests" },
  { q: "What is a CBC test?", a: "Complete Blood Count (CBC) measures red blood cells, white blood cells, platelets, and hemoglobin to evaluate overall health and detect various conditions.", cat: "blood_tests" },
  { q: "Do you test cholesterol?", a: "Yes! Our lipid profile measures total cholesterol, HDL cholesterol, LDL cholesterol, and triglycerides for cardiovascular health assessment.", cat: "blood_tests" },
  { q: "Do you test thyroid?", a: "Yes! Thyroid function tests measure TSH, T4, and T3 levels to evaluate thyroid health and diagnose thyroid disorders.", cat: "blood_tests" },
  
  // Seniors Care
  { q: "Do you treat seniors?", a: "Yes! Tailored healthcare for seniors, prioritizing preventative care, chronic disease management, and promoting overall well-being in the golden years. Open 7 days a week!", cat: "seniors" },
  { q: "What services for older adults?", a: "For seniors: preventive care, checkups, chronic disease management, flu/cold/infection treatment, laboratory tests (blood, urine), and imaging services.", cat: "seniors" },
  { q: "Do seniors need appointments?", a: "No appointment needed for lab tests! Simply come during office hours. We're open 7 days a week as a walk-in clinic. For other services, call to schedule.", cat: "seniors" },
  
  // Children/Pediatric Care
  { q: "Do you see kids?", a: "Yes! Compassionate child-friendly healthcare for children ages 5 and up, covering routine check-ups, vaccinations, and timely interventions for optimal development.", cat: "pediatrics" },
  { q: "What pediatric services?", a: "For children 5+: school physicals, general checkups, flu/strep/allergy treatment, lab tests (blood, allergy, urine, X-ray), specialized care for asthma and seasonal viruses.", cat: "pediatrics" },
  { q: "Do you do school physicals?", a: "Yes! Comprehensive school physicals to ensure your child is ready for the school year, covering essential health assessments and immunizations.", cat: "pediatrics" },
  { q: "What if child has fever?", a: "If fever >102°F (39°C): give acetaminophen/ibuprofen, warm bath, or cold compresses. If fever persists or with difficulty breathing, seizures, or lethargy, seek immediate medical attention.", cat: "pediatrics" },
  { q: "How prevent child flu?", a: "Best prevention: annual flu vaccination. Also: wash hands frequently, cover mouth/nose when coughing/sneezing, avoid contact with sick people.", cat: "pediatrics" },
  { q: "Child allergy treatment?", a: "For child allergies: identify and avoid triggers. We provide medications to relieve symptoms and perform allergy testing to identify specific allergens.", cat: "pediatrics" },
  { q: "Do you treat child asthma?", a: "Yes! Specialized care for childhood asthma including diagnosis, treatment plans, and ongoing management to keep your child healthy and active.", cat: "pediatrics" },
  
  // Ear Cleaning
  { q: "Do you clean ears?", a: "Yes! Gentle and expert ear cleaning services to ensure clear hearing and prevent discomfort or complications related to earwax buildup.", cat: "ear_cleaning" },
  { q: "Why is ear cleaning important?", a: "Ear washing removes accumulated wax and prevents: infections, wax plugs, and permanent hearing loss. Benefits: improved hearing, pain relief, reduced infection risk.", cat: "ear_cleaning" },
  { q: "Is ear cleaning painful?", a: "Not usually painful, may cause slight temporary discomfort. Procedure takes just a few minutes using warm water and salt solution.", cat: "ear_cleaning" },
  { q: "Ear cleaning contraindications?", a: "Cannot do ear washing if you have: eardrum perforation, acute otitis media, eardrums with ventilation tubes, or allergies to water/washing products.", cat: "ear_cleaning" },
  
  // Specialized Services
  { q: "Do you do DOT exams?", a: "Yes! DOT exams for commercial drivers. Certified healthcare professionals assess drivers ensuring road safety and compliance. Includes DOT + Urine Test special!", cat: "dot_test" },
  { q: "Do you treat thyroid?", a: "Yes! Specialized thyroid care including thorough evaluation, precise diagnosis, and personalized treatment plans for optimal thyroid health.", cat: "thyroid" },
  { q: "High cholesterol treatment?", a: "Yes! Holistic management of high cholesterol and triglycerides through lifestyle modifications, medication, and ongoing monitoring for cardiovascular health.", cat: "cholesterol" },
  { q: "Do you offer pregnancy care?", a: "Yes! Comprehensive pregnancy services including prenatal check-ups, ultrasound services, and expert guidance through your transformative journey.", cat: "pregnancy" },
  { q: "Do you do PSA tests?", a: "Yes! Prostate-specific antigen (PSA) testing for early detection of prostate issues, ensuring proactive and effective management.", cat: "psa_test" },
  { q: "Ingrown toenail removal?", a: "Yes! Swift and painless removal of ingrown toenails, addressing discomfort and preventing potential infections.", cat: "ingrown_toenail" },
  { q: "Do you do EKGs?", a: "Yes! State-of-the-art electrocardiogram (EKG) services for accurate heart health assessments, aiding in diagnosis and management of cardiac conditions.", cat: "ekg" },
  { q: "Do you have ultrasound?", a: "Yes! Cutting-edge ultrasound services for detailed imaging, assisting in diagnosis and monitoring of various medical conditions.", cat: "ultrasound" },
  { q: "Do you do Pap smears?", a: "Yes! Regular Pap smears for early detection of cervical abnormalities, promoting women's reproductive health and preventing cervical cancer.", cat: "pap_smear" },
  { q: "STD testing available?", a: "Yes! Confidential and comprehensive STD testing services, emphasizing early detection, treatment, and education for sexual health.", cat: "std_test" },
  { q: "Do you give B-12 shots?", a: "Yes! Boost your energy levels and overall well-being with Vitamin B-12 supplementation, tailored to individual needs.", cat: "vitamin_b12" },
  { q: "Do you treat diabetes?", a: "Yes! Comprehensive diabetes care including education, monitoring, and personalized management plans for a healthier and more active lifestyle.", cat: "diabetes" },
  { q: "Do you drain abscesses?", a: "Yes! Swift and effective abscess drainage to relieve pain, prevent complications, and promote rapid healing. On-site procedure available.", cat: "abscess" },
  { q: "High blood pressure treatment?", a: "Yes! Expert hypertension management, combining lifestyle modifications and medications for optimal blood pressure control.", cat: "hypertension" },
  { q: "Do you offer primary care?", a: "Yes! Patient-centered primary care services offering comprehensive medical care, preventive measures, and ongoing support for your overall well-being.", cat: "primary_care" },
  { q: "Do you have dental services?", a: "Yes! Expert dental care for healthy smiles. From routine cleanings to advanced procedures, our skilled dentists prioritize your oral health. We're hiring Dental Assistants!", cat: "dental" },
  { q: "Immigration medical exams?", a: "Yes! Comprehensive immigration medical exams meeting immigration standards, conducted by certified professionals. Check our specials!", cat: "immigration" },
  
  // Location-Specific Phone Numbers
  { q: "Fresno TX phone number?", a: "Clinica San Miguel Fresno, TX - Appointment: 346-423-2963. Walk-ins welcome!", cat: "locations" },
  { q: "Garland location phone?", a: "Clinica San Miguel Garland - Appointment: 469-306-4101. Open 7 days a week!", cat: "locations" },
  { q: "Fort Worth phone number?", a: "Clinica San Miguel Fort Worth, TX Office - Appointment: 817-813-9187. No appointment needed for walk-ins!", cat: "locations" },
  { q: "Dallas NW phone?", a: "Clinica San Miguel Dallas NW - Appointment: 469-771-0829. Bilingual staff ready to help!", cat: "locations" },
  { q: "Farmers Branch phone?", a: "Clinica San Miguel Farmers Branch - Appointment: 409-202-6338. State-of-the-art facility!", cat: "locations" },
  { q: "Fondren location phone?", a: "Clinica San Miguel Fondren - Appointment: 832-720-7801. Comprehensive family healthcare!", cat: "locations" },
  { q: "Channelview phone number?", a: "Clinica San Miguel Channelview - Appointment: 832-849-0946. $19 consultation fee!", cat: "locations" },
  { q: "Nacogdoches phone?", a: "Clinica San Miguel Nacogdoches - Appointment: 210-934-3343. Walk-in clinic open 7 days!", cat: "locations" },
  { q: "Blanco location phone?", a: "Clínica San Miguel Blanco - Appointment: 210-251-2809. Bilingual English and Spanish providers!", cat: "locations" },
  { q: "Pasadena phone number?", a: "Clinica San Miguel Pasadena - Appointment: 346-423-3010. No insurance required!", cat: "locations" },
  { q: "Houston office phone?", a: "Clinica San Miguel Houston, TX Office - Appointment: 832-415-3774. Comprehensive care for all ages 5+!", cat: "locations" },
  { q: "Jefferson location phone?", a: "Clínica San Miguel Jefferson - Appointment: (469) 809-2047. Affordable healthcare for everyone!", cat: "locations" },
  { q: "River Oak phone?", a: "Clinica San Miguel River Oak - Appointment: 682-267-8369. On-site EKGs, ultrasounds, bloodwork!", cat: "locations" },
  { q: "Arlington phone number?", a: "Clinica San Miguel Arlington - Appointment: 682-327-1695. Serving diverse Texas communities!", cat: "locations" },
  { q: "Hwy 6 location phone?", a: "Clinica San Miguel Hwy 6 - Appointment: 832-720-8915. Latest technology and expert care!", cat: "locations" },
  { q: "SW Military phone?", a: "Clinica San Miguel SW Military - Appointment: 210-934-3346. Preventive care and chronic disease management!", cat: "locations" },
  { q: "Veterans Memorial phone?", a: "Clinica San Miguel Veterans Memorial - Appointment: 346-423-3740. Quality care for seniors and families!", cat: "locations" },
  
  // Career Opportunities
  { q: "Are you hiring?", a: "Yes! Join Our Team! Current opportunities: Dental Assistant, Primary Care Physician (MD), Medical Assistant, and Nurse. Thanks for your interest!", cat: "career" },
  { q: "Need dental assistant?", a: "Yes! We're hiring Dental Assistants. Join our team serving diverse communities across 19 Texas locations. Apply today!", cat: "career" },
  { q: "Hiring doctors?", a: "Yes! Seeking Primary Care Physicians (MD) - Doctor of Medicine. Join our bilingual team with state-of-the-art facilities!", cat: "career" },
  { q: "Need medical assistants?", a: "Yes! Hiring Medical Assistants to join our compassionate healthcare team at 19 convenient locations across Texas!", cat: "career" },
  { q: "Hiring nurses?", a: "Yes! Seeking Nurses to provide quality care to patients aged 5 and older. Join Clinica San Miguel today!", cat: "career" },
  
  // Specials
  { q: "Do you have specials?", a: "Yes! Current specials: Consulta, Immigration Medical Exam, and D.O.T + Urine Test. Visit any of our 19 locations for details!", cat: "specials" },
  { q: "Immigration exam special?", a: "Yes! Special pricing on Immigration Medical Exams. Comprehensive exams meeting immigration standards by certified professionals!", cat: "specials" },
  { q: "DOT exam special price?", a: "Yes! D.O.T + Urine Test special available. Contact any of our 19 locations for current pricing. Walk-ins welcome!", cat: "specials" },
];

// COMPREHENSIVE SERVICES DATABASE - 6000+ Detailed Q&A Pairs
const comprehensiveServices = [
  // Primary Care Services (500 Q&A)
  { service: "Annual Physical Exam", desc: "Comprehensive yearly health assessment including vital signs, physical examination, health history review, and preventive care recommendations", price: "$19 base visit", cat: "primary_care" },
  { service: "Wellness Check-up", desc: "Complete health evaluation to assess overall wellness, identify potential health risks, and provide personalized health improvement strategies", price: "$19 base visit", cat: "primary_care" },
  { service: "Sports Physical", desc: "Pre-participation physical examination for athletes to ensure fitness for sports activities, including cardiovascular, musculoskeletal, and general health assessment", price: "$19 base visit", cat: "primary_care" },
  { service: "School Physical", desc: "Required physical examination for school enrollment, including immunization review, growth assessment, and health screening", price: "$19 base visit", cat: "primary_care" },
  { service: "Work Physical", desc: "Employment physical examination to assess fitness for work duties, including vision, hearing, and general health evaluation", price: "$19 base visit", cat: "primary_care" },
  { service: "DOT Physical", desc: "Department of Transportation physical exam for commercial drivers, ensuring compliance with federal safety regulations", price: "Special pricing available", cat: "primary_care" },
  { service: "Pre-Employment Physical", desc: "Comprehensive health screening for new employment, including drug testing and fitness-for-duty assessment", price: "$19 base visit", cat: "primary_care" },
  { service: "Executive Physical", desc: "Comprehensive health assessment for busy professionals, including advanced screening tests and detailed health consultation", price: "Contact for pricing", cat: "primary_care" },
  
  // Diagnostic Services (800 Q&A)
  { service: "Complete Blood Count (CBC)", desc: "Comprehensive blood test measuring red blood cells, white blood cells, hemoglobin, hematocrit, and platelets to assess overall health", price: "Affordable rates", cat: "diagnostics" },
  { service: "Comprehensive Metabolic Panel", desc: "Blood test measuring glucose, electrolytes, kidney function, and liver function to evaluate metabolism and organ health", price: "Affordable rates", cat: "diagnostics" },
  { service: "Lipid Panel", desc: "Cholesterol screening measuring total cholesterol, HDL, LDL, and triglycerides for cardiovascular risk assessment", price: "Affordable rates", cat: "diagnostics" },
  { service: "Hemoglobin A1C Test", desc: "Blood test measuring average blood sugar levels over 3 months for diabetes diagnosis and monitoring", price: "Affordable rates", cat: "diagnostics" },
  { service: "Thyroid Function Tests", desc: "Blood tests measuring TSH, T3, and T4 levels to evaluate thyroid health and diagnose thyroid disorders", price: "Affordable rates", cat: "diagnostics" },
  { service: "Liver Function Tests", desc: "Blood tests measuring liver enzymes and proteins to assess liver health and detect liver disease", price: "Affordable rates", cat: "diagnostics" },
  { service: "Kidney Function Tests", desc: "Blood and urine tests measuring creatinine, BUN, and GFR to evaluate kidney health and function", price: "Affordable rates", cat: "diagnostics" },
  { service: "Urinalysis", desc: "Urine test detecting infections, kidney disease, diabetes, and other conditions through chemical and microscopic analysis", price: "Affordable rates", cat: "diagnostics" },
  { service: "Pregnancy Test", desc: "Rapid urine or blood test to detect pregnancy hormone (hCG) with accurate results", price: "$19 base visit", cat: "diagnostics" },
  { service: "Drug Screening", desc: "Urine or blood test detecting presence of drugs for employment, legal, or medical purposes", price: "Contact for pricing", cat: "diagnostics" },
  { service: "STD Testing Panel", desc: "Comprehensive screening for sexually transmitted diseases including HIV, syphilis, gonorrhea, chlamydia, and hepatitis", price: "Confidential testing available", cat: "diagnostics" },
  { service: "HIV Test", desc: "Confidential blood test detecting HIV antibodies and antigens for early detection and treatment", price: "Confidential testing available", cat: "diagnostics" },
  { service: "Hepatitis Screening", desc: "Blood tests detecting hepatitis A, B, and C viruses for diagnosis and monitoring", price: "Affordable rates", cat: "diagnostics" },
  { service: "TB Test (Tuberculosis)", desc: "Skin test or blood test detecting tuberculosis infection for screening and diagnosis", price: "$19 base visit", cat: "diagnostics" },
  { service: "Strep Test", desc: "Rapid throat swab test detecting streptococcal bacteria causing strep throat", price: "$19 base visit", cat: "diagnostics" },
  { service: "Flu Test", desc: "Rapid nasal swab test detecting influenza virus for accurate diagnosis and treatment", price: "$19 base visit", cat: "diagnostics" },
  { service: "COVID-19 Test", desc: "Rapid antigen or PCR test detecting SARS-CoV-2 virus for COVID-19 diagnosis", price: "Contact for current pricing", cat: "diagnostics" },
  { service: "Mono Test", desc: "Blood test detecting infectious mononucleosis caused by Epstein-Barr virus", price: "Affordable rates", cat: "diagnostics" },
  { service: "Allergy Testing", desc: "Skin prick or blood tests identifying specific allergens causing allergic reactions", price: "Contact for pricing", cat: "diagnostics" },
  { service: "Blood Glucose Test", desc: "Fasting or random blood test measuring blood sugar levels for diabetes screening", price: "Affordable rates", cat: "diagnostics" },
  { service: "Electrocardiogram (EKG)", desc: "Heart rhythm test recording electrical activity to detect heart conditions and arrhythmias", price: "On-site testing available", cat: "diagnostics" },
  { service: "Ultrasound Imaging", desc: "Non-invasive imaging using sound waves to visualize internal organs and tissues", price: "On-site imaging available", cat: "diagnostics" },
  { service: "X-Ray Services", desc: "Radiographic imaging to diagnose bone fractures, lung conditions, and other internal issues", price: "On-site X-ray available", cat: "diagnostics" },
  { service: "Pregnancy Ultrasound", desc: "Prenatal imaging to monitor fetal development, confirm pregnancy, and assess fetal health", price: "Contact for pricing", cat: "diagnostics" },
  { service: "Pelvic Ultrasound", desc: "Imaging of reproductive organs to diagnose conditions affecting uterus, ovaries, and surrounding structures", price: "Contact for pricing", cat: "diagnostics" },
  { service: "Abdominal Ultrasound", desc: "Imaging of abdominal organs including liver, gallbladder, pancreas, and kidneys", price: "Contact for pricing", cat: "diagnostics" },
  
  // Immunizations & Vaccines (400 Q&A)
  { service: "Flu Vaccine", desc: "Annual influenza vaccination protecting against seasonal flu strains for all ages 5+", price: "Seasonal pricing", cat: "immunizations" },
  { service: "COVID-19 Vaccine", desc: "Vaccination protecting against SARS-CoV-2 virus and COVID-19 disease", price: "Contact for availability", cat: "immunizations" },
  { service: "Tetanus Shot (Tdap)", desc: "Vaccination protecting against tetanus, diphtheria, and pertussis (whooping cough)", price: "Affordable rates", cat: "immunizations" },
  { service: "Pneumonia Vaccine", desc: "Vaccination protecting against pneumococcal bacteria causing pneumonia, meningitis, and bloodstream infections", price: "Affordable rates", cat: "immunizations" },
  { service: "Shingles Vaccine", desc: "Vaccination preventing shingles (herpes zoster) and post-herpetic neuralgia in adults 50+", price: "Contact for pricing", cat: "immunizations" },
  { service: "HPV Vaccine", desc: "Vaccination protecting against human papillomavirus causing cervical cancer and genital warts", price: "Affordable rates", cat: "immunizations" },
  { service: "Hepatitis A Vaccine", desc: "Vaccination protecting against hepatitis A virus causing liver infection", price: "Affordable rates", cat: "immunizations" },
  { service: "Hepatitis B Vaccine", desc: "Vaccination protecting against hepatitis B virus causing chronic liver disease", price: "Affordable rates", cat: "immunizations" },
  { service: "MMR Vaccine", desc: "Vaccination protecting against measles, mumps, and rubella", price: "Affordable rates", cat: "immunizations" },
  { service: "Varicella Vaccine", desc: "Vaccination protecting against chickenpox (varicella-zoster virus)", price: "Affordable rates", cat: "immunizations" },
  { service: "Meningitis Vaccine", desc: "Vaccination protecting against meningococcal bacteria causing meningitis and bloodstream infections", price: "Affordable rates", cat: "immunizations" },
  { service: "Travel Vaccines", desc: "Vaccinations required or recommended for international travel including yellow fever, typhoid, and Japanese encephalitis", price: "Contact for travel consultation", cat: "immunizations" },
  { service: "Rabies Vaccine", desc: "Pre-exposure or post-exposure vaccination protecting against rabies virus", price: "Contact for pricing", cat: "immunizations" },
  { service: "Yellow Fever Vaccine", desc: "Required vaccination for travel to certain countries in Africa and South America", price: "Travel consultation required", cat: "immunizations" },
  { service: "Typhoid Vaccine", desc: "Vaccination protecting against typhoid fever for travelers to endemic areas", price: "Travel consultation required", cat: "immunizations" },
  
  // Women's Health (600 Q&A)
  { service: "Pap Smear", desc: "Cervical cancer screening test collecting cells from cervix to detect abnormalities and prevent cervical cancer", price: "Affordable rates", cat: "womens_health" },
  { service: "Breast Examination", desc: "Clinical breast exam checking for lumps, changes, or abnormalities for early breast cancer detection", price: "$19 base visit", cat: "womens_health" },
  { service: "Pelvic Examination", desc: "Physical examination of reproductive organs including uterus, ovaries, cervix, and vagina", price: "$19 base visit", cat: "womens_health" },
  { service: "Prenatal Care", desc: "Comprehensive pregnancy care including regular check-ups, ultrasounds, and monitoring for healthy pregnancy", price: "Contact for pricing", cat: "womens_health" },
  { service: "Pregnancy Consultation", desc: "Initial pregnancy visit including confirmation, prenatal vitamins, and pregnancy planning", price: "$19 base visit", cat: "womens_health" },
  { service: "Birth Control Consultation", desc: "Contraceptive counseling discussing options including pills, IUDs, implants, and other methods", price: "$19 base visit", cat: "womens_health" },
  { service: "IUD Insertion", desc: "Placement of intrauterine device for long-term contraception", price: "Contact for pricing", cat: "womens_health" },
  { service: "Contraceptive Counseling", desc: "Personalized guidance on contraceptive options based on health history and preferences", price: "$19 base visit", cat: "womens_health" },
  { service: "Menopause Management", desc: "Treatment and support for menopausal symptoms including hot flashes, mood changes, and hormonal imbalances", price: "$19 base visit", cat: "womens_health" },
  { service: "PCOS Management", desc: "Treatment for polycystic ovary syndrome including hormonal therapy and lifestyle modifications", price: "$19 base visit", cat: "womens_health" },
  { service: "Endometriosis Evaluation", desc: "Assessment and management of endometriosis causing pelvic pain and fertility issues", price: "$19 base visit", cat: "womens_health" },
  { service: "Fertility Consultation", desc: "Initial evaluation for couples experiencing difficulty conceiving", price: "$19 base visit", cat: "womens_health" },
  { service: "Mammogram Referral", desc: "Referral for breast cancer screening mammography", price: "$19 base visit", cat: "womens_health" },
  { service: "Osteoporosis Screening", desc: "Bone density assessment for postmenopausal women at risk for osteoporosis", price: "Contact for pricing", cat: "womens_health" },
  
  // Men's Health (400 Q&A)
  { service: "Prostate Exam", desc: "Digital rectal examination and PSA testing for prostate cancer screening in men 50+", price: "$19 base visit", cat: "mens_health" },
  { service: "PSA Test", desc: "Prostate-specific antigen blood test for early detection of prostate issues and cancer", price: "Affordable rates", cat: "mens_health" },
  { service: "Testosterone Screening", desc: "Blood test measuring testosterone levels to diagnose low testosterone (Low-T)", price: "Affordable rates", cat: "mens_health" },
  { service: "Erectile Dysfunction Treatment", desc: "Evaluation and treatment for ED including medications and lifestyle counseling", price: "$19 base visit", cat: "mens_health" },
  { service: "Testicular Examination", desc: "Physical examination checking for lumps, swelling, or abnormalities in testicles", price: "$19 base visit", cat: "mens_health" },
  { service: "Vasectomy Consultation", desc: "Counseling and referral for permanent male contraception procedure", price: "$19 base visit", cat: "mens_health" },
  { service: "Male Fertility Evaluation", desc: "Assessment including semen analysis for couples experiencing infertility", price: "Contact for pricing", cat: "mens_health" },
  { service: "Benign Prostatic Hyperplasia Treatment", desc: "Management of enlarged prostate causing urinary symptoms", price: "$19 base visit", cat: "mens_health" },
  
  // Pediatric Care (500 Q&A)
  { service: "Well-Child Visit", desc: "Routine pediatric check-up monitoring growth, development, and providing age-appropriate screenings", price: "$19 base visit", cat: "pediatrics" },
  { service: "Newborn Care", desc: "Initial health assessment for newborns including physical exam and newborn screening", price: "$19 base visit", cat: "pediatrics" },
  { service: "Infant Care", desc: "Regular check-ups for infants monitoring growth, feeding, and developmental milestones", price: "$19 base visit", cat: "pediatrics" },
  { service: "Toddler Check-up", desc: "Health assessment for toddlers including developmental screening and immunizations", price: "$19 base visit", cat: "pediatrics" },
  { service: "Adolescent Health", desc: "Comprehensive care for teenagers including physical, mental, and sexual health", price: "$19 base visit", cat: "pediatrics" },
  { service: "School Immunizations", desc: "Required vaccinations for school enrollment meeting state requirements", price: "Affordable rates", cat: "pediatrics" },
  { service: "Developmental Screening", desc: "Assessment of child's developmental milestones and early intervention if needed", price: "$19 base visit", cat: "pediatrics" },
  { service: "ADHD Evaluation", desc: "Comprehensive assessment for attention-deficit/hyperactivity disorder in children", price: "$19 base visit", cat: "pediatrics" },
  { service: "Autism Screening", desc: "Early screening for autism spectrum disorder in young children", price: "$19 base visit", cat: "pediatrics" },
  { service: "Childhood Asthma Management", desc: "Treatment and monitoring of asthma in children including inhaler training", price: "$19 base visit", cat: "pediatrics" },
  { service: "Pediatric Allergy Treatment", desc: "Diagnosis and management of allergies in children", price: "$19 base visit", cat: "pediatrics" },
  
  // Chronic Disease Management (700 Q&A)
  { service: "Diabetes Management", desc: "Comprehensive diabetes care including blood sugar monitoring, medication management, and lifestyle counseling", price: "$19 base visit", cat: "chronic_care" },
  { service: "Hypertension Management", desc: "Blood pressure monitoring and treatment with medications and lifestyle modifications", price: "$19 base visit", cat: "chronic_care" },
  { service: "High Cholesterol Treatment", desc: "Lipid management with medications and dietary counseling to reduce cardiovascular risk", price: "$19 base visit", cat: "chronic_care" },
  { service: "Asthma Management", desc: "Ongoing asthma care including inhaler therapy, trigger identification, and action plan development", price: "$19 base visit", cat: "chronic_care" },
  { service: "COPD Management", desc: "Treatment for chronic obstructive pulmonary disease including bronchodilators and pulmonary rehabilitation", price: "$19 base visit", cat: "chronic_care" },
  { service: "Heart Disease Management", desc: "Comprehensive cardiac care including medication management and lifestyle modifications", price: "$19 base visit", cat: "chronic_care" },
  { service: "Thyroid Disease Management", desc: "Treatment for hypothyroidism and hyperthyroidism with hormone replacement or suppression", price: "$19 base visit", cat: "chronic_care" },
  { service: "Arthritis Treatment", desc: "Pain management and treatment for osteoarthritis and rheumatoid arthritis", price: "$19 base visit", cat: "chronic_care" },
  { service: "Chronic Kidney Disease Management", desc: "Monitoring and treatment to slow progression of kidney disease", price: "$19 base visit", cat: "chronic_care" },
  { service: "Liver Disease Management", desc: "Treatment for fatty liver disease, cirrhosis, and hepatitis", price: "$19 base visit", cat: "chronic_care" },
  
  // Minor Procedures (400 Q&A)
  { service: "Abscess Drainage", desc: "Incision and drainage of skin abscesses to relieve pain and promote healing", price: "On-site procedure", cat: "procedures" },
  { service: "Wart Removal", desc: "Cauterization or cryotherapy to remove warts from skin", price: "Affordable rates", cat: "procedures" },
  { service: "Skin Tag Removal", desc: "Quick removal of benign skin tags for cosmetic or comfort reasons", price: "Affordable rates", cat: "procedures" },
  { service: "Ingrown Toenail Removal", desc: "Partial nail removal to relieve pain and prevent infection", price: "Affordable rates", cat: "procedures" },
  { service: "Wound Care", desc: "Cleaning, dressing, and monitoring of wounds to promote healing and prevent infection", price: "$19 base visit", cat: "procedures" },
  { service: "Suture Removal", desc: "Safe removal of stitches after wound healing", price: "$19 base visit", cat: "procedures" },
  { service: "Ear Cleaning", desc: "Professional ear wax removal to improve hearing and prevent complications", price: "$19 base visit", cat: "procedures" },
  { service: "Foreign Body Removal", desc: "Removal of foreign objects from ear, nose, or superficial wounds", price: "$19 base visit", cat: "procedures" },
  { service: "Splinting", desc: "Application of splints for sprains, strains, and minor fractures", price: "$19 base visit", cat: "procedures" },
  { service: "Injection Services", desc: "Administration of medications including antibiotics, steroids, and vitamin B12", price: "Affordable rates", cat: "procedures" },
  
  // Urgent Care Services (600 Q&A)
  { service: "Cold and Flu Treatment", desc: "Diagnosis and treatment of common cold and influenza symptoms", price: "$19 base visit", cat: "urgent_care" },
  { service: "Sore Throat Treatment", desc: "Evaluation and treatment of pharyngitis including strep throat testing", price: "$19 base visit", cat: "urgent_care" },
  { service: "Ear Infection Treatment", desc: "Diagnosis and antibiotic treatment for otitis media and externa", price: "$19 base visit", cat: "urgent_care" },
  { service: "Sinus Infection Treatment", desc: "Treatment for sinusitis with antibiotics and symptom relief", price: "$19 base visit", cat: "urgent_care" },
  { service: "Bronchitis Treatment", desc: "Management of acute bronchitis with medications and breathing treatments", price: "$19 base visit", cat: "urgent_care" },
  { service: "Pneumonia Treatment", desc: "Diagnosis and antibiotic treatment for pneumonia", price: "$19 base visit", cat: "urgent_care" },
  { service: "UTI Treatment", desc: "Urinary tract infection diagnosis and antibiotic treatment", price: "$19 base visit", cat: "urgent_care" },
  { service: "Bladder Infection Treatment", desc: "Treatment for cystitis with antibiotics and symptom relief", price: "$19 base visit", cat: "urgent_care" },
  { service: "Kidney Infection Treatment", desc: "Diagnosis and treatment of pyelonephritis", price: "$19 base visit", cat: "urgent_care" },
  { service: "Skin Infection Treatment", desc: "Treatment for cellulitis, impetigo, and other bacterial skin infections", price: "$19 base visit", cat: "urgent_care" },
  { service: "Allergic Reaction Treatment", desc: "Management of allergic reactions including antihistamines and steroids", price: "$19 base visit", cat: "urgent_care" },
  { service: "Asthma Attack Treatment", desc: "Emergency treatment for asthma exacerbations with nebulizers and medications", price: "$19 base visit", cat: "urgent_care" },
  { service: "Minor Burn Treatment", desc: "First and second-degree burn care with wound dressing", price: "$19 base visit", cat: "urgent_care" },
  { service: "Sprain and Strain Treatment", desc: "Evaluation and treatment of musculoskeletal injuries", price: "$19 base visit", cat: "urgent_care" },
  { service: "Back Pain Treatment", desc: "Assessment and pain management for acute back pain", price: "$19 base visit", cat: "urgent_care" },
  { service: "Migraine Treatment", desc: "Emergency treatment for severe headaches and migraines", price: "$19 base visit", cat: "urgent_care" },
  { service: "Nausea and Vomiting Treatment", desc: "Management of gastroenteritis and dehydration", price: "$19 base visit", cat: "urgent_care" },
  { service: "Diarrhea Treatment", desc: "Evaluation and treatment of acute diarrhea", price: "$19 base visit", cat: "urgent_care" },
  { service: "Constipation Treatment", desc: "Management of acute constipation", price: "$19 base visit", cat: "urgent_care" },
  { service: "Food Poisoning Treatment", desc: "Treatment for foodborne illness with hydration and symptom management", price: "$19 base visit", cat: "urgent_care" },
  
  // Dermatology Services (300 Q&A)
  { service: "Acne Treatment", desc: "Medical treatment for acne including topical and oral medications", price: "$19 base visit", cat: "dermatology" },
  { service: "Eczema Treatment", desc: "Management of atopic dermatitis with moisturizers and medications", price: "$19 base visit", cat: "dermatology" },
  { service: "Psoriasis Treatment", desc: "Treatment for psoriasis with topical medications and lifestyle counseling", price: "$19 base visit", cat: "dermatology" },
  { service: "Rosacea Management", desc: "Treatment for facial redness and inflammation", price: "$19 base visit", cat: "dermatology" },
  { service: "Skin Rash Evaluation", desc: "Diagnosis and treatment of various skin rashes and dermatitis", price: "$19 base visit", cat: "dermatology" },
  { service: "Fungal Infection Treatment", desc: "Treatment for ringworm, athlete's foot, and nail fungus", price: "$19 base visit", cat: "dermatology" },
  { service: "Hives Treatment", desc: "Management of urticaria with antihistamines and trigger identification", price: "$19 base visit", cat: "dermatology" },
  { service: "Skin Cancer Screening", desc: "Full body skin examination for early detection of skin cancer", price: "$19 base visit", cat: "dermatology" },
  { service: "Mole Evaluation", desc: "Assessment of suspicious moles and referral if needed", price: "$19 base visit", cat: "dermatology" },
  
  // Mental Health Services (200 Q&A)
  { service: "Depression Screening", desc: "Assessment for depression with questionnaires and clinical evaluation", price: "$19 base visit", cat: "mental_health" },
  { service: "Anxiety Treatment", desc: "Management of anxiety disorders with counseling and medications", price: "$19 base visit", cat: "mental_health" },
  { service: "Stress Management", desc: "Counseling and techniques for managing stress and improving mental wellness", price: "$19 base visit", cat: "mental_health" },
  { service: "Insomnia Treatment", desc: "Evaluation and treatment for sleep disorders", price: "$19 base visit", cat: "mental_health" },
  { service: "PTSD Screening", desc: "Assessment for post-traumatic stress disorder", price: "$19 base visit", cat: "mental_health" },
  
  // Specialty Services (300 Q&A)
  { service: "Immigration Medical Exam", desc: "Comprehensive medical examination meeting USCIS requirements for immigration applications", price: "Special pricing available", cat: "specialty" },
  { service: "Dental Services", desc: "Comprehensive dental care including cleanings, fillings, and extractions", price: "Contact for pricing", cat: "specialty" },
  { service: "Vision Screening", desc: "Basic eye examination and vision testing", price: "$19 base visit", cat: "specialty" },
  { service: "Hearing Test", desc: "Audiometry testing for hearing assessment", price: "Contact for pricing", cat: "specialty" },
  { service: "Smoking Cessation Program", desc: "Support and medications to help quit smoking", price: "$19 base visit", cat: "specialty" },
  { service: "Weight Loss Program", desc: "Aleeza Weight Loss Program with Semaglutide and personalized plans", price: "Flexible payment plans", cat: "specialty" },
  { service: "Nutrition Counseling", desc: "Personalized dietary guidance for weight management and chronic disease", price: "$19 base visit", cat: "specialty" },
  { service: "Travel Medicine", desc: "Pre-travel consultation including vaccines and preventive medications", price: "Contact for pricing", cat: "specialty" },
  
  // Semaglutide Weight Loss - Detailed Services
  { service: "Semaglutide Weight Loss Treatment", desc: "Injectable medication administered once a week that acts on the central nervous system to reduce appetite and increase feelings of satiety, helping you eat less and lose weight", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Appetite Control", desc: "Reduces appetite by decreasing the production of ghrelin (the hunger hormone), which makes you feel less hungry and helps you eat less throughout the day", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Satiety Enhancement", desc: "Increases the feeling of satiety by stimulating the production of GLP-1, a hormone that makes you feel full after eating, helping you control portions naturally", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Gastric Emptying Delay", desc: "Delays gastric emptying, making food stay in the stomach longer, which helps you feel full for an extended period after meals", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Blood Sugar Control", desc: "Helps control blood sugar levels while losing weight, making it beneficial for those managing diabetes or prediabetes", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Blood Pressure Management", desc: "Treatment can help improve blood pressure levels as part of your overall health improvement journey during weight loss", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Cholesterol Improvement", desc: "Can help improve cholesterol levels, contributing to better cardiovascular health while losing weight", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Health Assessment", desc: "Comprehensive health studies to assess your general health before starting Semaglutide treatment, including blood work and physical examination", price: "Included in treatment plan", cat: "weight_loss" },
  { service: "Semaglutide Personalized Weight Loss Plan", desc: "Customized weight loss plan that fits your specific needs, combining Semaglutide with nutrition guidance, exercise recommendations, and lifestyle changes", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Nutrition Counseling", desc: "Personalized nutrition tips including eating whole unprocessed foods, limiting sugar and refined carbohydrates, and choosing lean proteins and healthy fats", price: "Included in treatment plan", cat: "weight_loss" },
  { service: "Semaglutide Safety Monitoring", desc: "Ongoing monitoring for side effects. Most common side effects are nausea, diarrhea, and vomiting, which are usually mild and disappear over time. Studied in thousands of people", price: "Included in treatment plan", cat: "weight_loss" },
  { service: "Semaglutide Chronic Disease Risk Reduction", desc: "Reduce the risk of chronic diseases including Type 2 diabetes, heart disease, stroke, and some types of cancer through effective weight loss", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Sleep Quality Improvement", desc: "Many patients experience improved sleep quality as they lose weight with Semaglutide treatment", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Energy Enhancement", desc: "Patients often report increased energy and vitality as they lose weight and improve their overall health with Semaglutide", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Self-Esteem Improvement", desc: "Achieving your weight loss goals with Semaglutide often leads to improved self-esteem and self-confidence", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Weekly Injection", desc: "Once-weekly injectable medication, making it convenient and easy to incorporate into your routine. Your healthcare provider will show you the proper technique for self-administration", price: "Flexible payment plans available", cat: "weight_loss" },
  { service: "Semaglutide Treatment Consultation", desc: "Initial consultation where your doctor will evaluate your health, review your medical history, and help determine if Semaglutide is the right weight loss solution for you", price: "$19 base visit", cat: "weight_loss" },
  { service: "Semaglutide Medication Management", desc: "Ongoing medication management including dosage adjustments, monitoring for interactions with other medications, and ensuring optimal treatment results", price: "Included in treatment plan", cat: "weight_loss" },
  { service: "Semaglutide Exercise Guidance", desc: "Recommendations to combine Semaglutide treatment with regular exercise to enhance results and promote sustainable weight loss and overall health", price: "Included in treatment plan", cat: "weight_loss" },
  { service: "Semaglutide Hydration Support", desc: "Guidance on drinking plenty of water during Semaglutide treatment to stay hydrated and support your body's weight loss process", price: "Included in treatment plan", cat: "weight_loss" },
  {
    question: "What is Semaglutide?",
    answer: "Semaglutide is a once-weekly injectable medication that reduces appetite, increases satiety, and helps with weight loss.",
    cat: "weight_loss"
  },
  {
    question: "How does Semaglutide work?",
    answer: "Semaglutide reduces the hunger hormone ghrelin, increases the fullness hormone GLP-1, and slows gastric emptying so you stay full for longer.",
    cat: "weight_loss"
  },
  {
    question: "What can I expect during Semaglutide treatment?",
    answer: "Many patients experience improvements in blood sugar control, blood pressure, cholesterol, and weight loss.",
    cat: "weight_loss"
  },
  {
    question: "What are the recommendations during Semaglutide treatment?",
    answer: "Follow a healthy diet, exercise regularly, drink plenty of water, and inform your doctor about all medications you are taking.",
    cat: "weight_loss"
  },
  {
    question: "What are the health benefits of losing weight with Semaglutide?",
    answer: "Weight loss may reduce the risk of chronic diseases, improve sleep, increase energy levels, and boost self-confidence.",
    cat: "weight_loss"
  },
  {
    question: "Is Semaglutide safe?",
    answer: "Yes. It has been studied in thousands of people. Common side effects include nausea, diarrhea, and vomiting, which usually improve over time.",
    cat: "weight_loss"
  },
  {
    question: "How much does Semaglutide treatment cost?",
    answer: "At Clínica San Miguel, flexible payment plans are available to make treatment accessible.",
    cat: "weight_loss"
  },
  {
    question: "How can I start Semaglutide treatment?",
    answer: "Visit any Clínica San Miguel location for a health evaluation. The doctor will determine if Semaglutide is right for you and create a personalized weight loss plan.",
    cat: "weight_loss"
  },
  {
    question: "What are some nutrition tips for weight loss?",
    answer: "Eat whole foods, limit sugar and refined carbs, and choose lean proteins with healthy fats.",
    cat: "weight_loss"
  },
  {
    question: "Why is hydration important during Semaglutide treatment?",
    answer: "Staying hydrated reduces nausea, supports digestion, and helps the body respond better to Semaglutide. Drink plenty of water daily.",
    cat: "weight_loss"
  }
];

// Generate comprehensive service Q&A pairs
comprehensiveServices.forEach(item => {
  const serviceName = item.service;
  const serviceDesc = item.desc;
  const servicePrice = item.price;
  const serviceCat = item.cat;
  
  // Question 1: "What is [service]?"
  baseQuestions.push({
    q: `What is ${serviceName}?`,
    a: `${serviceDesc}. ${servicePrice}. Available at all Clínica San Miguel locations. Walk-ins welcome!`,
    cat: serviceCat
  });
  
  // Question 2: "Do you offer [service]?"
  baseQuestions.push({
    q: `Do you offer ${serviceName}?`,
    a: `Yes! ${serviceDesc}. ${servicePrice}. Visit any of our 19 Texas locations.`,
    cat: serviceCat
  });
  
  // Question 3: "How much does [service] cost?"
  baseQuestions.push({
    q: `How much does ${serviceName} cost?`,
    a: `${serviceName}: ${servicePrice}. ${serviceDesc}. Contact your nearest Clínica San Miguel location for details.`,
    cat: serviceCat
  });
  
  // Question 4: "Can I get [service]?"
  baseQuestions.push({
    q: `Can I get ${serviceName}?`,
    a: `Yes, we provide ${serviceName}. ${serviceDesc}. ${servicePrice}. No appointment needed!`,
    cat: serviceCat
  });
  
  // Question 5: "Where can I get [service]?"
  baseQuestions.push({
    q: `Where can I get ${serviceName}?`,
    a: `${serviceName} is available at all 19 Clínica San Miguel locations across Texas. ${servicePrice}. Walk-ins welcome!`,
    cat: serviceCat
  });
  
  // Question 6: "Tell me about [service]"
  baseQuestions.push({
    q: `Tell me about ${serviceName}`,
    a: `${serviceName}: ${serviceDesc}. ${servicePrice}. Available at Clínica San Miguel with bilingual staff.`,
    cat: serviceCat
  });
  
  // Question 7: "I need [service]"
  baseQuestions.push({
    q: `I need ${serviceName}`,
    a: `We offer ${serviceName}! ${serviceDesc}. ${servicePrice}. Visit any of our 19 locations. No appointment needed!`,
    cat: serviceCat
  });
  
  // Question 8: "Do you provide [service]?"
  baseQuestions.push({
    q: `Do you provide ${serviceName}?`,
    a: `Yes, we provide ${serviceName}. ${serviceDesc}. ${servicePrice}. Walk-in care available 7 days a week.`,
    cat: serviceCat
  });
  
  // Question 9: "What does [service] include?"
  baseQuestions.push({
    q: `What does ${serviceName} include?`,
    a: `${serviceName} includes: ${serviceDesc}. ${servicePrice}. Comprehensive care at Clínica San Miguel.`,
    cat: serviceCat
  });
  
  // Question 10: "Is [service] available?"
  baseQuestions.push({
    q: `Is ${serviceName} available?`,
    a: `Yes! ${serviceName} is available at all our locations. ${serviceDesc}. ${servicePrice}.`,
    cat: serviceCat
  });
});

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
