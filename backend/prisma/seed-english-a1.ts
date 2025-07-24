import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const englishA1Questions = [
  // Section 1: To Be (Present) & Basic Grammar
  {
    section: 'To Be & Basic Grammar',
    question: 'Choose the correct form of "to be": I ___ a student.',
    options: ['A) am', 'B) is', 'C) are', 'D) be'],
    correct: 0,
    explanation: "The verb 'to be' has three forms in present tense: 'am' (with I), 'is' (with he/she/it), and 'are' (with you/we/they). Since the subject is 'I', we must use 'am'. Example: I am a student, I am happy, I am from Turkey."
  },
  {
    section: 'To Be & Basic Grammar',
    question: 'Make this sentence negative: "She is happy."',
    options: ['A) She not is happy.', "B) She isn't happy.", 'C) She no happy.', "D) She doesn't happy."],
    correct: 1,
    explanation: "To make negative sentences with 'to be', we add 'not' after the verb. 'She is happy' becomes 'She is not happy' or the contracted form 'She isn't happy'. The structure is: Subject + be + not + complement. Other examples: I am not tired, They are not here."
  },
  {
    section: 'To Be & Basic Grammar',
    question: 'Choose the correct question:',
    options: ['A) Are you from Turkey?', 'B) You are from Turkey?', 'C) Do you from Turkey?', 'D) Is you from Turkey?'],
    correct: 0,
    explanation: "To form questions with 'to be', we invert the subject and verb. Statement: 'You are from Turkey' → Question: 'Are you from Turkey?' The structure is: Be + subject + complement + ?. Other examples: Is she happy? Am I late? Are they students?"
  },
  {
    section: 'To Be & Basic Grammar',
    question: 'Complete with the correct possessive adjective: This is ___ book. (belonging to me)',
    options: ['A) my', 'B) mine', 'C) me', 'D) I'],
    correct: 0,
    explanation: "Possessive adjectives show ownership and come before nouns. 'My' is used with 'I' to show something belongs to me. The complete list: my (I), your (you), his (he), her (she), its (it), our (we), their (they). Examples: my book, your car, his house, her phone."
  },
  {
    section: 'To Be & Basic Grammar',
    question: 'How do you say this number: 15?',
    options: ['A) fifty', 'B) fifteen', 'C) fourteen', 'D) five'],
    correct: 1,
    explanation: "Numbers 13-19 end in '-teen': thirteen (13), fourteen (14), fifteen (15), sixteen (16), seventeen (17), eighteen (18), nineteen (19). Be careful with pronunciation: 'fifteen' (15) vs 'fifty' (50). The stress is on the second syllable: fif-TEEN."
  },
  {
    section: 'To Be & Basic Grammar',
    question: "What time is it? 3:30",
    options: ["A) It's three thirty.", "B) It's three thirteen.", "C) It's half past four.", "D) It's quarter past three."],
    correct: 0,
    explanation: "There are several ways to tell time: 3:30 can be said as 'three thirty' (digital style), 'half past three' (traditional style), or 'thirty minutes past three'. For :30, we commonly use 'half past' + hour. Examples: 2:30 = half past two, 4:30 = half past four."
  },
  {
    section: 'To Be & Basic Grammar',
    question: "Choose the correct preposition of time: I wake up ___ 7 o'clock.",
    options: ['A) in', 'B) on', 'C) at', 'D) to'],
    correct: 2,
    explanation: "Use 'at' for clock times: at 7 o'clock."
  },
  {
    section: 'To Be & Basic Grammar',
    question: 'Choose the correct demonstrative pronoun: ___ is my car. (pointing to something near)',
    options: ['A) That', 'B) This', 'C) These', 'D) Those'],
    correct: 1,
    explanation: "'This' is for something near you."
  },
  {
    section: 'To Be & Basic Grammar',
    question: 'Complete the comparative sentence: My sister is ___ than me.',
    options: ['A) tall', 'B) taller', 'C) tallest', 'D) more tall'],
    correct: 1,
    explanation: "Comparative: 'taller than' shows comparison between two."
  },
  {
    section: 'To Be & Basic Grammar',
    question: 'Choose the correct superlative: She is the ___ student in the class.',
    options: ['A) good', 'B) better', 'C) best', 'D) most good'],
    correct: 2,
    explanation: "Superlative: 'the best' is used for the top in a group."
  },
  // Section 2: Prepositions & There is/are
  {
    section: 'Prepositions & There is/are',
    question: 'Choose the correct preposition of place: The book is ___ the table.',
    options: ['A) in', 'B) on', 'C) at', 'D) under'],
    correct: 1,
    explanation: "'on' is used for surfaces: on the table."
  },
  {
    section: 'Prepositions & There is/are',
    question: 'Complete with "there is" or "there are": ___ three cats in the garden.',
    options: ['A) There is', 'B) There are', 'C) There has', 'D) There have'],
    correct: 1,
    explanation: "'There are' is for plural: There are three cats."
  },
  {
    section: 'Prepositions & There is/are',
    question: 'Make this sentence negative: "There are apples in the fridge."',
    options: ["A) There aren't apples in the fridge.", "B) There isn't apples in the fridge.", "C) There no apples in the fridge.", "D) There don't apples in the fridge."],
    correct: 0,
    explanation: "Negative plural: 'There aren't apples...' is correct."
  },
  {
    section: 'Prepositions & There is/are',
    question: 'Choose the correct form of "to have": She ___ a new car.',
    options: ['A) have', 'B) has', 'C) having', 'D) had'],
    correct: 1,
    explanation: "The verb 'to have' changes form based on the subject. Use 'have' with I/you/we/they and 'has' with he/she/it. Since 'she' is third person singular, we use 'has'. Examples: I have a book, She has a car, They have time, He has money."
  },
  {
    section: 'Prepositions & There is/are',
    question: 'Complete with "to go": I ___ to school every day.',
    options: ['A) go', 'B) goes', 'C) going', 'D) went'],
    correct: 0,
    explanation: "In Simple Present tense, the base form of the verb is used with I/you/we/they. Only he/she/it takes an 's' or 'es' ending. Since the subject is 'I', we use the base form 'go'. Examples: I go, you go, we go, they go, but he goes, she goes, it goes."
  },
  {
    section: 'Prepositions & There is/are',
    question: 'Choose the correct Simple Present form: He ___ English every morning.',
    options: ['A) study', 'B) studies', 'C) studying', 'D) studied'],
    correct: 1,
    explanation: "In Simple Present tense, verbs ending in consonant + 'y' change 'y' to 'ies' for he/she/it. 'Study' becomes 'studies' for third person singular. Other examples: try → tries, fly → flies, cry → cries. But: play → plays (vowel + y doesn't change)."
  },
  {
    section: 'Prepositions & There is/are',
    question: 'Choose the correct imperative: ___ the door, please.',
    options: ['A) Opening', 'B) To open', 'C) Open', 'D) Opens'],
    correct: 2,
    explanation: "Imperative sentences give commands, instructions, or requests. They use the base form of the verb without a subject. The implied subject is 'you'. Examples: Open the door, Close the window, Sit down, Please help me. For polite requests, add 'please'."
  },
  {
    section: 'Prepositions & There is/are',
    question: 'Make this imperative negative:',
    options: ["A) Don't run!", "B) Not run!", "C) No run!", "D) Doesn't run!"],
    correct: 0,
    explanation: "To make imperative sentences negative, use 'Don't' + base verb. The structure is: Don't + base verb + (object). Examples: Don't run! Don't touch that! Don't be late! Don't forget your keys! 'Don't' is the contraction of 'do not'."
  },
  // Section 3: Modal Verbs & Adverbs
  {
    section: 'Modal Verbs & Adverbs',
    question: 'Choose the correct modal verb: I ___ swim very well.',
    options: ['A) can', 'B) could', 'C) would', 'D) should'],
    correct: 0,
    explanation: "'Can' is a modal verb expressing ability, possibility, or permission. For ability: 'I can swim' means I have the skill to swim. Modal verbs are followed by the base form of the main verb (no 'to'). Examples: I can drive, She can speak French, We can help you."
  },
  {
    section: 'Modal Verbs & Adverbs',
    question: 'Make this sentence negative: "I can drive."',
    options: ["A) I can't drive.", "B) I don't can drive.", "C) I not can drive.", "D) I no can drive."],
    correct: 0,
    explanation: "To make modal verbs negative, add 'not' after the modal. 'Can' becomes 'cannot' or the contraction 'can't'. The structure is: Subject + modal + not + base verb. Examples: I can't drive, She won't come, They shouldn't go. Never use 'don't' with modals."
  },
  {
    section: 'Modal Verbs & Adverbs',
    question: 'Choose the correct modal for past ability: When I was young, I ___ run very fast.',
    options: ['A) can', 'B) could', 'C) would', 'D) will'],
    correct: 1,
    explanation: "'Could' is the past form of 'can' and expresses past ability or polite requests. For past ability: 'When I was young, I could run fast' means I had the ability in the past but maybe not now. It can also be used for polite requests: 'Could you help me?'"
  },
  {
    section: 'Modal Verbs & Adverbs',
    question: 'Complete with the correct adverb of frequency: I ___ drink coffee. (100% of the time)',
    options: ['A) sometimes', 'B) often', 'C) always', 'D) never'],
    correct: 2,
    explanation: "Adverbs of frequency show how often something happens. The scale is: always (100%), usually (80%), often (60%), sometimes (40%), rarely (20%), never (0%). 'Always' means every single time without exception. Examples: I always brush my teeth, She always arrives on time."
  },
  {
    section: 'Modal Verbs & Adverbs',
    question: 'Choose the correct intensifier: This movie is ___ interesting.',
    options: ['A) very', 'B) much', 'C) many', 'D) more'],
    correct: 0,
    explanation: "'Very' is an intensifier that makes adjectives stronger. It comes before the adjective to increase its intensity. Examples: very good, very bad, very interesting, very difficult. Other intensifiers include: really, quite, extremely, incredibly. Don't use 'very' with comparative adjectives."
  },
  {
    section: 'Modal Verbs & Adverbs',
    question: 'Choose the correct past form of "to be": They ___ at home yesterday.',
    options: ['A) was', 'B) were', 'C) are', 'D) is'],
    correct: 1,
    explanation: "The past tense of 'to be' has two forms: 'was' (I/he/she/it) and 'were' (you/we/they). Since 'they' is plural, we use 'were'. Examples: I was happy, You were late, He was tired, We were students, They were at home yesterday."
  },
  {
    section: 'Modal Verbs & Adverbs',
    question: 'Complete with Past Simple: I ___ a book last night.',
    options: ['A) read', 'B) reads', 'C) reading', 'D) will read'],
    correct: 0,
    explanation: "Past Simple tense describes completed actions in the past. Regular verbs add '-ed' (walked, played), but 'read' is irregular - it stays the same in spelling but pronunciation changes. Present: /riːd/ (reed), Past: /red/ (red). Time markers: yesterday, last week, in 2020."
  },
  {
    section: 'Modal Verbs & Adverbs',
    question: 'Choose the correct Past Simple negative: She ___ go to the party.',
    options: ['A) didn\'t', 'B) doesn\'t', 'C) wasn\'t', 'D) don\'t'],
    correct: 0,
    explanation: "Negative past: 'She didn't go...' is correct."
  },
  // Section 4: Future Tense & Questions
  {
    section: 'Future Tense & Questions',
    question: 'Choose the correct Simple Future: I ___ see you tomorrow.',
    options: ['A) will', 'B) am', 'C) going', 'D) do'],
    correct: 0,
    explanation: "Simple Future: 'I will see you tomorrow.'"
  },
  {
    section: 'Future Tense & Questions',
    question: 'Choose the correct question with "How much": ___ does this cost?',
    options: ['A) How many', 'B) How much', 'C) How long', 'D) How often'],
    correct: 1,
    explanation: "'How much' asks about price: How much does this cost?"
  },
  {
    section: 'Future Tense & Questions',
    question: 'Choose the correct question with "How many": ___ students are in your class?',
    options: ['A) How much', 'B) How many', 'C) How long', 'D) How old'],
    correct: 1,
    explanation: "'How many' is for countable nouns: How many students?"
  },
  {
    section: 'Future Tense & Questions',
    question: 'Complete with verb + ing: I ___ playing football.',
    options: ['A) like', 'B) likes', 'C) liking', 'D) liked'],
    correct: 0,
    explanation: "'like playing' is the correct verb+ing form."
  },
  {
    section: 'Future Tense & Questions',
    question: 'Choose the correct sentence:',
    options: ['A) I love to swimming.', 'B) I love swimming.', 'C) I love swim.', 'D) I love to swim.'],
    correct: 1,
    explanation: "'I love swimming' is the correct structure."
  },
  {
    section: 'Future Tense & Questions',
    question: 'Complete with "hate + ing": She ___ doing homework.',
    options: ['A) hate', 'B) hates', 'C) hating', 'D) hated'],
    correct: 1,
    explanation: "'hates' is for she/he/it: She hates doing homework."
  },
  {
    section: 'Future Tense & Questions',
    question: 'Choose the correct Present Continuous: I ___ studying English now.',
    options: ['A) am', 'B) is', 'C) are', 'D) be'],
    correct: 0,
    explanation: "Present Continuous: 'I am studying English now.'"
  },
  {
    section: 'Future Tense & Questions',
    question: 'Make this Present Continuous negative: "They are playing football."',
    options: ["A) They aren't playing football.", "B) They don't playing football.", "C) They not playing football.", "D) They isn't playing football."],
    correct: 0,
    explanation: "Negative: 'They aren't playing football.'"
  },
  // Section 5: Mixed Grammar & Vocabulary
  {
    section: 'Mixed Grammar & Vocabulary',
    question: 'Choose the correct date format:',
    options: ['A) 25th December', 'B) December 25th', 'C) 25 December', 'D) All are correct'],
    correct: 3,
    explanation: "All are correct date formats in English."
  },
  {
    section: 'Mixed Grammar & Vocabulary',
    question: 'What day comes after Wednesday?',
    options: ['A) Tuesday', 'B) Thursday', 'C) Friday', 'D) Monday'],
    correct: 1,
    explanation: "Thursday comes after Wednesday."
  },
  {
    section: 'Mixed Grammar & Vocabulary',
    question: 'Choose the correct phone number format:',
    options: ['A) 555-1234', 'B) 555 1234', 'C) (555) 1234', 'D) All are correct'],
    correct: 3,
    explanation: "All are correct phone number formats."
  },
  {
    section: 'Mixed Grammar & Vocabulary',
    question: 'Complete the sentence: This is ___ book. (pointing to something far)',
    options: ['A) this', 'B) that', 'C) these', 'D) here'],
    correct: 1,
    explanation: "'That' is for something far from you."
  },
  {
    section: 'Mixed Grammar & Vocabulary',
    question: 'Choose the correct plural demonstrative: ___ are my friends. (pointing to people near)',
    options: ['A) This', 'B) That', 'C) These', 'D) Those'],
    correct: 2,
    explanation: "'These' is plural and for things near you."
  },
  {
    section: 'Mixed Grammar & Vocabulary',
    question: 'Complete with the correct preposition: My birthday is ___ May.',
    options: ['A) in', 'B) on', 'C) at', 'D) to'],
    correct: 0,
    explanation: "Use 'in' for months: in May."
  },
  {
    section: 'Mixed Grammar & Vocabulary',
    question: 'Choose the correct Present Continuous question:',
    options: ['A) Are you studying?', 'B) Do you studying?', 'C) Is you studying?', 'D) You are studying?'],
    correct: 0,
    explanation: "'Are you studying?' is the correct question form."
  },
  {
    section: 'Mixed Grammar & Vocabulary',
    question: 'Complete with "would": ___ you like some tea?',
    options: ['A) Do', 'B) Are', 'C) Would', 'D) Will'],
    correct: 2,
    explanation: "'Would you like...?' is a polite offer."
  },
  // Section 6: Advanced A1 Grammar
  {
    section: 'Advanced A1 Grammar',
    question: 'Choose the correct sentence:',
    options: ['A) I can to swim.', 'B) I can swim.', 'C) I can swimming.', 'D) I can swims.'],
    correct: 1,
    explanation: "'I can swim' is the correct structure."
  },
  {
    section: 'Advanced A1 Grammar',
    question: 'Complete with the correct adverb of frequency: She ___ eats vegetables. (0% of the time)',
    options: ['A) always', 'B) sometimes', 'C) often', 'D) never'],
    correct: 3,
    explanation: "'never' means 0% of the time."
  },
  {
    section: 'Advanced A1 Grammar',
    question: 'Choose the correct Past Simple question:',
    options: ['A) Did you went to school?', 'B) Did you go to school?', 'C) Do you went to school?', 'D) Were you go to school?'],
    correct: 1,
    explanation: "'Did you go to school?' is the correct past question."
  },
  {
    section: 'Advanced A1 Grammar',
    question: 'Complete with the correct form: Water ___ at 100 degrees Celsius.',
    options: ['A) boil', 'B) boils', 'C) boiling', 'D) boiled'],
    correct: 1,
    explanation: "'boils' is the correct form: Water boils at 100°C."
  },
  {
    section: 'Advanced A1 Grammar',
    question: 'Choose the correct negative imperative:',
    options: ["A) Don't be late!", "B) Not be late!", "C) No be late!", "D) Doesn't be late!"],
    correct: 0,
    explanation: "Negative imperative: 'Don't be late!' is correct."
  },
  {
    section: 'Advanced A1 Grammar',
    question: 'Complete with Present Continuous: Look! It ___ raining.',
    options: ['A) is', 'B) are', 'C) am', 'D) be'],
    correct: 0,
    explanation: "Present Continuous: 'It is raining.'"
  },
  {
    section: 'Advanced A1 Grammar',
    question: 'Choose the correct comparison: This exercise is ___ than the previous one.',
    options: ['A) easy', 'B) easier', 'C) easiest', 'D) more easy'],
    correct: 1,
    explanation: "Comparative: 'easier than' compares two things."
  },
  {
    section: 'Advanced A1 Grammar',
    question: 'Complete with the correct modal: I ___ like to visit Paris someday.',
    options: ['A) can', 'B) could', 'C) would', 'D) will'],
    correct: 2,
    explanation: "'I would like...' is the correct polite form."
  }
];

async function main() {
  console.log('Seeding English A1 Level exam...');

  // Check if exam already exists
  const existingExam = await prisma.exam.findFirst({
    where: { title: 'English A1 Level' }
  });

  if (existingExam) {
    console.log('English A1 Level exam already exists, skipping.');
    return;
  }

  // Create exam
  const exam = await prisma.exam.create({
    data: {
      title: 'English A1 Level',
    },
  });
  console.log('English A1 Level exam created, ID:', exam.id);

  // Add questions
  for (const q of englishA1Questions) {
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