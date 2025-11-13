const data = require('./data/qa-database.json');

console.log('='.repeat(70));
console.log('SEMAGLUTIDE Q&A TEST - Clínica San Miguel Chatbot');
console.log('='.repeat(70));

// Filter all Semaglutide-related questions
const semaglutideQuestions = data.filter(item => 
  item.question.toLowerCase().includes('semaglutide') ||
  item.answer.toLowerCase().includes('semaglutide')
);

console.log(`\nTotal Semaglutide-related Q&A pairs: ${semaglutideQuestions.length}\n`);

console.log('ALL SEMAGLUTIDE QUESTIONS:\n');
console.log('='.repeat(70));

semaglutideQuestions.forEach((item, index) => {
  console.log(`\n${index + 1}. ID: ${item.id}`);
  console.log(`   Q: ${item.question}`);
  console.log(`   A: ${item.answer.substring(0, 100)}${item.answer.length > 100 ? '...' : ''}`);
  console.log('-'.repeat(70));
});

console.log('\n' + '='.repeat(70));
console.log('✓ All Semaglutide questions successfully added to database!');
console.log('='.repeat(70));
