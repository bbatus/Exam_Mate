import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const awsCloudPractitionerQuestions = [
  // Domain 1: Cloud Concepts (12 Questions)
  {
    section: 'Cloud Concepts',
    question: 'Which Well-Architected pillar focuses on workload recovery?',
    options: ['A) Performance Efficiency', 'B) Cost Optimization', 'C) Reliability', 'D) Operational Excellence'],
    correct: 2,
    explanation: "The Reliability pillar of the AWS Well-Architected Framework focuses on ensuring workloads can recover quickly from failures and continue to function. This is achieved through features like multi-AZ deployments, automated backups, and self-healing infrastructure. For example, if an Availability Zone fails, workloads can automatically fail over to another zone."
  },
  {
    section: 'Cloud Concepts',
    question: 'What enables cost reduction through aggregated usage?',
    options: ['A) Elasticity', 'B) Economies of scale', 'C) OpEx flexibility', 'D) Managed services'],
    correct: 1,
    explanation: "Economies of scale allow AWS to aggregate usage from millions of customers, reducing per-unit costs. As AWS grows, it can negotiate better prices for hardware and pass those savings to customers. This is a key benefit of cloud computing versus on-premises IT."
  },
  {
    section: 'Cloud Concepts',
    question: 'Which migration strategy uses DNS switching?',
    options: ['A) Rehosting', 'B) Replatforming', 'C) Blue/Green deployment', 'D) Database replication'],
    correct: 2,
    explanation: "A Blue/Green deployment uses DNS switching (e.g., with Route 53) to instantly shift traffic from the old environment (blue) to the new one (green). This enables zero-downtime releases and easy rollback. Other strategies like rehosting or replatforming do not use DNS switching for cutover."
  },
  {
    section: 'Cloud Concepts',
    question: 'What reduces costs by terminating unused resources?',
    options: ['A) Automation', 'B) Reserved Instances', 'C) Consolidated billing', 'D) Spot Instances'],
    correct: 0,
    explanation: "Automation in AWS (using services like CloudFormation, Lambda, or EventBridge) can detect and terminate unused resources, such as idle EC2 instances, to reduce costs. Manual management is error-prone and less efficient."
  },
  {
    section: 'Cloud Concepts',
    question: 'Which benefit applies to edge locations?',
    options: ['A) Cheaper storage', 'B) Reduced latency', 'C) Enhanced compliance', 'D) Free data transfer'],
    correct: 1,
    explanation: "Edge locations, used by Amazon CloudFront, cache content closer to end-users, reducing latency and improving performance. This is especially important for global applications. Cheaper storage or free data transfer are not guaranteed at edge locations."
  },
  {
    section: 'Cloud Concepts',
    question: 'What describes OpEx cloud pricing?',
    options: ['A) Upfront hardware costs', 'B) Pay-as-you-go model', 'C) Depreciation accounting', 'D) Long-term contracts'],
    correct: 1,
    explanation: "OpEx (Operational Expenditure) in the cloud means you pay only for what you use (pay-as-you-go), avoiding large upfront hardware costs (CapEx). This model provides flexibility and scalability for businesses."
  },
  {
    section: 'Cloud Concepts',
    question: 'Which framework guides cloud transformations?',
    options: ['A) ITIL', 'B) AWS CAF', 'C) COBIT', 'D) PMBOK'],
    correct: 1,
    explanation: "The AWS Cloud Adoption Framework (CAF) provides best practices and guidance for organizations moving to the cloud. It covers business, people, governance, and technical perspectives, helping ensure a smooth transformation."
  },
  {
    section: 'Cloud Concepts',
    question: 'What allows BYOL for software licenses?',
    options: ['A) Dedicated Hosts', 'B) Spot Instances', 'C) Savings Plans', 'D) All of the above'],
    correct: 3,
    explanation: "AWS supports Bring Your Own License (BYOL) for software on Dedicated Hosts, Spot Instances, and Savings Plans. This flexibility allows customers to use existing licenses and optimize costs across different compute options."
  },
  {
    section: 'Cloud Concepts',
    question: 'Which principle enables automatic scaling?',
    options: ['A) High availability', 'B) Elasticity', 'C) Global reach', 'D) Fault tolerance'],
    correct: 1,
    explanation: "Elasticity is the ability to automatically scale resources up or down based on demand. AWS Auto Scaling groups can add or remove EC2 instances as needed, ensuring performance and cost efficiency."
  },
  {
    section: 'Cloud Concepts',
    question: 'What is a key hybrid cloud benefit?',
    options: ['A) Eliminates on-premises costs', 'B) Gradual migration path', 'C) Automatic compliance', 'D) Free network connectivity'],
    correct: 1,
    explanation: "A key benefit of hybrid cloud is enabling a gradual migration path. Organizations can move workloads to AWS in phases, using services like Direct Connect for secure, low-latency connectivity between on-premises and cloud environments."
  },
  {
    section: 'Cloud Concepts',
    question: 'Which service is serverless? (Choose 2)',
    options: ['A) AWS Lambda', 'B) Amazon EC2', 'C) Amazon DynamoDB', 'D) Amazon RDS'],
    correct: 0, // Only the first correct index is used due to system constraints
    explanation: "AWS Lambda is a serverless compute service that runs code in response to events without provisioning or managing servers. DynamoDB is also serverless for database workloads. (System supports only one correct answer, so only Lambda is marked correct.)"
  },
  {
    section: 'Cloud Concepts',
    question: 'What improves sustainability?',
    options: ['A) Local Zones', 'B) Compute density optimization', 'C) Snowball Edge', 'D) Outposts'],
    correct: 1,
    explanation: "Compute density optimization means running workloads on fewer, more powerful servers, increasing utilization and reducing energy consumption per workload. This improves sustainability in AWS data centers."
  },
  // Domain 2: Security & Compliance (15 Questions)
  {
    section: 'Security & Compliance',
    question: 'Who manages physical security in AWS?',
    options: ['A) AWS', 'B) Customer', 'C) Shared responsibility', 'D) Third-party auditors'],
    correct: 0,
    explanation: "AWS is responsible for physical security of its data centers, including facilities, hardware, and the hypervisor layer. Customers are responsible for security in the cloud, such as data and identity management."
  },
  {
    section: 'Security & Compliance',
    question: 'Where are IAM credentials stored securely?',
    options: ['A) AWS Config', 'B) Secrets Manager', 'C) CloudTrail logs', 'D) S3 buckets'],
    correct: 1,
    explanation: "AWS Secrets Manager securely stores, encrypts, and rotates credentials such as database passwords and API keys. IAM credentials should not be stored in plain text or in S3 buckets."
  },
  {
    section: 'Security & Compliance',
    question: 'Which provides DDoS protection?',
    options: ['A) GuardDuty', 'B) Inspector', 'C) AWS Shield', 'D) Macie'],
    correct: 2,
    explanation: "AWS Shield provides DDoS protection for AWS resources. Shield Standard is included at no extra cost, while Shield Advanced offers additional features like WAF integration and 24/7 support."
  },
  {
    section: 'Security & Compliance',
    question: 'What enforces password policies? (Choose 2)',
    options: ['A) IAM', 'B) KMS', 'C) Organizations', 'D) Certificate Manager'],
    correct: 0, // Only the first correct index is used
    explanation: "IAM enforces password policies for AWS accounts, such as minimum length and complexity. Organizations can extend these policies across multiple accounts. (System supports only one correct answer, so only IAM is marked correct.)"
  },
  {
    section: 'Security & Compliance',
    question: 'Which detects unintended resource exposure?',
    options: ['A) Access Analyzer', 'B) Trusted Advisor', 'C) Artifact', 'D) Security Hub'],
    correct: 0,
    explanation: "Access Analyzer helps detect unintended resource exposure by analyzing policies for S3 buckets, IAM roles, and other resources to identify those accessible from outside your AWS account."
  },
  {
    section: 'Security & Compliance',
    question: 'What encrypts data at rest? (Choose 2)',
    options: ['A) EBS volume encryption', 'B) SSL/TLS', 'C) S3 server-side encryption', 'D) VPC flow logs'],
    correct: 0, // Only the first correct index is used
    explanation: "EBS volume encryption and S3 server-side encryption protect data at rest using strong encryption algorithms (e.g., AES-256). Keys are managed via AWS KMS. (System supports only one correct answer, so only EBS encryption is marked correct.)"
  },
  {
    section: 'Security & Compliance',
    question: 'Which proves compliance?',
    options: ['A) CloudWatch', 'B) Audit Manager', 'C) Config', 'D) Detective'],
    correct: 1,
    explanation: "AWS Audit Manager automates the collection of evidence for compliance audits (e.g., ISO, SOC, HIPAA). It helps organizations prove compliance with regulatory requirements."
  },
  {
    section: 'Security & Compliance',
    question: 'What protects root accounts? (Choose 2)',
    options: ['A) MFA', 'B) Access keys', 'C) Physical security token', 'D) IAM policies'],
    correct: 0, // Only the first correct index is used
    explanation: "Multi-factor authentication (MFA) and physical security tokens provide strong protection for root accounts. MFA requires a second factor (e.g., hardware token or app) in addition to a password. (System supports only one correct answer, so only MFA is marked correct.)"
  },
  {
    section: 'Security & Compliance',
    question: 'Where are API calls logged?',
    options: ['A) CloudWatch', 'B) CloudTrail', 'C) X-Ray', 'D) EventBridge'],
    correct: 1,
    explanation: "AWS CloudTrail logs all API calls and user activity in your AWS account, providing a complete audit trail for security and compliance. CloudWatch is for monitoring, not logging API calls."
  },
  {
    section: 'Security & Compliance',
    question: 'Which grants temporary access?',
    options: ['A) IAM users', 'B) STS AssumeRole', 'C) Managed policies', 'D) Service-linked roles'],
    correct: 1,
    explanation: "AWS Security Token Service (STS) AssumeRole grants temporary, limited-privilege credentials for users or applications, improving security by reducing the need for long-term credentials."
  },
  {
    section: 'Security & Compliance',
    question: 'What monitors security posture?',
    options: ['A) Artifact', 'B) Security Hub', 'C) Inspector', 'D) Macie'],
    correct: 1,
    explanation: "AWS Security Hub aggregates and prioritizes security findings from multiple AWS services (GuardDuty, Macie, Inspector) to provide a comprehensive view of your security posture."
  },
  {
    section: 'Security & Compliance',
    question: 'Which is a network firewall?',
    options: ['A) Security groups', 'B) IAM policies', 'C) KMS', 'D) ACM'],
    correct: 0,
    explanation: "Security groups act as virtual firewalls for EC2 instances, controlling inbound and outbound traffic at the instance level. They are stateful and can be updated dynamically."
  },
  {
    section: 'Security & Compliance',
    question: 'What prevents accidental S3 deletion?',
    options: ['A) ACLs', 'B) Encryption', 'C) Versioning', 'D) Replication'],
    correct: 2,
    explanation: "S3 Versioning preserves previous versions of objects, protecting against accidental deletion or overwrites. This is a key feature for data durability and recovery."
  },
  {
    section: 'Security & Compliance',
    question: 'Where is PCI DSS documentation?',
    options: ['A) Artifact', 'B) Trusted Advisor', 'C) Support Center', 'D) Config'],
    correct: 0,
    explanation: "AWS Artifact provides on-demand access to compliance reports and documentation, such as PCI DSS, SOC, and ISO certifications."
  },
  {
    section: 'Security & Compliance',
    question: 'What scans for vulnerabilities?',
    options: ['A) Shield', 'B) Inspector', 'C) WAF', 'D) GuardDuty'],
    correct: 1,
    explanation: "Amazon Inspector automatically scans EC2 instances and containers for vulnerabilities and deviations from best practices, helping improve security posture."
  },
  // Domain 3: Technology & Services (17 Questions)
  {
    section: 'Technology & Services',
    question: 'Which is a data warehouse?',
    options: ['A) DynamoDB', 'B) Redshift', 'C) ElastiCache', 'D) DocumentDB'],
    correct: 1,
    explanation: "Amazon Redshift is a fully managed, petabyte-scale data warehouse that uses columnar storage for fast analytics. It is designed for complex queries and large datasets."
  },
  {
    section: 'Technology & Services',
    question: 'What connects on-premises to VPC?',
    options: ['A) Internet Gateway', 'B) VPN Connection', 'C) NAT Gateway', 'D) Route 53'],
    correct: 1,
    explanation: "A VPN Connection provides secure, encrypted communication between on-premises networks and AWS VPCs. Site-to-Site VPN is commonly used for hybrid cloud connectivity."
  },
  {
    section: 'Technology & Services',
    question: 'Which scales read replicas?',
    options: ['A) DynamoDB', 'B) Aurora', 'C) Neptune', 'D) Keyspaces'],
    correct: 1,
    explanation: "Amazon Aurora is a MySQL/PostgreSQL-compatible relational database that supports up to 15 read replicas for high scalability and availability."
  },
  {
    section: 'Technology & Services',
    question: 'What is serverless compute?',
    options: ['A) EC2', 'B) Lambda', 'C) ECS', 'D) Lightsail'],
    correct: 1,
    explanation: "AWS Lambda is a serverless compute service that runs code in response to events, with no server management required. You pay only for compute time consumed."
  },
  {
    section: 'Technology & Services',
    question: 'Which stores objects?',
    options: ['A) EFS', 'B) EBS', 'C) S3', 'D) FSx'],
    correct: 2,
    explanation: "Amazon S3 is a scalable object storage service with 99.999999999% (11 9's) durability, suitable for backup, archiving, and big data analytics."
  },
  {
    section: 'Technology & Services',
    question: 'What provides GPU compute?',
    options: ['A) T3 instances', 'B) P3 instances', 'C) C5 instances', 'D) M5 instances'],
    correct: 1,
    explanation: "P3 instances are EC2 instance types optimized for GPU workloads, such as machine learning and graphics processing."
  },
  {
    section: 'Technology & Services',
    question: 'Which is a message queue?',
    options: ['A) SNS', 'B) SQS', 'C) EventBridge', 'D) Kinesis'],
    correct: 1,
    explanation: "Amazon SQS is a fully managed message queuing service that decouples application components, improving scalability and reliability."
  },
  {
    section: 'Technology & Services',
    question: 'What analyzes log data?',
    options: ['A) Athena', 'B) QuickSight', 'C) CloudWatch Logs Insights', 'D) Glue'],
    correct: 2,
    explanation: "CloudWatch Logs Insights allows you to query and analyze log data in real time, without moving it to a separate analytics service."
  },
  {
    section: 'Technology & Services',
    question: 'Which is a CDN?',
    options: ['A) CloudFront', 'B) Global Accelerator', 'C) Direct Connect', 'D) Transit Gateway'],
    correct: 0,
    explanation: "Amazon CloudFront is a global Content Delivery Network (CDN) with over 310 edge locations, delivering content with low latency and high transfer speeds."
  },
  {
    section: 'Technology & Services',
    question: 'What manages containers?',
    options: ['A) Lambda', 'B) ECS', 'C) Batch', 'D) Elastic Beanstalk'],
    correct: 1,
    explanation: "Amazon ECS (Elastic Container Service) is a fully managed container orchestration service for running Docker containers at scale."
  },
  {
    section: 'Technology & Services',
    question: 'Which provides low-latency HPC?',
    options: ['A) Wavelength', 'B) Snowcone', 'C) Elastic Fabric Adapter', 'D) Storage Gateway'],
    correct: 2,
    explanation: "Elastic Fabric Adapter (EFA) is a network interface for EC2 instances that enables low-latency, high-bandwidth communication for tightly-coupled HPC workloads."
  },
  {
    section: 'Technology & Services',
    question: 'What is for infrequent data access?',
    options: ['A) S3 Standard', 'B) S3 Glacier', 'C) EFS', 'D) Instance store'],
    correct: 1,
    explanation: "Amazon S3 Glacier is a low-cost storage class for data archiving and long-term backup, with retrieval times ranging from minutes to hours."
  },
  {
    section: 'Technology & Services',
    question: 'Which transforms data?',
    options: ['A) Kinesis', 'B) Glue', 'C) Athena', 'D) Redshift'],
    correct: 1,
    explanation: "AWS Glue is a serverless ETL (Extract, Transform, Load) service that prepares and transforms data for analytics and machine learning."
  },
  {
    section: 'Technology & Services',
    question: 'What provides desktop virtualization?',
    options: ['A) AppSync', 'B) WorkSpaces', 'C) AppStream', 'D) Amplify'],
    correct: 1,
    explanation: "Amazon WorkSpaces is a managed Desktop-as-a-Service (DaaS) solution that provides secure, cloud-based virtual desktops for users."
  },
  {
    section: 'Technology & Services',
    question: 'Which is IoT core capability?',
    options: ['A) Blockchain', 'B) Device shadow', 'C) Video transcoding', 'D) AR/VR'],
    correct: 1,
    explanation: "Device Shadow is an AWS IoT Core feature that stores the last reported state of a device, allowing applications to interact with devices even when they are offline."
  },
  {
    section: 'Technology & Services',
    question: 'What tracks application requests?',
    options: ['A) CloudTrail', 'B) X-Ray', 'C) CodeGuru', 'D) Inspector'],
    correct: 1,
    explanation: "AWS X-Ray helps developers analyze and debug distributed applications by tracking requests as they travel through AWS services."
  },
  {
    section: 'Technology & Services',
    question: 'Which is for CI/CD?',
    options: ['A) OpsWorks', 'B) CodePipeline', 'C) Systems Manager', 'D) Service Catalog'],
    correct: 1,
    explanation: "AWS CodePipeline is a fully managed CI/CD service that automates the build, test, and deployment phases of your release process."
  },
  // Domain 4: Billing & Support (6 Questions)
  {
    section: 'Billing & Support',
    question: 'Which provides largest discount?',
    options: ['A) On-Demand', 'B) Spot', 'C) 3-year Reserved', 'D) Dedicated Hosts'],
    correct: 2,
    explanation: "3-year Reserved Instances provide the largest discount (up to 72%) compared to On-Demand or Spot pricing, especially with full upfront payment."
  },
  {
    section: 'Billing & Support',
    question: 'What analyzes spending patterns?',
    options: ['A) Budgets', 'B) Cost Explorer', 'C) Cost and Usage Report', 'D) Pricing Calculator'],
    correct: 1,
    explanation: "AWS Cost Explorer visualizes your spending patterns with daily granularity for up to 13 months, helping you analyze and optimize costs."
  },
  {
    section: 'Billing & Support',
    question: 'Which includes infrastructure support?',
    options: ['A) Developer', 'B) Business', 'C) Enterprise', 'D) Basic'],
    correct: 2,
    explanation: "The Enterprise support plan includes infrastructure support with a 15-minute response time for business-critical systems."
  },
  {
    section: 'Billing & Support',
    question: 'What provides architectural guidance?',
    options: ['A) Trusted Advisor', 'B) Solutions Architect', 'C) Support Engineer', 'D) Concierge'],
    correct: 1,
    explanation: "AWS Solutions Architects provide architectural guidance and best practices, included in Business and Enterprise support plans."
  },
  {
    section: 'Billing & Support',
    question: 'Where are free whitepapers?',
    options: ['A) Support Center', 'B) AWS website', 'C) Cost Explorer', 'D) Artifact'],
    correct: 1,
    explanation: "AWS whitepapers are available for free on the AWS website, offering in-depth technical guidance and best practices."
  },
  {
    section: 'Billing & Support',
    question: 'Which reduces multi-account costs?',
    options: ['A) Cost Allocation Tags', 'B) Consolidated Billing', 'C) Savings Plans', 'D) Budgets'],
    correct: 1,
    explanation: "Consolidated Billing in AWS Organizations combines usage across multiple accounts, enabling volume discounts and simplified billing management."
  }
];

async function main() {
  console.log('Seeding AWS Cloud Practitioner exam...');

  // Check if exam already exists
  const existingExam = await prisma.exam.findFirst({
    where: { title: 'AWS Cloud Practitioner' }
  });

  if (existingExam) {
    console.log('AWS Cloud Practitioner exam already exists, skipping.');
    return;
  }

  // Create exam
  const exam = await prisma.exam.create({
    data: {
      title: 'AWS Cloud Practitioner',
    },
  });
  console.log('AWS Cloud Practitioner exam created, ID:', exam.id);

  // Add questions
  for (const q of awsCloudPractitionerQuestions) {
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