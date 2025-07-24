import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const englishA2Questions = [
  // Section 1: Articles & Countable/Uncountable Nouns
  {
    section: 'Articles & Countable/Uncountable Nouns',
    question: 'Choose the correct article: I need ___ information about the course.',
    options: ['A) a', 'B) an', 'C) the', 'D) no article'],
    correct: 3,
    explanation: "'Information' is an uncountable noun, meaning it cannot be counted individually and has no plural form. Uncountable nouns don't use 'a/an' and are treated as singular. Common uncountable nouns: water, money, advice, furniture, homework, music, news. Correct: 'I need information' (not 'an information' or 'informations')."
  },
  {
    section: 'Articles & Countable/Uncountable Nouns',
    question: 'Complete with the correct article: Can you pass me ___ sugar, please?',
    options: ['A) a', 'B) an', 'C) the', 'D) no article'],
    correct: 2,
    explanation: "'The' is the definite article used when both speaker and listener know exactly which item is being discussed. In this context, 'the sugar' refers to a specific sugar container that both people can see or know about. We use 'the' with: specific items, unique things (the sun), superlatives (the best), and when something has been mentioned before."
  },
  {
    section: 'Articles & Countable/Uncountable Nouns',
    question: 'Choose the correct sentence:',
    options: ['A) I bought a bread at the store.', 'B) I bought some bread at the store.', 'C) I bought breads at the store.', 'D) I bought the bread at the store.'],
    correct: 1,
    explanation: "'Bread' is an uncountable noun representing a substance rather than individual items. We cannot say 'a bread' or 'breads'. Use quantifiers like 'some', 'much', 'a lot of', or specific units like 'a loaf of bread', 'a slice of bread'. Other uncountable food items: rice, pasta, cheese, meat, milk."
  },
  {
    section: 'Articles & Countable/Uncountable Nouns',
    question: 'Complete with "a," "an," or "some": She wants ___ apple and ___ milk.',
    options: ['A) a, a', 'B) an, some', 'C) a, some', 'D) an, a'],
    correct: 1,
    explanation: "Use 'an' before singular countable nouns starting with vowel sounds (a, e, i, o, u). 'Apple' starts with /æ/ sound, so 'an apple'. 'Milk' is uncountable, so use 'some milk' (not 'a milk'). Remember: it's about sound, not spelling - 'an hour' (silent h), 'a university' (sounds like 'you')."
  },
  {
    section: 'Articles & Countable/Uncountable Nouns',
    question: 'Choose the correct quantifier: There isn\'t ___ coffee left.',
    options: ['A) some', 'B) any', 'C) a', 'D) many'],
    correct: 1,
    explanation: "'Any' is used in negative sentences and questions with both countable and uncountable nouns. In negatives: 'There isn't any coffee' (uncountable), 'There aren't any apples' (countable). In questions: 'Is there any milk?' 'Are there any cookies?' Use 'some' in positive statements and offers."
  },
  {
    section: 'Articles & Countable/Uncountable Nouns',
    question: 'Complete the sentence: How ___ money do you have?',
    options: ['A) many', 'B) much', 'C) some', 'D) any'],
    correct: 1,
    explanation: "Use 'How much' with uncountable nouns and 'How many' with countable nouns. 'Money' is uncountable (we count dollars, euros, etc., not 'moneys'). Examples: How much water? How much time? How much sugar? vs. How many books? How many people? How many cars? This is a fundamental grammar rule for questions about quantity."
  },
  {
    section: 'Articles & Countable/Uncountable Nouns',
    question: 'Choose the correct sentence:',
    options: ['A) I need some advices.', 'B) I need an advice.', 'C) I need some advice.', 'D) I need many advice.'],
    correct: 2,
    explanation: "'Advice' is uncountable, so we say 'some advice', not 'an advice' or 'advices'. Correct: 'I need some advice.'"
  },
  {
    section: 'Articles & Countable/Uncountable Nouns',
    question: 'Complete with the correct quantifier: There are ___ people in the park today.',
    options: ['A) much', 'B) many', 'C) a lot', 'D) few'],
    correct: 1,
    explanation: "'Many' is used with countable nouns (people, apples, books). Example: 'There are many people.'"
  },
  // Section 2: Gerunds & Infinitives
  {
    section: 'Gerunds & Infinitives',
    question: 'Choose the correct form: I enjoy ___ books in my free time.',
    options: ['A) read', 'B) reading', 'C) to read', 'D) reads'],
    correct: 1,
    explanation: "After 'enjoy', we use the gerund (verb+ing): 'I enjoy reading books.' Not 'enjoy to read'."
  },
  {
    section: 'Gerunds & Infinitives',
    question: 'Complete with the correct form: She decided ___ a new language.',
    options: ['A) learning', 'B) learn', 'C) to learn', 'D) learns'],
    correct: 2,
    explanation: "'Decide' is followed by the infinitive (to + verb): 'She decided to learn a new language.'"
  },
  {
    section: 'Gerunds & Infinitives',
    question: 'Choose the correct sentence:',
    options: ['A) I\'m good at to swim.', 'B) I\'m good at swimming.', 'C) I\'m good at swim.', 'D) I\'m good to swimming.'],
    correct: 1,
    explanation: "'Good at' is always followed by a gerund (verb+ing): 'I'm good at swimming.' Not 'good at to swim'."
  },
  {
    section: 'Gerunds & Infinitives',
    question: 'Complete the sentence: Would you mind ___ the window?',
    options: ['A) open', 'B) opening', 'C) to open', 'D) opens'],
    correct: 1,
    explanation: "'Would you mind' is followed by a gerund (verb+ing): 'Would you mind opening the window?'"
  },
  {
    section: 'Gerunds & Infinitives',
    question: 'Choose the correct form: I want ___ my homework before dinner.',
    options: ['A) finishing', 'B) finish', 'C) to finish', 'D) finished'],
    correct: 2,
    explanation: "'Want' is followed by the infinitive (to + verb): 'I want to finish my homework.'"
  },
  {
    section: 'Gerunds & Infinitives',
    question: 'Complete with the correct form: ___ exercise is good for your health.',
    options: ['A) Do', 'B) Doing', 'C) To do', 'D) Done'],
    correct: 1,
    explanation: "'Doing exercise' is correct because we use the gerund as the subject: 'Doing exercise is good for your health.'"
  },
  // Section 3: Modal Verbs - Must vs. Have to & Should
  {
    section: 'Modal Verbs',
    question: 'Choose the correct modal: You ___ wear a helmet when riding a bike. (It\'s the law)',
    options: ['A) should', 'B) must', 'C) have to', 'D) can'],
    correct: 1,
    explanation: "'Must' is used for strong obligation, especially laws and rules: 'You must wear a helmet.'"
  },
  {
    section: 'Modal Verbs',
    question: 'Complete with the correct modal: I ___ go to the doctor. I have an appointment.',
    options: ['A) must', 'B) should', 'C) have to', 'D) can'],
    correct: 2,
    explanation: "'Have to' expresses necessity, often from outside circumstances: 'I have to go to the doctor.'"
  },
  {
    section: 'Modal Verbs',
    question: 'Choose the correct advice: You ___ eat more vegetables. They\'re healthy.',
    options: ['A) must', 'B) have to', 'C) should', 'D) can'],
    correct: 2,
    explanation: "'Should' is used to give advice or recommendations: 'You should eat more vegetables.'"
  },
  {
    section: 'Modal Verbs',
    question: 'Make this sentence negative: "You must smoke here."',
    options: ['A) You mustn\'t smoke here.', 'B) You don\'t must smoke here.', 'C) You not must smoke here.', 'D) You no must smoke here.'],
    correct: 0,
    explanation: "The negative of 'must' is 'mustn't': 'You mustn't smoke here.' Not 'don't must.'"
  },
  {
    section: 'Modal Verbs',
    question: 'Choose the correct past form: Yesterday, I ___ work late.',
    options: ['A) must', 'B) had to', 'C) have to', 'D) should'],
    correct: 1,
    explanation: "The past of 'have to' is 'had to': 'Yesterday, I had to work late.' There is no past form for 'must.'"
  },
  {
    section: 'Modal Verbs',
    question: 'Complete with the correct modal: You ___ buy expensive clothes. Cheap ones are fine.',
    options: ['A) must', 'B) have to', 'C) shouldn\'t', 'D) can\'t'],
    correct: 2,
    explanation: "'Shouldn't' is used for negative advice: 'You shouldn't buy expensive clothes.'"
  },
  {
    section: 'Modal Verbs',
    question: 'Choose the correct question:',
    options: ['A) Do I must pay now?', 'B) Must I pay now?', 'C) Am I must pay now?', 'D) Should I must pay now?'],
    correct: 1,
    explanation: "For questions with 'must', invert subject and modal: 'Must I pay now?' Not 'Do I must...?'"
  },
  {
    section: 'Modal Verbs',
    question: 'Complete the sentence: Students ___ bring their own lunch. The school provides it.',
    options: ['A) must', 'B) have to', 'C) don\'t have to', 'D) mustn\'t'],
    correct: 2,
    explanation: "'Don't have to' means it is not necessary: 'Students don't have to bring lunch.' The school provides it."
  },
  // Section 4: Past Continuous Tense
  {
    section: 'Past Continuous',
    question: 'Choose the correct Past Continuous: I ___ TV when you called.',
    options: ['A) watched', 'B) was watching', 'C) were watching', 'D) watch'],
    correct: 1,
    explanation: "Past Continuous is 'was/were + verb-ing': 'I was watching TV.' It describes an action in progress in the past."
  },
  {
    section: 'Past Continuous',
    question: 'Complete with Past Continuous: They ___ dinner at 7 PM yesterday.',
    options: ['A) were having', 'B) was having', 'C) had', 'D) have'],
    correct: 0,
    explanation: "'Were having' is Past Continuous: 'They were having dinner at 7 PM yesterday.'"
  },
  {
    section: 'Past Continuous',
    question: 'Make this sentence negative: "She was reading a book."',
    options: ['A) She wasn\'t reading a book.', 'B) She didn\'t reading a book.', 'C) She not was reading a book.', 'D) She doesn\'t reading a book.'],
    correct: 0,
    explanation: "Negative Past Continuous: 'She wasn't reading a book.' Use 'wasn't/weren't + verb-ing.'"
  },
  {
    section: 'Past Continuous',
    question: 'Choose the correct question:',
    options: ['A) Were you studying last night?', 'B) Did you studying last night?', 'C) Was you studying last night?', 'D) Do you studying last night?'],
    correct: 0,
    explanation: "Question form: 'Were you studying last night?' Use 'were/was' before the subject."
  },
  {
    section: 'Past Continuous',
    question: 'Complete with the correct tense: While I ___ home, it started to rain.',
    options: ['A) walked', 'B) was walking', 'C) walk', 'D) am walking'],
    correct: 1,
    explanation: "'Was walking' is Past Continuous. 'While I was walking home, it started to rain.'"
  },
  {
    section: 'Past Continuous',
    question: 'Choose the correct sentence:',
    options: ['A) When I saw him, he played football.', 'B) When I saw him, he was playing football.', 'C) When I was seeing him, he played football.', 'D) When I was seeing him, he was playing football.'],
    correct: 1,
    explanation: "When one past action interrupts another, use Past Continuous for the longer action: 'he was playing football.'"
  },
  // Section 5: Common Phrasal Verbs & Possessives
  {
    section: 'Phrasal Verbs & Possessives',
    question: 'Choose the correct phrasal verb: Please ___ the lights when you leave.',
    options: ['A) turn off', 'B) turn on', 'C) turn up', 'D) turn down'],
    correct: 0,
    explanation: "'Turn off' means to stop the lights from working. Example: 'Please turn off the lights.'"
  },
  {
    section: 'Phrasal Verbs & Possessives',
    question: 'Complete with the correct phrasal verb: I need to ___ early tomorrow for my flight.',
    options: ['A) get up', 'B) get on', 'C) get off', 'D) get in'],
    correct: 0,
    explanation: "'Get up' means to leave your bed after sleeping: 'I need to get up early.'"
  },
  {
    section: 'Phrasal Verbs & Possessives',
    question: 'Choose the correct possessive: This is ___ car. (belonging to James)',
    options: ['A) James', 'B) James\'', 'C) James\'s', 'D) Jame\'s'],
    correct: 2,
    explanation: "Possessive for names ending in 's': 'James's car' is correct. Add 's after the name."
  },
  {
    section: 'Phrasal Verbs & Possessives',
    question: 'Complete with the correct possessive: The ___ toys are in the box. (belonging to the children)',
    options: ['A) children', 'B) children\'s', 'C) childrens\'', 'D) childrens'],
    correct: 1,
    explanation: "Possessive for plural nouns: 'children's toys' (toys belonging to the children). Add 's after the plural noun."
  },
  {
    section: 'Phrasal Verbs & Possessives',
    question: 'Choose the correct phrasal verb: Can you ___ this form, please?',
    options: ['A) fill in', 'B) fill up', 'C) fill out', 'D) Both A and C'],
    correct: 3,
    explanation: "Both 'fill in' and 'fill out' mean to complete a form. Example: 'Please fill in/out this form.'"
  },
  {
    section: 'Phrasal Verbs & Possessives',
    question: 'Complete with the correct phrasal verb: The meeting has been ___ until next week.',
    options: ['A) put off', 'B) put on', 'C) put up', 'D) put down'],
    correct: 0,
    explanation: "'Put off' means to postpone or delay something: 'The meeting has been put off.'"
  },
  {
    section: 'Phrasal Verbs & Possessives',
    question: 'Choose the correct possessive: I like ___ new hairstyle. (belonging to my sister)',
    options: ['A) my sister', 'B) my sisters', 'C) my sister\'s', 'D) my sisters\''],
    correct: 2,
    explanation: "Possessive for family: 'my sister's hairstyle' (the hairstyle belonging to my sister)."
  },
  {
    section: 'Phrasal Verbs & Possessives',
    question: 'Complete with the correct phrasal verb: Please ___ your coat. It\'s cold outside.',
    options: ['A) put on', 'B) put off', 'C) put up', 'D) put down'],
    correct: 0,
    explanation: "'Put on' means to wear: 'Put on your coat.' Not 'put off.'"
  },
  // Section 6: Present Perfect Simple
  {
    section: 'Present Perfect Simple',
    question: 'Choose the correct Present Perfect: I ___ never ___ to Japan.',
    options: ['A) have, go', 'B) have, been', 'C) has, been', 'D) had, been'],
    correct: 1,
    explanation: "Present Perfect: 'have/has been' is used for experiences: 'I have never been to Japan.'"
  },
  {
    section: 'Present Perfect Simple',
    question: 'Complete with Present Perfect: She ___ her homework yet.',
    options: ['A) hasn\'t finished', 'B) didn\'t finish', 'C) doesn\'t finish', 'D) wasn\'t finishing'],
    correct: 0,
    explanation: "Present Perfect negative: 'She hasn't finished her homework yet.' Use 'hasn't/ haven't + past participle.'"
  },
  {
    section: 'Present Perfect Simple',
    question: 'Choose the correct question: Have you ever ___ sushi?',
    options: ['A) ate', 'B) eaten', 'C) did eat', 'D) do eat'],
    correct: 1,
    explanation: "Present Perfect question: 'Have you ever eaten sushi?' Use 'have/has + subject + past participle.'"
  },
  {
    section: 'Present Perfect Simple',
    question: 'Complete with "for" or "since": They have lived here ___ 2010.',
    options: ['A) for', 'B) since', 'C) from', 'D) in'],
    correct: 1,
    explanation: "Use 'since' with a starting point (year, date): 'They have lived here since 2010.' Use 'for' with a period of time."
  },
  {
    section: 'Present Perfect Simple',
    question: 'Choose the correct sentence: I ___ seen this movie before.',
    options: ['A) have saw', 'B) have seen', 'C) has seen', 'D) had seen'],
    correct: 1,
    explanation: "Present Perfect: 'have seen' is correct: 'I have seen this movie before.'"
  },
  {
    section: 'Present Perfect Simple',
    question: 'Complete with Present Perfect: We ___ just ___ lunch.',
    options: ['A) have, had', 'B) has, had', 'C) have, have', 'D) had, had'],
    correct: 0,
    explanation: "Present Perfect: 'have had' is correct: 'We have just had lunch.'"
  },
  // Section 7: Wh- Questions, How Questions & Want/Would Like
  {
    section: 'Wh- & How Questions',
    question: 'Choose the correct Past Simple question: ___ did you go last weekend?',
    options: ['A) What', 'B) Where', 'C) When', 'D) Why'],
    correct: 1,
    explanation: "'Where did you go?' is the correct Past Simple question for place."
  },
  {
    section: 'Wh- & How Questions',
    question: 'Complete the question: ___ did the movie start?',
    options: ['A) What time', 'B) How time', 'C) Which time', 'D) Where time'],
    correct: 0,
    explanation: "'What time did...' is the correct way to ask about the time something happened."
  },
  {
    section: 'Wh- & How Questions',
    question: 'Choose the correct "How" question: ___ is it from here to the station?',
    options: ['A) How long', 'B) How far', 'C) How much', 'D) How many'],
    correct: 1,
    explanation: "'How far' is used to ask about distance: 'How far is it from here to the station?'"
  },
  {
    section: 'Wh- & How Questions',
    question: 'Complete with "want" or "would like": I ___ a cup of coffee, please. (polite request)',
    options: ['A) want', 'B) would like', 'C) wanted', 'D) wanting'],
    correct: 1,
    explanation: "'Would like' is more polite than 'want': 'I would like a cup of coffee, please.'"
  },
  {
    section: 'Wh- & How Questions',
    question: 'Choose the correct question: How often do you go to the gym?',
    options: ['A) How often do you go to the gym?', 'B) How much do you go to the gym?', 'C) How many do you go to the gym?', 'D) How long do you go to the gym?'],
    correct: 0,
    explanation: "'How often' is used to ask about frequency: 'How often do you go to the gym?'"
  },
  {
    section: 'Wh- & How Questions',
    question: 'Complete with the correct form: What ___ you ___ to do tonight?',
    options: ['A) do, want', 'B) are, want', 'C) do, wants', 'D) does, want'],
    correct: 0,
    explanation: "'Do you want' is the correct form: 'What do you want to do tonight?'"
  },
  {
    section: 'Wh- & How Questions',
    question: 'Choose the correct "How" question: ___ does this course cost?',
    options: ['A) How many', 'B) How much', 'C) How long', 'D) How often'],
    correct: 1,
    explanation: "'How much' is used to ask about price: 'How much does this course cost?'"
  },
  {
    section: 'Wh- & How Questions',
    question: 'Complete the polite request: ___ you like to join us for dinner?',
    options: ['A) Do', 'B) Are', 'C) Would', 'D) Will'],
    correct: 2,
    explanation: "'Would you like...' is a polite invitation: 'Would you like to join us for dinner?'"
  }
];

async function main() {
  console.log('Seeding English A2 Level exam...');

  // Check if exam already exists
  const existingExam = await prisma.exam.findFirst({
    where: { title: 'English A2 Level' }
  });

  if (existingExam) {
    console.log('English A2 Level exam already exists, skipping.');
    return;
  }

  // Create exam
  const exam = await prisma.exam.create({
    data: {
      title: 'English A2 Level',
    },
  });
  console.log('English A2 Level exam created, ID:', exam.id);

  // Add questions
  for (const q of englishA2Questions) {
    await prisma.question.create({
      data: {
        ...q,
        examId: exam.id,
      },
    });
  }
  console.log('All questions added.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 