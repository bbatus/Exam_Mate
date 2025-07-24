import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const englishB2Questions = [
  // Section 1: Relative Clauses & Adjective Clauses
  {
    section: 'Relative Clauses & Adjective Clauses',
    question: 'Choose the correct relative pronoun: The woman ___ car was stolen called the police.',
    options: ['A) who', 'B) whom', 'C) whose', 'D) which'],
    correct: 2,
    explanation: "'Whose' is a possessive relative pronoun that shows ownership or relationship. It replaces possessive adjectives (his, her, their, its) in relative clauses. Structure: noun + whose + noun + verb. Examples: The student whose essay won the prize is here. The company whose profits increased hired more staff. 'Whose' can refer to people, animals, or things."
  },
  {
    section: 'Relative Clauses & Adjective Clauses',
    question: 'Complete with the correct relative clause: The book ___ you recommended was excellent.',
    options: ['A) who', 'B) whom', 'C) that', 'D) whose'],
    correct: 2,
    explanation: "In defining relative clauses, 'that' can replace 'which' (for things) or 'who' (for people) when the relative pronoun is the object. Defining clauses give essential information and don't use commas. 'That' is more common in spoken English. Examples: The book that I read was boring. The person that called didn't leave a message. Note: 'that' cannot be used in non-defining clauses."
  },
  {
    section: 'Relative Clauses & Adjective Clauses',
    question: 'Choose the correct sentence with a non-defining relative clause:',
    options: ['A) My brother who lives in London is a doctor.', 'B) My brother, who lives in London, is a doctor.', 'C) My brother who lives in London, is a doctor.', 'D) My brother, who lives in London is a doctor.'],
    correct: 1,
    explanation: "Non-defining relative clauses add extra, non-essential information about the noun. They are separated by commas and can be removed without changing the main meaning. Use 'who' (people), 'which' (things), 'whose' (possession), but never 'that'. Examples: My car, which is red, needs repair. Shakespeare, who wrote Hamlet, lived in England. The information is additional, not essential for identification."
  },
  {
    section: 'Relative Clauses & Adjective Clauses',
    question: 'Complete with the correct object relative pronoun: The person ___ I spoke to was very helpful.',
    options: ['A) who', 'B) whom', 'C) that', 'D) Both B and C'],
    correct: 3,
    explanation: "When the relative pronoun is the object of the clause, you can use 'whom' (formal), 'who' (informal), 'that' (common), or omit it entirely. 'Whom' is grammatically correct but sounds formal. Examples: The person (whom/who/that) I met was nice. The teacher (whom/who/that) we like retired. In modern English, 'who' and 'that' are more common than 'whom' in object position."
  },
  {
    section: 'Relative Clauses & Adjective Clauses',
    question: 'Choose the correct sentence:',
    options: ['A) The reason why he left was unclear.', 'B) The reason that he left was unclear.', 'C) The reason which he left was unclear.', 'D) Both A and B are correct.'],
    correct: 3,
    explanation: "After 'reason', you can use 'why', 'that', or no relative pronoun at all. All are grammatically correct: 'The reason why he left', 'The reason that he left', 'The reason he left'. 'Why' is most common and natural. Similarly, after 'time': 'the time when/that/∅ we met'. After 'place': 'the place where/that/∅ we lived'. The choice depends on formality and personal preference."
  },
  {
    section: 'Relative Clauses & Adjective Clauses',
    question: "Complete the defining relative clause: Students ___ don't study regularly often fail.",
    options: ['A) who', 'B) which', 'C) whom', 'D) whose'],
    correct: 0,
    explanation: "'Who' is the subject relative pronoun for people in both defining and non-defining clauses. When 'who' is the subject, it cannot be omitted. Structure: noun (person) + who + verb. Examples: People who exercise regularly are healthier. The woman who called yesterday wants to speak to you. In defining clauses, 'that' can also be used: Students that don't study... but 'who' is preferred for people."
  },
  {
    section: 'Relative Clauses & Adjective Clauses',
    question: 'Choose the correct reduced relative clause:',
    options: ['A) The man standing over there is my boss.', 'B) The man who standing over there is my boss.', 'C) The man that standing over there is my boss.', 'D) The man stands over there is my boss.'],
    correct: 0,
    explanation: "Reduced relative clauses omit 'who is' or 'that is.' Example: 'The man standing over there is my boss.'"
  },
  {
    section: 'Relative Clauses & Adjective Clauses',
    question: 'Complete with the correct relative pronoun: This is the place ___ we first met.',
    options: ['A) which', 'B) where', 'C) when', 'D) that'],
    correct: 1,
    explanation: "'Where' is the relative pronoun for places. Example: 'This is the place where we first met.'"
  },
  // Section 2: Complex Adverb Clauses & Modifiers
  {
    section: 'Complex Adverb Clauses & Modifiers',
    question: 'Choose the correct adverb clause of condition: ___ you study hard, you won\'t pass the exam.',
    options: ['A) If', 'B) Unless', 'C) Although', 'D) Because'],
    correct: 1,
    explanation: "'Unless' means 'if not.' Example: 'Unless you study hard, you won't pass the exam.'"
  },
  {
    section: 'Complex Adverb Clauses & Modifiers',
    question: 'Complete with the correct adverb clause of concession: ___ it was raining, we went for a walk.',
    options: ['A) Because', 'B) Since', 'C) Although', 'D) If'],
    correct: 2,
    explanation: "'Although' introduces a contrast. Example: 'Although it was raining, we went for a walk.'"
  },
  {
    section: 'Complex Adverb Clauses & Modifiers',
    question: 'Identify the dangling modifier:',
    options: ['A) Walking to school, the rain started.', 'B) While walking to school, it started to rain.', 'C) Walking to school, I got caught in the rain.', 'D) The rain started while I was walking to school.'],
    correct: 0,
    explanation: "A dangling modifier lacks a clear subject. Example: 'Walking to school, the rain started.' (Who was walking?)"
  },
  {
    section: 'Complex Adverb Clauses & Modifiers',
    question: 'Choose the correct sentence without a misplaced modifier:',
    options: ['A) I nearly ate all the cake.', 'B) I ate nearly all the cake.', 'C) Nearly I ate all the cake.', 'D) I ate all nearly the cake.'],
    correct: 1,
    explanation: "A modifier should be next to the word it modifies. Correct: 'I ate nearly all the cake.'"
  },
  {
    section: 'Complex Adverb Clauses & Modifiers',
    question: 'Complete with the correct adverb of manner: She speaks English ___.',
    options: ['A) fluent', 'B) fluently', 'C) fluency', 'D) more fluent'],
    correct: 1,
    explanation: "Adverbs of manner describe how something is done. 'Fluently' is the adverb form of 'fluent.'"
  },
  {
    section: 'Complex Adverb Clauses & Modifiers',
    question: 'Choose the correct adverb of time: I have ___ finished my homework.',
    options: ['A) yet', 'B) already', 'C) still', 'D) always'],
    correct: 1,
    explanation: "'Already' is used for something that happened before now. Example: 'I have already finished my homework.'"
  },
  {
    section: 'Complex Adverb Clauses & Modifiers',
    question: 'Complete the sentence with proper parallel structure: She likes reading, writing, and ___.',
    options: ['A) to paint', 'B) painting', 'C) paint', 'D) painted'],
    correct: 1,
    explanation: "Parallel structure means using the same grammatical form. 'Reading, writing, and painting' are all gerunds."
  },
  {
    section: 'Complex Adverb Clauses & Modifiers',
    question: 'Choose the sentence with correct parallel structure:',
    options: ['A) The job requires patience, skills, and being dedicated.', 'B) The job requires patience, skills, and dedication.', 'C) The job requires being patient, skills, and dedication.', 'D) The job requires patience, to be skilled, and dedication.'],
    correct: 1,
    explanation: "Parallel structure: all nouns. Correct: 'patience, skills, and dedication.'"
  },
  // Section 3: Advanced Modal Verbs & Expressing Past Habits
  {
    section: 'Advanced Modal Verbs & Past Habits',
    question: 'Choose the correct modal for past impossibility: He ___ have seen me. I wasn\'t there.',
    options: ['A) must', 'B) might', 'C) can\'t', 'D) could'],
    correct: 2,
    explanation: "'Can't have' is used for past impossibility. Example: 'He can't have seen me. I wasn't there.'"
  },
  {
    section: 'Advanced Modal Verbs & Past Habits',
    question: 'Complete with the correct modal: You ___ have told me earlier. Now it\'s too late.',
    options: ['A) should', 'B) must', 'C) can\'t', 'D) needn\'t'],
    correct: 0,
    explanation: "'Should have' is used for past advice. Example: 'You should have told me earlier.'"
  },
  {
    section: 'Advanced Modal Verbs & Past Habits',
    question: 'Choose the correct way to express past habits: When I was a child, I ___ play in the garden every day.',
    options: ['A) was used to', 'B) used to', 'C) would', 'D) Both B and C'],
    correct: 3,
    explanation: "Both 'used to' and 'would' express past habits. Example: 'When I was a child, I used to/would play in the garden.'"
  },
  {
    section: 'Advanced Modal Verbs & Past Habits',
    question: 'Complete with the correct modal: You ___ have bought so much food. We already had enough.',
    options: ['A) couldn\'t', 'B) shouldn\'t', 'C) needn\'t', 'D) mustn\'t'],
    correct: 2,
    explanation: "'Needn't have' is used for unnecessary past actions. Example: 'You needn't have bought so much food.'"
  },
  {
    section: 'Advanced Modal Verbs & Past Habits',
    question: 'Choose the correct sentence:',
    options: ['A) I\'m used to wake up early.', 'B) I\'m used to waking up early.', 'C) I used to wake up early.', 'D) Both B and C are correct.'],
    correct: 3,
    explanation: "'I'm used to waking up early' (habit now), 'I used to wake up early' (habit in the past). Both are correct."
  },
  {
    section: 'Advanced Modal Verbs & Past Habits',
    question: 'Complete with the correct form: She ___ live in Paris, but now she lives in London.',
    options: ['A) used to', 'B) use to', 'C) was used to', 'D) is used to'],
    correct: 0,
    explanation: "'Used to' expresses a past habit or state. Example: 'She used to live in Paris.'"
  },
  // Section 4: Future Perfect & Wish/Hypothetical Situations
  {
    section: 'Future Perfect & Wish/Hypothetical',
    question: 'Choose the correct Future Perfect: By next year, I ___ my degree.',
    options: ['A) will finish', 'B) will have finished', 'C) will be finishing', 'D) am finishing'],
    correct: 1,
    explanation: "Future Perfect: 'will have' + past participle. Example: 'By next year, I will have finished my degree.'"
  },
  {
    section: 'Future Perfect & Wish/Hypothetical',
    question: 'Complete with Future Perfect Continuous: By 5 PM, I ___ for 8 hours.',
    options: ['A) will work', 'B) will have worked', 'C) will be working', 'D) will have been working'],
    correct: 3,
    explanation: "Future Perfect Continuous: 'will have been' + verb-ing. Example: 'By 5 PM, I will have been working for 8 hours.'"
  },
  {
    section: 'Future Perfect & Wish/Hypothetical',
    question: 'Choose the correct wish sentence: I wish I ___ more money.',
    options: ['A) have', 'B) had', 'C) will have', 'D) would have'],
    correct: 1,
    explanation: "'Wish' + past simple is used for present wishes. Example: 'I wish I had more money.'"
  },
  {
    section: 'Future Perfect & Wish/Hypothetical',
    question: 'Complete the hypothetical sentence: If only I ___ harder last year.',
    options: ['A) studied', 'B) had studied', 'C) would study', 'D) study'],
    correct: 1,
    explanation: "'If only' + past perfect expresses past regrets. Example: 'If only I had studied harder.'"
  },
  {
    section: 'Future Perfect & Wish/Hypothetical',
    question: 'Choose the correct sentence:',
    options: ['A) I wish I can speak French.', 'B) I wish I could speak French.', 'C) I wish I will speak French.', 'D) I wish I would speak French.'],
    correct: 1,
    explanation: "'Wish' + could is used for unreal ability. Example: 'I wish I could speak French.'"
  },
  {
    section: 'Future Perfect & Wish/Hypothetical',
    question: "Complete with the correct form: I'd rather you ___ smoking.",
    options: ['A) stop', 'B) stopped', 'C) will stop', 'D) would stop'],
    correct: 1,
    explanation: "'Would rather' + past simple is used for preferences about others. Example: 'I'd rather you stopped smoking.'"
  },
  // Section 5: Complex Sentence Structures & Conjunctions
  {
    section: 'Complex Sentence Structures & Conjunctions',
    question: 'Choose the correct correlative conjunction: ___ my brother ___ my sister came to the party.',
    options: ['A) Either...or', 'B) Neither...nor', 'C) Both...and', 'D) Not only...but also'],
    correct: 0,
    explanation: "'Either...or' is used to show alternatives. Example: 'Either my brother or my sister came.'"
  },
  {
    section: 'Complex Sentence Structures & Conjunctions',
    question: 'Complete with the correct correlative conjunction: She is ___ intelligent ___ hardworking.',
    options: ['A) either...or', 'B) neither...nor', 'C) both...and', 'D) not only...but also'],
    correct: 2,
    explanation: "'Both...and' is used to join two qualities. Example: 'She is both intelligent and hardworking.'"
  },
  {
    section: 'Complex Sentence Structures & Conjunctions',
    question: 'Choose the correct complex sentence:',
    options: ['A) Although he was tired, but he continued working.', 'B) Although he was tired, he continued working.', 'C) He was tired, although he continued working.', 'D) He was tired although, he continued working.'],
    correct: 1,
    explanation: "'Although' is not followed by 'but.' Correct: 'Although he was tired, he continued working.'"
  },
  {
    section: 'Complex Sentence Structures & Conjunctions',
    question: 'Complete the compound sentence: I wanted to go to the party, ___ I had too much work.',
    options: ['A) and', 'B) but', 'C) or', 'D) so'],
    correct: 1,
    explanation: "'But' is used to show contrast. Example: 'I wanted to go, but I had too much work.'"
  },
  {
    section: 'Complex Sentence Structures & Conjunctions',
    question: 'Choose the sentence with correct comma usage:',
    options: ['A) After the meeting we went to lunch.', 'B) After the meeting, we went to lunch.', 'C) After, the meeting we went to lunch.', 'D) After the meeting we, went to lunch.'],
    correct: 1,
    explanation: "Use a comma after an introductory clause. Example: 'After the meeting, we went to lunch.'"
  },
  {
    section: 'Complex Sentence Structures & Conjunctions',
    question: "Complete with the correct dependent clause: I'll call you ___ I arrive.",
    options: ['A) when', 'B) because', 'C) although', 'D) if'],
    correct: 0,
    explanation: 'No comma before "that." Correct: "The fact that he was late surprised everyone."'
  },
  {
    section: 'Complex Sentence Structures & Conjunctions',
    question: 'Choose the correct sentence structure:',
    options: ['A) The fact that he was late surprised everyone.', 'B) The fact that he was late, surprised everyone.', 'C) The fact, that he was late surprised everyone.', 'D) The fact that, he was late surprised everyone.'],
    correct: 0,
    explanation: 'No comma before "that." Correct: "The fact that he was late surprised everyone."'
  },
  {
    section: 'Complex Sentence Structures & Conjunctions',
    question: 'Complete the sentence with proper punctuation: My favorite subjects are math, science ___ English.',
    options: ['A) and', 'B) , and', 'C) and,', 'D) , and,'],
    correct: 1,
    explanation: "Oxford comma: use ', and' before the last item. Example: 'math, science, and English.'"
  },
  // Section 6: Expressing Consequence, Purpose & Result
  {
    section: 'Consequence, Purpose & Result',
    question: 'Choose the correct way to express consequence: The traffic was ___ heavy ___ we were late.',
    options: ['A) so...that', 'B) such...that', 'C) very...that', 'D) too...that'],
    correct: 0,
    explanation: "'So...that' is used to express consequence. Example: 'The traffic was so heavy that we were late.'"
  },
  {
    section: 'Consequence, Purpose & Result',
    question: 'Complete with the correct form: It was ___ a difficult exam ___ nobody passed.',
    options: ['A) so...that', 'B) such...that', 'C) very...that', 'D) too...for'],
    correct: 1,
    explanation: "'Such a/an + adjective + noun + that' expresses result. Example: 'It was such a difficult exam that nobody passed.'"
  },
  {
    section: 'Consequence, Purpose & Result',
    question: 'Choose the correct sentence expressing purpose:',
    options: ['A) She studied hard so that to pass the exam.', 'B) She studied hard so that she could pass the exam.', 'C) She studied hard so that pass the exam.', 'D) She studied hard so that passing the exam.'],
    correct: 1,
    explanation: "'So that + subject + could' expresses purpose. Example: 'She studied hard so that she could pass.'"
  },
  {
    section: 'Consequence, Purpose & Result',
    question: "Complete with the correct expression of result: He spoke ___ quietly ___ I couldn't hear him.",
    options: ['A) so...that', 'B) such...that', 'C) very...that', 'D) too...to'],
    correct: 0,
    explanation: "'So + adverb + that' expresses result. Example: 'He spoke so quietly that I couldn't hear him.'"
  },
  {
    section: 'Consequence, Purpose & Result',
    question: 'Choose the correct sentence:',
    options: ['A) The box was too heavy for me to lift it.', 'B) The box was too heavy for me to lift.', 'C) The box was so heavy for me to lift.', 'D) The box was such heavy for me to lift.'],
    correct: 1,
    explanation: "Correct: 'too heavy for me to lift.' 'Too + adjective + for + person + to + verb.'"
  },
  {
    section: 'Consequence, Purpose & Result',
    question: 'Complete with the correct form: She made ___ good impression ___ everyone liked her.',
    options: ['A) so...that', 'B) such a...that', 'C) very...that', 'D) too...to'],
    correct: 1,
    explanation: "'Such a + adjective + that' expresses result. Example: 'She made such a good impression that everyone liked her.'"
  },
  {
    section: 'Consequence, Purpose & Result',
    question: 'Choose the correct sentence expressing purpose:',
    options: ['A) I\'m saving money in order to buy a car.', 'B) I\'m saving money in order buy a car.', 'C) I\'m saving money in order that buy a car.', 'D) I\'m saving money in order for buy a car.'],
    correct: 0,
    explanation: "'In order to + verb' expresses purpose. Example: 'I'm saving money in order to buy a car.'"
  },
  {
    section: 'Consequence, Purpose & Result',
    question: 'Complete with the correct form: The music was ___ loud ___ we couldn\'t talk.',
    options: ['A) so...that', 'B) such...that', 'C) very...that', 'D) too...for'],
    correct: 0,
    explanation: "'So + adjective + that' expresses result. Example: 'The music was so loud that we couldn't talk.'"
  },
  // Section 7: Narrative Tenses & Expressing Preferences
  {
    section: 'Narrative Tenses & Expressing Preferences',
    question: 'Choose the correct narrative tense sequence: While I ___ TV, the phone ___.',
    options: ['A) watched, rang', 'B) was watching, rang', 'C) was watching, was ringing', 'D) watched, was ringing'],
    correct: 1,
    explanation: "Past Continuous + Past Simple is used for background and interrupting actions. Example: 'While I was watching TV, the phone rang.'"
  },
  {
    section: 'Narrative Tenses & Expressing Preferences',
    question: 'Complete with the correct narrative tense: After she ___ dinner, she ___ for a walk.',
    options: ['A) had finished, went', 'B) finished, had gone', 'C) was finishing, went', 'D) finished, was going'],
    correct: 0,
    explanation: "Past Perfect + Past Simple: 'After she had finished dinner, she went for a walk.'"
  },
  {
    section: 'Narrative Tenses & Expressing Preferences',
    question: "Choose the correct way to express preference: I'd rather ___ at home than ___ out.",
    options: ['A) stay, go', 'B) to stay, go', 'C) stay, to go', 'D) staying, going'],
    correct: 0,
    explanation: "'Would rather' + base verb expresses preference. Example: 'I'd rather stay at home than go out.'"
  },
  {
    section: 'Narrative Tenses & Expressing Preferences',
    question: "Complete with the correct form: I'd prefer ___ a book rather than ___ TV.",
    options: ['A) read, watch', 'B) to read, watch', 'C) reading, watching', 'D) to read, watching'],
    correct: 1,
    explanation: "'Would prefer' + to + verb. Example: 'I'd prefer to read a book rather than watch TV.'"
  },
  {
    section: 'Narrative Tenses & Expressing Preferences',
    question: "Choose the correct sentence: I'd rather you don't smoke here.",
    options: ['A) I\'d rather you don\'t smoke here.', 'B) I\'d rather you didn\'t smoke here.', 'C) I\'d rather you won\'t smoke here.', 'D) I\'d rather you wouldn\'t smoke here.'],
    correct: 1,
    explanation: "'Would rather' + subject + past simple for preferences about others. Example: 'I'd rather you didn't smoke here.'"
  },
  {
    section: 'Narrative Tenses & Expressing Preferences',
    question: 'Complete the narrative sequence: By the time I ___ home, everyone ___ already ___.',
    options: ['A) got, had, left', 'B) had got, has, left', 'C) got, has, left', 'D) was getting, had, left'],
    correct: 0,
    explanation: "Past Simple + Past Perfect: 'By the time I got home, everyone had already left.'"
  }
];

async function main() {
  console.log('Seeding English B2 Level exam...');

  // Check if exam already exists
  const existingExam = await prisma.exam.findFirst({
    where: { title: 'English B2 Level' }
  });

  if (existingExam) {
    console.log('English B2 Level exam already exists, skipping.');
    return;
  }

  // Create exam
  const exam = await prisma.exam.create({
    data: {
      title: 'English B2 Level',
    },
  });
  console.log('English B2 Level exam created, ID:', exam.id);

  // Add questions
  for (const q of englishB2Questions) {
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