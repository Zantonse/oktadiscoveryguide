export const industries = [
  {
    id: 'financial-services',
    name: 'Financial Services',
    icon: 'bank',
    sector: 'Financial',
    description: 'Banking, Insurance, Investment Management',
    companyName: 'Meridian Capital Group',
    companyDetails: 'A mid-sized regional bank with $45B in assets, 12,000 employees across 200 branches, recently acquired a small wealth management firm',
    context: `Industry Context - Financial Services:
- Heavily regulated environment (SOX, PCI-DSS, GLBA, FFIEC)
- Multiple business lines with distinct access needs (retail banking, wealth management, trading)
- High volume of privileged access to sensitive financial data
- Strict audit requirements and separation of duties
- Merger & acquisition activity creates identity chaos
- Third-party/contractor access for technology and operations
- Branch network with seasonal/temporary workers
- Legacy mainframe systems alongside modern cloud applications
- Real-time access decisions critical for trading operations
- Regulatory examiners require demonstrable access controls

Key Pain Points:
- Access certification fatigue (quarterly reviews for thousands of users)
- Segregation of duties violations difficult to detect
- Orphaned accounts from employee departures
- Contractor lifecycle management
- Audit findings related to excessive privileges`
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    icon: 'medical',
    sector: 'Healthcare',
    description: 'Hospitals, Health Systems, Pharmaceutical, Medical Devices',
    companyName: 'Northstar Health Systems',
    companyDetails: 'A regional health system with 8 hospitals, 150 clinics, 35,000 employees, running Epic EHR, in the process of integrating 2 recently acquired physician groups',
    context: `Industry Context - Healthcare & Life Sciences:
- HIPAA compliance is paramount (patient data protection)
- Clinical staff need rapid access to patient care systems
- Research data requires strict access controls (FDA 21 CFR Part 11)
- Complex organizational structures (hospitals, clinics, affiliated practices)
- High turnover in nursing and clinical staff
- Physician credentialing and privileging processes
- Medical device access and IoT security concerns
- EHR systems (Epic, Cerner) are mission-critical
- Drug manufacturing requires validated access controls
- Clinical trial data segregation requirements

Key Pain Points:
- Emergency access ("break-glass") scenarios
- Clinician identity across multiple facilities
- Resident and fellow rotation access management
- Vendor access for medical equipment maintenance
- Patient privacy incidents from over-provisioned access`
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    icon: 'shopping',
    sector: 'Retail',
    description: 'Retail Chains, E-commerce, Consumer Goods',
    companyName: 'Stride Retail Group',
    companyDetails: 'A specialty retailer with 450 stores nationwide, $3.2B revenue, 18,000 employees, rapidly growing e-commerce (now 35% of sales), heavy seasonal hiring',
    context: `Industry Context - Retail & E-commerce:
- PCI-DSS compliance for payment card data
- Massive seasonal workforce fluctuations (holiday hiring)
- Store associates, warehouse workers, corporate employees
- Omnichannel operations (stores, online, mobile)
- Franchise and partner access management
- Supply chain and vendor portal access
- Customer data protection (CCPA, GDPR for global operations)
- High employee turnover rates
- Point-of-sale system access controls
- E-commerce platform security

Key Pain Points:
- Rapid onboarding/offboarding for seasonal workers
- Store manager access sprawl over time
- Franchise access to corporate systems
- Third-party logistics provider access
- Customer account takeover prevention`
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: 'factory',
    sector: 'Industrial',
    description: 'Discrete Manufacturing, Process Manufacturing, Industrial',
    companyName: 'Vanguard Industries',
    companyDetails: 'A precision manufacturing company with 6 plants across North America, $1.8B revenue, 8,500 employees, mix of corporate IT and plant-floor OT systems, some defense contracts',
    context: `Industry Context - Manufacturing:
- OT/IT convergence creating new access challenges
- Plant floor systems vs. corporate IT
- Supply chain partner access requirements
- Quality management system access controls
- ITAR/EAR export control compliance for defense contractors
- ISO certifications require documented access procedures
- Contractor workforce on production lines
- Multi-plant operations with local IT
- Shop floor kiosk and shared workstation access
- Engineering design data protection

Key Pain Points:
- Plant floor worker identity management
- Contractor badge-to-access synchronization
- Engineering data compartmentalization
- Cross-plant access for traveling employees
- Legacy MES/SCADA system integration`
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: 'laptop',
    sector: 'Technology',
    description: 'Software, SaaS, Hardware, IT Services',
    companyName: 'Cloudvantage Technologies',
    companyDetails: 'A B2B SaaS company with $280M ARR, 1,200 employees, SOC 2 Type II certified, multi-cloud infrastructure (AWS primary, Azure secondary), remote-first culture, acquired 2 startups in last 18 months',
    context: `Industry Context - Technology:
- Engineering teams need flexible access to development resources
- Cloud-native infrastructure (AWS, Azure, GCP)
- DevOps and CI/CD pipeline access management
- Customer data segregation in multi-tenant environments
- SOC 2 Type II compliance requirements
- Remote-first workforce considerations
- Rapid growth and acquisitions
- Open source contribution policies
- Production vs. non-production access controls
- API and service account proliferation

Key Pain Points:
- Developer access to production systems
- Service account and secret management
- Cloud IAM across multiple providers
- Customer environment access controls
- Shadow IT and SaaS sprawl`
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    icon: 'building',
    sector: 'Government',
    description: 'Federal, State, Local Government, Public Agencies',
    companyName: 'Department of Commerce & Economic Development',
    companyDetails: 'A state-level agency with 4,500 employees, mix of public-facing and internal systems, FedRAMP requirements for some federal grant programs, contractor workforce for IT modernization',
    context: `Industry Context - Government & Public Sector:
- FedRAMP authorization requirements
- FISMA compliance and NIST frameworks
- Clearance-based access (Public Trust, Secret, Top Secret)
- Citizen data protection requirements
- Multiple agencies with different policies
- Contractor workforce management (cleared personnel)
- Legacy system modernization challenges
- Budget cycles impact project timelines
- Personnel security investigations
- Cross-agency collaboration needs

Key Pain Points:
- Position-based access control implementation
- Continuous vetting and access monitoring
- Contractor off-boarding when contracts end
- Cross-agency identity federation
- ICAM maturity requirements`
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    icon: 'bolt',
    sector: 'Energy',
    description: 'Oil & Gas, Power Generation, Utilities',
    companyName: 'Trident Energy Partners',
    companyDetails: 'A mid-major oil & gas company with upstream and midstream operations, 6,200 employees, heavy contractor workforce in field operations, NERC CIP compliance for some assets, recent digital transformation initiative',
    context: `Industry Context - Energy & Utilities:
- NERC CIP compliance for critical infrastructure
- OT/ICS environment access controls
- Field worker remote access needs
- Safety-critical system access management
- Environmental compliance systems
- Pipeline and grid operations
- Seasonal demand fluctuations
- Regulatory reporting requirements
- Joint venture and partner access
- Asset management system access

Key Pain Points:
- Control room operator access management
- Field technician mobile access
- Contractor access to remote facilities
- Emergency response access procedures
- Compliance evidence collection for audits`
  },
  {
    id: 'education',
    name: 'Education (Higher Ed)',
    icon: 'graduation',
    sector: 'Education',
    description: 'Universities, Colleges, Research Institutions',
    companyName: 'Pacific Western University',
    companyDetails: 'A large public research university with 45,000 students, 8,000 faculty/staff, decentralized IT across colleges, academic medical center, significant research grants with compliance requirements',
    context: `Industry Context - Education (Higher Ed):
- FERPA compliance for student records
- Research data protection (export controls, grant requirements)
- Decentralized IT governance (schools, departments)
- Student lifecycle (admit, enroll, graduate, alumni)
- Faculty tenure and sabbatical considerations
- Visiting researchers and scholars
- Athletic department special requirements
- Healthcare system integration (academic medical centers)
- Summer programs and camps
- Graduate student and TA access management

Key Pain Points:
- Student worker access termination at graduation
- Research collaboration across institutions
- Faculty access during sabbaticals
- Departmental admin self-service needs
- Shadow IT in research labs`
  },
  {
    id: 'media',
    name: 'Media & Entertainment',
    icon: 'film',
    sector: 'Media',
    description: 'Broadcasting, Streaming, Studios, Publishing',
    companyName: 'Crestview Media Group',
    companyDetails: 'A diversified media company with broadcast TV stations, streaming platform, production studios, $2.1B revenue, 5,500 employees plus thousands of contractors per production, heavy project-based workforce',
    context: `Industry Context - Media & Entertainment:
- Intellectual property protection is critical
- Project-based workforce (productions, campaigns)
- Content distribution partner access
- Digital rights management integration
- Global production operations
- Freelancer and contractor workforce
- Archive and content library access
- Broadcast systems and playout access
- Streaming platform security
- Advertising and sponsorship systems

Key Pain Points:
- Production crew rapid onboarding/offboarding
- Content access by release date
- Partner and agency access management
- Archive access for rights and royalties
- Global content localization team access`
  },
  {
    id: 'transportation',
    name: 'Transportation & Logistics',
    icon: 'truck',
    sector: 'Logistics',
    description: 'Airlines, Shipping, Freight, Logistics',
    companyName: 'Velocity Logistics International',
    companyDetails: 'A global freight and logistics company with air, ocean, and ground operations, $4.5B revenue, 22,000 employees worldwide, extensive partner carrier network, TSA-regulated facilities',
    context: `Industry Context - Transportation & Logistics:
- TSA/DOT regulatory compliance
- Distributed workforce (drivers, pilots, crew)
- Hub and spoke operations
- Real-time operational system access
- Third-party logistics provider integration
- Fleet management system access
- Safety management system controls
- Union workforce considerations
- International operations and customs
- Franchise and agent access

Key Pain Points:
- Driver/crew mobile access management
- Partner carrier system integration
- Seasonal capacity workforce
- Airport/facility badging integration
- Cross-border operation access controls`
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: 'briefcase',
    sector: 'Services',
    description: 'Consulting, Legal, Accounting, Advisory',
    companyName: 'Whitmore & Associates',
    companyDetails: 'A top-50 accounting and advisory firm with $1.2B revenue, 6,500 employees across 35 offices, audit, tax, and consulting practices, strict independence requirements, heavy client data segregation needs',
    context: `Industry Context - Professional Services:
- Client confidentiality requirements (attorney-client privilege, audit independence)
- Engagement-based access controls
- Partner/principal hierarchy
- Conflict of interest management
- Document management system security
- Time and billing system access
- Knowledge management access
- Client portal access management
- Global practice operations
- Independence requirements (accounting firms)

Key Pain Points:
- Client team access setup for new engagements
- Access termination when engagements end
- Conflicts screening system integration
- Partner lateral hire access
- Client data segregation`
  },
  {
    id: 'telecommunications',
    name: 'Telecommunications',
    icon: 'signal',
    sector: 'Telecom',
    description: 'Wireless, Wireline, Cable, Internet Service',
    companyName: 'Horizon Communications',
    companyDetails: 'A regional telecommunications provider with wireless, broadband, and enterprise services, $3.8B revenue, 14,000 employees, 180 retail stores, extensive dealer network, CPNI compliance requirements',
    context: `Industry Context - Telecommunications:
- CPNI (Customer Proprietary Network Information) protection
- Network operations center access
- OSS/BSS system access management
- Field technician access
- Retail store and dealer access
- Network element access controls
- Wholesale partner access
- Service activation systems
- Billing system segregation
- Regulatory compliance (FCC, state PUCs)

Key Pain Points:
- Network engineer privileged access
- Retail channel partner access
- Customer data access for support
- Field force mobile access
- Third-party NOC staff access`
  }
];

export function getIndustryContext(industryId) {
  const industry = industries.find(i => i.id === industryId);
  if (!industry) return '';

  // Build context with company name and details
  let context = '';
  if (industry.companyName) {
    context += `YOUR COMPANY: ${industry.companyName}\n`;
    context += `${industry.companyDetails}\n\n`;
    context += `Use this company name when referring to your organization. For example, say "Here at ${industry.companyName}..." or "At ${industry.companyName}, we..." when discussing your company.\n\n`;
  }
  context += industry.context;
  return context;
}

export function getIndustryById(industryId) {
  return industries.find(i => i.id === industryId);
}
