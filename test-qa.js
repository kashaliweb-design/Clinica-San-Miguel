const data = require('./data/qa-database.json');

console.log('='.repeat(60));
console.log('CLINICA SAN MIGUEL CHATBOT - Q&A DATABASE');
console.log('='.repeat(60));
console.log(`\nTotal Q&A Pairs: ${data.length}\n`);

console.log('SAMPLE QUESTIONS FROM DATABASE:\n');

const samples = [0, 100, 500, 1000, 1500, 2000, 2500, 3000, 3500, 3999];

samples.forEach(i => {
  const item = data[i];
  console.log(`ID: ${item.id}`);
  console.log(`Q: ${item.question}`);
  console.log(`A: ${item.answer}`);
  console.log(`Category: ${item.category}`);
  console.log('-'.repeat(60));
});

// Category breakdown
const categories = {};
data.forEach(item => {
  categories[item.category] = (categories[item.category] || 0) + 1;
});

console.log('\nCATEGORY BREAKDOWN:\n');
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`${cat}: ${count} questions`);
});

console.log('\n' + '='.repeat(60));
console.log('Database generated successfully!');
console.log('='.repeat(60));
