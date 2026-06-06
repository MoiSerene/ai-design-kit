import type { Framework } from '@/types';

export const frameworks: Framework[] = [
  {
    id: 'jtbd',
    name: 'JTBD',
    description: 'Jobs-to-be-Done is a framework for understanding user needs through the lens of functional, emotional, and social jobs that people hire products to accomplish.',
    coreConcepts: [
      'Functional jobs',
      'Emotional jobs',
      'Social jobs',
      'Job context',
      'Desired outcomes',
      'Switching triggers',
    ],
    usedInSkills: ['jtbd-extraction', 'interview-analysis', 'opportunity-mapping', 'problem-framing'],
  },
  {
    id: 'systems-thinking',
    name: 'Systems Thinking',
    description: 'Systems Thinking provides tools to understand complex systems as interconnected wholes, mapping relationships, feedback loops, and emergent behaviors.',
    coreConcepts: [
      'Interconnections',
      'Feedback loops',
      'Emergence',
      'Leverage points',
      'Mental models',
      'System mapping',
    ],
    usedInSkills: ['affinity-mapping', 'problem-framing', 'opportunity-mapping', 'agent-design', 'workflow-design'],
  },
  {
    id: 'human-centered-ai',
    name: 'Human-Centered AI',
    description: 'Human-Centered AI puts human needs, agency, and understanding at the center of AI system design, emphasizing transparency, control, and trust.',
    coreConcepts: [
      'Explainability',
      'User control',
      'Trust calibration',
      'Feedback mechanisms',
      'Error recovery',
      'Progressive disclosure',
    ],
    usedInSkills: ['agent-design', 'prompt-design', 'ux-critique', 'prototype-spec', 'interview-analysis'],
  },
  {
    id: 'service-design',
    name: 'Service Design',
    description: 'Service Design orchestrates people, processes, and touchpoints across channels to deliver holistic, end-to-end experiences.',
    coreConcepts: [
      'Service blueprint',
      'Touchpoints',
      'Frontstage / Backstage',
      'Journey mapping',
      'Service ecosystem',
      'Moments of truth',
    ],
    usedInSkills: ['workflow-design', 'ux-critique', 'prototype-spec'],
  },
];
