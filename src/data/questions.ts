import { Question, Lang } from '../types'
import { QUESTIONS_FR } from './questions_fr'

export const QUESTIONS_EN: Question[] = [
  {
    "id": "Q001",
    "module": "M2",
    "stem": "Which statement best describes a 'service' in ITIL 4?",
    "choices": [
      "A way to deliver value by facilitating outcomes customers want without them managing specific costs and risks",
      "A contract that specifies all technical details and implementation steps",
      "A set of servers and network devices running in a data center",
      "A ticket in a service desk tool"
    ],
    "answerIndex": 0,
    "rationale": "In ITIL 4, a service enables value co-creation by facilitating desired outcomes while the customer avoids managing specific costs and risks."
  },
  {
    "id": "Q002",
    "module": "M2",
    "stem": "In ITIL 4, what is 'value'?",
    "choices": [
      "The total cost of ownership of a service",
      "The perceived benefits, usefulness, and importance of something",
      "A list of features included in a product",
      "The service level agreement document"
    ],
    "answerIndex": 1,
    "rationale": "Value is subjective: it is perceived by stakeholders as benefits, usefulness, and importance."
  },
  {
    "id": "Q003",
    "module": "M2",
    "stem": "What is the main purpose of a Service Level Agreement (SLA) in ITIL practices?",
    "choices": [
      "To define the internal architecture of an application",
      "To agree measurable service targets between provider and customer",
      "To replace incident records with a single document",
      "To define organizational roles and job titles"
    ],
    "answerIndex": 1,
    "rationale": "SLAs are about agreed service targets and expectations, typically measurable and reviewed."
  },
  {
    "id": "Q004",
    "module": "M3",
    "stem": "Which guiding principle encourages using existing resources before creating something new?",
    "choices": [
      "Progress iteratively with feedback",
      "Think and work holistically",
      "Start where you are",
      "Keep it simple and practical"
    ],
    "answerIndex": 2,
    "rationale": "Start where you are means assess what is currently available and reuse what already works."
  },
  {
    "id": "Q005",
    "module": "M3",
    "stem": "Which guiding principle is most aligned with avoiding unnecessary complexity?",
    "choices": [
      "Keep it simple and practical",
      "Focus on value",
      "Collaborate and promote visibility",
      "Optimize and automate"
    ],
    "answerIndex": 0,
    "rationale": "Keep it simple and practical: if it doesn't add value, remove it or simplify it."
  },
  {
    "id": "Q006",
    "module": "M3",
    "stem": "Which guiding principle is primarily about sharing information and improving collaboration?",
    "choices": [
      "Collaborate and promote visibility",
      "Optimize and automate",
      "Progress iteratively with feedback",
      "Focus on value"
    ],
    "answerIndex": 0,
    "rationale": "Collaboration and visibility reduce handoffs, improve trust, and speed up decision-making."
  },
  {
    "id": "Q007",
    "module": "M4",
    "stem": "Which is NOT one of the four dimensions of service management?",
    "choices": [
      "Organizations and people",
      "Information and technology",
      "Partners and suppliers",
      "Policies and procedures"
    ],
    "answerIndex": 3,
    "rationale": "The four dimensions are: Organizations & people; Information & technology; Partners & suppliers; Value streams & processes."
  },
  {
    "id": "Q008",
    "module": "M4",
    "stem": "A failure caused by an unclear on-call rota is mainly linked to which dimension?",
    "choices": [
      "Organizations and people",
      "Information and technology",
      "Partners and suppliers",
      "Value streams and processes"
    ],
    "answerIndex": 0,
    "rationale": "Roles, skills, communication, and staffing are part of the organizations and people dimension."
  },
  {
    "id": "Q009",
    "module": "M4",
    "stem": "A vendor outage impacting your service highlights which dimension most directly?",
    "choices": [
      "Partners and suppliers",
      "Organizations and people",
      "Value streams and processes",
      "Information and technology"
    ],
    "answerIndex": 0,
    "rationale": "External parties and their agreements/relationships are part of partners and suppliers."
  },
  {
    "id": "Q010",
    "module": "M5",
    "stem": "What is the purpose of the ITIL Service Value System (SVS)?",
    "choices": [
      "To list all IT assets and licenses",
      "To describe how components and activities work together to enable value creation",
      "To define the only correct organizational structure",
      "To replace all other management frameworks"
    ],
    "answerIndex": 1,
    "rationale": "The SVS explains how governance, practices, guiding principles, and the service value chain work together to co-create value."
  },
  {
    "id": "Q011",
    "module": "M5",
    "stem": "Which activity in the service value chain ensures understanding stakeholder needs and ongoing engagement?",
    "choices": [
      "Plan",
      "Engage",
      "Obtain/build",
      "Deliver and support"
    ],
    "answerIndex": 1,
    "rationale": "Engage focuses on understanding stakeholder needs, transparency, and relationship management."
  },
  {
    "id": "Q012",
    "module": "M5",
    "stem": "Which component sets direction and monitors performance at the highest level within SVS?",
    "choices": [
      "Practices",
      "Governance",
      "Service value chain",
      "Continual improvement"
    ],
    "answerIndex": 1,
    "rationale": "Governance evaluates, directs, and monitors the organization."
  },
  {
    "id": "Q013",
    "module": "M6",
    "stem": "Which is the correct first step of the continual improvement model?",
    "choices": [
      "Where do we want to be?",
      "Where are we now?",
      "How do we get there?",
      "Did we get there?"
    ],
    "answerIndex": 0,
    "rationale": "The model starts with 'What is the vision?' then moves to 'Where are we now?' etc."
  },
  {
    "id": "Q014",
    "module": "M6",
    "stem": "A team runs small weekly improvements and adjusts based on results. Which idea does this reflect most?",
    "choices": [
      "Big-bang transformation",
      "Progress iteratively with feedback",
      "Start where you are",
      "Optimize and automate"
    ],
    "answerIndex": 1,
    "rationale": "Iterative improvements with feedback reduce risk and increase learning."
  },
  {
    "id": "Q015",
    "module": "M6",
    "stem": "What is a key benefit of continual improvement in service management?",
    "choices": [
      "It eliminates the need for measurement",
      "It ensures services remain aligned with changing stakeholder needs",
      "It guarantees zero incidents",
      "It removes all manual work instantly"
    ],
    "answerIndex": 1,
    "rationale": "Continual improvement helps keep services relevant and effective as needs and contexts change."
  },
  {
    "id": "Q016",
    "module": "M7",
    "stem": "What is the main purpose of Incident Management?",
    "choices": [
      "To reduce the likelihood of incidents",
      "To restore normal service operation as quickly as possible and minimize impact",
      "To permanently remove underlying causes",
      "To approve changes to production systems"
    ],
    "answerIndex": 1,
    "rationale": "Incident Management focuses on quick restoration; Problem Management focuses on root cause."
  },
  {
    "id": "Q017",
    "module": "M7",
    "stem": "Which practice is primarily responsible for identifying and removing the root cause of incidents?",
    "choices": [
      "Service desk",
      "Problem management",
      "Change enablement",
      "Service request management"
    ],
    "answerIndex": 1,
    "rationale": "Problem management aims to reduce the likelihood and impact of incidents by managing root causes."
  },
  {
    "id": "Q018",
    "module": "M7",
    "stem": "Which practice evaluates and authorizes changes to balance risk and speed?",
    "choices": [
      "Change enablement",
      "Capacity and performance management",
      "Service level management",
      "Availability management"
    ],
    "answerIndex": 0,
    "rationale": "Change enablement (formerly change control) ensures changes are assessed and authorized appropriately."
  }
]

export const QUESTIONS_ALL: Question[] = [...QUESTIONS_EN, ...QUESTIONS_FR]

export const QUESTIONS_BY_LANG: Record<Lang, Question[]> = {
  fr: QUESTIONS_FR,
  en: QUESTIONS_EN,
}

export function getQuestionsByLang(lang: Lang): Question[] {
  return QUESTIONS_BY_LANG[lang]
}
