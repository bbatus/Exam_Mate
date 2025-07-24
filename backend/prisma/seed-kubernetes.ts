import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kubernetesQuestions = [
  // Soru 1
  {
    section: 'Core Concepts ve Architecture',
    question: "Kubernetes cluster'ında master node'un temel bileşenleri nelerdir?",
    options: [
      'A) kubelet, kube-proxy, container runtime',
      'B) kube-apiserver, etcd, kube-scheduler, kube-controller-manager',
      'C) kubectl, kubeadm, kubelet',
      'D) ingress-controller, service-mesh, cni'
    ],
    correct: 1,
    explanation: "Kubernetes'te master node, cluster'ın kontrol düzeyini sağlar. kube-apiserver API isteklerini yönetir, etcd tüm cluster bilgisini saklar, kube-scheduler pod'ları uygun node'lara atar, kube-controller-manager ise cluster durumunu yönetir. Bu dört bileşen master node'un temelidir."
  },
  // Soru 2
  {
    section: 'Core Concepts ve Architecture',
    question: "etcd'nin Kubernetes cluster'ındaki rolü nedir?",
    options: [
      "A) Container runtime'ı sağlar",
      "B) Cluster'ın distributed key-value store'udur ve cluster state'ini saklar",
      'C) Pod\'ları schedule eder',
      'D) Network policy\'leri uygular'
    ],
    correct: 1,
    explanation: "etcd, Kubernetes cluster'ının merkezi ve dağıtık anahtar-değer (key-value) veritabanıdır. Tüm cluster konfigürasyonu, durum bilgisi ve metadata burada saklanır. Cluster'ın beyni olarak düşünülebilir."
  },
  // Soru 3
  {
    section: 'Core Concepts ve Architecture',
    question: "Kubernetes'te bir Pod'un lifecycle'ı hangi sırayla gerçekleşir?",
    options: [
      'A) Running → Pending → Succeeded → Failed',
      'B) Pending → Running → Succeeded/Failed',
      'C) Created → Running → Terminated',
      'D) Scheduled → Running → Completed'
    ],
    correct: 1,
    explanation: "Pod'un yaşam döngüsü Pending (kaynak bekliyor), Running (çalışıyor), Succeeded/Failed (tamamlandı/başarısız) şeklindedir. Önce Pending olur, node'a atanır ve çalışmaya başlar."
  },
  // Soru 4
  {
    section: 'Core Concepts ve Architecture',
    question: "Kubernetes'te hangi bileşen Pod'ların node'lara atanmasından sorumludur?",
    options: [
      'A) kubelet',
      'B) kube-proxy',
      'C) kube-scheduler',
      'D) kube-controller-manager'
    ],
    correct: 2,
    explanation: "kube-scheduler, yeni oluşturulan pod'ları uygun node'lara atayan Kubernetes bileşenidir. Pod'un kaynak gereksinimleri ve node etiketleri gibi kriterlere göre seçim yapar."
  },
  // Soru 5
  {
    section: 'Core Concepts ve Architecture',
    question: "Kubernetes'te namespace'lerin temel amacı nedir?",
    options: [
      'A) Pod\'ları farklı node\'lara dağıtmak',
      'B) Cluster kaynaklarını mantıksal olarak ayırmak ve izolasyon sağlamak',
      'C) Network trafiğini yönetmek',
      'D) Storage\'ı organize etmek'
    ],
    correct: 1,
    explanation: "Namespace'ler, aynı cluster içinde kaynakları mantıksal olarak ayırmak ve izole etmek için kullanılır. Farklı ekipler veya uygulamalar için izole çalışma alanları sağlar."
  },
  // Soru 6
  {
    section: 'Core Concepts ve Architecture',
    question: "kubectl get pods -o wide komutu normal kubectl get pods'tan nasıl farklıdır?",
    options: [
      'A) Sadece running pod\'ları gösterir',
      'B) Ek bilgiler gösterir (node, IP, readiness gates)',
      'C) JSON formatında output verir',
      'D) Tüm namespace\'lerdeki pod\'ları gösterir'
    ],
    correct: 1,
    explanation: "kubectl get pods -o wide komutu, pod'lar hakkında ek bilgiler (örn. hangi node'da çalıştığı, IP adresi, container image'ı) gösterir. Standart komut ise sadece temel bilgileri listeler."
  },
  // Soru 7
  {
    section: 'Core Concepts ve Architecture',
    question: "Kubernetes'te Label ve Annotation arasındaki temel fark nedir?",
    options: [
      'A) Label\'lar metadata, annotation\'lar selector için kullanılır',
      'B) Label\'lar selector için kullanılır, annotation\'lar metadata için',
      'C) Her ikisi de aynı amaçla kullanılır',
      'D) Label\'lar sadece pod\'larda kullanılır'
    ],
    correct: 1,
    explanation: "Label'lar, objeleri gruplamak ve seçim yapmak için kullanılır (örn. pod seçimi). Annotation'lar ise objeye ek metadata eklemek için kullanılır ve seçimde kullanılmaz."
  },
  // Soru 8
  {
    section: 'Core Concepts ve Architecture',
    question: "Kubernetes'te Field Selector'ün amacı nedir?",
    options: [
      'A) Pod\'ların label\'larına göre seçim yapmak',
      'B) Kubernetes resource\'larını field değerlerine göre filtrelemek',
      'C) Node\'ları seçmek',
      'D) Container image\'larını seçmek'
    ],
    correct: 1,
    explanation: "Field Selector, Kubernetes objelerini belirli alan (field) değerlerine göre filtrelemeye yarar. Örneğin, sadece belirli bir node'daki pod'ları listelemek için kullanılır."
  },
  // Soru 9
  {
    section: 'Core Concepts ve Architecture',
    question: "Kubernetes'te Taint ve Toleration'ın amacı nedir?",
    options: [
      'A) Pod\'ların belirli node\'lara schedule edilmesini kontrol etmek',
      'B) Network trafiğini yönetmek',
      'C) Storage\'ı yönetmek',
      'D) Resource limit\'lerini belirlemek'
    ],
    correct: 0,
    explanation: "Taint ve Toleration, belirli pod'ların sadece belirli node'larda çalışmasını sağlar. Örneğin, özel donanımlı node'lara sadece belirli pod'ların atanmasını kontrol eder."
  },
  // Soru 10
  {
    section: 'Core Concepts ve Architecture',
    question: 'Kubernetes API versioning\'de "v1", "v1beta1", "v1alpha1" ne anlama gelir?',
    options: [
      'A) Farklı cluster versiyonları',
      'B) Stability seviyelerini (stable, beta, alpha) belirtir',
      'C) Farklı namespace\'ler',
      'D) Farklı resource türleri'
    ],
    correct: 1,
    explanation: "API versioning'de v1 (stable), v1beta1 (beta), v1alpha1 (alpha) sürümlerini belirtir. v1 production için, beta/alpha ise test/deneysel özellikler içindir."
  },
  // Soru 11
  {
    section: 'Workloads ve Scheduling',
    question: 'Deployment ve ReplicaSet arasındaki temel fark nedir?',
    options: [
      'A) Deployment sadece single pod çalıştırır',
      'B) Deployment, ReplicaSet\'in üzerinde rolling update ve rollback sağlar',
      'C) ReplicaSet daha yeni bir teknoloji',
      'D) Fark yoktur'
    ],
    correct: 1,
    explanation: "Deployment, ReplicaSet'in üzerinde rolling update (kademeli güncelleme) ve rollback (geri alma) gibi gelişmiş yönetim özellikleri sunar. ReplicaSet ise sadece pod sayısını sabit tutar."
  },
  // Soru 12
  {
    section: 'Workloads ve Scheduling',
    question: 'StatefulSet\'in Deployment\'tan farkı nedir?',
    options: [
      'A) StatefulSet daha hızlıdır',
      'B) StatefulSet ordered deployment/scaling ve persistent identity sağlar',
      'C) StatefulSet sadece database\'ler için kullanılır',
      'D) StatefulSet replica sayısını otomatik ayarlar'
    ],
    correct: 1,
    explanation: "StatefulSet, sıralı (ordered) deployment/scaling ve her pod'a kalıcı kimlik (persistent identity) sağlar. Özellikle veritabanı gibi stateful uygulamalarda kullanılır."
  },
  // Soru 13
  {
    section: 'Workloads ve Scheduling',
    question: 'DaemonSet\'in kullanım amacı nedir?',
    options: [
      'A) Yüksek availabilite sağlamak',
      'B) Her node\'da (ya da seçili node\'larda) tam olarak bir pod çalıştırmak',
      'C) Load balancing yapmak',
      'D) Database cluster\'ı oluşturmak'
    ],
    correct: 1,
    explanation: "DaemonSet, her node'da (veya seçili node'larda) tam olarak bir pod çalıştırmak için kullanılır. Örneğin, log toplama veya monitoring agent'ları için idealdir."
  },
  // Soru 14
  {
    section: 'Workloads ve Scheduling',
    question: 'Job ve CronJob arasındaki fark nedir?',
    options: [
      'A) Job sürekli çalışır, CronJob zamanlanır',
      'B) Job bir kez çalışır, CronJob schedule\'a göre tekrar eder',
      'C) Job daha hızlıdır',
      'D) CronJob sadece maintenance için kullanılır'
    ],
    correct: 1,
    explanation: "Job, bir defa çalışıp biten işler için kullanılır. CronJob ise belirli zaman aralıklarında (örn. her gece 02:00'de) otomatik olarak Job başlatır."
  },
  // Soru 15
  {
    section: 'Workloads ve Scheduling',
    question: 'Kubernetes\'te Rolling Update stratejisi nasıl çalışır?',
    options: [
      'A) Tüm pod\'ları aynı anda günceller',
      'B) Eski pod\'ları kademeli olarak yenileriyle değiştirir',
      'C) Sadece failed pod\'ları günceller',
      'D) Önce yeni pod\'ları oluşturur, sonra eski pod\'ları siler'
    ],
    correct: 1,
    explanation: "Rolling Update, eski pod'ları kademeli olarak yenileriyle değiştirir. Böylece uygulama kesintisiz güncellenir. Tüm pod'lar aynı anda güncellenmez."
  },
  // Soru 16
  {
    section: 'Workloads ve Scheduling',
    question: 'Kubernetes\'te Horizontal Pod Autoscaler (HPA) neye göre scaling yapar?',
    options: [
      'A) Sadece CPU kullanımı',
      'B) CPU, memory ve custom metrics',
      'C) Sadece network trafiği',
      'D) Sadece memory kullanımı'
    ],
    correct: 1,
    explanation: "HPA (Horizontal Pod Autoscaler), pod sayısını CPU, memory veya custom metric'lere göre otomatik olarak artırır/azaltır. Örneğin, CPU %80'i geçerse yeni pod ekler."
  },
  // Soru 17
  {
    section: 'Workloads ve Scheduling',
    question: 'Pod\'un nodeAffinity ayarının amacı nedir?',
    options: [
      'A) Pod\'un hangi node\'da çalışacağını belirlemek',
      'B) Pod\'un network ayarlarını yapmak',
      'C) Pod\'un storage ayarlarını yapmak',
      'D) Pod\'un resource limit\'lerini belirlemek'
    ],
    correct: 0,
    explanation: "nodeAffinity, pod'un hangi node'da çalışacağını belirlemek için kullanılır. Örneğin, belirli donanım özelliklerine sahip node'lara pod atamak için kullanılır."
  },
  // Soru 18
  {
    section: 'Workloads ve Scheduling',
    question: 'Kubernetes\'te Pod Priority ve Preemption nasıl çalışır?',
    options: [
      'A) Yüksek priority pod\'lar daha fazla resource alır',
      'B) Yüksek priority pod\'lar, düşük priority pod\'ları evict edebilir',
      'C) Sadece system pod\'ları için kullanılır',
      'D) Resource limit\'lerini belirler'
    ],
    correct: 1,
    explanation: "Pod Priority, pod'lara öncelik atar. Yüksek öncelikli pod'lar kaynak yetersizliğinde düşük öncelikli pod'ları cluster'dan çıkarabilir (preemption)."
  },
  // Soru 19
  {
    section: 'Workloads ve Scheduling',
    question: 'Multi-container pod\'un avantajları nelerdir?',
    options: [
      'A) Daha az resource kullanır',
      'B) Sıkı bağlı container\'lar arasında resource ve lifecycle paylaşımı',
      'C) Daha hızlı deploy olur',
      'D) Daha güvenlidir'
    ],
    correct: 1,
    explanation: "Multi-container pod'lar, aynı pod içinde birden fazla container'ın birlikte çalışmasını sağlar. Container'lar arasında dosya sistemi ve lifecycle paylaşımı yapılabilir. Yan yana çalışan yardımcı container'lar için kullanılır."
  },
  // Soru 20
  {
    section: 'Workloads ve Scheduling',
    question: 'Init Container\'ın amacı nedir?',
    options: [
      'A) Ana container\'ı monitor etmek',
      'B) Ana container başlamadan önce gerekli hazırlıkları yapmak',
      'C) Ana container ile paralel çalışmak',
      'D) Ana container fail olduğunda devreye girmek'
    ],
    correct: 1,
    explanation: "Init Container, ana container başlamadan önce gerekli hazırlıkları (örn. dosya kopyalama, ortam hazırlama) yapmak için çalışır. Ana container başlamadan önce tamamlanmalıdır."
  },
  // Soru 21
  {
    section: 'Services ve Networking',
    question: 'Kubernetes\'te Service türleri nelerdir?',
    options: [
      'A) ClusterIP, NodePort, LoadBalancer, ExternalName',
      'B) TCP, UDP, HTTP, HTTPS',
      'C) Internal, External, Public, Private',
      'D) Sync, Async, Batch, Stream'
    ],
    correct: 0,
    explanation: "Kubernetes'te 4 ana Service türü vardır: ClusterIP (sadece cluster içi erişim), NodePort (dışarıdan erişim için port açar), LoadBalancer (bulut ortamında dış IP sağlar), ExternalName (DNS alias'ı oluşturur)."
  },
  // Soru 22
  {
    section: 'Services ve Networking',
    question: 'ClusterIP service\'in özelliği nedir?',
    options: [
      'A) External load balancer oluşturur',
      'B) Cluster içinden erişilebilir internal IP sağlar',
      'C) Her node\'da port açar',
      'D) DNS name sağlar'
    ],
    correct: 1,
    explanation: "ClusterIP, sadece cluster içinden erişilebilen internal bir IP adresi sağlar. Dışarıdan erişim mümkün değildir. Varsayılan service tipidir."
  },
  // Soru 23
  {
    section: 'Services ve Networking',
    question: 'NodePort service hangi port aralığında çalışır?',
    options: [
      'A) 1-1024',
      'B) 8000-9000',
      'C) 30000-32767',
      'D) 80-8080'
    ],
    correct: 2,
    explanation: "NodePort, her node'da 30000-32767 arası bir port açar ve bu port üzerinden servise dışarıdan erişim sağlar. Load balancer yoksa kullanılır."
  },
  // Soru 24
  {
    section: 'Services ve Networking',
    question: 'Kubernetes\'te Ingress\'in amacı nedir?',
    options: [
      'A) Pod\'lar arası communication',
      'B) HTTP/HTTPS trafiğini cluster\'a yönlendirmek ve yönetmek',
      'C) Internal service discovery',
      'D) Database connection\'larını yönetmek'
    ],
    correct: 1,
    explanation: "Ingress, HTTP/HTTPS trafiğini cluster'a yönlendirmek ve yönetmek için kullanılır. Farklı host/path'lere göre yönlendirme ve SSL termination sağlar."
  },
  // Soru 25
  {
    section: 'Services ve Networking',
    question: 'Kubernetes\'te EndpointSlice\'ın amacı nedir?',
    options: [
      'A) Pod\'ları gruplamak',
      'B) Service\'lerin endpoint\'lerini daha scalable şekilde yönetmek',
      'C) Network policy\'leri uygulamak',
      'D) Load balancing yapmak'
    ],
    correct: 1,
    explanation: "EndpointSlice, service endpoint'lerini daha ölçeklenebilir ve verimli şekilde yönetmek için kullanılır. Büyük ölçekli cluster'larda performans avantajı sağlar."
  },
  // Soru 26
  {
    section: 'Services ve Networking',
    question: 'Network Policy\'nin amacı nedir?',
    options: [
      'A) Load balancing yapmak',
      'B) Pod\'lar arası network trafiğini kontrol etmek',
      'C) DNS resolution yapmak',
      'D) Service discovery sağlamak'
    ],
    correct: 1,
    explanation: "Network Policy, pod'lar arası network trafiğini kontrol etmeye yarar. Hangi pod'un hangi pod'a erişebileceğini belirler, güvenlik sağlar."
  },
  // Soru 27
  {
    section: 'Services ve Networking',
    question: 'Kubernetes\'te DNS resolution nasıl çalışır?',
    options: [
      'A) External DNS server\'lar kullanılır',
      'B) CoreDNS service\'i cluster içi DNS resolution sağlar',
      'C) Her pod kendi DNS\'ini yönetir',
      'D) DNS devre dışı bırakılabilir'
    ],
    correct: 1,
    explanation: "CoreDNS, Kubernetes cluster'ında DNS çözümlemesini sağlar. Pod ve service isimlerini otomatik olarak DNS'e kaydeder ve cluster içi iletişimi kolaylaştırır."
  },
  // Soru 28
  {
    section: 'Services ve Networking',
    question: 'Service Mesh\'in Kubernetes\'teki rolü nedir?',
    options: [
      'A) Pod scheduling yapmak',
      'B) Service-to-service communication\'ı yönetmek, security ve observability sağlamak',
      'C) Storage yönetimi yapmak',
      'D) Resource monitoring yapmak'
    ],
    correct: 1,
    explanation: "Service Mesh, servisler arası iletişimi yönetir, güvenlik (mTLS), gözlemlenebilirlik (tracing, metrics) ve trafik yönetimi (canary, A/B test) gibi gelişmiş özellikler sunar. Istio, Linkerd gibi çözümler örnektir."
  },
  // Soru 29
  {
    section: 'Services ve Networking',
    question: 'Kubernetes\'te Headless Service ne demektir?',
    options: [
      'A) Service\'in IP\'si olmayan service',
      'B) ClusterIP\'si None olan, DNS record\'ları doğrudan pod\'lara işaret eden service',
      'C) External IP\'si olmayan service',
      'D) Port\'u olmayan service'
    ],
    correct: 1,
    explanation: "Headless Service, ClusterIP'si None olan ve DNS kayıtları doğrudan pod'lara işaret eden servistir. Stateful uygulamalarda pod'lara doğrudan erişim için kullanılır."
  },
  // Soru 30
  {
    section: 'Services ve Networking',
    question: 'kube-proxy\'nin görevi nedir?',
    options: [
      'A) API server\'ı proxy\'lemek',
      'B) Service\'lerin network proxy\'si ve load balancer\'ı olarak çalışmak',
      'C) Pod\'lar arası communication sağlamak',
      'D) External traffic\'i yönetmek'
    ],
    correct: 1,
    explanation: "kube-proxy, service'lerin network proxy'si ve load balancer'ı olarak çalışır. Gelen trafiği uygun pod'lara yönlendirir ve servis erişimini sağlar."
  },
  // Soru 31
  {
    section: 'Storage ve Configuration',
    question: 'Kubernetes\'te Volume türleri nelerdir?',
    options: [
      'A) Persistent, Temporary, Backup',
      'B) emptyDir, hostPath, persistentVolumeClaim, configMap, secret',
      'C) Local, Remote, Cloud',
      'D) ReadOnly, ReadWrite, ReadWriteMany'
    ],
    correct: 1,
    explanation: 'Kubernetes\'te yaygın volume türleri: emptyDir, hostPath, persistentVolumeClaim, configMap, secret.'
  },
  // Soru 32
  {
    section: 'Storage ve Configuration',
    question: 'PersistentVolume (PV) ve PersistentVolumeClaim (PVC) arasındaki fark nedir?',
    options: [
      'A) PV cluster resource\'u, PVC namespace resource\'u',
      'B) PV temporary, PVC permanent',
      'C) PV read-only, PVC read-write',
      'D) Fark yoktur'
    ],
    correct: 0,
    explanation: 'PV cluster resource\'udur, PVC ise namespace resource\'udur.'
  },
  // Soru 33
  {
    section: 'Storage ve Configuration',
    question: 'StorageClass\'ın amacı nedir?',
    options: [
      'A) Storage capacity\'sini belirlemek',
      'B) Dynamic provisioning için storage type\'ını tanımlamak',
      'C) Storage performance\'ını ölçmek',
      'D) Storage backup\'ını yapmak'
    ],
    correct: 1,
    explanation: 'StorageClass, dynamic provisioning için storage type\'ını tanımlar.'
  },
  // Soru 34
  {
    section: 'Storage ve Configuration',
    question: 'ConfigMap\'in kullanım amacı nedir?',
    options: [
      'A) Secret data saklamak',
      'B) Non-sensitive configuration data\'yı saklamak',
      'C) Pod\'ların image\'larını saklamak',
      'D) Log data\'yı saklamak'
    ],
    correct: 1,
    explanation: 'ConfigMap, non-sensitive configuration data saklamak için kullanılır.'
  },
  // Soru 35
  {
    section: 'Storage ve Configuration',
    question: 'Secret\'in ConfigMap\'ten farkı nedir?',
    options: [
      'A) Secret daha hızlıdır',
      'B) Secret base64 encoded ve sensitive data için kullanılır',
      'C) Secret sadece password\'ler için kullanılır',
      'D) Fark yoktur'
    ],
    correct: 1,
    explanation: 'Secret, base64 encoded ve sensitive data için kullanılır.'
  },
  // Soru 36
  {
    section: 'Storage ve Configuration',
    question: 'Kubernetes\'te Volume Access Mode\'ları nelerdir?',
    options: [
      'A) Fast, Medium, Slow',
      'B) ReadWriteOnce, ReadOnlyMany, ReadWriteMany',
      'C) Local, Remote, Cloud',
      'D) Persistent, Temporary, Backup'
    ],
    correct: 1,
    explanation: 'ReadWriteOnce, ReadOnlyMany, ReadWriteMany access mode\'larıdır.'
  },
  // Soru 37
  {
    section: 'Storage ve Configuration',
    question: 'emptyDir volume\'un özelliği nedir?',
    options: [
      'A) Persistent storage sağlar',
      'B) Pod\'un lifecycle\'ı ile bağlı temporary storage sağlar',
      'C) Sadece configuration için kullanılır',
      'D) Node\'lar arası paylaşılır'
    ],
    correct: 1,
    explanation: 'emptyDir, pod lifecycle\'ına bağlı temporary storage sağlar.'
  },
  // Soru 38
  {
    section: 'Storage ve Configuration',
    question: 'hostPath volume\'un riski nedir?',
    options: [
      'A) Yavaş performans',
      'B) Node\'un file system\'ine bağlı olduğu için security risk ve portability sorunu',
      'C) Sadece read-only erişim',
      'D) Capacity limiti'
    ],
    correct: 1,
    explanation: 'hostPath, node\'un file system\'ine bağlı olduğu için security risk ve portability sorunu taşır.'
  },
  // Soru 39
  {
    section: 'Security ve RBAC',
    question: 'Kubernetes RBAC\'de Role ve ClusterRole arasındaki fark nedir?',
    options: [
      'A) Role cluster-wide, ClusterRole namespace-scoped',
      'B) Role namespace-scoped, ClusterRole cluster-wide',
      'C) Her ikisi de aynı scope\'da çalışır',
      'D) Role user\'lar için, ClusterRole service account\'lar için'
    ],
    correct: 1,
    explanation: 'Role namespace-scoped, ClusterRole ise cluster-wide yetki verir.'
  },
  // Soru 40
  {
    section: 'Security ve RBAC',
    question: 'ServiceAccount\'un amacı nedir?',
    options: [
      'A) Human user\'lar için authentication',
      'B) Pod\'ların ve application\'ların Kubernetes API\'ye erişimi için identity',
      'C) Network access control',
      'D) Resource limitation'
    ],
    correct: 1,
    explanation: 'ServiceAccount, pod ve uygulamaların API\'ye erişimi için kimlik sağlar.'
  },
  // Soru 41
  {
    section: 'Security ve RBAC',
    question: 'Pod Security Policy\'nin (PSP) amacı nedir?',
    options: [
      'A) Network trafiğini kontrol etmek',
      'B) Pod\'ların security context\'ini ve capabilities\'ini kontrol etmek',
      'C) Resource usage\'ı sınırlamak',
      'D) Storage access\'ini kontrol etmek'
    ],
    correct: 1,
    explanation: 'PSP, pod\'ların security context ve capabilities\'ini kontrol eder.'
  },
  // Soru 42
  {
    section: 'Security ve RBAC',
    question: 'Kubernetes\'te SecurityContext neyi kontrol eder?',
    options: [
      'A) Network security',
      'B) Pod ve container\'ların security settings\'lerini (user ID, group ID, privileges)',
      'C) API access',
      'D) Storage encryption'
    ],
    correct: 1,
    explanation: 'SecurityContext, pod ve container\'ların security ayarlarını kontrol eder.'
  },
  // Soru 43
  {
    section: 'Security ve RBAC',
    question: 'Kubernetes\'te Admission Controller\'ın rolü nedir?',
    options: [
      'A) User authentication yapmak',
      'B) API request\'leri validate etmek ve mutate etmek',
      'C) Network policy\'leri uygulamak',
      'D) Resource monitoring yapmak'
    ],
    correct: 1,
    explanation: 'Admission Controller, API request\'leri validate ve mutate eder.'
  },
  // Soru 44
  {
    section: 'Security ve RBAC',
    question: 'ValidatingAdmissionWebhook ve MutatingAdmissionWebhook arasındaki fark nedir?',
    options: [
      'A) Validating read-only, Mutating object\'i değiştirebilir',
      'B) Validating daha hızlıdır',
      'C) Mutating sadece validation yapar',
      'D) Fark yoktur'
    ],
    correct: 0,
    explanation: 'Validating read-only, Mutating ise objeyi değiştirebilir.'
  },
  // Soru 45
  {
    section: 'Monitoring ve Troubleshooting',
    question: 'kubectl logs komutu ile ilgili doğru ifade nedir?',
    options: [
      'A) Sadece running pod\'ların log\'larını gösterir',
      'B) Current ve previous container log\'larını gösterebilir',
      'C) Sadece error log\'larını gösterir',
      'D) Tüm cluster log\'larını gösterir'
    ],
    correct: 1,
    explanation: 'kubectl logs, current ve previous container log\'larını gösterebilir.'
  },
  // Soru 46
  {
    section: 'Monitoring ve Troubleshooting',
    question: 'kubectl describe ve kubectl get -o yaml arasındaki fark nedir?',
    options: [
      'A) describe daha detaylı bilgi verir',
      'B) describe human-readable format, get -o yaml machine-readable format',
      'C) get -o yaml daha hızlıdır',
      'D) describe sadece pod\'lar için kullanılır'
    ],
    correct: 1,
    explanation: 'describe human-readable, get -o yaml machine-readable format sunar.'
  },
  // Soru 47
  {
    section: 'Monitoring ve Troubleshooting',
    question: 'Kubernetes\'te Pod\'un "CrashLoopBackOff" durumunda olmasının nedeni nedir?',
    options: [
      'A) Network bağlantısı problemi',
      'B) Container sürekli crash oluyor ve restart ediliyor',
      'C) Resource yetersizliği',
      'D) Image bulunamıyor'
    ],
    correct: 1,
    explanation: 'CrashLoopBackOff, container sürekli crash olup restart edildiğinde oluşur.'
  },
  // Soru 48
  {
    section: 'Monitoring ve Troubleshooting',
    question: 'kubectl top komutu neyi gösterir?',
    options: [
      'A) En sık kullanılan pod\'ları',
      'B) Node\'ların ve pod\'ların resource usage\'ını (CPU, memory)',
      'C) En yeni oluşturulan resource\'ları',
      'D) En büyük pod\'ları'
    ],
    correct: 1,
    explanation: 'kubectl top, node ve pod\'ların resource usage\'ını gösterir.'
  },
  // Soru 49
  {
    section: 'Monitoring ve Troubleshooting',
    question: 'Kubernetes\'te Liveness Probe ve Readiness Probe arasındaki fark nedir?',
    options: [
      'A) Liveness container\'ı restart eder, Readiness traffic\'i durdurur',
      'B) Liveness daha hızlıdır',
      'C) Readiness sadece startup sırasında çalışır',
      'D) Fark yoktur'
    ],
    correct: 0,
    explanation: 'Liveness container\'ı restart eder, Readiness ise traffic\'i durdurur.'
  },
  // Soru 50
  {
    section: 'Monitoring ve Troubleshooting',
    question: 'Kubernetes Event\'lerini görüntülemek için hangi komut kullanılır?',
    options: [
      'A) kubectl get events',
      'B) kubectl describe events',
      'C) kubectl logs events',
      'D) kubectl show events'
    ],
    correct: 0,
    explanation: 'Kubernetes event\'lerini görmek için kubectl get events kullanılır.'
  },
];

async function main() {
  console.log('Seeding Kubernetes Orta Seviye exam...');

  // Sınav zaten var mı kontrol et
  const existingExam = await prisma.exam.findFirst({
    where: { title: 'Kubernetes Orta Seviye' }
  });

  if (existingExam) {
    console.log('Kubernetes Orta Seviye sınavı zaten mevcut, ekleme yapılmadı.');
    return;
  }

  // Sınavı oluştur
  const exam = await prisma.exam.create({
    data: {
      title: 'Kubernetes Orta Seviye',
    },
  });
  console.log('Kubernetes Orta Seviye sınavı oluşturuldu, ID:', exam.id);

  // Soruları ekle
  for (const q of kubernetesQuestions) {
    await prisma.question.create({
      data: {
        ...q,
        examId: exam.id,
      },
    });
  }
  console.log('Tüm sorular eklendi.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 