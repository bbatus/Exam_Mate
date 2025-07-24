import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const englishB1Questions = [
  // Section 1: 2nd & 3rd Conditionals
  {
    section: '2nd & 3rd Conditionals',
    question: 'Choose the correct 2nd conditional: If I ___ rich, I ___ travel around the world.',
    options: ['A) am, will', 'B) were, would', 'C) was, will', 'D) would be, will'],
    correct: 1,
    explanation: "The 2nd conditional expresses unreal, hypothetical, or unlikely situations in the present or future. Structure: If + past simple, would + base verb. Use 'were' for all persons with 'to be' (If I were, If he were). This describes situations that are not true now but could theoretically happen. Examples: If I won the lottery, I would buy a house. If she studied harder, she would pass the exam."
  },
  {
    section: '2nd & 3rd Conditionals',
    question: 'Complete the 3rd conditional: If she ___ harder, she ___ the exam.',
    options: ['A) studied, would pass', 'B) had studied, would have passed', 'C) studies, will pass', 'D) would study, passed'],
    correct: 1,
    explanation: "The 3rd conditional expresses regret or imaginary past situations that didn't happen. Structure: If + had + past participle, would have + past participle. This talks about past events that cannot be changed. It often expresses regret, criticism, or speculation about different past outcomes. Examples: If I had left earlier, I wouldn't have been late. If they had invited me, I would have come."
  },
  {
    section: '2nd & 3rd Conditionals',
    question: 'Choose the correct sentence:',
    options: ['A) If I would have money, I would buy a car.', 'B) If I had money, I would buy a car.', 'C) If I have money, I would buy a car.', 'D) If I would have had money, I buy a car.'],
    correct: 1,
    explanation: "In conditional sentences, never use 'would' in the 'if' clause. This is a common mistake. 2nd conditional structure: If + past simple, would + base verb. The 'if' clause uses past simple (had, went, were), while the main clause uses 'would'. Incorrect: 'If I would have money...' Correct: 'If I had money, I would buy a car.'"
  },
  {
    section: '2nd & 3rd Conditionals',
    question: 'Complete the 3rd conditional: They ___ the flight if they ___ earlier.',
    options: ["A) wouldn't miss, left", "B) wouldn't have missed, had left", "C) won't miss, leave", "D) didn't miss, would leave"],
    correct: 1,
    explanation: "The 3rd conditional structure: If + had + past participle (condition), would have + past participle (result). Both parts refer to past events that didn't happen. 'If they had left earlier' = they didn't leave earlier (past fact). 'They wouldn't have missed the flight' = but they did miss it (past result). This expresses cause and effect relationships in imaginary past scenarios."
  },
  {
    section: '2nd & 3rd Conditionals',
    question: 'Choose the correct mixed conditional: If I ___ your advice yesterday, I ___ in trouble now.',
    options: ["A) took, wouldn't be", "B) had taken, wouldn't be", "C) take, won't be", "D) would take, wasn't"],
    correct: 1,
    explanation: "Mixed conditionals combine different time periods. This type mixes 3rd conditional (past condition) with 2nd conditional (present result). Structure: If + had + past participle (past), would + base verb (present). The past action affects the present situation. Examples: If I had studied medicine (past), I would be a doctor now (present). If she hadn't moved abroad (past), she would still live here (present)."
  },
  {
    section: '2nd & 3rd Conditionals',
    question: 'Complete the sentence: What ___ you do if you ___ the lottery?',
    options: ['A) will, win', 'B) would, won', 'C) do, win', 'D) did, would win'],
    correct: 1,
    explanation: "In 2nd conditional questions, the structure is: What + would + subject + base verb + if + subject + past simple? This asks about hypothetical actions in unreal situations. 'What would you do if you won the lottery?' explores imaginary scenarios. Other examples: Where would you live if you could choose anywhere? What would happen if it rained tomorrow?"
  },
  // Section 2: Modal Verbs of Deduction & Intensifiers
  {
    section: 'Modal Verbs of Deduction & Intensifiers',
    question: 'Choose the correct modal of deduction: She\'s not answering her phone. She ___ be sleeping.',
    options: ['A) can', 'B) must', 'C) might', 'D) should'],
    correct: 2,
    explanation: "Modal verbs of deduction express how certain we are about something. 'Might' (30-50% certainty) expresses possibility or uncertainty. 'Must' (90% certainty) expresses strong logical deduction. 'Can't' (0% certainty) expresses impossibility. Since we're not sure why she's not answering, 'might' is appropriate. Examples: She might be busy, He might have forgotten, They might arrive late."
  },
  {
    section: 'Modal Verbs of Deduction & Intensifiers',
    question: 'Complete with the correct modal: He ___ be at work. His car is in the parking lot.',
    options: ["A) can't", 'B) might not', 'C) must', 'D) may not'],
    correct: 2,
    explanation: "'Must' expresses strong logical deduction (90% certainty) based on evidence. The evidence (his car is in the parking lot) strongly suggests he's at work. This is not obligation but logical conclusion. Other examples: The lights are on - someone must be home. She's wearing a coat - it must be cold outside. You got 100% - you must have studied hard."
  },
  {
    section: 'Modal Verbs of Deduction & Intensifiers',
    question: 'Choose the correct intensifier: The movie was ___ boring that I fell asleep.',
    options: ['A) so', 'B) such', 'C) too', 'D) enough'],
    correct: 0,
    explanation: "'So...that' structure expresses result or consequence. 'So' comes before adjectives or adverbs: so + adjective + that + result. Examples: The movie was so boring that I fell asleep. She speaks so quickly that I can't understand. It's so cold that the lake froze. This shows cause and effect relationships."
  },
  {
    section: 'Modal Verbs of Deduction & Intensifiers',
    question: "Complete with the correct intensifier: It's ___ a beautiful day that we should go to the beach.",
    options: ['A) so', 'B) such', 'C) too', 'D) enough'],
    correct: 1,
    explanation: "'Such...that' structure: such + (a/an) + adjective + noun + that + result. Use 'such' with nouns, 'so' with adjectives. Examples: such a beautiful day, such good weather, such nice people, such an interesting book. Compare: so beautiful (adjective) vs. such a beautiful day (adjective + noun). Both express strong degree leading to a result."
  },
  {
    section: 'Modal Verbs of Deduction & Intensifiers',
    question: 'Choose the correct sentence:',
    options: ['A) The coffee is too hot to drink it.', 'B) The coffee is too hot to drink.', 'C) The coffee is too hot for drink.', 'D) The coffee is so hot to drink.'],
    correct: 1,
    explanation: "'Too...to' structure expresses excessive degree that prevents an action. Structure: too + adjective/adverb + to + base verb. Don't add object pronouns after 'to + verb' when the object is understood. Examples: too hot to drink (not 'to drink it'), too difficult to understand, too expensive to buy. This shows something exceeds the acceptable limit."
  },
  {
    section: 'Modal Verbs of Deduction & Intensifiers',
    question: 'Complete with the correct modal: You ___ have seen John at the party. He\'s in another city.',
    options: ['A) must', 'B) might', "C) can't", 'D) could'],
    correct: 2,
    explanation: "'Can't have + past participle' expresses logical impossibility about past events (0% certainty). The evidence (John is in another city) makes it impossible for the person to have seen him at the party. This is past deduction showing something definitely didn't happen. Examples: She can't have finished already (too soon), He can't have forgotten (too important)."
  },
  {
    section: 'Modal Verbs of Deduction & Intensifiers',
    question: 'Choose the correct intensifier: She\'s not experienced ___ for this job.',
    options: ['A) so', 'B) such', 'C) too', 'D) enough'],
    correct: 3,
    explanation: "'Enough' comes after the adjective: 'not experienced enough.' Not 'enough experienced.'"
  },
  {
    section: 'Modal Verbs of Deduction & Intensifiers',
    question: 'Complete the sentence: He ___ have forgotten about the meeting. He\'s usually very punctual.',
    options: ['A) must', "B) can't", 'C) might', 'D) should'],
    correct: 1,
    explanation: "'Can't' is used for logical impossibility: 'He can't have forgotten.' Not 'must.'"
  },
  // Section 3: Past Perfect & Present Perfect Continuous
  {
    section: 'Past Perfect & Present Perfect Continuous',
    question: 'Choose the correct Past Perfect: When I arrived, they ___ already ___.',
    options: ['A) have, left', 'B) had, left', 'C) were, leaving', 'D) left, already'],
    correct: 1,
    explanation: "Past Perfect: 'had left.' Used for an action completed before another past action. Structure: had + past participle."
  },
  {
    section: 'Past Perfect & Present Perfect Continuous',
    question: 'Complete with Present Perfect Continuous: I ___ English for three years.',
    options: ['A) am learning', 'B) have learned', 'C) have been learning', 'D) had been learning'],
    correct: 2,
    explanation: "Present Perfect Continuous: 'have/has been + verb-ing.' Used for actions that started in the past and continue now."
  },
  {
    section: 'Past Perfect & Present Perfect Continuous',
    question: 'Choose the correct sentence:',
    options: ['A) I had been waiting for an hour when he arrived.', 'B) I was waiting for an hour when he arrived.', 'C) I have been waiting for an hour when he arrived.', 'D) I waited for an hour when he arrived.'],
    correct: 0,
    explanation: "Past Perfect Continuous: 'had been waiting' shows duration before another past event. Example: 'I had been waiting for an hour when he arrived.'"
  },
  {
    section: 'Past Perfect & Present Perfect Continuous',
    question: 'Complete with the correct tense: By the time she got home, we ___ dinner.',
    options: ['A) have finished', 'B) had finished', 'C) finished', 'D) were finishing'],
    correct: 1,
    explanation: "Past Perfect: 'had finished.' Used for an action completed before another past action."
  },
  {
    section: 'Past Perfect & Present Perfect Continuous',
    question: 'Choose the correct Present Perfect vs. Past Simple:',
    options: ['A) I have seen that movie last week.', 'B) I saw that movie last week.', 'C) I have saw that movie last week.', 'D) I had seen that movie last week.'],
    correct: 1,
    explanation: "Use Past Simple with specific time expressions (last week): 'I saw that movie last week.' Present Perfect is not used with specific times."
  },
  {
    section: 'Past Perfect & Present Perfect Continuous',
    question: 'Complete with Present Perfect Continuous: How long ___ you ___ here?',
    options: ['A) are, living', 'B) have, lived', 'C) have, been living', 'D) do, live'],
    correct: 2,
    explanation: "Present Perfect Continuous: 'have/has been living.' Used to ask about duration from past to present."
  },
  // Section 4: Passive Voice & Reported Speech
  {
    section: 'Passive Voice & Reported Speech',
    question: 'Choose the correct passive voice: The letter ___ yesterday.',
    options: ['A) was written', 'B) wrote', 'C) is written', 'D) has written'],
    correct: 0,
    explanation: "Passive: 'was written.' Structure: was/were + past participle. Used for actions done by someone else in the past."
  },
  {
    section: 'Passive Voice & Reported Speech',
    question: 'Complete with passive voice: English ___ all over the world.',
    options: ['A) speaks', 'B) is spoken', 'C) is speaking', 'D) has spoken'],
    correct: 1,
    explanation: "Passive: 'is spoken.' Structure: is/are + past participle. Used for general truths."
  },
  {
    section: 'Passive Voice & Reported Speech',
    question: 'Choose the correct reported speech: She said, "I am tired."',
    options: ['A) She said that she was tired.', 'B) She said that she is tired.', 'C) She said that I was tired.', 'D) She said that I am tired.'],
    correct: 0,
    explanation: "Reported speech: present becomes past. 'I am tired' → 'she was tired.'"
  },
  {
    section: 'Passive Voice & Reported Speech',
    question: 'Complete the reported speech: He said, "I will help you tomorrow."',
    options: ['A) He said he will help me tomorrow.', 'B) He said he would help me the next day.', 'C) He said he helps me tomorrow.', 'D) He said he helped me tomorrow.'],
    correct: 1,
    explanation: "Reported speech: 'will' becomes 'would', 'tomorrow' becomes 'the next day.' Example: 'He said he would help me the next day.'"
  },
  {
    section: 'Passive Voice & Reported Speech',
    question: 'Choose the correct passive question:',
    options: ['A) When was the house built?', 'B) When did the house built?', 'C) When has the house built?', 'D) When does the house built?'],
    correct: 0,
    explanation: "Passive question: 'was/were + past participle.' Example: 'When was the house built?'"
  },
  {
    section: 'Passive Voice & Reported Speech',
    question: 'Complete the reported question: She asked, "Where do you live?"',
    options: ['A) She asked where do I live.', 'B) She asked where I live.', 'C) She asked where did I live.', 'D) She asked where I lived.'],
    correct: 3,
    explanation: "Reported question: 'where + subject + verb (past).' Example: 'She asked where I lived.'"
  },
  {
    section: 'Passive Voice & Reported Speech',
    question: 'Choose the correct passive voice: The problem ___ by the team next week.',
    options: ['A) will solve', 'B) will be solved', 'C) is solving', 'D) solves'],
    correct: 1,
    explanation: "Future passive: 'will be + past participle.' Example: 'The problem will be solved.'"
  },
  {
    section: 'Passive Voice & Reported Speech',
    question: 'Complete the reported speech: "Don\'t be late," she told me.',
    options: ['A) She told me don\'t be late.', 'B) She told me not to be late.', 'C) She told me to not be late.', 'D) She told me not be late.'],
    correct: 1,
    explanation: "Reported command: 'told me not to + verb.' Example: 'She told me not to be late.'"
  },
  // Section 5: Question Tags & Embedded Questions
  {
    section: 'Question Tags & Embedded Questions',
    question: "Choose the correct question tag: You're coming to the party, ___ ?",
    options: ["A) aren't you", "B) are you", "C) don't you", "D) do you"],
    correct: 0,
    explanation: "Positive statement, negative tag: 'aren't you?' Example: 'You're coming, aren't you?'"
  },
  {
    section: 'Question Tags & Embedded Questions',
    question: "Complete with the correct question tag: She doesn't like coffee, ___ ?",
    options: ["A) doesn't she", "B) does she", "C) isn't she", "D) is she"],
    correct: 1,
    explanation: "Negative statement, positive tag: 'does she?' Example: 'She doesn't like coffee, does she?'"
  },
  {
    section: 'Question Tags & Embedded Questions',
    question: 'Choose the correct embedded question:',
    options: ['A) Can you tell me what time is it?', 'B) Can you tell me what time it is?', 'C) Can you tell me what is the time?', 'D) Can you tell me what the time is it?'],
    correct: 1,
    explanation: "Embedded question: subject + verb. Example: 'Can you tell me what time it is?'"
  },
  {
    section: 'Question Tags & Embedded Questions',
    question: 'Complete the embedded question: I wonder ___ tomorrow.',
    options: ['A) if it will rain', 'B) if will it rain', 'C) will it rain', 'D) if it rains'],
    correct: 0,
    explanation: "Correct: 'if it will rain.' In embedded questions, use 'if' + subject + verb."
  },
  {
    section: 'Question Tags & Embedded Questions',
    question: "Choose the correct question tag: Let's go to the cinema, ___ ?",
    options: ["A) shall we", "B) will we", "C) don't we", "D) let's we"],
    correct: 0,
    explanation: "'Let's...' uses 'shall we?' as the question tag. Example: 'Let's go, shall we?'"
  },
  {
    section: 'Question Tags & Embedded Questions',
    question: 'Complete the embedded question: Do you know ___ ?',
    options: ['A) where does she live', 'B) where she lives', 'C) where lives she', 'D) where she live'],
    correct: 1,
    explanation: "Embedded question: subject + verb. Example: 'Do you know where she lives?'"
  },
  // Section 6: Both/Either/Neither & Adjective Order
  {
    section: 'Both/Either/Neither & Adjective Order',
    question: 'Choose the correct sentence:',
    options: ['A) Both of them are doctors.', 'B) Both them are doctors.', 'C) Both of them is doctors.', 'D) Both are them doctors.'],
    correct: 0,
    explanation: "Correct: 'Both of them are doctors.' 'Both of' is followed by a pronoun."
  },
  {
    section: 'Both/Either/Neither & Adjective Order',
    question: 'Complete with "either" or "neither": I don\'t like coffee or tea. I don\'t like ___ of them.',
    options: ['A) either', 'B) neither', 'C) both', 'D) none'],
    correct: 0,
    explanation: "Negative + either: 'I don't like either of them.' 'Neither' is not used after a negative verb."
  },
  {
    section: 'Both/Either/Neither & Adjective Order',
    question: 'Choose the correct adjective order: She has ___ hair.',
    options: ['A) beautiful long black', 'B) long beautiful black', 'C) black long beautiful', 'D) beautiful black long'],
    correct: 0,
    explanation: "Adjective order: opinion, size, age, shape, color, origin, material. Example: 'beautiful long black hair.'"
  },
  {
    section: 'Both/Either/Neither & Adjective Order',
    question: 'Complete with "both," "either," or "neither": ___ John nor Mary came to the party.',
    options: ['A) Both', 'B) Either', 'C) Neither', 'D) None'],
    correct: 2,
    explanation: "'Neither...nor' is used to say two things are not true. Example: 'Neither John nor Mary came.'"
  },
  {
    section: 'Both/Either/Neither & Adjective Order',
    question: 'Choose the correct adjective order: He bought a ___ car.',
    options: ['A) red sports expensive', 'B) expensive red sports', 'C) sports red expensive', 'D) red expensive sports'],
    correct: 1,
    explanation: "Adjective order: opinion, size, age, shape, color, origin, material. Example: 'expensive red sports car.'"
  },
  {
    section: 'Both/Either/Neither & Adjective Order',
    question: 'Complete the sentence: You can choose ___ the red one or the blue one.',
    options: ['A) both', 'B) either', 'C) neither', 'D) all'],
    correct: 1,
    explanation: "'Either...or' is used to offer a choice: 'You can choose either the red one or the blue one.'"
  },
  // Section 7: Future Continuous & Linking Words
  {
    section: 'Future Continuous & Linking Words',
    question: 'Choose the correct Future Continuous: This time tomorrow, I ___ on the beach.',
    options: ['A) will lie', 'B) will be lying', 'C) am lying', 'D) lie'],
    correct: 1,
    explanation: "Future Continuous: 'will be + verb-ing.' Example: 'I will be lying on the beach.'"
  },
  {
    section: 'Future Continuous & Linking Words',
    question: 'Complete with the correct linking word: She studied hard; ___, she failed the exam.',
    options: ['A) therefore', 'B) however', 'C) because', 'D) so'],
    correct: 1,
    explanation: "'However' is used to show contrast between two sentences. Example: 'She studied hard; however, she failed.'"
  },
  {
    section: 'Future Continuous & Linking Words',
    question: 'Choose the correct Future Continuous: ___ you ___ at 9 PM tonight?',
    options: ['A) Will, work', 'B) Will, be working', 'C) Are, working', 'D) Do, work'],
    correct: 1,
    explanation: "Future Continuous: 'Will you be working at 9 PM?' Structure: will + subject + be + verb-ing."
  },
  {
    section: 'Future Continuous & Linking Words',
    question: 'Complete with the correct linking word: He didn\'t study; ___, he failed the test.',
    options: ['A) however', 'B) although', 'C) therefore', 'D) despite'],
    correct: 2,
    explanation: "'Therefore' is used to show result: 'He didn't study; therefore, he failed.'"
  },
  {
    section: 'Future Continuous & Linking Words',
    question: 'Choose the correct sentence:',
    options: ['A) Because of the rain, so we stayed home.', 'B) Because it was raining, we stayed home.', 'C) Because the rain, we stayed home.', 'D) Because it was raining, so we stayed home.'],
    correct: 1,
    explanation: "Correct: 'Because it was raining, we stayed home.' 'Because' introduces a reason."
  },
  {
    section: 'Future Continuous & Linking Words',
    question: 'Complete with Future Continuous: Don\'t call me at 8 PM. I ___ dinner.',
    options: ['A) will have', 'B) will be having', 'C) am having', 'D) have'],
    correct: 1,
    explanation: "Future Continuous: 'will be having.' Example: 'I will be having dinner.'"
  },
  // Section 8: Prepositions & Object Pronouns
  {
    section: 'Prepositions & Object Pronouns',
    question: 'Choose the correct preposition of direction: The cat jumped ___ the wall.',
    options: ['A) over', 'B) above', 'C) on', 'D) in'],
    correct: 0,
    explanation: "'Over' is used for movement from one side to another: 'The cat jumped over the wall.'"
  },
  {
    section: 'Prepositions & Object Pronouns',
    question: 'Complete with the correct object pronoun: I gave the book to ___ yesterday.',
    options: ['A) she', 'B) her', 'C) hers', 'D) herself'],
    correct: 1,
    explanation: "'Her' is the object pronoun for 'she': 'I gave the book to her.'"
  },
  {
    section: 'Prepositions & Object Pronouns',
    question: 'Choose the correct preposition of place: The picture is hanging ___ the wall.',
    options: ['A) in', 'B) on', 'C) at', 'D) over'],
    correct: 1,
    explanation: "'On the wall' is the correct preposition for something attached to a surface."
  },
  {
    section: 'Prepositions & Object Pronouns',
    question: 'Complete with the correct object pronoun: Can you help ___ with this problem?',
    options: ['A) I', 'B) me', 'C) my', 'D) mine'],
    correct: 1,
    explanation: "'Me' is the object pronoun for 'I': 'Can you help me?'"
  }
];

async function main() {
  console.log('Seeding English B1 Level exam...');

  // Check if exam already exists
  const existingExam = await prisma.exam.findFirst({
    where: { title: 'English B1 Level' }
  });

  if (existingExam) {
    console.log('English B1 Level exam already exists, skipping.');
    return;
  }

  // Create exam
  const exam = await prisma.exam.create({
    data: {
      title: 'English B1 Level',
    },
  });
  console.log('English B1 Level exam created, ID:', exam.id);

  // Add questions
  for (const q of englishB1Questions) {
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