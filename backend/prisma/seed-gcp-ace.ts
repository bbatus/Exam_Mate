import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const gcpAceQuestions = [
  {
    section: "Setting up a cloud solution environment",
    question: "You need to create a resource hierarchy for a company with multiple departments. What is the correct order from top to bottom?",
    options: [
      "A) Project → Folder → Organization",
      "B) Organization → Project → Folder",
      "C) Organization → Folder → Project",
      "D) Folder → Organization → Project"
    ],
    correct: 2,
    explanation: "The correct resource hierarchy in Google Cloud is Organization → Folder → Project. Organizations are at the top level, folders help organize resources within the organization, and projects contain the actual resources.",
    category: "Resource Hierarchy"
  },
  {
    section: "Setting up a cloud solution environment",
    question: "Which IAM role should you assign to a developer who needs to deploy applications but should not be able to delete projects?",
    options: [
      "A) roles/owner",
      "B) roles/editor",
      "C) roles/viewer",
      "D) roles/appengine.deployer"
    ],
    correct: 1,
    explanation: "The roles/editor role provides permissions to deploy applications and make most changes to resources, but it doesn't allow deleting projects, which is reserved for owners.",
    category: "IAM"
  },
  {
    section: "Setting up a cloud solution environment",
    question: "You want to automatically add users to groups when they join your organization. Which Google Cloud service should you use?",
    options: [
      "A) Cloud Identity",
      "B) Cloud IAM",
      "C) Cloud Directory Sync",
      "D) Cloud Identity-Aware Proxy"
    ],
    correct: 0,
    explanation: "Cloud Identity is a service that allows you to manage users and groups and can be configured to automatically add users to groups based on attributes from your identity provider.",
    category: "Identity Management"
  },
  {
    section: "Setting up a cloud solution environment",
    question: "Which command enables the Compute Engine API for your current project?",
    options: [
      "A) gcloud services enable compute.googleapis.com",
      "B) gcloud api enable compute-engine",
      "C) gcloud compute enable-api",
      "D) gcloud enable compute.googleapis.com"
    ],
    correct: 0,
    explanation: "The correct command to enable the Compute Engine API is 'gcloud services enable compute.googleapis.com'.",
    category: "gcloud CLI"
  },
  {
    section: "Setting up a cloud solution environment",
    question: "You need to increase your project's quota for Compute Engine instances. What should you do?",
    options: [
      "A) Contact Google Cloud Support",
      "B) Use the Quotas page in Cloud Console",
      "C) Increase billing limits",
      "D) Wait for automatic increase"
    ],
    correct: 1,
    explanation: "To request a quota increase, you should use the Quotas page in the Google Cloud Console, which allows you to request increases for specific resources.",
    category: "Quotas"
  },
  {
    section: "Setting up a cloud solution environment",
    question: "Which tool helps you analyze your Google Cloud resources and get recommendations?",
    options: [
      "A) Cloud Asset Inventory",
      "B) Gemini Cloud Assist",
      "C) Cloud Monitoring",
      "D) Both A and B"
    ],
    correct: 3,
    explanation: "Both Cloud Asset Inventory and Gemini Cloud Assist help analyze resources and provide recommendations. Cloud Asset Inventory provides a historical inventory of your cloud assets, while Gemini Cloud Assist offers AI-powered recommendations.",
    category: "Resource Management"
  },
  {
    section: "Setting up a cloud solution environment",
    question: "You want to create a billing alert when your project costs exceed $100. Where should you configure this?",
    options: [
      "A) Cloud Monitoring",
      "B) Cloud Billing",
      "C) Cloud Console Dashboard",
      "D) Cloud Logging"
    ],
    correct: 1,
    explanation: "Billing alerts are configured in Cloud Billing, where you can set up budget alerts based on actual costs or forecasted costs.",
    category: "Billing"
  },
  {
    section: "Setting up a cloud solution environment",
    question: "What is the purpose of billing exports in Google Cloud?",
    options: [
      "A) To reduce billing costs",
      "B) To export billing data to BigQuery for analysis",
      "C) To automatically pay bills",
      "D) To share billing with other projects"
    ],
    correct: 1,
    explanation: "Billing exports allow you to export detailed billing data to BigQuery, enabling in-depth analysis and reporting on your cloud spending.",
    category: "Billing"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "You need to deploy a stateless web application that can scale to zero when not in use. Which compute option is most suitable?",
    options: [
      "A) Compute Engine",
      "B) Google Kubernetes Engine",
      "C) Cloud Run",
      "D) App Engine Flexible"
    ],
    correct: 2,
    explanation: "Cloud Run is designed for stateless containerized applications and can automatically scale to zero when not in use, making it the most suitable option for this scenario.",
    category: "Compute Options"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "Which storage option provides the highest IOPS for a Compute Engine instance?",
    options: [
      "A) Standard Persistent Disk",
      "B) SSD Persistent Disk",
      "C) Google Cloud Hyperdisk",
      "D) Local SSD"
    ],
    correct: 3,
    explanation: "Local SSD provides the highest IOPS (Input/Output Operations Per Second) for Compute Engine instances, as it is physically attached to the server hosting the VM.",
    category: "Storage"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "You want to create a managed instance group that scales between 3 and 10 instances. Which component do you need first?",
    options: [
      "A) Load balancer",
      "B) Instance template",
      "C) Health check",
      "D) Auto scaler"
    ],
    correct: 1,
    explanation: "An instance template is required first when creating a managed instance group, as it defines the VM configuration that will be used for all instances in the group.",
    category: "Compute Engine"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "What is the main benefit of using Spot VM instances?",
    options: [
      "A) Better performance",
      "B) Higher availability",
      "C) Lower cost",
      "D) More storage"
    ],
    correct: 2,
    explanation: "The main benefit of Spot VMs is their significantly lower cost compared to regular VMs, though they can be terminated at any time when Google Cloud needs the capacity back.",
    category: "Compute Engine"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "You need to deploy a GKE cluster that automatically manages nodes. Which mode should you choose?",
    options: [
      "A) GKE Standard",
      "B) GKE Autopilot",
      "C) GKE Private",
      "D) GKE Regional"
    ],
    correct: 1,
    explanation: "GKE Autopilot is a mode of operation in Google Kubernetes Engine that automatically manages the cluster's underlying infrastructure, including nodes, making it ideal for this scenario.",
    category: "Kubernetes"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "Which Google Cloud service is best for storing time-series data at scale?",
    options: [
      "A) Cloud SQL",
      "B) Cloud Spanner",
      "C) Cloud Bigtable",
      "D) Cloud Firestore"
    ],
    correct: 2,
    explanation: "Cloud Bigtable is optimized for time-series data at scale, offering high throughput and low-latency access to large amounts of time-series data.",
    category: "Databases"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "You need to process streaming data in real-time. Which service should you use?",
    options: [
      "A) BigQuery",
      "B) Cloud Dataflow",
      "C) Cloud Pub/Sub",
      "D) Cloud Storage"
    ],
    correct: 1,
    explanation: "Cloud Dataflow is a fully managed service for stream and batch processing that provides real-time data processing capabilities with minimal latency.",
    category: "Data Processing"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "Which Cloud Storage class is most cost-effective for data accessed once a month?",
    options: [
      "A) Standard",
      "B) Nearline",
      "C) Coldline",
      "D) Archive"
    ],
    correct: 1,
    explanation: "Nearline Storage is designed for data accessed less frequently than once a month but more frequently than once a quarter, making it the most cost-effective option for monthly access.",
    category: "Storage"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "You want to create a private GKE cluster. What does this mean?",
    options: [
      "A) Cluster is not accessible from internet",
      "B) Nodes don't have external IP addresses",
      "C) Pods can't communicate with each other",
      "D) Cluster is only accessible by the owner"
    ],
    correct: 1,
    explanation: "In a private GKE cluster, the nodes do not have external IP addresses, which means they cannot be directly accessed from the internet, enhancing security.",
    category: "Kubernetes"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "Which VPC mode allows you to define custom IP ranges for subnets?",
    options: [
      "A) Auto mode",
      "B) Custom mode",
      "C) Legacy mode",
      "D) Shared mode"
    ],
    correct: 1,
    explanation: "Custom mode VPC networks allow you to define your own IP ranges for subnets, providing more control over your network design compared to auto mode.",
    category: "Networking"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "You need to allow HTTP traffic to your Compute Engine instances. Which type of firewall rule should you create?",
    options: [
      "A) Egress rule",
      "B) Ingress rule",
      "C) Internal rule",
      "D) External rule"
    ],
    correct: 1,
    explanation: "An ingress firewall rule controls incoming traffic to your instances, so you would create an ingress rule to allow incoming HTTP traffic (typically on port 80).",
    category: "Networking"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "Which load balancer type is best for global HTTP(S) traffic?",
    options: [
      "A) Network Load Balancer",
      "B) Internal Load Balancer",
      "C) HTTP(S) Load Balancer",
      "D) TCP/UDP Load Balancer"
    ],
    correct: 2,
    explanation: "The HTTP(S) Load Balancer is a global load balancer that can direct traffic to backends in multiple regions, making it ideal for global HTTP(S) traffic distribution.",
    category: "Load Balancing"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "What is the main benefit of using Infrastructure as Code (IaC)?",
    options: [
      "A) Faster deployment",
      "B) Version control and repeatability",
      "C) Lower costs",
      "D) Better security"
    ],
    correct: 1,
    explanation: "The main benefit of Infrastructure as Code is the ability to version control your infrastructure configurations and create repeatable, consistent deployments.",
    category: "Infrastructure Management"
  },
  {
    section: "Planning and implementing a cloud solution",
    question: "Which tool is Google's recommended IaC solution for Google Cloud?",
    options: [
      "A) Terraform",
      "B) Fabric FAST",
      "C) Config Connector",
      "D) Helm"
    ],
    correct: 1,
    explanation: "Fabric FAST (Flexible Adaptable Secure Terraform) is Google's recommended solution for Infrastructure as Code on Google Cloud, providing templates and best practices for Terraform.",
    category: "Infrastructure Management"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "How do you SSH into a Compute Engine instance from the command line?",
    options: [
      "A) gcloud compute ssh instance-name",
      "B) gcloud ssh instance-name",
      "C) gcloud connect instance-name",
      "D) gcloud vm connect instance-name"
    ],
    correct: 0,
    explanation: "The correct command to SSH into a Compute Engine instance from the command line is 'gcloud compute ssh instance-name'.",
    category: "Compute Engine"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "You want to create a snapshot of a Compute Engine disk. Which command should you use?",
    options: [
      "A) gcloud compute snapshots create",
      "B) gcloud compute disks snapshot",
      "C) gcloud compute disks snapshot-create",
      "D) gcloud snapshots create"
    ],
    correct: 0,
    explanation: "The correct command to create a snapshot of a Compute Engine disk is 'gcloud compute snapshots create'.",
    category: "Compute Engine"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "How do you configure a GKE cluster to access Artifact Registry?",
    options: [
      "A) Configure service account with Artifact Registry Reader role",
      "B) Enable Artifact Registry API",
      "C) Create network rules",
      "D) Install Docker"
    ],
    correct: 0,
    explanation: "To allow a GKE cluster to access Artifact Registry, you need to configure the cluster's service account with the appropriate IAM role, such as Artifact Registry Reader.",
    category: "Kubernetes"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "You want to see all pods in a GKE cluster. Which command should you use?",
    options: [
      "A) gcloud container pods list",
      "B) kubectl get pods --all-namespaces",
      "C) gcloud kubernetes pods list",
      "D) kubectl list pods"
    ],
    correct: 1,
    explanation: "The correct command to see all pods across all namespaces in a GKE cluster is 'kubectl get pods --all-namespaces'.",
    category: "Kubernetes"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "What is the purpose of Horizontal Pod Autoscaler (HPA) in GKE?",
    options: [
      "A) Scale pods vertically",
      "B) Scale pods horizontally based on metrics",
      "C) Scale nodes in the cluster",
      "D) Scale storage volumes"
    ],
    correct: 1,
    explanation: "The Horizontal Pod Autoscaler (HPA) automatically scales the number of pods in a deployment or replica set based on observed CPU utilization or other metrics.",
    category: "Kubernetes"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "You want to deploy a new version of a Cloud Run service with zero downtime. What should you do?",
    options: [
      "A) Delete the old service first",
      "B) Use traffic splitting",
      "C) Deploy to a new region",
      "D) Use blue-green deployment"
    ],
    correct: 1,
    explanation: "Cloud Run supports traffic splitting, allowing you to direct a percentage of traffic to different revisions of your service, enabling zero-downtime deployments.",
    category: "Serverless"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "Which lifecycle rule action permanently deletes objects from Cloud Storage?",
    options: [
      "A) SetStorageClass",
      "B) Delete",
      "C) Archive",
      "D) Transition"
    ],
    correct: 1,
    explanation: "The 'Delete' lifecycle rule action permanently removes objects from Cloud Storage when the specified conditions are met.",
    category: "Storage"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "You want to execute a SQL query in BigQuery. Which command should you use?",
    options: [
      "A) bq query \"SELECT * FROM table\"",
      "B) gcloud bigquery query \"SELECT * FROM table\"",
      "C) bq select \"SELECT * FROM table\"",
      "D) gcloud sql query \"SELECT * FROM table\""
    ],
    correct: 0,
    explanation: "The correct command to execute a SQL query in BigQuery is 'bq query \"SELECT * FROM table\"'.",
    category: "BigQuery"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "How do you backup a Cloud SQL instance?",
    options: [
      "A) Create a snapshot",
      "B) Export to Cloud Storage",
      "C) Use automatic backups",
      "D) All of the above"
    ],
    correct: 3,
    explanation: "Cloud SQL offers multiple backup options: on-demand snapshots, scheduled backups (automatic backups), and exports to Cloud Storage. All of these methods can be used to backup a Cloud SQL instance.",
    category: "Databases"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "You want to add a new subnet to an existing VPC. What must be true about the IP range?",
    options: [
      "A) It must be in the same region as other subnets",
      "B) It must not overlap with existing subnets",
      "C) It must be a public IP range",
      "D) It must be larger than existing subnets"
    ],
    correct: 1,
    explanation: "When adding a new subnet to an existing VPC, the IP range must not overlap with any existing subnet in the VPC, regardless of region.",
    category: "Networking"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "Which service provides managed DNS for Google Cloud?",
    options: [
      "A) Cloud DNS",
      "B) Cloud NAT",
      "C) Cloud CDN",
      "D) Cloud Load Balancing"
    ],
    correct: 0,
    explanation: "Cloud DNS is Google's managed DNS service that publishes your domain names to the global DNS in a cost-effective way.",
    category: "Networking"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "You want to create a monitoring alert when CPU utilization exceeds 80%. Which service should you use?",
    options: [
      "A) Cloud Logging",
      "B) Cloud Monitoring",
      "C) Cloud Trace",
      "D) Cloud Profiler"
    ],
    correct: 1,
    explanation: "Cloud Monitoring is the service used to create alerts based on metrics like CPU utilization, memory usage, and other performance indicators.",
    category: "Monitoring"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "Where should you look to troubleshoot application latency issues?",
    options: [
      "A) Cloud Logging",
      "B) Cloud Monitoring",
      "C) Cloud Trace",
      "D) Cloud Debugger"
    ],
    correct: 2,
    explanation: "Cloud Trace is specifically designed to help you understand and troubleshoot latency issues in your applications by tracking how requests propagate through your services.",
    category: "Monitoring"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "What is the purpose of the Ops Agent?",
    options: [
      "A) To deploy applications",
      "B) To collect telemetry data",
      "C) To manage infrastructure",
      "D) To monitor costs"
    ],
    correct: 1,
    explanation: "The Ops Agent is a unified agent that collects telemetry data (both logs and metrics) from your virtual machines for use with Cloud Monitoring and Cloud Logging.",
    category: "Monitoring"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "You want to export logs to BigQuery for analysis. Which service should you configure?",
    options: [
      "A) Cloud Logging",
      "B) Cloud Monitoring",
      "C) Cloud Trace",
      "D) Cloud Profiler"
    ],
    correct: 0,
    explanation: "Cloud Logging allows you to export logs to various destinations, including BigQuery, for long-term storage and advanced analysis.",
    category: "Logging"
  },
  {
    section: "Ensuring successful operation of a cloud solution",
    question: "Which log type tracks who did what in your Google Cloud environment?",
    options: [
      "A) System logs",
      "B) Application logs",
      "C) Audit logs",
      "D) Error logs"
    ],
    correct: 2,
    explanation: "Audit logs record who did what, where, and when within your Google Cloud resources, providing an audit trail for security and compliance purposes.",
    category: "Logging"
  },
  {
    section: "Configuring access and security",
    question: "What is the difference between basic and predefined IAM roles?",
    options: [
      "A) Basic roles are more secure",
      "B) Basic roles are broader, predefined roles are more granular",
      "C) Predefined roles are deprecated",
      "D) No difference"
    ],
    correct: 1,
    explanation: "Basic roles (Owner, Editor, Viewer) are broad and provide wide-ranging permissions across all resources, while predefined roles are more granular and focused on specific services or tasks.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "You want to create a custom IAM role. Which permissions should you include?",
    options: [
      "A) Only the minimum permissions needed",
      "B) All available permissions",
      "C) Only basic permissions",
      "D) Only predefined permissions"
    ],
    correct: 0,
    explanation: "Following the principle of least privilege, custom IAM roles should include only the minimum permissions needed to perform the required tasks, reducing security risks.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "What is the best practice for service account management?",
    options: [
      "A) Use the same service account for all resources",
      "B) Create separate service accounts for different functions",
      "C) Use user accounts instead of service accounts",
      "D) Share service account keys frequently"
    ],
    correct: 1,
    explanation: "Best practice is to create separate service accounts for different functions or applications, following the principle of least privilege and improving security and auditing capabilities.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "How do you assign a service account to a Compute Engine instance?",
    options: [
      "A) During instance creation or after creation",
      "B) Only during instance creation",
      "C) Only after instance creation",
      "D) Service accounts cannot be assigned to instances"
    ],
    correct: 0,
    explanation: "You can assign a service account to a Compute Engine instance either during instance creation or after creation by stopping the instance and editing its properties.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "What is service account impersonation?",
    options: [
      "A) Creating fake service accounts",
      "B) One service account acting as another",
      "C) Using service accounts for authentication",
      "D) Sharing service account keys"
    ],
    correct: 1,
    explanation: "Service account impersonation allows a user or service account to temporarily assume the permissions of another service account without needing its keys.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "How long do short-lived service account credentials last by default?",
    options: [
      "A) 1 hour",
      "B) 24 hours",
      "C) 1 week",
      "D) 1 month"
    ],
    correct: 0,
    explanation: "Short-lived service account credentials typically last for 1 hour by default, reducing the risk window if they are compromised.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "You want to allow a GKE pod to access Cloud Storage. What should you configure?",
    options: [
      "A) Service account with appropriate IAM roles",
      "B) Network firewall rules",
      "C) Storage bucket permissions",
      "D) API keys"
    ],
    correct: 0,
    explanation: "To allow a GKE pod to access Cloud Storage, you should configure a service account with the appropriate IAM roles (like Storage Object Viewer) and assign it to the pod.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "Which command shows the current IAM policy for a project?",
    options: [
      "A) gcloud projects get-iam-policy PROJECT_ID",
      "B) gcloud iam policies get PROJECT_ID",
      "C) gcloud policy get PROJECT_ID",
      "D) gcloud projects show-policy PROJECT_ID"
    ],
    correct: 0,
    explanation: "The correct command to view the current IAM policy for a project is 'gcloud projects get-iam-policy PROJECT_ID'.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "What is the principle of least privilege?",
    options: [
      "A) Give users minimum access needed to do their job",
      "B) Give users maximum access for convenience",
      "C) Give all users the same access level",
      "D) Give users access only to their own resources"
    ],
    correct: 0,
    explanation: "The principle of least privilege states that users should be given only the minimum level of access rights needed to perform their job functions, reducing security risks.",
    category: "Security"
  },
  {
    section: "Configuring access and security",
    question: "You need to rotate service account keys regularly. What is the recommended approach?",
    options: [
      "A) Manual key rotation every month",
      "B) Use short-lived credentials or workload identity",
      "C) Never rotate keys",
      "D) Rotate keys every year"
    ],
    correct: 1,
    explanation: "The recommended approach is to use short-lived credentials or workload identity federation instead of service account keys, eliminating the need for key rotation altogether.",
    category: "IAM"
  },
  {
    section: "Configuring access and security",
    question: "How do you enable audit logging for a specific service?",
    options: [
      "A) Configure audit logs in Cloud Logging",
      "B) Enable in IAM audit configuration",
      "C) Set up in Cloud Monitoring",
      "D) Configure in organization policy"
    ],
    correct: 0,
    explanation: "You configure audit logging for specific services in Cloud Logging, where you can specify which types of audit logs (Admin Activity, Data Access, System Events, Policy Denied) to enable.",
    category: "Logging"
  },
  {
    section: "Configuring access and security",
    question: "What is Workload Identity in GKE?",
    options: [
      "A) A way to identify workloads",
      "B) A method to securely access Google Cloud services from GKE",
      "C) A monitoring tool for workloads",
      "D) A load balancing mechanism"
    ],
    correct: 1,
    explanation: "Workload Identity is a GKE feature that allows workloads in your GKE clusters to impersonate IAM service accounts to access Google Cloud services securely without using service account keys.",
    category: "IAM"
  }
];

async function main() {
  console.log('Seeding Google Cloud Associate Cloud Engineer exam questions...');
  
  try {
    // Önce mevcut sınavı bulalım
    const exam = await prisma.exam.findUnique({
      where: {
        title: 'Google Cloud Associate Cloud Engineer',
      },
    });

    if (!exam) {
      console.error('Google Cloud Associate Cloud Engineer sınavı bulunamadı!');
      return;
    }

    console.log(`Found exam with ID: ${exam.id}`);

    // Soruları ekleyelim
    for (const q of gcpAceQuestions) {
      await prisma.question.create({
        data: {
          ...q,
          examId: exam.id,
        },
      });
    }

    console.log(`Added ${gcpAceQuestions.length} questions to the exam.`);
    console.log('Seeding finished successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 