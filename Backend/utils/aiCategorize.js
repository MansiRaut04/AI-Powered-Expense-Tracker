
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const VALID_CATEGORIES = ['Food','Travel','Bills','Shopping','Entertainment','Health',"Groceries",'Other'];

const categorizeExpense = async (description, retries = 2) => {
  const prompt = `Classify this expense into exactly one category: Food, Travel, Bills, Shopping, Entertainment, Health,Groceries, Other. Reply with only the category name, nothing else. Expense: ${description}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0,
      });

      const rawCategory = completion.choices[0].message.content.trim();

      return VALID_CATEGORIES.includes(rawCategory)
        ? { category: rawCategory, source: 'AI' }
        : { category: 'Other', source: 'AI' };
    } catch (err) {
      console.error(`AI attempt ${attempt + 1} failed:`, err.message);
      if (attempt < retries) await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return { category: 'Other', source: 'manual' };
};

module.exports = categorizeExpense;



module.exports = categorizeExpense;

