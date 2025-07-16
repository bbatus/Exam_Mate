import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const questions = [
    {
        section: "Digital Transformation",
        question: "What is the primary advantage of cloud technology's scalability for businesses?",
        options: [
            "A) Fixed resource allocation that never changes",
            "B) Ability to increase or decrease resources based on demand",
            "C) Automatic deletion of unused data",
            "D) Permanent storage of all business data"
        ],
        correct: 1,
        explanation: "Scalability allows businesses to dynamically adjust resources up or down based on current needs, providing flexibility and cost optimization."
    },
    {
        section: "Digital Transformation",
        question: "Which cloud deployment model provides the highest level of security control for sensitive data?",
        options: [
            "A) Public cloud",
            "B) Private cloud",
            "C) Hybrid cloud",
            "D) Multi-cloud"
        ],
        correct: 1,
        explanation: "Private cloud offers the highest level of security control as it's dedicated to a single organization and not shared with others."
    },
    {
        section: "Digital Transformation",
        question: "What does 'lift and shift' mean in cloud migration?",
        options: [
            "A) Moving applications to the cloud without modifying them",
            "B) Completely rewriting applications for the cloud",
            "C) Retiring old applications and building new ones",
            "D) Moving only data to the cloud"
        ],
        correct: 0,
        explanation: "Lift and shift (also known as rehost) means moving applications to the cloud with minimal or no changes to the application code."
    },
    {
        section: "Digital Transformation",
        question: "Which of the following is NOT a benefit of cloud technology?",
        options: [
            "A) Increased agility",
            "B) Reduced total cost of ownership",
            "C) Guaranteed 100% uptime",
            "D) Enhanced collaboration"
        ],
        correct: 2,
        explanation: "No cloud provider can guarantee 100% uptime. Cloud services typically offer high availability (99.9%+) but not absolute uptime guarantee."
    },
    {
        section: "Digital Transformation",
        question: "What is the primary difference between CapEx and OpEx in cloud computing?",
        options: [
            "A) CapEx is for software, OpEx is for hardware",
            "B) CapEx involves upfront investment, OpEx involves ongoing operational costs",
            "C) CapEx is cheaper than OpEx",
            "D) There is no difference between them"
        ],
        correct: 1,
        explanation: "CapEx (Capital Expenditure) requires large upfront investments in infrastructure, while OpEx (Operational Expenditure) involves paying for resources as you use them."
    },
    {
        section: "Digital Transformation",
        question: "What is a key characteristic of cloud-native applications?",
        options: [
            "A) They only run on one specific cloud provider",
            "B) They are designed to take advantage of cloud computing frameworks",
            "C) They cannot be updated after deployment",
            "D) They require physical hardware to operate"
        ],
        correct: 1,
        explanation: "Cloud-native applications are specifically designed to leverage cloud computing frameworks, including microservices, containers, and dynamic orchestration."
    },
    {
        section: "Digital Transformation",
        question: "Which Google Cloud benefit relates to environmental responsibility?",
        options: [
            "A) Intelligence",
            "B) Freedom",
            "C) Sustainability",
            "D) Collaboration"
        ],
        correct: 2,
        explanation: "Sustainability is one of Google Cloud's key benefits, focusing on environmental responsibility and carbon neutrality."
    },
    {
        section: "Digital Transformation",
        question: "What is the shared responsibility model in cloud computing?",
        options: [
            "A) Cloud provider is responsible for everything",
            "B) Customer is responsible for everything",
            "C) Both cloud provider and customer share security and operational responsibilities",
            "D) Only applies to private cloud deployments"
        ],
        correct: 2,
        explanation: "The shared responsibility model defines which security and operational tasks are handled by the cloud provider versus the customer."
    },
    {
        section: "Data Transformation",
        question: "What is the primary difference between a data warehouse and a data lake?",
        options: [
            "A) Data warehouses store structured data, data lakes store any type of data",
            "B) Data warehouses are smaller than data lakes",
            "C) Data lakes are only for backup purposes",
            "D) There is no difference between them"
        ],
        correct: 0,
        explanation: "Data warehouses typically store structured, processed data optimized for analysis, while data lakes can store structured, semi-structured, and unstructured data in their native formats."
    },
    {
        section: "Data Transformation",
        question: "Which Google Cloud service is best for storing object data like images and videos?",
        options: [
            "A) Cloud SQL",
            "B) Cloud Storage",
            "C) Cloud Spanner",
            "D) BigQuery"
        ],
        correct: 1,
        explanation: "Cloud Storage is Google's object storage service, ideal for storing unstructured data like images, videos, and documents."
    },
    {
        section: "Data Transformation",
        question: "What makes BigQuery unique as a data warehouse solution?",
        options: [
            "A) It only works with small datasets",
            "B) It's serverless and can handle massive datasets",
            "C) It only supports NoSQL queries",
            "D) It requires manual scaling"
        ],
        correct: 1,
        explanation: "BigQuery is a serverless, fully managed data warehouse that can automatically scale to handle massive datasets without infrastructure management."
    },
    {
        section: "Data Transformation",
        question: "Which Cloud Storage class is most cost-effective for data accessed less than once a year?",
        options: [
            "A) Standard",
            "B) Nearline",
            "C) Coldline",
            "D) Archive"
        ],
        correct: 3,
        explanation: "Archive storage class is the most cost-effective option for data that is accessed less than once a year, with the lowest storage costs but higher retrieval costs."
    },
    {
        section: "Data Transformation",
        question: "What is the primary purpose of Looker in the Google Cloud ecosystem?",
        options: [
            "A) Data storage",
            "B) Business intelligence and data visualization",
            "C) Machine learning model training",
            "D) Network security"
        ],
        correct: 1,
        explanation: "Looker is Google Cloud's business intelligence platform that enables users to explore, analyze, and visualize data to create insights and reports."
    },
    {
        section: "Data Transformation",
        question: "Which Google Cloud service enables real-time data streaming?",
        options: [
            "A) Cloud Storage",
            "B) Pub/Sub",
            "C) Cloud SQL",
            "D) Firestore"
        ],
        correct: 1,
        explanation: "Pub/Sub is Google Cloud's messaging service that enables real-time data streaming and event-driven architectures."
    },
    {
        section: "Data Transformation",
        question: "What type of database is Cloud Spanner?",
        options: [
            "A) NoSQL document database",
            "B) In-memory database",
            "C) Globally distributed relational database",
            "D) Graph database"
        ],
        correct: 2,
        explanation: "Cloud Spanner is a globally distributed, strongly consistent relational database service that combines the benefits of relational structure with global scale."
    },
    {
        section: "AI and ML",
        question: "What is the primary difference between Artificial Intelligence and Machine Learning?",
        options: [
            "A) AI and ML are the same thing",
            "B) AI is broader and includes ML as a subset",
            "C) ML is broader and includes AI as a subset",
            "D) AI is only for robotics, ML is only for data"
        ],
        correct: 1,
        explanation: "AI is the broader concept of machines being able to carry out tasks in a smart way, while ML is a subset of AI that focuses on learning from data."
    },
    {
        section: "AI and ML",
        question: "Which Google Cloud AI service would be best for analyzing customer sentiment in reviews?",
        options: [
            "A) Vision API",
            "B) Natural Language API",
            "C) Speech-to-Text API",
            "D) Translation API"
        ],
        correct: 1,
        explanation: "Natural Language API can analyze text for sentiment, entities, and syntax, making it ideal for analyzing customer sentiment in reviews."
    },
    {
        section: "AI and ML",
        question: "What is AutoML designed to do?",
        options: [
            "A) Automatically delete old machine learning models",
            "B) Enable users to build custom ML models with minimal ML expertise",
            "C) Only work with Google's pre-trained models",
            "D) Manage cloud infrastructure automatically"
        ],
        correct: 1,
        explanation: "AutoML allows users to build custom machine learning models tailored to their specific needs without requiring extensive ML expertise."
    },
    {
        section: "AI and ML",
        question: "Which service allows you to run machine learning models directly in BigQuery?",
        options: [
            "A) AutoML",
            "B) Vertex AI",
            "C) BigQuery ML",
            "D) TensorFlow"
        ],
        correct: 2,
        explanation: "BigQuery ML enables users to create and execute machine learning models directly in BigQuery using standard SQL queries."
    },
    {
        section: "AI and ML",
        question: "What is TensorFlow?",
        options: [
            "A) A Google Cloud database service",
            "B) An open-source machine learning framework",
            "C) A cloud storage solution",
            "D) A network security tool"
        ],
        correct: 1,
        explanation: "TensorFlow is an open-source machine learning framework developed by Google for building and training ML models."
    },
    {
        section: "AI and ML",
        question: "What is the primary benefit of using pre-trained APIs for AI/ML?",
        options: [
            "A) They require extensive ML expertise to use",
            "B) They provide immediate functionality without training time",
            "C) They can only work with Google's data",
            "D) They are more expensive than custom models"
        ],
        correct: 1,
        explanation: "Pre-trained APIs provide immediate AI/ML functionality without requiring training time, data preparation, or extensive ML expertise."
    },
    {
        section: "Infrastructure and Applications",
        question: "What is the main advantage of containerization?",
        options: [
            "A) Containers use more resources than virtual machines",
            "B) Containers provide consistency across different environments",
            "C) Containers can only run on Google Cloud",
            "D) Containers require more maintenance than VMs"
        ],
        correct: 1,
        explanation: "Containers provide consistent runtime environments across different platforms, making applications more portable and reliable."
    },
    {
        section: "Infrastructure and Applications",
        question: "Which Google Cloud service is best for running containerized applications?",
        options: [
            "A) Compute Engine",
            "B) App Engine",
            "C) Google Kubernetes Engine (GKE)",
            "D) Cloud Functions"
        ],
        correct: 2,
        explanation: "Google Kubernetes Engine (GKE) is specifically designed for running and managing containerized applications using Kubernetes."
    },
    {
        section: "Infrastructure and Applications",
        question: "What is serverless computing?",
        options: [
            "A) Computing without any servers",
            "B) Computing where server management is abstracted away from developers",
            "C) Computing that only works offline",
            "D) Computing that requires manual scaling"
        ],
        correct: 1,
        explanation: "Serverless computing means developers can focus on code without worrying about server management, as the cloud provider handles infrastructure automatically."
    },
    {
        section: "Infrastructure and Applications",
        question: "Which Google Cloud service is an example of serverless computing?",
        options: [
            "A) Compute Engine",
            "B) Cloud Functions",
            "C) Google Kubernetes Engine",
            "D) Cloud SQL"
        ],
        correct: 1,
        explanation: "Cloud Functions is a serverless compute service that automatically scales and manages the underlying infrastructure."
    },
    {
        section: "Infrastructure and Applications",
        question: "What is the primary benefit of using APIs?",
        options: [
            "A) They slow down application development",
            "B) They enable different software systems to communicate",
            "C) They only work within a single application",
            "D) They require specialized hardware"
        ],
        correct: 1,
        explanation: "APIs (Application Programming Interfaces) allow different software systems to communicate and share data, enabling integration and interoperability."
    },
    {
        section: "Infrastructure and Applications",
        question: "What is Apigee used for?",
        options: [
            "A) Database management",
            "B) API management and analytics",
            "C) Machine learning model training",
            "D) Data storage"
        ],
        correct: 1,
        explanation: "Apigee is Google Cloud's API management platform that helps organizations design, secure, deploy, and scale APIs."
    },
    {
        section: "Infrastructure and Applications",
        question: "Why might an organization choose a hybrid cloud strategy?",
        options: [
            "A) To avoid using cloud services entirely",
            "B) To keep sensitive data on-premises while using cloud for other workloads",
            "C) To increase complexity unnecessarily",
            "D) To reduce security"
        ],
        correct: 1,
        explanation: "Hybrid cloud allows organizations to keep sensitive data on-premises while leveraging cloud benefits for other workloads, providing flexibility and control."
    },
    {
        section: "Trust and Security",
        question: "What is the principle of least privilege in cloud security?",
        options: [
            "A) Giving users maximum access to all resources",
            "B) Giving users only the minimum access needed to perform their job",
            "C) Removing all user access",
            "D) Giving access only to administrators"
        ],
        correct: 1,
        explanation: "The principle of least privilege means users should only have the minimum level of access required to perform their job functions, reducing security risks."
    },
    {
        section: "Trust and Security",
        question: "What is the difference between authentication and authorization?",
        options: [
            "A) There is no difference",
            "B) Authentication verifies identity, authorization determines permissions",
            "C) Authentication is for humans, authorization is for machines",
            "D) Authentication is optional, authorization is mandatory"
        ],
        correct: 1,
        explanation: "Authentication verifies who you are (identity), while authorization determines what you're allowed to do (permissions)."
    },
    {
        section: "Trust and Security",
        question: "What is two-step verification (2SV)?",
        options: [
            "A) Using two different passwords",
            "B) An additional security step beyond username and password",
            "C) Verifying identity twice with the same method",
            "D) A backup authentication system"
        ],
        correct: 1,
        explanation: "Two-step verification adds an extra layer of security by requiring a second form of verification beyond just username and password."
    },
    {
        section: "Trust and Security",
        question: "What is Google Cloud Armor used for?",
        options: [
            "A) Data encryption",
            "B) Identity and access management",
            "C) DDoS protection and web application firewall",
            "D) Database security"
        ],
        correct: 2,
        explanation: "Google Cloud Armor provides DDoS protection and web application firewall (WAF) capabilities to protect applications from attacks."
    },
    {
        section: "Trust and Security",
        question: "What is data sovereignty?",
        options: [
            "A) The right to delete any data",
            "B) The concept that data is subject to the laws of the country where it's stored",
            "C) The ability to access data from anywhere",
            "D) The right to share data freely"
        ],
        correct: 1,
        explanation: "Data sovereignty refers to the concept that data is subject to the laws and governance structures of the nation where it's collected or stored."
    },
    {
        section: "Trust and Security",
        question: "What does 'defense in depth' mean in cloud security?",
        options: [
            "A) Having only one strong security layer",
            "B) Using multiple layers of security controls",
            "C) Focusing only on network security",
            "D) Relying entirely on the cloud provider for security"
        ],
        correct: 1,
        explanation: "Defense in depth is a security strategy that uses multiple layers of security controls to protect against various types of attacks."
    },
    {
        section: "Scaling and Operations",
        question: "What is the primary benefit of using resource quotas in Google Cloud?",
        options: [
            "A) To increase performance",
            "B) To control costs and resource consumption",
            "C) To improve security",
            "D) To enable automation"
        ],
        correct: 1,
        explanation: "Resource quotas help organizations control costs and resource consumption by setting limits on how much of each resource can be used."
    },
    {
        section: "Scaling and Operations",
        question: "What is the Google Cloud resource hierarchy?",
        options: [
            "A) A way to organize and manage cloud resources",
            "B) A performance ranking system",
            "C) A security protocol",
            "D) A billing method"
        ],
        correct: 0,
        explanation: "The Google Cloud resource hierarchy provides a way to organize and manage cloud resources hierarchically, enabling better access control and billing management."
    },
    {
        section: "Scaling and Operations",
        question: "What is Site Reliability Engineering (SRE)?",
        options: [
            "A) A job title only",
            "B) An approach to managing large-scale systems reliably",
            "C) A security methodology",
            "D) A database management technique"
        ],
        correct: 1,
        explanation: "SRE is an approach to managing large-scale systems that applies software engineering principles to operations and reliability challenges."
    },
    {
        section: "Scaling and Operations",
        question: "What is the primary purpose of Cloud Billing Reports?",
        options: [
            "A) To manage user access",
            "B) To visualize and analyze cloud spending",
            "C) To monitor application performance",
            "D) To configure security settings"
        ],
        correct: 1,
        explanation: "Cloud Billing Reports help organizations visualize and analyze their cloud spending to better understand and control costs."
    },
    {
        section: "Scaling and Operations",
        question: "What is high availability in cloud computing?",
        options: [
            "A) 100% uptime guarantee",
            "B) The ability to remain operational even when some components fail",
            "C) Fast processing speeds",
            "D) Large storage capacity"
        ],
        correct: 1,
        explanation: "High availability refers to a system's ability to remain operational and accessible even when some components fail or are unavailable."
    },
    {
        section: "Scaling and Operations",
        question: "How does Google Cloud support sustainability goals?",
        options: [
            "A) By using only renewable energy",
            "B) By providing carbon footprint reporting and efficient infrastructure",
            "C) By limiting the number of data centers",
            "D) By restricting access to certain services"
        ],
        correct: 1,
        explanation: "Google Cloud supports sustainability through carbon footprint reporting, efficient infrastructure, and commitment to renewable energy."
    },
    {
        section: "Digital Transformation",
        question: "What is the primary characteristic of microservices architecture?",
        options: [
            "A) One large application handling all functions",
            "B) Small, independent services that communicate over APIs",
            "C) Services that can only run on physical servers",
            "D) Applications that don't need databases"
        ],
        correct: 1,
        explanation: "Microservices architecture breaks applications into small, independent services that communicate through APIs, enabling better scalability and maintainability."
    },
    {
        section: "Data Transformation",
        question: "What is the main advantage of using Dataflow for data processing?",
        options: [
            "A) It only works with small datasets",
            "B) It provides unified stream and batch processing",
            "C) It requires manual scaling",
            "D) It only supports SQL queries"
        ],
        correct: 1,
        explanation: "Dataflow provides unified stream and batch data processing capabilities with automatic scaling and management."
    },
    {
        section: "AI and ML",
        question: "What is Vertex AI?",
        options: [
            "A) A database service",
            "B) Google Cloud's unified ML platform",
            "C) A networking tool",
            "D) A security service"
        ],
        correct: 1,
        explanation: "Vertex AI is Google Cloud's unified machine learning platform that brings together various ML tools and services."
    },
    {
        section: "Infrastructure and Applications",
        question: "What is the main benefit of using preemptible VMs?",
        options: [
            "A) They provide better performance",
            "B) They cost significantly less but can be terminated",
            "C) They have more storage",
            "D) They are more secure"
        ],
        correct: 1,
        explanation: "Preemptible VMs cost significantly less than regular VMs but can be terminated by Google Cloud when resources are needed elsewhere."
    },
    {
        section: "Infrastructure and Applications",
        question: "What is Cloud Run?",
        options: [
            "A) A monitoring service",
            "B) A fully managed serverless platform for containerized applications",
            "C) A database service",
            "D) A networking service"
        ],
        correct: 1,
        explanation: "Cloud Run is a fully managed serverless platform that automatically scales containerized applications."
    },
    {
        section: "Trust and Security",
        question: "What is the purpose of encryption at rest?",
        options: [
            "A) To protect data while it's being transmitted",
            "B) To protect data while it's stored",
            "C) To speed up data access",
            "D) To reduce storage costs"
        ],
        correct: 1,
        explanation: "Encryption at rest protects data while it's stored on disk or in databases, ensuring it remains secure even if storage media is compromised."
    },
    {
        section: "Trust and Security",
        question: "What is Identity and Access Management (IAM) used for?",
        options: [
            "A) Managing network connections",
            "B) Controlling who can access what resources",
            "C) Monitoring application performance",
            "D) Managing data storage"
        ],
        correct: 1,
        explanation: "IAM controls user access to resources by managing identities, roles, and permissions across Google Cloud services."
    },
    {
        section: "Scaling and Operations",
        question: "What is the purpose of disaster recovery in cloud computing?",
        options: [
            "A) To prevent all system failures",
            "B) To restore operations quickly after a major disruption",
            "C) To reduce cloud costs",
            "D) To improve application performance"
        ],
        correct: 1,
        explanation: "Disaster recovery ensures business continuity by enabling quick restoration of operations after major disruptions or failures."
    },
    {
        section: "Scaling and Operations",
        question: "What is DevOps?",
        options: [
            "A) A specific Google Cloud service",
            "B) A culture and practice that combines development and operations",
            "C) A programming language",
            "D) A type of database"
        ],
        correct: 1,
        explanation: "DevOps is a culture and set of practices that combines software development and IT operations to shorten development cycles and improve deployment frequency."
    },
    {
        section: "Digital Transformation",
        question: "What is the main benefit of digital transformation for businesses?",
        options: [
            "A) Reducing the number of employees",
            "B) Improving efficiency, innovation, and customer experience",
            "C) Eliminating all traditional business processes",
            "D) Focusing only on online sales"
        ],
        correct: 1,
        explanation: "Digital transformation helps businesses improve efficiency, drive innovation, and enhance customer experience through the strategic use of technology."
    }
];

// Google Cloud Generative AI Leader sınavı için sorular
const genAIQuestions = [
  {
    section: "Fundamentals of gen AI",
    question: "What is the key difference between traditional machine learning and generative AI?",
    options: [
      "A) Traditional ML only works with structured data",
      "B) Generative AI creates new content, traditional ML makes predictions",
      "C) Traditional ML is faster than generative AI",
      "D) Generative AI requires less data than traditional ML"
    ],
    correct: 1,
    explanation: "Generative AI creates new content, traditional ML makes predictions. While traditional machine learning models are primarily designed to make predictions based on patterns in existing data, generative AI models can create entirely new content that resembles the data they were trained on.",
    category: "Fundamentals of gen AI"
  },
  {
    section: "Fundamentals of gen AI",
    question: "Which type of machine learning approach is primarily used for training large language models?",
    options: [
      "A) Supervised learning",
      "B) Unsupervised learning",
      "C) Reinforcement learning",
      "D) Self-supervised learning"
    ],
    correct: 3,
    explanation: "Self-supervised learning is primarily used for training large language models. This approach allows models to learn from vast amounts of unlabeled text data by predicting parts of the input from other parts, without requiring explicit human-labeled examples.",
    category: "Fundamentals of gen AI"
  },
  {
    section: "Fundamentals of gen AI",
    question: "What is a foundation model in the context of generative AI?",
    options: [
      "A) A model that only works with text",
      "B) A large pre-trained model that can be adapted for various tasks",
      "C) A model that requires minimal training data",
      "D) A model that cannot be customized"
    ],
    correct: 1,
    explanation: "A foundation model is a large pre-trained model that can be adapted for various tasks. These models are trained on vast amounts of data and can be fine-tuned or adapted to perform specific tasks with relatively little additional training.",
    category: "Fundamentals of gen AI"
  },
  {
    section: "Fundamentals of gen AI",
    question: "What is the primary advantage of multimodal foundation models?",
    options: [
      "A) They are faster than single-modal models",
      "B) They can process and generate multiple types of data (text, images, audio)",
      "C) They require less computational power",
      "D) They are more secure than single-modal models"
    ],
    correct: 1,
    explanation: "The primary advantage of multimodal foundation models is that they can process and generate multiple types of data, including text, images, and audio. This allows them to understand and create content across different modalities, enabling more versatile applications.",
    category: "Fundamentals of gen AI"
  },
  {
    section: "Techniques to improve gen AI model output",
    question: "What is prompt engineering?",
    options: [
      "A) Building AI models from scratch",
      "B) The practice of crafting inputs to get desired outputs from AI models",
      "C) Engineering the underlying model architecture",
      "D) Optimizing model training speed"
    ],
    correct: 1,
    explanation: "Prompt engineering is the practice of crafting inputs to get desired outputs from AI models. It involves designing effective prompts that guide the model to produce the specific type of response or content that the user wants.",
    category: "Techniques to improve gen AI model output"
  },
  {
    section: "Business strategies for a successful gen AI solution",
    question: "Which factor is most important when choosing a foundation model for a business use case?",
    options: [
      "A) The model's popularity",
      "B) The model's alignment with business requirements and constraints",
      "C) The model's age",
      "D) The model's complexity"
    ],
    correct: 1,
    explanation: "The most important factor when choosing a foundation model for a business use case is the model's alignment with business requirements and constraints. This includes considerations like the specific tasks the model needs to perform, data privacy requirements, computational resources available, and cost constraints.",
    category: "Business strategies for a successful gen AI solution"
  },
  {
    section: "Fundamentals of gen AI",
    question: "What is the main difference between structured and unstructured data?",
    options: [
      "A) Structured data is larger than unstructured data",
      "B) Structured data is organized in a predefined format, unstructured data is not",
      "C) Structured data is more valuable than unstructured data",
      "D) Structured data is newer than unstructured data"
    ],
    correct: 1,
    explanation: "Structured data is organized in a predefined format (like databases or spreadsheets), while unstructured data lacks a specific format (like text documents, images, or videos). This fundamental difference affects how data is stored, processed, and analyzed.",
    category: "Fundamentals of gen AI"
  },
  {
    section: "Fundamentals of gen AI",
    question: "What is the difference between labeled and unlabeled data?",
    options: [
      "A) Labeled data has correct answers provided, unlabeled data does not",
      "B) Labeled data is more expensive than unlabeled data",
      "C) Labeled data is structured, unlabeled data is unstructured",
      "D) Labeled data is newer than unlabeled data"
    ],
    correct: 0,
    explanation: "Labeled data has correct answers or tags provided, while unlabeled data does not. Labeled data is essential for supervised learning approaches, where models learn to make predictions based on examples with known outcomes.",
    category: "Fundamentals of gen AI"
  },
  {
    section: "Google Cloud's gen AI offerings",
    question: "What is the primary strength of Google's Gemini model?",
    options: [
      "A) It only works with text",
      "B) It's a multimodal model that can understand and generate text, images, and code",
      "C) It's the smallest foundation model",
      "D) It only works with images"
    ],
    correct: 1,
    explanation: "The primary strength of Google's Gemini model is that it's a multimodal model capable of understanding and generating text, images, and code. This versatility allows it to process and create content across different modalities, making it suitable for a wide range of applications.",
    category: "Google Cloud's gen AI offerings"
  },
  {
    section: "Google Cloud's gen AI offerings",
    question: "What is Google's Imagen model specifically designed for?",
    options: [
      "A) Text generation",
      "B) Code generation",
      "C) Image generation and editing",
      "D) Video generation"
    ],
    correct: 2,
    explanation: "Google's Imagen model is specifically designed for image generation and editing. It can create high-quality images from text descriptions and perform various image editing tasks.",
    category: "Google Cloud's gen AI offerings"
  }
];

async function main() {
  console.log('Seeding...');
  
  // Check if exams already exist
  const existingExams = await prisma.exam.findMany({
    select: { title: true }
  });
  
  const existingTitles = new Set(existingExams.map(exam => exam.title));
  
  // Create the main exam category if it doesn't exist
  let exam;
  if (!existingTitles.has('Google Cloud Digital Leader')) {
    exam = await prisma.exam.create({
      data: {
        title: 'Google Cloud Digital Leader',
      },
    });
    console.log('Created Google Cloud Digital Leader exam with ID:', exam.id);
    
    // Create questions and link them to the exam
    for (const q of questions) {
      await prisma.question.create({
        data: {
          ...q,
          examId: exam.id,
        },
      });
    }
  } else {
    console.log('Google Cloud Digital Leader exam already exists, skipping creation');
    exam = await prisma.exam.findFirst({
      where: { title: 'Google Cloud Digital Leader' }
    });
  }

  // Create the Google Cloud Generative AI Leader exam if it doesn't exist
  let genAIExam;
  if (!existingTitles.has('Google Cloud Generative AI Leader')) {
    genAIExam = await prisma.exam.create({
      data: {
        title: 'Google Cloud Generative AI Leader',
      },
    });
    console.log('Created Google Cloud Generative AI Leader exam with ID:', genAIExam.id);
    
    // Create questions and link them to the Gen AI exam
    for (const q of genAIQuestions) {
      await prisma.question.create({
        data: {
          ...q,
          examId: genAIExam.id,
        },
      });
    }
  } else {
    console.log('Google Cloud Generative AI Leader exam already exists, skipping creation');
    genAIExam = await prisma.exam.findFirst({
      where: { title: 'Google Cloud Generative AI Leader' }
    });
  }

  // Create the Google Cloud Associate Cloud Engineer exam if it doesn't exist
  let aceExam;
  if (!existingTitles.has('Google Cloud Associate Cloud Engineer')) {
    aceExam = await prisma.exam.create({
      data: {
        title: 'Google Cloud Associate Cloud Engineer',
      },
    });
    console.log('Created Google Cloud Associate Cloud Engineer exam with ID:', aceExam.id);
  } else {
    console.log('Google Cloud Associate Cloud Engineer exam already exists, skipping creation');
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 