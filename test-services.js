const data = require('./data/qa-database.json');

console.log('='.repeat(80));
console.log('COMPREHENSIVE SERVICES TEST - Clínica San Miguel Chatbot');
console.log('='.repeat(80));

// Test specific service categories
const testServices = [
  'Annual Physical Exam',
  'Complete Blood Count',
  'Flu Vaccine',
  'Pap Smear',
  'Prostate Exam',
  'Well-Child Visit',
  'Diabetes Management',
  'Abscess Drainage',
  'Cold and Flu Treatment',
  'Acne Treatment',
  'Depression Screening',
  'Immigration Medical Exam'
];

console.log('\n📋 TESTING SERVICE Q&A PAIRS:\n');
console.log('='.repeat(80));

testServices.forEach(service => {
  const serviceQuestions = data.filter(item => 
    item.question.includes(service) || item.answer.includes(service)
  );
  
  console.log(`\n🏥 ${service.toUpperCase()}`);
  console.log('-'.repeat(80));
  console.log(`Found ${serviceQuestions.length} Q&A pairs`);
  
  if (serviceQuestions.length > 0) {
    // Show first 3 questions for this service
    serviceQuestions.slice(0, 3).forEach((item, index) => {
      console.log(`\n  ${index + 1}. Q: ${item.question}`);
      console.log(`     A: ${item.answer.substring(0, 120)}...`);
      console.log(`     Category: ${item.category}`);
    });
  }
  console.log('-'.repeat(80));
});

// Category summary
console.log('\n\n📊 CATEGORY BREAKDOWN:\n');
console.log('='.repeat(80));

const categories = {};
data.forEach(item => {
  categories[item.category] = (categories[item.category] || 0) + 1;
});

// Sort by count
const sortedCategories = Object.entries(categories)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20); // Top 20 categories

sortedCategories.forEach(([cat, count]) => {
  const bar = '█'.repeat(Math.floor(count / 50));
  console.log(`${cat.padEnd(20)} : ${count.toString().padStart(4)} ${bar}`);
});

console.log('\n' + '='.repeat(80));
console.log(`✓ Total Q&A Pairs: ${data.length}`);
console.log(`✓ Total Categories: ${Object.keys(categories).length}`);
console.log('='.repeat(80));
