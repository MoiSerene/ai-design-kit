import type { Workflow } from '@/types';

export const workflows: Workflow[] = [
  {
    id: 'ai-feature-discovery',
    name: 'AI Feature Discovery',
    goal: 'Identify and prioritize AI feature opportunities grounded in user research.',
    frameworks: ['JTBD', 'Systems Thinking'],
    steps: [
      { skillId: 'interview-analysis', description: 'Analyze user interviews to uncover pain points and workarounds' },
      { skillId: 'affinity-mapping', description: 'Synthesize findings into thematic clusters' },
      { skillId: 'jtbd-extraction', description: 'Extract jobs-to-be-done from synthesized themes' },
      { skillId: 'problem-framing', description: 'Frame each job as a well-defined problem statement' },
      { skillId: 'opportunity-mapping', description: 'Map and prioritize opportunities by impact and feasibility' },
    ],
    output: ['Prioritized opportunity roadmap', 'Problem-solution pairs', 'Research evidence library'],
  },
  {
    id: 'research-synthesis',
    name: 'Research Synthesis',
    goal: 'Transform raw research data into structured, actionable design intelligence.',
    frameworks: ['Human-Centered AI', 'Systems Thinking'],
    steps: [
      { skillId: 'interview-analysis', description: 'Process and tag interview transcripts' },
      { skillId: 'affinity-mapping', description: 'Cluster findings into themes and patterns' },
      { skillId: 'jtbd-extraction', description: 'Derive job statements from clustered themes' },
    ],
    output: ['Research synthesis report', 'Theme clusters', 'JTBD library'],
  },
  {
    id: 'agent-design-flow',
    name: 'Agent Design Flow',
    goal: 'Design trustworthy AI agent experiences from concept to specification.',
    frameworks: ['Human-Centered AI', 'Service Design'],
    steps: [
      { skillId: 'agent-design', description: 'Define agent persona, capabilities, and interaction patterns' },
      { skillId: 'prompt-design', description: 'Craft system and user prompts for the agent' },
      { skillId: 'ux-critique', description: 'Evaluate agent UX against AI design principles' },
      { skillId: 'prototype-spec', description: 'Create detailed prototype specification for handoff' },
    ],
    output: ['Agent design spec', 'Prompt templates', 'UX critique report', 'Prototype spec'],
  },
];
